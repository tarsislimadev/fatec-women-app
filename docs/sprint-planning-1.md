# Planejamento da Sprint 1: Fundação e Infraestrutura Básica

## Objetivo
Estabelecer a infraestrutura central do aplicativo Fatec Women, garantindo que o ambiente de desenvolvimento seja reprodutível e que as bases de Frontend, Backend e Banco de Dados estejam configuradas.

## Backlog da Sprint

### 1. Infraestrutura e DevOps
- [ ] Configurar ambiente de banco de dados PostgreSQL utilizando Docker.
- [ ] Implementar servidor de backend utilizando Node.js, Express e TypeScript.
- [ ] Criar arquivo `docker-compose.yaml` para orquestração dos serviços (API e DB).

### 2. Desenvolvimento Mobile (Frontend)
- [ ] Inicializar projeto Flutter com arquitetura limpa.
- [ ] Implementar `AppScaffold` para padronização de layout.
- [ ] Desenvolver Tela de Boas-vindas (Landing Screen).
- [ ] Desenvolver Telas de Login e Cadastro (Sign-up).
- [ ] Configurar `go_router` para navegação entre telas.

### 3. Serviços Core e Estilização
- [ ] Definir identidade visual e tema do aplicativo em `app_theme.dart`.
- [ ] Implementar `flutter_secure_storage` para persistência de tokens e dados sensíveis.
- [ ] Criar serviço base de requisições HTTP (`api.dart`).

## Critérios de Aceite
- O ambiente de desenvolvimento deve subir completamente via `docker-compose up`.
- O usuário deve ser capaz de navegar da Landing Screen para Login/Cadastro.
- O tema visual deve ser aplicado consistentemente em todas as telas implementadas.
- O serviço de API deve ser capaz de realizar requisições básicas ao backend.
