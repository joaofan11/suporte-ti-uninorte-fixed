require('dotenv').config();
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');
const bcrypt = require('bcryptjs');
const expressLayouts = require('express-ejs-layouts');

const routes = require('./routes');
const { syncModels, User } = require('./models');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout'); 

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(session({
  secret: process.env.SESSION_SECRET || 'devsecret',
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

app.use(routes);

app.use((req, res) => res.status(404).render('404', { title: 'Não encontrado – Central de Suporte Técnico – UNINORTE' }));

const PORT = process.env.PORT || 3333;

async function bootstrap() {
  await syncModels();

  const emailAdmin = 'admin@helpdesk.local';
  const exists = await User.findOne({ where: { email: emailAdmin } });
  if (!exists) {
    const password_hash = bcrypt.hashSync('admin123', 10);
    await User.create({ name: 'Administrador', email: emailAdmin, password_hash, role: 'admin' });
    console.log('Admin criado:', emailAdmin, 'senha: admin123');
  }

  app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
}

process.on('unhandledRejection', (r) => console.error('[unhandledRejection]', r));
process.on('uncaughtException', (e) => console.error('[uncaughtException]', e));

bootstrap().catch((e) => {
  console.error('[BOOTSTRAP FALHOU]', e);
  console.error('O servidor não iniciou. Veja a mensagem acima e salve para o nodemon reiniciar.');
});