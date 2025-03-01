import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useParams } from 'react-router-dom';
// @mui
import { Button, Container, Typography, } from '@mui/material';
import Iconify from '../../components/iconify/Iconify';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import EmpresaNewEditForm from '../../sections/@dashboard/empresa/EmpresaNewEditForm';

// ----------------------------------------------------------------------

export default function EmpresaCreatePage() {
  const { themeStretch } = useSettingsContext();
  const currentEmpresa = {};
  return (
    <>
      <Helmet>
        <title> Empresa</title>
      </Helmet>

      {/* <Container maxWidth={themeStretch ? false : 'lg'}> */}
        <CustomBreadcrumbs
          heading={
            <>Crear Empresa</>
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
            { name: 'Crear Empresa' },
          ]}
          action={<Button component={RouterLink}
            to={PATH_DASHBOARD.empresa.list}
            variant="contained"
            startIcon={<Iconify icon="ic:round-arrow-back" />}
          >
            Regresar
          </Button>}
        />
        <EmpresaNewEditForm currentEmpresa={currentEmpresa} />
      {/* </Container> */}
    </>
  );
}
