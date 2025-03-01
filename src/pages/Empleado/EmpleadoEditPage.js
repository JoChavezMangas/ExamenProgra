import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link as RouterLink, useParams } from 'react-router-dom';
// @mui
import { Backdrop, Box, Button, Card, CircularProgress, Container, Hidden, Icon, Typography } from '@mui/material';
import Iconify from '../../components/iconify/Iconify';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
import { _userList } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
// import EmpleadoNewEditForm from '../../sections/@dashboard/empleado/EmpleadoNewEditForm';
import { HOST_API_LOCAL, END_POINT_OBTENER_EMPLEADO } from '../../config-global';
import EmpleadoNewEditForm from '../../sections/@dashboard/empleado/EmpleadoNewEditForm';
import { setTockenExterno } from '../../auth/utils';
import EmpleadoCaontrasenaEditForm from '../../sections/@dashboard/empleado/EmpleadoCaontrasenaEditForm';
// import { setTockenExterno } from '../../../auth/utils';

// ----------------------------------------------------------------------

export default function EmpleadoEditPage() {
  setTockenExterno();
  const { themeStretch } = useSettingsContext();
  const { name } = useParams();
  const [currentEmpleado, setCurrentEmpleado] = useState();
  const [nombreCompleto, setNombre] = useState()
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar el indicador de progreso


  useEffect(() => {
    // define la función
    async function ObtenerEmpleado() {
      const urlEndPoint = HOST_API_LOCAL + END_POINT_OBTENER_EMPLEADO;
      const AUT = `Bearer ${localStorage.getItem('accessToken')}`
      await axios({
        method: 'get',
        url: urlEndPoint,
        params: {
          Id: name,
          // userName: nombreCompleto,
          busquedaLider: true,
        },
        headers: { 'Authorization': AUT }
      }).then(response => {
          console.log('aqui buscando el NoCuenta', response)
        setNombre(response.data.nombreCompleto)
        setCurrentEmpleado(response.data)
      }).catch(() => {
        // result = "Error";
      })
        .finally(() => {
          setIsLoading(false); // Finaliza el indicador de progreso

        })
    }
    // aquí ejecuta la función
    ObtenerEmpleado()
  }, [name])


  const perfilUsuario = localStorage.getItem('RolId');


  return (
    <>
      <Helmet>
        <title> Empleado</title>
      </Helmet>

      {/* <Container maxWidth={themeStretch ? false : 'lg'}> */}
      <Hidden smDown>
        {perfilUsuario === 'Admin' ? (
          <CustomBreadcrumbs
            heading={
              <>Cambiar contraseña</>
            }
            links={[
              {
                name: 'Inicio',
                href: PATH_DASHBOARD.root,
              },
              {
                name: 'Empleado',
                href: PATH_DASHBOARD.empleados.administrar,
              },
              { name: nombreCompleto },
            ]}
            action={
              <Button
                component={RouterLink}
                to={PATH_DASHBOARD.empleados.administrar}

                variant="contained"
                startIcon={<Iconify icon="ic:round-arrow-back" />}
              >
                Regresar
              </Button>
            }
          />
        ) : (
          <CustomBreadcrumbs
            heading={
              <>Editar empleado</>
            }
            links={[
              {
                name: 'Inicio',
                href: PATH_DASHBOARD.root,
              },
              {
                name: 'Empleado',
                href: PATH_DASHBOARD.empleado.list,
              },
              { name: nombreCompleto },
            ]}
            action={
              <Button
                component={RouterLink}
                to={PATH_DASHBOARD.empleado.list}
                variant="contained"
                startIcon={<Iconify icon="ic:round-arrow-back" />}
              >
                Regresar
              </Button>
            }
          />
        )}
      </Hidden>
      <Hidden smUp>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h2" color='primary'>Editar empleado</Typography>
          <Typography>{nombreCompleto}</Typography>
          <Button component={RouterLink}
            fullWidth
            sx={{ marginBottom: '20px', marginTop: '20px' }}
            to={PATH_DASHBOARD.empleado.list}
            variant="outlined"
            startIcon={<Iconify icon="ic:round-arrow-back" />}
          >
            Regresar
          </Button>
        </Box>
      </Hidden>
      {isLoading ? (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
          <Card sx={{ width: '120px', height: '120px', display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress color="primary" />
          </Card>
        </Backdrop>
      ) : (
        <>
          {perfilUsuario === 'Admin' ? (
            <EmpleadoCaontrasenaEditForm isEdit currentEmpleado={currentEmpleado} />
          ) : (
            <EmpleadoNewEditForm isEdit currentEmpleado={currentEmpleado} />
          )}
        </>
      )}
      {/* </Container> */}
    </>
  );
}
