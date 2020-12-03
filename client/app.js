import React from 'react'

import {Navbar, BottomNav} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <BottomNav />
    </div>
  )
}

export default App
