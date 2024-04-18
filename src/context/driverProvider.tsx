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

type DriverContextProps = {
  handleSelectDriver: (values: DriverTypes[]) => void
  selectionDriver: DriverTypes[]
}

const DriverContext = createContext({} as DriverContextProps);

export function DriverProvider({ children }: DriverProviderProps) {
  const [selectionDriver, setSelectionDriver] = useState<DriverTypes[]>([]);

  function handleSelectDriver(values: DriverTypes[]) {
    setSelectionDriver(values)
  }

  return (
    <DriverContext.Provider value={{selectionDriver, handleSelectDriver}}>
      {children}
    </DriverContext.Provider>
  )
}

export function useDriver() {
  return useContext(DriverContext)
}