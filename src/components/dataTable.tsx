import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columnsDrivers: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nome', headerName: 'Nome', width: 200 },
  { field: 'documento', headerName: 'Documento', width: 200 },
  { field: 'vínculo', headerName: 'Vínculo', width: 200 },
  { field: 'editar', headerName: 'Ações', width: 200, align: 'right' },
];

const columnsVehicles: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'marca', headerName: 'Marca', width: 200 },
  { field: 'placa', headerName: 'Placa', width: 200 },
];

const rowsDrivers = [
  { id: 1, documento: '999.999.999-99', nome: 'Jon', vínculo: 'Sim', editar: 'Editar' },
  { id: 2, documento: '999.999.999-99', nome: 'Cersei', vínculo: 'Sim', editar: 'Editar' },
  { id: 3, documento: '999.999.999-99', nome: 'Jaime', vínculo: 'Não', editar: 'Editar' },
  { id: 4, documento: '999.999.999-99', nome: 'Arya', vínculo: 'Sim', editar: 'Editar' },
  { id: 7, documento: '999.999.999-99', nome: 'Ferrara', vínculo: 'Sim', editar: 'Editar' },
  { id: 8, documento: '999.999.999-99', nome: 'Rossini', vínculo: 'Não', editar: 'Editar' },
  { id: 9, documento: '999.999.999-99', nome: 'Harvey', vínculo: 'Sim', editar: 'Editar' },
];

const rowsVehicles = [
  { id: 1, placa: 'AFC-12345', marca: 'DAF' },
  { id: 2, placa: 'AFC-12345', marca: 'DAF' },
  { id: 3, placa: 'AFC-12345', marca: 'DAF' },
  { id: 4, placa: 'AFC-12345', marca: 'DAF' },
  { id: 7, placa: 'AFC-12345', marca: 'DAF' },
  { id: 9, placa: 'AFC-12345', marca: 'DAF' },
  { id: 8, placa: 'AFC-12345', marca: 'DAF' },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rowsDrivers}
        columns={columnsDrivers}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableMultipleRowSelection
        disableColumnMenu
        
      />
      <DataGrid
        rows={rowsVehicles}
        columns={columnsVehicles}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableMultipleRowSelection
        disableColumnMenu
        
      />
    </div>
  );
}