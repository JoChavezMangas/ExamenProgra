import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { Link as RouterLink, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
// @mui
import { Button, Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
import { _userList } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import AreaNewEditForm from '../../sections/@dashboard/area/AreaNewEditForm';
import Iconify from '../../components/iconify';

import { HOST_API_LOCAL, BEARER_TOKEN, END_POINT_OBTENER_AREA } from '../../config-global';




// ----------------------------------------------------------------------

export default function AreaEditPage() {
  const { themeStretch } = useSettingsContext();

  const { name } = useParams();

  const [currentArea, setcurrentArea] = useState({}) // const currentArea = _userList.find((area) => paramCase(area.name) === name);

  useEffect(() => {

    async function ObtenerArea() {
      const urlEndPoint = HOST_API_LOCAL + END_POINT_OBTENER_AREA;
      const AUT = `Bearer ${localStorage.getItem('accessToken')}`

      axios({
        method: 'get',
        url: urlEndPoint,
        params: { Id: name },
        headers: { 'Authorization': AUT }
      }).then(response => {
        console.log('este es el response de axios', response.data)
        setcurrentArea(response.data)
      }).catch(() => {
        // result = "Error";
      })
    }

    ObtenerArea()


  }
    , [name])




  return (
    <>
      <Helmet>
        <title> Conecta</title>
      </Helmet>

      {/* <Container maxWidth={themeStretch ? false : 'lg'}> */}
        <CustomBreadcrumbs
          heading={
            <Typography variant='h4' color='primary'>Editar Área</Typography>
          }
          links={[
            {
              name: 'Inicio',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Área',
              href: PATH_DASHBOARD.area.list,
            },
            { name: currentArea?.nombre },
          ]}
          action={<Button component={RouterLink}
            to={PATH_DASHBOARD.area.list}
            variant="contained"
            startIcon={<Iconify icon="ic:round-arrow-back" />}
          >
            Regresar
          </Button>}
        />

        <AreaNewEditForm isEdit currentArea={currentArea} />
      {/* </Container> */}
    </>
  );
}
