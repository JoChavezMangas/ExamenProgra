import * as React from 'react';
import { useState } from 'react';
import {
    Card,
    TableContainer,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles'
import { END_POINT_BANDEJAEMPLEADOS, HOST_API_LOCAL } from '../../config-global';
import Label from '../../components/label';
import ModalEspeciales from './ModalEspeciales';
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';



export default function TablaEspeciales() {

    const [refreshAUX, setRefreshAUX] = useState("");

    const columns = [
        {
            field: 'action',
            headerName: 'Acciones',
            align: 'center',
            width: 170,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <ModalEspeciales
                    NombreEmpleado={params.row.nombreCompleto}
                    EmpleaodoId={params.row.id}
                    params={params}
                    esResponsable
                    refreshFunc={setRefreshAUX}
                />
            ),
        },
        {
            field: 'nombreCompleto',
            headerName: 'Colaborador',
            width: 300,
            editable: false,
        },
        {
            field: 'nombreEmpresa',
            headerName: 'Empresa',
            width:150,
            editable: false,
        },
        {
            field: 'nombreArea',
            headerName: 'Área',
            width: 200,
            editable: false,
            disableExtendRowFullWidth:true,

        },
        {
            field: 'nombreDepartamento',
            headerName: 'Departamento',
            width: 200,
            editable: false,
            disableExtendRowFullWidth:true,

        },
        {
            field: 'nombrePuesto',
            headerName: 'Puesto',
            width: 180,
            editable: false,
            // renderCell: (params) => (
            //     <Typography variant="body2" noWrap>
            //         {params.row.nombrePuesto}
            //     </Typography>
            // ),
        },

    ];

    const parametroBandeja = `#${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}#Bandeja#Activos `;


    return (

            <Card>
                <TableContainer sx={{ marginTop: '0px', position: 'relative', overflow: 'unset', }}
                    style={{ width: '100%' }}>
                    <GenericDataGridCustom
                        EndPoint={END_POINT_BANDEJAEMPLEADOS}
                        columns={columns}
                        refresh={refreshAUX}
                        genericParamAUX={parametroBandeja}
                    />
                </TableContainer>
            </Card>

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

function RenderEmpresaAreaDepto(empresa, area, dpto,toshow) {
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

