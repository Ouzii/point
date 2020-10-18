import React, { useEffect, useState } from 'react'
import './App.css'
import { isUserSessionAlive, setLocalData } from './functions/LocalDataHandler'
import Welcome from './screens/Welcome'
import ThankYou from './screens/ThankYou'
import { getUser, newUser } from './services/userService'
import { STEP } from './config/enums'
import { User } from './config/types'
import Task from './components/Task'
import Quiz from './components/Quiz'
import ComparisonTask from './components/ComparisonTask'

export default () => {

  const [step, setStep] = useState<number>(0)
  const [user, setUser] = useState<User | null>(null)
  const completedTasks: number[] = []
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
    completedTasks.push(step - 2)

  }, [step])

  const getRandomFromCompleted = () => {
    const index = Math.floor(Math.random() * completedTasks.length)
    return completedTasks.splice(index, 1)[0]
  }

  const renderContent = () => {
    switch (true) {
      case step === STEP.WELCOME:
        return <Welcome nextStep={() => setStep(step + 1)} />
      case step === STEP.QUIZ:
        return <Quiz nextStep={() => setStep(step + 1)} />
      case step >= STEP.TASK1 && step <= STEP.TASK4:
        return <Task taskNumber={step - 2} nextStep={() => setStep(step + 1)} />
      case step >= STEP.TASK5 && step <= STEP.TASK8:
        return <Task taskNumber={getRandomFromCompleted()} nextStep={() => setStep(step + 1)} />
      case step >= STEP.TASK9 && step <= STEP.TASK12:
        return <ComparisonTask taskNumber={step - 2} nextStep={() => setStep(step + 1)} />
      case step >= STEP.TASK13 && step <= STEP.TASK16:
        return <ComparisonTask taskNumber={step - 2} nextStep={() => setStep(step + 1)} />
      case step === STEP.THANK_YOU:
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
