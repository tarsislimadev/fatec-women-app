# Write daily board documentation

**Session ID:** ses_e1613817effeY42knNeWQMdSjU
**Created:** 17/11/2026, 11:32:32 a.m.
**Updated:** 17/11/2026, 11:34:11 a.m.

---

## User

From tasks in Trello MCP and Git Log, write ./docs/daily-board/20261117.md

---

## Assistant (Code · Auto Free · 15.3s)

_Thinking:_

The user wants me to create a daily board file at ./docs/daily-board/20261117.md based on Trello tasks and Git log. I need to:

1. First, get the current date from the environment (2026-11-17)
2. Check Trello MCP for tasks - I need to identify the user first with trelloReadMember get_me, then read boards and cards
3. Check Git log for recent commits
4. Create the file with the gathered information

Let me start by getting the Trello member info and checking the git log, then explore the Trello boards.


I'll gather information from Trello and Git log to create the daily board file.

**Tool: trello_trelloReadMember**

**Input:**
```json
{
  "action": "get_me"
}
```

**Output:**
```
{
  "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
  "username": "brtmvdl",
  "fullName": "Tarsis Mikael Ventura Dumas de Lima",
  "url": "https://trello.com/u/brtmvdl",
  "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3",
  "prefs": {
    "timezone": "America/Sao_Paulo"
  }
}
```

**Tool: bash**

**Input:**
```json
{
  "command": "git log --oneline -30 --no-merges",
  "description": "Get recent git commits"
}
```

**Output:**
```
9f72cf7 fix: update README to mark 'Início + Login' as completed and format Sign In section
e90acd8 fix: replace npm ci with npm i in Dockerfile for consistency
ba2a9bc fix: streamline npm command in Dockerfile for development
83ccab7 feat: remove Prisma integration from Kilo configuration
589e4fd docs: add kilo's sessions
aa69b7c feat: add documentation for End-to-End (E2E) UI tests in Android module
32de77c feat: add UI tests for MainDashboard and update dependencies for testing
87d9ee7 docs: add kilo's sessions
ee4efb6 feat: update login authentication to handle token storage and improve error messaging
b26fe02 fix: update password hash for admin user in SQL insert script
844438c fix: clean up .gitignore entries for better clarity and organization
1ea255d feat: add ReportForm and ReportList components with API integration
50c2942 feat: add devtools configuration for chrome-devtools-mcp in kilo.json and .mcp.json
1cc2b44 feat: add SQL script for inserting admin user and update Dockerfile to copy all SQL files
9c8c87a feat: add seed script for initializing admin user in the database
7136307 feat: add README for PostgreSQL database schema and local development setup
ba6e7f2 refactor: comment out unused localhost check and SSL configuration in DB_CONFIG
bad571e docs: add kilo's sessions
b9e58f5 fix: remove volume mapping for database initialization and update environment variables in api service
ad6eed1 feat: establish database connection in database.ts
2178295 fix: update auth method to use 'email' instead of 'username'
03509b5 refactor: remove database initialization from app and index files
5e4af62 feat: add database setup with table creation scripts and Dockerfile
0692b0b fix: update .gitignore to exclude entire dist directory
c19be86 Refactor API structure and improve code organization
7bc1de1 feat: refactor pages to use reusable components for layout and styling
e40e114 feat: add layout styles for reusable components including container, header, card, form, and grid
6f0dd29 feat: add reusable UI components including Button, Card, Container, EmptyState, Form, Grid, and Header
9361d44 fix: update Dockerfile to use alpine node image and simplify commands
8ad6282 docs: create files for saving kilocode's sessions

```

---

## Assistant (Code · Auto Free · 11.1s)

_Thinking:_

I have the user's Trello profile (timezone America/Sao_Paulo) and recent git commits. Now I need to get Trello board/card information. Let me first find the relevant boards and then get today's date in the user's timezone (2026-11-17, which is already the message time, but in UTC; in Sao Paulo it would be 2026-11-17 morning/afternoon).

Let me search for boards and cards related to the project.


**Tool: trello_trelloSearch**

**Input:**
```json
{
  "action": "search_boards",
  "query": "fatec"
}
```

**Output:**
```
{
  "boards": [],
  "nextCursor": null,
  "hasMore": false
}
```

**Tool: trello_trelloReadInbox**

**Input:**
```json
{
  "action": "list_cards"
}
```

**Output:**
```
{
  "cards": [],
  "nextCursor": null,
  "hasMore": false
}
```

---

## Assistant (Code · Auto Free · 8.8s)

_Thinking:_

The user wants me to write a daily board file from Trello MCP and Git Log. The Trello search returned no boards and the inbox is empty. Let me try listing boards the user is a member of, and also search for cards.


**Tool: trello_trelloReadBoard**

**Input:**
```json
{
  "action": "list"
}
```

**Output:**
```
{
  "boards": [
    {
      "id": "ari:cloud:trello::board/workspace/619d477c7c24505bb90fe13f/6a9ffcf099f3410b2e07a702",
      "objectId": "6a9ffcf099f3410b2e07a702",
      "name": "MULHER-01",
      "closed": false,
      "shortLink": "XfzfJLsb",
      "lastActivityAt": "2026-11-17T14:25:45.960Z",
      "url": "https://trello.com/b/XfzfJLsb/mulher-01",
      "visibility": "workspace",
      "description": "",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "workspace": {
        "id": "ari:cloud:trello::workspace/619d477c7c24505bb90fe13f",
        "displayName": "Trello Workspace"
      }
    }
  ],
  "pageInfo": {
    "hasNextPage": false,
    "endCursor": "eyJvYmplY3RJZCI6IjZhOWZmY2YwOTlmMzQxMGIyZTA3YTcwMiJ9"
  }
}
```

**Tool: trello_trelloSearch**

**Input:**
```json
{
  "action": "search_cards",
  "query": "fatec"
}
```

**Output:**
```
{
  "cards": [
    {
      "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab6618a5977a19f5dc0e2b2",
      "objectId": "6ab6618a5977a19f5dc0e2b2",
      "name": "Verificação da conectividade básica da API com um endpoint de health check.",
      "closed": false,
      "lastActivityAt": "2026-11-03T11:58:31.870Z",
      "url": "https://trello.com/c/GiGabMGB/21-verifica%C3%A7%C3%A3o-da-conectividade-b%C3%A1sica-da-api-com-um-endpoint-de-health-check",
      "shortUrl": "https://trello.com/c/GiGabMGB",
      "desc": "Verificação da conectividade básica da API com um endpoint de health check.\n\nConcluído:\n- Endpoint GET /health implementado na API TypeScript/Express.\n- O endpoint executa SELECT NOW() no PostgreSQL e retorna status, timestamp da API e horário do banco.\n- Deploy de produção configurado na Vercel com as credenciais do projeto Supabase.\n- Endpoint publicado: https://fatec-women-api.vercel.app/health.",
      "list": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c15975a4e1ef3f6a92a",
        "name": "Concluido (Sprint 3)"
      },
      "board": {
        "id": "ari:cloud:trello::board/workspace/619d477c7c24505bb90fe13f/6a9ffcf099f3410b2e07a702",
        "name": "MULHER-01"
      }
    },
    {
      "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab26506cd4b9e8836af0856",
      "objectId": "6ab26506cd4b9e8836af0856",
      "name": "Configurar Schema do Banco e Endpoints da API para Registro de Casos",
      "closed": false,
      "lastActivityAt": "2026-11-03T11:58:30.852Z",
      "url": "https://trello.com/c/NmKFyZs0/12-configurar-schema-do-banco-e-endpoints-da-api-para-registro-de-casos",
      "shortUrl": "https://trello.com/c/NmKFyZs0",
      "desc": "Configurar o esquema do banco de dados e os endpoints da API para suportar o registro e a notificação de casos.\n\nConcluído:\n- API TypeScript/Express implementada em src/api/src/index.ts.\n- GET /reports e POST /reports integrados ao PostgreSQL/Supabase.\n- Validação de payload com resposta 422 documentada.\n- Contrato OpenAPI versionado em src/api/swagger.yaml.\n- Variáveis DB_HOST, DB_PORT, DB_NAME, DB_USER e DB_PASSWORD configuradas como secrets na Vercel para Production, Preview e Development.\n- Deploy de produção disponível em https://fatec-women-api.vercel.app.",
      "list": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c15975a4e1ef3f6a92a",
        "name": "Concluido (Sprint 3)"
      },
      "board": {
        "id": "ari:cloud:trello::board/workspace/619d477c7c24505bb90fe13f/6a9ffcf099f3410b2e07a702",
        "name": "MULHER-01"
      }
    }
  ],
  "nextCursor": "eyJwYWdlIjoxLCJmaXJzdCI6MTB9",
  "hasMore": false
}
```

---

## Assistant (Code · Auto Free · 7.3s)

**Tool: trello_trelloReadCard**

**Input:**
```json
{
  "action": "list_by_board",
  "boardIdOrUrl": "https://trello.com/b/XfzfJLsb/mulher-01"
}
```

