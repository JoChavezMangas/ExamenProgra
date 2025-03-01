import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import axios from 'axios';
// utils
// import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// assets
import { countries } from '../../../assets/data';
// components
// import Label from '../../../components/label';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFTextField,
} from '../../../components/hook-form';
import { HOST_API_LOCAL, END_POINT_CREAR_AREA, END_POINT_COMBO_LISTA_EMPRESA, END_POINT_EDITAR_AREA } from '../../../config-global';
import GenericCombo from '../../../utils/GenericCombo';
import Iconify from '../../../components/iconify';
import { AxiosMandarForm } from '../../../_Axios/AxiosFomr';
import BandejaAreaEmpleado from '../../../pages/Area/BandejaAreaEmpleado';


// ----------------------------------------------------------------------

AreaNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentArea: PropTypes.object,
};

export default function AreaNewEditForm({ isEdit = false, currentArea }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewAreaSchema = Yup.object().shape({
    nombre: Yup
      .string()
      .required('Ingrese nombre del Área'),
    empresaId: Yup
      .string()
      .required('Ingresa la empresa'),
    // rol: Yup
    // .string()
    // .required('Seleccione empleado'),

  });

  const [defaultValues, setDefaultValues] = useState({
    nombre: currentArea?.nombre || '',
    empresaId: currentArea?.empresaId
  })


  const methods = useForm({
    resolver: yupResolver(NewAreaSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  const [mostrarBotonEditar, setMostrarBotonEditar] = useState(isEdit);

  const [disabled, setDisabled] = useState(isEdit);

  // const values = watch();

  const [currentAreaId, setCurrentAreaId] = useState(0)

  useEffect(() => {
    if (isEdit && currentArea) {
        setCurrentAreaId(currentArea.id)
      reset(currentArea);
    }
  }, [isEdit, currentArea, reset, setDefaultValues]);
  const successMessage = isEdit
    ? '¡Los datos fueron actualizados!'
    : '¡El área fue creada!'
    ;

  const onSubmit = async (data) => {
    try {
      const form = new FormData();
      const urlEndPoint = isEdit ? END_POINT_EDITAR_AREA : END_POINT_CREAR_AREA;
      Object.entries(data).map(([key, value]) => form.append(key, value));
      // AxiosMandarForm(form, urlEndPoint,
      //   enqueueSnackbar(successMessage, { variant: 'success' })
      // );
      AxiosMandarForm(form, urlEndPoint, () => {
        enqueueSnackbar(successMessage, { variant: 'success' });
        navigate(PATH_DASHBOARD.area.list);
      });
    } catch (error) {
      console.error(error);
    }
  };


  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
                <RHFTextField disabled={disabled} name="nombre" label="Nombre del Área*" />

                <GenericCombo
                  disabled={disabled}
                  nameAUX="empresaId"
                  label="Empresa*"
                  placeholder="Empresa"
                  endPointURL={END_POINT_COMBO_LISTA_EMPRESA}
                  onChangeFunc={() => { }}
                />
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                {mostrarBotonEditar ?
                  null :
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Crear Área' : 'Guardar Cambios'}
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
              <BandejaAreaEmpleado areaId={currentAreaId} />
      ) : null}



    </>
  );
}
