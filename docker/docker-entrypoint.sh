#!/bin/sh
# Entrypoint do container do backend.
# Garante que as migrations do Django sejam aplicadas antes do servidor
# subir, tanto em ambiente local (docker-compose) quanto no Render.
set -e

echo "Aplicando migrations..."
python manage.py migrate --noinput

echo "Iniciando Gunicorn..."
exec gunicorn media_vault.wsgi:application --bind 0.0.0.0:8000 --workers 4
