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
import { END_POINT_TABLEROS_SOLICITUDES, END_POINT_BANDEJA_PETICIONES_ESPECIALES, HOST_API_LOCAL, END_POINT_SOLICITUDES_GENERAL_RH } from '../../config-global';
import Label from '../../components/label';
import DialogEditarSolicitud from './EdicionSolicitud';
import HistorialPeticiones from './HistorialPeticiones';
import { RendertipoPeticion, RenderPeriodo, RenderStatus } from './MetodosAUX';
import ModalEspeciales from './ModalEspeciales';
import ModalPeticionesEspeciales from './ModalPeticionesEspeciales';
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';

export default function PeticionesTodosEmpleados() {


    const [refreshAUX, setRefreshAUX] = useState("");

    const columns = [
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
            editable: false,
            headerAlign:'center',
            align: 'center'
        },
        {
            field: 'tipoPeticion',
            width: 120,
            headerName: 'Tipo de Petición',
            editable: false,
            renderCell: (params) => RendertipoPeticion(params.row.tipoPeticion),
            headerAlign:'center',
            align: 'center'
        },
        {
            field: 'periodo',
            width: 230,
            headerName: 'Días Solicitados',
            headerAlign:'center',
            align: 'center',
            editable: false,
            renderCell: (params) => RenderPeriodo(params.row.fechaInicioString, params.row.fechaFinString),
        },
        {
            field: 'diasTotales',
            width: 140,
            headerName: 'Total Días',
            editable: false,
            headerAlign:'center',
            align: 'center'
        },
        {
            field: 'estatus',
            width: 120,
            headerName: 'Estatus',
            editable: false,
            renderCell: (params) => RenderStatus(params.row.estatus),
            headerAlign:'center',
            align: 'center'
        },
        {
            field: 'fechaFinString',
            width: 220,
            headerName: 'Fecha Vencimiento',
            editable: false,
            headerAlign:'center',
            align: 'center'
        }
    ];

 
    return (

        <>
            {/* <HistorialPeticiones /> */}
            <Card>
                <TableContainer sx={{ marginTop: '0px', position: 'relative', overflow: 'unset', }}
                    style={{ width: '100%' }}>
                    <GenericDataGridCustom
                        EndPoint={END_POINT_SOLICITUDES_GENERAL_RH}
                        columns={columns}
                        refresh={refreshAUX}
                    />
                </TableContainer>
            </Card>
        </>

    )
}


