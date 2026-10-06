# Backlog do Projeto

## P0 - Bloqueadores de segurança e integração

- [ ] **Definir a API oficial**: escolher Node/Express ou Python/FastAPI, remover a ambiguidade do `docker-compose.yaml` e apontar o admin para a implementação oficial.
	- Critério de conclusão: uma única API é usada no desenvolvimento e está documentada no README.

- [ ] **Implementar cadastro e login de usuário**.
	- Critério de conclusão: credenciais são persistidas com senha protegida, e o login retorna uma sessão ou token válido.

- [ ] **Implementar autenticação e autorização**.
	- Critério de conclusão: endpoints protegidos rejeitam requisições sem credenciais; a consulta de relatos não fica pública por padrão.

- [ ] **Definir a política de anonimato do relato**.
	- Critério de conclusão: o sistema documenta quando o relato pode ser anônimo, quais dados são coletados e quem pode acessá-los.

- [ ] **Validar entradas da API**.
	- Critério de conclusão: detalhes vazios, coordenadas inválidas, URLs inválidas e campos acima do limite são rejeitados com resposta consistente.

## P1 - Produto e domínio

- [ ] **Concluir o formulário de relato**.
	- [x] Campo de nome opcional.
	- [x] Campo de imagem opcional.
	- [x] Campo de geolocalização opcional.
	- [x] Campo de detalhes obrigatório.
	- Critério de conclusão: o formulário envia os campos aceitos pela API e apresenta estados de sucesso e erro.

- [ ] **Implementar listagem de relatos com controle de acesso**.
	- Critério de conclusão: relatos são ordenados pelo mais recente, exibem localização e imagem somente quando disponíveis e não expõem dados para usuários não autorizados.

- [ ] **Adicionar ciclo de acompanhamento do relato**.
	- Critério de conclusão: cada relato possui status, histórico de alterações e responsável pelo encaminhamento.

- [ ] **Avaliar vínculo entre relato e usuário**.
	- Critério de conclusão: a decisão sobre vínculo obrigatório, opcional ou anônimo é refletida no modelo de dados e na documentação de domínio.

- [ ] **Implementar perfil e mensagens somente se fizerem parte do escopo aprovado**.
	- Critério de conclusão: endpoints e telas correspondentes existem, ou as tabelas `users` e `messages` são removidas do escopo documentado.

## P1 - Qualidade

- [ ] **Criar testes automatizados da API**.
	- Critério de conclusão: existem testes para health check, login, autorização, criação de relato, validação e listagem.

- [ ] **Executar testes de integração com PostgreSQL**.
	- Critério de conclusão: o fluxo de criação e consulta é validado contra o banco em ambiente reproduzível.

- [ ] **Padronizar respostas e tratamento de erros**.
	- Critério de conclusão: erros de validação, autenticação, autorização e banco retornam status HTTP e formato documentados.

## P2 - Dados e serviços de apoio

- [ ] Pesquisar no [Portal de Dados Abertos](https://dados.gov.br/dados/conjuntos-dados) por dados de violência contra mulheres.

- [ ] Avaliar e documentar o conjunto [Violência Física - Mulheres](https://dados.gov.br/dados/conjuntos-dados/avl270).
	- Critério de conclusão: fonte, licença, periodicidade, campos e limitações estão registrados antes de qualquer importação.

- [ ] Avaliar o serviço de atendimento do [Hospital da Mulher da UFTM](https://www.gov.br/pt-br/servicos/receber-atendimento-em-situacoes-de-violencia-sofrida-pela-mulher-no-hospital-da-mulher-hospital-de-clinicas-da-uftm).

- [ ] Documentar canais oficiais para [denunciar e buscar ajuda](https://www.gov.br/pt-br/servicos/denunciar-e-buscar-ajuda-a-vitimas-de-violencia-contra-mulheres).

- [ ] Avaliar informações do [Conselho Nacional dos Direitos da Mulher](https://www.gov.br/mulheres/pt-br/acesso-a-informacao/participacao-social/cndm).

## P2 - Infraestrutura e documentação

- [ ] **Otimizar os Dockerfiles**.
	- Critério de conclusão: dependências são instaladas de forma determinística, imagens usam estágios adequados quando necessário e o container inicia sem depender de volume de código.

- [ ] **Atualizar a documentação das sprints**.
	- Critério de conclusão: reviews não marcam como concluídas funcionalidades que ainda não existem no código.

- [x] **Documentar o modelo de domínio**.
	- Referência: [docs/modelo-dominio.md](docs/modelo-dominio.md).

- [x] **Referenciar o modelo de domínio no README**.
