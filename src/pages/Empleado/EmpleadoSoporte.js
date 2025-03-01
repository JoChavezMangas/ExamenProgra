import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
    Card,
    Button,
    Container,
    IconButton,
    TableContainer,
    Typography,
    MenuItem,
    Link,
    Tabs,
    Box,
    Tab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import { _employeeList } from '../../_mock/arrays';
// components
import Iconify from '../../components/iconify';
import ConfirmDialog from '../../components/confirm-dialog';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
// import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';
import Label from '../../components/label';
import { CustomAvatar } from '../../components/custom-avatar';
import MenuPopover from '../../components/menu-popover';
import {
    HOST_API_LOCAL,
    END_POINT_BANDEJAEMPLEADOS,
    END_POINT_ELIMINAR_EMPLEADO,
    END_POINT_OBTENER_EMPLEADO,
    END_POINT_EDITAR_EMPLEADO,
    END_POINT_BANDEJAEMPLEADOS_EMPRESA,
    END_POINT_BORRAR_EMPLEADO,
    END_POINT_BANDEJAEMPLEADOS_EN_BASE,
    END_POINT_CAMBIAR_PASS_MULTI
} from '../../config-global';
import { AxiosEliminar, AxiosMandarForm } from '../../_Axios/AxiosFomr';
import BandejaEmpresaEmpleado from '../Empresa/BandejaEmpresaEmpleado';
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';
import FormProvider, {
    RHFSelect,
    RHFTextField,
} from '../../components/hook-form';


export default function EmpleadoSoporte() {
    const perfilUsuario = localStorage.getItem('RolId');
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [IdAUX, setIdAUX] = useState();
    const [editRowId, setEditRowId] = useState(null);


    const navigate = useNavigate();

    const handleEditRow = (id) => {
        navigate(PATH_DASHBOARD.empleadoSoporte.edit(id));
    };

    const [refreshAUX, setRefreshAUX] = useState('')

    const methods = useForm();

    const columns = [
        {
            field: 'nombreCompleto',
            headerName: 'Colaborador',
            width: 250,
            editable: false,
            renderCell: (params) => (

                <Link
                    component="button"
                    fontSize='13px'
                    fontWeight='600'
                    color='#16463f'
                    onClick={() => handleEditRow(params.row.id)}
                >
                    {params.row.nombreCompleto}
                </Link>
            ),
        },
        {
            field: 'nombreEmpresa',
            headerName: 'Empresa',
            width: 150,
            editable: false,
        },
        {
            field: 'userName',
            headerName: 'Usuario',
            width: 250,
            editable: false,
        },
        {
            field: 'correoEmpresarial',
            headerName: 'Correo',
            width: 250,
            editable: false,
        },
        {
            field: 'action',
            headerName: 'Acciones',
            align: 'center',
            headerAlign: 'center',
            width: 300,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <>

                    <Button
                        color="primary"
                        onClick={() => handleEditRow(params.row.id)}
                        sx={{ p: 1 }}
                    >
                        <Iconify icon="eva:edit-fill" />
                        Editar
                    </Button>
                </>
            ),
        },

    ];

    return (
        <>
            <Helmet>
                <title> Soporte</title>
            </Helmet>
            <CustomBreadcrumbs
                heading={
                    <Typography variant='h4' color='primary'>Soporte</Typography>
                }
                links={[
                    { name: '' },
                ]}
            />
            <Card>
                <TableContainer sx={{ marginTop: '0px', position: 'relative', overflow: 'unset' }} style={{ width: '100%' }}>
                    <GenericDataGridCustom EndPoint={END_POINT_BANDEJAEMPLEADOS_EN_BASE} columns={columns} refresh={refreshAUX} />
                </TableContainer>
            </Card>

        </>
    );
}