**Output:**
```
{
  "lists": [
    {
      "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6aa92d7d513647af83c42e77",
      "name": "Sprint 1",
      "cards": [
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab65da699a8606da24b68f9",
          "name": "Consolidar a proposta do projeto",
          "description": "",
          "url": "https://trello.com/c/7AhBdQSu/17-consolidar-a-proposta-do-projeto",
          "shortUrl": "https://trello.com/c/7AhBdQSu",
          "closed": false,
          "complete": true,
          "position": 140737488338944,
          "lastActivityAt": "2026-09-25T11:40:25.964Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab65d1193957e40d0837a87",
          "name": "Instalação do Docker",
          "description": "Configuração do docker- compose. yaml para orquestrar a APIe o Banco de\nDados",
          "url": "https://trello.com/c/l0GRwK1K/16-instala%C3%A7%C3%A3o-do-docker",
          "shortUrl": "https://trello.com/c/l0GRwK1K",
          "closed": false,
          "complete": true,
          "position": 140737488347136,
          "lastActivityAt": "2026-09-29T11:35:51.496Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab65e2d00d05acc8ded6dee",
          "name": "Implementar o uso do Android Studio",
          "description": "Usado para compilar o aplicativo para que possa ser usado no celular",
          "url": "https://trello.com/c/IhbRMWxl/18-implementar-o-uso-do-android-studio",
          "shortUrl": "https://trello.com/c/IhbRMWxl",
          "closed": false,
          "complete": true,
          "position": 140737488351232,
          "lastActivityAt": "2026-09-25T11:44:07.679Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        }
      ]
    },
    {
      "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67804ba8ea876f612305d",
      "name": "Sprint 2",
      "cards": [
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6aa92d90f204debc4f4c178b",
          "name": "Entregar a Matriz RACI",
          "description": "Realizada pelo Tarsis",
          "url": "https://trello.com/c/0XVfAEa0/1-entregar-a-matriz-raci",
          "shortUrl": "https://trello.com/c/0XVfAEa0",
          "closed": false,
          "complete": true,
          "position": 140737488355328,
          "lastActivityAt": "2026-09-25T13:46:47.794Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6abba217d932d79305cceee1",
          "name": "Traduzir o Back-End do projeto do node js para o Python",
          "description": "",
          "url": "https://trello.com/c/YANCRL8s/48-traduzir-o-back-end-do-projeto-do-node-js-para-o-python",
          "shortUrl": "https://trello.com/c/YANCRL8s",
          "closed": false,
          "complete": true,
          "position": 140737488363520,
          "lastActivityAt": "2026-10-06T13:07:17.713Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab677c5a7183f8eebb34085",
          "name": "Desenvolver formulário de registro de ocorrências",
          "description": "Aqui serão implementados os campos de denúncias do aplicativo que são: Nome, Endereço (ou localização atual), Relato da denúncia (descrição), Anexo de imagem (opcional).\n\nimportante: Apenas o campo de relato da denúncia é obrigatório!!!",
          "url": "https://trello.com/c/x9RITJBL/22-desenvolver-formul%C3%A1rio-de-registro-de-ocorr%C3%AAncias",
          "shortUrl": "https://trello.com/c/x9RITJBL",
          "closed": false,
          "complete": true,
          "position": 140737488371712,
          "lastActivityAt": "2026-09-25T14:42:10.416Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [
            {
              "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
              "fullName": "Tarsis Mikael Ventura Dumas de Lima",
              "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
            }
          ],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab687982e175b8618bdbe75",
          "name": "Refinar formulário de registro de ocorrências",
          "description": "- [ ] Campo de imagens deve ser ImagePicker.\n- [ ] Campo de geolocalização deve ser automaticamente carregado.",
          "url": "https://trello.com/c/1HZgwAnn/47-refinar-formul%C3%A1rio-de-registro-de-ocorr%C3%AAncias",
          "shortUrl": "https://trello.com/c/1HZgwAnn",
          "closed": false,
          "complete": true,
          "position": 140737488388096,
          "lastActivityAt": "2026-09-29T11:29:27.621Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [
            {
              "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
              "fullName": "Tarsis Mikael Ventura Dumas de Lima",
              "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
            }
          ],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab6844d9b9d322b53ee69ab",
          "name": "Adicionar tela de Listagem de Relatos no Android",
          "description": "",
          "url": "https://trello.com/c/vagQnWvF/45-adicionar-tela-de-listagem-de-relatos-no-android",
          "shortUrl": "https://trello.com/c/vagQnWvF",
          "closed": false,
          "complete": true,
          "position": 140737488404480,
          "lastActivityAt": "2026-09-29T14:40:16.201Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67d41ec75dbdf8a61be28",
          "name": "Planejar Apresentação  (Sprint 2) para o Professor",
          "description": "",
          "url": "https://trello.com/c/SQNWyBIj/33-planejar-apresenta%C3%A7%C3%A3o-sprint-2-para-o-professor",
          "shortUrl": "https://trello.com/c/SQNWyBIj",
          "closed": false,
          "complete": true,
          "position": 140737488527360,
          "lastActivityAt": "2026-10-27T12:39:05.309Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67d5d2fb9e1592567a7f2",
          "name": "Realizar Apresentação (Sprint 2) para o Professor",
          "description": "",
          "url": "https://trello.com/c/dzgdkWV9/34-realizar-apresenta%C3%A7%C3%A3o-sprint-2-para-o-professor",
          "shortUrl": "https://trello.com/c/dzgdkWV9",
          "closed": false,
          "complete": true,
          "position": 140737488531456,
          "lastActivityAt": "2026-10-27T12:39:08.078Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67cf56df496fed753e2c9",
          "name": "Planejar Apresentação  (Sprint 2) para o Stakeholder",
          "description": "",
          "url": "https://trello.com/c/A96ju5yU/31-planejar-apresenta%C3%A7%C3%A3o-sprint-2-para-o-stakeholder",
          "shortUrl": "https://trello.com/c/A96ju5yU",
          "closed": false,
          "complete": true,
          "position": 140737488535552,
          "lastActivityAt": "2026-10-27T12:39:10.765Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67d03b79e18608d67e3ee",
          "name": "Realizar Apresentação (Sprint 2) para o Stakeholder",
          "description": "",
          "url": "https://trello.com/c/uopmB8YJ/32-realizar-apresenta%C3%A7%C3%A3o-sprint-2-para-o-stakeholder",
          "shortUrl": "https://trello.com/c/uopmB8YJ",
          "closed": false,
          "complete": true,
          "position": 140737488551936,
          "lastActivityAt": "2026-10-27T12:39:13.400Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab684513be2cc1336e5ce28",
          "name": "Remover telas de Home, Favoritos e Perfil do Android",
          "description": "",
          "url": "https://trello.com/c/3ZoTP4zd/46-remover-telas-de-home-favoritos-e-perfil-do-android",
          "shortUrl": "https://trello.com/c/3ZoTP4zd",
          "closed": false,
          "complete": true,
          "position": 140737488568320,
          "lastActivityAt": "2026-10-27T12:39:17.227Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab6617779af03d22d5f1961",
          "name": "Implantação do container do banco de dados PostgreSQL com um script de inicialização automatizado",
          "description": "",
          "url": "https://trello.com/c/8OqFSF3a/20-implanta%C3%A7%C3%A3o-do-container-do-banco-de-dados-postgresql-com-um-script-de-inicializa%C3%A7%C3%A3o-automatizado",
          "shortUrl": "https://trello.com/c/8OqFSF3a",
          "closed": false,
          "complete": true,
          "position": 140737488576512,
          "lastActivityAt": "2026-10-27T12:39:28.670Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab678c0149a7f61da656867",
          "name": "Entregar Sprint Review 2",
          "description": "",
          "url": "https://trello.com/c/ixDKUkc4/25-entregar-sprint-review-2",
          "shortUrl": "https://trello.com/c/ixDKUkc4",
          "closed": false,
          "complete": true,
          "position": 140737488580864,
          "lastActivityAt": "2026-10-27T12:39:49.295Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [
            {
              "id": "ari:cloud:trello::user/69e8cfce0a778d4d055bc484",
              "fullName": "LUIZ HENRIQUE CREPALDI DA SILVA",
              "avatarUrl": "https://trello-members.s3.amazonaws.com/69e8cfce0a778d4d055bc484/d7eae9f62f5e680018ce6adf4b9867ab"
            },
            {
              "id": "ari:cloud:trello::user/6a0daa69aa38f80ca1c9091f",
              "fullName": "luizhenrisilva3",
              "avatarUrl": "https://trello-members.s3.amazonaws.com/6a0daa69aa38f80ca1c9091f/bd3ab5bd7ec9bbc6b570f83a7f4b37f6"
            }
          ],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab678a0ee137ffd0ce21af5",
          "name": "Panejar Sprint Review 2",
          "description": "",
          "url": "https://trello.com/c/qjquoRU3/24-panejar-sprint-review-2",
          "shortUrl": "https://trello.com/c/qjquoRU3",
          "closed": false,
          "complete": true,
          "position": 140737488581120,
          "lastActivityAt": "2026-10-27T12:39:47.045Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [
            {
              "id": "ari:cloud:trello::user/69e8cfce0a778d4d055bc484",
              "fullName": "LUIZ HENRIQUE CREPALDI DA SILVA",
              "avatarUrl": "https://trello-members.s3.amazonaws.com/69e8cfce0a778d4d055bc484/d7eae9f62f5e680018ce6adf4b9867ab"
            },
            {
              "id": "ari:cloud:trello::user/6a0daa69aa38f80ca1c9091f",
              "fullName": "luizhenrisilva3",
              "avatarUrl": "https://trello-members.s3.amazonaws.com/6a0daa69aa38f80ca1c9091f/bd3ab5bd7ec9bbc6b570f83a7f4b37f6"
            }
          ],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab678d1a582d39f35ddcb62",
          "name": "Entregar Sprint Planning 2",
          "description": "",
          "url": "https://trello.com/c/g2zcRDQz/26-entregar-sprint-planning-2",
          "shortUrl": "https://trello.com/c/g2zcRDQz",
          "closed": false,
          "complete": true,
          "position": 140737488581632,
          "lastActivityAt": "2026-10-27T12:39:44.519Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [
            {
              "id": "ari:cloud:trello::user/69e8cfce0a778d4d055bc484",
              "fullName": "LUIZ HENRIQUE CREPALDI DA SILVA",
              "avatarUrl": "https://trello-members.s3.amazonaws.com/69e8cfce0a778d4d055bc484/d7eae9f62f5e680018ce6adf4b9867ab"
            },
            {
              "id": "ari:cloud:trello::user/6a0daa69aa38f80ca1c9091f",
              "fullName": "luizhenrisilva3",
              "avatarUrl": "https://trello-members.s3.amazonaws.com/6a0daa69aa38f80ca1c9091f/bd3ab5bd7ec9bbc6b570f83a7f4b37f6"
            }
          ],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab678598359ea245043d3b1",
          "name": "Planejar Sprint Planning 2",
          "description": "",
          "url": "https://trello.com/c/D33aHY35/23-planejar-sprint-planning-2",
          "shortUrl": "https://trello.com/c/D33aHY35",
          "closed": false,
          "complete": true,
          "position": 140737488582656,
          "lastActivityAt": "2026-10-27T12:39:42.169Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [
            {
              "id": "ari:cloud:trello::user/69e8cfce0a778d4d055bc484",
              "fullName": "LUIZ HENRIQUE CREPALDI DA SILVA",
              "avatarUrl": "https://trello-members.s3.amazonaws.com/69e8cfce0a778d4d055bc484/d7eae9f62f5e680018ce6adf4b9867ab"
            },
            {
              "id": "ari:cloud:trello::user/6a0daa69aa38f80ca1c9091f",
              "fullName": "luizhenrisilva3",
              "avatarUrl": "https://trello-members.s3.amazonaws.com/6a0daa69aa38f80ca1c9091f/bd3ab5bd7ec9bbc6b570f83a7f4b37f6"
            }
          ],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        }
      ]
    },
    {
      "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab678093fa1659555f2d338",
      "name": "A Fazer (Sprint 3)",
      "cards": [
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab2650652165d5bcaff38f1",
          "name": "Implementar Autenticação por Reconhecimento Facial",
          "description": "Implementar a autenticação por reconhecimento facial conforme descrito no README.md.",
          "url": "https://trello.com/c/EmYIA9ZZ/13-implementar-autentica%C3%A7%C3%A3o-por-reconhecimento-facial",
          "shortUrl": "https://trello.com/c/EmYIA9ZZ",
          "closed": false,
          "complete": false,
          "position": 140737488355328,
          "lastActivityAt": "2026-09-25T14:18:41.428Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": false
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [
            {
              "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
              "fullName": "Tarsis Mikael Ventura Dumas de Lima",
              "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
            }
          ],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67badbe693c46b8cc9778",
          "name": "Entregar Sprint Review 3",
          "description": "",
          "url": "https://trello.com/c/B1kkp0n0/29-entregar-sprint-review-3",
          "shortUrl": "https://trello.com/c/B1kkp0n0",
          "closed": false,
          "complete": false,
          "position": 140737488404480,
          "lastActivityAt": "2026-09-25T13:59:12.113Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": false
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [
            {
              "id": "ari:cloud:trello::user/69e8cfce0a778d4d055bc484",
              "fullName": "LUIZ HENRIQUE CREPALDI DA SILVA",
              "avatarUrl": "https://trello-members.s3.amazonaws.com/69e8cfce0a778d4d055bc484/d7eae9f62f5e680018ce6adf4b9867ab"
            },
            {
              "id": "ari:cloud:trello::user/6a0daa69aa38f80ca1c9091f",
              "fullName": "luizhenrisilva3",
              "avatarUrl": "https://trello-members.s3.amazonaws.com/6a0daa69aa38f80ca1c9091f/bd3ab5bd7ec9bbc6b570f83a7f4b37f6"
            }
          ],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ac11e1869974f269c39c717",
          "name": "Implementar listagem de relatos com controle de acesso (P1)",
          "description": "Critério: relatos são ordenados pelo mais recente, exibem localização e imagem somente quando disponíveis e não expõem dados para usuários não autorizados.",
          "url": "https://trello.com/c/yrpgeec5/53-implementar-listagem-de-relatos-com-controle-de-acesso-p1",
          "shortUrl": "https://trello.com/c/yrpgeec5",
          "closed": false,
          "complete": false,
          "position": 140737488601088,
          "lastActivityAt": "2026-10-03T15:24:08.909Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": false
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        }
      ]
    },
    {
      "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c02d6697a30ae1f1dec",
      "name": "Fazendo (Sprint 3)",
      "cards": [
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab6831b431352670a257ad2",
          "name": "Refinamento de UI/UX dos Formulários",
          "description": "Melhorar a acessibilidade e a usabilidade dos formulários de denúncia para facilitar o uso por vítimas em situação de estresse.",
          "url": "https://trello.com/c/1hqQJVtA/43-refinamento-de-ui-ux-dos-formul%C3%A1rios",
          "shortUrl": "https://trello.com/c/1hqQJVtA",
          "closed": false,
          "complete": false,
          "position": 140737488502784,
          "lastActivityAt": "2026-10-27T12:40:58.529Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": false
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab6831d21c6bf2ff35fcd7f",
          "name": "Testes de Integração End-to-End",
          "description": "Verificar o fluxo completo desde o aplicativo Android, passando pela API, até o Banco de Dados para garantir que tudo esteja funcionando corretamente.",
          "url": "https://trello.com/c/fghc5lna/44-testes-de-integra%C3%A7%C3%A3o-end-to-end",
          "shortUrl": "https://trello.com/c/fghc5lna",
          "closed": false,
          "complete": false,
          "position": 140737488519168,
          "lastActivityAt": "2026-11-09T11:04:15.227Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": false
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ac11e2ee15e8b48833b60a0",
          "name": "Implementar perfil e mensagens (P1)",
          "description": "Critério: endpoints e telas correspondentes existem, ou as tabelas users e messages são removidas do escopo documentado.",
          "url": "https://trello.com/c/jF8r0jHp/56-implementar-perfil-e-mensagens-p1",
          "shortUrl": "https://trello.com/c/jF8r0jHp",
          "closed": false,
          "complete": false,
          "position": 140737488520192,
          "lastActivityAt": "2026-11-17T14:25:39.015Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": false
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ac11e1160ed63a5e63268b0",
          "name": "Implementar autenticação e autorização (P0)",
          "description": "Critério: endpoints protegidos rejeitam requisições sem credenciais; a consulta de relatos não fica pública por padrão.",
          "url": "https://trello.com/c/LINs24xz/50-implementar-autentica%C3%A7%C3%A3o-e-autoriza%C3%A7%C3%A3o-p0",
          "shortUrl": "https://trello.com/c/LINs24xz",
          "closed": false,
          "complete": false,
          "position": 140737488521216,
          "lastActivityAt": "2026-11-17T14:24:28.452Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": false
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ac11e0f178d383b3f15418a",
          "name": "Implementar cadastro e login de usuário (P0)",
          "description": "Critério: credenciais persistidas com senha protegida, login retorna sessão/token válido.",
          "url": "https://trello.com/c/OOEivMbD/49-implementar-cadastro-e-login-de-usu%C3%A1rio-p0",
          "shortUrl": "https://trello.com/c/OOEivMbD",
          "closed": false,
          "complete": false,
          "position": 140737488523264,
          "lastActivityAt": "2026-11-17T14:24:24.863Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": false
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67f39b463700b5cf77a8e",
          "name": "Realizar Apresentação Final",
          "description": "",
          "url": "https://trello.com/c/GlEvLcCp/39-realizar-apresenta%C3%A7%C3%A3o-final",
          "shortUrl": "https://trello.com/c/GlEvLcCp",
          "closed": false,
          "complete": false,
          "position": 140737488527360,
          "lastActivityAt": "2026-11-17T14:24:09.536Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": false
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ac11e308e949b1a3666e122",
          "name": "Criar testes automatizados da API (P1)",
          "description": "Critério: existem testes para health check, login, autorização, criação de relato, validação e listagem.",
          "url": "https://trello.com/c/auIq3NB6/57-criar-testes-automatizados-da-api-p1",
          "shortUrl": "https://trello.com/c/auIq3NB6",
          "closed": false,
          "complete": false,
          "position": 140737488535552,
          "lastActivityAt": "2026-11-16T13:01:46.948Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": false
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ac11e1661151a6f5164e5eb",
          "name": "Validar entradas da API (P0)",
          "description": "Critério: detalhes vazios, coordenadas inválidas, URLs inválidas e campos acima do limite são rejeitados com resposta consistente.",
          "url": "https://trello.com/c/SWV257gX/52-validar-entradas-da-api-p0",
          "shortUrl": "https://trello.com/c/SWV257gX",
          "closed": false,
          "complete": false,
          "position": 140737488584704,
          "lastActivityAt": "2026-11-16T13:00:44.886Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": false
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ac11e34f0f013c580a95896",
          "name": "Executar testes de integração com PostgreSQL (P1)",
          "description": "Critério: o fluxo de criação e consulta é validado contra o banco em ambiente reproduzível.",
          "url": "https://trello.com/c/NeU7r5CZ/58-executar-testes-de-integra%C3%A7%C3%A3o-com-postgresql-p1",
          "shortUrl": "https://trello.com/c/NeU7r5CZ",
          "closed": false,
          "complete": false,
          "position": 140737488683008,
          "lastActivityAt": "2026-11-16T13:01:27.262Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": false
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ac11e361fd4ccce9291d5e6",
          "name": "Padronizar respostas e tratamento de erros (P1)",
          "description": "Critério: erros de validação, autenticação, autorização e banco retornam status HTTP e formato documentados.",
          "url": "https://trello.com/c/QCZPafSR/59-padronizar-respostas-e-tratamento-de-erros-p1",
          "shortUrl": "https://trello.com/c/QCZPafSR",
          "closed": false,
          "complete": false,
          "position": 140737488699392,
          "lastActivityAt": "2026-11-16T13:01:44.382Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": false
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        }
      ]
    },
    {
      "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c15975a4e1ef3f6a92a",
      "name": "Concluido (Sprint 3)",
      "cards": [
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67b8b77f05ce4beb47191",
          "name": "Planejar Sprint Planning 3",
          "description": "",
          "url": "https://trello.com/c/RcCGgOQi/27-planejar-sprint-planning-3",
          "shortUrl": "https://trello.com/c/RcCGgOQi",
          "closed": false,
          "complete": true,
          "position": 140737488355328,
          "lastActivityAt": "2026-10-27T12:41:32.404Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [
            {
              "id": "ari:cloud:trello::user/69e8cfce0a778d4d055bc484",
              "fullName": "LUIZ HENRIQUE CREPALDI DA SILVA",
              "avatarUrl": "https://trello-members.s3.amazonaws.com/69e8cfce0a778d4d055bc484/d7eae9f62f5e680018ce6adf4b9867ab"
            },
            {
              "id": "ari:cloud:trello::user/6a0daa69aa38f80ca1c9091f",
              "fullName": "luizhenrisilva3",
              "avatarUrl": "https://trello-members.s3.amazonaws.com/6a0daa69aa38f80ca1c9091f/bd3ab5bd7ec9bbc6b570f83a7f4b37f6"
            }
          ],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67f4ffd70719a780ab3ac",
          "name": "Planejar Apresentação Final",
          "description": "",
          "url": "https://trello.com/c/HuazQZeV/40-planejar-apresenta%C3%A7%C3%A3o-final",
          "shortUrl": "https://trello.com/c/HuazQZeV",
          "closed": false,
          "complete": true,
          "position": 140737488355840,
          "lastActivityAt": "2026-11-09T11:03:59.380Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67ded5a225ca018d41ac3",
          "name": "Realizar Apresentação (Prévia Final) para o Professor",
          "description": "",
          "url": "https://trello.com/c/23tWt3xK/36-realizar-apresenta%C3%A7%C3%A3o-pr%C3%A9via-final-para-o-professor",
          "shortUrl": "https://trello.com/c/23tWt3xK",
          "closed": false,
          "complete": true,
          "position": 140737488356352,
          "lastActivityAt": "2026-11-09T11:03:53.468Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ac11e3b4e6b5aa5c396ebac",
          "name": "Atualizar a documentação das sprints (P2)",
          "description": "Critério: reviews não marcam como concluídas funcionalidades que ainda não existem no código.",
          "url": "https://trello.com/c/d9k23yk3/61-atualizar-a-documenta%C3%A7%C3%A3o-das-sprints-p2",
          "shortUrl": "https://trello.com/c/d9k23yk3",
          "closed": false,
          "complete": true,
          "position": 140737488356864,
          "lastActivityAt": "2026-11-17T14:25:45.960Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67dba733b29b5ea6ec241",
          "name": "Planejar Apresentação (Prévia Final) para o Professor",
          "description": "",
          "url": "https://trello.com/c/sQGbv4wz/35-planejar-apresenta%C3%A7%C3%A3o-pr%C3%A9via-final-para-o-professor",
          "shortUrl": "https://trello.com/c/sQGbv4wz",
          "closed": false,
          "complete": true,
          "position": 140737488357376,
          "lastActivityAt": "2026-11-09T11:03:49.299Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ac11e39aac47953f65b43d5",
          "name": "Otimizar os Dockerfiles (P2)",
          "description": "Critério: dependências são instaladas de forma determinística, imagens usam estágios adequados e o container inicia sem depender de volume de código.",
          "url": "https://trello.com/c/HnlACwZI/60-otimizar-os-dockerfiles-p2",
          "shortUrl": "https://trello.com/c/HnlACwZI",
          "closed": false,
          "complete": true,
          "position": 140737488358400,
          "lastActivityAt": "2026-11-16T13:01:34.465Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67b9c329cdd4228710a51",
          "name": "Planejar Sprint Review 3",
          "description": "",
          "url": "https://trello.com/c/N1boPPZo/28-planejar-sprint-review-3",
          "shortUrl": "https://trello.com/c/N1boPPZo",
          "closed": false,
          "complete": true,
          "position": 140737488359424,
          "lastActivityAt": "2026-11-09T11:03:40.573Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [
            {
              "id": "ari:cloud:trello::user/69e8cfce0a778d4d055bc484",
              "fullName": "LUIZ HENRIQUE CREPALDI DA SILVA",
              "avatarUrl": "https://trello-members.s3.amazonaws.com/69e8cfce0a778d4d055bc484/d7eae9f62f5e680018ce6adf4b9867ab"
            },
            {
              "id": "ari:cloud:trello::user/6a0daa69aa38f80ca1c9091f",
              "fullName": "luizhenrisilva3",
              "avatarUrl": "https://trello-members.s3.amazonaws.com/6a0daa69aa38f80ca1c9091f/bd3ab5bd7ec9bbc6b570f83a7f4b37f6"
            }
          ],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67bceb595bd7d8d1af747",
          "name": "Entregar Sprint Planning 3",
          "description": "",
          "url": "https://trello.com/c/Lh8u55uX/30-entregar-sprint-planning-3",
          "shortUrl": "https://trello.com/c/Lh8u55uX",
          "closed": false,
          "complete": true,
          "position": 140737488363520,
          "lastActivityAt": "2026-11-06T13:41:19.210Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [
            {
              "id": "ari:cloud:trello::user/69e8cfce0a778d4d055bc484",
              "fullName": "LUIZ HENRIQUE CREPALDI DA SILVA",
              "avatarUrl": "https://trello-members.s3.amazonaws.com/69e8cfce0a778d4d055bc484/d7eae9f62f5e680018ce6adf4b9867ab"
            },
            {
              "id": "ari:cloud:trello::user/6a0daa69aa38f80ca1c9091f",
              "fullName": "luizhenrisilva3",
              "avatarUrl": "https://trello-members.s3.amazonaws.com/6a0daa69aa38f80ca1c9091f/bd3ab5bd7ec9bbc6b570f83a7f4b37f6"
            }
          ],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab26506cd4b9e8836af0856",
          "name": "Configurar Schema do Banco e Endpoints da API para Registro de Casos",
          "description": "Configurar o esquema do banco de dados e os endpoints da API para suportar o registro e a notificação de casos.\n\nConcluído:\n- API TypeScript/Express implementada em src/api/src/index.ts.\n- GET /reports e POST /reports integrados ao PostgreSQL/Supabase.\n- Validação de payload com resposta 422 documentada.\n- Contrato OpenAPI versionado em src/api/swagger.yaml.\n- Variáveis DB_HOST, DB_PORT, DB_NAME, DB_USER e DB_PASSWORD configuradas como secrets na Vercel para Production, Preview e Development.\n- Deploy de produção disponível em https://fatec-women-api.vercel.app.",
          "url": "https://trello.com/c/NmKFyZs0/12-configurar-schema-do-banco-e-endpoints-da-api-para-registro-de-casos",
          "shortUrl": "https://trello.com/c/NmKFyZs0",
          "closed": false,
          "complete": true,
          "position": 140737488371712,
          "lastActivityAt": "2026-11-03T11:58:30.852Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [
            {
              "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
              "fullName": "Tarsis Mikael Ventura Dumas de Lima",
              "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
            }
          ],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        },
        {
          "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab6618a5977a19f5dc0e2b2",
          "name": "Verificação da conectividade básica da API com um endpoint de health check.",
          "description": "Verificação da conectividade básica da API com um endpoint de health check.\n\nConcluído:\n- Endpoint GET /health implementado na API TypeScript/Express.\n- O endpoint executa SELECT NOW() no PostgreSQL e retorna status, timestamp da API e horário do banco.\n- Deploy de produção configurado na Vercel com as credenciais do projeto Supabase.\n- Endpoint publicado: https://fatec-women-api.vercel.app/health.",
          "url": "https://trello.com/c/GiGabMGB/21-verifica%C3%A7%C3%A3o-da-conectividade-b%C3%A1sica-da-api-com-um-endpoint-de-health-check",
          "shortUrl": "https://trello.com/c/GiGabMGB",
          "closed": false,
          "complete": true,
          "position": 140737488388096,
          "lastActivityAt": "2026-11-03T11:58:31.870Z",
          "startedAt": null,
          "due": {
            "date": null,
            "complete": true
          },
          "listId": null,
          "boardId": null,
          "labels": [],
          "labelsHasMore": false,
          "checklists": [],
          "checklistsHasMore": false,
          "members": [],
          "comments": [],
          "commentsHasMore": false,
          "list": null,
          "board": null
        }
      ]
    }
  ],
  "hasNextPage": true,
  "nextCursor": "eyJwb3NpdGlvbiI6MTMxMDcyLCJvYmplY3RJZCI6IjZhYjY3YzE1OTc1YTRlMWVmM2Y2YTkyYSIsImZpbHRlciI6eyJjbG9zZWQiOmZhbHNlfX0=",
  "board": {
    "id": "ari:cloud:trello::board/workspace/619d477c7c24505bb90fe13f/6a9ffcf099f3410b2e07a702",
    "name": "MULHER-01"
  }
}
```

