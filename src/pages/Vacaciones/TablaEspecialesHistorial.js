import * as React from 'react';
import { useState } from 'react';
// @mui
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
}
    from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CloseIcon } from '../../theme/overrides/CustomIcons';
import Iconify from '../../components/iconify';
// sections
import { END_POINT_TABLEROS_MIS_SOLICITUDES, HOST_API_LOCAL, END_POINT_TABLEROS_SOLICITUDES } from '../../config-global';
import Label from '../../components/label';
import DialogEditarSolicitud from './EdicionSolicitud';
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';

// import Label from '../../../components/label';

export default function TablaEspecialesHistorial() {

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
            field: 'tipoPeticionEspecial',
            width: 120,
            headerName: 'Tipo de petición',
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
            headerName: 'Total días',
            editable: false,
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

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (

        <>
            <Button variant="contained" onClick={handleClickOpen} sx={{ position: 'fixed', right: 0, top: '20%', borderRadius: '5px 0 0 5px', zIndex: 2 }} startIcon={<Iconify icon="material-symbols:list-alt-outline" />}>
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
                            Historial de mis peticiones especiales
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid sx={{ padding: 3 }}>
                    <TableContainer>
                        <GenericDataGridCustom EndPoint={END_POINT_BANDEJA_PETICIONES_ESPECIALES} columns={columns} refresh={refreshAUX} />
                    </TableContainer>
                </Grid>
            </Dialog>
        </>

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

function RenderStatus(status) {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    let colorStatus = "info";

    if (status === "#Rechazado")
        colorStatus = "error";
    else if (status === "#Autorizado")
        colorStatus = "success";

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

function RendertipoPeticion(tipo) {
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
    else if (tipo === "4") {
        colorStatus = "warning";
        text = "Día especial";
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
