const Sequelize = require('sequelize')
const ProductModel = require('./models/book')
const config = require('../config')

console.log(config.database, config.user, config.dbPassword)

const sequelize = new Sequelize(config.database, config.user, config.dbPassword, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const Product = ProductModel(sequelize, Sequelize)

sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  Product
}