**Tool: trello_trelloReadBoard**

**Input:**
```json
{
  "action": "list_activity",
  "boardId": "ari:cloud:trello::board/workspace/619d477c7c24505bb90fe13f/6a9ffcf099f3410b2e07a702"
}
```

**Output:**
```
{
  "activities": [
    {
      "id": "ari:cloud:trello::action/6afc63e96922375dc20d2c1d",
      "type": "updateCard",
      "date": "2026-11-17T14:25:45.890Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ac11e3b4e6b5aa5c396ebac",
        "name": "Atualizar a documentação das sprints (P2)",
        "url": "https://trello.com/c/d9k23yk3/61-atualizar-a-documenta%C3%A7%C3%A3o-das-sprints-p2"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab678093fa1659555f2d338",
        "name": "A Fazer (Sprint 3)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c15975a4e1ef3f6a92a",
        "name": "Concluido (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6afc63e7c9c6a04a00d4235b",
      "type": "updateCard",
      "date": "2026-11-17T14:25:43.881Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ac11e3b4e6b5aa5c396ebac",
        "name": "Atualizar a documentação das sprints (P2)",
        "url": "https://trello.com/c/d9k23yk3/61-atualizar-a-documenta%C3%A7%C3%A3o-das-sprints-p2"
      }
    },
    {
      "id": "ari:cloud:trello::action/6afc63e28b8ef4d9229e2caf",
      "type": "updateCard",
      "date": "2026-11-17T14:25:38.937Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ac11e2ee15e8b48833b60a0",
        "name": "Implementar perfil e mensagens (P1)",
        "url": "https://trello.com/c/jF8r0jHp/56-implementar-perfil-e-mensagens-p1"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab678093fa1659555f2d338",
        "name": "A Fazer (Sprint 3)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c02d6697a30ae1f1dec",
        "name": "Fazendo (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6afc63da7f638a0861dc5d5f",
      "type": "updateCard",
      "date": "2026-11-17T14:25:30.161Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ac11e2b3e2f5b07cf69179d",
        "name": "Avaliar vínculo entre relato e usuário (P1)",
        "url": "https://trello.com/c/ZcmVmHZC/55-avaliar-v%C3%ADnculo-entre-relato-e-usu%C3%A1rio-p1"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab678093fa1659555f2d338",
        "name": "A Fazer (Sprint 3)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6afc63b8979c72e92a657a9c",
        "name": "Cancelado (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6afc63d6e16e95a97aa4bffb",
      "type": "updateCard",
      "date": "2026-11-17T14:25:26.659Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ac11e2773cba8297052acb5",
        "name": "Adicionar ciclo de acompanhamento do relato (P1)",
        "url": "https://trello.com/c/euqNjVIM/54-adicionar-ciclo-de-acompanhamento-do-relato-p1"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab678093fa1659555f2d338",
        "name": "A Fazer (Sprint 3)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6afc63b8979c72e92a657a9c",
        "name": "Cancelado (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6afc63cf5c173c51a0ceb0d4",
      "type": "updateCard",
      "date": "2026-11-17T14:25:19.050Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ac11e13a49707d6f867d8f4",
        "name": "Definir a política de anonimato do relato (P0)",
        "url": "https://trello.com/c/BlztP9dx/51-definir-a-pol%C3%ADtica-de-anonimato-do-relato-p0"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab678093fa1659555f2d338",
        "name": "A Fazer (Sprint 3)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6afc63b8979c72e92a657a9c",
        "name": "Cancelado (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6afc63cc6c74bd9dd9d389e0",
      "type": "updateCard",
      "date": "2026-11-17T14:25:16.056Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab6831acd8759377a42a21d",
        "name": "Documentação de Uso para o Usuário Final",
        "url": "https://trello.com/c/nG6ax4oI/42-documenta%C3%A7%C3%A3o-de-uso-para-o-usu%C3%A1rio-final"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab678093fa1659555f2d338",
        "name": "A Fazer (Sprint 3)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6afc63b8979c72e92a657a9c",
        "name": "Cancelado (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6afc63c7f5deba8c799efa86",
      "type": "updateCard",
      "date": "2026-11-17T14:25:11.700Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab6831a355c750d8d7df931",
        "name": "Auditoria de Segurança de Dados",
        "url": "https://trello.com/c/h5YFvSOQ/41-auditoria-de-seguran%C3%A7a-de-dados"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab678093fa1659555f2d338",
        "name": "A Fazer (Sprint 3)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6afc63b8979c72e92a657a9c",
        "name": "Cancelado (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6afc639c81aa0326b96479e9",
      "type": "updateCard",
      "date": "2026-11-17T14:24:28.379Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ac11e1160ed63a5e63268b0",
        "name": "Implementar autenticação e autorização (P0)",
        "url": "https://trello.com/c/LINs24xz/50-implementar-autentica%C3%A7%C3%A3o-e-autoriza%C3%A7%C3%A3o-p0"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab678093fa1659555f2d338",
        "name": "A Fazer (Sprint 3)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c02d6697a30ae1f1dec",
        "name": "Fazendo (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6afc6398ab24c3bed15a2d7c",
      "type": "updateCard",
      "date": "2026-11-17T14:24:24.791Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ac11e0f178d383b3f15418a",
        "name": "Implementar cadastro e login de usuário (P0)",
        "url": "https://trello.com/c/OOEivMbD/49-implementar-cadastro-e-login-de-usu%C3%A1rio-p0"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab678093fa1659555f2d338",
        "name": "A Fazer (Sprint 3)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c02d6697a30ae1f1dec",
        "name": "Fazendo (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6afc6389676230beed3c31d6",
      "type": "updateCard",
      "date": "2026-11-17T14:24:09.437Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67f39b463700b5cf77a8e",
        "name": "Realizar Apresentação Final",
        "url": "https://trello.com/c/GlEvLcCp/39-realizar-apresenta%C3%A7%C3%A3o-final"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab678093fa1659555f2d338",
        "name": "A Fazer (Sprint 3)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c02d6697a30ae1f1dec",
        "name": "Fazendo (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6afafeba75a5984747abb962",
      "type": "updateCard",
      "date": "2026-11-16T13:01:46.869Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ac11e308e949b1a3666e122",
        "name": "Criar testes automatizados da API (P1)",
        "url": "https://trello.com/c/auIq3NB6/57-criar-testes-automatizados-da-api-p1"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab678093fa1659555f2d338",
        "name": "A Fazer (Sprint 3)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c02d6697a30ae1f1dec",
        "name": "Fazendo (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6afafeb895c7f2ab5d8b87f5",
      "type": "updateCard",
      "date": "2026-11-16T13:01:44.396Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ac11e361fd4ccce9291d5e6",
        "name": "Padronizar respostas e tratamento de erros (P1)",
        "url": "https://trello.com/c/QCZPafSR/59-padronizar-respostas-e-tratamento-de-erros-p1"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab678093fa1659555f2d338",
        "name": "A Fazer (Sprint 3)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c02d6697a30ae1f1dec",
        "name": "Fazendo (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6afafeae452cdae67375aaf8",
      "type": "updateCard",
      "date": "2026-11-16T13:01:34.337Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ac11e39aac47953f65b43d5",
        "name": "Otimizar os Dockerfiles (P2)",
        "url": "https://trello.com/c/HnlACwZI/60-otimizar-os-dockerfiles-p2"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c02d6697a30ae1f1dec",
        "name": "Fazendo (Sprint 3)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c15975a4e1ef3f6a92a",
        "name": "Concluido (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6afafeac1ee490a00589b345",
      "type": "updateCard",
      "date": "2026-11-16T13:01:32.273Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ac11e39aac47953f65b43d5",
        "name": "Otimizar os Dockerfiles (P2)",
        "url": "https://trello.com/c/HnlACwZI/60-otimizar-os-dockerfiles-p2"
      }
    },
    {
      "id": "ari:cloud:trello::action/6afafeaa193f858c3a751529",
      "type": "updateCard",
      "date": "2026-11-16T13:01:30.897Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ac11e39aac47953f65b43d5",
        "name": "Otimizar os Dockerfiles (P2)",
        "url": "https://trello.com/c/HnlACwZI/60-otimizar-os-dockerfiles-p2"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab678093fa1659555f2d338",
        "name": "A Fazer (Sprint 3)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c02d6697a30ae1f1dec",
        "name": "Fazendo (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6afafea7bb5a2a07613ec275",
      "type": "updateCard",
      "date": "2026-11-16T13:01:27.272Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ac11e34f0f013c580a95896",
        "name": "Executar testes de integração com PostgreSQL (P1)",
        "url": "https://trello.com/c/NeU7r5CZ/58-executar-testes-de-integra%C3%A7%C3%A3o-com-postgresql-p1"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab678093fa1659555f2d338",
        "name": "A Fazer (Sprint 3)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c02d6697a30ae1f1dec",
        "name": "Fazendo (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6afafe7ce0eef3550ec15440",
      "type": "updateCard",
      "date": "2026-11-16T13:00:44.900Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ac11e1661151a6f5164e5eb",
        "name": "Validar entradas da API (P0)",
        "url": "https://trello.com/c/SWV257gX/52-validar-entradas-da-api-p0"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab678093fa1659555f2d338",
        "name": "A Fazer (Sprint 3)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c02d6697a30ae1f1dec",
        "name": "Fazendo (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6af1a8af7a930613d11334b8",
      "type": "updateCard",
      "date": "2026-11-09T11:04:15.239Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab6831d21c6bf2ff35fcd7f",
        "name": "Testes de Integração End-to-End",
        "url": "https://trello.com/c/fghc5lna/44-testes-de-integra%C3%A7%C3%A3o-end-to-end"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab678093fa1659555f2d338",
        "name": "A Fazer (Sprint 3)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c02d6697a30ae1f1dec",
        "name": "Fazendo (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6af1a89f06cbfb876733c571",
      "type": "updateCard",
      "date": "2026-11-09T11:03:59.272Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67f4ffd70719a780ab3ac",
        "name": "Planejar Apresentação Final",
        "url": "https://trello.com/c/HuazQZeV/40-planejar-apresenta%C3%A7%C3%A3o-final"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab678093fa1659555f2d338",
        "name": "A Fazer (Sprint 3)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c15975a4e1ef3f6a92a",
        "name": "Concluido (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6af1a89d56d8a496d70bff9d",
      "type": "updateCard",
      "date": "2026-11-09T11:03:57.689Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67f4ffd70719a780ab3ac",
        "name": "Planejar Apresentação Final",
        "url": "https://trello.com/c/HuazQZeV/40-planejar-apresenta%C3%A7%C3%A3o-final"
      }
    },
    {
      "id": "ari:cloud:trello::action/6af1a899dbea13727dce2707",
      "type": "updateCard",
      "date": "2026-11-09T11:03:53.370Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67ded5a225ca018d41ac3",
        "name": "Realizar Apresentação (Prévia Final) para o Professor",
        "url": "https://trello.com/c/23tWt3xK/36-realizar-apresenta%C3%A7%C3%A3o-pr%C3%A9via-final-para-o-professor"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab678093fa1659555f2d338",
        "name": "A Fazer (Sprint 3)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c15975a4e1ef3f6a92a",
        "name": "Concluido (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6af1a8976a65f3f313706e84",
      "type": "updateCard",
      "date": "2026-11-09T11:03:51.907Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67ded5a225ca018d41ac3",
        "name": "Realizar Apresentação (Prévia Final) para o Professor",
        "url": "https://trello.com/c/23tWt3xK/36-realizar-apresenta%C3%A7%C3%A3o-pr%C3%A9via-final-para-o-professor"
      }
    },
    {
      "id": "ari:cloud:trello::action/6af1a895c23b6fc46b989a45",
      "type": "updateCard",
      "date": "2026-11-09T11:03:49.190Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67dba733b29b5ea6ec241",
        "name": "Planejar Apresentação (Prévia Final) para o Professor",
        "url": "https://trello.com/c/sQGbv4wz/35-planejar-apresenta%C3%A7%C3%A3o-pr%C3%A9via-final-para-o-professor"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab678093fa1659555f2d338",
        "name": "A Fazer (Sprint 3)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c15975a4e1ef3f6a92a",
        "name": "Concluido (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6af1a89331ca8cf09d3105d5",
      "type": "updateCard",
      "date": "2026-11-09T11:03:47.206Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67dba733b29b5ea6ec241",
        "name": "Planejar Apresentação (Prévia Final) para o Professor",
        "url": "https://trello.com/c/sQGbv4wz/35-planejar-apresenta%C3%A7%C3%A3o-pr%C3%A9via-final-para-o-professor"
      }
    },
    {
      "id": "ari:cloud:trello::action/6af1a88c943c996e86027c48",
      "type": "updateCard",
      "date": "2026-11-09T11:03:40.408Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67b9c329cdd4228710a51",
        "name": "Planejar Sprint Review 3",
        "url": "https://trello.com/c/N1boPPZo/28-planejar-sprint-review-3"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab678093fa1659555f2d338",
        "name": "A Fazer (Sprint 3)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c15975a4e1ef3f6a92a",
        "name": "Concluido (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6af1a88a3a637d719c358038",
      "type": "updateCard",
      "date": "2026-11-09T11:03:38.446Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67b9c329cdd4228710a51",
        "name": "Planejar Sprint Review 3",
        "url": "https://trello.com/c/N1boPPZo/28-planejar-sprint-review-3"
      }
    },
    {
      "id": "ari:cloud:trello::action/6aedd8ff9ceab9ff02bd68b7",
      "type": "updateCard",
      "date": "2026-11-06T13:41:19.125Z",
      "creator": {
        "id": "ari:cloud:trello::user/69e8cfce0a778d4d055bc484",
        "fullName": "LUIZ HENRIQUE CREPALDI DA SILVA",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/69e8cfce0a778d4d055bc484/d7eae9f62f5e680018ce6adf4b9867ab"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67bceb595bd7d8d1af747",
        "name": "Entregar Sprint Planning 3",
        "url": "https://trello.com/c/Lh8u55uX/30-entregar-sprint-planning-3"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab678093fa1659555f2d338",
        "name": "A Fazer (Sprint 3)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c15975a4e1ef3f6a92a",
        "name": "Concluido (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6aedb94ac530b42c4b6933e0",
      "type": "updateCard",
      "date": "2026-11-06T11:26:02.874Z",
      "creator": {
        "id": "ari:cloud:trello::user/69e8cfce0a778d4d055bc484",
        "fullName": "LUIZ HENRIQUE CREPALDI DA SILVA",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/69e8cfce0a778d4d055bc484/d7eae9f62f5e680018ce6adf4b9867ab"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67bceb595bd7d8d1af747",
        "name": "Entregar Sprint Planning 3",
        "url": "https://trello.com/c/Lh8u55uX/30-entregar-sprint-planning-3"
      }
    },
    {
      "id": "ari:cloud:trello::action/6ae9cc6726a61ef97d017781",
      "type": "updateCard",
      "date": "2026-11-03T11:58:31.816Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab6618a5977a19f5dc0e2b2",
        "name": "Verificação da conectividade básica da API com um endpoint de health check.",
        "url": "https://trello.com/c/GiGabMGB/21-verifica%C3%A7%C3%A3o-da-conectividade-b%C3%A1sica-da-api-com-um-endpoint-de-health-check"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67804ba8ea876f612305d",
        "name": "Sprint 2"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c15975a4e1ef3f6a92a",
        "name": "Concluido (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6ae9cc66b0c3f8cc6105f2fd",
      "type": "updateCard",
      "date": "2026-11-03T11:58:30.790Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab26506cd4b9e8836af0856",
        "name": "Configurar Schema do Banco e Endpoints da API para Registro de Casos",
        "url": "https://trello.com/c/NmKFyZs0/12-configurar-schema-do-banco-e-endpoints-da-api-para-registro-de-casos"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67804ba8ea876f612305d",
        "name": "Sprint 2"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c15975a4e1ef3f6a92a",
        "name": "Concluido (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6ae09bfcdeafadd3d9cd78ba",
      "type": "updateCard",
      "date": "2026-10-27T12:41:32.418Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67b8b77f05ce4beb47191",
        "name": "Planejar Sprint Planning 3",
        "url": "https://trello.com/c/RcCGgOQi/27-planejar-sprint-planning-3"
      }
    },
    {
      "id": "ari:cloud:trello::action/6ae09bfa24c64219091154c1",
      "type": "updateCard",
      "date": "2026-10-27T12:41:30.225Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67b8b77f05ce4beb47191",
        "name": "Planejar Sprint Planning 3",
        "url": "https://trello.com/c/RcCGgOQi/27-planejar-sprint-planning-3"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c02d6697a30ae1f1dec",
        "name": "Fazendo (Sprint 3)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c15975a4e1ef3f6a92a",
        "name": "Concluido (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6ae09bdabc8966fd00c35560",
      "type": "updateCard",
      "date": "2026-10-27T12:40:58.539Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab6831b431352670a257ad2",
        "name": "Refinamento de UI/UX dos Formulários",
        "url": "https://trello.com/c/1hqQJVtA/43-refinamento-de-ui-ux-dos-formul%C3%A1rios"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab678093fa1659555f2d338",
        "name": "A Fazer (Sprint 3)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c02d6697a30ae1f1dec",
        "name": "Fazendo (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6ae09bcf8a5e62aae53e1534",
      "type": "updateCard",
      "date": "2026-10-27T12:40:47.932Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67b8b77f05ce4beb47191",
        "name": "Planejar Sprint Planning 3",
        "url": "https://trello.com/c/RcCGgOQi/27-planejar-sprint-planning-3"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab678093fa1659555f2d338",
        "name": "A Fazer (Sprint 3)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67c02d6697a30ae1f1dec",
        "name": "Fazendo (Sprint 3)"
      }
    },
    {
      "id": "ari:cloud:trello::action/6ae09b959de2973e1915a771",
      "type": "updateCard",
      "date": "2026-10-27T12:39:49.157Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab678c0149a7f61da656867",
        "name": "Entregar Sprint Review 2",
        "url": "https://trello.com/c/ixDKUkc4/25-entregar-sprint-review-2"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab677f4eaef9129ead16b4b",
        "name": "A Fazer (Sprint 2)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67804ba8ea876f612305d",
        "name": "Sprint 2"
      }
    },
    {
      "id": "ari:cloud:trello::action/6ae09b92b108bf398d984cb4",
      "type": "updateCard",
      "date": "2026-10-27T12:39:46.941Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab678a0ee137ffd0ce21af5",
        "name": "Panejar Sprint Review 2",
        "url": "https://trello.com/c/qjquoRU3/24-panejar-sprint-review-2"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab677f4eaef9129ead16b4b",
        "name": "A Fazer (Sprint 2)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67804ba8ea876f612305d",
        "name": "Sprint 2"
      }
    },
    {
      "id": "ari:cloud:trello::action/6ae09b90f2457d179906fb70",
      "type": "updateCard",
      "date": "2026-10-27T12:39:44.410Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab678d1a582d39f35ddcb62",
        "name": "Entregar Sprint Planning 2",
        "url": "https://trello.com/c/g2zcRDQz/26-entregar-sprint-planning-2"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab677f4eaef9129ead16b4b",
        "name": "A Fazer (Sprint 2)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67804ba8ea876f612305d",
        "name": "Sprint 2"
      }
    },
    {
      "id": "ari:cloud:trello::action/6ae09b8e52b2a6a2571fb0ca",
      "type": "updateCard",
      "date": "2026-10-27T12:39:42.022Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab678598359ea245043d3b1",
        "name": "Planejar Sprint Planning 2",
        "url": "https://trello.com/c/D33aHY35/23-planejar-sprint-planning-2"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab677f4eaef9129ead16b4b",
        "name": "A Fazer (Sprint 2)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67804ba8ea876f612305d",
        "name": "Sprint 2"
      }
    },
    {
      "id": "ari:cloud:trello::action/6ae09b887b2a8724841830f3",
      "type": "updateCard",
      "date": "2026-10-27T12:39:36.258Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab26506cd4b9e8836af0856",
        "name": "Configurar Schema do Banco e Endpoints da API para Registro de Casos",
        "url": "https://trello.com/c/NmKFyZs0/12-configurar-schema-do-banco-e-endpoints-da-api-para-registro-de-casos"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab677f4eaef9129ead16b4b",
        "name": "A Fazer (Sprint 2)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67804ba8ea876f612305d",
        "name": "Sprint 2"
      }
    },
    {
      "id": "ari:cloud:trello::action/6ae09b863735163ed2d2523a",
      "type": "updateCard",
      "date": "2026-10-27T12:39:34.441Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab26506cd4b9e8836af0856",
        "name": "Configurar Schema do Banco e Endpoints da API para Registro de Casos",
        "url": "https://trello.com/c/NmKFyZs0/12-configurar-schema-do-banco-e-endpoints-da-api-para-registro-de-casos"
      }
    },
    {
      "id": "ari:cloud:trello::action/6ae09b8046528dc0d40db4f1",
      "type": "updateCard",
      "date": "2026-10-27T12:39:28.588Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab6617779af03d22d5f1961",
        "name": "Implantação do container do banco de dados PostgreSQL com um script de inicialização automatizado",
        "url": "https://trello.com/c/8OqFSF3a/20-implanta%C3%A7%C3%A3o-do-container-do-banco-de-dados-postgresql-com-um-script-de-inicializa%C3%A7%C3%A3o-automatizado"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab677f943cfd47a7ec9de6f",
        "name": "Fazendo (Sprint 2)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67804ba8ea876f612305d",
        "name": "Sprint 2"
      }
    },
    {
      "id": "ari:cloud:trello::action/6ae09b7ed5e8bfa88e9033a1",
      "type": "updateCard",
      "date": "2026-10-27T12:39:26.284Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab6617779af03d22d5f1961",
        "name": "Implantação do container do banco de dados PostgreSQL com um script de inicialização automatizado",
        "url": "https://trello.com/c/8OqFSF3a/20-implanta%C3%A7%C3%A3o-do-container-do-banco-de-dados-postgresql-com-um-script-de-inicializa%C3%A7%C3%A3o-automatizado"
      }
    },
    {
      "id": "ari:cloud:trello::action/6ae09b79402c15715af54834",
      "type": "updateCard",
      "date": "2026-10-27T12:39:21.562Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab6618a5977a19f5dc0e2b2",
        "name": "Verificação da conectividade básica da API com um endpoint de health check.",
        "url": "https://trello.com/c/GiGabMGB/21-verifica%C3%A7%C3%A3o-da-conectividade-b%C3%A1sica-da-api-com-um-endpoint-de-health-check"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab677f943cfd47a7ec9de6f",
        "name": "Fazendo (Sprint 2)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67804ba8ea876f612305d",
        "name": "Sprint 2"
      }
    },
    {
      "id": "ari:cloud:trello::action/6ae09b7567fe9878825f700d",
      "type": "updateCard",
      "date": "2026-10-27T12:39:17.157Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab684513be2cc1336e5ce28",
        "name": "Remover telas de Home, Favoritos e Perfil do Android",
        "url": "https://trello.com/c/3ZoTP4zd/46-remover-telas-de-home-favoritos-e-perfil-do-android"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab677f943cfd47a7ec9de6f",
        "name": "Fazendo (Sprint 2)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67804ba8ea876f612305d",
        "name": "Sprint 2"
      }
    },
    {
      "id": "ari:cloud:trello::action/6ae09b711fc674e4b9566659",
      "type": "updateCard",
      "date": "2026-10-27T12:39:13.412Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67d03b79e18608d67e3ee",
        "name": "Realizar Apresentação (Sprint 2) para o Stakeholder",
        "url": "https://trello.com/c/uopmB8YJ/32-realizar-apresenta%C3%A7%C3%A3o-sprint-2-para-o-stakeholder"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab677f4eaef9129ead16b4b",
        "name": "A Fazer (Sprint 2)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67804ba8ea876f612305d",
        "name": "Sprint 2"
      }
    },
    {
      "id": "ari:cloud:trello::action/6ae09b6ec50d1dbf95ef9f62",
      "type": "updateCard",
      "date": "2026-10-27T12:39:10.777Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67cf56df496fed753e2c9",
        "name": "Planejar Apresentação  (Sprint 2) para o Stakeholder",
        "url": "https://trello.com/c/A96ju5yU/31-planejar-apresenta%C3%A7%C3%A3o-sprint-2-para-o-stakeholder"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab677f4eaef9129ead16b4b",
        "name": "A Fazer (Sprint 2)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67804ba8ea876f612305d",
        "name": "Sprint 2"
      }
    },
    {
      "id": "ari:cloud:trello::action/6ae09b6caa0f981119d9c058",
      "type": "updateCard",
      "date": "2026-10-27T12:39:08.089Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67d5d2fb9e1592567a7f2",
        "name": "Realizar Apresentação (Sprint 2) para o Professor",
        "url": "https://trello.com/c/dzgdkWV9/34-realizar-apresenta%C3%A7%C3%A3o-sprint-2-para-o-professor"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab677f4eaef9129ead16b4b",
        "name": "A Fazer (Sprint 2)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67804ba8ea876f612305d",
        "name": "Sprint 2"
      }
    },
    {
      "id": "ari:cloud:trello::action/6ae09b6927ea3637baf14b9e",
      "type": "updateCard",
      "date": "2026-10-27T12:39:05.322Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67d41ec75dbdf8a61be28",
        "name": "Planejar Apresentação  (Sprint 2) para o Professor",
        "url": "https://trello.com/c/SQNWyBIj/33-planejar-apresenta%C3%A7%C3%A3o-sprint-2-para-o-professor"
      },
      "listBefore": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab677f4eaef9129ead16b4b",
        "name": "A Fazer (Sprint 2)"
      },
      "listAfter": {
        "id": "ari:cloud:trello::list/workspace/619d477c7c24505bb90fe13f/6ab67804ba8ea876f612305d",
        "name": "Sprint 2"
      }
    },
    {
      "id": "ari:cloud:trello::action/6ae09b652f40320e7b580c66",
      "type": "updateCard",
      "date": "2026-10-27T12:39:01.592Z",
      "creator": {
        "id": "ari:cloud:trello::user/619d47617446b506bef356a9",
        "fullName": "Tarsis Mikael Ventura Dumas de Lima",
        "avatarUrl": "https://trello-members.s3.amazonaws.com/619d47617446b506bef356a9/53b9b45eb20020c793fba6ca8130ffd3"
      },
      "card": {
        "id": "ari:cloud:trello::card/workspace/619d477c7c24505bb90fe13f/6ab67d03b79e18608d67e3ee",
        "name": "Realizar Apresentação (Sprint 2) para o Stakeholder",
        "url": "https://trello.com/c/uopmB8YJ/32-realizar-apresenta%C3%A7%C3%A3o-sprint-2-para-o-stakeholder"
      }
    }
  ],
  "nextCursor": "eyJvYmplY3RJZCI6IjZhZTA5YjY1MmY0MDMyMGU3YjU4MGM2NiJ9",
  "hasMore": true
}
```

