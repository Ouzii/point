import React, { useEffect, useState } from 'react'
import './App.css'
import { isUserSessionAlive, setLocalData } from './functions/LocalDataHandler'
import Welcome from './screens/Welcome'
import ThankYou from './screens/ThankYou'
import { getUser, newUser } from './services/userService'
import { STEP } from './config/enums'
import { User } from './config/types'

export default () => {

  const [step, setStep] = useState<number>(0)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const initUser = async () => {
      const userId = isUserSessionAlive()
      if (typeof userId === 'number') {
        setUser(await getUser(userId))
      } else if (userId === false) {
        setUser(await newUser())
        if (user) {
          setLocalData(user)
        }
      }
    }

    initUser()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!step) return
    // save session to DB and local
  }, [step])

  const renderContent = () => {
    switch (step) {
      case STEP.WELCOME:
        return <Welcome />
      case STEP.THANK_YOU:
        return <ThankYou />

      default:
        break;
    }
  }

  return (
    <div className="App">
      {renderContent()}
    </div>
  )
}
