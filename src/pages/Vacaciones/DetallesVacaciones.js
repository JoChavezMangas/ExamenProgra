import PropTypes from 'prop-types';

import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Form, useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton, Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator, timelineOppositeContentClasses, timelineItemClasses } from '@mui/lab';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { DatePicker } from '@mui/x-date-pickers';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
// // utils
import { fData } from '../../utils/formatNumber';
// routes
import { PATH_AUTH, PATH_DASHBOARD } from '../../routes/paths';
// // assets
// import { countries } from '../../../assets/data';
// // components
import Label from '../../components/label';
import FormProvider, {
    RHFSelect,
    RHFTextField,
    RHFRadioGroup,
    RHFUploadPhoto,

} from '../../components/hook-form';
import { END_POINT_OBTENER_GENERALESVACACIONES, END_POINT_OBTENER_HISTVACACIONES } from '../../config-global';
import GenericCombo from '../../utils/GenericCombo';
import Iconify from '../../components/iconify';
import { AxiosCambiarPassword, AxiosIdSucces } from '../../_Axios/AxiosFomr';
import { useAuthContext } from '../../auth/useAuthContext';
import { RenderPeriodo, RenderStatus } from './MetodosAUX';
import { RendertipoPeticion } from './HistorialPeticiones';
import { RenderEstatus } from '../Empleado/AdministrarEmpleado';

// ----------------------------------------------------------------------


DetallesVacaciones.propTypes = {
    isEdit: PropTypes.bool,
    currentEmpleado: PropTypes.object,
};


