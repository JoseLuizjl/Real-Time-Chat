Este guia o ajudará a configurar um ambiente Node.js com um banco de dados MySQL. Certifique-se de ter o Node.js e o MySQL instalados em seu sistema antes de prosseguir.

Passo 1: Inicialização do Projeto:

Abra seu terminal e navegue até o diretório onde deseja criar seu projeto.

Execute os seguintes comandos para inicializar um projeto Node.js:

npm init -y

Isso criará um arquivo package.json com as configurações padrão.


Passo 2: Instalação de Dependências:

Agora, você precisará instalar as dependências necessárias para o seu projeto. Execute os seguintes comandos no terminal.

npm install sequelize sequelize-cli sqlite3
npm install express ejs express-session bcrypt mysql2 sequelize
npm install


Isso instalará as bibliotecas necessárias, como o Sequelize para a integração do banco de dados, o Express para criar o servidor web.


Passo 3: Configuração do Banco de Dados:

No arquivo index.js, substitua name_data_base, user_name, e password pelos detalhes do seu banco de dados MySQL.


const sequelize = new Sequelize('name_data_base', 'user_name', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});


Passo 4: Executando o Servidor:

Execute o seguinte comando no terminal para iniciar o servidor.

node index.js

Acesse http://localhost:3000 no navegador para verificar se tudo está funcionando corretamente.