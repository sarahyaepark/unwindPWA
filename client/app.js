import React, {useEffect, useState} from 'react'

import {
  Navbar,
  BottomNav,
  MobileLoading,
  MobileTop,
  Welcome
} from './components'
import Routes from './routes'

const App = () => {
  const [mql, setmql] = useState(true)
  useEffect(
    () => {
      setmql(window.matchMedia('(max-width: 700px)').matches)
    },
    [window.matchMedia('(max-width: 700px)')]
  )

  return mql ? (
    <div className="App">
      <Navbar />
      <Welcome />
      <Routes />
      <BottomNav />
    </div>
  ) : (
    <div className="App">
      <Navbar />
      <Welcome />
      <Routes />
    </div>
  )
}

export default App
