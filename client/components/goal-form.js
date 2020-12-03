import React from 'react'
import {connect} from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {addGoal} from '../store'

const GoalInput = props => {
  const {handleSubmit} = props
  return (
    <Form className="AuthDiv" onSubmit={handleSubmit}>
      <Form.Group controlId="goals">
        <Form.Label className="labelText">
          What self care goals would you like to accomplish each day?
        </Form.Label>
        <Form.Text className="text-muted">
          You can edit goals later just choose three for now 😌
        </Form.Text>
        <br />
        <Form.Control name="goal1" placeholder="Morning stretches..." />
        <br />
        <Form.Control name="goal2" placeholder="Goal 2" />
        <br />
        <Form.Control name="goal3" placeholder="Goal 3" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  )
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      let userId
      if (window.localStorage.getItem('id'))
        userId = window.localStorage.getItem('id')
      else userId = window.sessionStorage.getItem('id')
      dispatch(addGoal(userId, evt.target.goal1.value))
      dispatch(addGoal(userId, evt.target.goal2.value))
      dispatch(addGoal(userId, evt.target.goal3.value))
    }
  }
}

export const GoalForm = connect(null, mapDispatch)(GoalInput)
