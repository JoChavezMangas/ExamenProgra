import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Link, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
// sections
import AuthResetPasswordForm from '../../sections/auth/AuthResetPasswordForm';
// assets
import { PasswordIcon } from '../../assets/icons';

// ----------------------------------------------------------------------

export default function ResetPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Recuperar contraseña</title>
      </Helmet>

      <PasswordIcon sx={{ mb: 4, height: 96 }} />

      <Typography variant="h4" paragraph>
        ¿Olvidaste tu contraseña?
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 4 }}>
        Por favor, ingresa tu correo electrónico para recuperar tu contraseña
      </Typography>

      <AuthResetPasswordForm />

      <Link
        component={RouterLink}
        to={PATH_AUTH.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          mt: 2,
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:chevron-left-fill" width={16} />
        Regresar
      </Link>
    </>
  );
}
