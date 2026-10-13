# Planejamento da Sprint 3: Segurança, Autenticação e Estabilização

## Objetivo
Implementar a camada de segurança e autenticação, finalizar as funcionalidades críticas de gestão de relatos e preparar o projeto para a entrega final.

## Escopo
- Segurança e Autenticação:
  - Implementação de cadastro e login de usuário (P0).
  - Implementação de autenticação e autorização (P0).
  - Implementação de Autenticação por Reconhecimento Facial.
  - Definição e implementação da política de anonimato do relato (P0).
- Refinamento da API:
  - Validação rigorosa de entradas da API (P0).
  - Padronização de respostas e tratamento de erros (P1).
  - Criação de testes automatizados da API e integração com PostgreSQL (P1).
- Funcionalidades de Relatos:
  - Listagem de relatos com controle de acesso (P1).
  - Adição de ciclo de acompanhamento do relato (P1).
  - Avaliação de vínculo entre relato e usuário (P1).
- Qualidade e UX:
  - Refinamento de UI/UX dos formulários.
  - Testes de Integração End-to-End.
  - Auditoria de Segurança de Dados.
- Infraestrutura e Documentação:
  - Otimização de Dockerfiles (P2).
  - Documentação de uso para o usuário final.
  - Atualização da documentação das sprints (P2).

## Detalhes do Planejamento
- Prioridades (P0): Foco total em Autenticação, Anonimato e Validação de API para garantir a integridade dos dados.
- Estratégia de Validação:
  - Testes de fluxos completos: Cadastro -> Login -> Registro de Relato -> Acompanhamento.
  - Verificação de permissões de acesso (quem pode ver qual relato).
- Riscos:
  - Complexidade na implementação do reconhecimento facial.
  - Impacto de mudanças na política de anonimato sobre a base de dados existente.

## Resultados Esperados
- [ ] Sistema de Autenticação e Autorização funcional (incluindo Reconhecimento Facial).
- [ ] API validada, padronizada e com testes de integração.
- [ ] Fluxo de acompanhamento de relatos implementado.
- [ ] Auditoria de segurança realizada e documentada.
- [ ] Dockerfiles otimizados e documentação final entregue.
