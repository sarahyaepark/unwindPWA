import React, {useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  const [signUp, startSignUp] = useState(false)
  console.log(error)
  return (
    <div className="AuthDiv">
      <h1>{displayName}</h1>
      <Form className="AuthForm" onSubmit={handleSubmit} name={name}>
        {displayName === 'Sign Up' ? (
          <Form.Group controlId="formBasicName">
            <Form.Label>First Name</Form.Label>
            <Form.Control name="firstName" placeholder="Preferred First Name" />
          </Form.Group>
        ) : null}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
          />
        </Form.Group>
        {!signUp ? (
          displayName === 'Login' ? (
            <Button variant="primary" type="submit">
              {displayName}
            </Button>
          ) : (
            <Button variant="primary" onClick={() => startSignUp(true)}>
              Get Started!
            </Button>
          )
        ) : null}
        {signUp ? (
          <div>
            <Form.Group controlId="goals">
              <Form.Label>
                What small goals would you like to accomplish each day?
              </Form.Label>
              <Form.Control name="goal1" placeholder="Goal 1" />
              <br />
              <Form.Control name="goal2" placeholder="Goal 2" />
              <br />
              <Form.Control name="goal3" placeholder="Goal 3" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </div>
        ) : null}
        <br />
        <br />
      </Form>
      {signUp ? null : <a href="/auth/google">{displayName} with Google</a>}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      console.log(evt.target)
      const email = evt.target.email.value
      const password = evt.target.password.value
      if (formName === 'login') {
        console.log(email, password, formName)
        dispatch(auth(email, password, formName))
      } else {
        const firstName = evt.target.firstName.value
        const goals = [
          evt.target.goal1.value,
          evt.target.goal2.value,
          evt.target.goal3.value
        ]
        console.log(email, password, formName, firstName, goals)
        dispatch(auth(email, password, formName, firstName, goals))
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
