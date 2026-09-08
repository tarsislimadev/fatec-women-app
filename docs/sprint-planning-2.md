# Planejamento da Sprint 2: Implementação de Funcionalidades Principais

## Objetivo
Transitar da configuração de infraestrutura para o desenvolvimento funcional, focando no caminho crítico de gerenciamento de usuários e persistência de dados.

## Escopo
- **Sistema de Autenticação**: implementação de autenticação baseada em JWT e hashing de senhas.
- **Gerenciamento de Usuários**: endpoints para registro, atualização de perfil e login.
- **Integração de Dados**: conexão da API Express ao banco de dados PostgreSQL usando um ORM ou construtor de consultas.

## Detalhes do Planejamento
- **Decisões de Design**:
  - Usar bcrypt para armazenamento seguro de senhas.
  - Implementar uma camada de middleware para proteger rotas privadas.
- **Fluxo de Desenvolvimento**:
  - Definir contratos da API $\rightarrow$ Implementar controllers $\rightarrow$ Integrar Banco de Dados $\rightarrow$ Testar.
- **Riscos**:
  - Vulnerabilidades de segurança no fluxo de autenticação.
  - Problemas de pooling de conexão com o banco de dados.

## Resultados Esperados
- [ ] Endpoints de Login/Cadastro funcionais.
- [ ] Controle de acesso baseado em token implementado em toda a API.
- [ ] Dados de usuário persistidos e recuperados corretamente do banco de dados.