---

## Assistant (Code · Auto Free · 20.8s)

_Thinking:_

Now I have enough information. Let me write the daily board file based on Trello activity and git log for 2026-11-17.

Key Trello activity on 2026-11-17 (from board activity):
- 14:25:45 - "Atualizar a documentação das sprints (P2)" moved from A Fazer to Concluido
- 14:25:43 - Updated "Atualizar a documentação das sprints (P2)"
- 14:25:38 - "Implementar perfil e mensagens (P1)" moved from A Fazer to Fazendo
- 14:25:30 - "Avaliar vínculo entre relato e usuário (P1)" moved from A Fazer to Cancelado
- 14:25:26 - "Adicionar ciclo de acompanhamento do relato (P1)" moved from A Fazer to Cancelado
- 14:25:19 - "Definir a política de anonimato do relato (P0)" moved from A Fazer to Cancelado
- 14:25:16 - "Documentação de Uso para o Usuário Final" moved from A Fazer to Cancelado
- 14:25:11 - "Auditoria de Segurança de Dados" moved from A Fazer to Cancelado
- 14:24:28 - "Implementar autenticação e autorização (P0)" moved from A Fazer to Fazendo
- 14:24:24 - "Implementar cadastro e login de usuário (P0)" moved from A Fazer to Fazendo
- 14:24:09 - "Realizar Apresentação Final" moved from A Fazer to Fazendo

