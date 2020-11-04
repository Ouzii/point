import React, { useEffect, useState } from 'react'
import './App.css'
import LocalDataHandler, { setLocalData, getLocalData, getItem, resetShortTimeValues } from './functions/LocalDataHandler'
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
import ProgressBar from './components/ProgressBar'

const randomNumber = Math.random()
const set2Tasks: Array<number> = randomNumber <= 0.33 ? [STEP.PHASE.PHASE3, STEP.PHASE.PHASE2, STEP.PHASE.PHASE1] : randomNumber <= 0.66 ? [STEP.PHASE.PHASE3, STEP.PHASE.PHASE1, STEP.PHASE.PHASE2] : [STEP.PHASE.PHASE2, STEP.PHASE.PHASE3, STEP.PHASE.PHASE1]
const set4Tasks: Array<number> = randomNumber <= 0.33 ? [STEP.PHASE.PHASE6, STEP.PHASE.PHASE5, STEP.PHASE.PHASE4] : randomNumber <= 0.66 ? [STEP.PHASE.PHASE6, STEP.PHASE.PHASE4, STEP.PHASE.PHASE5] : [STEP.PHASE.PHASE5, STEP.PHASE.PHASE6, STEP.PHASE.PHASE4]

const parsedTasks = JSON.parse(JSON.stringify(tasks))

