import React, {useState, useEffect} from 'react'
import axios from 'axios'

// set a goodnight state to true
// countdown till next day (pass in the current date)
export default function Goodnight() {
  const [inspoText, setInspoText] = useState(false)
  const [inspoAuthor, setInspoAuthor] = useState(false)

  useEffect(() => {
    axios.get(`https://type.fit/api/quotes`).then(function(response) {
      let randomQuoteIdx = Math.floor(Math.random() * 1000)
      console.log(response.data[randomQuoteIdx].text)
      while (response.data[randomQuoteIdx].author === 'Donald Trump') {
        randomQuoteIdx = Math.floor(Math.random() * 1000)
      }
      setInspoText(response.data[randomQuoteIdx].text)
      setInspoAuthor(response.data[randomQuoteIdx].author)
    })
  }, [])

  return (
    <div className="goodnightDiv">
      {inspoText ? (
        <div className="goodnightQuote">
          <h4>Tonight's quote:</h4>
          <img
            src="https://static.thenounproject.com/png/1294897-200.png"
            width="40px"
            height="40px"
          />
          <h3>{inspoText}</h3>
          <img
            src="https://static.thenounproject.com/png/1294897-200.png"
            width="40px"
            height="40px"
            className="flipImg"
          />
          <h3>- {inspoAuthor}</h3>
        </div>
      ) : null}
      <br />
      <h3>You did great by checking in with yourself today!</h3>
      <h3>Rest up and remember that tomorrow's a new day 💤⭐</h3>
    </div>
  )
}
