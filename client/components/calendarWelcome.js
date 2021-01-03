import React, {useState, useEffect} from 'react'
import axios from 'axios'

// set a goodnight state to true
// countdown till next day (pass in the current date)
export default function CalendarWelcome(props) {
  let {view} = props
  return (
    <div className="calendarWelcomeDiv">
      <h3>Complete daily entries to see your personal calendar view!</h3>
      {view === 'desktop' ? (
        <img src="https://i.imgur.com/LwzpPPb.gif" width="800px" />
      ) : (
        <div>
          <img src="https://i.imgur.com/T9PNjVq.gif" />
          <br />
          <br />
          <br />
          <br />
        </div>
      )}
    </div>
  )
}
