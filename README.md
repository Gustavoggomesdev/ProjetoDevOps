# Katalog - Catálogo de Filmes e Jogos

> Uma biblioteca pessoal elegante e intuitiva para organizar, catalogar e gerenciar seus filmes e jogos assistidos ou jogados. Nunca mais esqueça o que você experimentou!

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow.svg)
![Version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)

## Características

- **Catálogo de Filmes** - Organize filmes por gênero, avaliação e status
- **Biblioteca de Jogos** - Acompanhe seus jogos jogados com notas e progressos
- **Sistema de Avaliações** - Avalie e comente sobre seus títulos favoritos
- **Estatísticas Pessoais** - Veja estatísticas sobre seus hábitos de consumo
- **Busca e Filtros** - Encontre rapidamente o que procura
- **Sincronização** - Acesse seus dados em qualquer dispositivo
- **Interface Responsiva** - Design moderno e adaptável
- **Aplicativo Mobile** - Acesso completo pelo seu smartphone

## Início Rápido

### Pré-requisitos

- Python (v3.10 ou superior)
- pip (gerenciador de pacotes Python)
- Virtualenv
- Banco de dados (PostgreSQL recomendado)

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Gustavoggomesdev/ProjetoDevOps.git
   cd ProjetoDevOps
   ```

2. **Crie e ative um ambiente virtual**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   # ou
   venv\Scripts\activate  # Windows
   ```

3. **Instale as dependências**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

5. **Execute as migrações do banco de dados**
   ```bash
   python manage.py migrate
   ```

6. **Crie um superusuário (administrador)**
   ```bash
   python manage.py createsuperuser
   ```

7. **Inicie o servidor**
   ```bash
   python manage.py runserver
   ```

O aplicativo estará disponível em `http://localhost:8000`

## Como Usar

### Cadastrando um Filme

1. Clique em **"+ Novo Filme"**
2. Preencha os campos:
   - Título
   - Ano de lançamento
   - Gênero(s)
   - Sinopse
   - Sua avaliação (0-5 estrelas)
   - Status (Assistido, Wishlist, Assistindo)
3. Clique em **"Salvar"**

### Cadastrando um Jogo

1. Acesse a aba **"Jogos"**
2. Clique em **"+ Novo Jogo"**
3. Preencha os campos:
   - Título
   - Plataforma (PC, PS5, Nintendo, etc.)
   - Gênero(s)
   - Desenvolvedora
   - Sua avaliação
   - Progresso (%)
4. Clique em **"Salvar"**

### Visualizando Estatísticas

- Acesse o **Dashboard** para ver um resumo de suas atividades
- Veja quantidade de filmes assistidos, jogos completados
- Confira seus gêneros e plataformas favoritas

## Tecnologias Utilizadas

### Backend
- **Django** - Framework web Python
- **Django REST Framework** - Para construir a API REST
- **PostgreSQL** - Banco de dados relacional
- **Python 3.10+** - Linguagem de programação
- **JWT** - Autenticação via tokens

### Frontend
- **React** - Biblioteca de UI
- **TypeScript** - Tipagem de código
- **Tailwind CSS** - Estilização
- **Axios** - Cliente HTTP

### DevOps & Infraestrutura
- **Docker** - Containerização
- **Docker Compose** - Orquestração local
- **GitHub Actions** - CI/CD
- **Nginx** - Servidor web reverso
- **Gunicorn** - Servidor WSGI para Django

## Estrutura do Projeto

```
ProjetoDevOps/
├── backend/                 # API Django
│   ├── media_vault/         # Projeto principal Django
│   │   ├── settings.py      # Configurações do projeto
│   │   ├── urls.py          # Rotas principais
│   │   └── wsgi.py          # Configuração WSGI
│   ├── apps/
│   │   ├── movies/          # App de filmes
│   │   ├── games/           # App de jogos
│   │   ├── users/           # App de usuários
│   │   └── ratings/         # App de avaliações
│   ├── manage.py            # Script de gerenciamento do Django
│   ├── requirements.txt     # Dependências Python
│   └── tests/               # Testes unitários
├── frontend/                # Aplicação React
│   ├── src/
│   ├── public/
│   └── package.json
├── docker/                  # Arquivos Docker
│   ├── Dockerfile           # Imagem Django
│   └── docker-compose.yml
├── docs/                    # Documentação
├── .github/workflows/       # CI/CD
└── README.md
```

## Testes

Os testes ficam no `backend/` e usam `pytest`.

```bash
# entrar no backend
cd backend

# instalar dependências (se ainda não tiver instalado)
python -m pip install -r requirements.txt

# rodar todos os testes
python -m pytest

# Testes com cobertura
python -m pytest --cov=apps

# Rodar testes do Django
python manage.py test

# Rodar um arquivo específico
python -m pytest tests/test_api_games.py

# Rodar um teste pelo nome
python -m pytest -k statistics
```

## Usando Docker

