import React, { useEffect, useState } from 'react'
import './App.css'
import LocalDataHandler, { setLocalData, getLocalData, getItem } from './functions/LocalDataHandler'
import Welcome from './screens/Welcome'
import ThankYou from './screens/ThankYou'
import { newUser } from './services/userService'
import STEP, { INFO_TYPE } from './config/enums'
import Task from './components/Task'
import Quiz from './components/Quiz'
import ComparisonTask from './components/ComparisonTask'
import tasks from './util/tasks.json'
import Info from './components/Info'
import getOrder from './util/order'

export default () => {

  const [set, setSet] = useState<number>(STEP.SET.WELCOME)
  const [phase, setPhase] = useState<number>(STEP.PHASE.PHASE1)
  const [task, setTask] = useState<number>(STEP.TASK.TASK1)
  const [order, setOrder] = useState<Array<number>>([])

  const set2Tasks: Array<number> = [STEP.PHASE.PHASE1, STEP.PHASE.PHASE2, STEP.PHASE.PHASE3]
  const set4Tasks: Array<number> = [STEP.PHASE.PHASE4, STEP.PHASE.PHASE5, STEP.PHASE.PHASE6]
  const parsedTasks = JSON.parse(JSON.stringify(tasks))

  useEffect(() => {
    const initUser = async () => {
      // const userId = isUserSessionAlive()
      // console.log(userId)

      // if (typeof userId === 'number') {
      //   setLocalData(await getUser(userId))
      // } else {
      const user = await newUser()
      if (user) {
        setOrder(getOrder(user.id))
        setLocalData({ ...user, tasks: [], sets: [{ phase1: { tasks: [] }, phase2: { tasks: [] }, phase3: { tasks: [] } }, { phase1: { tasks: [] }, phase2: { tasks: [] }, phase3: { tasks: [] } }, { phase4: { tasks: [] }, phase5: { tasks: [] }, phase6: { tasks: [] } }, { phase4: { tasks: [] }, phase5: { tasks: [] }, phase6: { tasks: [] } }] })
      }
      // }
    }

    initUser()
    // eslint-disable-next-line
  }, [])


  const getPhaseString = (phaseNumber: number) => {
    return 'phase' + phaseNumber
  }

  useEffect(() => {
    if (set < STEP.SET.SET1 || set > STEP.SET.SET4) return

    if (set >= STEP.SET.SET1 && set <= STEP.SET.SET2) {
      setPhase(STEP.PHASE.PHASE1)
      setTask(STEP.TASK.TASK1)
    }
    if (set >= STEP.SET.SET3 && set <= STEP.SET.SET4) {
      setPhase(STEP.PHASE.PHASE4)
      setTask(STEP.TASK.TASK1)
    }
    // eslint-disable-next-line
  }, [set])

  useEffect(() => {
    if (set < STEP.SET.SET1 || set > STEP.SET.SET4) return
    setTask(STEP.TASK.TASK1)
    // eslint-disable-next-line
  }, [phase])

  useEffect(() => {

    if (set < STEP.SET.SET1 || set > STEP.SET.SET4) return
    const currentLocalData = getLocalData()
    if (!currentLocalData) return

    const newTask = {
      id: parsedTasks[phase][task - 1].id,
      iod: parsedTasks[phase][task - 1].iod,
      compare: parsedTasks[phase][task - 1].compare,
      time: set === STEP.SET.SET3 || set === STEP.SET.SET4 ? getItem('time1') : getItem('time'),
      userTime: getItem('guessedTime'),
      compareTime: set === STEP.SET.SET3 || set === STEP.SET.SET4 ? getItem('time2') : null,
      compareIod: parsedTasks[phase][task - 1].compareIod,
      userValue: getItem('compareValue'),
      clicks: getItem('clicks')
    }

    currentLocalData.sets[set - 2][getPhaseString(phase)].tasks.push(newTask)
    currentLocalData.tasks.push(newTask)

    LocalDataHandler.setLocalData(currentLocalData)

    // eslint-disable-next-line
  }, [task])


  const getRandomForSet = (set: number) => {
    const taskList = set === 2 ? set2Tasks : set === 4 ? set4Tasks : []
    const index = Math.floor(Math.random() * taskList.length)
    if (set === 2) {
      return set2Tasks.splice(index, 1)[0]
    } else {
      return set4Tasks.splice(index, 1)[0]
    }
  }

  const getNextStepForSet1And2 = () => {
    if (task >= STEP.TASK.TASK4) {
      if (phase >= STEP.PHASE.PHASE3) {
        if (set >= STEP.SET.SET2) {
          setSet(STEP.SET.SET3)
        } else {
          setSet(set + 1)
        }
      } else {
        setPhase(phase + 1)
      }
    } else {
      setTask(task + 1)
    }
  }

  const getNextStepForSet3And4 = () => {
    if (task >= STEP.TASK.TASK4) {
      if (phase >= STEP.PHASE.PHASE6) {
        if (set >= STEP.SET.SET4) {
          setSet(STEP.SET.THANK_YOU)
        } else {
          setSet(set + 1)
        }
      } else {
        setPhase(phase + 1)
      }
    } else {
      setTask(task + 1)
    }
  }

  const renderContent = () => {
    switch (set) {
      case STEP.SET.WELCOME:
        return <Welcome nextStep={() => setSet(STEP.SET.QUIZ)} />
      case STEP.SET.QUIZ:
        return <Quiz nextStep={() => setSet(STEP.SET.INFO1)} />
      case STEP.SET.INFO1:
        return <Info type={INFO_TYPE.TIME_GUESS} nextStep={() => setSet(STEP.SET.SET1)} />
      case STEP.SET.SET1:
        return <Task coords={parsedTasks[phase][order[task]].coords} nextStep={() => getNextStepForSet1And2()} />
      case STEP.SET.SET2:
        return <Task coords={parsedTasks[getRandomForSet(2)][order[task]].coords} nextStep={() => getNextStepForSet1And2()} />
      case STEP.SET.INFO2:
        return <Info type={INFO_TYPE.TIME_COMPARISON} nextStep={() => setSet(STEP.SET.SET1)} />
      case STEP.SET.SET3:
        return <ComparisonTask coords={parsedTasks[phase][order[task]].coords} nextStep={() => getNextStepForSet3And4()} />
      case STEP.SET.SET4:
        return <ComparisonTask coords={parsedTasks[getRandomForSet(4)][order[task]].coords} nextStep={() => getNextStepForSet3And4()} />
      case STEP.SET.THANK_YOU:
        return <ThankYou />
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
