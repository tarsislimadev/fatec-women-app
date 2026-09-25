# AGENTS.md

## Visão Geral do Projeto
Este repositório contém um protótipo full-stack para o app Fatec Women:

- O código do cliente Android fica em [src/android](src/android)
- O código da API Node.js fica em [src/api](src/api)
- O esquema do banco de dados e migrações ficam em [src/database](src/database)
- A orquestração de serviços locais é definida em [docker-compose.yaml](docker-compose.yaml)
- A configuração e o uso do projeto são descritos em [README.md](README.md) e [docs/INSTALL.md](docs/INSTALL.md)

Mantenha as alterações limitadas à camada relevante: o código do app Android deve permanecer no projeto Android, as alterações da API devem ficar no serviço Express, e as alterações de esquema devem ser adicionadas na pasta do banco de dados.

## Desenvolvimento Local
Use a raiz do repositório para iniciar os serviços:

```bash
docker compose up -d --build
```

Isso inicia os serviços de API e Postgres. A API expõe verificações de integridade (health checks) em `http://localhost:3000/health` e o banco de dados está disponível na porta `5432`.

Para o desenvolvimento Android, abra a pasta do projeto [src/android](src/android) no Android Studio. No Windows, o repositório inclui um script Gradle wrapper em [src/android/gradlew.bat](src/android/gradlew.bat); para builds via linha de comando, use:

```powershell
cd src/android
./gradlew.bat assembleDebug
```

## Convenções
- Prefira alterações pequenas e direcionadas em vez de refatorações amplas.
- Não misture lógica específica do Android na API ou lógica de banco de dados na camada do app.
- Mantenha os endpoints da API simples e orientados a status; a API atual é um app Express leve, não um serviço baseado em um framework robusto.
- Se for necessária uma alteração no banco de dados, adicione ou atualize o script SQL em [src/database](src/database) e mantenha a definição do esquema explícita.
- Se uma alteração afetar a configuração ou o onboarding, atualize a documentação relevante em vez de duplicá-la em outro lugar.

## Validação
Não há testes automatizados dedicados configurados neste repositório no momento, portanto a validação deve ser leve e prática:

- Para alterações na API ou banco de dados: inicie os serviços Docker e verifique se o endpoint de health responde.
- Para alterações no Android: execute o build Gradle relevante ou verifique se o projeto ainda carrega corretamente no Android Studio.
- Prefira verificações rápidas (smoke checks) a reescritas dispendiosas.

## Arquivos principais para revisar primeiro
- [README.md](README.md)
- [docker-compose.yaml](docker-compose.yaml)
- [src/api/index.js](src/api/index.js)
- [src/api/package.json](src/api/package.json)
- [src/database/001-create-tables.sql](src/database/001-create-tables.sql)
- [src/android/settings.gradle.kts](src/android/settings.gradle.kts)
