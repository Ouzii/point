import React, { useEffect, useState } from 'react'
import './App.css'
import LocalDataHandler, { setLocalData, getLocalData, getItem, setItem } from './functions/LocalDataHandler'
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
import { addTaskToUser } from './services/taskService'

const randomNumber = Math.random()
const set2Tasks: Array<number> = randomNumber <= 0.33 ? [STEP.PHASE.PHASE3, STEP.PHASE.PHASE2, STEP.PHASE.PHASE1] : randomNumber <= 0.66 ? [STEP.PHASE.PHASE3, STEP.PHASE.PHASE1, STEP.PHASE.PHASE2] : [STEP.PHASE.PHASE2, STEP.PHASE.PHASE3, STEP.PHASE.PHASE1]
const set4Tasks: Array<number> = randomNumber <= 0.33 ? [STEP.PHASE.PHASE6, STEP.PHASE.PHASE5, STEP.PHASE.PHASE4] : randomNumber <= 0.66 ? [STEP.PHASE.PHASE6, STEP.PHASE.PHASE4, STEP.PHASE.PHASE5] : [STEP.PHASE.PHASE5, STEP.PHASE.PHASE6, STEP.PHASE.PHASE4]

const parsedTasks = JSON.parse(JSON.stringify(tasks))

export default () => {

  const [set, setSet] = useState<number>(STEP.SET.WELCOME)
  const [phase, setPhase] = useState<number>(STEP.PHASE.PHASE1)
  const [task, setTask] = useState<number>(STEP.TASK.TASK1)
  const [order, setOrder] = useState<Array<number>>([])


  useEffect(() => {
    const initUser = async () => {
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
    if (task - 1 > STEP.TASK.TASK4) {
      if ((phase >= STEP.PHASE.PHASE3 && set <= STEP.SET.SET2) || (phase >= STEP.PHASE.PHASE6 && set >= STEP.SET.SET3)) {
        setSet(set + 1)
      } else {
        setPhase(phase + 1)
      }
      return
    }

    if (set < STEP.SET.SET1 || set > STEP.SET.SET4 || task === STEP.TASK.TASK1) return
    const currentLocalData = getLocalData()
    if (!currentLocalData) return

    let newTask = {}
    if (set === STEP.SET.SET1 || set === STEP.SET.SET3) {
      newTask = {
        orderNumber: parsedTasks[phase][order[task - 1]].id,
        iod: parsedTasks[phase][order[task - 1]].iod,
        modifier: parsedTasks[phase][order[task - 1]].modifier,
        compare: parsedTasks[phase][order[task - 1]].compare,
        time: set === STEP.SET.SET3 ? getItem('time1') : getItem('time'),
        userTime: getItem('guessedTime'),
        compareTime: set === STEP.SET.SET3 ? getItem('time2') : null,
        compareIod: parsedTasks[phase][order[task - 1]].compareIod,
        userValue: parsedTasks[phase][order[task - 1]].compare ? getItem('compareValue') : null,
        clicks: getItem('clicks')
      }
    } else {
      newTask = {
        orderNumber: parsedTasks[set === STEP.SET.SET2 ? set2Tasks[phase - 1] : set4Tasks[phase - 1]][order[task - 1]].id,
        iod: parsedTasks[set === STEP.SET.SET2 ? set2Tasks[phase - 1] : set4Tasks[phase - 1]][order[task - 1]].iod,
        modifier: parsedTasks[set === STEP.SET.SET2 ? set2Tasks[phase - 1] : set4Tasks[phase - 1]][order[task - 1]].modifier,
        compare: parsedTasks[set === STEP.SET.SET2 ? set2Tasks[phase - 1] : set4Tasks[phase - 1]][order[task - 1]].compare,
        time: set === STEP.SET.SET4 ? getItem('time1') : getItem('time'),
        userTime: getItem('guessedTime'),
        compareTime: set === STEP.SET.SET4 ? getItem('time2') : null,
        compareIod: parsedTasks[set === STEP.SET.SET2 ? set2Tasks[phase - 1] : set4Tasks[phase - 1]][order[task - 1]].compareIod,
        userValue: parsedTasks[set === STEP.SET.SET2 ? set2Tasks[phase - 1] : set4Tasks[phase - 1]][order[task - 1]].compare ? getItem('compareValue') : null,
        clicks: getItem('clicks')
      }
    }
    currentLocalData.sets[set - 3][getPhaseString(phase)].tasks.push(newTask)
    currentLocalData.tasks.push(newTask)


    if (sendNewTask({ userId: currentLocalData.id, ...newTask })) {
      LocalDataHandler.setLocalData(currentLocalData)
      setItem('guessedTime', null)
      setItem('time', null)
      setItem('time1', null)
      setItem('time2', null)
      setItem('compareValue', null)
      setItem('clicks', null)
    }

    if (task - 1 >= STEP.TASK.TASK4) setTask(task + 1)
    // eslint-disable-next-line
  }, [task])


  const sendNewTask = async (taskData: any) => {
    await addTaskToUser(taskData)
    return true
  }

  const renderContent = () => {
    if (task > STEP.TASK.TASK4) return <div />
    switch (set) {
      case STEP.SET.WELCOME:
        return <Welcome nextStep={() => setSet(STEP.SET.QUIZ)} />
      case STEP.SET.QUIZ:
        return <Quiz nextStep={() => setSet(STEP.SET.INFO1)} />
      case STEP.SET.INFO1:
        return <Info type={INFO_TYPE.TIME_GUESS} nextStep={() => setSet(STEP.SET.SET1)} />
      case STEP.SET.SET1:
        return <Task coords={parsedTasks[phase][order[task]].coords} nextStep={() => setTask(task + 1)} />
      case STEP.SET.SET2:
        return <Task coords={parsedTasks[set2Tasks[phase - 1]][order[task]].coords} nextStep={() => setTask(task + 1)} />
      case STEP.SET.INFO2:
        return <Info type={INFO_TYPE.TIME_COMPARISON} nextStep={() => setSet(STEP.SET.SET3)} />
      case STEP.SET.SET3:
        return <ComparisonTask coords={parsedTasks[phase][order[task]].coords} nextStep={() => setTask(task + 1)} />
      case STEP.SET.SET4:
        return <ComparisonTask coords={parsedTasks[set4Tasks[phase - 1]][order[task]].coords} nextStep={() => setTask(task + 1)} />
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
