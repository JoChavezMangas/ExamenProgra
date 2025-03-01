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
    Hidden
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
    END_POINT_BORRAR_EMPLEADO
} from '../../config-global';
import { AxiosEliminar } from '../../_Axios/AxiosFomr';
import EmpleadosTotal from './EmpleadosTotal';
import EmpleadosActivos from './EmpleadosActivos';
import EmpleadosBaja from './EmpleadosBaja';


export default function BandejaEmpleado() {
    const perfilUsuario = localStorage.getItem('RolId');
    const [openConfirm, setOpenConfirm] = useState(false);
    const [tableData, setTableData] = useState(_employeeList);
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [IdAUX, setIdAUX] = useState();
    const [editRowId, setEditRowId] = useState(null);

    const navigate = useNavigate();

    // console.log("RolId es ", perfilUsuario);

    const handleOpenConfirm = (id, nombreCompletoo) => {
        setIdAUX(id)
        setNombreCompleto(nombreCompletoo);
        setOpenConfirm(true);
    };
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };
    const handleEditRow = (id) => {
        // console.log(id)
        navigate(PATH_DASHBOARD.empleado.edit(id));
    };

    const handleDeleteRow = (id) => {
        const deleteRow = tableData.filter((row) => row.id !== id);
        setTableData(deleteRow);
        setOpenConfirm(false);
    };

    const { enqueueSnackbar } = useSnackbar();

    const onDelete = async (id) => {
        try {
            await AxiosEliminar(END_POINT_BORRAR_EMPLEADO, id, succesFunc, enqueueSnackbar);;
        } catch (error) {
            console.error(error);
        }
    };

    const [refreshAUX, setRefreshAUX] = useState('')

    const succesFunc = () => {
        enqueueSnackbar('El empleado fue borrado')
        setRefreshAUX(new Date().getTime())
    }

    const JustAfterClicDelete = () => {
        // console.log('OTRO ID', IdAUX)
        handleDeleteRow(IdAUX);
        onDelete(IdAUX);
    }

    const TABS = [
        { value: 'Empleados', label: 'Todos los Empleados', component: <EmpleadosTotal /> },
        { value: 'Activos', label: 'Empleados Activos', component: <EmpleadosActivos /> },
        { value: 'Baja', label: 'Bajas', component: <EmpleadosBaja /> },
    ];

    const [currentTab, setCurrentTab] = useState('Empleados');




    return (
        <>
            <Helmet>
                <title> Empleado </title>
            </Helmet>

            {/* <Container> */}
            <Hidden smDown>
                <CustomBreadcrumbs
                    heading={
                        <>Empleado</>
                    }
                    links={[{ name: '' },]}
                    action={<Button component={RouterLink}
                        to={PATH_DASHBOARD.empleado.new}
                        variant="contained"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                    >
                        Crear Empleado
                    </Button>}
                />
            </Hidden>
            <Hidden smUp>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" component="h2" color='primary'>Empleado</Typography>
                    <Button component={RouterLink}
                        fullWidth
                        sx={{ marginBottom: '20px', marginTop: '20px' }}
                        to={PATH_DASHBOARD.empleado.new}
                        variant="contained"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                    >
                        Crear Empleado
                    </Button>
                </Box>
            </Hidden>

            <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
                {TABS.map((tab) => (
                    <Tab key={tab.value} value={tab.value} label={tab.label} />
                ))}
            </Tabs>

            {TABS.map(
                (tab) =>
                    tab.value === currentTab && (
                        <Box key={tab.value} sx={{ mt: 5 }}>
                            {tab.component}
                        </Box>
                    )
            )}

            {/* </Container> */}
        </>
    );
}



