import { Helmet } from 'react-helmet-async';
// @mui
import { Box, Grid, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
// hooks
import useResponsive from '../hooks/useResponsive';
// sections
import { PaymentSummary, PaymentMethods, PaymentBillingAddress } from '../sections/payment';
import { useAuthContext } from '../auth/useAuthContext';
import { PATH_AFTER_LOGIN } from '../config-global';


// ----------------------------------------------------------------------

export default function PaymentPage() {
    const isDesktop = useResponsive('up', 'md');
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');



    const { loginMulti,login } = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {

        async function loginMultilogin() {
            const miau = loginMulti(token);

            navigate(PATH_AFTER_LOGIN);
        }
        loginMultilogin()
        
    }, [loginMulti, token, navigate]);

    // window.location.href ="dashboard/app"

  return (
    <>
      <Helmet>
        <title> Multilogin...</title>
      </Helmet>

      <Container
        sx={{
          pt: 15,
          pb: 10,
          minHeight: 1,
        }}
      >
        <Typography variant="h3" align="center" paragraph>
                  Cargando...
        </Typography>

        <Typography align="center" sx={{ color: 'text.secondary', mb: 5 }}>
          Por favor espera... 
        </Typography>

        
      </Container>
    </>
  );
}
