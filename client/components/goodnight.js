import React, {useState, useEffect} from 'react'
import axios from 'axios'
const CancelToken = axios.CancelToken

// set a goodnight state to true
// countdown till next day (pass in the current date)
export default function Goodnight() {
  const [inspoText, setInspoText] = useState(false)
  const [inspoAuthor, setInspoAuthor] = useState(false)

  useEffect(() => {
    let unmounted = false
    let source = CancelToken.source()
    axios
      .get(`https://type.fit/api/quotes`, {
        cancelToken: source.token
      })
      .then(function(response) {
        if (!unmounted) {
          let randomQuoteIdx = Math.floor(Math.random() * 1000)
          while (response.data[randomQuoteIdx].author === 'Donald Trump') {
            randomQuoteIdx = Math.floor(Math.random() * 1000)
          }
          setInspoText(response.data[randomQuoteIdx].text)
          setInspoAuthor(response.data[randomQuoteIdx].author)
        }
      })
      .catch(function(thrown) {
        if (!unmounted) {
          if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message)
          } else {
            // handle error
          }
        }
      })

    return () => {
      // clean up
      unmounted = true
      source.cancel('Operation canceled by the user.')
    }
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
