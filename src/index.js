const chalk = require('chalk')
const server = require('./server')

console.log(chalk.blue('Loading server...'))

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = server()
