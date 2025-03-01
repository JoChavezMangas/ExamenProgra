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
import { END_POINT_BANDEJA_PETICIONES_ESPECIALES, HOST_API_LOCAL } from '../../config-global';
import Label from '../../components/label';
import DialogEditarSolicitud from './EdicionSolicitud';
import { RendertipoPeticion } from './MetodosAUX';
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';
// import { DialogEditarSolicitud } from './EdicionSolicitud';
// import Label from '../../../components/label';






export default function HistorialPeticionesEspeciales() {

    const [refreshAUX, setRefreshAUX] = useState("");

    const columns = [

        {
            field: 'tipoPeticion',
            width: 120,
            headerName: 'Tipo de Petición',
            editable: false,
            renderCell: (params) => RendertipoPeticion(params.row.tipoPeticion),
        },
        {
            field: 'fechaCreacion',
            width: 180,
            headerName: 'Fecha de la Solicitud',
            editable: false,
        },
        {
            field: 'empleadoSolicitanteNombre',
            headerName: 'Colaborador',
            width: 300,
            editable: false,
        },
        {
            field: 'nombreEmpresa',
            headerName: 'Empresa',
            width: 150,
            editable: false,
        },
        {
            field: 'areaDepartamento',
            headerName: 'Área y Departamento',
            width: 200,
            editable: false,
            disableExtendRowFullWidth: true,

            renderCell: (params) => RenderEmpresaAreaDepto(params.row.nombreEmpresa, params.row.nombreArea, '', params.row),
        },
        {
            field: 'puesto',
            headerName: 'Puesto',
            width: 180,
            editable: false,
            renderCell: (params) => (
                <Typography variant="body2" noWrap>
                    {params.row.nombrePuesto}
                </Typography>
            ),
        },

    ];

    const parametroHistorial = "##Historial";
    const parametroBandeja = `#${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}#Bandeja`;

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
                            Historial de peticiones especiales
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid sx={{ padding: 3 }}>
                    <TableContainer sx={{ marginTop: '0px', position: 'relative', overflow: 'unset', }}
                        style={{ width: '100%' }}>
                        <GenericDataGridCustom
                            EndPoint={END_POINT_BANDEJA_PETICIONES_ESPECIALES}
                            columns={columns}
                            refresh={refreshAUX}
                            genericParamAUX={parametroBandeja}
                        />
                    </TableContainer>
                </Grid>
            </Dialog>
        </>

    )
}

// function RendertipoPeticion(tipo) {
//    const theme = useTheme();
//    const isLight = theme.palette.mode === 'light';
//    let text = "Falta";
//    let colorStatus = "error";
//    if (tipo === "1") {
//        colorStatus = "primary";
//        text = "Vacaciones";
//    }
//    else if (tipo === "2") {
//        colorStatus = "secondary";
//        text = "Personal";
//    }
//    else if (tipo === "3") {
//        colorStatus = "warning";
//        text = "Retardo";
//    }
//    else if (tipo === "4") {
//        colorStatus = "warning";
//        text = "D�a especial";
//    }

//    return (
//        <div>
//            <Label
//                variant={isLight ? 'soft' : 'filled'}
//                color={colorStatus}
//                sx={{ mx: 'auto' }}
//            >
//                {text}
//            </Label>
//        </div>
//    );
// }

function RenderEmpresaAreaDepto(empresa, area, dpto, toshow) {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';
    let result;


    if (dpto !== '') {

        result = (
            <a>
                <Label
                    variant={isLight ? 'soft' : 'filled'}
                    color='secondary'
                    sx={{ mx: 'auto' }}
                >
                    {area}
                </Label>
                <Label
                    variant={isLight ? 'soft' : 'filled'}
                    color='success'
                    sx={{ mx: 'auto' }}
                >
                    {dpto}
                </Label>
            </a>
        );




    } else {
        result = (
            <a>
                <Label
                    variant={isLight ? 'soft' : 'filled'}
                    color='secondary'
                    sx={{ mx: 'auto' }}
                >
                    {area}
                </Label>
            </a>
        );
    }

    return (
        <>
            {result}
        </>
    )
}