Git log shows commits on 2026-11-17 (today's date is 2026-11-17T14:32:32Z, but the git log shows commits with dates; let me check what's today). The git log shows commits like 9f72cf7, e90acd8, ba2a9bc, 83ccab7, 589e4fd, aa69b7c, 32de77c, 87d9ee7, ee4efb6, b26fe02, 844438c, 1ea255d, 50c2942, 1cc2b44, 9c8c87a, 7136307, ba6e7f2, bad571e, b9e58f5, ad6eed1, 2178295, 03509b5, 5e4af62, 0692b0b, c19be86, 7bc1de1, e40e114, 6f0dd29, 9361d44, 8ad6282.

I need to check which commits are from today (2026-11-17). Let me check git log with dates.


**Tool: bash**

**Input:**
```json
{
  "command": "git log --format=\"%h %ad %s\" --date=short -20",
  "description": "Get git log with dates"
}
```

**Output:**
```
9f72cf7 2026-11-17 fix: update README to mark 'Início + Login' as completed and format Sign In section
e90acd8 2026-11-17 fix: replace npm ci with npm i in Dockerfile for consistency
ba2a9bc 2026-11-17 fix: streamline npm command in Dockerfile for development
83ccab7 2026-11-17 feat: remove Prisma integration from Kilo configuration
589e4fd 2026-11-17 docs: add kilo's sessions
aa69b7c 2026-11-17 feat: add documentation for End-to-End (E2E) UI tests in Android module
32de77c 2026-11-17 feat: add UI tests for MainDashboard and update dependencies for testing
87d9ee7 2026-11-17 docs: add kilo's sessions
ee4efb6 2026-11-17 feat: update login authentication to handle token storage and improve error messaging
b26fe02 2026-11-17 fix: update password hash for admin user in SQL insert script
844438c 2026-11-17 fix: clean up .gitignore entries for better clarity and organization
1ea255d 2026-11-17 feat: add ReportForm and ReportList components with API integration
50c2942 2026-11-17 feat: add devtools configuration for chrome-devtools-mcp in kilo.json and .mcp.json
1cc2b44 2026-11-17 feat: add SQL script for inserting admin user and update Dockerfile to copy all SQL files
9c8c87a 2026-11-17 feat: add seed script for initializing admin user in the database
7136307 2026-11-17 feat: add README for PostgreSQL database schema and local development setup
ba6e7f2 2026-11-17 refactor: comment out unused localhost check and SSL configuration in DB_CONFIG
bad571e 2026-11-16 docs: add kilo's sessions
b9e58f5 2026-11-16 fix: remove volume mapping for database initialization and update environment variables in api service
ad6eed1 2026-11-16 feat: establish database connection in database.ts

```

