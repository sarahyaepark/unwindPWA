const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(
  // process.env.NODE_ENV === 'production'
  //   ?
  // `postgres://${process.env.USER}:${
  // process.env.PASSWORD
  // }@db-postgresql-sfo2-12541-do-user-8423247-0.b.db.ondigitalocean.com:25060/defaultdb?ssl=true`,
  `postgres://localhost:5432/${databaseName}`,
  {
    logging: false
  }
)
module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
