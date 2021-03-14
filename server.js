const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = require("./app/models");
db.sequelize.sync();

// app.get("/", (req, res) => {
//     res.json({ message: "Olá DoLado" });
// });
require("./app/routes/produto.routes.js")(app);
require("./app/routes/pedido.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}.`);
});