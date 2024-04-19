import { ReactNode, createContext, useContext, useState } from 'react';

type DriverProviderProps = {
  children: ReactNode 
}

export type DriverTypes = {
  id?: string
  name: string
  document: string
  bond?: string
}

export type VehicleTypes = {
  id?: string
  mark: string
  plate: string
}

type DriverContextProps = {
  handleSelectDriver: (values: DriverTypes[]) => void
  handleTabs: (value: number) => void
  selectionDriver: DriverTypes[]
  tabValue: number
}

const DriverContext = createContext({} as DriverContextProps);

export function DriverProvider({ children }: DriverProviderProps) {
  const [selectionDriver, setSelectionDriver] = useState<DriverTypes[]>([]);
  const [tabValue, setTabValue] = useState<number>(0);

  function handleSelectDriver(values: DriverTypes[]) {
    setSelectionDriver(values)
  }

  function handleTabs(value: number) {
    setTabValue(value)
  }

  return (
    <DriverContext.Provider value={{
      selectionDriver, 
      tabValue, 
      handleSelectDriver, 
      handleTabs
    }}>
      {children}
    </DriverContext.Provider>
  )
}

export function useDriver() {
  return useContext(DriverContext)
}