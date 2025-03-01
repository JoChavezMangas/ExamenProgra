import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import axios from 'axios';

// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack, Box, Fab, TextField } from '@mui/material';
// components
import Iconify from '../../../../../components/iconify';
import { HOST_API_LOCAL, END_POINT_OBTENER_EMPLEADO } from '../../../../../config-global';

// ----------------------------------------------------------------------

const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

ProfileAbout.propTypes = {
  company: PropTypes.string,
  role: PropTypes.string,
  school: PropTypes.string,
};

export default function ProfileAbout({  role, company, school }) {
  const name = localStorage.getItem('EmpleadoId');

  const aniversario = '3 años '
  const [nombre, setNombre] =useState()
  const [apellidoPaterno, setApellidoPaterno] =useState()
  const [apellidoMaterno, setApellidoMaterno] =useState()
  const [nombrePuesto, setNombrePuesto] =useState()
  const [correoEmpresarial, setCorreoEmpresarial] =useState()
  // const [telefonoFijo, setTelefono] =useState()
  const [cumpleanos, setCumpleanos] =useState()
  const [fechaIngreso, setfechaIngreso] = useState()
  const noEmpleado = localStorage.getItem('EmpleadoId');
  const [area, setArea] =useState()
  const [modalidad, setModalidad] =useState()
  const [telefonoContacto, setTelefonoMovil] =useState()
  // const [telefono, setTelefono] =useState()

  useEffect(() => {

      function ObtenerEmpleado() {
          const urlEndPoint = HOST_API_LOCAL + END_POINT_OBTENER_EMPLEADO;
          const AUT = `Bearer ${localStorage.getItem('accessToken')}`
          axios({
              method: 'get',
              url: urlEndPoint,
              params: { Id: name },
              headers: { 'Authorization': AUT }
          }).then(response => {
              setNombre(response.data.nombre)
              setApellidoPaterno(response.data.apellidoPaterno)
              setApellidoMaterno(response.data.apellidoMaterno)
              setNombrePuesto(response.data.nombrePuesto)
              setCorreoEmpresarial(response.data.correoEmpresarial)
              // setTelefono(response.data.telefono)
              setCumpleanos(response.data.fechaNacimiento)
              setArea(response.data.nombreArea)
              setModalidad(response.data.modalidad)
              setTelefonoMovil(response.data.telefonoContacto)
              console.log('este es el telefono'.telefonoContacto)
              setfechaIngreso(response.data.fechaIngreso)
              // setCorreoEmpresarial(response.data.correoEmpresarial)
              // setTelefono(response.data.telefono)
              console.log('este es el response de axios', response.data)
              
          }).catch(() => {
              // result = "Error";
          })
      }
      ObtenerEmpleado()
  }, [name])
  return (
    <>
    <Card sx={{marginBottom:'20px'}}>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box sx={{display:'flex'}}>
          
          <Typography variant="h6" color='primary' >{nombre} {apellidoPaterno} {apellidoMaterno}</Typography>
          {/* <Fab color="primary" aria-label="edit" sx={{width:40, height:40, right:12, position:'absolute', top:12}}>
            <StyledIcon icon="material-symbols:edit" sx={{marginRight:'0px'}}/>
          </Fab> */}
        </Box>

        <Stack direction="row">
          <StyledIcon icon="mdi:calendar-blank" />
          <Typography variant="body2">{aniversario} como: </Typography>
          <Typography variant="subtitle2">&nbsp; {nombrePuesto}</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="eva:email-fill" />
          <Typography variant="body2">{correoEmpresarial}</Typography>
        </Stack>

        <Stack direction="row" >
          <StyledIcon icon="mdi:cellphone-sound" />
          <Typography variant="body2">{telefonoContacto}</Typography>
        </Stack>

        {/* <Stack direction="row" >
          <StyledIcon icon="mdi:cellphone-sound" />
          <Typography variant="body2">{telefonoMovil}</Typography>
        </Stack> */}

      </Stack>
    </Card>

    <Card>
      {/* <CardHeader title="Social" /> */}

      <Stack spacing={2} sx={{ p: 3 }}>
          <Stack direction="row" sx={{ wordBreak: 'break-all' }}>
          <Typography variant="subtitle2">Cumpleaños: &nbsp;</Typography>
          <Typography variant="body2">{cumpleanos}</Typography>     
          </Stack>

          <Stack direction="row" sx={{ wordBreak: 'break-all' }}>
          <Typography variant="subtitle2">Fecha de Ingreso: &nbsp;</Typography>
          <Typography variant="body2">{fechaIngreso}</Typography>     
          </Stack>

          <Stack direction="row" sx={{ wordBreak: 'break-all' }}>
          <Typography variant="subtitle2">Área: &nbsp;</Typography>
          <Typography variant="body2">{area}</Typography>     
          </Stack>

          <Stack direction="row" sx={{ wordBreak: 'break-all' }}>
          <Typography variant="subtitle2">No. Colaborador: &nbsp;</Typography>
          <Typography variant="body2">{noEmpleado}</Typography>     
          </Stack>

          <Stack direction="row" sx={{ wordBreak: 'break-all' }}>
          <Typography variant="subtitle2">Modalidad: &nbsp;</Typography>
          <Typography variant="body2">{modalidad}</Typography>     
          </Stack>
      </Stack>
    </Card>
    </>
  );
}
