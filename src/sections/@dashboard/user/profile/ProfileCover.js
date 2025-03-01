import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import axios from 'axios';

// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// utils
import { bgBlur } from '../../../../utils/cssStyles';
// auth
import { useAuthContext } from '../../../../auth/useAuthContext';
// components
import Image from '../../../../components/image';
import { CustomAvatar } from '../../../../components/custom-avatar';
import { HOST_API_LOCAL, END_POINT_OBTENER_EMPLEADO } from '../../../../config-global';


// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  '&:before': {
    ...bgBlur({
      color: theme.palette.primary.darker,
    }),
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
}));

const StyledInfo = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

ProfileCover.propTypes = {
  cover: PropTypes.string,
};

export default function ProfileCover({ cover }) {
  const name = localStorage.getItem('EmpleadoId');

  const [nombre, setNombre] = useState()
  const [segundoNombre, setSegundoNombre] = useState()
  const [apellidoPaterno, setApellidoPaterno] = useState()
  const [apellidoMaterno, setApellidoMaterno] = useState()
  const [nombrePuesto, setNombrePuesto] = useState()

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
        setSegundoNombre(response.data.segundoNombre)
        setApellidoPaterno(response.data.apellidoPaterno)
        setApellidoMaterno(response.data.apellidoMaterno)
        setNombrePuesto(response.data.nombrePuesto)
      }).catch(() => {
        // result = "Error";
      })
    }
    ObtenerEmpleado()
  }, [name])

  return (
    <StyledRoot>
      <StyledInfo>
        <CustomAvatar
          alt={nombre}
          name={nombre}
          sx={{
            mx: 'auto',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'common.white',
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}
        />

        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h4">{nombre} {segundoNombre} {apellidoPaterno} {apellidoMaterno}</Typography>

          <Typography sx={{ opacity: 0.72 }}>{nombrePuesto}</Typography>
        </Box>
      </StyledInfo>

      <Image
        alt="cover"
        src={cover}
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: 'absolute',
        }}
      />
    </StyledRoot>
  );
}
