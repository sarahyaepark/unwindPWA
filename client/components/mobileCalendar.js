import React, {useState, useEffect} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import MobileDayOverview from './mobileDayOverview'

const MobileCalendar = props => {
  const formatDate = newDate => {
    let d = new Date(newDate),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day
    return [year, month, day].join('-')
  }

  const {overview} = props
  const [val, onChange] = useState(new Date())

  const handleChange = newDate => {
    onChange(newDate)
  }
  const formatMood = moodNum => {
    if (moodNum === 0) return '#D7F7F5'
    else if (moodNum === 25) return '#BFF3EF'
    else if (moodNum === 50) return '#A7EEEA'
    else if (moodNum === 75) return '#91EAE4'
    else if (moodNum === 100) return '#4CDDD3'
  }
  const handleTileContent = ({date, view}) => {
    if (view === 'month') {
      let currentDate = formatDate(date).toString()
      for (const day of overview) {
        if (day.date === currentDate)
          return (
            <FiberManualRecordIcon style={{color: formatMood(day.total)}} />
          )
      }
    }
  }
  return overview.length > 0 ? (
    <div className="MobileCalDiv">
      <Calendar
        onChange={handleChange}
        value={val}
        tileContent={handleTileContent}
      />
      <br />
      <MobileDayOverview
        formatDate={formatDate}
        activeDate={val}
        overview={overview}
      />
    </div>
  ) : (
    <div className="CalendarHeatmap">
      <img
        src="https://i.pinimg.com/originals/a4/f2/cb/a4f2cb80ff2ae2772e80bf30e9d78d4c.gif"
        width="200px"
        height="200px"
      />
    </div>
  )
}

export default MobileCalendar
