import React, { useEffect } from 'react'
import './App.css'

export default () => {

  useEffect(() => {
    const savedUser: string | null = window.localStorage.getItem('user')
    const user: Object | null = savedUser ? JSON.parse(savedUser) : null
    if (!user) {
      // save new user to db+localStorage
    } else {
      // reset button ?
    }
  }, [])


  return (
    <div className="App">

    </div>
  )
}
