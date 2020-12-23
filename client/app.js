import React, {useEffect, useState} from 'react'

import {
  Navbar,
  BottomNav,
  MobileLoading,
  MobileNav,
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
      <MobileNav />
      <Routes />
      {/* <MobileLoading /> */}
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