---

## Assistant (Code · Auto Free · 27.7s)

_Thinking:_

Now I have enough info. Let me create the daily board file summarizing Trello activity and git commits for 2026-11-17.

Trello activity on 2026-11-17 (from board activity):
- 14:25:45 - Atualizar a documentação das sprints (P2): moved from A Fazer to Concluido
- 14:25:43 - update to "Atualizar a documentação das sprints (P2)"
- 14:25:38 - Implementar perfil e mensagens (P1): moved from A Fazer to Fazendo
- 14:25:30 - Avaliar vínculo entre relato e usuário (P1): moved from A Fazer to Cancelado
- 14:25:26 - Adicionar ciclo de acompanhamento do relato (P1): moved from A Fazer to Cancelado
- 14:25:19 - Definir a política de anonimato do relato (P0): moved from A Fazer to Cancelado
- 14:25:16 - Documentação de Uso para o Usuário Final: moved from A Fazer to Cancelado
- 14:25:11 - Auditoria de Segurança de Dados: moved from A Fazer to Cancelado
- 14:24:28 - Implementar autenticação e autorização (P0): moved from A Fazer to Fazendo
- 14:24:24 - Implementar cadastro e login de usuário (P0): moved from A Fazer to Fazendo
- 14:24:09 - Realizar Apresentação Final: moved from A Fazer to Fazendo

