'use strict'
const {green, red} = require('chalk')
const db = require('../server/db')

const {User, DailyEntry} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  const [Yeppy, Beau] = await Promise.all([
    User.create({
      firstName: 'Yeppy',
      email: 'yeppy@email.com',
      password: '123',
      goals: ['morning stretches', 'meditate']
    }),
    User.create({
      firstName: 'Beau',
      email: 'beau@email.com',
      password: '123',
      goals: ['morning barks', 'meditate']
    })
  ])

  const [sampleEntry1, sampleEntry2, sampleEntry3] = await Promise.all([
    DailyEntry.create({
      userId: Yeppy.id,
      date: '2020-11-15',
      journal: 'I had a great day today',
      mood: 'happy',
      goalsMet: [true, false]
    }),
    DailyEntry.create({
      userId: Yeppy.id,
      journal: 'I had a bad day!!!!',
      mood: 'sad',
      goalsMet: [false, false]
    }),
    DailyEntry.create({
      userId: Beau.id,
      journal: 'I had a great day!!!!',
      mood: 'happy',
      goalsMet: [true, true]
    })
  ])

  return [Yeppy, Beau, sampleEntry1, sampleEntry2, sampleEntry3]
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
