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
    Tab,
    Box,
    Grid,
    CardContent,
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
    END_POINT_BANDEJAREPORTE_EMPLEADOVACACIONES
} from '../../config-global';
import { AxiosEliminar } from '../../_Axios/AxiosFomr';
import GenericDataGridCustomExport from '../../sections/_examples/mui/data-grid/GenericDataGridCostomExport';



export default function ReportesVacaciones() {

    const TABS = [
        { value: 'vacaciones', label: 'Vacaciones', component: <Vacaciones /> },
        { value: 'personales', label: 'Personales', component: <Personales /> },
        // { value: 'detalles', label: 'Detalles', component: <DetallesVacaciones /> }
        // { value: 'Peticiones', label: 'Peticiones', component: <TablaPeticiones /> },
    ];

    const [currentTab, setCurrentTab] = useState('vacaciones');


    return (
        <>
            <Helmet>
                <title> Reportes Vacaciones por Empleado </title>
            </Helmet>

            <CustomBreadcrumbs
                heading={
                    <Typography variant='h4' > Reportes Vacaciones por Empleado </Typography>
                }
                links={[
                    {
                        name: 'Inicio',
                        href: PATH_DASHBOARD.root,
                    },
                    {
                        name: 'Vacaciones',
                        href: PATH_DASHBOARD.vacaciones,
                    },
                ]}
            />

            <Box sx={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'flex-start', marginTop: '-20px' }}>
                <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)} >
                    {TABS.map((tab) => (
                        <Tab key={tab.value} value={tab.value} label={tab.label}
                            sx={{
                                minWidth: 'auto',
                                background: '#fff',
                                borderTop: 'rgba(145, 158, 171, 0.14) 1px solid',
                                borderLeft: 'rgba(145, 158, 171, 0.14) 1px solid',
                                borderRight: 'rgba(145, 158, 171, 0.14) 1px solid',
                                borderRadius: '8px 8px 0 0',
                                paddingLeft: '10px',
                                paddingRight: '10px'
                            }}
                        />
                    ))}
                </Tabs>
            </Box>
            <Card
                sx={{
                    borderTop: 'rgba(145, 158, 171, 0.14) 1px solid',
                    borderLeft: 'rgba(145, 158, 171, 0.14) 1px solid',
                    borderRight: 'rgba(145, 158, 171, 0.14) 1px solid',
                    borderRadius: '0 0 8px 8px',
                }}>
                <CardContent>
                    {TABS.map(
                        (tab) =>
                            tab.value === currentTab && (
                                <Box key={tab.value} sx={{ mt: 2 }}>
                                    {tab.component}
                                </Box>
                            )
                    )}
                </CardContent>
            </Card>
            {/* </Container> */}

        </>
    );

}










function Vacaciones() {

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
        // console.log('Est es el ID', id)
        // setOpenPopover(e.currentTarget);
        setNombreCompleto(nombreCompletoo);
        setOpenConfirm(true);
    };
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };
    const handleEditRow = (id) => {
        console.log(id)
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
        setRefreshAUX(new Date().getTime())
    }

    const columns = [
        {
            field: 'avatar',
            headerName: '',
            align: 'center',
            headerAlign: 'center',
            width: 64,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => <CustomAvatar name={params.row.nombreCompleto} sx={{ width: 36, height: 36 }} />,
        },
        {
            field: 'nombreCompleto',
            headerName: 'Colaborador',
            width: 250,
            editable: false,
        },
        {
            field: 'nombreEmpresa',
            headerName: 'Empresa',
            width: 150,
            editable: false,
        },
        {
            field: 'nombreArea',
            headerName: 'Area',
            width: 150,
            editable: false,
        },
        {
            field: 'nombreDepartamento',
            headerName: 'Departamento',
            width: 150,
            editable: false,
        },
        {
            field: 'totalDiasDisponibles',
            headerName: 'Total de dias disponibles',
            width: 150,
            editable: false,
            renderCell: (params) => RenderPeriodo(params.row.totalDiasDisponibles),
        },
        {
            field: 'periodo1',
            headerName: 'Período 23-24',
            width: 150,
            editable: false,
            renderCell: (params) => RenderPeriodo(params.row.periodo1),
        },
        {
            field: 'periodo2',
            headerName: 'Período 22-23',
            width: 150,
            editable: false,
            renderCell: (params) => RenderPeriodo(params.row.periodo2),
        },
        {
            field: 'periodo3',
            headerName: 'Período 21-22',
            width: 150,
            editable: false,
            renderCell: (params) => RenderPeriodo(params.row.periodo3),
        },
        {
            field: 'fechaRenovacionString',
            headerName: 'Fecha de renovacion',
            width: 150,
            editable: false,
            renderCell: (params) => RenderPeriodo(params.row.fechaRenovacionString),
        },
        {
            field: 'fechaIngresoString',
            headerName: 'Fecha de ingreso',
            width: 150,
            editable: false,
            renderCell: (params) => RenderPeriodo(params.row.fechaIngresoString),
        },


    ];


    return (
        <>
            

            {/* <Container> */}

            {/* <CustomBreadcrumbs
                    heading={
                        <>Reportes Vacaciones</>
                    }
                    links={[{ name: '' },]}
                />
                 */}

            <Card >
              
                    <TableContainer sx={{ marginTop: '0px', position: 'relative', overflow: 'unset' }} style={{ width: '100%' }}>
                        <GenericDataGridCustomExport
                            EndPoint={END_POINT_BANDEJAREPORTE_EMPLEADOVACACIONES}
                            columns={columns} refresh={refreshAUX}
                            genericParamAUX="Vacaciones"
                        />
                    </TableContainer>
             </Card>
            {/* </Container> */}

        </>
    );
}


