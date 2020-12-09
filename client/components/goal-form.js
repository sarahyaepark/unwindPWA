import React from 'react'
import {connect} from 'react-redux'
import Form from 'react-bootstrap/Form'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Button from 'react-bootstrap/Button'
import {addGoal, auth} from '../store'

const GoalInput = props => {
  const {handleSubmit, checked, formName, email, password, firstName} = props
  const renderTooltip = props => (
    <Tooltip id="button-tooltip" {...props}>
      The self care goals should be manageable and achievable each day. It is
      not a to-do list. ✨
    </Tooltip>
  )
  return (
    <div className="AuthDiv">
      <Form
        className="FormDiv"
        onSubmit={e =>
          handleSubmit(e, checked, formName, email, password, firstName)
        }
      >
        <Form.Group controlId="goals">
          <Form.Label className="labelText">
            What self care goals would you like to accomplish each day?
          </Form.Label>
          <div className="Oneline">
            <Form.Text className="text-muted">
              You can edit goals later just choose three for now 😌
            </Form.Text>
            <OverlayTrigger
              placement="right"
              delay={{show: 150, hide: 400}}
              overlay={renderTooltip}
            >
              <Button variant="outline-info" size="sm">
                Why just 3?
              </Button>
            </OverlayTrigger>
          </div>
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
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt, checked, formName, email, password, firstName) {
      evt.preventDefault()
      let userId
      let goal1 = evt.target.goal1.value
      let goal2 = evt.target.goal2.value
      let goal3 = evt.target.goal3.value
      if (formName && email && password) {
        if (formName === 'login') {
          dispatch(auth(email, password, formName, checked)).then(result => {
            if (window.localStorage.getItem('id'))
              userId = window.localStorage.getItem('id')
            else userId = window.sessionStorage.getItem('id')
            dispatch(addGoal(userId, goal1))
            dispatch(addGoal(userId, goal2))
            dispatch(addGoal(userId, goal3))
          })
        } else {
          dispatch(auth(email, password, formName, checked, firstName)).then(
            result => {
              if (window.localStorage.getItem('id'))
                userId = window.localStorage.getItem('id')
              else userId = window.sessionStorage.getItem('id')
              dispatch(addGoal(userId, goal1))
              dispatch(addGoal(userId, goal2))
              dispatch(addGoal(userId, goal3))
            }
          )
        }
      }
    }
  }
}

export const GoalForm = connect(null, mapDispatch)(GoalInput)
