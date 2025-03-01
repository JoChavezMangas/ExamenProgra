import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import Popover from '@mui/material/Popover';
import { Typography, Stack, Grid, Card, Button, Link } from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { RHFTextField } from '../../../../components/hook-form';
import { END_POINT_CREAR_SOLICITUD, END_POINT_OBTENER_DATOS_TABLERO, HOST_API_KEY, HOST_API_LOCAL } from '../../../../config-global';

// utils
import { bgGradient } from '../../../../utils/cssStyles';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { InfoIcon } from '../../../../theme/overrides/CustomIcons';
// import Popover from '../../../../theme/overrides/Popover';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  height: '100%',
  width: '100%',
  // display: 'flex',
  overflow: 'hidden',
  position: 'relative',
  color: theme.palette.primary.darker,
  borderRadius: Number(theme.shape.borderRadius) * 2,
  // flexDirection: 'column',
  // [theme.breakpoints.up('md')]: {
  //   flexDirection: 'row',
  // },
}));

const StyledBg = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: -1,
  width: '100%',
  height: '100%',
  // position: 'absolute',
  backgroundColor: theme.palette.common.white,
  '&:before': {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -2,
    content: '""',
    opacity: 0.2,
    ...bgGradient({
      direction: '135deg',
      startColor: theme.palette.primary.light,
      endColor: theme.palette.primary.main,
    }),
  },
}));

// ----------------------------------------------------------------------

AppWelcomeCard.propTypes = {
  img: PropTypes.node,
  action: PropTypes.node,
  title: PropTypes.string,
  subheader: PropTypes.string,
  description: PropTypes.string,
};

export default function AppWelcomeCard({ title, subheader, description, action, img, ...other }) {

  const [vacaciones, setVacaciones] = useState(0);
  const [personales, setPersonales] = useState(0);
  const [fechaFinn, setfechaFin] = useState(0);

  useEffect(() => {

    function ObtenerDatosTableros() {

      const urlEndPoint = HOST_API_LOCAL + END_POINT_OBTENER_DATOS_TABLERO // END_POINT_CREAR_EPLEADO; // END_POINT_OBTENER_DATOS_TABLERO;
      const AUT = `Bearer ${localStorage.getItem('accessToken')}`
       // console.log(localStorage.getItem('EmpleadoId'))
      return (
        axios({
          method: 'get',
          url: urlEndPoint,
          params: { "empleadoId": localStorage.getItem('EmpleadoId') },
          headers: { 'Authorization': AUT }
        }).then(response => {
          setVacaciones(response.data.vacacionesDisponibles)
          setPersonales(response.data.diasPersonalesDisponibles)
          setfechaFin(response.data.fechaFinString)
          // console.log('Vacaciones',response.data)
        }).catch(error => {
          console.log(error)
        })
      )
    }

    ObtenerDatosTableros()
  }, [])


    const [anchorEl, setAnchorEl] = useState(null);
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);




  return (
    <StyledRoot {...other}>
      <Stack>
        <Typography paragraph variant="h4" sx={{ color: "#051341" }}>
          {title}
        </Typography>
        <Typography paragraph variant="h6" sx={{ color: "#051341", textAlign:'center' }}>
          {subheader}
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          sx={{
            opacity: 1.0,
            mb: { xs: 3, xl: 5 },
          }}
        >
          {description}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Card sx={{ height: 60, p: 1, borderRadius: '8px' }}>
              <Grid container
                direction="row"
                justifyContent="center"
                alignItems="center">
                <Grid item sx={4} md={4} sx={{ display: 'flex', justifyContent: 'center' }}><Typography variant='h3' color='primary'>{vacaciones}</Typography></Grid>
                <Grid item sx={8} md={8} sx={{ textAlign: 'left' }}>
                  <Typography variant='subtitle'>Días de vacaciones</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card sx={{ height: 60, p: 1, borderRadius: '8px' }}>
              <Grid container
                direction="row"
                justifyContent="center"
                alignItems="center">
                <Grid item sx={4} md={4} sx={{ display: 'flex', justifyContent: 'center' }}><Typography variant='h3' color='primary'>{personales}</Typography></Grid>
                <Grid item sx={8} md={8} sx={{ textAlign: 'left' }}>
                  <Typography variant='subtitle'>Días personales</Typography>
                </Grid>
              </Grid>
            </Card>
            <Stack sx={{paddingTop:'20px', textAlign:'center'}}>
                          <Typography sx={{ fontWeight: 'bold' }}>Vigencia:</Typography>
                          <Typography>
                              {fechaFinn}
                          </Typography>
                          <Typography
                           
                          >
                              <InfoIcon
                                  aria-owns={open ? 'mouse-over-popover' : undefined}
                                  aria-haspopup="true"
                                  onMouseEnter={handlePopoverOpen}
                                  onMouseLeave={handlePopoverClose}


                              />
                          </Typography>




                          <Popover
                              id="mouse-over-popover"
                              sx={{
                                  pointerEvents: 'none',
                              }}
                              open={open}
                              anchorEl={anchorEl}
                              anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'left',
                              }}
                              transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                              }}
                              onClose={handlePopoverClose}
                              disableRestoreFocus
                          >
                              <Typography sx={{ p: 1 }}>Consulta tu política de vacaciones con RH</Typography>
                          </Popover>



                          

            </Stack>
            
          </Grid>
        </Grid>
        {action && action}
      </Stack>

      {img && img}

      <StyledBg />
    </StyledRoot>
  );
}
Typography.prototype = {
  tituloPrincipal: PropTypes.any,
};

