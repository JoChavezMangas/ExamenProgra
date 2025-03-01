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
import DiaInhabilNewEditForm from '../../sections/@dashboard/diaInhabil/DiaInhabilNewEditForm';


// ----------------------------------------------------------------------

export default function CreateDiasInhabiles() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Días Inhábiles</title>
      </Helmet>

      {/* <Container maxWidth={themeStretch ? false : 'lg'}> */}
        <CustomBreadcrumbs
          heading={
            <>Crear Día Inhábil</>
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
            { name: 'Crear Día Inhábil' },
          ]}
          action={<Button component={RouterLink}
            to={PATH_DASHBOARD.diasInhabiles.list}
            variant="contained"
            startIcon={<Iconify icon="ic:round-arrow-back" />}
          >
            Regresar
          </Button>}
        />
        <DiaInhabilNewEditForm />
      {/* </Container> */}
    </>
  );
}
