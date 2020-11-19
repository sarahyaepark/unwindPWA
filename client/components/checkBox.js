import React from 'react'

const CheckBox = props => {
  //   const [checked, setChecked] = useState(false)
  const {completed} = props
  // set local storage first
  console.log('*******************', completed)
  return (
    <div>
      {!completed ? (
        <img className="checkBox" src="https://i.imgur.com/YXbSdoH.png" />
      ) : (
        <img className="checkBox" src="https://i.imgur.com/Giad7aJ.png" />
      )}
    </div>
  )
}

export default CheckBox
