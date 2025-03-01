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
import DiaInhabilNewEditForm from '../../sections/@dashboard/diaInhabil/DiaInhabilNewEditForm';
import Iconify from '../../components/iconify';
import { HOST_API_LOCAL, END_POINT_OBTENER_DIAS_INHABILES } from '../../config-global';



// ----------------------------------------------------------------------

export default function DiasInhabilesEditPage() {
  const { themeStretch } = useSettingsContext();

  const { name } = useParams();

  const [currentDiaInhabil, setCurrentDiaInhabil] = useState()

    useEffect(() => {

        async function ObtenerDiaInhabil() {
            console.log("Se paso por el useEfect")
            const urlEndPoint = HOST_API_LOCAL + END_POINT_OBTENER_DIAS_INHABILES;
            const AUT = `Bearer ${localStorage.getItem('accessToken')}`
            axios({
                method: 'get',
                url: urlEndPoint,
                params: { Id: name },
                headers: { 'Authorization': AUT }
            }).then(response => {
                console.log('este es el response de axios DE EDITAR', response.data)
                setCurrentDiaInhabil(response.data)
            }).catch(() => {
                // result = "Error";
            })
        }

        ObtenerDiaInhabil()

    }
    , [name])

  return (
    <>
      <Helmet>
        <title> Días Inhábiles</title>
      </Helmet>

      {/* <Container maxWidth={themeStretch ? false : 'lg'}> */}
        <CustomBreadcrumbs
          heading={
            <Typography variant='h4' color='primary'>Editar Día Inhábil</Typography>
          }
          links={[
            {
              name: 'Inicio',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Días Inhábiles',
              href: PATH_DASHBOARD.diasInhabiles.list,
            },
            { name: currentDiaInhabil?.nombre },
          ]}
          action={<Button component={RouterLink}
            to={PATH_DASHBOARD.diasInhabiles.list}
            variant="contained"
            startIcon={<Iconify icon="ic:round-arrow-back" />}
          >

            Regresar
          </Button>}
        />

        <DiaInhabilNewEditForm isEdit currentDiaInhabil={currentDiaInhabil} />
      {/* </Container> */}
    </>
  );
}
