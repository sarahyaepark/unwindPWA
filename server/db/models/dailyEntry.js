const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const getCurrentDate = () => {
  let date = new Date()
  let day = date.getDate()
  if (day.toString().length === 1) day = '0' + day
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  return year + '-' + month + '-' + day
}

const DailyEntry = db.define('dailyEntry', {
  date: {
    type: Sequelize.DATEONLY,
    defaultValue: getCurrentDate()
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
  },
  compliment: {
    type: Sequelize.TEXT
  }
})

module.exports = DailyEntry
