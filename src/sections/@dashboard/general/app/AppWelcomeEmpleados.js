import { Link as RouterLink, useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Stack, Grid, Card, Button, Link } from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Iconify from '../../../../components/iconify/Iconify';

import { RHFTextField } from '../../../../components/hook-form';
import { END_POINT_CREAR_SOLICITUD, END_POINT_OBTENER_DATOS_TABLERO, HOST_API_KEY, HOST_API_LOCAL } from '../../../../config-global';

// utils
import { bgGradient } from '../../../../utils/cssStyles';
import { PATH_DASHBOARD } from '../../../../routes/paths';

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

AppWelcomeEmpleados.propTypes = {
  img: PropTypes.node,
  action: PropTypes.node,
  title: PropTypes.string,
  subheader: PropTypes.string,
  description: PropTypes.string,
};

export default function AppWelcomeEmpleados({ title, subheader, description, action, img, ...other }) {

  return (
    <StyledRoot {...other}>
      <Stack sx={{textAlign:'center'}}>
        <Typography paragraph variant="h4" sx={{ color: "#1f9382" }}>
          {title}
        </Typography>
        <Typography paragraph variant="h6" sx={{ color: "#051341" }}>
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
            <Grid container
              direction="row"
              justifyContent="center"
              alignItems="center">
              <Grid item xs={12} md={12}>
                <Button variant='contained' color='success' size='medium' fullWidth
                component={RouterLink} to='/dashboard/empleado/list'
                sx={{ 
                      backgroundColor:'#1f9382',
                      color:'#fff',
                      textTransform:'uppercase',
                      ":hover": {
                        background:'#fff',
                        color: '#1f9382',
                        borderColor:'#1f9382',
                      }, }}>
                  <Grid item  sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Iconify icon="ci:users"/>
                    <Typography variant='subtitle'>&nbsp;Conoce a tu personal</Typography>
                  </Grid>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid container
              direction="row"
              justifyContent="center"
              alignItems="center">
              <Grid item sx={12} md={12} >
                <Button variant='contained' color='primary' size='medium' fullWidth
                component={RouterLink} to='/dashboard/empleado/new'
                sx={{ 
                      backgroundColor:'#fff',
                      color:'#005249',
                      textTransform:'uppercase',
                      marginBottom:'20px',
                      ":hover": {
                        background:'#1f9382',
                        color: '#fff',
                      }, }}>
                  <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Iconify icon="ci:user-add"/>
                    <Typography variant='subtitle'>&nbsp;Crear un nuevo empleado</Typography>
                  </Grid>
                </Button>
              </Grid>
            </Grid>
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

