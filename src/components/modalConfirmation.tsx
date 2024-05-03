import { Box, Button, Modal, Stack, Typography } from '@mui/material'

import { style } from '../styles/modal'

type ModalConfirmationProps = {
  title: string
  openModal: boolean
  handleCloseModal: () => void
  onSubmit: () => void
}

export function ModalConfirmation({
  title,
  openModal,
  handleCloseModal,
  onSubmit
}: ModalConfirmationProps) {
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="Confirmação"
      aria-describedby="Confirmar ação"
    >
      <Box component="div" sx={style}>
        <Stack gap={4}>
          <Typography component="h2">{title}</Typography>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Button
              type="button"
              variant="outlined"
              sx={{ flex: 1 }}
              onClick={handleCloseModal}
            >
              Não
            </Button>
            <Button
              type="button"
              variant="contained"
              sx={{ flex: 1 }}
              onClick={onSubmit}
            >
              Sim
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  )
}
