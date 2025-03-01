import { Helmet } from 'react-helmet-async';
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
import { LoadingButton } from '@mui/lab';
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
import { _dataList } from '../../_mock/arrays';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import GridTablerosVacaciones from './Tableros';
import {
    END_POINT_EDITAR_SOLICITUD,
    END_POINT_BORRAR_CANCELAR_SOLICITUD,
    END_POINT_HISTORIAL_SOLICITUD,
    HOST_API_LOCAL,
} from '../../config-global';
import Label from '../../components/label';
import { Block } from '../../sections/_examples/Block';
import Editor from '../../components/editor';
import { GenericFileInput } from '../../utils/GenericFileInput';
import { useSnackbar } from '../../components/snackbar';
import ConfirmDialog from '../../components/confirm-dialog';
import { AxiosEliminar } from '../../_Axios/AxiosFomr';




DialogEditarSolicitud.prototype = {
    params: PropTypes.any,
    esResponsable: PropTypes.bool,
    refreshFunc: PropTypes.func,
    botonCancelar: PropTypes.string,
    PuedeEditar: PropTypes.string,
};

export default function DialogEditarSolicitud({ params, esResponsable, refreshFunc, botonCancelar = "", PuedeEditar="SI" }) {

    const [open, setOpen] = useState(false);
    const [empleado, setEmpleado] = useState("");
    const [tipo, setTipo] = useState("");
    const [periodoInicio, setPeriodoInicio] = useState("");
    const [periodoFin, setPeriodoFin] = useState("");
    const [totalDias, setTotalDias] = useState("");
    const [idEditar, setIdEditar] = useState("");
    const [editar, setEditar] = useState(false);
    const [quillSimple, setQuillSimple] = useState('');
    const [comentarios, setComentarios] = useState([]);
    const [esAcepetado, setEsAcepetado] = useState('');

    const handleClickOpen = (e, parametro) => {
        // console.log(parametro)
        setOpen(true);
        setEmpleado(parametro.empleadoSolicitanteNombre);
        setPeriodoInicio(parametro.fechaInicio);
        setPeriodoFin(parametro.fechaFin);
        setTotalDias(parametro.diasTotales);
        setIdEditar(parametro.id)
        setTipo(parametro.tipoPeticion)


        // console.log('inicial',parametro.fechaInicio)
        // console.log('final',parametro.fechaFin)

        const urlEndPoint = HOST_API_LOCAL + END_POINT_HISTORIAL_SOLICITUD;
        const AUT = `Bearer ${localStorage.getItem('accessToken')}`

        // Axios para cargar comentarios
        axios({
            method: 'get',
            url: urlEndPoint,
            params: { "filtro": parametro.id },
            headers: { 'Authorization': AUT }
        }).then(response => {
            // console.log(response);
            setComentarios(response.data)
        }).catch(error => {
            console.log(error)
        })



    };
    const handleClose = () => {
        setOpen(false);
    };
    const comenzarEditar = () => {
        setEditar(true)
    }


    const { enqueueSnackbar } = useSnackbar();


    // constantes para documentos
    const [preview, setPreview] = useState(false);
    const [files, setFiles] = useState([]);
    const handleDropMultiFile = useCallback(
        (acceptedFiles) => {
            setFiles([
                ...files,
                ...acceptedFiles.map((newFile) =>
                    Object.assign(newFile, {
                        preview: URL.createObjectURL(newFile),
                    })
                ),
            ]);
        },
        [files]
    );
    const handleRemoveFile = (inputFile) => {
        const filesFiltered = files.filter((fileFiltered) => fileFiltered !== inputFile);
        setFiles(filesFiltered);
    };
    const handleRemoveAllFiles = () => {
        setFiles([]);
    };

    // constantes para el form
    const methods = useForm({
        // setValue
    });
    const {
        handleSubmit,
    } = methods;

    const [loadigBtn, setLoadigBtn] = useState(false);

    const onSubmit = async (data) => {

        // console.log('El data',data)
        setLoadigBtn(true);
        try {

            if ((esAcepetado === "#Rechazado" || editar) && quillSimple.trim() === '') {
                enqueueSnackbar('El campo de comentario no puede estar vacío', { variant: 'error' });
                setOpen(true);
                setLoadigBtn(false);
                return;
            }


            const urlEndPoint = HOST_API_LOCAL + END_POINT_EDITAR_SOLICITUD;
            const form = new FormData();

            const fechaIncioAUX = new Date(periodoInicio.toString())
            const fechaFinAUX = new Date(periodoFin.toString())
            let axiosPass = true;


            if (fechaFinAUX < fechaIncioAUX)
                axiosPass = false;

            if (axiosPass) {
                const AUT = `Bearer ${localStorage.getItem('accessToken')}`;
                form.append("comentario", quillSimple);
                form.append("fechaInicio", fechaIncioAUX.toJSON());
                form.append("fechaFin", fechaFinAUX.toJSON());
                form.append("fechaInicioString", `${fechaIncioAUX.getFullYear()}-${fechaIncioAUX.getMonth() + 1}-${fechaIncioAUX.getDate()}`);
                form.append("fechaFinString", `${fechaFinAUX.getFullYear()}-${fechaFinAUX.getMonth() + 1}-${fechaFinAUX.getDate()}`);
                form.append("Estatus", esAcepetado);
                form.append("id", idEditar);
                form.append("_contextEmpleadoId", localStorage.getItem('EmpleadoId'));
                console.log('FORMM', form);
                console.log('DATA', data);
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
                    if (response.data === "OK") {
                        enqueueSnackbar('¡Los datos fueron actualizados!');
                        setOpen(false);
                        setEditar(false);
                        refreshFunc(new Date().toString())
                        setQuillSimple('');
                    }
                    else {
                        enqueueSnackbar(response.data);
                        console.log('DIAS INSUFICIENTES', response.data)
                    }
                    setLoadigBtn(false);
                });
            } else {
                enqueueSnackbar("La fecha de inicio no puede ser posterior a la de fin")
                setLoadigBtn(false);
            }


        } catch (error) {
            console.error(error);
            setLoadigBtn(false);
        }

        // setOpen(false);
    };


    const [openConfirm, setOpenConfirm] = useState(false);
    const [idAUX, setIdAUX] = useState('');
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const JustAfterClicDelete = () => {

        // console.log('debe de borrar')

        AxiosEliminar(END_POINT_BORRAR_CANCELAR_SOLICITUD, idAUX, metodoOK, metodoOK)

        // handleDeleteRow(IdAUX);
        // onDelete(IdAUX);
    }
    const handleOpenConfirm = (param) => {
        setIdAUX(param.id);
        // setNombreArea(nombreArea);
        // console.log(param)

        setOpenConfirm(true);

        // if (param.editablePorCliente ==="#Editable")
        //    setOpenConfirm(true);
        // else
        //    enqueueSnackbar('No se puede cancelar, la fecha de início es igual o anterior al día de hoy', { variant: 'error' });
    };

    const metodoOK = (param) => {
        // console.log("el param", param)

        enqueueSnackbar(`${param.status}`);
        setOpenConfirm(false);
        refreshFunc(new Date().toString())
    }

    return (
        <>
            <Button color='secondary' onClick={(e) => handleClickOpen(e, params.row)}>
                <Iconify icon="ic:outline-remove-red-eye" />Ver Detalles
            </Button>

            {botonCancelar === "Mostrar" ? 
                <Button color='error'
                    onClick={() => handleOpenConfirm(params.row)}>
                    <Iconify icon="eva:trash-2-outline" />
                    Cancelar
                </Button> :
                null
            }

            

           

            

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle variant='h5' color='primary'>Detalles de la petición</DialogTitle>

                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>


                        <div>{empleado} <RendertipoPeticion tipo={tipo} /></div>
                        <br />
                        <div>

                            <Grid container spacing={3}>
                                <Grid item xs={6} md={4}>
                                    <Controller
                                        name="fechaInicio"
                                        render={({ field, fieldState: { error } }) => (
                                            <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    {...field}
                                                    value={periodoInicio}
                                                    onChange={(e) => { setPeriodoInicio(e) }}
                                                    label="Fecha de Inicio*"
                                                    inputFormat="dd/MM/yyyy"
                                                    disabled={!editar}
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
                                <Grid item xs={6} md={4}>
                                    <Controller
                                        name="fechaFin"
                                        render={({ field, fieldState: { error } }) => (
                                            <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    {...field}
                                                    value={periodoFin}
                                                    onChange={(e) => { setPeriodoFin(e) }}
                                                    label="Fecha de Fin*"
                                                    inputFormat="dd/MM/yyyy"
                                                    disabled={!editar}
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
                                    <Comentarios key={item[0]} Nombre={item[1]} Comentario={item[2]} Fecha={item[3]} />
                                ))}
                            </AccordionDetails>
                        </Accordion>

                        <br />

                        {PuedeEditar === "SI" ?
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
                            // sx={{ height: "25"}}
                            /> :
                            null
                        }
                    </DialogContent>

                    {PuedeEditar==="SI"?

                    <DialogActions>
                        <Button onClick={handleClose} variant="outlined" color='error'>
                            Cerrar
                        </Button>

                        {!editar ?
                            null
                            :
                            <LoadingButton
                                type="submit"
                                variant="outlined"
                                color='secondary'
                                loading={loadigBtn}
                                // disabled={params.row.editablePorCliente === "#No"}
                            >
                                Guardar cambios 
                            </LoadingButton>
                        }
                        {!editar && !esResponsable ? (
                            <Button
                                onClick={comenzarEditar}
                                variant="outlined"
                                color='secondary'
                                // disabled={params.row.editablePorCliente === "#No" }
                            >
                                Editar 
                            </Button>
                        ) : null
                        }

                        {esResponsable ?
                            <>
                                <Button type="submit" onClick={() => { setEsAcepetado("#Rechazado"); handleClose() }} variant="contained" color='error'>
                                    Rechazar
                                </Button>
                                <Button type="submit" onClick={() => { setEsAcepetado("#Autorizado"); handleClose() }} variant="contained">
                                    Autorizar
                                </Button>
                            </>
                            :
                            null
                        }


                    </DialogActions>

                        :

                        <DialogActions>
                            <Button onClick={handleClose} variant="outlined" color='error'>
                                Cerrar
                            </Button>
                        </DialogActions>}


                </FormProvider >

            </Dialog>


            <ConfirmDialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                title="Cancelar"
                content="Deseas cancelar la peticion"
                action={
                    <Button variant="contained" color="error" onClick={JustAfterClicDelete}>
                        Cancelar petición
                    </Button>
                }
            />


        </>

    )
}

function justTry({ some }) {
    return (
        <Grid item xs={4} md={4}>
            <div>{some}</div>
        </Grid>
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


function RendertipoPeticion({ tipo }) {

    console.log("el tipo", tipo)

    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';
    let text = "Falta";
    let colorStatus = "error";
    if (tipo === "1") {
        colorStatus = "primary";
        text = "Vacaciones";
    }
    else if (tipo === "2") {
        colorStatus = "secondary";
        text = "Personal";
    }
    else if (tipo === "3") {
        colorStatus = "warning";
        text = "Retardo";
    }
    else {
        colorStatus = "warning";
        text = "Día Especial";
    }

    return (

        <Label
            variant={isLight ? 'soft' : 'filled'}
            color={colorStatus}
            sx={{ mx: 'auto' }}
        >
            {text}
        </Label>

    );
}






