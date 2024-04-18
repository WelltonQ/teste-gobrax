import { useState, SyntheticEvent } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { Button, MenuItem, Modal, Stack, Tabs, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

// import { CustomTabPanel } from './customTabPanel';
import logo from '../assets/gobrax.svg'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../server/api';

type DriverTypes = {
  name: string
  document: string
  bond?: string
}

type VehicleTypes = {
  label: string
  value: string
}[]

const schemaDriver = yup.object({
  name: yup.string().required('Nome obrigatório!'),
  document: yup.string().required('Documento obrigatório!'),
})

export function Header() {
  const [openModalDrivers, setOpenModalDrivers] = useState(false);
  const [value, setValue] = useState<number>(0);
  const queryClient = useQueryClient()

  const { register, reset, handleSubmit, formState:{ errors }  } = useForm<DriverTypes>({
    resolver: yupResolver(schemaDriver)
  })

  const handleOpen = () => setOpenModalDrivers(true);
  const handleClose = () => {
    reset()
    setOpenModalDrivers(false)
  };

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const mutation = useMutation({
    mutationFn: (newDriver: DriverTypes) => {
      return api.post('/drivers', newDriver)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] })
    }
  })

  const onSubmit: SubmitHandler<DriverTypes> = (data) => {
    console.log(data)
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

  const vehicle: VehicleTypes = [
    {
      value: 'AFC-12345',
      label: 'DAF',
    },
    {
      value: 'EUR-12345',
      label: 'TRANSILVA',
    },
    {
      value: 'BTC-1234',
      label: 'TRANSREAL',
    },
    {
      value: 'JPY-1826',
      label: 'JALOTO',
    },
  ];

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
              disabled={!vehicle.length}
              helperText={!vehicle.length && 'Não há veículo cadastrado'}
            >
              {vehicle.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
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