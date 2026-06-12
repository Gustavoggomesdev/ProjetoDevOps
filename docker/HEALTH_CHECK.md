# Health Check - Media Vault

Guia para entender, verificar e interpretar os health checks dos containers Docker do projeto.

> Execute os comandos abaixo a partir da raiz do projeto: `ProjetoDevOps`.

```powershell
docker compose -f docker/docker-compose.yml <comando>
```

---

## O Que E Health Check

Health check e uma verificacao automatica que diz se um servico esta saudavel.

No projeto, existem dois health checks principais:

| Servico | Container | O que verifica |
| --- | --- | --- |
| `db` | `media_vault_db` | Se o PostgreSQL esta aceitando conexoes |
| `backend` | `media_vault_backend` | Se a API responde em `/health/` |

O frontend nao possui health check proprio no `docker-compose.yml`.

---

## Como Funciona Neste Projeto

### Banco PostgreSQL

O health check do banco usa:

```powershell
pg_isready -U postgres
```

Se o banco estiver pronto para receber conexoes, o Docker marca o container como `healthy`.

### Backend Django

O health check do backend chama:

```text
http://localhost:8000/health/
```

Esse endpoint executa uma consulta simples no banco:

```sql
SELECT 1
```

Se o Django responder e o banco estiver acessivel, a API retorna:

```json
{"status": "ok", "database": "ok"}
```

---

## Como Verificar O Status

### Status resumido dos containers

```powershell
docker compose -f docker/docker-compose.yml ps
```

Exemplo esperado:

```text
NAME                   STATUS
media_vault_db         Up ... (healthy)
media_vault_backend    Up ... (healthy)
media_vault_frontend   Up ...
```

### Ver apenas o status do banco

```powershell
docker inspect media_vault_db --format "{{.State.Health.Status}}"
```

### Ver apenas o status do backend

```powershell
docker inspect media_vault_backend --format "{{.State.Health.Status}}"
```

Possiveis resultados:

| Status | Significado |
| --- | --- |
| `starting` | O container iniciou, mas ainda esta validando |
| `healthy` | O servico passou no health check |
| `unhealthy` | O servico falhou no health check |

---

## Como Testar Manualmente

### Testar o endpoint do backend

```powershell
curl http://localhost:8000/health/
```

Ou no PowerShell:

```powershell
Invoke-WebRequest http://localhost:8000/health/ -UseBasicParsing
```

Resposta boa:

```json
{"status": "ok", "database": "ok"}
```

### Testar o banco manualmente

```powershell
docker compose -f docker/docker-compose.yml exec db pg_isready -U postgres
```

Resposta boa:

```text
/var/run/postgresql:5432 - accepting connections
```

---

## Como Ver Os Logs

### Logs de todos os servicos

```powershell
docker compose -f docker/docker-compose.yml logs
```

### Logs em tempo real

```powershell
docker compose -f docker/docker-compose.yml logs -f
```

### Logs do backend

```powershell
docker compose -f docker/docker-compose.yml logs -f backend
```

### Logs do banco

```powershell
docker compose -f docker/docker-compose.yml logs -f db
```

### Historico do health check do backend

```powershell
docker inspect media_vault_backend --format "{{json .State.Health}}"
```

### Historico do health check do banco

```powershell
docker inspect media_vault_db --format "{{json .State.Health}}"
```

---

## Exemplos Indo Bem

### Docker Compose mostra healthy

```text
media_vault_db         Up 2 minutes (healthy)
media_vault_backend    Up 2 minutes (healthy)
```

### Health check do backend responde 200

```text
StatusCode: 200
Content: {"status": "ok", "database": "ok"}
```

### Logs do backend mostram Gunicorn rodando

```text
Starting gunicorn
Listening at: http://0.0.0.0:8000
Booting worker with pid: 9
```

### Health check do banco passa

```text
/var/run/postgresql:5432 - accepting connections
```

---

## Exemplos Indo Mal

### Backend nao sobe

```text
ModuleNotFoundError: No module named 'core'
Reason: Worker failed to boot.
```

O que significa:

O Gunicorn esta apontando para um modulo WSGI que nao existe. Neste projeto, o correto e:

```text
media_vault.wsgi:application
```

### Endpoint nao responde

```text
Impossivel conectar-se ao servidor remoto
```

O que verificar:

- Se o container `media_vault_backend` esta rodando.
- Se a porta `8000` esta publicada.
- Se o Gunicorn iniciou sem erro.

### Health check fica unhealthy

```text
media_vault_backend    Up ... (unhealthy)
```

O que verificar:

- Logs do backend.
- Se `/health/` retorna `200`.
- Se o banco esta `healthy`.
- Se as variaveis `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` e `DB_PORT` estao corretas.

### Banco nao aceita conexao

```text
no response
```

ou:

```text
connection refused
```

O que verificar:

- Se o container `media_vault_db` esta rodando.
- Se usuario, senha e nome do banco batem com o `docker-compose.yml`.
- Se o backend esta usando `DB_HOST=db` dentro do Docker.

### Django nao consegue ler DEBUG

```text
ValueError: Invalid truth value: release
```

O que significa:

O Django esperava `DEBUG=True` ou `DEBUG=False`, mas recebeu outro valor. No `docker-compose.yml`, o backend local usa `DEBUG=True`.

---

## Leitura Rapida

Considere que esta indo bem quando:

- `db` esta `healthy`.
- `backend` esta `healthy`.
- `curl http://localhost:8000/health/` retorna `200`.
- A resposta contem `{"status": "ok", "database": "ok"}`.
- Os logs nao mostram erro repetido.

Considere que esta indo mal quando:

- Algum container aparece como `unhealthy`.
- O backend nao aparece no `docker compose ps`.
- O endpoint `/health/` nao responde.
- Aparecem erros como `Worker failed to boot`, `connection refused`, `timeout` ou `database unavailable`.
