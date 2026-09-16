# Diário de Bordo - 15/09/2026

## O QUE FIZ HOJE?
- **Gestão de Projeto (Trello)**: 
    - Analisei os arquivos do projeto (`TODO.md`, `README.md`) para planejar as próximas etapas.
    - Adicionei tarefas de pesquisa e integração de serviços governamentais (dados.gov.br, Hospital da Mulher UFTM, CNDM) ao quadro do Trello (Sprint 3).
    - Localizei e traduzi todas as tarefas do Trello do inglês para o português.
- **Documentação (RACI)**:
    - Criei a Matriz RACI para a Sprint 2 em inglês (`docs/RACI-Sprint-2.md`).
    - Traduzi a Matriz RACI para o português (`docs/sprint-raci-2.md`).
    - Converti a Matriz RACI de Markdown para o formato Word (`docs/sprint-raci-2.docx`) utilizando pandoc.

## QUAIS DIFICULDADES ENCONTREI E COMO RESOLVI?
- **Acesso ao Trello**: Tive dificuldade inicial ao acessar o quadro via URL, pois a API requer ARIs. Resolvi utilizando a ferramenta `trelloSearch` para localizar o identificador único do quadro.
- **Caminhos de Arquivo**: Ocorreram erros de "Invalid input path" ao tentar ler arquivos usando caminhos relativos. Resolvi utilizando caminhos absolutos para garantir a precisão da leitura e escrita.

## QUAL É O MEU PRÓXIMO PASSO?
- Iniciar a implementação técnica das tarefas definidas na Sprint 2.
- Validar a infraestrutura do projeto e a estrutura básica da API.
- Prosseguir com as pesquisas de dados abertos planejadas para a Sprint 3.
