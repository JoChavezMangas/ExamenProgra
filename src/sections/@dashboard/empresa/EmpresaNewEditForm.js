import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
// utils
// routes
// assets
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFTextField,
} from '../../../components/hook-form';
import { HOST_API_LOCAL, END_POINT_CREAR_EMPRESA, END_POINT_EDITAR_EMPRESA } from '../../../config-global';
import Iconify from '../../../components/iconify';
import BandejaEmpresaEmpleado from '../../../pages/Empresa/BandejaEmpresaEmpleado';
import { PATH_DASHBOARD } from '../../../routes/paths';



// ----------------------------------------------------------------------

// Se especifican los parametros del metodo
EmpresaNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentEmpresa: PropTypes.object,
};

export default function EmpresaNewEditForm({ isEdit = false, currentEmpresa }) {
  const navigate = useNavigate();


  // Importar para mostrar letrero de guardado
  const { enqueueSnackbar } = useSnackbar();


  // Validaciones en los campos
  const NewEmpresaSchema = Yup.object().shape({
    razonSocial: Yup
      .string()
      .required('Ingresa la Razón social'),
    razonComercial: Yup
      .string()
      .required('Ingresa la Razón comercial'),
    rfc: Yup
      .string()
      .required('Ingresa RFC')
      .max(12)
      .matches(/^[A-Z,Ñ,&]{3}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z]?[0-9]?[0-9]?$/,
        "Ingresa un RFC válido"),
    representanteLegal: Yup
      .string()
      .required('Ingresa Representante'),
    correo: Yup
      .string()
      .required('Ingresa correo electrónico')
      .email('Debe ser una dirección valida'),
    telefono: Yup
      .string()
      .required('Ingresa número de teléfono')
      .min(10, "Debe tener como mínimo 10 caracteres").max(12)
      .matches(/[0-9]|\./,
        "Ingresa un número válido"
      ),
    codigoPostal: Yup
      .string()
      .required('Ingresa un codigo postal')
      .min(5, "Debe tener como mínimo 5 caracteres").max(5)
      .matches(/[0-9]|\./,
        "Ingresa un codigo postal"
      ),
    direccion: Yup
      .string()
      .required('Ingresa dirección'),
    // avatarUrl: Yup
    //     .string()
    //     .nullable(true),
  });


  // Metodo para validaciones
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

  // Colca Valores por default
  const [defaultValues, setDefaultValues] = useState(
    {
      razonSocial: currentEmpresa?.razonSocial || '',
      razonComercial: currentEmpresa.razonComercial || '',
      rfc: currentEmpresa?.rfc || '',
      representanteLegal: currentEmpresa?.representanteLegal || '',
      correo: currentEmpresa?.correo || '',
      telefono: currentEmpresa?.telefono || '',
      direccion: currentEmpresa?.direccion || '',
      codigoPostal: currentEmpresa?.codigoPostal || '',
    }
  )
  // ---

  // ?? creo que importa las constantes
  const methods = useForm({
    resolver: yupResolver(NewEmpresaSchema),
    defaultValues,
  });

  // ??
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;



  // Constante auxiliar para mandar archivo
  // const [archivo, setArchivo] = useState(null);

  const [mostrarBotonEditar, setMostrarBotonEditar] = useState(isEdit);

  const [disabled, setDisabled] = useState(isEdit);
  // Metodo de submit
  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const urlEndPoint = isEdit ? HOST_API_LOCAL + END_POINT_EDITAR_EMPRESA : HOST_API_LOCAL + END_POINT_CREAR_EMPRESA;
      const AUT = `Bearer ${localStorage.getItem('accessToken')}`


      // Construir el form para mandarlo 
      const form = new FormData();
      Object.entries(data).map(([key, value]) => form.append(key, value));
      form.append("razonSocial", data.razonSocial)
      form.append("razonComercial", data.razonComercial)
      form.append("Telefono", data.Telefono)
      form.append("Correo", data.Correo)
      form.append("direccion", data.direccion)
      // form.append("archivo", archivo);
      // ---

      axios({
        method: 'post',
        url: urlEndPoint,
        data: form,
        accept: 'application/json',
        contentType: false,
        procesData: false,
        headers: { 'Authorization': AUT }
      }).then(response => {
        console.log(response)

        if (response.data === "OK"){
          enqueueSnackbar(!isEdit ? '¡La empresa fue creada!' : '¡Los datos fueron actualizados!');
          navigate(PATH_DASHBOARD.empresa.list);
        }
        else
          enqueueSnackbar(response.data);
      });

    } catch (error) {
      console.error(error);
    }
  };

  // constante-Metodo para mostrar imagen
  // const handleDrop = useCallback(
  //     (acceptedFiles) => {       
  //         const file = acceptedFiles[0];
  //         setArchivo(file);
  //         const newFile = Object.assign(file, {
  //             preview: URL.createObjectURL(file),
  //         });
  //         if (file) {
  //             setValue('avatarUrl', newFile, { shouldValidate: true });
  //         }
  //     },
  // [setValue]
  // );


    const [IdEmpresa, setIdEmpresa]=useState("")

  useEffect(() => {
      if (isEdit && currentEmpresa) {
          console.log('laEmpresa', currentEmpresa)
          console.log('laEmpresa', currentEmpresa?.id || '')
          setIdEmpresa(currentEmpresa?.id || '')
        reset(currentEmpresa);
      }
  }, [isEdit, currentEmpresa, reset, setDefaultValues]);



  return (
    <>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
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
                <RHFTextField disabled={disabled} name="razonSocial" label="Razón Social*" />
                <RHFTextField disabled={disabled} name="razonComercial" label="Razón Comercial*" />
                <RHFTextField disabled={disabled} name="rfc" label="RFC*" />
                <RHFTextField disabled={disabled} name="representanteLegal" label="Representante Legal*" />
                <RHFTextField disabled={disabled} name="correo" label="Correo Electrónico*" />
                <RHFTextField disabled={disabled} name="telefono" label="Teléfono*" onKeyPress={(e) => handleKeyPressNumber(e)} />
                <RHFTextField disabled={disabled} name="direccion" label="Dirección*" />
                <RHFTextField disabled={disabled} name="codigoPostal" label="Código Postal*" onKeyPress={(e) => handleKeyPressNumber(e)} />

              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>

                { /* Botones para editar, se colocan asi los botones para evitar que el boton de editar haga el submit */}
                {mostrarBotonEditar ?
                  null :
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Crear Empresa' : 'Guardar Cambios'}
                  </LoadingButton>
                }

                {mostrarBotonEditar ?
                  <LoadingButton onClick={() => { setDisabled(false); setMostrarBotonEditar(false); }}>
                    <Iconify icon="eva:edit-fill" /> Editar
                  </LoadingButton> :
                  null
                }


              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
      <br />
          {isEdit === true ? (
              <BandejaEmpresaEmpleado empresaId={IdEmpresa} />
      ) : null
      }
    </>
  );
}




