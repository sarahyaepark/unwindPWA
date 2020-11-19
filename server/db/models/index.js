const User = require('./user')
const DailyEntry = require('./dailyEntry')
const Goal = require('./goal')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

DailyEntry.belongsTo(User)
User.hasMany(DailyEntry)
Goal.belongsTo(User)
User.hasMany(Goal)
Goal.belongsTo(DailyEntry)
DailyEntry.hasMany(Goal)

module.exports = {
  User,
  DailyEntry,
  Goal
}
