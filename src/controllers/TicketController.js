const { Ticket, User, Comment } = require('../models');
const { Op } = require('sequelize');

module.exports = {
  async dashboard(req, res) {
    const where = req.session.user.role === 'admin' ? {} : { authorId: req.session.user.id };
    const [total, abertos, andamento, resolvidos] = await Promise.all([
      Ticket.count({ where }),
      Ticket.count({ where: { ...where, status: 'aberto' } }),
      Ticket.count({ where: { ...where, status: 'em_andamento' } }),
      Ticket.count({ where: { ...where, status: 'resolvido' } })
    ]);
    res.render('dashboard', { title: 'Dashboard – Central de Suporte Técnico – UNINORTE', total, abertos, andamento, resolvidos });
  },

  async list(req, res) {
    const q = req.query.q || '';
    const whereBase = req.session.user.role === 'admin' ? {} : { authorId: req.session.user.id };
    const where = q ? { 
      ...whereBase, 
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { description: { [Op.like]: `%${q}%` } }
      ] 
    } : whereBase;

    const tickets = await Ticket.findAll({
      where,
      include: [{ model: User, as: 'author', attributes: ['id','name','email'] }],
      order: [['id', 'DESC']]
    });
    res.render('tickets_list', { title: 'Chamados – Central de Suporte Técnico – UNINORTE', tickets, q });
  },

  newForm(req, res) {
    res.render('tickets_new', { title: 'Novo Chamado – Central de Suporte Técnico – UNINORTE' });
  },

  async create(req, res) {
    const { title, description, priority } = req.body;
    if (!title || !description) {
      return res.render('tickets_new', { title: 'Novo Chamado – Central de Suporte Técnico – UNINORTE', error: 'Preencha título e descrição' });
    }
    await Ticket.create({ title, description, priority, authorId: req.session.user.id });
    res.redirect('/tickets');
  },

  async show(req, res) {
    const ticket = await Ticket.findByPk(req.params.id, {
      include: [
        { model: User, as: 'author', attributes: ['id','name','email'] },
        { 
          model: Comment, 
          as: 'comments',
          include: [{ model: User, as: 'author', attributes: ['id','name','email'] }] 
        }
      ],
      order: [[{ model: Comment, as: 'comments' }, 'createdAt', 'ASC']]
    });
    if (!ticket) return res.status(404).render('404', { title: 'Não encontrado – Central de Suporte Técnico – UNINORTE' });

    const canSee = req.session.user.role === 'admin' || ticket.authorId === req.session.user.id;
    if (!canSee) return res.status(403).render('403', { title: 'Acesso negado – Central de Suporte Técnico – UNINORTE' });

    res.render('tickets_show', { title: `Chamado #${ticket.id} – Central de Suporte Técnico – UNINORTE`, ticket });
  },

  async updateStatus(req, res) {
    const ticket = await Ticket.findByPk(req.params.id);
    if (!ticket) return res.status(404).render('404', { title: 'Não encontrado – Central de Suporte Técnico – UNINORTE' });
    ticket.status = req.body.status;
    await ticket.save();
    res.redirect(`/tickets/${ticket.id}`);
  },

  async addComment(req, res) {
    const { content } = req.body;
    const ticketId = req.params.id;
    const authorId = req.session.user.id;

    if (!content) {
      return res.redirect(`/tickets/${ticketId}`);
    }

    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) return res.status(404).render('404', { title: 'Não encontrado – Central de Suporte Técnico – UNINORTE' });

    const canComment = req.session.user.role === 'admin' || ticket.authorId === req.session.user.id;
    if (!canComment) return res.status(403).render('403', { title: 'Acesso negado – Central de Suporte Técnico – UNINORTE' });

    await Comment.create({ content, ticketId, authorId });
    res.redirect(`/tickets/${ticketId}`);
  }
};