import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import {blue, cyan} from '@material-ui/core/colors'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'

const useStyles = makeStyles({
  // root: {
  //   width: 500
  // },
  bottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    background: 'rgb(127,71,221)',
    color: 'green'
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
            setValue(newValue)
          }}
          showLabels
          className={classes.bottom}
          // selected={{color:cyan[100]}}
        >
          <BottomNavigationAction
            component={Link}
            to="/home"
            label="DailyEntry"
            icon={<CreateOutlinedIcon />}
            value="DailyEntry"
            style={{color: blue[200]}}
            // classes={classes.buttons}
            // selected={{color:cyan[100]}}
          />
          <BottomNavigationAction
            component={Link}
            to="/calendarDisplay"
            label="Calendar"
            icon={<CalendarTodayOutlinedIcon />}
            value="Calendar"
            // classes={classes.buttons}
            style={{color: blue[200]}}
          />
          <BottomNavigationAction
            component={Link}
            to="/account"
            label="Account"
            icon={<AccountCircleOutlinedIcon />}
            value="Account"
            // classes={classes.buttons}
            style={{color: blue[200]}}
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
