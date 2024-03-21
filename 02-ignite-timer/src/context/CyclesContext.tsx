import { differenceInSeconds } from 'date-fns'
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Cycle } from '../model/Cycle'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'
import { cyclesReducer } from '../reducers/cycles/reducer'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextData {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  markCurrentCycleAsInterrupted: () => void
  setSecondsPassed: (secondsPassed: number) => void
  addNewCycle: (data: CreateCycleData) => void
}

interface CyclesContextProvider {
  children: React.ReactNode
}

const CyclesContext = createContext({} as CyclesContextData)

const CyclesContextProvider = ({ children }: CyclesContextProvider) => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return initialState
    },
  )

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function markCurrentCycleAsInterrupted() {
    dispatch(interruptCurrentCycleAction())
  }

  function setSecondsPassed(secondsPassed: number) {
    setAmountSecondsPassed(secondsPassed)
  }

  function addNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutes: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    setAmountSecondsPassed(0)
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-timer:cycles-state', stateJSON)
  }, [cyclesState])

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        markCurrentCycleAsInterrupted,
        setSecondsPassed,
        addNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

const useCycle = () => {
  return useContext(CyclesContext)
}

export { CyclesContextProvider, useCycle }
