import React from 'react'
import {connect} from 'react-redux'
import {makeStyles, createMuiTheme} from '@material-ui/core/styles'
import {logout} from '../store'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import GitHubIcon from '@material-ui/icons/GitHub'

// const navTheme = createMuiTheme({
//   navTheme: {

//   }
// })

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: 'rgb(127,71,221)',
    color: 'white'
  },
  title: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1),
    color: 'white'
  }
}))

export function ButtonAppBar(props) {
  const {isLoggedIn} = props
  const classes = useStyles()

  return isLoggedIn ? (
    <div className={classes.root}>
      <AppBar position="static" className={classes.root}>
        <Toolbar className={classes.root}>
          <div className={classes.title}>
            <img src="https://i.imgur.com/Pca5zcg.png" width="200px" />
          </div>
          <Link to="/home">
            <Button
              className={classes.button}
              startIcon={<CreateOutlinedIcon style={{color: 'white'}} />}
            >
              Daily Entry
            </Button>
          </Link>
          <Link to="/calendarDisplay">
            <Button
              className={classes.button}
              startIcon={<CalendarTodayOutlinedIcon style={{color: 'white'}} />}
            >
              Check-Ins
            </Button>
          </Link>
          <Link to="/account">
            <Button
              className={classes.button}
              startIcon={<AccountCircleOutlinedIcon style={{color: 'white'}} />}
            >
              Account
            </Button>
          </Link>
          <Button
            className={classes.button}
            onClick={props.logout}
            startIcon={<ExitToAppIcon style={{color: 'white'}} />}
          >
            Log Out
          </Button>
          <Button
            className={classes.button}
            onClick={e => {
              e.preventDefault()
              window.open('https://github.com/sarahyaepark/unwindPWA', '_blank')
            }}
            startIcon={<GitHubIcon style={{color: 'white'}} />}
          >
            GitHub
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  ) : (
    <div className={classes.root}>
      <AppBar position="static" className={classes.root}>
        <Toolbar className={classes.root}>
          <div className={classes.title}>
            <img src="https://i.imgur.com/Pca5zcg.png" width="200px" />
          </div>
          <Link to="/login">
            <Button className="NavButtons">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button className="NavButtons">Sign Up</Button>
          </Link>
          <Button
            color="inherit"
            className="NavButtons"
            onClick={e => {
              e.preventDefault()
              window.open('https://github.com/sarahyaepark/unwindPWA', '_blank')
            }}
          >
            <GitHubIcon style={{color: 'white'}} />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
const mapDispatch = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatch)(ButtonAppBar)
