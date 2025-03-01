import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// @mui
import { Avatar, Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
//
import ProfileAbout from './ProfileAbout';
import ProfilePostCard from './ProfilePostCard';
import ProfilePostInput from './ProfilePostInput';
import ProfileFollowInfo from './ProfileFollowInfo';
import ProfileCard from './ProfileCard';
// components
import Iconify from '../../../../../components/iconify';
import MisPares from '../MisPares';
import Lider from '../Lider';
import { HOST_API_LOCAL, END_POINT_OBTENER_EMPLEADO } from '../../../../../config-global';
import MeReportan from '../MeReportan';

// ----------------------------------------------------------------------

Profile.propTypes = {
  info: PropTypes.object,
  posts: PropTypes.array,

};

export default function Profile({ info, posts }) {
  const nameJefe = 'Silvia Ramírez';
  const avatarUrl = 'info.com';
  const cargo = 'Gerente de Desarrollo';


  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <ProfileAbout />
      </Grid>

      <Grid item xs={12} md={8}>
        <Typography variant="h6" sx={{ my: 3 }} color='primary'>
          Mi equipo
        </Typography>

        <Lider />
        <MisPares />
        <MeReportan />
      </Grid>
    </Grid>
  );
}
