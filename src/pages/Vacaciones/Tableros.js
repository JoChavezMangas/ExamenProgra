import { useState, useEffect, useCallback } from 'react';
import {
    Card,
    Button,
    Grid,
    Dialog,
    TextField,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import { Box } from '@mui/system';

import { useForm, Controller } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { es } from 'date-fns/locale';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';
import { END_POINT_OBTENER_DATOS_TABLERO, HOST_API_LOCAL, END_POINT_CREAR_SOLICITUD, HOST_API_KEY } from '../../config-global';
import FormProvider from '../../components/hook-form';
import { GenericFileInput } from '../../utils/GenericFileInput';
import Iconify from '../../components/iconify';
import { useSnackbar } from '../../components/snackbar';
import ModalTableroEspeciales from './ModalTableroEspeciales';


export default function GridTablerosVacaciones() {

    const [vacaciones, setVacaciones] = useState(0);
    const [personales, setPersonales] = useState(0);
    const [faltas, setFaltas] = useState(0);
    const [retardos, setRetardos] = useState(0);
    const [refreshAUX, setRefreshAUX] = useState("");
    const [periodos, setPeriodos] = useState(["",""]);

    useEffect(() => {

        function ObtenerDatosTableros() {

            const urlEndPoint = HOST_API_LOCAL + END_POINT_OBTENER_DATOS_TABLERO // END_POINT_CREAR_EPLEADO; // END_POINT_OBTENER_DATOS_TABLERO;
            const AUT = `Bearer ${localStorage.getItem('accessToken')}`
            // console.log(localStorage.getItem('EmpleadoId'))
            return (
                axios({
                    method: 'get',
                    url: urlEndPoint,
                    params: { "empleadoId": localStorage.getItem('EmpleadoId') },
                    headers: { 'Authorization': AUT }
                }).then(response => {
                    setVacaciones(response.data.vacacionesDisponibles)
                    setPersonales(response.data.diasPersonalesDisponibles)
                    setFaltas(response.data.faltas)
                    setRetardos(response.data.retardos)
                    setPeriodos(response.data.periodosDias)
                    // console.log(response.data.periodosDias[0][1]);
                }).catch(error => {
                    console.log("el error",error)
                })
            )
        }

        ObtenerDatosTableros()
    }, [refreshAUX])

    function TypograpPeriodos(periodo, dias) {

        // console.log("período", periodo)
        // console.log("días", dias)
        return (
            <>
                <Typography variant='body2'> {periodo}: </Typography>
                <Typography variant='subtitle2'>&nbsp; {dias} </Typography>
            </>
        )
    }


    return (
        <Grid container spacing={3}>

            <Grid item xs={12} md={6}>
                <Card sx={{ p: 3, minHeight: '230px' }}>
                    <Typography variant='h5' color='primary'>Vacaciones</Typography>
                    <Grid container display='flex' alignItems='center' spacing={2} sx={{ paddingTop: 2 }}>
                        <Grid item md={4} sx={{ borderRight: '1px #bdbdbd solid' }}>
                            <Typography variant='h3' color="#007B55"> {vacaciones} </Typography>
                            <Typography> Días disponibles</Typography>
                        </Grid>
                        <Grid item md={8} pl={2}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<GridExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography variant='h6' color='#007B55'> Periodos Activos </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    
                                    {  periodos.map((item,index) =>
                                        <Grid key={index} container display='flex'>
                                            <Grid item md={5}>
                                                <Typography variant='body2'> {item[1]}: </Typography>
                                            </Grid>
                                            <Grid item md={7}>
                                                <Typography variant='subtitle2' color='primary'>{item[0]} </Typography>
                                            </Grid>
                                        </Grid>
                                            
                                    )  }

                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>

                    <FormDialogs
                        tituloPrincipal="Vacaciones "
                        textoPrincipal="Por favor, selecciona las fechas"
                        tipoPeticion="1"
                        refreshFunc={setRefreshAUX}
                    />
                </Card>
            </Grid >
            <Grid item xs={12} md={6}>
                <Card sx={{ p: 3, minHeight: '230px' }}>
                    <Typography variant='h5' color='primary'>Días personales</Typography>
                    <Grid container sx={{ paddingTop: 2 }}>
                        <Grid item md={12}>
                            <Typography variant='h3' color="#007B55"> {personales} </Typography>
                            <Typography> Días disponibles</Typography>
                            <Typography> Periodo: {periodos[0][1]}</Typography>
                        </Grid>
                    </Grid>
                    <FormDialogs
                        tituloPrincipal="Días Personales"
                        textoPrincipal="Por favor, selecciona las fechas"
                        tipoPeticion="2"
                        refreshFunc={setRefreshAUX}
                    // submitMetodo={() => { }}
                    />

                </Card>
            </Grid>

            
            <Grid item xs={12} md={6}>
                <Card sx={{ p: 3, minHeight: '230px' }}>
                    <Typography variant='h5' color='primary'>Días especiales</Typography>
                    <Grid container sx={{ paddingTop: 2 }}>
                        <Grid item md={12}>
                            <Typography> ¿Desea hacer una solicitud especial?</Typography>
                        </Grid>
                    </Grid>
                    <ModalTableroEspeciales EmpleaodoId={localStorage.getItem('EmpleadoId')} />

                </Card>
            </Grid>
            

        </Grid >
    )
}




FormDialogs.prototype = {
    tituloPrincipal: PropTypes.any,
    tipoPeticion: PropTypes.string,
    refreshFunc: PropTypes.func,
};

function FormDialogs({ tituloPrincipal, tipoPeticion, refreshFunc }) {

    // constantes para abrir el modal
    const [open, setOpen] = useState(false);

    // constantes para fechas
    const [diasPedidos, setDiasPedidos] = useState(0);

    // constates para documentos
    const [files, setFiles] = useState([]);
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Constante para texto
    const [quillSimple, setQuillSimple] = useState('');

    // metodo para cerrar el modal
    const handleClose = () => {
        setOpen(false);
    };

    const methods = useForm({
        // setValue
    });

    // Importar para mostrar letrero de guardado
    const { enqueueSnackbar } = useSnackbar();

    const [loadigBtn, setLoadigBtn]= useState(false)

    // Metodos de submit
    const {
        handleSubmit,
    } = methods;
    const onSubmit = async (data) => {
        try {

            

            setLoadigBtn(true)

            const form = new FormData();
            const urlEndPoint = HOST_API_KEY + END_POINT_CREAR_SOLICITUD;
            let fechaIncioAUX;
            let fechaFinAUX;
            let axiosPass = true;

            if (!data.fechaInicio)
                fechaIncioAUX = new Date();
            else
                fechaIncioAUX = data.fechaInicio;
            if (!data.fechaFin)
                fechaFinAUX = new Date();
            else
                fechaFinAUX = data.fechaFin;

            if (fechaFinAUX < fechaIncioAUX)
                axiosPass = false;


            const anioIncio = fechaIncioAUX.getFullYear();
            const anioFin   = fechaFinAUX.getFullYear();
            const mesIncio  = fechaIncioAUX.getMonth()+1;
            const mesFin    = fechaFinAUX.getMonth()+1;
            const diaIncio  = fechaIncioAUX.getDate();
            const diaFin    = fechaFinAUX.getDate();

            // console.log('fechaInicio', fechaIncioAUX.getMonth())
            // console.log('anioIncio', anioIncio);
            // console.log('anioFin', anioFin);
            // console.log('mesIncio', mesIncio)
            // console.log('mesFin', mesFin)

            // axiosPass = false;

            if (axiosPass) {
                files.forEach((file, i) => {
                    form.append(`file-${i}`, file, file.name);
                });
                // form.append("fechaInicio", fechaIncioAUX.toJSON());
                // form.append("fechaFin", fechaFinAUX.toJSON());

                form.append("inicioAnio", anioIncio);
                form.append("inicioMes", mesIncio);
                form.append("inicioDia", diaIncio);
                form.append("finAnio", anioFin);
                form.append("finMes", mesFin);
                form.append("finDia", diaFin);


                form.append("comentario", quillSimple);
                form.append("tipoPeticion", tipoPeticion);
                form.append("_contextEmpleadoId", localStorage.getItem('EmpleadoId'));
                form.append("_contextPuestoId", localStorage.getItem('EmpleadoId'));

                // console.log(form)

                const AUT = `Bearer ${localStorage.getItem('accessToken')}`;
                axios({
                    method: 'post',
                    url: urlEndPoint,
                    data: form,
                    accept: 'application/json',
                    contentType: false,
                    procesData: false,
                    headers: { 'Authorization': AUT }
                }).then(response => {
                    setLoadigBtn(false)
                    console.log('vamoa ver en succes', response)

                    if (response.data === "OK") {
                        enqueueSnackbar("¡Datos guardados correctamente!");
                        setOpen(false);
                        setQuillSimple('');
                    }
                    else {
                        enqueueSnackbar(response.data, { variant: "error" });
                    }

                    refreshFunc(new Date().toString())

                }).catch(er => {
                    console.log('El error', er);
                    setLoadigBtn(false);
                });
            } else {
                enqueueSnackbar("La fecha de inicio no puede ser posterior a la de fin");
                setLoadigBtn(false);
            }



        } catch (error) {
            console.error(error);
        }
    };

    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    return (
        <div>
            <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton
                    variant={isLight ? 'soft' : 'filled'}
                    color='primary'
                    onClick={handleClickOpen}
                    endIcon={<Iconify icon="eva:chevron-right-fill" />}
                >
                    Solicitar
                </LoadingButton>
            </Grid>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle variant='h5' color='primary'>{tituloPrincipal}</DialogTitle>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <DialogContentText sx={{ pb: 3 }}>
                            Por favor, selecciona las fechas
                        </DialogContentText> 
                        <Grid container spacing={3} sx={{ pb: 3 }}>
                            <Grid item xs={6} md={4}>
                                <Controller
                                    name="fechaInicio"
                                    render={({ field, fieldState: { error } }) => (
                                        <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>

                                            <DatePicker
                                                {...field}
                                                label="Fecha de Inicio*"
                                                inputFormat="dd/MM/yyyy"
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
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <Controller
                                    name="fechaFin"
                                    render={({ field, fieldState: { error } }) => (
                                        <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                {...field}
                                                label="Fecha de Fin*"
                                                inputFormat="dd/MM/yyyy"
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
                                    )}
                                />
                            </Grid>

                            <Grid item xs={6} md={4} sx={{ alignContent: "center" }}>
                                {diasPedidos <= 0 ? null : <h4>Total de días: {diasPedidos}</h4>}
                            </Grid>

                        </Grid>



                        <TextField
                            name="comentario"
                            // id="simple-editor"
                            label="Comentario"
                            placeholder='Ingresa tu comentario'
                            multiline
                            maxRows={4}
                            fullWidth
                            value={quillSimple}
                            onChange={(value) => setQuillSimple(value.target.value)}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}
                            variant="outlined" color='error'
                            
                        >
                            Cancelar
                        </Button>
                        <LoadingButton type="submit" loading={loadigBtn} variant="contained">
                            Solicitar
                        </LoadingButton>
                    </DialogActions>
                </FormProvider>
            </Dialog>
        </div>
    );
}

