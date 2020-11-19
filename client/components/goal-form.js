import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const GoalForm = () => {
  return (
    <Form className="AuthDiv">
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
    </Form>
  )
}
export default GoalForm

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
