module.exports = app => {
    const pedido = require("../controllers/pedido.controller.js");

    var router = require("express").Router();

    router.post("/", pedido.create);

    router.get("/", pedido.findAll);

    router.get("/:id", pedido.findOne);

    router.put("/:id", pedido.update);

    router.delete("/:id", pedido.delete);

    router.delete("/", pedido.deleteAll);

    app.use('/pedido', router);
};