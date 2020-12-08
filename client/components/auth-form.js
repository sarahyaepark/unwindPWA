import React, {useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, findUser} from '../store'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import history from '../history'
import {GoalForm} from './goal-form'

const AuthForm = props => {
  const {name, displayName} = props
  const [checked, setChecked] = useState(false)
  const [goalForm, showGoalForm] = useState(false)
  const [formName, setFormName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')
  const handleAuthSubmit = (formMethod, formEmail, formPass) => {
    if (formMethod && formEmail && formPass) {
      if (formMethod === 'login') {
        props.auth(formEmail, formPass, formMethod, checked).then(result => {
          if (result === 'error') setError('Invalid Email or Password')
        })
      }
    }
  }
  const signUpSubmit = evt => {
    evt.preventDefault()
    setFormName(evt.target.name)
    setEmail(evt.target.email.value)
    let tempPass = evt.target.password.value
    if (evt.target.firstName) {
      let tempFirst = evt.target.firstName.value
      // check for email
      findUser(evt.target.email.value).then(result => {
        if (result === 'User already exists') {
          setEmailError(result)
        } else {
          setEmailError('')
          if (tempPass.length < 8) {
            setError('Password must be at least 8 characters')
          } else {
            setError('')
            setPassword(tempPass)
            setFirstName(tempFirst)
            showGoalForm(true)
          }
        }
      })
    } else {
      handleAuthSubmit(
        evt.target.name,
        evt.target.email.value,
        evt.target.password.value
      )
    }
  }
  return !goalForm ? (
    <div className="AuthDiv">
      <h1>{displayName}</h1>
      <Form className="AuthForm" onSubmit={signUpSubmit} name={name}>
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
          <Form.Control
            name="email"
            placeholder="Enter email"
            required
            isInvalid={!!emailError}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          <Form.Control.Feedback type="invalid" className="invalid-feedback">
            {emailError}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            required
            isInvalid={!!error}
          />
          <Form.Control.Feedback type="invalid" className="invalid-feedback">
            {error}
          </Form.Control.Feedback>
        </Form.Group>
        {displayName === 'Login' ? (
          <Button variant="primary" type="submit">
            Login
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
      {/* <a href="/auth/google">{displayName} with Google</a> */}
    </div>
  ) : (
    <GoalForm
      checked={checked}
      formName={formName}
      email={email}
      password={password}
      firstName={firstName}
    />
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
    auth: (email, password, login, checked) =>
      dispatch(auth(email, password, login, checked))
    // findUser: (email) => dispatch(findUser(email)),
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
  // handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
