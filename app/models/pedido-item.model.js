module.exports = (sequelize, Sequelize) => {
    const PedidoItem = sequelize.define("pedido_items", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        quantidade: {
            type: Sequelize.INTEGER
        },
        produto_id: {
            type: Sequelize.INTEGER,

        },
        pedido_id: {
            type: Sequelize.INTEGER,

        },
    })
    return PedidoItem;
}