import PropTypes from 'prop-types';

import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Form, useNavigate, useParams } from 'react-router-dom';
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
import GenericCombo from '../../../utils/GenericCombo';
import Iconify from '../../../components/iconify';
import { AxiosMandarForm, AxiosIdSucces } from '../../../_Axios/AxiosFomr';
import { useAuthContext } from '../../../auth/useAuthContext';
import { END_POINT_CREAR_MULTILOGIN, END_POINT_ACTUALIZAR_USUARIO } from '../../../config-global';

// ----------------------------------------------------------------------


EmpleadoCaontrasenaEditForm.propTypes = {
  isEdit: PropTypes.bool,
  isEditUsuario: PropTypes.bool,
  currentEmpleado: PropTypes.object,
};


export default function EmpleadoCaontrasenaEditForm({ isEdit = false, isEditUsuario = false, currentEmpleado }) {

  const navigate = useNavigate();
  const { user, logout } = useAuthContext();
  const [userName, setUserName] = useState();
    const { name } = useParams();

   const NewEmpleadoSchema = Yup.object().shape({
  //  correoEmpresarial: Yup
  //    .string(),
  //  nuevaContrasena: Yup
  //    .string(),
  //  confirmarContrasena: Yup
  //    .string()
  //    .oneOf([Yup.ref('nuevaContrasena'), null], 'Las contraseñas deben coincidir'),
    nuevoUsuario: Yup
      .string().required('Ingresa el usuario'),
    correo: Yup
      .string().required('Ingresa el correo'),
  //  confirmarUsuario: Yup
  //    .string()
  //    .oneOf([Yup.ref('nuevoUsuario'), null], 'El nombre de usuario debe coincidir'),
   });

  const [defaultValues, setDefaultValues] = useState({
    correoEmpresarial: currentEmpleado?.correoEmpresarial || '',
    userName: currentEmpleado?.userName || '',
    nuevaContrasena: currentEmpleado?.nuevaContrasena || '',
  });

  useEffect(() => {
    setDefaultValues({
      correoEmpresarial: currentEmpleado?.correoEmpresarial || '',
      userName: currentEmpleado?.userName || '',
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

    const [nombreUsuario, setNombreUsuario]=useState("")
    const [correoUsuario, setCorreoUsuario]=useState("")

    const onSubmitUsuario = async (data) => {
        // console.log('el name', name, 'el data', data, 'nombre', nombreUsuario, 'correoUsuario', correoUsuario)
        const form = new FormData();
        form.append('userId', name)
        form.append('userName', data.nuevoUsuario)
        form.append('userEmail', data.correo)

        AxiosMandarForm(form, END_POINT_ACTUALIZAR_USUARIO, succesfunc, errorFunc);
    }

    const CrearMulti = async () => {
        console.log('el name', name)
        AxiosIdSucces(name, END_POINT_CREAR_MULTILOGIN, succesfuncMulti)
    }


    // const onSubmit = async (data) => {
    //    const form = new FormData();
    //    form.append('userId', data.nombre)
    //    form.append('userName', data.nombre)
    //    form.append('userEmail', data.nombre)
    //    AxiosMandarForm(form, END_POINT_ACTUALIZAR_USUARIO, succesfunc, errorFunc);
    // }

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const succesfuncMulti = (data) => {
        setDisabled(true);
        setMostrarBotonEditar(true);

        if (data.status === "OK") {
            const msj = `El empleado ha sido creado en multilogin. Usuario: ${data.userName}`
            enqueueSnackbar(msj);
            // enqueueSnackbar(data.userName);
            navigate(PATH_DASHBOARD.empleados.administrar);
        } else {
            enqueueSnackbar(data.message, { variant: 'error' })
        }
    }

    const succesfunc = (data) => {
        setDisabled(true);
        setMostrarBotonEditar(true);

        console.log(data)
        if (data === "OK")
            enqueueSnackbar("El usuario se actualizo en la base de  conecta");
        else
            enqueueSnackbar("Por favor, verifica el usuario y correo", { variant: 'error' })
    };
  const errorFunc = () => {
    const snackbar = enqueueSnackbar("Por favor verifica los datos", { variant: 'error' });
    setTimeout(() => {
      closeSnackbar(snackbar);
    }, 1000);
  }

  const [disabled, setDisabled] = useState({
    contrasena: isEdit,
    usuario: isEditUsuario,
  });
  const [mostrarBotonEditar, setMostrarBotonEditar] = useState(isEdit);
  const [mostrarBotonEditarUsuario, setmostrarBotonEditarUsuario] = useState(isEdit);

  return (
      <>
          {/*
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} sx={{ pb: 3 }}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>

              <Box
                rowGap={3}
                columnGap={3}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(3, 1fr)',
                }}
              >
                <RHFTextField
                  disabled
                  type="text"
                  name="correoEmpresarial"
                  label='Correo Empresarial'
                  value={defaultValues.correoEmpresarial}
                />
                <RHFTextField disabled={disabled.contrasena} type="password" name="nuevaContrasena" label="Nueva Contraseña" />
                <RHFTextField disabled={disabled.contrasena} type="password" name="confirmarContrasena" label="Confirmar Contraseña" />
              </Box>
              <Grid container direction="row" justifyContent="flex-end" sx={{ paddingTop: '20px' }}>
                <Grid item>
                  {mostrarBotonEditar ?
                    null :
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                      Guardar Cambios
                    </LoadingButton>
                  }

                  {mostrarBotonEditar ?
                    <LoadingButton onClick={() => { setDisabled({ ...disabled, contrasena: false }); setMostrarBotonEditar(false); }}>
                      <Iconify icon="eva:edit-fill" /> Editar
                    </LoadingButton> :
                    null
                  }
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
          */ }






      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitUsuario)}>
        <Grid container spacing={3} sx={{ pb: 3 }}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Grid container direction='row' justifyContent='space-between'>
                <Grid item>
                  <Typography variant='h6' color='primary' sx={{ pb: 3 }}>Cambiar Usuario</Typography>
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
                <RHFTextField disabled type="text" name="usuario" label="Usuario Actual" value={defaultValues.userName} />
                <RHFTextField disabled type="text" name="correoEmpresarial" label='Correo Empresarial'value={defaultValues.correoEmpresarial}/>

                              <RHFTextField disabled={disabled.usuario} type="text" name="nuevoUsuario"   label="Nuevo Usuario" />
                              <RHFTextField disabled={disabled.usuario} type="text" name="correo"  label="Nuevo Correo" />
              </Box>
              <Grid container direction="row" justifyContent="flex-end" sx={{ paddingTop: '20px' }}>
                <Grid item>
                  {mostrarBotonEditarUsuario ?
                    null :
                    <Stack spacing={2} direction="row" justifyContent="flex-end" sx={{ pt: 2 }}>
                        <LoadingButton type="submit" variant="contained" color='primary' loading={isSubmitting}>
                            Actualizar solo en conecta
                        </LoadingButton>
                        <LoadingButton variant="contained" loading={isSubmitting} onClick={() => CrearMulti() }>
                            Crear empleado en multilogin
                        </LoadingButton>
                    </Stack>
                  }

                  {mostrarBotonEditarUsuario ?
                    <LoadingButton onClick={() => { setDisabled({ ...disabled, usuario: false }); setmostrarBotonEditarUsuario(false); }}>
                      {/* <LoadingButton onClick={() => { setDisabled(false); setmostrarBotonEditarUsuario(false); }}> */}
                      <Iconify icon="eva:edit-fill" /> Editar
                    </LoadingButton> :
                    null
                  }
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
