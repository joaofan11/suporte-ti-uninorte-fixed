const bcrypt = require('bcryptjs');
const { User } = require('../models');

module.exports = {
  loginForm(req, res) {
    if (req.session.user) return res.redirect('/dashboard');
    res.render('login', { title: 'Login – Suporte TI – UNINORTE' });
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.render('login', { title: 'Login – Suporte TI – UNINORTE', error: 'Credenciais inválidas' });
    const ok = bcrypt.compareSync(password, user.password_hash);
    if (!ok) return res.render('login', { title: 'Login – Suporte TI – UNINORTE', error: 'Credenciais inválidas' });
    req.session.user = { id: user.id, name: user.name, email: user.email, role: user.role };
    res.redirect('/dashboard');
  },

  logout(req, res) {
    req.session.destroy(() => res.redirect('/login'));
  }
};
