# Revisão da Sprint 1: Fundação e Infraestrutura

## Resumo
O objetivo principal da Sprint 1 foi estabelecer um ambiente de desenvolvimento conteinerizado e a estrutura básica da API.

## Conquistas
- [x] Configuração bem-sucedida do `docker-compose.yaml` para orquestrar a API e o Banco de Dados.
- [x] Inicialização do Express.js com TypeScript, garantindo um fluxo de desenvolvimento com tipagem segura.
- [x] Implantação do container do banco de dados PostgreSQL com um script de inicialização automatizado (`001-create-tables.sql`).
- [x] Verificação da conectividade básica da API com um endpoint de health check.

## Desafios e Lições Aprendidas
- **Desafio**: Problemas iniciais de resolução de rede do Docker entre a API e o Banco de Dados.
- **Solução**: Ajuste dos nomes dos serviços na string de conexão para corresponder às definições de serviço do Docker Compose.
- **Lição**: Definir explicitamente aliases de rede no Docker Compose pode prevenir problemas de conectividade em ambientes complexos.

## Status Final
- **Status**: Concluído
- **Aprovação**: Aprovado para transição para a Sprint 2.
