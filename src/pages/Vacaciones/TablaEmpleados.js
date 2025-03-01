import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { esES } from '@mui/material/locale';
import es from 'date-fns/locale/es';
import { useNavigate } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
// @mui
import {
    Card,
    Button,
    Container,
    TableContainer,
    Typography,
    Link,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import FormProvider from '../../components/hook-form';
// routes
import { _employeeList } from '../../_mock/arrays';
// components
import Iconify from '../../components/iconify';
import ConfirmDialog from '../../components/confirm-dialog';
// sections
import Label from '../../components/label';
import { HOST_API_LOCAL, END_POINT_BANDEJA_PERIODOS, END_POINT_ACTUALIZAR_POLITICA_EMPLEADO, END_POINT_OBTENER_POLITICA_EMPLEADO } from '../../config-global';
import { AxiosIdSucces, AxiosMandarForm } from '../../_Axios/AxiosFomr'
import { PATH_DASHBOARD } from '../../routes/paths';
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';


export default function TablaEmpleados() {
    const [open, setOpen] = React.useState(false);
    const [empleadoId, setEmpleado]=React.useState(0);
    const [fechaRenovacion, setFechaRenovacion] = React.useState("empty");

    const handleClickOpen = (id) => {
        setEmpleado(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();

    const handleEditRow = (id) => {
        console.log(id)
        navigate(PATH_DASHBOARD.vacaciones.edit(id));
    };

    const [refreshAUX, setRefreshAUX] = useState("");

    const columns = [

        {
            field: 'nombreCompleto',
            headerName: 'Colaborador',
            width: 320,
            editable: false,
            renderCell: (params) => (
                <Link
                    component="button"
                    fontSize='13px'
                    fontWeight='600'
                    color='#16463f'
                    onClick={() => handleEditRow(params.row.id)}
                >
                    {params.row.nombreCompleto}
                </Link>
            ),
        },
        {
            field: 'periodo',
            headerName: 'Periodo Actual',
            headerAlign: 'center',
            align: 'center',
            width: 150,
            editable: false,
            renderCell: (params) => RenderPeriodo(params.row.periodo),
        },
        {
            field: 'periodosEnEmpresa',
            headerName: 'Años en la Empresa',
            headerAlign: 'center',
            align: 'center',
            width: 180,
            editable: false,
        },
        {
            field: 'action',
            headerName: 'Acciones',
            headerAlign: 'center',
            // align: 'center',
            width: 250,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <>
                    <Button
                        color="primary"
                        onClick={() => handleEditRow(params.row.id)}
                    >
                        <Iconify icon="eva:edit-fill" />
                        Editar
                    </Button>
                    <Button
                        color="secondary"
                        onClick={() => handleClickOpen(params.row.id, params.row.nombreCompleto)}
                    >
                        <Iconify icon="carbon:wave-period" />
                        Renovar Periodo
                    </Button>
                </>
            )
        },
    ];
    const [value, setValue] = React.useState();

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const [defaultValues, setDefaultValues] = useState(
        {
            fechaRenovacion: empleadoId === 0 ? '' : fechaRenovacion
        }
    );

    const [politicaEmpleado, setPoliticaEmpleado] = useState({});

    const methods = useForm({
        // defaultValues
    });

    React.useEffect(() => {
        AxiosIdSucces(empleadoId,END_POINT_OBTENER_POLITICA_EMPLEADO,cargarDatosSuccesFunc)
        // console.log('aqui se debe de reacargar el dato', empleadoId)
    }, [empleadoId]);


    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async (data) => {
        const form2 = new FormData();
        form2.append("Id", 0);
        form2.append("empleadoId", empleadoId);
        form2.append("politica", "nombre de la politica");
        form2.append("diasPersonales", data.diasPersonales)
        form2.append("fechaRenovacion", new Date(data.fechaRenovacion).toJSON())

        // console.log('el form',form2,'el data',data);
        AxiosMandarForm(form2, END_POINT_ACTUALIZAR_POLITICA_EMPLEADO, succesFunc, errorFunc)
    }

    const cargarDatosSuccesFunc = (data) => {
        setPoliticaEmpleado(data)
        console.log('ENTRO SUCCESSS')
    }

    const succesFunc = (data) => {
        console.log('el succes',data)
    }
    const errorFunc = (data) => {
        console.log('el error', data)
    }


    return (
        <>
            <Card>
                <TableContainer sx={{ marginTop: '0px', position: 'relative', overflow: 'unset', }}
                    style={{ width: '100%' }}>
                    <GenericDataGridCustom
                        EndPoint={END_POINT_BANDEJA_PERIODOS}
                        columns={columns}
                        refresh={refreshAUX}
                    />
                </TableContainer>
            </Card>

            <DialogPeriodoEmpleado
                politicaEmpleado={politicaEmpleado}
                open={open}
                setOpen={setOpen}
            />

        </>
    );
}


DialogPeriodoEmpleado.prototype = {
    open: PropTypes.bool,
    politicaEmpleado: PropTypes.object,
    setOpen: PropTypes.any,
};


function DialogPeriodoEmpleado({ politicaEmpleado, open, setOpen }) {
    const [empleadoId, setEmpleado] = React.useState(0);
    const handleClickOpen = (id) => {
        setEmpleado(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [defaultValues, setDefaultValues] = useState(
        {
            fechaRenovacion: politicaEmpleado?.fechaRenovacion || ""
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
        const yaCargado = politicaEmpleado?.fechaRenovacion || "";
        if (yaCargado) {
            console.log('entra en el if', politicaEmpleado)
            reset(politicaEmpleado);
        } else {
            console.log('entra en el else', politicaEmpleado)
        }

    }, [politicaEmpleado, reset]);



    const onSubmit = async (data) => {
        const form2 = new FormData();
        form2.append("Id", politicaEmpleado.id);
        form2.append("empleadoId", politicaEmpleado.empleadoId);
        form2.append("politica", politicaEmpleado.politica);
        form2.append("diasPersonales", politicaEmpleado.diasPersonales)
        form2.append("fechaRenovacion", new Date(data.fechaRenovacion).toJSON())

        console.log('el form', form2, 'el data', data, 'la politica', politicaEmpleado);
        AxiosMandarForm(form2, END_POINT_ACTUALIZAR_POLITICA_EMPLEADO, succesFunc, errorFunc)
    }

    const cargarDatosSuccesFunc = (data) => {
        console.log('el cargarDatosSuccesFunc', data)
    }
    const { enqueueSnackbar } = useSnackbar();
    const succesFunc = (data) => {
        console.log('el succes', data)
        setOpen(false);
        enqueueSnackbar('El periodo fue renovado', { variant: 'success' });
    }
    const errorFunc = (data) => {
        console.log('el error', data)
        enqueueSnackbar('Error en la solicitud', { variant: 'error' });
    }


    return (
        <Dialog
            open={open}
            onClose={handleClose}>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

                <DialogTitle color='primary'>Renovar Periodo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Si el periodo de vacaciones no se ha ajustado o se encuentra con un retraso puedes ajustar la fecha de renovacion del periodo.
                    </DialogContentText>
                    {/* AQUÍ VA UN DATETIME */}

                    <br />
                    <Controller
                        name="fechaRenovacion"
                        render={({ field, fieldState: { error } }) => (
                            <>
                                <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        {...field}
                                        label="Renovar Periodo*"
                                        inputFormat="dd/MM/yyyy"
                                        PopperProps={{
                                            anchorEl: null,
                                            style: { top: '0', left: '40%' },  // Ajusta según tus necesidades
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                fullWidth
                                                {...params}
                                                error={!!error}
                                                helperText={error?.message}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </>
                        )}
                    />

                </DialogContent>
                <DialogActions>
                    <Button color='error' variant='outlined' onClick={handleClose}>Cancelar</Button>
                    <Button type="submit" color='primary' variant='contained'>Renovar Periodo</Button>
                </DialogActions>


            </FormProvider>


        </Dialog>
    )

}



function RenderPeriodo(periodo) {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';
    return (
        <div>
            <Label
                variant={isLight ? 'soft' : 'filled'}
                color='success'
                sx={{ mx: 'auto' }}
            >
                {periodo}
            </Label>
        </div>
    );
}



