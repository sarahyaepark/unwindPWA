import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'

const useStyles = makeStyles({
  root: {
    width: 500
  },
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0
  }
})

export function SimpleBottomNavigation(props) {
  const classes = useStyles()
  const [value, setValue] = React.useState('DailyEntry')
  const {isLoggedIn} = props
  return (
    <div>
      {isLoggedIn ? (
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            console.log(newValue)
            setValue(newValue)
          }}
          showLabels
          className={classes.stickToBottom}
        >
          <BottomNavigationAction
            component={Link}
            to="/home"
            label="DailyEntry"
            icon={<CreateOutlinedIcon />}
            value="DailyEntry"
          />
          <BottomNavigationAction
            component={Link}
            to="/calendarDisplay"
            label="Calendar"
            icon={<CalendarTodayOutlinedIcon />}
            value="Calendar"
          />
          <BottomNavigationAction
            component={Link}
            to="/account"
            label="Account"
            icon={<AccountCircleOutlinedIcon />}
            value="Account"
          />
        </BottomNavigation>
      ) : null}
    </div>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}
export default connect(mapState)(SimpleBottomNavigation)
