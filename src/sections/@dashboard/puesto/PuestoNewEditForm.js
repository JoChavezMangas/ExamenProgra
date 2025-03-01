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
import Divider from '@mui/material/Divider';

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
import {
  HOST_API_LOCAL,
  END_POINT_CREAR_PUESTO,
  END_POINT_EDITAR_PUESTO,
  END_POINT_COMBO_LISTA_EMPRESA,
  END_POINT_COMBO_LISTA_AREA_POR_EMPRESAS,
  END_POINT_COMBO_LISTA_PUESTO_POR_DEPARTAMENTO,
  END_POINT_COMBO_LISTA_DEPARTAMENTO_POR_AREA
} from '../../../config-global';
import BandejaPuestoEmpleado from '../../../pages/Puesto/BandejaPuestoEmpleado';
import { AxiosMandarForm } from '../../../_Axios/AxiosFomr';



// ----------------------------------------------------------------------

PuestoNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentPuesto: PropTypes.object,
};

export default function PuestoNewEditForm({ isEdit = false, currentPuesto }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  // Validaciones para que campos sea requeridos
  const NewPuestoSchema = Yup.object().shape({
    nombre: Yup.string().required('Ingrese nombre del puesto'),
  });

  // Coloca valores por default
  const [defaultValues, setDefaultValues] = useState(
    {
      nombre: currentPuesto?.nombre || '',
      departamentoId: currentPuesto?.departamentoId || '',
      areaId: currentPuesto?.areaId || '',
      empresaId: currentPuesto?.empresaId || '',

      puestoIdLider: currentPuesto?.puestoLiderId || '',
      departamentoIdLider: currentPuesto?.departamentoIdLider || '',
      areaIdLider: currentPuesto?.areaIdLider || '',
      empresaIdLider: currentPuesto?.empresaIdLider || '',
    }
  )

  // ??
  const methods = useForm({
    resolver: yupResolver(NewPuestoSchema),
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

    // console.log('cuantas veces pasa por aqui?', currentPuesto)

    setfiltroValor(currentPuesto?.empresaId || 0)
    setempresaValor(currentPuesto?.empresaId || 0)
    setAreaValor(currentPuesto?.areaId || 0)
    setDepartamentoValor(currentPuesto?.departamentoId || 0)
    setfiltroValorDepartamento(currentPuesto?.areaId || 0)

    setfiltroValorAreaLider(currentPuesto?.empresaLiderId || 0)
    setfiltroValorDptoLider(currentPuesto?.areaLiderId || 0)
    setfiltroValorPuestoLider(currentPuesto?.departamentoLiderId || 0)

    setValorDefaultEmpresaLider(currentPuesto?.empresaLiderId || 0)
    setValorDefaultAreaLider(currentPuesto?.areaLiderId || 0)
    setValorDefaultDptoLider(currentPuesto?.departamentoLiderId || 0)
    setValorDefaultPuestoLider(currentPuesto?.puestoLiderId || 0)

    // setfiltroValorPuestoLider(114)
    // setValorDefaultPuestoLider(328)

    if (isEdit && currentPuesto) {
      setIdPuesto(currentPuesto.id)
    // console.log('en el if', currentPuesto)
      reset(currentPuesto);
    }
  }, [isEdit, currentPuesto, reset]);

  const onSubmit = async (data) => {
    try {

      const urlEndPoint = isEdit ? END_POINT_EDITAR_PUESTO : END_POINT_CREAR_PUESTO;
      const Id = data.id ? data.id : 0;

      const form2 = new FormData();
      form2.append("Nombre", data.nombre)
      form2.append("areaId", data.areaId)
      form2.append("departamentoId", data.departamentoId)
      form2.append("puestoLiderId", valorDefaultPuestoLider)
      form2.append("id", Id)

      if (validarPass(data))
        AxiosMandarForm(form2, urlEndPoint, succesFunc, errorFunc)
      else
        enqueueSnackbar("Completa el formulario", { variant: 'error' });

    } catch (error) {
      console.error(error);
    }
  };

  const succesFunc = (data) => {
    const successMessage = isEdit
      ? '¡Los datos fueron actualizados!'
      : '¡El puesto fue creado!';
    enqueueSnackbar(successMessage, { variant: 'success' })
  }
  const errorFunc = (data) => {
    enqueueSnackbar(data, { variant: 'error' })
  }

  const [idPuesto, setIdPuesto] = useState(0)
  const [filtroValorDepartamento, setfiltroValorDepartamento] = useState(0);
  const [filtroValor, setfiltroValor] = useState(0)
  const [empresaValor, setempresaValor] = useState(0)
  const [areaValor, setAreaValor] = useState(0)
  const [departamentoValor, setDepartamentoValor] = useState(0);
  const [mostrarBotonEditar, setMostrarBotonEditar] = useState(isEdit);
  const [filtroValorAreaLider, setfiltroValorAreaLider] = useState(0);
  const [filtroValorDptoLider, setfiltroValorDptoLider] = useState(0);
  const [filtroValorPuestoLider, setfiltroValorPuestoLider] = useState(0);
  const [valorDefaultEmpresaLider, setValorDefaultEmpresaLider] = useState(0);
  const [valorDefaultAreaLider, setValorDefaultAreaLider] = useState(0);
  const [valorDefaultDptoLider, setValorDefaultDptoLider] = useState(0);
  const [valorDefaultPuestoLider, setValorDefaultPuestoLider] = useState(0);

  const changeFunc = (param) => {
    setfiltroValor(param);
  }
  const changeFuncArea = (param) => {
    setAreaValor(param)
    setfiltroValorDepartamento(param)
  }
  const changeFuncDepto = (param) => {
    // console.log('el change func dpto',param)
    setDepartamentoValor(param)
  }
  const changeFuncEmpresaLider = (param) => {
    setValorDefaultEmpresaLider(param);
    setfiltroValorAreaLider(param);
    setfiltroValorDptoLider(0);
    setfiltroValorPuestoLider(0)
  }
  const changeFuncAreaLider = (param) => {
    setValorDefaultAreaLider(param);
    setfiltroValorDptoLider(param);
    setfiltroValorPuestoLider(0);
  }
  const changeFuncDeptoLider = (param) => {
    setValorDefaultDptoLider(param);
    setfiltroValorPuestoLider(param);
  }
  const changeFuncPuestoLider = (param) => {
    setValorDefaultPuestoLider(param);
  }

  const [errorEmpresa, setErrorEmpresa] = useState(false);
  const [errorArea, setErrorArea] = useState(false);
  const [errorDpto, setErrorDpto] = useState(false);
  const [errorEmpresaLider, setErrorEmpresaLider] = useState(false);
  const [errorAreaLider, setErrorAreaLider] = useState(false);
  const [errorDptoLider, setErrorDptoLider] = useState(false);
  const [errorPuestoLider, setErrorPuestoLider] = useState(false);

  const validarPass = (data) => {
    let permisoSubmit = true;

    if (filtroValor)
      setErrorEmpresa(false);
    else {
      setErrorEmpresa(true);
      permisoSubmit = false;
    }

    if (areaValor)
      setErrorArea(false);
    else {
      setErrorArea(true);
      permisoSubmit = false;
    }

    if (data.departamentoId)
      setErrorDpto(false);
    else {
      setErrorDpto(true);
      permisoSubmit = false;
    }

    if (valorDefaultEmpresaLider)
      setErrorEmpresaLider(false);
    else {
      setErrorEmpresaLider(true);
      permisoSubmit = false;
    }

    if (valorDefaultAreaLider)
      setErrorAreaLider(false);
    else {
      setErrorAreaLider(true);
      permisoSubmit = false;
    }

    if (valorDefaultDptoLider)
      setErrorDptoLider(false);
    else {
      setErrorDptoLider(true);
      permisoSubmit = false;
    }

    if (valorDefaultPuestoLider)
      setErrorPuestoLider(false);
    else {
      setErrorPuestoLider(true);
      permisoSubmit = false;
    }

    return permisoSubmit;
  }



  // const [areaId, setAreaId] = useState(0);
  // const [departamento, setDepartamento] = useState(0)
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
                <RHFTextField disabled={disabled} name="nombre" label="Nombre del Puesto*" />

                <GenericCombo
                  endPointURL={END_POINT_COMBO_LISTA_EMPRESA}
                  nameAUX="empresaId"
                  label="Empresa*"
                  placeholder="Empresa"
                  valorFiltro="0"
                  useChange
                  onChangeFunc={changeFunc}
                  valorDefault={empresaValor}
                  disabled={disabled}
                  error={errorEmpresa}
                />

                <GenericCombo
                  endPointURL={END_POINT_COMBO_LISTA_AREA_POR_EMPRESAS}
                  nameAUX="areaId"
                  label="Área*"
                  placeholder="Área"
                  valorFiltro={filtroValor}
                  useChange
                  disabled={disabled}
                  valorDefault={areaValor}
                  onChangeFunc={changeFuncArea}
                  error={errorArea}
                />

                <GenericCombo
                  endPointURL={END_POINT_COMBO_LISTA_DEPARTAMENTO_POR_AREA}
                  nameAUX="departamentoId"
                  label="Departamento*"
                  placeholder="Departamento"
                  valorFiltro={filtroValorDepartamento}
                  disabled={disabled}
                  // useChange
                  valorDefault={departamentoValor}
                  onChangeFunc={changeFuncDepto}
                  error={errorDpto}
                />
              </Box>
              <Divider sx={{ margin: '40px 0', color: '#637381' }}>Datos del Líder Inmediato</Divider>
              <Box
                rowGap={3}
                columnGap={3}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(4, 1fr)',
                }}
              >
                <GenericCombo
                  endPointURL={END_POINT_COMBO_LISTA_EMPRESA}
                  nameAUX="empresaIdLider"
                  label="Empresa del líder inmediato*"
                  placeholder="Empresa"
                  valorFiltro="0"
                  useChange
                  onChangeFunc={changeFuncEmpresaLider}
                  valorDefault={valorDefaultEmpresaLider}
                  disabled={disabled}
                  error={errorEmpresaLider}
                />

                <GenericCombo
                  endPointURL={END_POINT_COMBO_LISTA_AREA_POR_EMPRESAS}
                  nameAUX="areaIdLider"
                  label="Área del líder inmediato*"
                  placeholder="Área"
                  valorFiltro={filtroValorAreaLider}
                  useChange
                  disabled={disabled}
                  valorDefault={valorDefaultAreaLider}
                  onChangeFunc={changeFuncAreaLider}
                  error={errorAreaLider}
                />

                <GenericCombo
                  endPointURL={END_POINT_COMBO_LISTA_DEPARTAMENTO_POR_AREA}
                  nameAUX="departamentoIdLider"
                  label="Departamento del líder inmediato*"
                  placeholder="Departamento"
                  valorFiltro={filtroValorDptoLider}
                  disabled={disabled}
                  useChange
                  valorDefault={valorDefaultDptoLider}
                  onChangeFunc={changeFuncDeptoLider}
                  error={errorDptoLider}
                />


                <GenericCombo
                  endPointURL={END_POINT_COMBO_LISTA_PUESTO_POR_DEPARTAMENTO}
                  nameAUX="puestoIdLider"
                  label="Puesto del líder inmediato*"
                  placeholder="Puesto Lider"
                  valorFiltro={filtroValorPuestoLider}
                  disabled={disabled}
                  useChange
                  valorDefault={valorDefaultPuestoLider}
                  onChangeFunc={changeFuncPuestoLider}
                  error={errorPuestoLider}
                />
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                {mostrarBotonEditar ?
                  null :
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'Crear Puesto' : 'Guardar Cambios'}
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
        <BandejaPuestoEmpleado puestoId={idPuesto} />
      ) : null}
    </>
  );
}
