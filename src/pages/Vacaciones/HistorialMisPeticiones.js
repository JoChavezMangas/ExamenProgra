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
} from '@mui/material';

import { CloseIcon } from '../../theme/overrides/CustomIcons';
import Iconify from '../../components/iconify';
import { END_POINT_TABLEROS_MIS_SOLICITUDES, HOST_API_LOCAL } from '../../config-global';
import { RenderStatus, RenderPeriodo, RendertipoPeticion } from './MetodosAUX';
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';

// import Label from '../../../components/label';

export default function HistorialMisPeticiones() {

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
            align: 'center',
            width: 90,
            headerName: 'Total Días',
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
                            Historial de mis peticiones
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid sx={{ padding: 3 }}>
                    <TableContainer>
                        <GenericDataGridCustom EndPoint={END_POINT_TABLEROS_MIS_SOLICITUDES} columns={columns} refresh={refreshAUX} />
                    </TableContainer>
                </Grid>
            </Dialog>
        </>

    );
}










