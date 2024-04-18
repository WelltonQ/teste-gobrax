import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { api } from '../server/api';
import loadingGif from '../assets/loading.gif'
import { Box, Button } from '@mui/material';


type DriverTypes = {
  id: string
  name: string
  document: string
  bond: string
}

const columnsDrivers: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Nome', width: 200 },
  { field: 'document', headerName: 'Documento', width: 200 },
  { field: 'bond', headerName: 'Vínculo', width: 200 },
  { 
    field: 'edit', 
    headerName: 'Ações',
    flex: 1,
    headerAlign: 'right',
    align: 'right',
    renderCell: (params) => (
      <Button variant='outlined' sx={{textTransform: 'none'}} onClick={() => console.log(params)}>
        Editar
      </Button>
    )
  },
];

// const rowsDrivers = [
//   { id: 1, documento: '999.999.999-99', nome: 'Jon', vínculo: 'Sim', editar: 'Editar' },
//   { id: 2, documento: '999.999.999-99', nome: 'Cersei', vínculo: 'Sim', editar: 'Editar' },
//   { id: 3, documento: '999.999.999-99', nome: 'Jaime', vínculo: 'Não', editar: 'Editar' },
//   { id: 4, documento: '999.999.999-99', nome: 'Arya', vínculo: 'Sim', editar: 'Editar' },
//   { id: 7, documento: '999.999.999-99', nome: 'Ferrara', vínculo: 'Sim', editar: 'Editar' },
//   { id: 8, documento: '999.999.999-99', nome: 'Rossini', vínculo: 'Não', editar: 'Editar' },
//   { id: 9, documento: '999.999.999-99', nome: 'Harvey', vínculo: 'Sim', editar: 'Editar' },
// ];

export default function DataTable() {

  const { data, isLoading } = useQuery({ queryKey: ['drivers'], queryFn: async () => {
    const { data } = await api.get('/drivers')
    return data
  }})

  if (isLoading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <img src={loadingGif} alt="Carregando..." />
    </Box>
  )
  const dataDrivers = data.map((item: DriverTypes) => ({...item, bond: item.bond !== "" ? "Sim" : "Não"}))
  console.log('data', dataDrivers)
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={dataDrivers}
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
    </div>
  );
}