# Fatec Women App

O Fatec Women é um protótipo full-stack desenvolvido por estudantes da Fatec Rio Claro com o propósito de apoiar a Secretaria Municipal da Mulher na gestão, registro e acompanhamento de casos de violência contra mulheres e meninas. O sistema visa transformar a experiência de atendimento, auxiliando processos manuais por um fluxo digital organizado e humanizado, facilitando o controle de agravos físicos e psíquicos e garantindo que a vítima receba uma atenção integral e multidisciplinar.

O modelo de domínio detalhado, incluindo as regras de negócio e fluxos de dados, está descrito em [docs/modelo-dominio.md](docs/modelo-dominio.md).

## 📱 Funcionalidades Principais

O ecossistema do aplicativo foi projetado para oferecer segurança e agilidade no momento crítico da denúncia:

- Autenticação Biométrica Segura: Para garantir a privacidade e a identidade da usuária, o sistema implementa a autenticação via reconhecimento facial, reduzindo a dependência de senhas que podem ser comprometidas.
- Registro Detalhado de Ocorrências: Interface intuitiva que permite à vítima descrever a natureza da violência, o histórico de incidentes e o estado atual de sua saúde e segurança.
- Canal Direto de Denúncia: Módulo de envio automatizado de dados do agressor e evidências para as autoridades locais competentes, agilizando o tempo de resposta e a proteção da vítima.
- Gestão Administrativa: Painel para a Secretaria Municipal da Mulher gerenciar os casos recebidos, priorizar atendimentos e monitorar a evolução do suporte oferecido.

## 🛠️ Arquitetura do Projeto

O projeto adota uma abordagem modular para facilitar a manutenção e a escalabilidade de cada componente:

- Cliente Android ([`src/android`](src/android)): Aplicativo nativo desenvolvido para as vítimas, focado em usabilidade, acessibilidade e segurança.
- API Python ([`src/api`](src/api)): Backend robusto que centraliza a lógica de negócio, a validação de dados e a comunicação com o banco de dados.
- Frontend Web ([`src/frontend`](src/frontend)): Interface moderna para visualização de dados e relatórios.
- Painel Admin ([`src/admin`](src/admin)): Módulo especializado para a gestão administrativa dos casos e usuários.

## 🚀 Configuração Local

### Pré-requisitos
Para configurar o ambiente de desenvolvimento, certifique-se de ter instalado:
- Git: Para controle de versão e clonagem do código.
- Docker & Docker Compose: Para a orquestração dos serviços de backend e banco de dados.
- Android Studio: Para compilação e execução do aplicativo mobile.

### 1. Backend e Banco de Dados
O backend é distribuído via containers para garantir a paridade entre os ambientes de desenvolvimento e produção. Para iniciar:

```bash
# Clone o repositório
git clone https://github.com/tarsislimadev/fatec-women-app
cd fatec-women-app

# Inicie os serviços (API Python e Postgres)
docker compose up -d --build
```
Após a inicialização, você pode validar a disponibilidade da API acessando o endpoint de saúde: `http://localhost:8000/health`.

### 2. Aplicativo Android
O aplicativo é desenvolvido em Kotlin/Java. Para executá-lo:
1. Abra o Android Studio.
2. Selecione "Open" e aponte para a pasta [`src/android`](src/android).
3. Sincronize o Gradle e execute em um emulador ou dispositivo físico.

Para builds via linha de comando (Windows):
```powershell
cd src/android
./gradlew.bat assembleDebug
```

## 📦 Downloads e Links
- Releases: Versões compiladas e notas de atualização disponíveis em [GitHub Releases](https://github.com/tarsislimadev/fatec-women-app/releases).
- Gestão do Projeto: Acompanhe o roadmap e as tarefas pendentes no [Trello Board](https://trello.com/b/XfzfJLsb/mulher-01).

## 👥 Colaboradores
- Tarsis Lima: Desenvolvimento Full-stack e Arquitetura de Software.
- Luiz Henrique Crepaldi da Silva: Product Owner (PO) e Scrum Master (SM), responsável pela gestão de requisitos e agilidade.

## 📜 Licença
Este projeto é distribuído sob a licença [MIT](./LICENSE), permitindo o uso, modificação e distribuição livre do software.
