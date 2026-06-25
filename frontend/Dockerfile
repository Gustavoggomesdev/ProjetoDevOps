# ---------- Stage 1: build ----------
FROM node:18-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
ARG REACT_APP_API_URL=http://localhost:8000/api
ENV REACT_APP_API_URL=$REACT_APP_API_URL
COPY . .
RUN npm run build

# ---------- Stage 2: imagem final (Nginx) ----------
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=10s --timeout=5s --retries=5 \
  CMD wget --quiet --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
