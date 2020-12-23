import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import TopNav from './topNav'
import MobileTop from './mobileTop'

const Navbar = ({handleClick, isLoggedIn}) => {
  const [mql, setmql] = useState(true)
  useEffect(
    () => {
      setmql(window.matchMedia('(max-width: 700px)').matches)
    },
    [window.matchMedia('(max-width: 700px)')]
  )
  return mql ? (
    <MobileTop isLoggedIn={isLoggedIn} />
  ) : (
    <div>
      <nav>
        <TopNav isLoggedIn={isLoggedIn} />
      </nav>
      <hr />
    </div>
  )
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
