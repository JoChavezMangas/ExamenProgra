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
import BancoNewEditForm from '../../sections/@dashboard/banco/BancoNewEditForm';

// ----------------------------------------------------------------------

export default function BancoCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>Banco</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={
            <>Registrar Banco</>
          }
          links={[
            {
              name: 'Inicio',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Banco',
              href: PATH_DASHBOARD.banco.list,
            },
            { name: 'Registrar Banco' },
          ]}
          action={<Button component={RouterLink}
            to={PATH_DASHBOARD.banco.list}
            variant="contained"
            startIcon={<Iconify icon="ic:round-arrow-back" />}
          >
            Regresar
          </Button>}
        />
        <BancoNewEditForm />
      </Container>
    </>
  );
}
