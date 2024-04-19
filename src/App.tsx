import { Container } from '@mui/material';
import { Header } from './components/header';
import { SelectedDriver } from './components/drivers/selectedDriver';
import { DataTableDriver } from './components/drivers/dataTableDriver';
import { CustomTabPanel } from './components/customTabPanel';
import { useContextProvider } from './context/contextProvider';
import { DataTableVehicle } from './components/vehicles/dataTableVehicle';

export function App() {
  const { tabValue } = useContextProvider()

  return (
    <Container maxWidth="lg">
      <Header />
      <SelectedDriver />
      <CustomTabPanel value={tabValue} index={0}><DataTableDriver /></CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}><DataTableVehicle /></CustomTabPanel>
    </Container>
  )
}