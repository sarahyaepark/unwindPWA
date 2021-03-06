import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import GitHubIcon from '@material-ui/icons/GitHub'
import Toolbar from '@material-ui/core/Toolbar'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: 'rgb(127,71,221)',
    color: 'white'
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  },
  menu: {
    flexGrow: 3
  }
}))

export function MobileNav(props) {
  const {isLoggedIn} = props
  const classes = useStyles()
  return (
    <nav>
      <div className={classes.root}>
        <AppBar position="static" className={classes.root}>
          <Toolbar className={classes.root}>
            <div className={classes.title}>
              <img src="https://i.imgur.com/Pca5zcg.png" width="150px" />
            </div>
            <Button
              color="inherit"
              className="NavButtons"
              onClick={e => {
                e.preventDefault()
                window.open(
                  'https://github.com/sarahyaepark/unwindPWA',
                  '_blank'
                )
              }}
            >
              <GitHubIcon style={{color: 'white'}} />
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    </nav>
  )
}

export default MobileNav
