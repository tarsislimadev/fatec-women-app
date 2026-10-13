# Revisão da Sprint 2: Implementação de Funcionalidades Principais

## 1. Identificação da Equipe

| Nome | Papel no Projeto | Destaque / Accountable |
| :--- | :--- | :--- |
| **Luiz Henrique Crepaldi da Silva** | Product Owner / Scrum Master | Coordenação e Requisitos |
| **Tarsis Lima** | Dev Team | Fullstack Development (A) |

## 2. Meta da Sprint Review 2
A meta consolidada foi transformar o protótipo inicial em um sistema funcional de ponta a ponta, implementando a segurança de acesso (JWT), persistência de dados em PostgreSQL e a interface de registro de ocorrências no Android.

## 3. Demonstração do MVP — Arquitetura E2E

| Camada | Tecnologia / Descrição | Responsável |
| :--- | :--- | :--- |
| **App Mobile** | Android Studio (Kotlin/Java) para registro e listagem de relatos | Tarsis Lima |
| **Backend** | Node.js / Express (com transição para Python) para gestão de autenticação e dados | Tarsis Lima |
| **Banco de Dados** | PostgreSQL para armazenamento persistente | Tarsis Lima |
| **Infraestrutura** | Docker Compose para orquestração de serviços | Tarsis Lima |

## 4. Itens Entregues — Sprint Review

| # | Título da Tarefa | Responsável | Status |
| :--- | :--- | :--- | :--- |
| 1 | Implementação de autenticação JWT | Tarsis Lima | ✅ |
| 2 | Hashing de senhas com bcrypt | Tarsis Lima | ✅ |
| 3 | Integração API-PostgreSQL | Tarsis Lima | ✅ |
| 4 | Desenvolver formulário de registro de ocorrências | Tarsis Lima | ✅ |
| 5 | Refinar formulário de registro de ocorrências | Tarsis Lima | ✅ |
| 6 | Adicionar tela de Listagem de Relatos no Android | Tarsis Lima | ✅ |
| 7 | Traduzir o Back-End do projeto de Node.js para Python | Tarsis Lima | ✅ |
| 8 | Entregar a Matriz RACI | Luiz Henrique | ✅ |

## 5. Definition of Done (DoD)
- Código versionado no GitHub.
- Funcionalidade testada e validada em ambiente local (Docker).
- Documentação atualizada no README.
- Revisão de código realizada.

## 6. Validação com o Parceiro — Evidências de Contato
Alinhamento realizado com a Secretaria Municipal da Mulher de Rio Claro para validação dos campos do formulário de registro e fluxo de atendimento.

## 7. Retrospectiva — Desafios e Lições Aprendidas

| Desafio | Solução | Lição Aprendida |
| :--- | :--- | :--- |
| Manipulação da expiração de tokens e lógica de renovação | Implementação de uma janela de expiração JWT padrão e criação de uma resposta de erro clara para tokens expirados | A validação deve ocorrer o mais cedo possível no ciclo de vida da requisição para reduzir a carga desnecessária no banco de dados |

## 8. Critérios de Avaliação — Autoavaliação
A equipe avalia o desempenho como excelente, tendo cumprido as metas estabelecidas para a sprint, entregando as funcionalidades core de autenticação e persistência.

---

**Status Final**: Concluído
**Aprovação**: Aprovado para transição para a Sprint 3.
