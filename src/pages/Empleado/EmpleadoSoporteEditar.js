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
import { HOST_API_LOCAL, END_POINT_OBTENER_EMPLEADO } from '../../config-global';
import EmpleadoSoporte from '../../sections/@dashboard/empleado/EmpleadoSoporte';
import { setTockenExterno } from '../../auth/utils';


// ----------------------------------------------------------------------

export default function EmpleadoSoporteEditar() {
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
          busquedaLider: true,
        },
        headers: { 'Authorization': AUT }
      }).then(response => {
        console.log('aqui buscando el NoCuenta', response)
        setNombre(response.data.nombreCompleto)
        setCurrentEmpleado(response.data)
      }).catch(() => {
      })
        .finally(() => {
          setIsLoading(false);
        })
    }
    ObtenerEmpleado()
  }, [name])


  const perfilUsuario = localStorage.getItem('RolId');


  return (
    <>
      <Helmet>
        <title> Empleado</title>
      </Helmet>

      <CustomBreadcrumbs
        heading={
          <>Editar Datos de Soporte</>
        }
        links={[
          {
            name: 'Inicio',
            href: PATH_DASHBOARD.root,
          },
          {
            name: 'Empleados',
            href: PATH_DASHBOARD.empleadoSoporte.list,
          },
          { name: nombreCompleto },
        ]}
        action={
          <Button
            component={RouterLink}
            to={PATH_DASHBOARD.empleadoSoporte.list}
            variant="contained"
            startIcon={<Iconify icon="ic:round-arrow-back" />}
          >
            Regresar
          </Button>
        }
      />


      {isLoading ? (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
          <Card sx={{ width: '120px', height: '120px', display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress color="primary" />
          </Card>
        </Backdrop>
      ) : (
        <>
          <EmpleadoSoporte currentEmpleado={currentEmpleado} />

        </>
      )}
    </>
  );
}
