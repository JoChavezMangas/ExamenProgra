import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { Box, Button, Card, Checkbox, Container, Divider, FormControlLabel, Grid, Icon, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import GenericCombo from '../../utils/GenericCombo';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { useSnackbar } from '../../components/snackbar';
// import { FormProvider,  } from 'react-hook-form';
import Iconify from '../../components/iconify/Iconify';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
import { _userList } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// import { useSnackbar } from '../../components/snackbar';

// sections
import {
  HOST_API_LOCAL,
  END_POINT_OBTENER_EMPLEADO,
  END_POINT_OBTENER_PERIODOS_EMPLEADO,
  END_POINT_EDITAR_PERIODO,
  END_POINT_CREAR_PERIODOS,
  END_POINT_BORRAR_PERIODO,
  END_POINT_OBTENER_COMBO_CATALOGO_GENERICO,
  END_POINT_OBTENER_VALOR_ALTENO_CATALOGO_ID,
  END_POINT_OBTENER_POLITICA_EMPLEADO,
  END_POINT_ACTUALIZAR_POLITICA_EMPLEADO
} from '../../config-global';
import { setTockenExterno } from '../../auth/utils';
import { AxiosEliminar, AxiosIdSucces, AxiosMandarForm } from '../../_Axios/AxiosFomr';
import ModalPeriodos from './ModalPeriodos';
import Label from '../../components/label';

// ----------------------------------------------------------------------

export default function BalanceEmpleadoVacaciones() {
  setTockenExterno();
  const { themeStretch } = useSettingsContext();
  const { name } = useParams();
  const [currentEmpleado, setCurrentEmpleado] = useState();
  const [nombreCompleto, setNombre] = useState();

  const [arrayPeriodos, setArrayPeriodos] = useState([{
    id: "0",
    periodoAnios: "0",
    vacacionesDisponibles: "0",
    personalesDisponibles: "0"
  }]);

  const [politicaEmpleado, setPoliticaEmpleado] = useState({});
  const [nombreEmpleado, setNombreEmpleado] = useState("");
  const [open, setOpen] = useState(false);
  const [periodo, setPeriodo] = useState('');
  const [idEmpleado, setIdEmpleado] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [periodoAnios, setPeriodoAnios] = useState('0');
  const [vacacionesDisponibles, setVacacionesDisponibles] = useState('');
  const [diasPersonales, setDiasPersonales] = useState('');
  const [idPeriodo, setIdPeriodo] = useState(0);
  const [aniadirPeriodos, setAniadirPeriodos] = useState({
    id: "0",
    periodoAnios: "0",
    vacacionesDisponibles: "0",
    personalesDisponibles: "0"
  });
  const [tarjetas, setTarjetas] = useState([]);

  // console.log('Fecha Ingreso', fechaInicio);

  const agregarTarjeta = (nuevaTarjeta) => {
    setTarjetas([...tarjetas, nuevaTarjeta]);
  };

  const agregarPeriodo = (e, parametro) => {
    setOpen(true);
    setPeriodo(parametro.periodo);
    setIdEmpleado(parametro.empleadoSolicitante);
    setNombreEmpleado(parametro.empleadoSolicitanteNombre);
  };

  const [refreshAUX, setRefreshAUX] = useState("");


  useEffect(() => {
    async function ObtenerEmpleado(name0, nombreCompleto0) {
      const urlEndPoint = HOST_API_LOCAL + END_POINT_OBTENER_EMPLEADO;
      const AUT = `Bearer ${localStorage.getItem('accessToken')}`
      await axios({
        method: 'get',
        url: urlEndPoint,
        params: {
          Id: name,
          userName: nombreCompleto,
        },
        headers: { 'Authorization': AUT }
      }).then(response => {
        setNombre(response.data.nombreCompleto)
        setCurrentEmpleado(response.data)
      }).catch(() => {
        console.error('Error al obtener datos:');
      })

    }
    ObtenerEmpleado()
  }, [name, nombreCompleto])

  useEffect(() => {
      console.log('pasa por aqui')
    AxiosIdSucces(name, END_POINT_OBTENER_PERIODOS_EMPLEADO, succesfunc)
  }, [name, refreshAUX])

  useEffect(() => {
    AxiosIdSucces(name, END_POINT_OBTENER_POLITICA_EMPLEADO, cargarDatosSuccesFunc)
    // console.log('aqui se debe de reacargar el dato', empleadoId)
  }, [name]);


  const cargarDatosSuccesFunc = (data) => {

    setPoliticaEmpleado(data)
  }

  const [comboValor, setcomboValor] = useState(2);

  const succesfunc = (param) => {
    setArrayPeriodos(param);
  }

  const methods = useForm({
    // setValue
  });
  const {
    handleSubmit,
  } = methods;

  const onSubmit = async (data) => {
    try {
      const form = new FormData();
      form.append('tipoRegimen', idEmpleado)
      await AxiosMandarForm(form, END_POINT_OBTENER_COMBO_CATALOGO_GENERICO, () => { }, () => { })
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <Helmet>
        <title> Periodos por empleado</title>
      </Helmet>
      {/* <Container maxWidth={themeStretch ? false : 'lg'}> */}
      <CustomBreadcrumbs
        heading={
          <>Periodos</>
        }
        links={[
          {
            name: 'Inicio',
            href: PATH_DASHBOARD.root,
          },
          {
            name: 'Periodos',
            href: PATH_DASHBOARD.vacaciones.periodos,
          },
          { name: nombreCompleto },
        ]}
        action={
          <>
            <Button component={RouterLink}
              to={PATH_DASHBOARD.vacaciones.periodos}
              variant="contained"
              startIcon={<Iconify icon="ic:round-arrow-back" />}
            >
              Regresar
            </Button>
          </>
        }
      />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item md={8}>
          {obtenerFechasInicio(arrayPeriodos).length > 0 && (
            <Typography variant='h6' color='primary'>
              Fecha de Ingreso: {obtenerFechasInicio(arrayPeriodos)[0]}
            </Typography>
          )}
          <Grid sx={{ marginTop: '20px' }}>
            <ComboPoliticaVacaciones politicaEmpleado={politicaEmpleado} />
          </Grid>
        </Grid>

        <Grid item md={4} sx={{ textAlign: 'right' }}>
          <Button variant="outlined" color="primary" onClick={agregarPeriodo}>
            <Iconify icon="pepicons-pop:plus" /> &nbsp; Añadir Periodo
          </Button>
        </Grid>
      </Grid>


          <Grid container spacing={2} sx={{ paddingTop: 2 }}>
              {TarjetasPeriodoEliminar(arrayPeriodos, setRefreshAUX)}
      </Grid>
      {/* </Container> */}
      <ModalPeriodos
        Periodo={periodoAnios}
        VacacionesActuales={vacacionesDisponibles}
        Personales={diasPersonales}
        PeriodoId={idPeriodo}
        abrirModal={open}
        setAbrirModal={setOpen}
        agregarTarjeta={agregarTarjeta}
        empleadoId={name}
        refreshBalanceEmpleado={setRefreshAUX}
      />
    </>
  );
}

function TarjetasPeriodoEliminar(arrayEliminar,metodoRefresh) {
    const nuevoArray = [...arrayEliminar];
    if (nuevoArray.length > 0) {
        nuevoArray[nuevoArray.length - 1].eliminarPeriodo = true;
    }

    // console.log('flag',arrayEliminar)

    return (
        <>
            {nuevoArray.map((item) => (
                <Grid item xs={12} md={4} key={item.id}>
                    <TarjetaBalance
                        Periodo={item.periodoAnios}
                        VacacionesActuales={item.vacacionesDisponibles}
                        Personales={item.personalesDisponibles}
                        PeriodoId={item.id}
                        nuevoPeriodo={item.nuevoPeriodo}
                        botonEliminar={item.eliminarPeriodo}
                        refreshFunc={metodoRefresh}
                        disponibilidad={item.disponibilidad}
                    />
                </Grid>
            ))}
        </>
    )
}

TarjetaBalance.prototype = {
    Periodo: PropTypes.string,
    VacacionesActuales: PropTypes.string,
    Personales: PropTypes.string,
    fechaInicio: PropTypes.string,
    PeriodoId: PropTypes.string,
    isEdit: PropTypes.bool,
    botonGuardar: PropTypes.bool,
    botonEliminar: PropTypes.bool,
    refreshFunc: PropTypes.func,
    disponibilidad: PropTypes.string,
};

function TarjetaBalance({ Periodo, VacacionesActuales, Personales, PeriodoId, fechaInicio, isEdit = false, botonGuardar = false, botonEliminar, refreshFunc, disponibilidad }) {

    const [disabled, setDisabled] = useState(true);
    const [mostrarBotonEditar, setMostrarBotonEditar] = useState(true);
    const [mostrarBotonGuardar, setMostrarBotonGuardar] = useState(botonGuardar);
    const [diasPersonales, setdiasPersonales] = useState(Personales);
    const [vacaciones, setvacaciones] = useState(VacacionesActuales);
    const [excepcion, setExcepcion] = useState(disponibilidad === "#Excepción");


    const handleEdit = () => {
        setDisabled(false)
        setMostrarBotonEditar(false);
        setMostrarBotonGuardar(true);
    };

    const handleKeyPressNumber = (e) => {
        const key = e.key;
        const regex = /[0-9]|\./;
        if (!regex.test(key)) {
            e.preventDefault();
        }
    };

    const { enqueueSnackbar } = useSnackbar();

    const Actualizar = () => {

        const form = new FormData();
        form.append('id', PeriodoId)
        form.append('vacacionesDisponibles', vacaciones)
        form.append('diasPersonales', diasPersonales)
        form.append('empleadoId', 0)
        form.append('excepcion', excepcion)
        AxiosMandarForm(form, END_POINT_EDITAR_PERIODO, succesAxiosfunc, errorfunc);
    }

    const Eliminar = () => {
        const form = new FormData();
        form.append('id', PeriodoId)
        form.append('vacacionesDisponibles', vacaciones)
        form.append('diasPersonales', diasPersonales)
        form.append('empleadoId', 0)
        AxiosMandarForm(form, END_POINT_BORRAR_PERIODO, succesfunc, errorfunc);
    }

    const succesAxiosfunc = (param) => {
        const successMessage = param;
        enqueueSnackbar(successMessage);
        refreshFunc(Date())
        setTimeout(() => {
            setDisabled(true);
            setMostrarBotonGuardar(false);
            setMostrarBotonEditar(true);
        }, 500);

    }
    const succesfunc = (param) => {
        const successMessage = "Se eliminó el periodo";
        enqueueSnackbar(successMessage);
        window.location.reload();
    }


    const changeCheckEvent = () => {
        setExcepcion(!excepcion)
    }

    const errorfunc = (param) => {
        console.log(param);
        enqueueSnackbar("Por favor revisa los datos",{ variant: 'error' });
    }

    let colorLabel;

    if (disponibilidad === "#Cerrado") {
        colorLabel = "error";
    } else if (disponibilidad === "#Disponible") {
        colorLabel = "primary";
    } else {
        colorLabel = "secondary";
    }

    return (
        <>
            <Card sx={{ p: 2, }}>
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant='h6' color='primary'>{Periodo} </Typography>
                    <Typography variant='h6' color='primary'>{fechaInicio} </Typography>

                    {disponibilidad === "Cerrado"}

                    <Label variant='soft' color={colorLabel} >{disponibilidad}</Label>

                    { /* <Typography variant='h6' color='primary'>{disponibilidad } </Typography> */}
                </Grid>
                <Divider sx={{ paddingTop: 2 }} />
                <Grid item md={12} xs={12} sx={{ paddingTop: 4 }}>
                    <TextField
                        fullWidth
                        onChange={(e) => { setvacaciones(e.target.value); }}
                        onKeyPress={(e) => handleKeyPressNumber(e)}
                        label="Días del Periodo Actual"
                        name="vacacionesDisponibles"
                        variant="outlined"
                        value={vacaciones}
                        disabled={disabled}
                    />
                </Grid>
                <Grid item md={12} xs={12} sx={{ paddingTop: 2, paddingBottom: 2 }}>
                    <TextField
                        fullWidth
                        onChange={(e) => { setdiasPersonales(e.target.value); }}
                        onKeyPress={(e) => handleKeyPressNumber(e)}
                        label="Días Personales"
                        name="personalesDisponibles"
                        variant="outlined"
                        value={diasPersonales}
                        disabled={disabled}
                    />
                </Grid>
                {mostrarBotonEditar ? (
                    <Button variant="outlined" color="primary" onClick={handleEdit}>
                        <Iconify icon="mi:edit" />
                        Editar
                    </Button>
                ) : null}
                <Grid container direction="row" justifyContent="space-between" alignItems="center">

                    { /* <FormControlLabel control={<Checkbox onChange={changeCheckEvent} checked={excepcion} />} label="Excepción" /> */ }


                    {mostrarBotonGuardar ? (
                        <>
                           
                            <br />
                            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            {botonEliminar ? 
                                <>
                                    <FormControlLabel control={<Checkbox onChange={changeCheckEvent} checked={excepcion} />} label="Excepción" />
                                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                        <Button variant="outlined" color="error" onClick={Eliminar} >
                                        <Iconify icon="tabler:trash" />
                                            Eliminar
                                        </Button>
                                        <Button variant="contained" color="primary" type="submit" onClick={Actualizar}>
                                            <Iconify icon="fluent:save-16-regular" />
                                            Guardar
                                        </Button>
                                    </Grid>
                                </>
                            :    
                                <>
                                    <FormControlLabel control={<Checkbox onChange={changeCheckEvent} checked={excepcion} />} label="Excepción" />
                                    <Button variant="contained" color="primary" type="submit" onClick={Actualizar}>
                                        <Iconify icon="fluent:save-16-regular" />
                                        Guardar
                                    </Button>
                                </>
                            }
                            </Grid>





                                

                        </>
                    ) : null}
                </Grid>

            </Card>

        </>
    )
}






function obtenerFechasInicio(arrayEliminar) {
    const nuevoArray = [...arrayEliminar];

    const fechasInicio = nuevoArray.map((item) => item.fechaInicio);
    return fechasInicio;
}

ComboPoliticaVacaciones.prototype = {
  politicaEmpleado: PropTypes.object,
};

function ComboPoliticaVacaciones({ politicaEmpleado }) {

  const [comboValor, setcomboValor] = useState(2);

  const [defaultValues, setDefaultValues] = useState(
    {
      diasPersonales: politicaEmpleado?.diasPersonales || 2
    }
  );
  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  React.useEffect(() => {
    // AxiosIdSucces(empleadoId, END_POINT_OBTENER_POLITICA_EMPLEADO, cargarDatosSuccesFunc)
    const yaCargado = politicaEmpleado?.diasPersonales || "";
    if (yaCargado) {
      // console.log('entra en el if', politicaEmpleado)
      setcomboValor(politicaEmpleado?.diasPersonales || 0)
      reset(politicaEmpleado);
    }
    // else {
       // console.log('entra en el else', politicaEmpleado)
    // }

  }, [politicaEmpleado, reset]);


  const onSubmit = async (data) => {
    const form2 = new FormData();
    form2.append("Id", data.id);
    form2.append("empleadoId", data.empleadoId);
    form2.append("politica", data.politica);
    form2.append("diasPersonales", data.diasPersonales)
    form2.append("fechaRenovacion", new Date(data.fechaRenovacion).toJSON())

    AxiosMandarForm(form2, END_POINT_ACTUALIZAR_POLITICA_EMPLEADO, succesFunc, errorFunc)
  };
  const { enqueueSnackbar } = useSnackbar();
  const succesFunc = (data) => {
    enqueueSnackbar('La política de días ha cambiado', { variant: 'success' });
    console.log('el succes', data)
  }
  const errorFunc = (data) => {
    console.log('el error', data)
  }

  return (

    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item md={4} >
          <GenericCombo
            endPointURL={END_POINT_OBTENER_VALOR_ALTENO_CATALOGO_ID}
            nameAUX="diasPersonales"
            label="Política de Días"
            placeholder="Política de Días"
            valorFiltro="PoliticaVacaciones"
            valorDefault={comboValor}
          />

        </Grid>
        <Grid item md={8} sx={{ paddingLeft: '5px', paddingRight: '5px' }}>
          <Button type="submit" variant="contained">
            Cambiar
          </Button>
        </Grid>
      </Grid>
    </FormProvider>
  )
}


