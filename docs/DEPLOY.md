# Deploy - Media Vault

Este documento descreve como o backend é implantado em produção e como o
pipeline de CI/CD automatiza esse processo.

## Visão geral

```
push/PR -> CI (lint, testes, build, SCA, SAST) -> merge na main
                                                        |
                                                        v
                                    CI roda de novo na main e passa
                                                        |
                                                        v
                                    CD (cd.yml) dispara o Deploy Hook
                                                        |
                                                        v
                          Render faz pull do repo, builda a imagem com o
                          docker/Dockerfile do projeto e publica a nova versão
```

O CD (`.github/workflows/cd.yml`) só executa **depois** que o workflow de CI
(`.github/workflows/ci.yml`) terminar com sucesso para um push na branch
`main`. Isso garante que nunca fazemos deploy de código que não passou lint,
testes ou build.

## Ambiente cloud: Render

Usamos o [Render](https://render.com) porque:

- Faz deploy direto a partir do `Dockerfile` que já existe no projeto (não
  precisa reescrever nada para "ficar pronto pra cloud").
- Tem um plano free para Web Service e Postgres, sem necessidade de cartão de
  crédito — adequado para o contexto acadêmico deste projeto.
- A infraestrutura (web service + banco) é descrita como código no
  `render.yaml` na raiz do repositório (Render Blueprint).

> Nota: o plano free do Render hiberna o serviço após 15 minutos sem tráfego
> (a primeira requisição depois disso demora ~1 min para responder) e o banco
> Postgres free expira 30 dias após a criação. Isso é aceitável para fins de
> avaliação, mas não para um ambiente de produção real — em produção,
> usaríamos um plano pago.

## Passo a passo de configuração (feito uma única vez)

1. Criar uma conta em https://dashboard.render.com/register (sem necessidade
   de cartão de crédito para o plano free).
2. No painel, clicar em **New > Blueprint** e conectar o repositório do
   GitHub. O Render vai ler o `render.yaml` automaticamente e propor a
   criação do Web Service `media-vault-backend` e do banco
   `media-vault-db`.
3. Revisar e confirmar a criação dos serviços. O Render faz o primeiro
   deploy manualmente neste momento.
4. No Web Service criado, ir em **Settings > Deploy Hook** e copiar a URL
   gerada.
5. No GitHub, ir em **Settings > Secrets and variables > Actions** do
   repositório e criar um secret chamado `RENDER_DEPLOY_HOOK_URL` com a URL
   copiada no passo anterior.
6. Em **Environment** no painel do Render, preencher a variável
   `CORS_ALLOWED_ORIGINS` com a URL onde o frontend está publicado (ex.: a
   URL de um Static Site do Render ou de outro provedor).

A partir daqui, todo merge na `main` que passar o CI dispara o deploy
automaticamente.

## Por que `autoDeploy: false` no `render.yaml`

Desligamos o auto-deploy nativo do Render porque ele dispararia a cada push,
**sem esperar o resultado do CI**. Preferimos que o GitHub Actions controle
quando o deploy acontece (só depois do CI verde), por isso o disparo é feito
via Deploy Hook no workflow `cd.yml`, e não pelo auto-deploy do próprio
Render.

## Migrations em produção

O `docker/docker-entrypoint.sh` roda `python manage.py migrate --noinput`
automaticamente antes de iniciar o Gunicorn, tanto no Render quanto no
`docker-compose` local. Isso garante que o banco esteja sempre com o schema
atualizado após cada deploy, sem passo manual.

## Verificando se o deploy funcionou

Depois que o workflow `cd.yml` rodar:

1. Acompanhar o log do build/deploy no painel do Render (aba **Events** ou
   **Logs** do serviço).
2. Testar o healthcheck na URL pública:
   ```bash
   curl https://media-vault-backend.onrender.com/health/
   ```
   Resposta esperada: `{"status": "ok", "database": "ok"}`.

## Rollback

O Render mantém os dois deploys anteriores disponíveis para rollback com um
clique pelo painel (**Manual Deploy > Rollback**), mesmo no plano free. Isso
é o que usamos na simulação de incidente para restaurar o serviço rapidamente
— veja `docs/incidentes/postmortem-001.md`.
