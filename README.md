# Node.js and MySQL Project Setup Guide

This guide will help you set up a Node.js environment with a MySQL database. Make sure you have Node.js and MySQL installed on your system before proceeding.

## Step 1: Project Initialization

Open your terminal and navigate to the directory where you want to create your project.

Run the following commands to initialize a Node.js project:

```bash
npm init -y
```

This will create a `package.json` file with default settings.

## Step 2: Installing Dependencies

Now, you need to install the necessary dependencies for your project. Run the following commands in the terminal:

```bash
npm install sequelize sequelize-cli sqlite3
npm install express ejs express-session bcrypt mysql2 sequelize
npm install socket.io
npm install
```

This will install required libraries such as Sequelize for database integration, Express for creating the web server.

## Step 3: Database Configuration

In the `app.js` file, replace `database`, `user`, and `password` with your MySQL database details:

```javascript
const sequelize = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});
```

## Step 4: Running the Server

Run the following command in the terminal to start the server:

```bash
node app.js
```

Visit http://localhost:3000 in your browser to check if everything is working correctly.
```
