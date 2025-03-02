import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// routes
import { PATH_AUTH } from '../../routes/paths';
// layouts
import LoginLayout from '../../layouts/login';
//
import AuthLoginForm from './AuthLoginForm';
import AuthWithSocial from './AuthWithSocial';
import LogoHorizontal from '../../components/logo/LogoHorizontal';

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuthContext();
  return (
    <LoginLayout>
          <Stack spacing={4} sx={{ mb: 6, mt: 11, position: 'relative', ml: { xs: 10, md: 5 } }}>
          <br/>
          <Typography variant="h3" color="primary">Para todos los creditos </Typography>
    
      </Stack>

      <AuthLoginForm />

    </LoginLayout>
  );
}
