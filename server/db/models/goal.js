const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Goal = db.define('goal', {
  dateCreated: {
    type: Sequelize.DATEONLY,
    defaultValue: Date.now()
  },
  dateCompleted: {
    type: Sequelize.DATEONLY
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

module.exports = Goal
