# Planejamento da Sprint 2: Funcionalidades Core e Fluxo de Dados

## Objetivo
Implementar os principais módulos funcionais do aplicativo, focando na interação do usuário, persistência de dados e na integração completa entre o cliente mobile e o backend.

## Backlog da Sprint

### 1. Experiência do Usuário (UX) e Navegação
- [ ] Implementar a Tela de Dashboard como hub central de funcionalidades.
- [ ] Criar `nav_items.dart` para gerenciar a navegação inferior (Bottom Navigation Bar).
- [ ] Refinar o roteamento no `app_router.dart` para suportar fluxos de Dashboard $\rightarrow$ Funcionalidade.

### 2. Módulo de Comunicação (Chat)
- [ ] Desenvolver a Tela de Lista de Chats (visualização de conversas ativas).
- [ ] Desenvolver a Tela de Detalhes do Chat (envio e recebimento de mensagens).
- [ ] Definir a interface de comunicação entre a vítima e a equipe de suporte.

### 3. Backend e Persistência
- [ ] Desenvolver esquema relacional no PostgreSQL (`001-create-tables.sql`) para Usuários, Casos e Mensagens.
- [ ] Implementar endpoints na API Express para suporte ao Dashboard e Chat.
- [ ] Integrar o serviço `api.dart` do mobile com os novos endpoints do backend.

### 4. Configurações de Ambiente
- [ ] Implementar `environment.dart` para gerenciar URLs de API (Dev/Prod).

## Critérios de Aceite
- O usuário deve conseguir acessar o Dashboard após o login.
- O fluxo de abrir um chat e enviar/receber mensagens deve estar funcional (ou simulado via API).
- Os dados enviados pelo mobile devem ser persistidos corretamente no banco de dados PostgreSQL.
- A navegação entre as telas core deve ser fluida e sem erros de rota.
