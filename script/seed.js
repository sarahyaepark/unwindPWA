'use strict'
const {green, red} = require('chalk')
const db = require('../server/db')

const {User, DailyEntry, Goal} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  // users
  const [Yeppy] = await Promise.all([
    User.create({
      firstName: 'Yeppy',
      email: 'yeppy@email.com',
      password: '123'
    })
    // User.create({
    //   firstName: 'Beau',
    //   email: 'beau@email.com',
    //   password: '123'
    // })
  ])
  // daily entries
  const [
    sampleEntry1,
    sampleEntry2,
    sampleEntry3,
    sampleEntry4,
    sampleEntry5,
    sampleEntry6,
    sampleEntry7,
    sampleEntry8,
    sampleEntry9,
    sampleEntry10
  ] = await Promise.all([
    DailyEntry.create({
      userId: Yeppy.id,
      date: '2020-11-26',
      journal: 'I had a great day today',
      mood: 100
    }),
    DailyEntry.create({
      userId: Yeppy.id,
      date: '2020-11-27',
      journal: 'I had a bad day!!!!',
      compliment: 'I am so cute',
      mood: 25
    }),
    DailyEntry.create({
      userId: Yeppy.id,
      date: '2020-11-28',
      journal: 'I had a ok day',
      mood: 50
    }),
    DailyEntry.create({
      userId: Yeppy.id,
      date: '2020-11-29',
      journal: 'I had a bad day',
      mood: 25
    }),
    DailyEntry.create({
      userId: Yeppy.id,
      date: '2020-11-30',
      journal: 'I had a good day!',
      compliment: 'I am so nice',
      mood: 75
    }),
    DailyEntry.create({
      userId: Yeppy.id,
      date: '2020-12-01',
      journal: 'I had a good day!',
      compliment: 'I am so nice',
      mood: 25
    }),
    DailyEntry.create({
      userId: Yeppy.id,
      date: '2020-12-02',
      journal: 'I had a good day!',
      compliment: 'I am so nice',
      mood: 50
    }),
    DailyEntry.create({
      userId: Yeppy.id,
      date: '2020-12-03',
      journal: 'I had a horrible day!',
      compliment: 'I am so nice',
      mood: 0
    }),
    DailyEntry.create({
      userId: Yeppy.id,
      date: '2020-12-04',
      journal: 'I had a amazing day!',
      compliment: 'I am so nice',
      mood: 100
    }),
    DailyEntry.create({
      userId: Yeppy.id,
      date: '2020-12-05',
      journal: 'I had a sad day!',
      compliment: 'I am so kind',
      mood: 0
    })
  ])
  // goals
  let dates = [
    '2020-11-26',
    '2020-11-27',
    '2020-11-28',
    '2020-11-29',
    '2020-11-30',
    '2020-12-01',
    '2020-12-02',
    '2020-12-03',
    '2020-12-04',
    '2020-12-05'
  ]
  let sampleEntries = [
    sampleEntry1,
    sampleEntry2,
    sampleEntry3,
    sampleEntry4,
    sampleEntry5,
    sampleEntry6,
    sampleEntry7,
    sampleEntry8,
    sampleEntry9,
    sampleEntry10
  ]
  const goals = () => {
    let temp = []
    for (let i = 0; i < sampleEntries.length - 1; i++) {
      console.log(sampleEntries[i + 1])
      let g1 = Goal.create({
        userId: Yeppy.id,
        dailyEntryId: sampleEntries[i].id,
        dateCompleted: dates[i],
        dateCreated: dates[i],
        description: 'Morning stretch',
        completed: true,
        active: false
      })
      let g2 = Goal.create({
        userId: Yeppy.id,
        dailyEntryId: sampleEntries[i].id,
        dateCompleted: dates[i],
        dateCreated: dates[i],
        description: 'Eat treats',
        completed: true,
        active: false
      })
      let g3 = Goal.create({
        userId: Yeppy.id,
        dailyEntryId: sampleEntries[i].id,
        dateCompleted: dates[i],
        dateCreated: dates[i],
        description: 'Get cuddles',
        completed: true,
        active: false
      })
      temp.push(g1)
      temp.push(g2)
      temp.push(g3)
    }
    let g1 = Goal.create({
      userId: Yeppy.id,
      dailyEntryId: sampleEntries[sampleEntries.length - 1].id,
      dateCompleted: dates[sampleEntries.length - 1],
      dateCreated: dates[sampleEntries.length - 1],
      description: 'Morning stretch',
      completed: false,
      active: true
    })
    let g2 = Goal.create({
      userId: Yeppy.id,
      dailyEntryId: sampleEntries[sampleEntries.length - 1].id,
      dateCompleted: dates[sampleEntries.length - 1],
      dateCreated: dates[sampleEntries.length - 1],
      description: 'Eat treats',
      completed: false,
      active: true
    })
    let g3 = Goal.create({
      userId: Yeppy.id,
      dailyEntryId: sampleEntries[sampleEntries.length - 1].id,
      dateCompleted: dates[sampleEntries.length - 1],
      dateCreated: dates[sampleEntries.length - 1],
      description: 'Get cuddles',
      completed: false,
      active: true
    })
    temp.push(g1)
    temp.push(g2)
    temp.push(g3)
    return temp
  }

  let finalGoals = await Promise.all(goals())

  return [
    Yeppy,
    sampleEntry1,
    sampleEntry2,
    sampleEntry3,
    sampleEntry4,
    sampleEntry5,
    sampleEntry6,
    finalGoals
  ]
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

if (require.main === module) {
  runSeed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
      db.close()
    })
}
