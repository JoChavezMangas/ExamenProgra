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
import { useTheme } from '@mui/material/styles';

import { CloseIcon } from '../../theme/overrides/CustomIcons';
import Iconify from '../../components/iconify';
import { END_POINT_TABLEROS_MIS_SOLICITUDES, END_POINT_BANDEJA_PETICIONES_ESPECIALES, HOST_API_LOCAL } from '../../config-global';
import Label from '../../components/label';
import DialogEditarSolicitud from './EdicionSolicitud';
import HistorialMisPeticiones from './HistorialMisPeticiones';
import { RenderStatus, RenderPeriodo, RendertipoPeticion } from './MetodosAUX';
import ModalPeticionesEspeciales from './ModalPeticionesEspeciales';
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';

// import Label from '../../../components/label';

export default function TablaMisPeticiones() {
    const [nombreEmpleado, setNombreEmpleado] = useState("");
    const [idSolicitud, setIdSolicitud] = useState("");
    const [idTipoPeticionEspecial, SetIdTipoPeticionEspecial] = useState("");
    const [diasPeticion, setDiasPeticion] = useState("");
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = (SolicitudId, empeladoNombre, tipoPeticionEspecial, diastotales) => {

        // estos colocan o datos
        SetIdTipoPeticionEspecial(tipoPeticionEspecial)
        setNombreEmpleado(empeladoNombre);
        setIdSolicitud(SolicitudId);
        setDiasPeticion(diastotales)
        setOpen(true);
    };
    const parametroBandeja = `#Especiales`;
   

    const [refreshAUX, setRefreshAUX] = useState("");

    const columns = [
        {
            field: 'action',
            headerName: 'Acciones',
//            align: 'center',
            width: 230,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <DialogEditarSolicitud params={params} refreshFunc={setRefreshAUX} botonCancelar="Mostrar" />
            ),
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
            renderCell: (params) => RendertipoPeticion(params.row.tipoPeticion, params.row),
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
    // columns.forEach(column => {
    //    if (column.field === 'estatus') {
    //        const originalRenderCell = column.renderCell;
    //        column.renderCell = params => {
    //            // console.log('Estatus de la solicitud:', params.row.estatus);
    //            return originalRenderCell(params);
    //        };
    //    }
    // });
    // console.log("numero de solicitud", idSolicitud)

    return (

        <>
            {/* <HistorialMisPeticiones /> */}

            <Card>
                <TableContainer sx={{ marginTop: '0px', position: 'relative', overflow: 'unset', }}
                    style={{ width: '100%' }} >
                    <GenericDataGridCustom EndPoint={END_POINT_TABLEROS_MIS_SOLICITUDES} columns={columns} refresh={refreshAUX} />
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

    );
}