### Pré-requisitos
- **Docker** (v20.10+)
- **Docker Compose** (v1.29+)

### 1. Configurar variáveis de ambiente
Antes de começar, crie um arquivo `.env` na raiz do projeto com as variáveis necessárias:

```bash
cp .env.example .env
```

Edite `.env` com suas configurações. Exemplo mínimo:
```env
DEBUG=0
SECRET_KEY=sua-chave-secreta-super-segura-aqui
DATABASE_URL=postgres://mediauser:mediapass@db:5432/media_vault
ALLOWED_HOSTS=localhost,127.0.0.1
```

### 2. Build e iniciar os containers
```bash
# Acesse a pasta docker
cd docker

# Faz build de todas as imagens e inicia os containers
docker compose up --build -d

# Aguarde ~10-15 segundos para DB estar pronto
```

### 3. Aplicar migrações e criar superuser
```bash
# Rodar migrações do Django
docker compose exec backend python manage.py migrate

# Criar superuser (administrador)
docker compose exec backend python manage.py createsuperuser

# Coletar arquivos estáticos (se necessário)
docker compose exec backend python manage.py collectstatic --noinput
```

### 4. Acessar a aplicação
- **Backend (API)**: `http://localhost:8000/`
- **Admin**: `http://localhost:8000/admin/`
- **Frontend**: `http://localhost:3000/` (se habilitado)

### Comandos úteis

#### Ver logs em tempo real
```bash
# Todos os serviços
docker compose logs -f

# Apenas backend
docker compose logs -f backend

# Apenas database
docker compose logs -f db
```

#### Parar os containers
```bash
docker compose down
```

#### Parar e remover volumes (limpar dados)
```bash
docker compose down -v
```

#### Executar comandos no backend
```bash
# Abrir shell/terminal no container
docker compose exec backend sh

# Rodar testes
docker compose exec backend python -m pytest

# Rodar manage.py manualmente
docker compose exec backend python manage.py <comando>
```

#### Reconstruir apenas um serviço
```bash
# Reconstruir apenas o backend
docker compose up --build backend

# Reconstruir apenas o frontend
docker compose up --build frontend
```

#### Verificar saúde dos serviços
```bash
# Verificar se DB está pronto
docker compose exec db pg_isready -U mediauser

# Verificar se backend está respondendo
curl http://localhost:8000/health/
```

### Estrutura do docker-compose.yml

O `docker-compose.yml` define 3 serviços principais:

| Serviço | Porta | Descrição |
|---------|-------|-----------|
| `db` | 5432 | PostgreSQL - banco de dados |
| `backend` | 8000 | Django API |
| `frontend` | 3000 | React SPA |

### Volumes
Os dados persistem em volumes mesmo após parar containers:
- `postgres_data` - Banco de dados PostgreSQL

### Produção

Para deploy em produção:
1. Use variáveis de ambiente seguras (secrets do Docker/Kubernetes/CI-CD)
2. Configure `DEBUG=0` no `.env`
3. Use reverse-proxy com SSL/TLS (Let's Encrypt)
4. Configure CORS corretamente em `settings.py`
5. Use gerenciador de secrets (HashiCorp Vault, AWS Secrets Manager, etc)

## Endpoints da API

### Autenticação
- `POST /api/auth/register/` - Registrar novo usuário
- `POST /api/auth/login/` - Fazer login
- `POST /api/auth/refresh/` - Renovar token JWT
- `POST /api/auth/logout/` - Fazer logout

### Filmes
- `GET /api/movies/` - Listar todos os filmes
- `POST /api/movies/` - Criar novo filme
- `GET /api/movies/{id}/` - Buscar filme específico
- `PUT /api/movies/{id}/` - Atualizar filme
- `DELETE /api/movies/{id}/` - Deletar filme
- `GET /api/movies/search/` - Buscar filmes por título ou gênero

### Jogos
- `GET /api/games/` - Listar todos os jogos
- `POST /api/games/` - Criar novo jogo
- `GET /api/games/{id}/` - Buscar jogo específico
- `PUT /api/games/{id}/` - Atualizar jogo
- `DELETE /api/games/{id}/` - Deletar jogo
- `GET /api/games/filter/` - Filtrar por plataforma ou gênero

### Avaliações
- `GET /api/ratings/` - Listar avaliações do usuário
- `POST /api/ratings/` - Criar avaliação
- `PUT /api/ratings/{id}/` - Atualizar avaliação

### Usuário
- `GET /api/user/profile/` - Obter perfil do usuário
- `PUT /api/user/profile/` - Atualizar perfil
- `GET /api/user/statistics/` - Obter estatísticas pessoais

## Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## Roadmap

- [ ] Integração com IMDb e IGDB
- [ ] Sistema de recomendações
- [ ] Social features (compartilhar listas)
- [ ] Aplicativo mobile
- [ ] Integração com plataformas de streaming
- [ ] Histórico de alterações
- [ ] Exportação de dados (CSV, PDF)



