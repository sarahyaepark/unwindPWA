const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const DailyEntry = db.define('dailyEntry', {
  date: {
    type: Sequelize.DATEONLY,
    defaultValue: Date.now()
  },
  journal: {
    type: Sequelize.STRING
  },
  mood: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [['happy', 'sad']]
    }
  },
  goalsMet: {
    type: Sequelize.ARRAY(Sequelize.BOOLEAN)
  }
})

module.exports = DailyEntry
