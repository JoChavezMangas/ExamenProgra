import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
// import { useParams } from 'react-router-dom';
import { Link as RouterLink, useParams } from 'react-router-dom';
// @mui
import { Container, Button, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
import { ReturnSome, _dataList,  } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import EmpresaNewEditForm from '../../sections/@dashboard/empresa/EmpresaNewEditForm';
// import Button from '../../sections/_examples/extra/animate/other/Button';
import Iconify from '../../components/iconify';
import { HOST_API_LOCAL,  END_POINT_OBTENER_EMPRESA } from '../../config-global';


// ----------------------------------------------------------------------

export default function EmpresaEditPage() {
  const { themeStretch } = useSettingsContext();

    const { name } = useParams();
    // console.log('este es el valor de name',name);
    const [currentEmpresa, setCurrentEmpresa] = useState({ RazonSocial: 'empresa de gatos' }) // _dataList.find((empresa) => paramCase(empresa.id) === name);

    useEffect(() => {

        async function ObtenerEmpresa() { 
            console.log("Se paso por el useEfect")
            setCurrentEmpresa({ RazonSocial: 'de clase mundial' })
            const urlEndPoint = HOST_API_LOCAL + END_POINT_OBTENER_EMPRESA;
            const AUT = `Bearer ${localStorage.getItem('accessToken')}`
            axios({
                method: 'get',
                url: urlEndPoint,
                params: { Id: name },
                headers: { 'Authorization': AUT }
             }).then(response => {
                console.log('este es el response de axios', response.data)
                setCurrentEmpresa(response.data)
             }).catch(() => {
                // result = "Error";
            })
        }
        
        ObtenerEmpresa()
        
    }, [name]);



  return (
    <>
      <Helmet>
        <title> Empresa</title>
      </Helmet>
      {/* <Container maxWidth={themeStretch ? false : 'lg'}> */}
        <CustomBreadcrumbs
          heading={
            <>Editar empresa</>
          }

          links={[
            {
              name: 'Inicio',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Empresa',
              href: PATH_DASHBOARD.empresa.list,
            },
            { name: currentEmpresa?.razonSocialFiltro
            },
          ]}

          action={<Button component={RouterLink}
            to={PATH_DASHBOARD.empresa.list}
            variant="contained"
            startIcon={<Iconify icon="ic:round-arrow-back" />}
          >

            Regresar
          </Button>}

        />

              <EmpresaNewEditForm isEdit currentEmpresa={currentEmpresa} />
      {/* </Container> */}
    </>
  );
}

