import { Helmet } from 'react-helmet-async';
// import { paramCase } from 'change-case';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
    Card,
    Container,
    Tabs,
    Tab,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    TableContainer,
    Tooltip,
    IconButton,
    Accordion,
    Typography,
    AccordionSummary,
    AccordionDetails,
    Grid,
    Box,
    TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles'
import { useForm, Controller } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
// import PropTypes from 'prop-types';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import Iconify from '../../components/iconify';
import FormProvider from '../../components/hook-form';
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
// import { _userList, _companyList } from '../../_mock/arrays';
import { _dataList, _employeeList } from '../../_mock/arrays';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
// import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';
import GridTablerosVacaciones from '../Vacaciones/Tableros';
import { END_POINT_EDITAR_SOLICITUD, END_POINT_EMPLEADOS_BAJA, END_POINT_HISTORIAL_SOLICITUD, HOST_API_LOCAL, } from '../../config-global';
import Label from '../../components/label';
import { Block } from '../../sections/_examples/Block';
import Editor from '../../components/editor';
import { GenericFileInput } from '../../utils/GenericFileInput';
import { useSnackbar } from '../../components/snackbar';
import { AxiosMandarForm, AxiosIdSucces } from '../../_Axios/AxiosFomr';


ModalBajaAlta.prototype = {
    params: PropTypes.any,
    NombreEmpleado: PropTypes.string,
    empleadoId: PropTypes.string,
    abrirModal: PropTypes.bool,
    refreshFunc: PropTypes.func,
    metodoCerrar: PropTypes.bool,
};

export default function ModalBajaAlta({ params, NombreEmpleado, abrirModal, metodoCerrar, actionType, empleadoId, refreshFunc }) {


    const [open, setOpenBaja] = useState(false);
    const [empleado, setEmpleado] = useState("");
    const [quillSimple, setQuillSimple] = useState('');
    const [comentarios, setComentarios] = useState([]);
    const [esAcepetado, setEsAcepetado] = useState('');

    const { enqueueSnackbar } = useSnackbar();

    const methods = useForm({
        // setValue
    });

    const {
        handleSubmit,
    } = methods;

    const navigate = useNavigate();

    const onSubmit = async (data) => {

        const enviarComentario = quillSimple.trim();


        if (!enviarComentario) {
            enqueueSnackbar("Debes ingresar un comentario", { variant: 'error' });
        } else {
            // const enviarComentario = quillSimple;
            const enviarId = empleadoId;
            const urlEndPoint = HOST_API_LOCAL + END_POINT_EMPLEADOS_BAJA;
            const AUT = `Bearer ${localStorage.getItem('accessToken')}`;

            axios({
                method: 'get',
                url: urlEndPoint,
                params: { Id: enviarId, comentario: enviarComentario },
                headers: { 'Authorization': AUT }
            })
                .then(response => {
                    console.log('Respuesta', response)
                    if (response.data.status === 'OK') {
                        succesFunc()
                        setOpenBaja(false);
                        navigate(PATH_DASHBOARD.empleado.list);

                    }
                    else {
                        enqueueSnackbar("Faltan datos", { variant: 'error' });
                    }
                });
        }
    }
    const succesFunc = (data) => {
        enqueueSnackbar("Se ha dado de baja");
        refreshFunc(Date.now().toString());
    }

    useEffect(() => {

        AxiosIdSucces(empleadoId, "api/Empleado/HistorialEmpleadoporId", succesAxiosFunc)

    }, [empleadoId]);

    const succesAxiosFunc = (param) => {
        if (param.length > 0)
            setComentarios(param)
        else
            setComentarios([""])
    }


    return (
        <>
            <Dialog open={abrirModal} onClose={metodoCerrar} maxWidth="sm" fullWidth>
                <DialogTitle variant='h5' color='primary'>
                    {actionType === 'Reactivar' ? 'Reactivar: ' : 'Dar de Baja: '}
                    {NombreEmpleado}
                </DialogTitle>

                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <br />
                        <div>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="fechaBaja"
                                        render={({ field, fieldState: { error } }) => (
                                            <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    {...field}
                                                    label="Fecha"
                                                    inputFormat="dd/MM/yyyy"
                                                    renderInput={(paramst) => (

                                                        <TextField
                                                            fullWidth
                                                            {...paramst}
                                                            error={!!error}
                                                            helperText={error?.message}
                                                        />
                                                    )}

                                                />
                                            </LocalizationProvider>
                                        )}
                                    />
                                </Grid>
                            </Grid>

                        </div>

                        <br />

                        <Accordion sx={{ border: '1px solid #919EAB', background: 'rgba(243, 246, 249, 0.4)', borderRadius: '8px' }}>
                            <AccordionSummary
                                expandIcon={<GridExpandMoreIcon />}
                                aria-controls="panel1a-content"
                            >

                                Historial de comentarios

                            </AccordionSummary>

                            <AccordionDetails>
                                {comentarios.map((item) => (
                                    <Comentarios key={item.id} Nombre={item.creadoPorNombre} Comentario={item.datoNuevo} Fecha={item.fechaCreacion} />
                                ))}

                            </AccordionDetails>
                        </Accordion>
                        <br />

                        <TextField
                            name="texto"
                            id="simple-editor"
                            label="Comentario*"
                            placeholder='Ingresa tu Comentario*'
                            multiline
                            maxRows={4}
                            fullWidth
                            value={quillSimple}
                            onChange={(value) => setQuillSimple(value.target.value)}
                        />

                    </DialogContent>

                    <DialogActions>

                        <Button variant="outlined" color='error' onClick={metodoCerrar}>

                            Cerrar

                        </Button>



                        <Button

                            type="submit"

                            variant="contained"

                            color={actionType === 'Reactivar' ? 'primary' : 'error'}
                        >

                            {actionType === 'Reactivar' ? 'Reactivar Empleado' : 'Dar de Baja'}

                        </Button>

                    </DialogActions>

                </FormProvider >



            </Dialog>



        </>



    )

}




Comentarios.prototype = {
    Nombre: PropTypes.string,
    Comentario: PropTypes.string,
    Fecha: PropTypes.string
};
function Comentarios({ Nombre, Comentario, Fecha }) {
    return (
        <Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <Typography variant='caption' >{Nombre}</Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Typography variant='caption' >{Fecha}</Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Typography variant='caption' >{Comentario}</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}






