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
import { Box, Button, Card, Grid, Stack, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

// // utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

// // components
import Label from '../../../components/label';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadPhoto,

} from '../../../components/hook-form';
import { HOST_API_LOCAL, END_POINT_CREAR_EPLEADO, END_POINT_EDITAR_EMPLEADO } from '../../../config-global';
import GenericCombo from '../../../utils/GenericCombo';
import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------


EmpleadoDialogForm.propTypes = {
  isEdit: PropTypes.bool,
  currentEmpleado: PropTypes.object,
};


export default function EmpleadoDialogForm({ isEdit = false, currentEmpleado }) {

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const NewEmpleadoSchema = Yup.object().shape({
    nombre: Yup
      .string()
      .required('Ingrese nombre')
      .min(1, "Debe tener como mínimo 2 caracteres").max(20)
      .matches(/^[aA-zZ\s]+$/, "Sólo letras"),

    segundoNombre: Yup
      .string()
      .required('Ingrese apellido paterno')
      .min(1, "Debe tener como mínimo 2 caracteres").max(20)
      .matches(/^[aA-zZ\s]+$/, "Sólo letras"),

    fechaNacimiento: Yup
      .string()
      .required('Ingrese fecha de nacimiento'),

    // telefonoMovil: Yup
    // .string()
    // .required('Ingrese número')
    // .min(10,"Debe tener como mínimo 10 caracteres").max(12)
    // .matches(/[0-9]|\./, 
    // "Ingresa un número válido"
    // ),

    rfc: Yup
      .string()
      .required('Ingrese RFC')
      .max(13)
      .matches(/^[A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z]?[0-9]?[0-9]?$/,
        "Ingrese un RFC válido"),

    curp: Yup
      .string()
      .required('Ingrese CURP')
      .min(18, "Debe tener como mínimo 18 caracteres").max(18, "Debe tener como máximo 18 caracteres")
      .matches(/^[A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9]$/, "Ingrese un CURP válido"),

    nss: Yup
    .string()
    .required('Ingrese NSS')
    .min(11, "Debe tener como mínimo 11 caracteres").max(11)
    .matches(/^(\d{2})(\d{2})(\d{2})\d{5}$/,"Ingrese un NSS válido"),

    // salary: Yup
    // .string()
    // .required('Ingrese salario')
  });

  const [defaultValues, setDefaultValues] = useState(
    {
      nombre: currentEmpleado?.nombre || '',
      segundoNombre: currentEmpleado?.segundoNombre || '',
      apellidoPaterno: currentEmpleado?.apellidoPaterno || '',
      apellidoMaterno: currentEmpleado?.apellidoMaterno || '',
      rfc: currentEmpleado?.rfc || '',
      curp: currentEmpleado?.curp || '',
      sexo: currentEmpleado?.sexo || '',
      fechaNacimiento: currentEmpleado?.fechaNacimiento || '',
      sueldoDiario: currentEmpleado?.sueldoDiario || '',
      sueldoDiarioIntegrado: currentEmpleado?.sueldoDiarioIntegrado || '',
      correoEmpresarial: currentEmpleado?.correoEmpresarial || '',
      correoPersonal: currentEmpleado?.correoPersonal || '',
      areaId: currentEmpleado?.areaId || '',
      puestoId: currentEmpleado?.puestoId || '',
      rolId: currentEmpleado?.rolId || '',
    }
  )

  const methods = useForm({
    resolver: yupResolver(NewEmpleadoSchema),
    defaultValues,
  });

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

  useEffect(() => {
    if (isEdit && currentEmpleado) {
      setempresaValor(currentEmpleado?.empresaId || 0)
      setAreaValor(currentEmpleado?.areaId || 0)
      setPuestoValor(currentEmpleado?.puestoId || 0)
      setfiltroValorArea(currentEmpleado?.empresaId || 0)
      setfiltroValorPuesto(currentEmpleado?.areaId || 0)
      setRolValor(currentEmpleado?.rolId || 0)
      reset(currentEmpleado);
    }
  }, [isEdit, currentEmpleado, reset, setDefaultValues]);

  // Metodo de submit
  const onSubmit = async (data) => {
    try {
      const form = new FormData();
      // const fecha = data.FechaNacimientoStringAUX.toString();
      const urlEndPoint = isEdit ? HOST_API_LOCAL + END_POINT_EDITAR_EMPLEADO : HOST_API_LOCAL + END_POINT_CREAR_EPLEADO;
      const empleadoId = isEdit ? data.id : 0;
      const AUT = `Bearer ${localStorage.getItem('accessToken')}`
      // Object.entries(data).map(([key, value]) => form.append(key, value));

      form.append('Nombre', data.nombre)
      form.append('SegundoNombre', data.segundoNombre)
      form.append('ApellidoPaterno', data.apellidoPaterno)
      form.append('ApellidoMaterno', data.apellidoMaterno)

      form.append('rfc', data.rfc)
      form.append('curp', data.curp)
      form.append('sexo', data.sexo)

      form.append('sueldoDiario', data.sueldoDiario)
      form.append('sueldoDiarioIntegrado', data.sueldoDiarioIntegrado)
      form.append('correoPersonal', data.correoPersonal)
      form.append('correoEmpresarial', data.correoEmpresarial)

      form.append('puestoId', data.puestoId)
      form.append('rolId', data.rolId)
      form.append('id', empleadoId)


      const editado = typeof data.fechaNacimiento;
      if (editado === "object") {
        console.log('en el if')
        form.append('FechaNacimiento', data.fechaNacimiento.toJSON());
      }
      else {
        console.log('en el else')
        console.log(data.fechaNacimiento)
        form.append('FechaNacimiento', data.fechaNacimiento.toJSON())
      }

      axios({
        method: 'post',
        url: urlEndPoint,
        data: form,
        accept: 'application/json',
        contentType: false,
        procesData: false,
        headers: { 'Authorization': AUT }
      }).then(response => {
        if (response.data === "OK")
          enqueueSnackbar(!isEdit ? '¡El empleado fue creado!' : '¡Sus cambios fueron actualizados!');
        else
          enqueueSnackbar(response.data);
      });

    } catch (error) {
      console.error(error);
    }
  };

  // Metodo para colocar la imagen
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  // Metodo para validare que solo se coloquen numeros
  const handleKeyPressNumber = (e) => {
    const key = e.key;
    const regex = /[0-9]|\./;
    if (!regex.test(key)) {
      e.preventDefault();
    }
    else {
      console.log("You pressed a key: ".key);
    }
  };
  // Metodo para validare que solo se coloquen letras
  const handleKeyPressLetter = (e) => {
    const key = e.key;
    const regex = /^[aA-zZ\s]+$/;
    if (!regex.test(key)) {
      e.preventDefault();
    }
    else {
      console.log("You pressed a key: ".key);
    }
  };

  const [filtroValorArea, setfiltroValorArea] = useState(0)
  const [filtroValorPuesto, setfiltroValorPuesto] = useState(0)
  const [empresaValor, setempresaValor] = useState(0)
  const [areaValor, setAreaValor] = useState(0)
  const [puestoValor, setPuestoValor] = useState(0)
  const [rolValor, setRolValor] = useState(0)
  const [disabled, setDisabled] = useState(isEdit);
  const [mostrarBotonEditar, setMostrarBotonEditar] = useState(isEdit);

  const changeFuncEmpresa = (param) => {
    setfiltroValorArea(param);
    setfiltroValorPuesto(0);
  }
  const changeFuncArea = (param) => {
    setfiltroValorPuesto(param);
  }
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} sx={{ paddingBottom: 3 }}>
        <Grid item xs={12} md={12}>
          <Card sx={{ padding: 3 }}>
            <Grid container direction='row' justifyContent='space-between'>
              <Grid item>
                <Typography color='primary' sx={{ paddingBottom: 3 }}>Datos personales</Typography>
              </Grid>
            </Grid>
            <Box
              rowGap={3}
              columnGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >
              <RHFTextField disabled={disabled} type="text" name="nombre" label="Nombre" onKeyPress={(e) => handleKeyPressLetter(e)}/>
              <RHFTextField disabled={disabled} name="segundoNombre" label="Segundo nombre" onKeyPress={(e) => handleKeyPressLetter(e)}/>
              <RHFTextField disabled={disabled} name="apellidoPaterno" label="Apellido paterno" onKeyPress={(e) => handleKeyPressLetter(e)}/>
              <RHFTextField disabled={disabled} name="apellidoMaterno" label="Apellido materno" onKeyPress={(e) => handleKeyPressLetter(e)}/>
              <Controller name="fechaNacimiento" render={({ field, fieldState: { error } }) => (
                <DatePicker {...field} label="Fecha de nacimiento" disabled={disabled} inputFormat="dd/MM/yyyy" renderInput={(params) => (
                  <TextField fullWidth {...params} error={!!error} helperText={error?.message} />
                )}
                />
              )}
              />
              <RHFRadioGroup row name="sexo" label="Género legal"
                options={[
                  { label: 'Hombre', value: 'Hombre' },
                  { label: 'Mujer', value: 'Mujer' },
                ]}
                disabledParam={disabled}
              />
              <RHFTextField disabled={disabled} name="curp" label="CURP" />

              <GenericCombo
                endPointURL="https://localhost:7217/api/Empresa/ObtenerListaEmpresas"
                nameAUX="nacionalidad"
                label="Nacionalidad"
                placeholder="Nacionalidad"
                valorFiltro="0"
                disabled={disabled}
              />
              <RHFTextField type="phone" name="telefonoFijo" label="Teléfono fijo" onKeyPress={(e) => handleKeyPressNumber(e)} />
              <RHFTextField name="telefonoMovil" label="Teléfono móvil" onKeyPress={(e) => handleKeyPressNumber(e)} />
              <RHFTextField disabled={disabled} name="correoPersonal" label="Correo personal" />
              <GenericCombo
                endPointURL="https://localhost:7217/api/Empresa/ObtenerListaEmpresas"
                nameAUX="estadoCivil"
                label="Estado Civil"
                placeholder="Estado Civil"
                valorFiltro="0"
                disabled={disabled}
              />

              <GenericCombo
                endPointURL="https://localhost:7217/api/Empresa/ObtenerListaEmpresas"
                nameAUX="nivelEstudios"
                label="Nivel de estudios"
                placeholder="Nivel de estudios"
                valorFiltro="0"
                disabled={disabled}
              />


            </Box>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ paddingBottom: 3 }}>
        <Grid item xs={12} md={12}>
          <Card sx={{ padding: 3 }}>
            <Grid container direction='row' justifyContent='space-between'>
              <Grid item>
                <Typography color='primary' sx={{ paddingBottom: 3 }}>Dirección</Typography>
              </Grid>
            </Grid>
            <Box
              rowGap={3}
              columnGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >

              <GenericCombo
                endPointURL=""
                nameAUX="pais"
                label="País"
                placeholder="País"
                disabled={disabled}
                valorFiltro="0"
              // onChangeFunc={setAreaValor}
              />
              <GenericCombo
                endPointURL=""
                nameAUX="estado"
                label="Estado"
                placeholder="Estado"
                disabled={disabled}
                valorFiltro="0"
              // onChangeFunc={setAreaValor}
              />
              <GenericCombo
                endPointURL=""
                nameAUX="municipio"
                label="Municipio"
                placeholder="Municipio"
                disabled={disabled}
                valorFiltro="0"
              // onChangeFunc={setAreaValor}
              />
              <GenericCombo
                endPointURL=""
                nameAUX="colonia"
                label="Colonia"
                placeholder="Colonia"
                disabled={disabled}
                valorFiltro="0"
              // onChangeFunc={setAreaValor}
              />
              <RHFTextField name="calle" label="Calle" />
              <RHFTextField name="codigoPostal" label="Código postal" onKeyPress={(e) => handleKeyPressNumber(e)} />

            </Box>
          </Card>
        </Grid>
      </Grid>


      <Grid container spacing={3} sx={{ paddingBottom: 3 }}>
        <Grid item xs={12} md={12}>
          <Card sx={{ padding: 3 }}>
            <Grid container direction='row' justifyContent='space-between'>
              <Grid item>
                <Typography color='primary' sx={{ paddingBottom: 3 }}>Datos laborales</Typography>
              </Grid>

            </Grid>
            <Box
              rowGap={3}
              columnGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >
              <RHFTextField name="nss" label="NSS" onKeyPress={(e) => handleKeyPressNumber(e)} />
              <RHFTextField disabled={disabled} type="text" name="rfc" label="RFC" />
              <RHFTextField disabled={disabled} name="correoEmpresarial" label="Correo empresarial" />
            </Box>
          </Card>
        </Grid>
      </Grid>



      <Grid container spacing={3} sx={{ paddingBottom: 3 }}>
        <Grid item xs={12} md={12}>
          <Card sx={{ padding: 3 }}>
            <Grid container direction='row' justifyContent='space-between'>
              <Grid item>
                <Typography color='primary' sx={{ paddingBottom: 3 }}>Datos bancarios</Typography>
              </Grid>
            </Grid>
            <Box
              rowGap={3}
              columnGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >
              <RHFTextField disabled={disabled} native name="banco" label="Banco" placeholder="Banco" />
              <RHFTextField disabled={disabled} name="numeroTarjeta" label="Número de tarjeta" onKeyPress={(e) => handleKeyPressNumber(e)}/>
              <RHFTextField disabled={disabled} name="clabe" label="Clabe interbancaria" onKeyPress={(e) => handleKeyPressNumber(e)}/>
              <RHFTextField disabled={disabled} name="numeroCuenta" label="Número de cuenta" onKeyPress={(e) => handleKeyPressNumber(e)}/>
            </Box>
          </Card>
        </Grid>
      </Grid>



    </FormProvider>
  );
}
