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
import DepartamentoNewEditForm from '../../sections/@dashboard/departamento/DepartamentoNewEditForm';
import Iconify from '../../components/iconify';
import { HOST_API_LOCAL, BEARER_TOKEN, END_POINT_OBTENER_DEPARTAMENTO } from '../../config-global';



// ----------------------------------------------------------------------

export default function DepartamentoEditPage() {
  const { themeStretch } = useSettingsContext();

  const { name } = useParams();

  const [currentDepartamento, setCurrentDepartamento] = useState()

    useEffect(() => {

        async function ObtenerDepartamento() {
            console.log("Se paso por el useEfect")
            const urlEndPoint = HOST_API_LOCAL + END_POINT_OBTENER_DEPARTAMENTO;
            const AUT = `Bearer ${localStorage.getItem('accessToken')}`
            axios({
                method: 'get',
                url: urlEndPoint,
                params: { Id: name },
                headers: { 'Authorization': AUT }
            }).then(response => {
                console.log('este es el response de axios', response.data)
                setCurrentDepartamento(response.data)
            }).catch(() => {
                // result = "Error";
            })
        }

        ObtenerDepartamento()

    }
    , [name])

  return (
    <>
      <Helmet>
        <title> Departamento</title>
      </Helmet>

      {/* <Container maxWidth={themeStretch ? false : 'lg'}> */}
        <CustomBreadcrumbs
          heading={
            <Typography variant='h4' color='primary'>Editar Departamento</Typography>
          }
          links={[
            {
              name: 'Inicio',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Departamento',
              href: PATH_DASHBOARD.departamento.list,
            },
            { name: currentDepartamento?.nombre },
          ]}
          action={<Button component={RouterLink}
            to={PATH_DASHBOARD.departamento.list}
            variant="contained"
            startIcon={<Iconify icon="ic:round-arrow-back" />}
          >

            Regresar
          </Button>}
        />

        <DepartamentoNewEditForm isEdit currentDepartamento={currentDepartamento} />
      {/* </Container> */}
    </>
  );
}
