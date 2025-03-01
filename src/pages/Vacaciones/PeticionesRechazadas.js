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
import { END_POINT_TABLEROS_SOLICITUDES, END_POINT_BANDEJA_PETICIONES_ESPECIALES, HOST_API_LOCAL } from '../../config-global';
import Label from '../../components/label';
import DialogEditarSolicitud from './EdicionSolicitud';
import HistorialPeticiones from './HistorialPeticiones';
import { RendertipoPeticion, RenderPeriodo, RenderStatus } from './MetodosAUX';
import ModalEspeciales from './ModalEspeciales';
import ModalPeticionesEspeciales from './ModalPeticionesEspeciales';
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';



export default function PeticionesRechazadas() {
    const [nombreEmpleado, setNombreEmpleado] = useState("");
    const [idSolicitud, setIdSolicitud] = useState("");
    const [idTipoPeticionEspecial, SetIdTipoPeticionEspecial] = useState("");
    const [diasPeticion, setDiasPeticion] = useState("");
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = (SolicitudId, empeladoNombre, tipoPeticionEspecial, diastotales) => {
        console.log("Red flag", tipoPeticionEspecial)
        SetIdTipoPeticionEspecial(tipoPeticionEspecial)
        setNombreEmpleado(empeladoNombre);
        setIdSolicitud(SolicitudId);
        setDiasPeticion(diastotales)
        setOpen(true);
    };

    const [refreshAUX, setRefreshAUX] = useState("");

    const columns = [
         {
             field: 'action',
             headerName: 'Acciones',
             headerAlign: 'center',
             align: 'center',
             width: 140,
             sortable: false,
             filterable: false,
             disableColumnMenu: true,
             renderCell: (params) => (
                 params.row.tipoPeticion === "1" || params.row.tipoPeticion === "2" ? (
                     <DialogEditarSolicitud params={params} esResponsable refreshFunc={setRefreshAUX} PuedeEditar="NO" />
                 ) :
                     (
                         <Button color='secondary' onClick={(e) =>
                             handleClickOpen(
                                 params.row.id,
                                 params.row.empleadoSolicitanteNombre,
                                 params.row.tipoPeticionEspecial,
                                 params.row.diasTotales
                             )
                         }>
                             <Iconify icon="ic:outline-remove-red-eye" />Ver detalles
                         </Button>
                     )
             ),
         },
        {
            field: 'empleadoSolicitanteNombre',
            width: 210,
            headerName: 'Solicitante',
            headerAlign: 'center',
            align: 'center',
            editable: false
        },
        {
            field: 'fechaCreacion',
            width: 150,
            headerName: 'Fecha de Solicitud',
            headerAlign: 'center',
            align: 'center',
            editable: false
        },
        {
            field: 'tipoPeticion',
            width: 120,
            headerName: 'Tipo de Petición',
            headerAlign: 'center',
            align: 'center',
            editable: false,
            renderCell: (params) => RendertipoPeticion(params.row.tipoPeticion),
        },
        {
            field: 'Periodo',
            width: 210,
            headerName: 'Días Solicitados',
            headerAlign: 'center',
            align: 'center',
            editable: false,
            renderCell: (params) => RenderPeriodo(params.row.fechaInicioString, params.row.fechaFinString),
        },
        {
            field: 'diasTotales',
            width: 85,
            headerName: 'Total Días',
            editable: false,
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'estatus',
            width: 120,
            headerName: 'Estatus',
            headerAlign: 'center',
            align: 'center',
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

    const parametroGenerico = `#Rechazado`

    return (

        <>
            <Card>
                <TableContainer sx={{ marginTop: '0px', position: 'relative', overflow: 'unset', }}
                    style={{ width: '100%' }}>
                    <GenericDataGridCustom
                        EndPoint={END_POINT_TABLEROS_SOLICITUDES}
                        columns={columns}
                        refresh={refreshAUX}
                        genericParamAUX={parametroGenerico}
                        />
                </TableContainer>
            </Card>
            <ModalPeticionesEspeciales
                NombreEmpleado={nombreEmpleado}
                SolicitudId={idSolicitud}
                refreshFunc={setRefreshAUX}
                abrirModal={open}
                metodoCerrar={handleClose}
                tipoPeticionEspecial={idTipoPeticionEspecial}
                diasTotales={diasPeticion}
            />
        </>

    )
}


