const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const DailyEntry = db.define('dailyEntry', {
  date: {
    type: Sequelize.DATEONLY,
    defaultValue: Date.now()
  },
  mood: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [[0, 25, 50, 75, 100]]
    }
  },
  journal: {
    type: Sequelize.TEXT
  }
})

module.exports = DailyEntry