function Personales() {



    const perfilUsuario = localStorage.getItem('RolId');
    const [openConfirm, setOpenConfirm] = useState(false);
    const [tableData, setTableData] = useState(_employeeList);
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [IdAUX, setIdAUX] = useState();
    const [editRowId, setEditRowId] = useState(null);

    const navigate = useNavigate();

    console.log("RolId es ", perfilUsuario);

    const handleOpenConfirm = (id, nombreCompletoo) => {
        setIdAUX(id)
        // console.log('Est es el ID', id)
        // setOpenPopover(e.currentTarget);
        setNombreCompleto(nombreCompletoo);
        setOpenConfirm(true);
    };
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };
    const handleEditRow = (id) => {
        console.log(id)
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
        setRefreshAUX(new Date().getTime())
    }

    const columns = [
        {
            field: 'avatar',
            headerName: '',
            align: 'center',
            headerAlign: 'center',
            width: 64,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => <CustomAvatar name={params.row.nombreCompleto} sx={{ width: 36, height: 36 }} />,
        },
        {
            field: 'nombreCompleto',
            headerName: 'Colaborador',
            width: 250,
            editable: false,
        },
        {
            field: 'nombreEmpresa',
            headerName: 'Empresa',
            width: 150,
            editable: false,
        },
        {
            field: 'nombreArea',
            headerName: 'Area',
            width: 150,
            editable: false,
        },
        {
            field: 'nombreDepartamento',
            headerName: 'Departamento',
            width: 150,
            editable: false,
        },
        {
            field: 'totalDiasDisponibles',
            headerName: 'Total de dias disponibles',
            width: 150,
            editable: false,
            renderCell: (params) => RenderPeriodo(params.row.totalDiasDisponibles),
        },
        {
            field: 'periodo1',
            headerName: 'Período 23-24',
            width: 150,
            editable: false,
            renderCell: (params) => RenderPeriodo(params.row.periodo1),
        },
        {
            field: 'periodo2',
            headerName: 'Período 22-23',
            width: 150,
            editable: false,
            renderCell: (params) => RenderPeriodo(params.row.periodo2),
        },
        {
            field: 'periodo3',
            headerName: 'Período 21-22',
            width: 150,
            editable: false,
            renderCell: (params) => RenderPeriodo(params.row.periodo3),
        },
        {
            field: 'fechaRenovacionString',
            headerName: 'Fecha de renovacion',
            width: 150,
            editable: false,
            renderCell: (params) => RenderPeriodo(params.row.fechaRenovacionString),
        },

    ];


    return (
        <>

            {/* <Container> */}

            {/*
            <CustomBreadcrumbs
                heading={
                    <>Reportes Días Personales</>
                }
                links={[{ name: '' },]}
            />
            */}

            <Card>
                <TableContainer sx={{ marginTop: '0px', position: 'relative', overflow: 'unset' }} style={{ width: '100%' }}>
                    <GenericDataGridCustomExport
                        EndPoint={END_POINT_BANDEJAREPORTE_EMPLEADOVACACIONES}
                        columns={columns} refresh={refreshAUX}
                        genericParamAUX="Personales"
                    />
                </TableContainer>

            </Card>
            {/* </Container> */}

        </>
    );
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




