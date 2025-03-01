
import React, { useState } from 'react';


import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Grid, Card, Typography, Button,TextField } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      color: '#fff',
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

export default function AvatarDate() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Stack direction="row" spacing={2} >
        <LightTooltip
          title={
            <Grid container spacing={2} sx={{p:2}}>
              <Grid item md={2} sx={{ pr: 3 }}>
                <Avatar {...stringAvatar('Víctor Estrada')} />
              </Grid>
              <Grid item md={10}>
                <Typography variant='h6'>Víctor Estrada</Typography>
                <Typography variant='body2'>Cumple años el 2 de abril</Typography>
                <Button variant="outlined" onClick={handleClickOpen} sx={{mt:2}}>
                  ¡Felicitale!
                </Button>
              </Grid>
            </Grid>
          }
          interactive
          >
          <Avatar {...stringAvatar('Victor Estrada')} />
        </LightTooltip>
        <Avatar {...stringAvatar('Jessica Flores')} />
        <Avatar {...stringAvatar('Erika Bonilla')} />
      </Stack>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color='primary'>Felicita a Víctor Estrada por su cumpleaños</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Mensaje"
            type="text"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined' color='error'>Cancelar</Button>
          <Button onClick={handleClose} variant='contained' color='primary'>Enviar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}