module.exports = app => {
    const produto = require("../controllers/produto.controller.js");

    var router = require("express").Router();

    router.post("/", produto.create);

    router.get("/", produto.findAll);

    router.get("/:id", produto.findOne);

    router.put("/:id", produto.update);

    router.delete("/:id", produto.delete);

    router.delete("/", produto.deleteAll);

    app.use('/produto', router);
};