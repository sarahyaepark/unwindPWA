import React from 'react'
import {connect} from 'react-redux'
import {makeStyles, createMuiTheme} from '@material-ui/core/styles'
import {logout} from '../store'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined'
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

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
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

export function ButtonAppBar(props) {
  const {isLoggedIn} = props
  const classes = useStyles()

  return isLoggedIn ? (
    <div className={classes.root}>
      <AppBar position="static" className={classes.root}>
        <Toolbar className={classes.root}>
          <Typography variant="h6" className={classes.title}>
            Unwind
          </Typography>
          <Link to="/home">
            <Button color="inherit" className="NavButtons">
              <CreateOutlinedIcon style={{color: 'white'}} />
            </Button>
          </Link>
          <Link to="/calendarDisplay">
            <Button color="inherit" className="NavButtons">
              <CalendarTodayOutlinedIcon style={{color: 'white'}} />
            </Button>
          </Link>
          <Link to="/account">
            <Button color="inherit" className="NavButtons">
              <AccountCircleOutlinedIcon style={{color: 'white'}} />
            </Button>
          </Link>
          <Button color="inherit" className="NavButtons" onClick={props.logout}>
            <ExitToAppIcon style={{color: 'white'}} />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  ) : (
    <div className={classes.root}>
      <AppBar position="static" className={classes.root}>
        <Toolbar className={classes.root}>
          <Typography variant="h6" className={classes.title}>
            Unwind
          </Typography>
          <Link to="/login">
            <Button className="NavButtons">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button className="NavButtons">Sign Up</Button>
          </Link>
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
