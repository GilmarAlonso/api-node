module.exports = (sequelize,Sequelize) =>{
    const Produto = sequelize.define("produtos",{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        descricao:{
            type:Sequelize.STRING
        },
        preco:{
            type:Sequelize.DECIMAL(10,2)
        },
        titulo:{
            type:Sequelize.STRING
        },
        fabricante:{
            type:Sequelize.STRING
        },
        quantidade:{
            type:Sequelize.INTEGER
        },
        foto:{
            type:Sequelize.BLOB('long')
        }
    })
    return Produto;
}