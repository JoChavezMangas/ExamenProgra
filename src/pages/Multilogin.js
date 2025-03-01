import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Button, Typography, Stack } from '@mui/material';
// assets
import { BookingIllustration, CheckInIllustration, CheckOutIllustration, MaintenanceIllustration, MotivationIllustration, UpgradeStorageIllustration } from '../assets/illustrations';

// ----------------------------------------------------------------------

export default function Multilogin() {
  return (
    <>
      <Helmet>
        <title> Multilogin</title>
      </Helmet>

      <Stack sx={{ alignItems: 'center' }}>
        <Typography variant="h3" paragraph>
          ¡Tu usuario no ha sido encontrado!
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          No pudimos encontrarte en Conecta. Por favor contacta a soporte, mencionando tu correo y el usuario con el que ingresaste.
        </Typography>

        <BookingIllustration sx={{ my: 10, height: 240 }} />

        <Button component={RouterLink} to="/" size="large" variant="contained">
          Ir al login
        </Button>
      </Stack>
    </>
  );
}
