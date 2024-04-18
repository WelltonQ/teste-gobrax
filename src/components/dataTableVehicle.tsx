import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columnsVehicles: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'marca', headerName: 'Marca', width: 200 },
  { field: 'placa', headerName: 'Placa', width: 200 },
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