import React from 'react'
import CheckIcon from '@material-ui/icons/Check'
import ToggleButton from '@material-ui/lab/ToggleButton'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    background: 'rgba(255,255,255,.3)',
    borderRadius: 20,
    border: 0,
    color: 'white',
    height: 48,
    width: '3rem',
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
  },
  selected: {
    background: 'linear-gradient(45deg, #F7DDFC 20%, #91EAE4 90%)'
  },
  label: {
    textTransform: 'capitalize'
  }
})
export default function StandaloneToggleButton(props) {
  const {goalId} = props
  const classes = useStyles()
  let dft = false
  if (
    window.sessionStorage.getItem('goalId' + goalId) ||
    window.localStorage.getItem('goalId' + goalId)
  ) {
    dft =
      window.sessionStorage.getItem('goalId' + goalId) ||
      window.localStorage.getItem('goalId' + goalId)
    if (dft === 'false') dft = false
  }
  const [selected, setSelected] = React.useState(dft)

  const setStorage = () => {
    if (window.sessionStorage.getItem('firstName')) {
      window.sessionStorage.setItem('goalId' + goalId, !selected)
    } else if (window.localStorage.getItem('firstName')) {
      window.localStorage.setItem('goalId' + goalId, !selected)
    }
  }

  return (
    <ToggleButton
      value="check"
      classes={{root: classes.root, selected: classes.selected}}
      selected={selected}
      onChange={() => {
        setSelected(!selected)
        setStorage()
      }}
    >
      <CheckIcon />
    </ToggleButton>
  )
}
