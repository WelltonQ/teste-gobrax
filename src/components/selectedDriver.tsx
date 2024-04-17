import { Box, Stack } from "@mui/material";

export function SelectedDriver() {
  return (
    <Box component="section" sx={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
      <Stack direction="column" spacing={1} my={3} sx={{minWidth: '210px'}}>
        <span>Selecionado:</span>
        <span><b>Motorista: </b>Guga</span>
        <span><b>Veículo: </b>DAF - AFC-1234</span>
      </Stack>
    </Box>
  )
}
