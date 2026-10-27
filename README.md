# Fatec Women App

O Fatec Women é um protótipo full-stack desenvolvido pela Fatec Rio Claro para auxiliar a Secretaria Municipal da Mulher no registro e acompanhamento de casos de violência contra mulheres e meninas. O objetivo é organizar e humanizar o atendimento, visando o controle e o tratamento dos agravos físicos e psíquicos decorrentes da violência, oferecendo atenção integral às vítimas.

O modelo de domínio do projeto está descrito em [docs/modelo-dominio.md](docs/modelo-dominio.md).

## 📱 Funcionalidades Principais

Para a mulher vítima de violência, o aplicativo oferece:
1. **Autenticação Segura**: Acesso via reconhecimento facial.
2. **Registro de Ocorrências**: Detalhamento do caso de violência.
3. **Denúncia**: Envio de dados do agressor para as autoridades locais.

## 🛠️ Arquitetura do Projeto

O projeto é composto por múltiplas camadas:
- **Cliente Android**: Localizado em [`src/android`](src/android).
- **API Python**: Backend localizado em [`src/api`](src/api).
- **Frontend Web**: Interface administrativa em [`src/frontend`](src/frontend).
- **Painel Admin**: Código de administração em [`src/admin`](src/admin).
- **Banco de Dados**: Esquemas e migrações em [`src/database`](src/database).

## 🚀 Configuração Local

### Pré-requisitos
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Android Studio](https://developer.android.com/studio)

### 1. Backend e Banco de Dados
Clone o repositório e utilize o Docker Compose para subir a API e o banco de dados Postgres:

```bash
git clone https://github.com/tarsislimadev/fatec-women-app
cd fatec-women-app
docker compose up -d --build
```
A API estará disponível com health checks em `http://localhost:8000/health`.

### 2. Aplicativo Android
Abra a pasta [`src/android`](src/android) no Android Studio. Para builds via linha de comando (Windows):

```powershell
cd src/android
./gradlew.bat assembleDebug
```

## 📦 Downloads e Links
- **Releases**: [Acessar Releases](https://github.com/tarsislimadev/fatec-women-app/releases)
- **Gestão do Projeto**: [Trello Board](https://trello.com/b/XfzfJLsb/mulher-01)

## 👥 Colaboradores
- **Tarsis Lima** (Desenvolvedor)
- **Luiz Henrique Crepaldi da Silva** (PO/SM)

## 📜 Licença
Este projeto está sob a licença [MIT](./LICENSE).
