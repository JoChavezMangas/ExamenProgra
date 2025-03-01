import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';

// @mui
import { Box, Button, Container, Hidden, Typography } from '@mui/material';
import Iconify from '../../components/iconify/Iconify';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import EmpleadoNewEditForm from '../../sections/@dashboard/empleado/EmpleadoNewEditForm';


// ----------------------------------------------------------------------

export default function EmpleadoCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Empleado</title>
      </Helmet>

      {/* <Container maxWidth={themeStretch ? false : 'lg'}> */}
      <Hidden smDown>
        <CustomBreadcrumbs
          heading={
            <>Crear Nuevo Empleado</>
          }
          links={[
            {
              name: 'Inicio',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Empleado',
              href: PATH_DASHBOARD.empleado.list,
            },
            { name: 'Crear Empleado' },
          ]}

          action={<Button component={RouterLink}
            to={PATH_DASHBOARD.empleado.list}
            variant="contained"
            startIcon={<Iconify icon="ic:round-arrow-back" />}
          >
            Regresar
          </Button>}
        />
      </Hidden>
      <Hidden smUp>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h2" color='primary'>Crear Empleado</Typography>
          <Button component={RouterLink}
            fullWidth
            sx={{ marginBottom: '20px', marginTop: '20px' }}
            to={PATH_DASHBOARD.empleado.list}
            variant="outlined"
            startIcon={<Iconify icon="ic:round-arrow-back" />}
          >
            Regresar
          </Button>
        </Box>
      </Hidden>
      <EmpleadoNewEditForm />
      {/* </Container> */}
    </>
  );
}
