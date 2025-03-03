import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, Hidden, Stack, TextField } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useSnackbar } from '../../components/snackbar';
import FormProvider, {
    RHFTextField,
} from '../../components/hook-form';
import GenericCombo from '../../utils/GenericCombo';
import Iconify from '../../components/iconify';
import {
    END_POINT_PEDIDOS_CATALOGOS,
    END_POINT_PEDIDOS_BANCOS,
    END_POINT_PEDIDOS_BROKERS,
    END_POINT_PEDIDOS_REGISTRAR,
    END_POINT_EMPLEADOS_BROKERS} from '../../config-global';
import { PATH_DASHBOARD } from '../../routes/paths';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs/CustomBreadcrumbs';
import { AxiosMandarForm } from '../../_Axios/AxiosFomr';







// ----------------------------------------------------------------------



export default function CrearPedido() {

    const { enqueueSnackbar } = useSnackbar();

    // Validaciones para que campos sea requeridos
    const NewDepartamentoSchema = Yup.object().shape({});

    // ??
    const methods = useForm({
        resolver: yupResolver(NewDepartamentoSchema),
    });

    // ??
    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    // constante para disablear en caso de que se este editando
    

    const [passSubmit, setpassSubmit] = useState(0);

    const onSubmit = async (data) => {
        try {
            console.log('DATA', data);

            // Obtener la fecha actual en formato JSON
            const fechaActual = new Date().toJSON();

            // Usar la fecha del día de hoy si data.FechaPedido es undefined
            const fechaEnviar = data.FechaPedido ? new Date(data.FechaPedido).toJSON() : fechaActual;

            const monto = Number(data.Monto);

            if (Number.isNaN(monto)) {
                errorfunc("el monto no debe de contener carácteres especiales ni letras");
                return "";

            }

            const form = new FormData();


            form.append('brokers', brokersValor)
            form.append('estado', estadoValor)
            form.append('banco', bancosValor)
            form.append('fecha', fechaEnviar)
            form.append('monto', data.Monto)
            form.append('empleado', empleadoValor)
            form.append('tipo', tipoValor)

            const ValidacionPass = handleClick(data);
            if (ValidacionPass)
                AxiosMandarForm(form, END_POINT_PEDIDOS_REGISTRAR, succesfunc, errorfunc);
            else
                errorfunc("Por favor completa el formulario");

           

        } catch (error) {
            console.error(error);
        }
        return "";
    };


    const handleClick = (data) => {
        let permisoSubmit = true;

        if (!brokersValor)
            permisoSubmit = false
        if (!estadoValor)
            permisoSubmit = false
        if (!bancosValor)
            permisoSubmit = false
        if (!empleadoValor)
            permisoSubmit = false
        if (!tipoValor)
            permisoSubmit = false
        if (!document.getElementById('FechaPedido').value)
            permisoSubmit = false

        return permisoSubmit;
    }

    const succesfunc = (param) => {
        enqueueSnackbar("Los datos fueron ingresados correctamente");
    };

    const errorfunc = (Mnsaje) => {
        enqueueSnackbar(Mnsaje, { variant: 'error' });
    };

    const [brokersValor, setBrokersValor] = useState(0);
    const [estadoValor, setEstadoValor] = useState(0);
    const [bancosValor, setBancosValor] = useState(0);
    const [empleadoValor, setEmpleadoValor] = useState(0);
    const [tipoValor, setTipoValor] = useState(0);
    const changeBancos = (param) => { setBancosValor(param) }
    const changeBrokers = (param) => { setBrokersValor(param) }
    const changeEstado = (param) => { setEstadoValor(param) }
    const changeEmpleado = (param) => { setEmpleadoValor(param) }
    const changeTipo = (param) => { setTipoValor(param) }



    return (
        <>

            <Helmet>
                <title> Registrar pedidos </title>
            </Helmet>


            <Hidden smDown>
                <CustomBreadcrumbs
                    heading={
                        <>Registrar pedido</>
                    }
                    links={[
                        {
                            name: 'Por favor llena los datos',
                            href: PATH_DASHBOARD.root,
                        }
                    ]}

                    action={<Button component={RouterLink}
                        to={PATH_DASHBOARD.inicio.root}
                        variant="contained"
                        startIcon={<Iconify icon="ic:round-arrow-back" />}
                    >
                        Regresar
                    </Button>}
                />
            </Hidden>

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
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="Brokers"
                                    label="Brokers"
                                    placeholder="Brokers"
                                    endPointURL={END_POINT_PEDIDOS_BROKERS}
                                    onChangeFunc={changeBrokers}
                                    valorFiltro="Brokers"
                                    // valorDefault={anioDefault}
                                    useChange
                                />

                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="Tipo"
                                    label="Tipo"
                                    placeholder="Tipo"
                                    endPointURL={END_POINT_PEDIDOS_CATALOGOS}
                                    onChangeFunc={changeTipo}
                                    valorFiltro="TipoCredito"
                                    // valorDefault={anioDefault}
                                    useChange
                                />

                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="Estado"
                                    label="Estado"
                                    placeholder="Estado"
                                    endPointURL={END_POINT_PEDIDOS_CATALOGOS}
                                    onChangeFunc={changeEstado}
                                    valorFiltro="Estado"
                                    // valorDefault={anioDefault}
                                    useChange
                                />

                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="ejecutivo"
                                    label="Ejecutivo"
                                    placeholder="Ejecutivo"
                                    endPointURL={END_POINT_EMPLEADOS_BROKERS}
                                    onChangeFunc={changeEmpleado}
                                    valorFiltro="0"
                                    valorDefault=""
                                    useChange
                                />



                                <Controller
                                    name="FechaPedido"
                                    render={({ field, fieldState: { error } }) => (
                                        <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                {...field}
                                                label="Fecha del pedido"
                                                // disabled={disabled}
                                                inputFormat="dd/MM/yyyy"
                                                maxDate={new Date()}
                                                renderInput={(params) => (
                                                    <TextField
                                                        fullWidth
                                                        {...params}
                                                        error={!!error}
                                                        helperText={error ? 'Ingresa fecha' : ''}
                                                        id="FechaPedido"
                                                    />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    )}
                                />

                                <RHFTextField name="Monto" label="Monto" />


                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="Bancos"
                                    label="Bancos"
                                    placeholder="Bancos"
                                    endPointURL={END_POINT_PEDIDOS_BANCOS}
                                    onChangeFunc={changeBancos}
                                    valorFiltro="Bancos"
                                    // valorDefault={anioDefault}
                                    useChange
                                />


                                


                                
                            </Box>

                            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                    Guardar
                                </LoadingButton>
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </FormProvider>
            <br />

        </>
    );
}



