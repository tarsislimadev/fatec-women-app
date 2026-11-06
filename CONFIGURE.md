### Pré-requisitos

Para configurar o ambiente de desenvolvimento, certifique-se de ter instalado:

- Git: Para controle de versão e clonagem do código.
- Docker & Docker Compose: Para executar a API localmente.
- Node.js e npm: Para compilar e executar a API TypeScript/Express fora do Docker.
- Android Studio: Para compilação e execução do aplicativo mobile.

### 1. Backend local

O Docker Compose executa a API TypeScript/Express e o PostgreSQL para desenvolvimento local. Para executar a API diretamente, use Node.js na pasta `src/api`:

```bash
# Clone o repositório
git clone https://github.com/tarsislimadev/fatec-women-app
cd fatec-women-app

# Inicie os serviços locais
docker compose up -d --build
```
Após a inicialização, valide a API acessando `http://localhost:8000/health`. Para desenvolvimento local, configure as variáveis de banco em `src/api/.env` conforme o ambiente PostgreSQL que será utilizado. Não versionar esse arquivo nem credenciais reais.

```bash
cd src/api
npm ci
npm run build
npm start
```

### 2. Implantação

O ambiente publicado é composto por:

- API: deploy da aplicação TypeScript/Express em um projeto da [Vercel](https://vercel.com/), com `src/api` como diretório raiz.
- Banco de dados: PostgreSQL gerenciado pelo [Supabase](https://supabase.com/).

No projeto da Vercel, defina o diretório `src/api` como raiz da API e cadastre as variáveis de ambiente do banco:

| Variável | Descrição |
| --- | --- |
| `DB_HOST` | Host do banco PostgreSQL no Supabase |
| `DB_PORT` | Porta do PostgreSQL, normalmente `5432` |
| `DB_NAME` | Nome do banco, normalmente `postgres` |
| `DB_USER` | Usuário do banco |
| `DB_PASSWORD` | Senha do banco |

Use os valores da conexão disponibilizados no painel do Supabase. No projeto `fatec-women-api`, as variáveis são configuradas como secrets nos ambientes Production, Preview e Development, sem colocar senhas no repositório. O projeto usa `npm ci` para instalar dependências e `npm run build` para compilar o TypeScript. Após o deploy, valide a integração acessando:

```text
https://fatec-women-api.vercel.app/health
```

O endpoint `/health` verifica a conectividade da API com o banco. A especificação OpenAPI está em [`src/api/swagger.yaml`](src/api/swagger.yaml). Para criar ou atualizar as tabelas, execute o script SQL versionado em [`src/database/001-create-tables.sql`](src/database/001-create-tables.sql) no SQL Editor do Supabase.

### 3. Aplicativo Android

O aplicativo é desenvolvido em Kotlin/Java. Para executá-lo:
1. Abra o Android Studio.
2. Selecione "Open" e aponte para a pasta [`src/android`](src/android).
3. Sincronize o Gradle e execute em um emulador ou dispositivo físico.

Para builds via linha de comando (Windows):
```powershell
cd src/android
./gradlew.bat assembleDebug
```