export default function DetallesVacaciones({ isEdit = false, currentEmpleado }) {

    const navigate = useNavigate();
    const { user, logout } = useAuthContext();
    const [userName, setUserName] = useState();

    const [disabled, setDisabled] = useState(isEdit);

    const accordionStyle = {
        backgroundColor: 'rgba(31,147,130, 0.1)',
        marginTop: '20px',
        borderRadius: '8px, 0px'
    };

    useEffect(() => {
        const empleadoActual = localStorage.getItem('EmpleadoId');
        AxiosIdSucces(empleadoActual, END_POINT_OBTENER_GENERALESVACACIONES, succesFuncData)
        AxiosIdSucces(empleadoActual, END_POINT_OBTENER_HISTVACACIONES, succesFuncHist)
    }, [])

    const succesFuncHist = (data) => {
        // console.log('lo que se trae del back', data);
        setHistorial(data);
    }

    const succesFuncData = (data) => {
        // console.log('lo que se trae del back', data)
        setDiasCorrespondientes(data.diasCorrespondientes);
        setFechaExpiracionVacaciones(data.fechaExpiracionVacaciones);
        setFechaExpiracionPersonales(data.fechaExpiracionPersonales);
        setFechaIngreso(data.fechaIngreso);
        setPersonalesDisponibles(data.personalesDisponibles);
        setPolitica(data.politica);
        setVacacionesDisponibles(data.vacacionesDisponibles);
        setPeriodosEnEmpresas(data.periodosEnEmpresa)
    }

    const [diasCorrespondientes, setDiasCorrespondientes] = useState("");
    const [fechaExpiracionVacaciones, setFechaExpiracionVacaciones] = useState("");
    const [fechaExpiracionPersonales, setFechaExpiracionPersonales] = useState("");
    const [fechaIngreso, setFechaIngreso] = useState("");
    const [personalesDisponibles, setPersonalesDisponibles] = useState("");
    const [politica, setPolitica] = useState("");
    const [vacacionesDisponibles, setVacacionesDisponibles] = useState("");
    const [periodosEnEmpresa, setPeriodosEnEmpresas] = useState("");
    const [historial, setHistorial] = useState([{ diasTotales:"", estatus:"", tipoPeticion:"", tipoPeticionString: "", fechaInicioString: "", fechaFinString :""}]);

    return (
        <>
            <Grid container spacing={3} sx={{ pb: 3 }}>
                <Grid item xs={12} md={12}>
                    <Box
                        rowGap={3}
                        columnGap={3}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(4, 1fr)',
                        }}
                    >
                        <Card>
                            <CardContent>
                                <Typography color="primary" sx={{ fontWeight: 'bold' }}>
                                    <Iconify icon='material-symbols:date-range' /> &nbsp;
                                    Fecha de Ingreso
                                </Typography>
                                <Typography variant='subtitle2' color="inheart">{fechaIngreso}</Typography>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Typography color='primary' sx={{ fontWeight: 'bold' }}>
                                    <Iconify icon='icon-park-outline:vacation' /> &nbsp;
                                    Días que le Corresponden
                                </Typography>
                                <Typography variant='subtitle2' color="inheart">{diasCorrespondientes} Días (Del año {periodosEnEmpresa})</Typography>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Typography color="primary" sx={{ fontWeight: 'bold' }}>
                                    <Iconify icon='mingcute:document-line' /> &nbsp;
                                    Política
                                </Typography>
                                <Typography variant='subtitle2' color="inheart">{politica}</Typography>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Typography color="primary" sx={{ fontWeight: 'bold' }}>
                                    <Iconify icon='pajamas:work' /> &nbsp;
                                    Tipo de Contratación
                                </Typography>
                                <Typography variant='subtitle2' color="inheart">{fechaIngreso }</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ pb: 3 }}>
                <Grid item xs={8} md={8}>
                    { /* <Box
                        rowGap={3}
                        columnGap={3}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                        }}
                    > */ }


                        <Card>
                            <CardContent>
                                <Typography variant='h4' color="primary">
                                    <Iconify icon='material-symbols:date-range' /> &nbsp;
                                    {vacacionesDisponibles } Días Disponibles
                                </Typography><br />
                                <Typography variant='h6' color="inheart">{vacacionesDisponibles } Días</Typography>
                                <Typography>Expiran el {fechaExpiracionVacaciones} </Typography>
                                <Typography variant='h6' color="inheart">{personalesDisponibles } Días</Typography>
                                <Typography>Expiran el {fechaExpiracionPersonales }</Typography>
                                <Accordion>
                                    <AccordionSummary expandIcon={<GridExpandMoreIcon />} style={accordionStyle}>
                                        <Typography variant='h6'
                                            sx={{ color: '#1f9382', }}>
                                            Historial
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>



                                        <Typography>




                                            <Timeline
                                                sx={{
                                                    [`& .${timelineItemClasses .root}:before`]: {
                                                        flex: 0,
                                                        padding: 0,
                                                }
                                                }}
                                            >

                                                {historial.map((tab) => (
                                                    <TimelineItem sx={{ padding: 0}} >

                                                       
                                                        <TimelineSeparator>
                                                            <TimelineDot />
                                                            <TimelineConnector />
                                                        </TimelineSeparator>
                                                        <TimelineContent>Dias totales: {tab.diasTotales}</TimelineContent>
                                                        <TimelineContent>{RendertipoPeticion(tab.tipoPeticion)} {RenderStatus(tab.estatus)}</TimelineContent>

                                                  
                                                        <TimelineContent>
                                                            <Typography  component="span">
                                                                De:
                                                                <Label variant='soft' color='success' sx={{ mx: 'auto' }}>
                                                                   {tab.fechaInicioString}
                                                                </Label>
                                                            </Typography>
                                                        </TimelineContent>
                                                        <TimelineContent>
                                                            <Typography  component="span">
                                                                a:
                                                                <Label variant='soft' color='success' sx={{ mx: 'auto' }}>
                                                                   {tab.fechaFinString}
                                                                </Label>
                                                            </Typography>
                                                        </TimelineContent>


                                                    
                                                        
                                                    </TimelineItem>
                                                    
                                                    ))}
                                             
                                            </Timeline>





                                        </Typography>





                                    </AccordionDetails>
                                </Accordion>
                            </CardContent>
                        </Card>

                </Grid>
                <Grid item xs={4} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant='h4' color="primary">Detalles de la Política</Typography><br />
                                <Iconify icon='icon-park-outline:vacation' color="primary" />
                                <Typography variant='subtitle2' color="inheart">{diasCorrespondientes} Días (Del año {periodosEnEmpresa})</Typography>
                            </CardContent>
                    </Card>

                

                    { /*  </Box> */ }
                </Grid>
            </Grid>
        </>
    );
}
