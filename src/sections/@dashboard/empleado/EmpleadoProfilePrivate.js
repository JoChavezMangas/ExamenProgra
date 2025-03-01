import PropTypes from 'prop-types';

import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Form, useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { DatePicker } from '@mui/x-date-pickers';
// // utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_AUTH, PATH_DASHBOARD } from '../../../routes/paths';
// // assets
// import { countries } from '../../../assets/data';
// // components
import Label from '../../../components/label';
import FormProvider, {
  RHFSelect,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadPhoto,

} from '../../../components/hook-form';
import { HOST_API_LOCAL, END_POINT_EDITAR_EMPLEADO } from '../../../config-global';
import GenericCombo from '../../../utils/GenericCombo';
import Iconify from '../../../components/iconify';
import { AxiosCambiarPassword } from '../../../_Axios/AxiosFomr';
import { useAuthContext } from '../../../auth/useAuthContext';

// ----------------------------------------------------------------------


EmpleadoProfilePrivate.propTypes = {
  isEdit: PropTypes.bool,
  currentEmpleado: PropTypes.object,
};


export default function EmpleadoProfilePrivate({ isEdit = false, currentEmpleado }) {

  const navigate = useNavigate();
  const { user, logout } = useAuthContext();
  const [userName, setUserName]= useState();
  
  const NewEmpleadoSchema = Yup.object().shape({
    correoEmpresarial: Yup
      .string(),
    nuevaContrasena: Yup
      .string(),
    confirmarContrasena: Yup
      .string()
      .oneOf([Yup.ref('nuevaContrasena'), null], 'Las contraseñas deben coincidir'),
  });

  const [defaultValues, setDefaultValues] = useState({
    correoEmpresarial: currentEmpleado?.correoEmpresarial || '',
    nuevaContrasena: currentEmpleado?.nuevaContrasena || '',
  });
  
  useEffect(() => {
    setDefaultValues({
      correoEmpresarial: currentEmpleado?.correoEmpresarial ||'',
      nuevaContrasena: currentEmpleado?.nuevaContrasena || '',
    });
  }, [currentEmpleado]);
  

  const methods = useForm({
    resolver: yupResolver(NewEmpleadoSchema),
    defaultValues,
  });
  
  // ...
  
  
  const {
    control,
    watch,
    setValue,
    getValues,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const succesfunc = () => {
    const snackbar = enqueueSnackbar("Se envió una respuesta a tu correo electrónico", { variant: 'success' });

    setTimeout(() => {
      closeSnackbar(snackbar);
      logout();
    navigate(PATH_AUTH.login, { replace: true });
    }, 1800);
  };

  const onSubmit = async (data) => {

    console.log("el console.log", data)

    try {

        AxiosCambiarPassword(defaultValues.correoEmpresarial, data.contrasena, data.nuevaContrasena, succesfunc, errorFunc)

    } catch (error) {
      console.error(error);
    };
  }

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();


  const errorFunc = () => {
    const snackbar = enqueueSnackbar("Por favor verifica tu usuario", { variant: 'error' });
    setTimeout(() => {
      closeSnackbar(snackbar);
    }, 1000);
  }
 
  const [disabled, setDisabled] = useState(isEdit);
  const [mostrarBotonEditar, setMostrarBotonEditar] = useState(isEdit);


  return (
    <>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} sx={{ pb: 3 }}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Grid container direction='row' justifyContent='space-between'>
              <Grid item>
                <Typography variant='h6' color='primary' sx={{ pb: 3 }}>Cambiar Contraseña</Typography>
              </Grid>
              <Grid item>
                {mostrarBotonEditar ?
                  null :
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Guardar Cambios
                  </LoadingButton>
                }

                {mostrarBotonEditar ?
                  <LoadingButton onClick={() => { setDisabled(false); setMostrarBotonEditar(false); }}>
                    <Iconify icon="eva:edit-fill" /> Editar
                  </LoadingButton> :
                  null
                }
              </Grid>
            </Grid>
            <Box
              rowGap={3}
              columnGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 2fr)',
              }}
            >
              <RHFTextField
                disabled
                type="text"
                name="correoEmpresarial"
                label='Correo Empresarial'
                value={defaultValues.correoEmpresarial}
              />              
              <RHFTextField disabled={disabled} type="password" name="contrasena" label="Contraseña Actual"/>
              <RHFTextField disabled={disabled} type="password" name="nuevaContrasena" label="Nueva Contraseña"/>
              <RHFTextField disabled={disabled} type="password" name="confirmarContrasena" label="Nueva Contraseña"/>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>


</>
  );
}
