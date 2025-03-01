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
import DepartamentoNewEditForm from '../../sections/@dashboard/departamento/DepartamentoNewEditForm';


// ----------------------------------------------------------------------

export default function DepartamentoCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Departamento</title>
      </Helmet>

      {/* <Container maxWidth={themeStretch ? false : 'lg'}> */}
        <CustomBreadcrumbs
          heading={
            <>Crear Departamento</>
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
            { name: 'Crear Departamento' },
          ]}
          action={<Button component={RouterLink}
            to={PATH_DASHBOARD.departamento.list}
            variant="contained"
            startIcon={<Iconify icon="ic:round-arrow-back" />}
          >
            Regresar
          </Button>}
        />
        <DepartamentoNewEditForm />
      {/* </Container> */}
    </>
  );
}
