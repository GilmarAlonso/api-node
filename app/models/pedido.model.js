module.exports = (sequelize,Sequelize) =>{
    const Pedido = sequelize.define("pedidos",{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        preco_total:{
            type:Sequelize.DECIMAL(10,2)
        },
        data:{
            type:Sequelize.DATE
        }
    })
    return Pedido;
}