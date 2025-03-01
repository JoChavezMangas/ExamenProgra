import * as React from 'react';
import { useState } from 'react';
// @mui
import PropTypes from 'prop-types';
import {
    Card,
    TableContainer,
    IconButton,
    Typography,
    Button,
    Grid,
    Dialog,
    AppBar,
    Toolbar,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Box,
} from '@mui/material';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator, timelineOppositeContentClasses } from '@mui/lab';
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';
import { CloseIcon } from '../../theme/overrides/CustomIcons';
import Iconify from '../../components/iconify';
import { END_POINT_TABLEROS_MIS_SOLICITUDES, HOST_API_LOCAL } from '../../config-global';
import { RenderStatus, RenderPeriodo, RendertipoPeticion } from './MetodosAUX';


// import Label from '../../../components/label';


BalanceHistorial.prototype = {
    EmpleadoId: PropTypes.string,
    Nombre: PropTypes.string,
};

export default function BalanceHistorial({ EmpleadoId, Nombre }) {

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [refreshAUX, setRefreshAUX] = React.useState("");

    const ParamAUX = `#${EmpleadoId}#BalanceEmpleado`
           
    const accordionStyle = {
        backgroundColor: 'rgba(31,147,130, 0.1)',
        marginTop: '20px',
        borderRadius: '8px, 0px'
    };

    return (
        <>
            <Button variant="contained"
                fullWidth
                color='primary' onClick={handleClickOpen}>
                <Iconify icon='ci:show' />&nbsp;
                Historial del Empleado
            </Button>

            <Button variant="contained" onClick={handleClickOpen} sx={{ position: 'fixed', right: 0, top: '20%', borderRadius: '5px 0 0 5px', zIndex: 2 }} startIcon={<Iconify icon="material-symbols:list-alt-outline" />}>
                Historial
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle variant='h5' color='primary'>Historial del Empleado</DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText sx={{ pb: 3 }}>
                            Por favor, selecciona las fechas
                        </DialogContentText>  */}

                        <Grid container spacing={2} sx={{ pb: 3 }}>
                <Grid item xs={12} md={12}>
                    <Box
                        rowGap={2}
                        columnGap={2}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                        }}
                    >
                        <Grid item md={6}>
                                <Typography sx={{ fontWeight: 'bold' }}>
                                    Fecha de Ingreso
                                </Typography>
                                <Typography color="inheart">15/12/2021</Typography>
                        </Grid>
                        <Grid item md={6}>
                                <Typography sx={{ fontWeight: 'bold' }}>
                                    Días que le Corresponden
                                </Typography>
                                <Typography color="inheart">12 Días (Del año 8)</Typography>
                        </Grid>
                        <Grid item md={6}>
                                <Typography sx={{ fontWeight: 'bold' }}>
                                    Política
                                </Typography>
                                <Typography color="inheart">Política Ley 2023</Typography>
</Grid>
<Grid item md={6}>
                                <Typography sx={{ fontWeight: 'bold' }}>
                                    Tipo de Contratación
                                </Typography>
                                <Typography color="inheart">15/12/2021</Typography>
</Grid>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ pb: 3, pt:2 }}>
                <Grid item xs={12} md={12}>
                <Typography variant='h5' color="primary">
                                    <Iconify icon='material-symbols:date-range' /> &nbsp;
                                    14 Días Disponibles
                                </Typography>
                    <Box
                        rowGap={3}
                        columnGap={3}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                        }}
                    >
                                                <Grid item md={6}>

                                <Typography sx={{fontWeight:'bold'}} color="inheart">9 Días</Typography>
                                <Typography>Expiran el 24 de Diciembre 2023 </Typography>
                                </Grid>
                                <Grid item md={6}>

                                <Typography sx={{fontWeight:'bold'}} color="inheart">15 Días</Typography>
                                <Typography>Expiran el 24 de Febrero 2024</Typography>
</Grid>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ pb: 3 }}>
                <Grid item xs={12} md={12}>
                    <Box
                        rowGap={3}
                        columnGap={3}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(1, 1fr)',
                        }}
                    >
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
                                                    [`& .${timelineOppositeContentClasses.root}`]: {
                                                        flex: 0.2,
                                                    },
                                                }}
                                            >
                                                <TimelineItem>
                                                    <TimelineOppositeContent color="textSecondary">
                                                        09:30 am
                                                    </TimelineOppositeContent>
                                                    <TimelineSeparator>
                                                        <TimelineDot/>
                                                        <TimelineConnector/>
                                                    </TimelineSeparator>
                                                    <TimelineContent>Eat</TimelineContent>
                                                </TimelineItem>
                                                <TimelineItem>
                                                    <TimelineOppositeContent color="textSecondary">
                                                        10:00 am
                                                    </TimelineOppositeContent>
                                                    <TimelineSeparator>
                                                        <TimelineDot />
                                                    </TimelineSeparator>
                                                    <TimelineContent>Code</TimelineContent>
                                                </TimelineItem>
                                            </Timeline>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>

                    </Box>
                </Grid>
            </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="outlined" color='error'>
                            Cerrar
                        </Button>
                    </DialogActions>
            </Dialog>
        </>

    );
}




