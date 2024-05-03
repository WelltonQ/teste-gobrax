import { ReactNode, createContext, useContext, useState } from 'react'

import { DriverTypes } from '../types'

type ContextProviderProps = {
  children: ReactNode
}

type ContextContextProps = {
  handleSelectDriver: (values: DriverTypes[]) => void
  handleTabs: (value: number) => void
  selectionDriver: DriverTypes[]
  tabValue: number
}

const ContextContext = createContext({} as ContextContextProps)

export function ContextProvider({ children }: ContextProviderProps) {
  const [selectionDriver, setSelectionDriver] = useState<DriverTypes[]>([])
  const [tabValue, setTabValue] = useState<number>(0)

  const handleSelectDriver = (values: DriverTypes[]) => {
    setSelectionDriver(values)
  }

  const handleTabs = (value: number) => {
    setTabValue(value)
    setSelectionDriver([])
  }

  return (
    <ContextContext.Provider
      value={{
        selectionDriver,
        tabValue,
        handleSelectDriver,
        handleTabs
      }}
    >
      {children}
    </ContextContext.Provider>
  )
}

export const useContextProvider = () => {
  return useContext(ContextContext)
}
