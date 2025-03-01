import * as React from 'react';

import axios from 'axios';

import PropTypes from 'prop-types';
// form
import { styled } from '@mui/material/styles';

import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Card, FormHelperText, Grid, IconButton, Typography, Button, Box, Stepper, Step, StepLabel, StepContent, Paper, Fab, Stack } from '@mui/material';
// Import con ruta
import { StyledIcon } from '../../../../components/nav-section/mini/styles';
import Iconify from '../../../../components/iconify';
import { HOST_API_LOCAL, END_POINT_OBTENER_HISTORIAL_EMPLEADO } from '../../../../config-global';


export default function ProfileHistorial() {
  const [arrayHistorial, setArrayHistorial] = React.useState([])

  React.useEffect(() => {

    function ObtenerEmpleados() {
      const urlEndPoint = HOST_API_LOCAL + END_POINT_OBTENER_HISTORIAL_EMPLEADO;
      const AUT = `Bearer ${localStorage.getItem('accessToken')}`;
      const historial = localStorage.getItem('EmpleadoId');
      console.log(historial)
      axios({
        method: 'get',
        url: urlEndPoint,
        params: { empleadoId: historial },
        headers: { 'Authorization': AUT }
      }).then(response => {
        console.log('un axios', response.data)
        setArrayHistorial(response.data)
      }).catch(() => {
        // result = "Error";
      })
    }
    ObtenerEmpleados()
  }, [])



  return (
    <>
      <Grid container spacing={3} padding={4}>
        {arrayHistorial.map((item) => (
          <Grid item xs={12} md={4}>
            <TarjetaHistorial
              id={item.id}
              nombre={item.creadoPorNombre}
              anterior={item.datoAnterior}
              nuevo={item.datoNuevo}
              fecha={item.fechaCreacion}
            />
          </Grid>
        ))}
      </Grid>

    </>
  )
}


TarjetaHistorial.prototype = {
  id: PropTypes.string,
  nombre: PropTypes.string,
  anterior: PropTypes.string,
  nuevo: PropTypes.string,
  fecha: PropTypes.string
};

function TarjetaHistorial({ nombre, anterior, nuevo, fecha, id }) {

  return (
    <>
      <Card
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            pl: 2,
            pr: 1,
            flexGrow: 1,
            minWidth: 0,
          }}
        >
          <Stack spacing={0.5} direction="row" alignItems="center" sx={{ color:'#00AB55' }}>
            <Iconify icon="material-symbols:star-rounded" width={16} sx={{ flexShrink: 0 }} />
            <Typography variant='subtitle'>Actual: </Typography>
            <Typography variant="body" component="span" noWrap>
              {nuevo}
            </Typography>
          </Stack>

          <Stack spacing={0.5} direction="row" alignItems="center" sx={{ color:'text.secondary' }}>
            <Typography variant='subtitle2'>Anterior: </Typography>
            <Typography variant="body2" component="span" noWrap >
              {anterior}
            </Typography>
          </Stack>

          <Stack spacing={0.5} direction="row" alignItems="center" sx={{ color: 'text.secondary' }}>
            <Typography variant="subtitle2" component="span" noWrap> Aplicó el cambio: </Typography>
            <Typography variant="body2" component="span" noWrap>
              {nombre}
            </Typography>
          </Stack>

          <Stack spacing={0.5} direction="row" alignItems="center" sx={{ color: 'text.secondary' }}>
            <Typography variant="subtitle2" component="span" noWrap>
              Fecha:
            </Typography>
            <Typography variant="body2" component="span" noWrap>
              {fecha}
            </Typography>
          </Stack>
        </Box>
      </Card>
    </>
  )
}