# Install

## Arquitetura publicada

Em produção, a API TypeScript/Express é publicada na [Vercel](https://vercel.com/) e utiliza um banco PostgreSQL hospedado no [Supabase](https://supabase.com/). O Docker Compose continua disponível para desenvolvimento local; ele não representa o banco de produção.

### Configuração da API na Vercel

Ao configurar o projeto na Vercel:

1. Use `src/api` como diretório raiz do projeto.
2. Use `npm ci` como comando de instalação e `npm run build` como comando de build.
3. Cadastre as variáveis de ambiente abaixo nos ambientes Production, Preview e Development:

   - `DB_HOST`: host PostgreSQL fornecido pelo Supabase.
   - `DB_PORT`: porta PostgreSQL, normalmente `5432`.
   - `DB_NAME`: nome do banco, normalmente `postgres`.
   - `DB_USER`: usuário do banco.
   - `DB_PASSWORD`: senha do banco.

Use os dados da seção de conexão do projeto no Supabase. No projeto Vercel `fatec-women-api`, essas variáveis devem ser armazenadas como secrets. Nunca copie credenciais para o repositório ou para arquivos versionados.

### Configuração do banco no Supabase

No SQL Editor do Supabase, execute [`src/database/001-create-tables.sql`](../src/database/001-create-tables.sql) para criar o esquema inicial. Depois do deploy, confirme a conexão da API no endpoint `/health`:

```text
https://fatec-women-api.vercel.app/health
```

A especificação da API está em [`src/api/swagger.yaml`](../src/api/swagger.yaml).

## Desenvolvimento local

Para executar a API localmente, consulte a seção [Backend local do README](../README.md#1-backend-local) e use:

```bash
docker compose up -d --build
```

Ou compile e execute diretamente com Node.js:

```bash
cd src/api
npm ci
npm run build
npm start
```

## Docker Desktop

https://docs.docker.com/engine/install/

## Node.js (for frontend development)

https://nodejs.org/

## GitHub Desktop

https://desktop.github.com/download/

## DBeaver

https://dbeaver.io/download/

## Android Studio

https://developer.android.com/studio