export default () => {

  const [set, setSet] = useState<number>(STEP.SET.WELCOME)
  const [phase, setPhase] = useState<number>(STEP.PHASE.PHASE1)
  const [task, setTask] = useState<number>(STEP.TASK.TASK1)
  const [order, setOrder] = useState<Array<number>>([0, 1, 2, 3])
  const [progress, setProgress] = useState<number>(1)
  const [trainingTask, setTrainingTask] = useState<number>(0)


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
    if (set === STEP.SET.INFO2 || set === STEP.SET.TRAINING2 || set === STEP.SET.THANK_YOU) {
      setPhase(STEP.PHASE.PHASE4)
      setTask(STEP.TASK.TASK1)
      return
    }

    if (set < STEP.SET.SET1 || set > STEP.SET.SET4) return

    if (set >= STEP.SET.SET1 && set <= STEP.SET.SET2) {
      setPhase(STEP.PHASE.PHASE1)
      setTask(STEP.TASK.TASK1)
      return
    }
    if (set >= STEP.SET.SET3 && set <= STEP.SET.SET4) {
      setPhase(STEP.PHASE.PHASE4)
      setTask(STEP.TASK.TASK1)
      return
    }
    // eslint-disable-next-line
  }, [set])

  useEffect(() => {
    if (set < STEP.SET.SET1 || set > STEP.SET.SET4) return
    setTask(STEP.TASK.TASK1)
    // eslint-disable-next-line
  }, [phase])

  useEffect(() => {
    if (trainingTask >= 2) {
      setSet(set + 1)
      setTrainingTask(0)
    } else {

    }
    // eslint-disable-next-line
  }, [trainingTask])


  useEffect(() => {
    setProgress(progress + 1)
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
        width: parsedTasks[phase][order[task - 1]].width,
        distance: parsedTasks[phase][order[task - 1]].distance,
        time: set === STEP.SET.SET3 ? getItem('time1') : getItem('time'),
        userTime: getItem('guessedTime'),
        compareTime: set === STEP.SET.SET3 ? getItem('time2') : null,
        compareIod: parsedTasks[phase][order[task - 1]].compareIod,
        compareWidth: parsedTasks[phase][order[task - 1]].compareWidth,
        compareDistance: parsedTasks[phase][order[task - 1]].compareDistance,
        userValue: parsedTasks[phase][order[task - 1]].compare ? getItem('compareValue') : null,
        clicks: getItem('clicks')
      }
    } else {
      newTask = {
        orderNumber: parsedTasks[set === STEP.SET.SET2 ? set2Tasks[phase - 1] : set4Tasks[phase - 4]][order[task - 1]].id,
        iod: parsedTasks[set === STEP.SET.SET2 ? set2Tasks[phase - 1] : set4Tasks[phase - 4]][order[task - 1]].iod,
        modifier: parsedTasks[set === STEP.SET.SET2 ? set2Tasks[phase - 1] : set4Tasks[phase - 4]][order[task - 1]].modifier,
        compare: parsedTasks[set === STEP.SET.SET2 ? set2Tasks[phase - 1] : set4Tasks[phase - 4]][order[task - 1]].compare,
        width: parsedTasks[set === STEP.SET.SET2 ? set2Tasks[phase - 1] : set4Tasks[phase - 4]][order[task - 1]].width,
        distance: parsedTasks[set === STEP.SET.SET2 ? set2Tasks[phase - 1] : set4Tasks[phase - 4]][order[task - 1]].distance,
        time: set === STEP.SET.SET4 ? getItem('time1') : getItem('time'),
        userTime: getItem('guessedTime'),
        compareTime: set === STEP.SET.SET4 ? getItem('time2') : null,
        compareIod: parsedTasks[set === STEP.SET.SET2 ? set2Tasks[phase - 1] : set4Tasks[phase - 4]][order[task - 1]].compareIod,
        compareWidth: parsedTasks[set === STEP.SET.SET2 ? set2Tasks[phase - 1] : set4Tasks[phase - 4]][order[task - 1]].compareWidth,
        compareDistance: parsedTasks[set === STEP.SET.SET2 ? set2Tasks[phase - 1] : set4Tasks[phase - 4]][order[task - 1]].compareDistance,
        userValue: parsedTasks[set === STEP.SET.SET2 ? set2Tasks[phase - 1] : set4Tasks[phase - 4]][order[task - 1]].compare ? getItem('compareValue') : null,
        clicks: getItem('clicks')
      }
    }
    let offSet = 4
    if (set >= STEP.SET.TRAINING2) offSet = 6
    currentLocalData.sets[set - offSet][getPhaseString(phase)].tasks.push(newTask)
    currentLocalData.tasks.push(newTask)


    if (sendNewTask({ userId: currentLocalData.id, ...newTask })) {
      LocalDataHandler.setLocalData(currentLocalData)
      resetShortTimeValues()
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
        return <Info type={INFO_TYPE.TIME_GUESS} nextStep={() => setSet(STEP.SET.TRAINING1)} />
      case STEP.SET.TRAINING1:
        return <Task coords={parsedTasks.training[trainingTask].coords} nextStep={() => setTrainingTask(trainingTask + 1)} training />
      case STEP.SET.SET1:
        return <Task coords={parsedTasks[phase][order[task]].coords} nextStep={() => setTask(task + 1)} />
      case STEP.SET.SET2:
        return <Task coords={parsedTasks[set2Tasks[phase - 1]][order[task]].coords} nextStep={() => setTask(task + 1)} />
      case STEP.SET.INFO2:
        return <Info type={INFO_TYPE.TIME_COMPARISON} nextStep={() => setSet(STEP.SET.TRAINING2)} />
      case STEP.SET.TRAINING2:
        return <ComparisonTask coords={parsedTasks.training[trainingTask + 2].coords} nextStep={() => setTrainingTask(trainingTask + 1)} training />
      case STEP.SET.SET3:
        return <ComparisonTask coords={parsedTasks[phase][order[task]].coords} nextStep={() => setTask(task + 1)} />
      case STEP.SET.SET4:
        return <ComparisonTask coords={parsedTasks[set4Tasks[phase - 4]][order[task]].coords} nextStep={() => setTask(task + 1)} />
      case STEP.SET.THANK_YOU:
        return <ThankYou />
      default:
        break
    }
  }

  return (
    <div className="App">
      <ProgressBar progress={progress} />
      {renderContent()}
    </div>
  )
}
