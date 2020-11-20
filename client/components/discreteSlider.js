import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'

const useStyles = makeStyles({
  root: {
    width: 500
  },
  markLabel: {
    fontSize: '2rem'
  }
})

const marks = [
  {
    value: 0,
    label: '😔'
  },
  {
    value: 25,
    label: '😕'
  },
  {
    value: 50,
    label: '😐'
  },
  {
    value: 75,
    label: '🙂'
  },
  {
    value: 100,
    label: '😊'
  }
]
const valuetext = value => {
  // do something
}
export default function DiscreteSlider() {
  const classes = useStyles()

  return (
    <div>
      <Slider
        classes={{root: classes.root, markLabel: classes.markLabel}}
        defaultValue={50}
        getAriaValueText={valuetext}
        aria-valuetext="hello"
        step={25}
        marks={marks}
        min={0}
        max={100}
      />
    </div>
  )
}
