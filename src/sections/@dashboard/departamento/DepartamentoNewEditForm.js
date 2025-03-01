import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
// utils
// import { fData } from '../../../utils/formatNumber';
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
import { HOST_API_LOCAL, END_POINT_CREAR_DEPARTAMENTO, END_POINT_EDITAR_DEPARTAMENTO, END_POINT_COMBO_LISTA_EMPRESA, END_POINT_COMBO_LISTA_AREA_POR_EMPRESAS } from '../../../config-global';
import BandejaDepartamentoEmpleado from '../../../pages/Departamento/BandejaDepartamentoEmpleado';



// ----------------------------------------------------------------------

DepartamentoNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentDepartamento: PropTypes.object,
};

export default function DepartamentoNewEditForm({ isEdit = false, currentDepartamento }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  // Validaciones para que campos sea requeridos
  const NewDepartamentoSchema = Yup.object().shape({
    nombre: Yup.string().required('Ingrese nombre del departamento'),
    areaId: Yup.number().required('Seleccione el area de departamento'),
  });

  // Coloca valores por default
  const [defaultValues, setDefaultValues] = useState(
    {
      nombre: currentDepartamento?.nombre || '',
      areaId: currentDepartamento?.areaId || '',
      empresaId: currentDepartamento?.empresaId || '',
    }
  )

  // ??
  const methods = useForm({
    resolver: yupResolver(NewDepartamentoSchema),
    defaultValues,
  });

  // ??
  const {
    reset,
    // watch,
    // setValue,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = methods;

  // constante para disablear en caso de que se este editando
  const [disabled, setDisabled] = useState(isEdit);

  // Metodo para ejecutar cuando se renderisa todo
  useEffect(() => {
    setfiltroValor(currentDepartamento?.empresaId || 0)
    setempresaValor(currentDepartamento?.empresaId || 0)
    if (isEdit && currentDepartamento) {
        setIdDepartamento(currentDepartamento.id)
      reset(currentDepartamento);
    }
  }, [isEdit, currentDepartamento, reset]);

  const onSubmit = async (data) => {
    try {

      const urlEndPoint = isEdit ? HOST_API_LOCAL + END_POINT_EDITAR_DEPARTAMENTO : HOST_API_LOCAL + END_POINT_CREAR_DEPARTAMENTO;
      console.log('DATA', data);

      const Id = data.id ? data.id : 0;

      const form2 = new FormData();
      form2.append("Nombre", data.nombre)
      form2.append("AreaId", data.areaId)
      form2.append("id", Id)


      const AUT = `Bearer ${localStorage.getItem('accessToken')}`
      const successMessage = isEdit
        ? '¡Los datos fueron actualizados!'
        : '¡El departamento fue creado!';
      axios({
        method: 'post',
        url: urlEndPoint,
        data: form2,
        accept: 'application/json',
        contentType: false,
        procesData: false,
        headers: { 'Authorization': AUT }
      }).then(response => {
        console.log(response)

        enqueueSnackbar(successMessage, { variant: 'success' });
        navigate(PATH_DASHBOARD.departamento.list);
      });

    } catch (error) {
      console.error(error);
    }
  };

  const [idDepartamento,setIdDepartamento] = useState(0)

  const [filtroValor, setfiltroValor] = useState(0)
  const [empresaValor, setempresaValor] = useState(0)
  const [areaValor, setAreaValor] = useState(0)
  const [mostrarBotonEditar, setMostrarBotonEditar] = useState(isEdit);

  const changeFunc = (param) => {
    setfiltroValor(param);
  }

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
                <RHFTextField disabled={disabled} name="nombre" label="Nombre del Departamento*" />

                <GenericCombo
                  endPointURL={END_POINT_COMBO_LISTA_EMPRESA}
                  nameAUX="empresaId"
                  label="Empresa*"
                  placeholder="Empresa"
                  // onChange={getValues(change)}   
                  valorFiltro="0"
                  useChange
                  onChangeFunc={changeFunc}
                  valorDefault={empresaValor}
                  disabled={disabled}
                />

                <GenericCombo
                  endPointURL={END_POINT_COMBO_LISTA_AREA_POR_EMPRESAS}
                  nameAUX="areaId"
                  label="Área*"
                  placeholder="Área"
                  valorFiltro={filtroValor}
                  disabled={disabled}
                // onChangeFunc={setAreaValor }
                />


              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                {mostrarBotonEditar ?
                  null :
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Crear Departamento' : 'Guardar Cambios'}
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
              <BandejaDepartamentoEmpleado departamentoId={idDepartamento} />
      ) : null}
    </>
  );
}
