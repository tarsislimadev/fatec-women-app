# Banco de dados

Este diretório contém o esquema PostgreSQL usado pela API do Fatec Women.

- [`001-create-tables.sql`](./001-create-tables.sql) define as tabelas iniciais.
- [`Dockerfile`](./Dockerfile) cria a imagem PostgreSQL e executa o script
  automaticamente na inicialização de um banco vazio.

## Esquema

O script cria as seguintes tabelas:

| Tabela | Finalidade |
| --- | --- |
| `users` | Usuários, credenciais, papéis e preferências de anonimato. |
| `messages` | Mensagens associadas a usuários, com suporte a exclusão lógica. |
| `reports` | Denúncias, localização, detalhes, status e imagem opcional. |
| `report_status_history` | Histórico de alterações de status das denúncias. |

As denúncias e mensagens pertencem a um usuário. Ao remover um usuário, esses
registros também são removidos. O usuário que alterou um status pode ser
removido sem apagar o histórico; nesse caso, `changed_by` fica nulo.

## Desenvolvimento local

Na raiz do repositório, inicie o PostgreSQL com:

```powershell
docker compose up -d --build database
```

O serviço usa estes valores padrão:

| Variável | Valor |
| --- | --- |
| `DB_HOST` | `localhost` (a API usa `database` dentro do Compose) |
| `DB_PORT` | `5432` |
| `DB_NAME` | `fatec` |
| `DB_USER` | `fatec` |
| `DB_PASSWORD` | `fatec` |

Para abrir um cliente `psql` descartável conectado ao serviço:

```powershell
docker compose --profile tools run --rm psql `
  psql -h database -p 5432 -U fatec -d fatec
```

No prompt do PostgreSQL, liste as tabelas com:

```sql
\dt
```

Também é possível verificar se a porta está acessível:

```powershell
Test-NetConnection localhost -Port 5432
```

O script de inicialização do PostgreSQL só é executado quando o diretório de
dados está vazio. Alterações posteriores no esquema devem ser aplicadas
explicitamente ao banco e documentadas em um novo script versionado; não
recrie o container esperando que o esquema existente seja atualizado.

## Supabase e produção

O banco de produção é PostgreSQL hospedado no Supabase. No SQL Editor do
projeto, execute [`001-create-tables.sql`](./001-create-tables.sql) para criar
o esquema inicial. Configure a API com as credenciais do Supabase por meio das
variáveis `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` e `DB_PASSWORD`.

Nunca versionar senhas, chaves ou dados reais. Após configurar a API, valide a
conexão pelo endpoint `/health`, conforme as instruções de
[`docs/INSTALL.md`](../../docs/INSTALL.md).
