const { Router } = require('express');
const Auth = require('../controllers/AuthController');
const Ticket = require('../controllers/TicketController');
const { ensureAuth, ensureAdmin } = require('../middlewares/auth');

const routes = Router();

routes.get('/', (req, res) => res.redirect('/dashboard'));

routes.get('/login', Auth.loginForm);
routes.post('/login', Auth.login);
routes.get('/logout', Auth.logout);

routes.get('/dashboard', ensureAuth, Ticket.dashboard);

routes.get('/tickets', ensureAuth, Ticket.list);
routes.get('/tickets/new', ensureAuth, Ticket.newForm);
routes.post('/tickets', ensureAuth, Ticket.create);
routes.get('/tickets/:id', ensureAuth, Ticket.show);
routes.post('/tickets/:id/status', ensureAuth, ensureAdmin, Ticket.updateStatus);

module.exports = routes;
