module.exports = (sequelize, type) => {
    return sequelize.define('Product', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: type.STRING,
        category: type.STRING,
        subcategory: type.STRING,
        img: type.BLOB('long'),
        price: type.STRING,
        description: type.TEXT,
        appointment: type.STRING,
        result: type.STRING,
        structure: type.STRING,
        note: type.STRING,
        volume: type.STRING,
        articul: type.STRING
    })
}