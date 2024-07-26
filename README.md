Claro! Aqui está o README ajustado e traduzido para o inglês:

---

# Node.js and MySQL Project Setup Guide

This guide will help you set up a Node.js environment with a MySQL database. Make sure you have Node.js and MySQL installed on your system before proceeding.

## Step 1: Project Initialization

Open your terminal and navigate to the directory where you want to create your project.

Run the following command to initialize a Node.js project:

```bash
npm init -y
```

This will create a `package.json` file with default settings.

## Step 2: Installing Dependencies

Next, install the necessary dependencies for your project. Run the following commands in the terminal:

```bash
npm install sequelize sequelize-cli mysql mysql2
npm install express ejs express-session bcrypt socket.io dotenv
```

These commands will install essential libraries, such as Sequelize for database integration, Express for creating the web server, and dotenv for managing environment variables.

## Step 3: Database Configuration

Create a `.env` file in the root of your project if you don't have one. The `.env` file should contain your database credentials:

```
DATABASE_HOST=localhost
DATABASE_USER=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=your_database_name
```

Replace `your_username`, `your_password`, and `your_database_name` with the values corresponding to your MySQL setup.

## Step 4: Sequelize Configuration

In your Sequelize configuration file (e.g., `app.js`), configure the connection to the database using environment variables:

```javascript
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME, 
  process.env.DATABASE_USER, 
  process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: 'mysql',
});
```

## Step 5: Running the Server

Run the following command in the terminal to start the server:

```bash
node app.js
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to check if everything is working correctly.

---
