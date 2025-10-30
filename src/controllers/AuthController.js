const bcrypt = require('bcryptjs');
const { User } = require('../models');

module.exports = {
  loginForm(req, res) {
    if (req.session.user) return res.redirect('/dashboard');
    res.render('login', { title: 'Login – Central de Suporte Técnico – UNINORTE' });
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.render('login', { title: 'Login – Central de Suporte Técnico – UNINORTE', error: 'Credenciais inválidas' });
    const ok = bcrypt.compareSync(password, user.password_hash);
    if (!ok) return res.render('login', { title: 'Login – Central de Suporte Técnico – UNINORTE', error: 'Credenciais inválidas' });
    req.session.user = { id: user.id, name: user.name, email: user.email, role: user.role };
    res.redirect('/dashboard');
  },

  logout(req, res) {
    req.session.destroy(() => res.redirect('/login'));
  },

  registerForm(req, res) {
    res.render('register', { title: 'Cadastrar Usuário – Central de Suporte Técnico – UNINORTE' });
  },

  register: async (req, res) => {
    const { name, email, password, password_confirm, role } = req.body;

    if (!name || !email || !password || !password_confirm || !role) {
      return res.render('register', { title: 'Cadastrar Usuário – Central de Suporte Técnico – UNINORTE', error: 'Todos os campos são obrigatórios' });
    }

    if (password !== password_confirm) {
      return res.render('register', { title: 'Cadastrar Usuário – Central de Suporte Técnico – UNINORTE', error: 'As senhas não conferem' });
    }

    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return res.render('register', { title: 'Cadastrar Usuário – Central de Suporte Técnico – UNINORTE', error: 'Este e-mail já está em uso' });
    }

    const password_hash = bcrypt.hashSync(password, 10);
    await User.create({ name, email, password_hash, role });

    res.redirect('/login');
  }
};