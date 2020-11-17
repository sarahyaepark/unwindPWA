const graphql = require('graphql')
const {User} = require('../db/models')
const {DailyEntry} = require('../db/models')
const crypto = require('crypto')

const dailyEntryType = new graphql.GraphQLObjectType({
  name: 'DailyEntry',
  fields: {
    id: {type: graphql.GraphQLID},
    userId: {type: graphql.GraphQLInt},
    date: {type: graphql.GraphQLString},
    journal: {type: graphql.GraphQLString},
    mood: {type: graphql.GraphQLString},
    goalsMet: {type: graphql.GraphQLList(graphql.GraphQLBoolean)}
  }
})

const userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: {type: graphql.GraphQLID},
    email: {type: graphql.GraphQLString},
    firstName: {type: graphql.GraphQLString},
    password: {type: graphql.GraphQLString},
    goals: {type: graphql.GraphQLList(graphql.GraphQLString)},
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
            where: {email: args.email}
          })
          if (foundUser) {
            if (!foundUser.correctPassword(args.password)) {
              return 'Incorrect email or password'
            } else {
              return foundUser
            }
          }
          return foundUser
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
          const users = await User.findAll({include: DailyEntry})
          console.log(users)
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
            where: {id: args.id}
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
            where: {userId: args.userId}
          })
          return dailyEntries
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
        password: {type: graphql.GraphQLString},
        goals: {type: graphql.GraphQLList(graphql.GraphQLString)}
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
              password: args.password,
              goals: args.goals
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
        mood: {type: graphql.GraphQLString},
        goalsMet: {type: graphql.GraphQLList(graphql.GraphQLBoolean)},
        userId: {type: graphql.GraphQLInt}
      },
      async resolve(parent, args) {
        try {
          let dailyEntry = new DailyEntry({
            userId: args.userId,
            journal: args.journal,
            mood: args.mood,
            goalsMet: args.goalsMet
          })
          const created = await DailyEntry.create(dailyEntry.dataValues)
          return created
        } catch (err) {
          console.log(err)
        }
      }
    },
    deleteIngredient: {
      type: dailyEntryType,
      args: {
        id: {type: graphql.GraphQLID}
      },
      async resolve(parent, args) {
        try {
          await DailyEntry.destroy({
            where: {id: args.id}
          })
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
