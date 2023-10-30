const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const session = require('express-session');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));

const sequelize = new Sequelize('database', 'user', 'password',  {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexão estabelecida com sucesso.');
  })
  .catch((err) => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

sequelize.sync()
  .then(() => {
    app.get('/', (req, res) => {
      res.render('index');
    });

    app.get('/login', (req, res) => {
        res.render('login', { message: null });
      });

    app.post('/login', async (req, res) => {
      const { email, password } = req.body;
      try {
        const user = await User.findOne({ where: { email } });
        if (user && bcrypt.compareSync(password, user.password)) {
          req.session.user = user;
          res.redirect('/chat');
        } else {
          res.render('login', { message: 'Email ou senha incorretos' });
        }
      } catch (err) {
        console.error(err);
        res.render('login', { message: 'Ocorreu um erro. Tente novamente' });
      }
    });

    app.get('/register', (req, res) => {
        res.render('register', { message: null }); 
      });

    app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = await User.create({ username, email, password: hash });
    req.session.user = user;
    res.redirect('/chat');
  } catch (err) {
    console.error(err);
    if (err instanceof Sequelize.UniqueConstraintError) {
      res.render('register', { message: 'Usuário ou email já existem' });
    } else {
      res.render('register', { message: 'Ocorreu um erro. Tente novamente' });
    }
  }
});

    app.get('/chat', (req, res) => {
      if (req.session.user) {
        res.render('chat', { user: req.session.user });
      } else {
        res.redirect('/login');
      }
    });

    app.get('/logout', (req, res) => {
      req.session.destroy();
      res.redirect('/');
    });

//chat

io.on('connection', (socket) => {
  console.log('Um cliente se conectou');

  socket.on('message', (message) => {
      console.log('Mensagem recebida:', message);
      io.emit('message', message); 
  });

  socket.on('disconnect', () => {
      console.log('Um cliente desconectou');
  });
});


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`);
});
});