import { Container } from '@mui/material';
import { Header } from './components/header';
import { SelectedDriver } from './components/selectedDriver';
import DataTable from './components/dataTableDriver';

export function App() {
  return (
    <Container maxWidth="lg">
      <Header />
      <SelectedDriver />
      <DataTable />
    </Container>
  )
}