import { useState } from 'react';
import * as Yup from 'yup';
import { Box } from '@mui/system';

import { Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
// routes
import { PATH_AUTH } from '../../routes/paths';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// components
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { HOST_API_KEY, END_POINT_LOGIN_MULTILOGIN, END_POINT_LOGINRAPIDO, MOSTRAR_LOGIN, TESTIGO } from '../../config-global';
import { useSnackbar } from '../../components/snackbar';
// import { functions } from 'lodash';

// ----------------------------------------------------------------------

export default function AuthLoginForm() {

    console.log(TESTIGO)

    const { login } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('El usuario es requerido'), // .email('Email must be a valid email address'),
    password: Yup.string().required('La contraseña es requerida'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;


  const [submitBTN, setsubmitBTN] = useState(false);
  const [labelError, setlabelError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = async (data) => {
    try {
        setsubmitBTN(true);

        const form = { Email: data.email, Password: data.password }

        const urlEndPoint = HOST_API_KEY + END_POINT_LOGINRAPIDO;
        axios.post(urlEndPoint, form
            ).then(response => {

          if (response.data === "ERROR") {
            setsubmitBTN(false);
            enqueueSnackbar('Usuario o contraseña incorrectos', { variant: 'error' });
            // setlabelError(true)
            // Colocar letrero de error
          } else {
            loginResult(data)
          }

            });

    } catch (error) {
      console.error(error);
      reset();
      setError('afterSubmit', {
        ...error,
        message: error.message,
      });
    }
  };

  function loginResult(data) {
    login(data.email, data.password);
  }

  const mostrarLogin = MOSTRAR_LOGIN === "MOSTRAR";

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

          {mostrarLogin ? 


              <>

      <Stack spacing={5}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

              <RHFTextField
                  name="email"
                  label="Usuario"
                  variant="filled"
                  InputProps={{
                      endAdornment: (
                          <InputAdornment position='end'>
                              <Iconify icon="ri:user-fill" />
                           </InputAdornment>
                      )
                  }}
              />

              <RHFTextField
                  name="password"
                  label="Contraseña"
                  variant="filled"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                      endAdornment: (
                          <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(!showPassword)} edge="start">
                                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                              </IconButton>
                          </InputAdornment>
                      ),
                  }}
        />
      </Stack>

     <Stack alignItems="center" sx={{ my: 2, mt: 3, mb: 3 }}>
        <Link
          component={RouterLink}
          to={PATH_AUTH.resetPassword}
          variant="body2"
          color="primary"
          underline="always"
        >
          ¿Olvidaste tu contraseña?
        </Link>
                  </Stack>

     <LoadingButton
        sx={{marginBottom:2}}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        endIcon={<Iconify icon="material-symbols:arrow-right-alt" edge="end" />}
        loading={submitBTN}
      >
        Ingresar
      </LoadingButton>
              </>

        :<></>}



    </FormProvider>
  );
}



