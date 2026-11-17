# Revisão da Sprint 3: Segurança, Autenticação e Estabilização

## 1. Identificação da Equipe

| Nome | Papel no Projeto | Destaque / Accountable |
| :--- | :--- | :--- |
| Luiz Henrique Crepaldi da Silva | Product Owner / Scrum Master | Coordenação e Requisitos |
| Tarsis Lima | Dev Team | Fullstack Development (A) |

## 2. Meta da Sprint 3

Implementar a camada de Front-end, finalizar todas as funcionalidades de Gestão de Relatos e preparar o projeto para a apresentação final.

## 3. Estado Atual — Arquitetura e Componentes

| Camada | Situação observada | Evidências |
| :--- | :--- | :--- |
| App Mobile | Android (Kotlin) com evolução de telas/fluxos e testes de UI/E2E documentados e adicionados | Commits `32de77c`, `aa69b7c` |
| Backend / API | API em Node.js/Express (`src/api`) com ajustes de autenticação/login e tratamento de token | Commits `ee4efb6`, `b26fe02`, `1cc2b44`, `9c8c87a` |
| Banco de Dados | PostgreSQL com scripts de criação/seed e documentação de setup local | Commits `7136307`, `1cc2b44`, `9c8c87a` |
| Infraestrutura | Ajustes em Dockerfiles/execução de desenvolvimento | Commits `e90acd8`, `ba2a9bc`, `844438c` |
| Web (admin/frontend) | Componentes de formulário e listagem de relatos com integração à API | Commit `1ea255d` |

## 4. Atualizações da Sprint

### 4.1 Entregas e avanços técnicos (Git)

- Autenticação/login: atualização do fluxo para armazenamento/tratamento de token e melhoria de mensagens de erro (`ee4efb6`).

- Mobile: inclusão de testes de UI para `MainDashboard` e documentação de testes E2E no módulo Android (`32de77c`, `aa69b7c`).

- Relatos (web): adição de `ReportForm` e `ReportList` com integração à API (`1ea255d`).

- Banco de dados: script de inserção de usuário admin, seed de inicialização e README do schema/setup local (`1cc2b44`, `9c8c87a`, `7136307`, `b26fe02`).

- Infra/configuração: ajustes em Dockerfiles, limpeza de `.gitignore` e atualizações de configuração/documentação (`e90acd8`, `ba2a9bc`, `844438c`, `50c2942`, `83ccab7`, docs de sessões Kilo).

### 4.2 Acompanhamento Trello/Daily Board

- Fazendo (Sprint 3): Implementar listagem de relatos com controle de acesso (P1); Entregar Sprint Review 3; Realizar Apresentação Final.

- Concluído (Sprint 3): Implementar cadastro e login de usuário (P0); Implementar autenticação e autorização (P0); Implementar perfil e mensagens (P1); Atualizar a documentação das sprints (P2); Padronizar respostas e tratamento de erros (P1); Executar testes de integração com PostgreSQL (P1); Validar entradas da API (P0); Criar testes automatizados da API (P1); Testes de Integração End-to-End; Planejar Apresentação Final; Refinamento de UI/UX dos Formulários; Realizar Apresentação (Prévia Final) para o Professor; Otimizar os Dockerfiles (P2); Planejar Sprint Review 3; Entregar Sprint Planning 3; Planejar Sprint Planning 3; Configurar Schema do Banco e Endpoints da API para Registro de Casos; Verificação da conectividade básica da API com um endpoint de health check.

- Cancelado (Sprint 3): Implementar Autenticação por Reconhecimento Facial; Auditoria de Segurança de Dados; Avaliar vínculo entre relato e usuário (P1); Adicionar ciclo de acompanhamento do relato (P1); Definir a política de anonimato do relato (P0); Documentação de Uso para o Usuário Final.

## 5. Pendências e Riscos Atuais

- Finalizar itens críticos em andamento: cadastro/login, autenticação/autorização, perfil e mensagens, e preparação da apresentação final.

## 6. Definition of Done (DoD) — Situação

- Código versionado no GitHub: atendido.

- Funcionalidade testada e validada em ambiente local: parcial (há evidências de testes UI/E2E no Android e avanços de integração; validação E2E completa não registrada).

- Documentação atualizada: parcial (atualizações de sprint/docs realizadas; documentação de uso final consta como cancelada no board do dia).

## 7. Retrospectiva — Desafios e Lições Aprendidas

| Desafio | Ação / Situação | Lição Aprendida |
| :--- | :--- | :--- |
| Autenticação e preparação para entrega em paralelo | Evoluções de login/token, testes e componentes ocorreram junto a atividades de documentação/configuração | Priorizar critérios de aceite e validação integrada reduz risco no fechamento da sprint |

## 8. Autoavaliação e Feedback
- Autoavaliação: progresso relevante em autenticação, testes mobile e base de relatos/dados, porém com pendências críticas e replanejamento de escopo ainda em aberto.
- Próximos passos:
  1. Concluir cadastro/login e autenticação/autorização (P0) com validação ponta a ponta.
  2. Validar integração API ↔ banco em ambiente alvo (Supabase/Vercel) e corrigir endpoints conforme TODO.
  3. Consolidar evidências de testes e revisão para fechamento da sprint.

---

Status da Sprint 3 (2026-11-17): Concluído

Aprovação: Pendente de conclusão dos itens críticos, consolidação das evidências de validação e aceite na Apresentação Geral (prevista para semana 24-27 de novembro).
