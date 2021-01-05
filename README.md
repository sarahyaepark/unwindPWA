# Unwind

_A nightly ritual self-care PWA to log users’ daily moods and self-care goals to improve mental wellness_

Backend with `Node`/`express`/`sequelize`/`GraphQL` and a frontend with `react`/`redux`/`d3`

## App Walkthrough

* Sign up and choose three daily self care goals
<img width="600px" height="277px" src="./public/demo_gifs/signup_goalform.gif">

* Check in daily to log mood, journal, and compliment
<img width="600px" height="277px" src="./public/demo_gifs/dailyentry.gif">

* Calendar View and analyses of daily user info

**desktop**

<img width="600px" height="277px" src="./public/demo_gifs/desktopCal.gif">

**mobile**

<img width="246px" height="534px" src="./public/demo_gifs/mobileCal.gif">

* Update account settings
<img width="600px" height="277px" src="./public/demo_gifs/accsettings.gif">

## Local Setup

Fork & clone this repo and then

* Run the following commands:
* `npm install`
* Create two postgres databases

```
createdb $Unwind
createdb $Unwind-test
```

* `npm run seed` for some seed data

## Start

Running `npm run start-dev` will make great things happen!

If you want to run the server and/or `webpack` separately, you can also
`npm run start-server` and `npm run build-client`.

Enjoy!
