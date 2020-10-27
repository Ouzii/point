import React, { useEffect, useState } from 'react'
import './App.css'
import LocalDataHandler, { isUserSessionAlive, setLocalData } from './functions/LocalDataHandler'
import Welcome from './screens/Welcome'
import ThankYou from './screens/ThankYou'
import { getUser, newUser } from './services/userService'
import STEP from './config/enums'
import { User } from './util/types'
import Task from './components/Task'
import Quiz from './components/Quiz'
import ComparisonTask from './components/ComparisonTask'
import tasks from './util/tasks.json'

export default () => {

  const [set, setSet] = useState<number>(STEP.SET.WELCOME)
  const [phase, setPhase] = useState<number>(STEP.PHASE.PHASE1)
  const [task, setTask] = useState<number>(STEP.TASK.TASK1)
  const [coords, setCoords] = useState<number>(STEP.COORDS.COORDS1)

  const [user, setUser] = useState<User | null>(null)
  const completedTasks: number[] = []
  const parsedTasks = JSON.parse(JSON.stringify(tasks))
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

  }, [set])

  useEffect(() => {

  }, [phase])

  useEffect(() => {

  }, [task])

  useEffect(() => {

  }, [coords])

  // useEffect(() => {
  //   console.log(step)

  //   if (!step) return
  //   if (step < STEP.SET.SET1 && step > STEP.SET.SET4) return
  //   // save session to DB and local
  //   const currentLocalData = LocalDataHandler.getLocalData()
  //   if (!currentLocalData) return
  //   const newTask = {
  //     id: parsedTasks[phase][taskNo].id,
  //     iod: parsedTasks[phase][taskNo].iod,
  //     compare: parsedTasks[phase][taskNo].compare,
  //     time: LocalDataHandler.getItem('time'),
  //     userTime: LocalDataHandler.getItem('guessedTime'),
  //     compareTime: LocalDataHandler.getItem('compareTime'),
  //     compareIod: parsedTasks[phase][taskNo].compareIod,
  //     userValue: LocalDataHandler.getItem('compareValue'),
  //     clicks: LocalDataHandler.getItem('clicks')
  //   }

  //   const newTasks = currentLocalData.tasks ? [...currentLocalData.tasks, newTask] : [newTask]
  //   const newLocalData = {
  //     ...currentLocalData,
  //     tasks: newTasks,
  //     step: step
  //   }

  //   LocalDataHandler.setLocalData(newLocalData)

  //   // TODO: Send to backend userId & newTask
  //   // { userId: user.id, task: newTask }
  //   completedTasks.push(Math.max(step - 3, 0))
  //   if (taskNo === 4) {
  //     setPhase(phase + 1)
  //     setTaskNo(1)
  //   } else {
  //     setTaskNo(taskNo + 1)
  //   }

  //   // eslint-disable-next-line
  // }, [step])


  const getRandomFromCompleted = () => {
    const index = Math.floor(Math.random() * completedTasks.length)
    return completedTasks.splice(index, 1)[0]
  }

  const getNextStep = () => {
    if (set >= STEP.SET.SET4) {
      setSet(STEP.SET.THANK_YOU)
      setPhase(STEP.PHASE.PHASE1)
      setTask(STEP.TASK.TASK1)
      setCoords(STEP.COORDS.COORDS1)
    } else if (phase >= STEP.PHASE.PHASE3) {
      setSet(set + 1)
      setPhase(STEP.PHASE.PHASE1)
      setTask(STEP.TASK.TASK1)
      setCoords(STEP.COORDS.COORDS1)
    } else if (task >= STEP.TASK.TASK4) {
      setPhase(phase + 1)
      setTask(STEP.TASK.TASK1)
      setCoords(STEP.COORDS.COORDS1)
    } else {
      setTask(task + 1)
      setCoords(STEP.COORDS.COORDS1)
    }
  }

  const renderContent = () => {
    switch (set) {
      case STEP.SET.WELCOME:
        return <Welcome nextStep={() => setSet(STEP.SET.QUIZ)} />
      case STEP.SET.QUIZ:
        return <Quiz nextStep={() => setSet(STEP.SET.SET1)} />
      case STEP.SET.SET1:
        return <Task coords={parsedTasks[phase][task].coords} nextStep={() => getNextStep()} />
        switch (phase) {
          case STEP.PHASE.PHASE1:
            switch (task) {
              case STEP.TASK.TASK1:
                switch (coords) {
                  case STEP.COORDS.COORDS1:
                    return
                  case STEP.COORDS.COORDS2:
                    return
                  case STEP.COORDS.COORDS3:
                    return
                  case STEP.COORDS.COORDS4:
                    return
                  case STEP.COORDS.COORDS5:
                    return
                  case STEP.COORDS.COORDS6:
                    return
                  case STEP.COORDS.COORDS7:
                    return
                  case STEP.COORDS.COORDS8:
                    return
                  default:
                    break
                }
              case STEP.TASK.TASK2:
                return
              case STEP.TASK.TASK3:
                return
              case STEP.TASK.TASK4:
                return
              default:
                break
            }
          case STEP.PHASE.PHASE2:
            switch (task) {
              case STEP.TASK.TASK1:
                return
              case STEP.TASK.TASK2:
                return
              case STEP.TASK.TASK3:
                return
              case STEP.TASK.TASK4:
                return
              default:
                break
            }
          case STEP.PHASE.PHASE3:
            switch (task) {
              case STEP.TASK.TASK1:
                return
              case STEP.TASK.TASK2:
                return
              case STEP.TASK.TASK3:
                return
              case STEP.TASK.TASK4:
                return
              default:
                break
            }
          default:
            break
        }
      case STEP.SET.SET2:
        switch (phase) {
          case STEP.PHASE.PHASE1:
            return
          case STEP.PHASE.PHASE2:
            return
          case STEP.PHASE.PHASE3:
            return
          default:
            break
        }
      case STEP.SET.SET3:
        switch (phase) {
          case STEP.PHASE.PHASE1:
            return
          case STEP.PHASE.PHASE2:
            return
          case STEP.PHASE.PHASE3:
            return
          default:
            break
        }
      case STEP.SET.SET4:
        switch (phase) {
          case STEP.PHASE.PHASE1:
            return
          case STEP.PHASE.PHASE2:
            return
          case STEP.PHASE.PHASE3:
            return
          default:
            break
        }
      case STEP.SET.THANK_YOU:
        return <ThankYou />
      // case STEP.WELCOME:
      //   return <Welcome nextStep={() => setStep(step + 1)} />
      // case STEP.QUIZ:
      //   return <Quiz nextStep={() => setStep(step + 1)} />
      // case STEP.PHASE1:
      //   return <Task phaseNumber={1} taskNumber={taskNo} nextStep={() => setStep(step + 1)} />
      // case STEP.PHASE2:
      //   return <Task phaseNumber={2} taskNumber={taskNo} nextStep={() => setStep(step + 1)} />
      // case STEP.PHASE3:
      //   return <Task phaseNumber={3} taskNumber={taskNo} nextStep={() => setStep(step + 1)} />
      // case STEP.PHASE4:
      //   return <ComparisonTask phaseNumber={4} taskNumber={taskNo} nextStep={() => setStep(step + 1)} />
      // case STEP.PHASE5:
      //   return <ComparisonTask phaseNumber={5} taskNumber={taskNo} nextStep={() => setStep(step + 1)} />
      // case STEP.PHASE6:
      //   return <ComparisonTask phaseNumber={6} taskNumber={taskNo} nextStep={() => setStep(step + 1)} />
      // case STEP.THANK_YOU:
      //   return <ThankYou />
      default:
        break
    }
  }

  return (
    <div className="App">
      {renderContent()}
    </div>
  )
}
