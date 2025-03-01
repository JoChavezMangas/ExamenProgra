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
    Tab
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import axios from 'axios';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import { _employeeList } from '../../_mock/arrays';
// components
import Iconify from '../../components/iconify';
import ConfirmDialog from '../../components/confirm-dialog';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';
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
    END_POINT_BORRAR_EMPLEADO
} from '../../config-global';
import { AxiosEliminar, AxiosMandarForm } from '../../_Axios/AxiosFomr';
import BandejaEmpresaEmpleado from '../Empresa/BandejaEmpresaEmpleado';
import ModalBajaAlta from './ModalBajaAlta';


export default function EmpleadosInactivos() {
    const perfilUsuario = localStorage.getItem('RolId');
    const [nombreEmpleado, setNombreEmpleado] = useState("");
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const [editRowId, setEditRowId] = useState(null);

    const navigate = useNavigate();

    const handleEditRow = (id) => {
        navigate(PATH_DASHBOARD.empleado.edit(id));
    };
    const handleClickOpen = (parametro, empeladoNombre) => {
        setNombreEmpleado(empeladoNombre);
        setOpen(true);
    };

    const [refreshAUX, setRefreshAUX] = useState('')

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
            field: 'fechaBaja',
            headerName: 'Fecha de Baja',
            width: 150,
            editable: false,
            renderCell: (params) => (<div>{params.row.fechaBaja.split(' ')[0]}</div>),
        },
        {
            field: 'comentario',
            headerName: 'Comentarios',
            editable: false,
            width: 200,
        },
        {
            field: 'action',
            headerName: 'Acciones',
            align: 'center',
            headerAlign: 'center',
            width: 200,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <Button color='secondary' onClick={(e) =>
                    handleClickOpen(
                        params.row.id,
                        params.row.nombreCompleto,
                    )}>
                    <Iconify icon="mdi:account-reactivate" />Activar Empleado
                </Button>),
        },
    ];


    return (
        <>
            <Card>
                <TableContainer sx={{ marginTop: '0px', position: 'relative', overflow: 'unset' }} style={{ width: '100%' }}>
                    <GenericDataGridCustom EndPoint={END_POINT_BANDEJAEMPLEADOS} columns={columns} refresh={refreshAUX} />
                </TableContainer>

            </Card>
            <ModalBajaAlta
                NombreEmpleado={nombreEmpleado}
                refreshFunc={setRefreshAUX}
                abrirModal={open}
                metodoCerrar={handleClose}
                actionType="Activar"
            />
        </>
    );
}

