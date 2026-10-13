**Fatec Women App**

Entregáveis do Sprint Planning 3 (13/10)

**1. Squad e papéis**

- Tarsis Lima (Desenvolvedor Back-End e Front-End)

- Luiz Henrique Crepaldi da Silva (Product Owner, Scrum Master)

**2. Onde paramos**

No Sprint 2 o foco foi a tradução do Back-End para Python, configuração do ambiente Docker e a implementação inicial dos formulários de registro de ocorrências.

**O que foi feito o que não feito até o momento**

| ID | História | Situação | Por quê |
|---|---|---|---|
| US01 | Material de apresentação | Feito | O PDF e uma mensagem objetiva foram usados nas abordagens. |
| US02 | Configuração do arquivo docker-compose.yaml | Feito | Para orquestrar a API e o Banco de Dados |
| US03 | Implantação do container do banco de dados PostgreSQL com um script de inicialização automatizado (001-create-tables.sql). | Não Feito | Para automatizar a inicialização do projeto em produção |
| US04 | Traduzir o Back-End do projeto do node js para o Python | Feito | Para entregar o projeto com as tecnologias e habilidade adquiridas durante o curso |
| US05 | Verificação da conectividade básica da API com um endpoint de health check. | Feito | Para garantir a funcionalidade do projeto em segundo plano |
| US06 | Desenvolver formulário de registro de ocorrências | Feito | Para capturar os dados obrigatórios do projeto |
| US07 | Refinar as telas de registro de ocorrências | Feito | Para entregar o projeto com o melhor design possível |

**O que mudou do Planning 2 para cá**

O projeto agora entra na fase de estabilização e segurança. Após a implementação das funcionalidades básicas de registro, o foco muda para a autenticação de usuários, a proteção de dados sensíveis e a implementação de recursos avançados como o reconhecimento facial.

**3. Ferramentas de acompanhamento**

Trello: https://trello.com/b/XfzfJLsb/mulher-01

GitHub: https://github.com/tarsislimadev/fatec-women-app

**4. Ciclo de backlogs**

**Meta da Sprint 3**

**Implementar a camada de segurança e autenticação, finalizar as funcionalidades críticas de gestão de relatos e preparar o projeto para a entrega final.**

**Product Backlog**

| ID | Item | Prioridade | Esforço | Sprint | Status |
|---|---|---|---|---|---|
| US08 | Implementação de cadastro e login de usuário | Alta (P0) | 8 | 3 | Pendente |
| US09 | Implementação de autenticação e autorização | Alta (P0) | 8 | 3 | Pendente |
| US10 | Implementação de Autenticação por Reconhecimento Facial | Média (P1) | 12 | 3 | Pendente |
| US11 | Definição e implementação da política de anonimato do relato | Alta (P0) | 6 | 3 | Pendente |
| US12 | Validação rigorosa de entradas da API | Alta (P0) | 6 | 3 | Pendente |
| US13 | Padronização de respostas e tratamento de erros | Média (P1) | 6 | 3 | Pendente |
| US14 | Criação de testes automatizados da API e integração com PostgreSQL | Média (P1) | 8 | 3 | Pendente |
| US15 | Listagem de relatos com controle de acesso | Média (P1) | 6 | 3 | Pendente |
| US16 | Adição de ciclo de acompanhamento do relato | Média (P1) | 8 | 3 | Pendente |
| US17 | Avaliação de vínculo entre relato e usuário | Média (P1) | 6 | 3 | Pendente |
| US18 | Refinamento de UI/UX dos formulários | Baixa (P2) | 6 | 3 | Pendente |
| US19 | Testes de Integração End-to-End | Alta (P0) | 8 | 3 | Pendente |
| US20 | Auditoria de Segurança de Dados | Alta (P0) | 8 | 3 | Pendente |
| US21 | Otimização de Dockerfiles | Baixa (P2) | 4 | 3 | Pendente |
| US22 | Documentação de uso para o usuário final | Baixa (P2) | 6 | 3 | Pendente |
| US23 | Atualização da documentação das sprints | Baixa (P2) | 4 | 3 | Pendente |

**Sprint Backlog 3**

**5. Matriz RACI**

Colunas: TL (Tarsis Lima); LH (Luiz Henrique); PR (Professor); STK (Stakeholder).

| Entrega | TL | LH | PR | STK |
|---|---|---|---|---|
| US08 --- Cadastro e Login | R | C | I | A |
| US09 --- Autenticação e Autorização | R | C | I | A |
| US10 --- Reconhecimento Facial | R | C | I | A |
| US11 --- Política de Anonimato | R | C | I | A |
| US12 --- Validação de API | R | C | I | A |
| US13 --- Padronização de Respostas | R | C | I | A |
| US14 --- Testes Automatizados | R | C | I | A |
| US15 --- Listagem de Relatos | R | C | I | A |
| US16 --- Ciclo de Acompanhamento | R | C | I | A |
| US17 --- Vínculo Relato/Usuário | R | C | I | A |
| US18 --- Refinamento UI/UX | R | C | I | A |
| US19 --- Testes E2E | R | C | I | A |
| US20 --- Auditoria de Segurança | R | C | I | A |
| US21 --- Otimização Docker | R | C | I | A |
| US22 --- Documentação Usuário | R | C | I | A |
| US23 --- Atualização Documentação | R | C | I | A |

**6. Calendário e riscos**

| Semana | Sprint | Atividade | Risco |
|---|---|---|---|
| 13/10/2026 | 3 | Planejamento e Setup de Segurança | Complexidade na implementação de Auth |
| 20/10/2026 | 3 | Implementação de Cadastro, Login e Anonimato | Falhas na política de privacidade |
| 27/10/2026 | 3 | Desenvolvimento do Reconhecimento Facial | Dificuldade técnica na integração facial |
| 03/11/2026 | 3 | Validação, Padronização e Testes de API | Bugs de integração com PostgreSQL |
| 10/11/2026 | 3 | Ciclo de Acompanhamento e Gestão de Relatos | Inconsistência no fluxo de status do relato |
| 17/11/2026 | 3 | Auditoria de Segurança e Testes E2E | Vulnerabilidades de dados não detectadas |
| 24/11/2026 | 3 | Documentação Final e Entrega | Desalinhamento com critérios de aceitação |
