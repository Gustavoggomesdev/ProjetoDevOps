# Docker Commands - Media Vault

Guia rapido para subir, iniciar, parar, inspecionar e acompanhar a saude dos containers do projeto.

> Execute os comandos abaixo a partir da raiz do projeto: `ProjetoDevOps`.

```powershell
docker compose -f docker/docker-compose.yml <comando>
```

---

## Visao Geral

| Servico | Container | Porta | Descricao |
| --- | --- | --- | --- |
| `db` | `media_vault_db` | `5432` | Banco PostgreSQL |
| `backend` | `media_vault_backend` | `8000` | API Django/Gunicorn |
| `frontend` | `media_vault_frontend` | `3000` | Aplicacao React |

---

## Subir os Containers

### Subir em modo terminal aberto

Use quando quiser ver os logs diretamente no terminal.

```powershell
docker compose -f docker/docker-compose.yml up
```

### Subir em segundo plano

Use no dia a dia para deixar os containers rodando em background.

```powershell
docker compose -f docker/docker-compose.yml up -d
```

### Subir reconstruindo as imagens

Use depois de alterar `Dockerfile`, dependencias ou configuracoes importantes.

```powershell
docker compose -f docker/docker-compose.yml up -d --build
```

---

## Iniciar Containers Ja Criados

Se os containers ja existem e foram apenas parados:

```powershell
docker compose -f docker/docker-compose.yml start
```

Iniciar apenas um servico:

```powershell
docker compose -f docker/docker-compose.yml start db
docker compose -f docker/docker-compose.yml start backend
docker compose -f docker/docker-compose.yml start frontend
```

---

## Parar os Containers

### Parar sem remover

```powershell
docker compose -f docker/docker-compose.yml stop
```

### Parar e remover containers/rede

Mantem o volume do banco.

```powershell
docker compose -f docker/docker-compose.yml down
```

### Parar e remover tudo, incluindo dados do banco

Atencao: este comando apaga o volume `postgres_data`.

```powershell
docker compose -f docker/docker-compose.yml down -v
```

---

## Ver se os Servicos Estao Funcionando

### Listar status dos servicos

```powershell
docker compose -f docker/docker-compose.yml ps
```

### Ver containers em execucao

```powershell
docker ps
```

### Testar URLs principais

Frontend:

```powershell
curl http://localhost:3000
```

Backend:

```powershell
curl http://localhost:8000
```

API:

```powershell
curl http://localhost:8000/api
```

---

## Health Check

O `docker-compose.yml` possui health check configurado para o PostgreSQL (`db`) usando `pg_isready`.

### Ver status resumido

```powershell
docker compose -f docker/docker-compose.yml ps
```

Procure por algo como:

```text
media_vault_db    running (healthy)
```

### Inspecionar health check do banco

```powershell
docker inspect media_vault_db --format "{{json .State.Health}}"
```

### Ver somente o status do health check

```powershell
docker inspect media_vault_db --format "{{.State.Health.Status}}"
```

Possiveis resultados:

| Status | Significado |
| --- | --- |
| `starting` | Container iniciou, mas o health check ainda esta validando |
| `healthy` | Servico esta respondendo corretamente |
| `unhealthy` | Servico falhou nos testes de saude |

---

## Logs

### Ver logs de todos os servicos

```powershell
docker compose -f docker/docker-compose.yml logs
```

### Acompanhar logs em tempo real

```powershell
docker compose -f docker/docker-compose.yml logs -f
```

### Logs por servico

```powershell
docker compose -f docker/docker-compose.yml logs -f db
docker compose -f docker/docker-compose.yml logs -f backend
docker compose -f docker/docker-compose.yml logs -f frontend
```

---

## Entrar nos Containers

### Backend

```powershell
docker exec -it media_vault_backend sh
```

### Frontend

```powershell
docker exec -it media_vault_frontend sh
```

### Banco PostgreSQL

```powershell
docker exec -it media_vault_db sh
```

### Acessar o PostgreSQL via psql

```powershell
docker exec -it media_vault_db psql -U postgres -d media_vault_db
```

---

## Comandos Django Dentro do Container

### Rodar migrations

```powershell
docker exec -it media_vault_backend python manage.py migrate
```

### Criar superusuario

```powershell
docker exec -it media_vault_backend python manage.py createsuperuser
```

### Abrir shell do Django

```powershell
docker exec -it media_vault_backend python manage.py shell
```

---

## Limpeza e Rebuild

### Rebuild completo dos servicos

```powershell
docker compose -f docker/docker-compose.yml build --no-cache
docker compose -f docker/docker-compose.yml up -d
```

### Remover containers parados

```powershell
docker container prune
```

### Remover imagens nao usadas

```powershell
docker image prune
```

---

## Fluxo Recomendado no Dia a Dia

1. Subir o ambiente:

```powershell
docker compose -f docker/docker-compose.yml up -d
```

2. Conferir status:

```powershell
docker compose -f docker/docker-compose.yml ps
```

3. Acompanhar logs se algo nao abrir:

```powershell
docker compose -f docker/docker-compose.yml logs -f
```

4. Parar ao finalizar:

```powershell
docker compose -f docker/docker-compose.yml stop
```

---

## Enderecos Locais

| Aplicacao | URL |
| --- | --- |
| Frontend | <http://localhost:3000> |
| Backend | <http://localhost:8000> |
| API | <http://localhost:8000/api> |
| PostgreSQL | `localhost:5432` |

