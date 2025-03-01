import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, TextField } from '@mui/material';
// utils
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { es } from 'date-fns/locale';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// assets
import { roleType } from '../../../assets/data/index';

// components
// import Label from '../../../components/label';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFTextField,
} from '../../../components/hook-form';
import GenericCombo from '../../../utils/GenericCombo';
import Iconify from '../../../components/iconify';
import { AxiosMandarForm } from '../../../_Axios/AxiosFomr';
import { END_POINT_CREAR_DIAS_INHABILES, END_POINT_EDITAR_DIAS_INHABILES } from '../../../config-global';




// ----------------------------------------------------------------------

DiaInhabilNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentDiaInhabil: PropTypes.object,
};

export default function DiaInhabilNewEditForm({ isEdit = false, currentDiaInhabil }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  // Validaciones para que campos sea requeridos
  const NewDiaInhabilSchema = Yup.object().shape({
    nombre: Yup.string().required('Ingrese nombre del día inhábil'),
  });

  // Coloca valores por default
  const [defaultValues, setDefaultValues] = useState(
    {
      nombre: currentDiaInhabil?.nombre || '',
      fecha:  currentDiaInhabil?.fecha || '',
    }
  )



  // ??
  const methods = useForm({
    resolver: yupResolver(NewDiaInhabilSchema),
    defaultValues,
  });

  // ??
  const {
    reset,
    // watch,
    setValue,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = methods;

    // Metodo para ejecutar cuando se renderisa todo
    useEffect(() => {
        if (isEdit && currentDiaInhabil) {
            reset(currentDiaInhabil);
        }
    }, [isEdit, currentDiaInhabil, reset]);

  // constante para disablear en caso de que se este editando
  const [disabled, setDisabled] = useState(isEdit);


  const onSubmit = async (data) => {
    try {
        console.log('DATA', data);

        const url = isEdit ? END_POINT_EDITAR_DIAS_INHABILES : END_POINT_CREAR_DIAS_INHABILES;
        const idActual = isEdit ? data.id : 0;
        const form2 = new FormData();
        form2.append("id", idActual)
        form2.append("Nombre", data.nombre)
        form2.append("fecha", new Date(data.fecha).toJSON())
        form2.append("fechaString", "...")

        AxiosMandarForm(form2, url , successfunc, errorfunc)

    } catch (error) {
      console.error("el error de try",error);
    }
  };




    const successfunc = (data) => {
        enqueueSnackbar(data, { variant: 'success' });
    }
    const errorfunc = (data) => {
        enqueueSnackbar(data, { variant: 'error' });
    }

  const [idDiaInhabil, setIdDiaInhabil] = useState(0)
  const [mostrarBotonEditar, setMostrarBotonEditar] = useState(isEdit);



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
                  sm: 'repeat(4, 1fr)',
                }}
              >
                <RHFTextField disabled={disabled} name="nombre"  label="Nombre del Día Inhábil*" />
                <Controller
                  name="fecha"
                  render={({ field, fieldState: { error } }) => (
                    <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                      <DatePicker
                        {...field}
                        label="Fecha"
                        disabled={disabled}
                        inputFormat="dd/MM/yyyy"
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            {...params}
                            error={!!error}
                            helperText={error ? 'Ingresa fecha' : ''}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  )}
                />
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                {mostrarBotonEditar ?
                  null :
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Crear Día Inhábil' : 'Guardar Cambios'}
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
    </>
  );
}
