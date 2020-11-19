const graphql = require('graphql')
const {User, DailyEntry, Goal} = require('../db/models')
const crypto = require('crypto')

const goalType = new graphql.GraphQLObjectType({
  name: 'Goal',
  fields: {
    id: {type: graphql.GraphQLID},
    userId: {type: graphql.GraphQLID},
    dailyEntryId: {type: graphql.GraphQLID},
    dateCreated: {type: graphql.GraphQLString},
    dateCompleted: {type: graphql.GraphQLString},
    description: {type: graphql.GraphQLString},
    completed: {type: graphql.GraphQLBoolean},
    active: {type: graphql.GraphQLBoolean}
  }
})

const dailyEntryType = new graphql.GraphQLObjectType({
  name: 'DailyEntry',
  fields: {
    id: {type: graphql.GraphQLID},
    userId: {type: graphql.GraphQLID},
    date: {type: graphql.GraphQLString},
    journal: {type: graphql.GraphQLString},
    mood: {type: graphql.GraphQLInt},
    goals: {type: graphql.GraphQLList(goalType)}
  }
})

const userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: {type: graphql.GraphQLID},
    email: {type: graphql.GraphQLString},
    firstName: {type: graphql.GraphQLString},
    password: {type: graphql.GraphQLString},
    goals: {type: graphql.GraphQLList(goalType)},
    dailyEntries: {type: graphql.GraphQLList(dailyEntryType)}
  }
})

const queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        email: {type: graphql.GraphQLString},
        password: {type: graphql.GraphQLString}
      },
      resolve: async (parent, args) => {
        // code to get data from db
        try {
          const foundUser = await User.findOne({
            where: {email: args.email},
            include: [DailyEntry, Goal]
          })
          if (foundUser) {
            if (!foundUser.correctPassword(args.password)) {
              return 'Incorrect email or password'
            } else {
              return foundUser
            }
          } else {
            return 'Incorrect email or password'
          }
        } catch (err) {
          console.log(err)
        }
      }
    },
    users: {
      type: graphql.GraphQLList(userType),
      resolve: async (parent, args) => {
        // code to get data from db
        try {
          const users = await User.findAll({include: [DailyEntry, Goal]})
          return users
        } catch (err) {
          console.log(err)
        }
      }
    },
    dailyEntry: {
      type: dailyEntryType,
      args: {
        id: {type: graphql.GraphQLID}
      },
      resolve: async (parent, args) => {
        // code to get data from db
        try {
          const found = await DailyEntry.findOne({
            where: {id: args.id},
            include: [Goal]
          })
          return found
        } catch (err) {
          console.log(err)
        }
      }
    },
    dailyEntries: {
      type: graphql.GraphQLList(dailyEntryType),
      args: {
        userId: {type: graphql.GraphQLID}
      },
      resolve: async (parent, args) => {
        // code to get data from db
        try {
          const dailyEntries = await DailyEntry.findAll({
            where: {userId: args.userId},
            include: [Goal]
          })
          return dailyEntries
        } catch (err) {
          console.log(err)
        }
      }
    },
    goal: {
      type: goalType,
      args: {
        id: {type: graphql.GraphQLID}
      },
      resolve: async (parent, args) => {
        // code to get data from db
        try {
          const found = await Goal.findOne({
            where: {id: args.id}
          })
          return found
        } catch (err) {
          console.log(err)
        }
      }
    },
    activeGoals: {
      type: graphql.GraphQLList(goalType),
      args: {
        userId: {type: graphql.GraphQLID},
        dailyEntryId: {type: graphql.GraphQLID}
      },
      resolve: async (parent, args) => {
        // code to get data from db
        try {
          const goals = await Goal.findAll({
            where: {
              userId: args.userId,
              active: true
            }
          })
          return goals
        } catch (err) {
          console.log(err)
        }
      }
    },
    goals: {
      type: graphql.GraphQLList(goalType),
      args: {
        userId: {type: graphql.GraphQLID}
      },
      resolve: async (parent, args) => {
        // code to get data from db
        try {
          const goals = await Goal.findAll({
            where: {userId: args.userId}
          })
          return goals
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
})

const mutationType = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: userType,
      args: {
        firstName: {type: graphql.GraphQLString},
        email: {type: graphql.GraphQLString},
        password: {type: graphql.GraphQLString}
      },
      async resolve(parent, args) {
        try {
          let attemptFind = await User.findOne({
            where: {email: args.email}
          })
          if (attemptFind) {
            return 'User already exists'
          } else {
            let user = new User({
              email: args.email,
              firstName: args.firstName,
              password: args.password
            })
            const created = await User.create(user.dataValues)
            return created
          }
        } catch (err) {
          console.log(err)
        }
      }
    },
    addDailyEntry: {
      type: dailyEntryType,
      args: {
        journal: {type: graphql.GraphQLString},
        mood: {type: graphql.GraphQLInt},
        userId: {type: graphql.GraphQLID}
      },
      async resolve(parent, args) {
        try {
          let dailyEntry = new DailyEntry({
            userId: args.userId,
            journal: args.journal,
            mood: args.mood
          })
          const created = await DailyEntry.create(dailyEntry.dataValues)
          return created
        } catch (err) {
          console.log(err)
        }
      }
    },
    addGoal: {
      type: goalType,
      args: {
        userId: {type: graphql.GraphQLID},
        dailyEntryId: {type: graphql.GraphQLID},
        description: {type: graphql.GraphQLString}
      },
      async resolve(parent, args) {
        try {
          let goal = new Goal({
            userId: args.userId,
            dailyEntryId: args.dailyEntryId,
            description: args.description
          })
          const createdGoal = await Goal.create(goal.dataValues)
          return createdGoal
        } catch (err) {
          console.log(err)
        }
      }
    },
    // update goal
    updateGoal: {
      type: goalType,
      args: {
        id: {type: graphql.GraphQLID},
        active: {type: graphql.GraphQLBoolean},
        completed: {type: graphql.GraphQLBoolean},
        dateCompleted: {type: graphql.GraphQLString}
      },
      async resolve(parent, args) {
        try {
          let dateCompleted
          if (args.completed) dateCompleted = Date.now()
          else dateCompleted = null
          let updatedGoal = await Goal.update(
            {
              completed: args.completed,
              dateCompleted: dateCompleted
            },
            {
              where: {id: args.id},
              returning: true
            }
          )
          console.log(updatedGoal)
          return updatedGoal[1][0].dataValues
          // write in an update for making goals active/inactive
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
})

const schema = new graphql.GraphQLSchema({
  query: queryType,
  mutation: mutationType
})
module.exports = schema
