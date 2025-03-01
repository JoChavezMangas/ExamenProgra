import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
// @mui
import { Button, Container, Typography } from '@mui/material';
import axios from 'axios';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
import { _userList } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import PuestoNewEditForm from '../../sections/@dashboard/puesto/PuestoNewEditForm';
import Iconify from '../../components/iconify';
import { HOST_API_LOCAL, BEARER_TOKEN, END_POINT_OBTENER_PUESTO } from '../../config-global';



// ----------------------------------------------------------------------

export default function PuestoEditPage() {
  const { themeStretch } = useSettingsContext();

  const { name } = useParams();

  const [currentPuesto, setCurrentPuesto] = useState()

    useEffect(() => {

        async function ObtenerPuesto() {
            console.log("Se paso por el useEfect")
            const urlEndPoint = HOST_API_LOCAL + END_POINT_OBTENER_PUESTO;
            const AUT = `Bearer ${localStorage.getItem('accessToken')}`
            axios({
                method: 'get',
                url: urlEndPoint,
                params: { Id: name },
                headers: { 'Authorization': AUT }
            }).then(response => {
                console.log('este es el response de axios DE EDITAR', response.data)
                setCurrentPuesto(response.data)
            }).catch(() => {
                // result = "Error";
            })
        }

        ObtenerPuesto()

    }
    , [name])

  return (
    <>
      <Helmet>
        <title> Puesto</title>
      </Helmet>

      {/* <Container maxWidth={themeStretch ? false : 'lg'}> */}
        <CustomBreadcrumbs
          heading={
            <Typography variant='h4' color='primary'>Editar puesto</Typography>
          }
          links={[
            {
              name: 'Inicio',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Puesto',
              href: PATH_DASHBOARD.puesto.list,
            },
            { name: currentPuesto?.nombre },
          ]}
          action={<Button component={RouterLink}
            to={PATH_DASHBOARD.puesto.list}
            variant="contained"
            startIcon={<Iconify icon="ic:round-arrow-back" />}
          >

            Regresar
          </Button>}
        />

        <PuestoNewEditForm isEdit currentPuesto={currentPuesto} />
      {/* </Container> */}
    </>
  );
}