Git commits on 2026-11-17:
- 9f72cf7 fix: update README to mark 'Início + Login' as completed and format Sign In section
- e90acd8 fix: replace npm ci with npm i in Dockerfile for consistency
- ba2a9bc fix: streamline npm command in Dockerfile for development
- 83ccab7 feat: remove Prisma integration from Kilo configuration
- 589e4fd docs: add kilo's sessions
- aa69b7c feat: add documentation for End-to-End (E2E) UI tests in Android module
- 32de77c feat: add UI tests for MainDashboard and update dependencies for testing
- 87d9ee7 docs: add kilo's sessions
- ee4efb6 feat: update login authentication to handle token storage and improve error messaging
- b26fe02 fix: update password hash for admin user in SQL insert script
- 844438c fix: clean up .gitignore entries for better clarity and organization
- 1ea255d feat: add ReportForm and ReportList components with API integration
- 50c2942 feat: add devtools configuration for chrome-devtools-mcp in kilo.json and .mcp.json
- 1cc2b44 feat: add SQL script for inserting admin user and update Dockerfile to copy all SQL files
- 9c8c87a feat: add seed script for initializing admin user in the database
- 7136307 feat: add README for PostgreSQL database schema and local development setup
- ba6e7f2 refactor: comment out unused localhost check and SSL configuration in DB_CONFIG

