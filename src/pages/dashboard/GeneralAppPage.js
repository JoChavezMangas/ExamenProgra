import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack, Card, Button, Typography } from '@mui/material';
import es from 'date-fns/locale/es';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// _mock_
import {
  _appFeatured,
  _appAuthors,
  _appInstalled,
  _appRelated,
  _appInvoices,
} from '../../_mock/arrays';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs/CustomBreadcrumbs';
import { useSettingsContext } from '../../components/settings';

// sections
import {
  AppWidget,
  AppWelcomeEmpleados,
  AppWelcome,
  AppFeatured,
  AppNewInvoice,
  AppEventList,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopInstalledCountries,
  AvatarDate,
  AppWelcomeCard,
} from '../../sections/@dashboard/general/app';
// assets
import { SeoIllustration } from '../../assets/illustrations';
// import CalendarioVacaciones from '../components/CalendarioVacaciones';
import { HOST_API_LOCAL, END_POINT_OBTENER_EMPLEADO } from '../../config-global';
import EmpleadoDialog from './EmpleadoDialog';
import { PATH_AUTH } from '../../routes/paths';
import CalendarioVacaciones from '../components/CalendarioVacaciones';

// ----------------------------------------------------------------------

export default function GeneralAppPage() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const theme = useTheme();

  const { themeStretch } = useSettingsContext();
  const name = localStorage.getItem('EmpleadoId');

  const [nombre, setNombre] = useState()
  const [apellidoPaterno, setApellidoPaterno] = useState()

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
      }).catch((error) => {

          if (error.response.status > 300)
          {
              
              logout();
               navigate(PATH_AUTH.login, { replace: true });
          }
          // console.log('algo que podamos identificar', error)
      })
    }
    ObtenerEmpleado()
  })


  return (
    <>
      <Helmet>
        <title>Inicio</title>
      </Helmet>
      {/* <EmpleadoDialog/> */}
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={10}>
          <Grid item xs={12} md={10} >
            <Stack mb={6} mt={4}>
              <AppWelcome
                sx={{ padding: 3 }}
                title='¡Bienvenid@! '
                subtitle={`${nombre} ${apellidoPaterno}`}
                description="Puedes consultar reportes y descargarlos"
                img={
                  <SeoIllustration
                    sx={{
                      p: 3,
                      width: 300,
                      margin: { xs: 'auto', md: 'inherit' },
                    }}
                  />
                }

                 action={
                     <>
                         <Button variant="contained" component={RouterLink} to='/dashboard/reportes/ReportesIndex'>ir a reportes</Button>
                         <br/>
                         { /* <Button variant="contained" component={RouterLink} to='/dashboard/pedidos/PedidosIndex'>Registrar pedidos</Button> */ }
                     </>

                }
              />
            </Stack>

          </Grid>

         
        </Grid>
      </Container>
    </>
  );
}
