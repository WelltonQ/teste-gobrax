import { Container } from '@mui/material'

import { CustomTabPanel } from './components/customTabPanel'
import { DataTableDriver } from './components/drivers/dataTableDriver'
import { SelectedDriver } from './components/drivers/selectedDriver'
import { Header } from './components/header'
import { DataTableVehicle } from './components/vehicles/dataTableVehicle'
import { useContextProvider } from './context/contextProvider'

export function App() {
  const { tabValue } = useContextProvider()

  return (
    <Container maxWidth="lg">
      <Header />
      <SelectedDriver />
      <CustomTabPanel value={tabValue} index={0}>
        <DataTableDriver />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        <DataTableVehicle />
      </CustomTabPanel>
    </Container>
  )
}
