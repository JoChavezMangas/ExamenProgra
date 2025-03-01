import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useParams } from 'react-router-dom';
// @mui
import { Button, Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Iconify from '../../components/iconify/Iconify';
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import PuestoNewEditForm from '../../sections/@dashboard/puesto/PuestoNewEditForm';


// ----------------------------------------------------------------------

export default function PuestoCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Puesto</title>
      </Helmet>

      {/* <Container maxWidth={themeStretch ? false : 'lg'}> */}
        <CustomBreadcrumbs
          heading={
            <>Crear Puesto</>
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
            { name: 'Crear Puesto' },
          ]}
          action={<Button component={RouterLink}
            to={PATH_DASHBOARD.puesto.list}
            variant="contained"
            startIcon={<Iconify icon="ic:round-arrow-back" />}
          >
            Regresar
          </Button>}
        />
        <PuestoNewEditForm />
      {/* </Container> */}
    </>
  );
}
