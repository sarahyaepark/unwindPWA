import React, {useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import history from '../history'

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  const [checked, setChecked] = useState(false)

  return (
    <div className="AuthDiv">
      <h1>{displayName}</h1>
      <Form
        className="AuthForm"
        onSubmit={evt => handleSubmit(evt, checked)}
        name={name}
      >
        {displayName === 'Sign Up' ? (
          <Form.Group controlId="formBasicName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              name="firstName"
              placeholder="Preferred First Name"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a first name.
            </Form.Control.Feedback>
          </Form.Group>
        ) : null}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" placeholder="Enter email" required />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
        </Form.Group>
        {displayName === 'Login' ? (
          <Button variant="primary" type="submit">
            {displayName}
          </Button>
        ) : (
          <Button variant="primary" type="submit">
            Get Started!
          </Button>
        )}
        <br />
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            checked={checked}
            onChange={e => setChecked(e.currentTarget.checked)}
            label="Remember me"
          />
        </Form.Group>
      </Form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

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
    handleSubmit(evt, checked) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      if (formName && email && password) {
        if (formName === 'login') {
          dispatch(auth(email, password, formName, checked))
        } else {
          const firstName = evt.target.firstName.value
          dispatch(auth(email, password, formName, checked, firstName))
          history.push('/setGoals')
        }
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
