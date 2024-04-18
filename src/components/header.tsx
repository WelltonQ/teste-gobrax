import { useState, SyntheticEvent } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { Button, MenuItem, Modal, Stack, Tabs, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import loadingGif from '../assets/loading.gif'
// import { CustomTabPanel } from './customTabPanel';
import logo from '../assets/gobrax.svg'
import { schemaDriver } from './schemas';
import { useCreateVehicle, useGetVehicles } from '../hooks/useVehicles';

type DriverTypes = {
  name: string
  document: string
  bond?: string
}

type DataVehicleRowType = {
  id: string
  placa: string
  marca: string
}

export function Header() {
  const [openModalDrivers, setOpenModalDrivers] = useState(false);
  const [value, setValue] = useState<number>(0);

  const { register, reset, handleSubmit, formState:{ errors }  } = useForm<DriverTypes>({
    resolver: yupResolver(schemaDriver)
  })

  const { data: vehicles, isLoading } = useGetVehicles()
  const mutation = useCreateVehicle()

  const handleOpen = () => setOpenModalDrivers(true);
  const handleClose = () => {
    reset()
    setOpenModalDrivers(false)
  };

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onSubmit: SubmitHandler<DriverTypes> = (data) => {
    mutation.mutate(data)
    handleClose()
  }

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  if (isLoading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <img src={loadingGif} alt="Carregando..." />
    </Box>
  )

  return (
    <>
      <Box component="header" sx={{height: '82px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Box>
            <Tabs value={value} onChange={handleChange} aria-label="Lista de motoristas e veículos">
              <Tab label="Motoristas" sx={{textTransform: 'none', fontSize: '16px'}} value={0} />
              <Tab label="Veículos" sx={{textTransform: 'none', fontSize: '16px'}} value={1} />
            </Tabs>
          </Box>
          {/* <CustomTabPanel value={value} index={0}>Motoristas</CustomTabPanel>
          <CustomTabPanel value={value} index={1}>Veículos</CustomTabPanel> */}
        </Box>
        <img src={logo} alt="Logotipo do nome Gobrax" />
        {value === 0 && (
          <Button onClick={handleOpen} sx={{width: '210px', bgcolor: '#1323B0', textTransform: 'none', fontSize: '16px'}} variant="contained">Adicionar Motorista</Button>
        )} 
        {value === 1 && (
          <Button sx={{width: '210px', bgcolor: '#1323B0', textTransform: 'none', fontSize: '16px'}} variant="contained">Adicionar Veículo</Button>
        )}
      </Box>
      <Modal
        open={openModalDrivers}
        onClose={handleClose}
        aria-labelledby="Novo Motorista"
        aria-describedby="Adicionar novo motorista"
      >
        <Box component="form" sx={style} onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={4}>
            <TextField
              label="Nome *"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("name")}
              error={!!errors.name}
              helperText={!!errors.name && errors.name.message}
            />
            <TextField
              label="Documento *"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("document")}
              error={!!errors.document}
              helperText={!!errors.document && errors.document.message}
            />
            <TextField
              defaultValue=""
              select
              label="Veículo"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("bond")}
              disabled={!vehicles.length}
              helperText={!vehicles.length && 'Não há veículo cadastrado'}
            >
              {vehicles.map((item: DataVehicleRowType) => (
                <MenuItem key={item.id} value={item.placa}>
                  {item.marca} - {item.placa}
                </MenuItem>
              ))}
            </TextField>
            <Button type='submit' variant='contained'>Salvar</Button>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}