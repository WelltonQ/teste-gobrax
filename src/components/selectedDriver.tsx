import { Box, Stack } from "@mui/material";
import { DriverTypes, useDriver } from "../context/driverProvider";

export function SelectedDriver() {
  const { selectionDriver } = useDriver()
  return (
    <Box component="section" sx={{width: '100%', height: '100px', display: 'flex', justifyContent: 'flex-end'}}>
      {selectionDriver.map((item: DriverTypes) => (
        <Stack key={item.id} direction="column" spacing={1} my={2} sx={{minWidth: '210px'}}>
          <span>Selecionado:</span>
          <span><b>Motorista: </b>{item.name}</span>
          <span><b>Veículo: </b>{item.bond === "" ? "Não há veículo vinculado" : item.bond}</span>
        </Stack>
      ))}
    </Box>
  )
}
