import { Container } from '@mui/material';
import { Header } from './components/header';
import { SelectedDriver } from './components/selectedDriver';
import { DataTableDriver } from './components/dataTableDriver';
import { CustomTabPanel } from './components/customTabPanel';
import { useDriver } from './context/driverProvider';
import { DataTableVehicle } from './components/dataTableVehicle';

export function App() {
  const { tabValue } = useDriver()

  return (
    <Container maxWidth="lg">
      <Header />
      <SelectedDriver />
      <CustomTabPanel value={tabValue} index={0}><DataTableDriver /></CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}><DataTableVehicle /></CustomTabPanel>
    </Container>
  )
}