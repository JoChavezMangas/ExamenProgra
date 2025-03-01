import * as React from 'react';
import { Stack, AppBar, Avatar, Box, Button, Card, Dialog, Divider, Grid, IconButton, List, ListItem, ListItemText, Slide, Toolbar, Typography } from "@mui/material";
import axios from 'axios';
import PropTypes from 'prop-types';
import { CloseIcon } from '../../../../theme/overrides/CustomIcons';
import { HOST_API_LOCAL, END_POINT_HISTORIAL_BALANCE_PARES } from '../../../../config-global';
// import GenericDataGridCustom from '../../../_examples/mui/data-grid/GenericDataGridCostom';
// import DialogEditarSolicitud from '../../../../pages/Vacaciones/EdicionSolicitud';
// import { RenderPeriodo, RenderStatus, RendertipoPeticion } from '../../../../pages/Vacaciones/MetodosAUX';
import Iconify from '../../../../components/iconify';


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

export default function MisPares() {

  const [arrayEmpelados, setArrayEmpleados] = React.useState([])

  React.useEffect(() => {

    function ObtenerEmpleados() {
      const urlEndPoint = HOST_API_LOCAL + END_POINT_HISTORIAL_BALANCE_PARES;
      const AUT = `Bearer ${localStorage.getItem('accessToken')}`;
      const pares = localStorage.getItem('EmpleadoId');
      axios({
        method: 'get',
        url: urlEndPoint,
        params: { 'EmpleadoId': pares },
        headers: { 'Authorization': AUT }
      }).then(response => {
        console.log('este es el response de axios', response.data)
        setArrayEmpleados(response.data)
      }).catch(() => {
        // result = "Error";
      })
    }
    ObtenerEmpleados()
  }, [])




  return (
    <>
      <Typography variant="subtitle2" sx={{ my: 1, mt: 2 }}>
        Mis Pares
      </Typography>
      <Grid container spacing={3}>
        {arrayEmpelados.map((item) => (
          <Grid item xs={12} md={6}>
            <TarjetaPares
              Nombre={item.empleadoNombre}
              Puesto={item.empleadoPuesto}
              EmpleadoId={item.empleadoId}
            />
          </Grid>
        ))}
      </Grid>

    </>
  )
}


TarjetaPares.prototype = {
  Nombre: PropTypes.string,
  Puesto: PropTypes.string,
  EmpleadoId: PropTypes.string
};

function TarjetaPares({ Nombre, Puesto, EmpleadoId }) {

  return (
    <>
      <Card
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Avatar stringAvatar alt={Nombre} src={Nombre} sx={{ width: 48, height: 48 }} />

        <Box
          sx={{
            pl: 2,
            pr: 1,
            flexGrow: 1,
            minWidth: 0,
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {Nombre}
          </Typography>
          <Stack spacing={0.5} direction="row" alignItems="center" sx={{ color: 'text.secondary' }}>
            <Iconify icon="material-symbols:work-outline" width={16} sx={{ flexShrink: 0 }} />

            <Typography variant="body2" component="span" noWrap>
              {Puesto}
            </Typography>
          </Stack>
        </Box>
      </Card>
    </>
  )
}