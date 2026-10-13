# Matriz RACI - Sprint 3: Segurança, Autenticação e Estabilização

## Definições
- R (Responsible): Quem executa a tarefa.
- A (Accountable): Quem aprova e responde pelo resultado final (apenas um por tarefa).
- C (Consulted): Quem fornece informações ou consultoria.
- I (Informed): Quem é notificado sobre o progresso ou conclusão.

## Matriz de Responsabilidades

| Atividade | Desenvolvedor Backend | Desenvolvedor Android | PO / Gestor | Stakeholder |
| :--- | :---: | :---: | :---: | :---: |
| Segurança & Autenticação | | | | |
| Cadastro e Login de Usuário (P0) | R | C | A | I |
| Autenticação e Autorização (P0) | R | C | A | I |
| Autenticação por Reconhecimento Facial | R | R | A | I |
| Política de Anonimato do Relato (P0) | R | I | A | C |
| Refinamento da API | | | | |
| Validação de Entradas da API (P0) | R | I | A | I |
| Padronização de Respostas e Erros (P1) | R | C | A | I |
| Testes Automatizados e Postgres (P1) | R | I | A | I |
| Funcionalidades de Relatos | | | | |
| Listagem com Controle de Acesso (P1) | R | R | A | I |
| Ciclo de Acompanhamento do Relato (P1) | R | R | A | I |
| Vínculo Relato $\rightarrow$ Usuário (P1) | R | I | A | C |
| Qualidade e UX | | | | |
| Refinamento de UI/UX dos Formulários | C | R | A | C |
| Testes de Integração End-to-End | R | R | A | I |
| Auditoria de Segurança de Dados | R | I | A | C |
| Infraestrutura e Documentação | | | | |
| Otimização de Dockerfiles (P2) | R | I | A | I |
| Documentação de Uso do Usuário | C | R | A | C |
| Atualização da Documentação das Sprints | R | R | A | I |

## Observações
- O PO/Gestor detém a responsabilidade final (Accountable) por todas as entregas da sprint.
- A implementação de Reconhecimento Facial é uma tarefa compartilhada entre Backend (API/Processamento) e Android (Captura/Interface).
- A política de anonimato requer consulta direta ao Stakeholder para garantir a conformidade legal/ética.
