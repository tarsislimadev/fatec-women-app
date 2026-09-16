# Revisão da Sprint 2: Implementação de Funcionalidades Principais

## Resumo
A Sprint 2 focou em transformar a API básica em um sistema funcional, implementando a autenticação de usuários e a persistência de dados.

## Conquistas
- [x] Implementação de autenticação JWT (JSON Web Token) para acesso seguro à API.
- [x] Desenvolvimento de endpoints de Cadastro e Login com hashing de senhas usando bcrypt.
- [x] Integração da API Express com PostgreSQL para armazenamento persistente de usuários.
- [x] Adição de middleware de validação de requisição para garantir a integridade dos dados.

## Desafios e Lições Aprendidas
- **Desafio**: Manipulação da expiração de tokens e lógica de renovação.
- **Solução**: Implementação de uma janela de expiração JWT padrão e criação de uma resposta de erro clara para tokens expirados.
- **Lição**: A validação deve ocorrer o mais cedo possível no ciclo de vida da requisição para reduzir a carga desnecessária no banco de dados.

## Status Final
- **Status**: Concluído
- **Aprovação**: Aprovado para transição para a Sprint 3.
