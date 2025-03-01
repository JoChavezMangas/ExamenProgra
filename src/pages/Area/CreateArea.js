import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useParams } from 'react-router-dom';
// @mui
import { Button, Container, Typography } from '@mui/material';
import Iconify from '../../components/iconify/Iconify';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import AreaNewEditForm from '../../sections/@dashboard/area/AreaNewEditForm';

// ----------------------------------------------------------------------

export default function AreaCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Área</title>
      </Helmet>

      {/* <Container maxWidth={themeStretch ? false : 'lg'}> */}
        <CustomBreadcrumbs
          heading={
            <>Crear Nueva Área</>
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
            { name: 'Crear Área' },
          ]}
          action={<Button component={RouterLink}
            to={PATH_DASHBOARD.area.list}
            variant="contained"
            startIcon={<Iconify icon="ic:round-arrow-back" />}
          >
            Regresar
          </Button>}
        />
        <AreaNewEditForm />
      {/* </Container> */}
    </>
  );
}
