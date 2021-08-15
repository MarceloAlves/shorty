import { useMachine } from '@xstate/react'
import { createLinkMachine, CreateLinkMachineContext, CreateLinkMachineEvents } from '@machines/createLink'
import React from 'react'
import { State } from 'xstate'

type LinkMachineType = State<
  CreateLinkMachineContext,
  CreateLinkMachineEvents,
  any,
  { value: any; context: CreateLinkMachineContext }
>

interface Actions {
  updateInput: (value: string) => void
  createLink: () => void
  restart: () => void
}

export const AppContext = React.createContext<[LinkMachineType, Actions]>([] as any)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, send] = useMachine(createLinkMachine)

  const actions = React.useMemo(
    () => ({
      updateInput: (value: string) => send({ type: 'UPDATE_INPUT', value }),
      createLink: () => send({ type: 'CREATE_LINK' }),
      restart: () => send({ type: 'RESTART' }),
    }),
    [send]
  )

  return <AppContext.Provider value={[state, actions]}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  return React.useContext(AppContext)
}
