import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import './App.css'
import { isSessionAlive, setLocalData } from './functions/LocalDataHandler'
import Welcome from './screens/Welcome'
import ThankYou from './screens/ThankYou'
import { getSession, newSession } from './services/sessionService'
import { STEP } from './config/enums'

export default () => {

  const [step, setStep]: [number, Dispatch<SetStateAction<number>>] = useState(0)
  let session

  useEffect(() => {
    const initSessions = async () => {
      const sessionId = isSessionAlive()
      if (typeof sessionId === 'number') {
        session = await getSession(sessionId)
      } else if (sessionId === false) {
        session = await newSession()
        if (session) {
          setLocalData(session)
        }
      }
    }

    initSessions()
    // eslint-disable-next-line
  }, [])

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
