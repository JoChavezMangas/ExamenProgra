import * as React from 'react';
import { useState } from 'react';
import {
    Button,
    Card,
    TableContainer,
} from '@mui/material';
import { useTheme } from '@mui/material/styles'
import { END_POINT_BANDEJA_PERIODO_VACACIONES_ADELANTAR } from '../../config-global';
import Iconify from '../../components/iconify/Iconify';
import Label from '../../components/label';
import ModalAdelanto from './ModalAdelanto';
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';



export default function TablaAdelanto() {

    const [nombreEmpleado, setNombreEmpleado] = useState("");
    const [open, setOpen] = useState(false);
    const [periodo, setPeriodo] = useState ('');
    const [idEmpleado, setIdEmpleado] = useState ('');
    const handleClickOpen = (e,parametro) => {
        console.log('AQUÍ ESTÁ EL PARAMETRO',parametro)
        setOpen(true);
        setPeriodo(parametro.periodo);
        setIdEmpleado(parametro.empleadoSolicitante);
        setNombreEmpleado(parametro.empleadoSolicitanteNombre);
    };
    
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
            field: 'periodo',
            width: 200,
            headerName: 'Período a adelantar',
            editable: false,
            renderCell: (params) => RenderPeriodo(params.row.periodo),
        },

        {
            field: 'comentario',
            width: 250,
            headerName: 'Comentarios',
            editable: false,
        },
        {
            field: 'action',
            headerName: 'Acciones',
            align: 'center',
            width: 180,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <Button color='warning' onClick={(e) => 
                handleClickOpen(e, params.row)}>
                    <Iconify icon="ic:round-keyboard-double-arrow-right" />
                    Adelantar Período
                </Button>
                // <ModalAdelanto empleadoId={params.row.empleadoSolicitante} esResponsable refreshFunc={setRefreshAUX} />
                ),
        },
    ];

    const parametroBandeja = localStorage.getItem('EmpleadoId');


    return (
        <>

            <Card>
                <TableContainer sx={{ marginTop: '0px', position: 'relative', overflow: 'unset', }}
                    style={{ width: '100%' }}>
                    <GenericDataGridCustom
                        EndPoint={END_POINT_BANDEJA_PERIODO_VACACIONES_ADELANTAR}
                        columns={columns}
                        refresh={refreshAUX}
                        genericParamAUX={parametroBandeja}
                    />
                </TableContainer>
            </Card>
            <ModalAdelanto 
                NombreEmpleado={nombreEmpleado}
                abrirModal={open}
                setAbrirModal={setOpen}
                empleadoId={idEmpleado}
                esResponsable
                refreshFunc={setRefreshAUX}
            />
</>

    )
}


function RenderPeriodo(periodo) {

    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    return (
        <div>
            <Label
                variant={isLight ? 'soft' : 'filled'}
                color='success'
                sx={{ mx: 'auto' }}
            >
                {periodo}
            </Label>
        </div>
    );
}

