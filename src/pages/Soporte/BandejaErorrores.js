import { Helmet } from 'react-helmet-async';
// @mui
import {
    Card,
    TableContainer,
} from '@mui/material';

import { END_POINT_BANDEJA_LOGS } from '../../config-global';
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';




export default function BandejaEmpresa() {

    const columns = [

        {
            field: 'fechaCreacionString',
            headerName: 'Fecha',
            editable: false,
            width: 230,
            // renderCell: (params) => RenderStatus(params.row.nombreDepartamento, params.row),
        },
        {
            field: 'status',
            headerName: 'status',
            editable: false,
            width: 230,
            // renderCell: (params) => RenderStatus(params.row.nombreDepartamento, params.row),
        },
        {
            field: 'urlEnpoint',
            headerName: 'urlEnpoint',
            flex: 1,
            editable: false,
        },
        {
            field: 'message',
            headerName: 'message',
            flex: 1,
            editable: false,
        },
        {
            field: 'json',
            headerName: 'json',
            flex: 1,
            editable: false,
        }

    ];

    return (
        <>
            <Helmet>
                <title> Log de errores </title>
            </Helmet>


          


            <Card>
                <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                    <GenericDataGridCustom EndPoint={END_POINT_BANDEJA_LOGS} columns={columns}/>
                </TableContainer>
            </Card>
            

        </>
    );
}

