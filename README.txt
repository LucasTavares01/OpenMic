Karaoke API e Web - Guia de Instalação e Configuração

Este guia ajudará você a configurar e rodar o projeto em sua máquina local.

---

Pré-requisitos
Certifique-se de ter os seguintes softwares instalados:

- VS Code: https://code.visualstudio.com/Download
- Postman: https://www.postman.com/downloads/
- XAMPP: https://www.apachefriends.org/download.html
  - Nota: O PHP é instalado automaticamente com o XAMPP.
- PHP 8.2: https://www.php.net/downloads.php
  - Incluído no XAMPP.
- Node.js 22.10: https://nodejs.org/en
- Composer: https://getcomposer.org/download/

---

Configuração do Projeto

Passo 1: Obter o arquivo do projeto
1. Baixe o repositório do GitHub:
   - OpenMic: https://github.com/LucasTavares01/OpenMic.git
2. Após baixar o arquivo:
   - O arquivo será descompactado em uma pasta com o nome OpenMic-master. Renomeie essa pasta para OpenMic.
   - Certifique-se de que dentro da pasta OpenMic já estejam os arquivos do projeto e não outra pasta com o mesmo nome.

Passo 2: Configurar o XAMPP
1. Inicie o Apache e o MySQL.
2. Clique no botão Admin do MySQL.
3. Na interface do phpmyadmin:
   - Crie um banco de dados chamado karaokedb.

Passo 3: Configurar a API (karaoke-api)
1. Abra a pasta karaoke-api no VS Code.
2. No terminal, execute:
   composer install
   - Esse processo pode levar até 20 minutos.
3. Copie o arquivo .env.example para a raiz do projeto e renomeie-o para .env.
4. Insira as seguintes informações ao final do arquivo .env:
   API_YOUTUBE_URL="https://www.googleapis.com/youtube/v3"
   API_YOUTUBE_KEY="sua-chave-da-api"
   JWT_SECRET=sua_chave_jwt_secret
   - Para configurar o API_YOUTUBE_KEY, siga as instruções disponíveis em https://alvaron.com.br/criando-chave-api-youtube-para-integrar-videos-em-sites-wordpress.
   - Gere uma chave para o JWT_SECRET com o comando:
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
5. Execute os comandos abaixo para finalizar a configuração da API:
   php artisan jwt:secret - Quando solicitado, digite Yes
   php artisan key:generate
   php artisan migrate:fresh
   php artisan serve

Passo 4: Configurar a Interface Web (karaoke-web)
1. Abra a pasta karaoke-web no VS Code.
2. Copie o arquivo .env.example para a raiz do projeto e renomeie-o para .env.
   - Confure a variável NEXTAUTH_SECRET= com uma senha qualqualquer:
   - NEXTAUTH_SECRET="senha123"
3. No PowerShell, execute como administrador:
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   - Isso permite a instalação de dependências do Node.js.
4. No terminal do VS Code, execute:
   npm install
   npm run dev

Passo 5: Configurar o Postman
1. Abra o Postman e faça login (ou crie uma conta).
2. No canto superior esquerdo, clique em Import e adicione o arquivo OpenMic.postman_collection.json.
3. Configure um ambiente:
   - Vá até a aba Environments e clique em New e selecione environment.
   - Renomeie o ambiente para OpenMic.
   - Adicione as seguintes variáveis:
     - url:
       - Initial Value: http://127.0.0.1:8000/api
       - Current Value: http://127.0.0.1:8000/api
     - token:
       - Deixe os campos em branco.
   - Pressione CTRL + S para salvar as alterações
4. No canto superior direito do Postman, selecione o ambiente OpenMic.
5. Acesse as rotas de criação:
   - Na aba Collections, expanda a pasta administrators.
   - Clique no arquivo post/admin/.
   - Na aba Body, insira um login e senha para criar o administrador.
   - Pressione CTRL + S para salvar as alterações
   - Clique em Send para finalizar.

Passo 6: Testar o Projeto
1. Abra o navegador e acesse: http://localhost:3000.
2. Faça login com o usuário e senha cadastrados no Postman.
3. Explore as funcionalidades do site.

---

Notas
- Caso encontre problemas, certifique-se de que todas as dependências estão instaladas corretamente.
- Verifique os logs no terminal para identificar erros específicos.
