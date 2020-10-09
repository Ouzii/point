import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import './App.css'
import { isSessionAlive, setLocalData } from './functions/LocalDataHandler'
import Welcome from './screens/Welcome'
import ThankYou from './screens/ThankYou'
import { getSession, newSession } from './services/sessionService'
import { STEP } from './config/enums'
import { Session } from './config/types'

export default () => {

  const [step, setStep] = useState<number>(0)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const initSessions = async () => {
      const sessionId = isSessionAlive()
      if (typeof sessionId === 'number') {
        setSession(await getSession(sessionId))
      } else if (sessionId === false) {
        setSession(await newSession())
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