Let me write the file.


**Tool: write**

**Input:**
```json
{
  "filePath": "C:\\Users\\tarsi\\github.com\\tarsislimadev\\fatec-women-app\\docs\\daily-board\\20261117.md",
  "content": "# Daily Board — 2026-11-17\n\n## Resumo do Dia\n\nAtividade de desenvolvimento focada em autenticação, testes E2E, componentes de relato e configuração de infraestrutura (Docker, Banco de dados, Kilo).\n\n## Trello — Atividades do Dia (Board MULHER-01)\n\n### Movimentações para \"Fazendo (Sprint 3)\"\n- **Implementar cadastro e login de usuário (P0)** — 14:24\n- **Implementar autenticação e autorização (P0)** — 14:24\n- **Implementar perfil e mensagens (P1)** — 14:25\n- **Realizar Apresentação Final** — 14:24\n\n### Movimentações para \"Concluido (Sprint 3)\"\n- **Atualizar a documentação das sprints (P2)** — 14:25\n\n### Movimentações para \"Cancelado (Sprint 3)\"\n- **Avaliar vínculo entre relato e usuário (P1)** — 14:25\n- **Adicionar ciclo de acompanhamento do relato (P1)** — 14:25\n- **Definir a política de anonimato do relato (P0)** — 14:25\n- **Documentação de Uso para o Usuário Final** — 14:25\n- **Auditoria de Segurança de Dados** — 14:25\n\n## Git — Commits do Dia (2026-11-17)\n\n### feat\n- `32de77c` feat: add UI tests for MainDashboard and update dependencies for testing\n- `aa69b7c` feat: add documentation for End-to-End (E2E) UI tests in Android module\n- `ee4efb6` feat: update login authentication to handle token storage and improve error messaging\n- `1ea255d` feat: add ReportForm and ReportList components with API integration\n- `1cc2b44` feat: add SQL script for inserting admin user and update Dockerfile to copy all SQL files\n- `9c8c87a` feat: add seed script for initializing admin user in the database\n- `7136307` feat: add README for PostgreSQL database schema and local development setup\n\n### fix\n- `9f72cf7` fix: update README to mark 'Início + Login' as completed and format Sign In section\n- `e90acd8` fix: replace npm ci with npm i in Dockerfile for consistency\n- `ba2a9bc` fix: streamline npm command in Dockerfile for development\n- `b26fe02` fix: update password hash for admin user in SQL insert script\n- `844438c` fix: clean up .gitignore entries for better clarity and organization\n\n### refactor\n- `ba6e7f2` refactor: comment out unused localhost check and SSL configuration in DB_CONFIG\n\n### docs\n- `589e4fd` docs: add kilo's sessions\n- `87d9ee7` docs: add kilo's sessions\n\n### feat (config)\n- `83ccab7` feat: remove Prisma integration from Kilo configuration\n- `50c2942` feat: add devtools configuration for chrome-devtools-mcp in kilo.json and .mcp.json\n\n## Próximos Passos\n\n- Concluir autenticação/autorização (P0) e cadastro/login (P0)\n- Implementar perfil e mensagens (P1)\n- Preparar Apresentação Final\n- Testes de integração com PostgreSQL (P1) e testes automatizados da API (P1) em andamento"
}
```

**Output:**
```
Wrote file successfully.
```

---

## Assistant (Code · Auto Free · 7.1s)

_Thinking:_

Arquivo criado com sucesso.


Arquivo `./docs/daily-board/20261117.md` criado com o resumo das atividades do dia, incluindo:

- Movimentações no Trello (board MULHER-01) com cards movidos para Fazendo, Concluído e Cancelado (Sprint 3)
- Commits do Git de 2026-11-17 categorizados em feat, fix, refactor, docs e configuração

---

