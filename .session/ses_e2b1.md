# List databases in Prisma

**Session ID:** ses_e2b14105affeA5ZWzgqHPcNyqL
**Created:** 13/11/2026, 9:39:54 a.m.
**Updated:** 13/11/2026, 9:41:26 a.m.

---

## User

in prisma, get databases

---

## Assistant (Code · Auto Free · 17.3s)

_Thinking:_

The user is asking to get databases in Prisma. They want to list Prisma Postgres databases. I need to use the `prisma_list_prisma_postgres_databases` tool for this.

**Tool: prisma_list_prisma_postgres_databases**

**Input:**
```json
{}
```

**Output:**
```
{
  "data": [
    {
      "id": "db_e9zctc7zkynmdo7e9ad2eq8l",
      "type": "database",
      "name": "2026-11-13T12:33:29.244Z",
      "status": "ready",
      "createdAt": "2026-11-13T12:33:22.148Z",
      "isDefault": true,
      "project": {
        "id": "proj_m5qy8oxm1fc2xq1si6l5e88w",
        "name": "2026-11-13T12:33:29.244Z"
      },
      "region": {
        "id": "us-east-1",
        "name": "US East (N. Virginia)"
      }
    }
  ],
  "nextCursor": null
}
```

---

## Assistant (Code · Auto Free · 11.3s)

_Thinking:_

The tool returned the list of Prisma Postgres databases. There's one database in the workspace.

Found 1 Prisma Postgres database:

| ID | Name | Status | Project | Region | Default |
|---|---|---|---|---|---|
| `db_e9zctc7zkynmdo7e9ad2eq8l` | 2026-11-13T12:33:29.244Z | ready | `proj_m5qy8oxm1fc2xq1si6l5e88w` | US East (N. Virginia) | Yes |

---

## User

in prisma, get database's connection url

---

## Assistant (Code · Auto Free · 7.0s)

_Thinking:_

The user wants to get the connection URL for the database. I need to use the `prisma_list_prisma_postgres_connection_strings` tool to list the connection strings for the database I found. The database ID is `db_e9zctc7zkynmdo7e9ad2eq8l`.

**Tool: prisma_list_prisma_postgres_connection_strings**

**Input:**
```json
{
  "databaseId": "db_e9zctc7zkynmdo7e9ad2eq8l"
}
```

**Output:**
```
{
  "data": [
    {
      "id": "con_jlwyrt2j507misqyqspu7kvo",
      "name": "Prisma Postgres API Key",
      "createdAt": "2026-11-13T12:33:22.148Z"
    },
    {
      "id": "con_nizun5933ssva0ysvr3msbjf",
      "name": "console-connection-string",
      "createdAt": "2026-11-13T12:35:10.154Z"
    }
  ],
  "nextCursor": null
}
```

---

## Assistant (Code · Auto Free · 10.2s)

_Thinking:_

There are two connection strings. The user might want to see the actual connection string values. I should use the `prisma_create_prisma_postgres_connection_string` tool to create/get a connection string, or there might be another way. Let me check if there's a way to get the actual connection string values. Looking at the tools, there's `prisma_create_prisma_postgres_connection_string` which creates a named connection string and returns both Prisma and direct Postgres connection strings. But that creates a new one. 

Actually, looking at the list results, these are just metadata about the connection strings - they don't include the actual connection string values. The user would need to either:
1. Use `prisma_create_prisma_postgres_connection_string` to create a new named connection string (which returns the actual connection strings)
2. Or there might be another tool to get the actual values

Let me check the tool description again - it says "Creates a named connection string for a Prisma Postgres database. Returns the Prisma connection string and a direct Postgres connection string when one is available."

So to get the actual connection string, they'd need to create a named one. But maybe they already have one and just want to see the values? The list tool only returns metadata.

Let me create a named connection string for them to get the actual connection URLs.

The list shows two connection string entries but only their metadata. To get the actual connection URLs, I'll create a named connection string:


**Tool: prisma_create_prisma_postgres_connection_string**

**Input:**
```json
{
  "databaseId": "db_e9zctc7zkynmdo7e9ad2eq8l",
  "name": "app-connection"
}
```

**Error:**
```
MCP error -32602: Structured content does not match the tool's output schema: data must have required property 'data', data must NOT have additional properties, data must NOT have additional properties, data must NOT have additional properties, data must NOT have additional properties, data must NOT have additional properties, data must NOT have additional properties
```

---

## Assistant (Code · Auto Free · 5.5s)

_Thinking:_

The tool returned an error. Let me try again with the correct parameters. The tool requires databaseId and name.

**Tool: prisma_create_prisma_postgres_connection_string**

**Input:**
```json
{
  "name": "app-connection",
  "reason": "Get connection URL for application",
  "databaseId": "db_e9zctc7zkynmdo7e9ad2eq8l"
}
```

**Error:**
```
MCP error -32602: Structured content does not match the tool's output schema: data must have required property 'data', data must NOT have additional properties, data must NOT have additional properties, data must NOT have additional properties, data must NOT have additional properties, data must NOT have additional properties, data must NOT have additional properties
```

---

## Assistant (Code · Auto Free · 5.7s)

_Thinking:_

There seems to be an issue with the tool. Let me try without the reason parameter.

**Tool: prisma_create_prisma_postgres_connection_string**

**Input:**
```json
{
  "databaseId": "db_e9zctc7zkynmdo7e9ad2eq8l",
  "name": "app-connection"
}
```

**Error:**
```
MCP error -32602: Structured content does not match the tool's output schema: data must have required property 'data', data must NOT have additional properties, data must NOT have additional properties, data must NOT have additional properties, data must NOT have additional properties, data must NOT have additional properties, data must NOT have additional properties
```

---

## Assistant (Code · Auto Free · 12.3s)

_Thinking:_

The tool seems to be returning an error. Let me try the execute SQL query tool to see if I can get connection info that way, or maybe there's another approach. Actually, let me just report the connection string IDs that exist and note the issue.

The tool is returning an error. The database has two existing connection strings:

| ID | Name | Created |
|---|---|---|
| `con_jlwyrt2j507misqyqspu7kvo` | Prisma Postgres API Key | 2026-11-13T12:33:22.148Z |
| `con_nizun5933ssva0ysvr3msbjf` | console-connection-string | 2026-11-13T12:35:10.154Z |

The `prisma_create_prisma_postgres_connection_string` tool appears to have a backend issue. You can try creating a connection string via the Prisma Console at https://console.prisma.io, or use one of the existing connection strings if you have their values stored elsewhere.

Would you like me to try a different approach, or do you have access to the Prisma Console to retrieve the connection string values?

---

