import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// @mui
import {
    Card,
    Button,
    Dialog,
    TableContainer,
    IconButton,
    Typography,
    Grid,
    AppBar,
    Toolbar,
} from '@mui/material';
import { useTheme } from '@mui/material/styles'
import { CloseIcon } from '../../theme/overrides/CustomIcons';
import Iconify from '../../components/iconify';
import { END_POINT_TABLEROS_SOLICITUDES, HOST_API_LOCAL } from '../../config-global';
import Label from '../../components/label';
import DialogEditarSolicitud from './EdicionSolicitud';
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';
// import { DialogEditarSolicitud } from './EdicionSolicitud';
// import Label from '../../../components/label';






export default function HistorialPeticiones() {

    const [refreshAUX, setRefreshAUX] = useState("");

    const columns = [
        {
            field: 'id',
            headerName: 'Id',
            flex: 1,
            editable: false,
            hide: true
        },
        {
            field: 'empleadoSolicitanteNombre',
            width: 250,
            headerName: 'Solicitante',
            editable: false
        },
        {
            field: 'fechaCreacion',
            width: 150,
            headerName: 'Fecha de Solicitud',
            editable: false
        },
        {
            field: 'tipoPeticion',
            width: 120,
            headerName: 'Tipo de Petición',
            editable: false,
            renderCell: (params) => RendertipoPeticion(params.row.tipoPeticion),
        },
        {
            field: 'Periodo',
            width: 250,
            headerName: 'Período',
            editable: false,
            renderCell: (params) => RenderPeriodo(params.row.fechaInicioString, params.row.fechaFinString),
        },
        {
            field: 'diasTotales',
            width: 90,
            headerName: 'Total Días',
            editable: false,
            align:'center'
        },
        {
            field: 'estatus',
            width: 120,
            headerName: 'Estatus',
            editable: false,
            renderCell: (params) => RenderStatus(params.row.estatus),
        },
        {
            field: 'comentario',
            width: 250,
            headerName: 'Comentarios',
            editable: false,
        }
    ];

    const parametroHistorial = "##Historial";
    const parametroBandeja = `#${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}#Bandeja`;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (

        <>
            <Button variant="contained" onClick={handleClickOpen} sx={{position:'fixed', right:0, top:'20%', borderRadius:'5px 0 0 5px', zIndex:2 }} startIcon={<Iconify icon="material-symbols:list-alt-outline" />}>
                Historial
            </Button>
            
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Historial de peticiones
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid sx={{ padding:3}}>
                    <TableContainer>
                        <GenericDataGridCustom
                            EndPoint={END_POINT_TABLEROS_SOLICITUDES}
                            columns={columns}
                            refresh={refreshAUX}
                            genericParamAUX={parametroHistorial}
                        />
                </TableContainer>
                </Grid>
            </Dialog>
        </>

    )
}

export function RendertipoPeticion(tipo) {

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
        colorStatus = "error";
        text = "Retardo";
    }
    else {
        colorStatus = "warning";
        text = "Día Especial";
    }

    return (
        <div>
            <Label
                variant={isLight ? 'soft' : 'filled'}
                color={colorStatus}
                sx={{ mx: 'auto' }}
            >
                {text}
            </Label>
        </div>
    );
}


function RenderPeriodo(incio, fin) {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    return (
        <div>
            <Label
                variant={isLight ? 'soft' : 'filled'}
                color='success'
                sx={{ mx: 'auto' }}
            >
                {incio}
            </Label>
            /
            <Label
                variant={isLight ? 'soft' : 'filled'}
                color='success'
                sx={{ mx: 'auto' }}
            >
                {fin}
            </Label>
        </div>
    );
}

export function RenderStatus(status) {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';
    const colorPurpura = "#ce93d8"

    let colorStatus = "info";

    if (status === "#Rechazado")
        colorStatus = "error";
    else if (status === "#Pendiente")
        colorStatus = "warning";
    else if (status === "#Autorizado")
        colorStatus = "success";
    else if (status === "#PendienteRH")
        colorStatus = "secondary";
    else if (status === "#AutorizadoRH")
        colorStatus = "primary";
    return (
        <div>
            <Label
                variant={isLight ? 'soft' : 'filled'}
                color={colorStatus}
                sx={{ mx: 'auto' }}
            >
                {status}
            </Label>
        </div>
    );
}

