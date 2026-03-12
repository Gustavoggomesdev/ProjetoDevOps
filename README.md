# 🎬 Katalog - Catálogo de Filmes e Jogos

> Uma biblioteca pessoal elegante e intuitiva para organizar, catalogar e gerenciar seus filmes e jogos assistidos ou jogados. Nunca mais esqueça o que você experimentou!

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow.svg)
![Version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)

## ✨ Características

- 🎥 **Catálogo de Filmes** - Organize filmes por gênero, avaliação e status
- 🎮 **Biblioteca de Jogos** - Acompanhe seus jogos jogados com notas e progressos
- ⭐ **Sistema de Avaliações** - Avalie e comente sobre seus títulos favoritos
- 🏆 **Estatísticas Pessoais** - Veja estatísticas sobre seus hábitos de consumo
- 🔍 **Busca e Filtros** - Encontre rapidamente o que procura
- 💾 **Sincronização** - Acesse seus dados em qualquer dispositivo
- 🎨 **Interface Responsiva** - Design moderno e adaptável
- 📱 **Aplicativo Mobile** - Acesso completo pelo seu smartphone

## 🚀 Início Rápido

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

## 📖 Como Usar

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

## 🛠️ Tecnologias Utilizadas

### Backend
- **Django** - Framework web Python
- **Django REST Framework** - Para construir a API REST
- **PostgreSQL** - Banco de dados relacional
- **Python 3.10+** - Linguagem de programação
- **Celery** - Para tarefas assíncronas (futuro)
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

## 📁 Estrutura do Projeto

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

## 🧪 Testes

Execute os testes com:

```bash
# Testes com pytest
pytest

# Testes com cobertura
pytest --cov=apps

# Rodar testes do Django
python manage.py test

# Testes específicos de um app
pytest apps/movies/tests/
```

## 🐳 Usando Docker

### Build da imagem
```bash
docker build -t media-vault:latest -f docker/Dockerfile .
```

### Executar com Docker Compose
```bash
docker-compose -f docker/docker-compose.yml up -d
```

### Parar os containers
```bash
docker-compose -f docker/docker-compose.yml down
```

### Ver logs
```bash
docker-compose -f docker/docker-compose.yml logs -f
```

## 📊 Endpoints da API

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

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Roadmap

- [ ] Integração com IMDb e IGDB
- [ ] Sistema de recomendações
- [ ] Social features (compartilhar listas)
- [ ] Aplicativo mobile
- [ ] Integração com plataformas de streaming
- [ ] Histórico de alterações
- [ ] Exportação de dados (CSV, PDF)

## 🐛 Reportar Bugs

Encontrou um bug? Por favor, abra uma [issue](https://github.com/Gustavoggomesdev/ProjetoDevOps/issues) com:

- Descrição do problema
- Passos para reproduzir
- Comportamento esperado vs. observado
- Screenshots (se aplicável)

## 📧 Contato

- **Email**: seu-email@example.com
- **GitHub**: [@Gustavoggomesdev](https://github.com/Gustavoggomesdev)
- **LinkedIn**: [seu-perfil](https://linkedin.com/in/seu-perfil)

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**Desenvolvido com ❤️ por [Gustavo Gomes](https://github.com/Gustavoggomesdev)**
