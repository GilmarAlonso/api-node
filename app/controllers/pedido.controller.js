const db = require("../models");
const { create } = require("./produto.controller");
const Pedido = db.pedidos;
const pedidoItems = db.pedidoItems;
const Op = db.Sequelize.Op;
Pedido.hasMany(pedidoItems, {
  foreignKey: "pedido_id",
});
pedidoItems.belongsTo(Pedido, { foreignKey: "id" });
exports.create = async (req, res) => {
  Pedido.create(
    {
      preco_total: req.body.preco_total,
      data: req.body.data,
      pedido_items: req.body.produtos,
    },
    {
      include: pedidoItems,
    }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message || "Algo deu errado ao criar pedido.",
      });
    });
};

exports.findAll = (req, res) => {
  const data = req.body.data;
  const preco_total = req.body.preco_total;
  let condition = data ? { data: { [Op.eq]: `%${data}%` } } : preco_total ? { preco_total: { [Op.eq]: `%${preco_total}%` } } : null;
  let page = req.query.page > 1 ? req.query.page : 1;
  let offset = 0 + (page - 1) * 5
  Pedido.findAndCountAll({
    where: condition,
    include: [pedidoItems],
    where: condition,
    offset: offset,
    limite: 5,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      res.status(500).send({
        message: e.message || "Algo deu errado na hora de buscar pedidos",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Pedido.findOne({
    where: { id: id },
    include: [pedidoItems]
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "erro ao buscar pedido id=" + id,
      });
    });
};

exports.update = async (req, res) => {
  const id = req.params.id;

  const pedido = await Pedido.update(
    {
      preco_total: req.body.preco_total,
      data: req.body.data,
      pedido_items: req.body.produtos,
    },
    {
      include: pedidoItems,

      where: { id: id },
    }
  ).then((num) => {
    return num
  }).catch((err) => {
    res.status(500).send({
      message: "Erro ao atualizar pedido id=" + id + err,
    });
  });

  if (pedido) {
    pedidoItems.destroy({ where: { pedido_id: id } })
    let produtos = req.body.produtos;
    produtos.map(function (produtos) { produtos.pedido_id = id });
    pedidoItems.bulkCreate(produtos).then(data => {
      res.send('Pedido atualizado com sucesso')
    }).catch((err) => {
      res.status(500).send({
        message: "Erro ao atualizar pedido id=" + id + err,
      });
    });
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Pedido.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return pedidoItems.destroy({ where: { pedido_id: id } }).then((num) => {

          res.send({
            message: "Pedido deletado!",
          });

        })
      } else {
        res.send({
          message: `Não foi possivel deletar id=${id}. !`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "erro ao deletar=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Pedido.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      pedidoItems.destroy({ where: {} }).then(() => {

        res.send({ message: ` todos os pedidos deletados!` });
      })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro ao deletar todos os pedidos.",
      });
    });
};
