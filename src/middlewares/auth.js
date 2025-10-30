module.exports.ensureAuth = function(req, res, next) {
  if (req.session && req.session.user) {
    res.locals.currentUser = req.session.user;
    return next();
  }
  return res.redirect('/login');
};

module.exports.ensureAdmin = function(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  return res.status(403).render('403', { title: 'Acesso negado – Suporte TI – UNINORTE' });
};
module.exports.ensureAuth = function(req, res, next) {
  if (req.session && req.session.user) {
    res.locals.currentUser = req.session.user;
    return next();
  }
  return res.redirect('/login');
};

module.exports.ensureAdmin = function(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  return res.status(403).render('403', { title: 'Acesso negado – Central de Suporte Técnico – UNINORTE' });
};