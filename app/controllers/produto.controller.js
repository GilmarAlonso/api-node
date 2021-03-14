const db = require("../models");
const Produto = db.produtos;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    console.log();
    if (!req.body.titulo) {
        res.status(400).send({
            message: "conteudo veio vazio!"
        });
        return;
    }

    Produto.create(req.body).then(data => {
        res.send(data);
    }).catch(e => {
        res.status(500).send({
            message: e.message || "Algo deu errado ao criar produto."
        });
    });
};


exports.findAll = (req, res) => {
    const titulo = req.body.titulo;
    let condition = titulo ? { titulo: { [Op.like]: `%${titulo}%` } } : null;
    let page = req.query.page > 1 ? req.query.page : 1;
    let offset = 0 + (page - 1) * 5

    Produto.findAndCountAll(
        {
            where: condition,

            offset: offset,
            limite: 5,

        }
    ).then((data) => {
        res.send(data);
    }).catch((e) => {
        res.status(500).send({
            message: e.message || "Algo deu errado na hora de buscar produtos"
        });
    });
};


exports.findOne = (req, res) => {
    const id = req.params.id;

    Produto.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "erro ao buscar produto id=" + id
            });
        });
};


exports.update = (req, res) => {
    const id = req.params.id;

    Produto.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Produto atualizado com sucesso."
                });
            } else {
                res.send({
                    message: `Não foi possivel atualizar id=${id}. !`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro ao atualizar produto id=" + id
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    Produto.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Produto deletado!"
                });
            } else {
                res.send({
                    message: `Não foi possivel deletar id=${id}. !`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "erro ao deletar=" + id
            });
        });
};


exports.deleteAll = (req, res) => {
    Produto.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} todos os produtos deletados!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Erro ao deletar todos os produtos."
            });
        });
};

