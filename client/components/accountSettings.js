import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {me, auth, updateUserInfo, logout} from '../store'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/**
 * COMPONENT
 */
export const AccountSettings = props => {
  const [newPass, setPass] = useState('')
  const [error, setError] = useState('')
  const [infoError, setInfoError] = useState('')
  const [formRef, setFormRef] = useState('')
  useEffect(() => {
    props.me()
  }, [])
  const handleChange = evt => {
    evt.preventDefault()
    let confirm = evt.target.value
    if (confirm.length !== newPass.length) setError('Passwords do not match')
    else {
      for (let i = 0; i < confirm.length; i++) {
        if (confirm[i] !== newPass[i]) setError('Passwords do not match')
      }
      setError('')
    }
  }
  const notify = () =>
    toast.success('🦄 Updated Info!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })

  const handleSubmit = evt => {
    evt.preventDefault()
    let firstName = props.user.firstName
    if (evt.target.firstName.value) firstName = evt.target.firstName.value
    if (
      evt.target.oldPassword.value &&
      evt.target.newPassword.value &&
      evt.target.confirmPassword.value
    ) {
      if (error === '') {
        if (evt.target.newPassword.value !== evt.target.oldPassword.value) {
          props
            .updateUserInfo(
              props.user.email,
              firstName,
              evt.target.newPassword.value,
              evt.target.oldPassword.value
            )
            .then(result => {
              if (result === 'error') setInfoError('Invalid Password')
              else {
                setInfoError('')
                notify()
                formRef.reset()
              }
            })
        } else {
          setInfoError('Current Password and New Password must be different!')
        }
      } else {
        props.me()
        setInfoError('Invalid Information')
      }
    } else {
      props.updateUserInfo(props.user.email, firstName).then(result => {
        notify()
        formRef.reset()
      })
    }
  }
  return props.user ? (
    <div className="AccSettingsDiv">
      <div className="AccSettings">
        <h3>Edit Account Information</h3>
        <br />
        <Form
          className="AuthForm"
          ref={el => setFormRef(el)}
          onSubmit={evt => handleSubmit(evt)}
          name={name}
        >
          <h5>Update Name</h5>
          <Form.Group controlId="formBasicName">
            <Form.Label>First Name</Form.Label>
            <Form.Control name="firstName" placeholder={props.user.firstName} />
          </Form.Group>
          <hr />
          <h5>Update Password</h5>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              name="oldPassword"
              placeholder="Current Password"
              isInvalid={!!infoError}
            />
            <Form.Control.Feedback type="invalid" className="invalid-feedback">
              {infoError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicNewPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              placeholder="New Password"
              onChange={e => setPass(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              onChange={evt => handleChange(evt)}
              isInvalid={!!error}
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid" className="invalid-feedback">
            {error}
          </Form.Control.Feedback>
          <Button variant="primary" type="submit">
            Update Information
          </Button>
          <ToastContainer />
        </Form>
      </div>
      <br />
      <Button variant="danger" onClick={props.logout}>
        Log Out
      </Button>
      <br />
      <br />
      <br />
    </div>
  ) : (
    <img src="https://i.pinimg.com/originals/a4/f2/cb/a4f2cb80ff2ae2772e80bf30e9d78d4c.gif" />
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    me: () => dispatch(me()),
    logout: () => dispatch(logout()),
    auth: (email, password, login) => dispatch(auth(email, password, login)),
    updateUserInfo: (id, firstName, password, oldPassword) =>
      dispatch(updateUserInfo(id, firstName, password, oldPassword))
  }
}

export default connect(mapState, mapDispatch)(AccountSettings)
