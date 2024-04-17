import { useState, SyntheticEvent } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { Button, Tabs } from '@mui/material';
// import { CustomTabPanel } from './customTabPanel';
import logo from '../assets/gobrax.svg'

export function Header() {

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
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
        <Button sx={{width: '210px', bgcolor: '#1323B0', textTransform: 'none', fontSize: '16px'}} variant="contained">Adicionar Motorista</Button>
      )} 
      {value === 1 && (
        <Button sx={{width: '210px', bgcolor: '#1323B0', textTransform: 'none', fontSize: '16px'}} variant="contained">Adicionar Veículo</Button>
      )}
    </Box>
  )
}