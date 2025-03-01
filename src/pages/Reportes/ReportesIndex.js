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
    Stack
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useForm } from 'react-hook-form';
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
    END_POINT_BANDEJAREPORTE_EMPLEADOVACACIONES,
    END_POINT_OBTENER_VALOR_ALTENO_CATALOGO_ID,
    END_POINT_REPORTE_VACACIONES_TOMADAS
} from '../../config-global';
import { AxiosEliminar } from '../../_Axios/AxiosFomr';
import GenericDataGridCustomExport from '../../sections/_examples/mui/data-grid/GenericDataGridCostomExport';
import { RHFTextField } from '../../components/hook-form';
import FormProvider from '../../components/hook-form/FormProvider';
import GenericComboSelect from '../../utils/GenericComboSelect';
import GenericCombo from '../../utils/GenericCombo';

import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';



export default function ReportesVacaciones() {

    const TABS = [
        { value: 'vacaciones', label: 'Vacaciones', component: <Historial /> },
        { value: 'personales', label: 'Personales', component: <Personales /> },
        // { value: 'detalles', label: 'Detalles', component: <DetallesVacaciones /> }
        // { value: 'Peticiones', label: 'Peticiones', component: <TablaPeticiones /> },
    ];

    const [currentTab, setCurrentTab] = useState('vacaciones');


    return (
        <>
            <Helmet>
                <title> Reportes </title>
            </Helmet>

            <CustomBreadcrumbs
                heading={
                    <Typography variant='h4' > Reporteria </Typography>
                }
                links={[
                    {
                        name: 'Reporte por diferentes puntos de vista',
                        href: PATH_DASHBOARD.root,
                    }
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












function Historial() {

    const descargarArchivoExcel = async (parametro1, parametro2) => {

        console.log(parametro1, parametro2);

        // try {
        //    // const response = await axios.get('https://localhost:7285/api/cuentas/DescargarExcel', {
        //    //    responseType: 'blob' // Especifica el tipo de respuesta como un blob
        //    // });

        //    const AUT = `Bearer ${localStorage.getItem('accessToken')}`;
        //    const response = await axios(
        //        {
        //            method: 'get',
        //            url: 'https://localhost:7285/api/ComunAuxiliares/ReporteVacionestomadas',
        //            params: { param1: parametro1, param2: parametro2 },
        //            headers: { 'Authorization': AUT }
        //        });



        //    // Crea un enlace temporal en el navegador para descargar el archivo
        //    const url = window.URL.createObjectURL(new Blob([response.data]));
        //    const link = document.createElement('a');
        //    link.href = url;
        //    link.setAttribute('download', 'nombre_del_archivo.xlsx');
        //    document.body.appendChild(link);
        //    link.click();

        //    // Libera el objeto URL creado
        //    window.URL.revokeObjectURL(url);

        //    setCargando(false);

        // } catch (error) {
        //    console.error('Error al descargar el archivo Excel:', error);
        //    setCargando(false);
        // }
    }

    const methods = useForm({});

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const [cargando, setCargando] = useState(false);

    const onSubmit = async (data) => {
        try {
            console.log(data);
            setCargando(true);
            descargarArchivoExcel(data.periodos, data.mes)

        } catch (error) {
            console.error(error);
            setCargando(false);
        }
    };

    const columnsReporte = [
        {
            field: 'id',
            headerName: 'id',
            width: 350,
            editable: false,
            renderCell: (params) => RenderStatus(params.row.id, params.row),
            hide: true
        },
        {
            field: 'nombreCompleto',
            headerName: 'Nombre Completo',
            flex: 1,
            editable: false,
        },
        {
            field: 'empresa',
            headerName: 'Empresa',
            flex: 1,
            editable: false,
        },
        {
            field: 'subarea',
            headerName: 'Subarea',
            flex: 1,
            editable: false,
        },

        {
            field: 'puesto',
            headerName: 'Puesto',
            flex: 1,
            editable: false,
        },
        {
            field: 'tipo',
            headerName: 'VAC / D.E.',
            flex: 1,
            editable: false,
        },
        {
            field: 'fechaIniciostring',
            headerName: 'FECHA INICIO',
            flex: 1,
            editable: false,
        },
        {
            field: 'fechaFinalstring',
            headerName: 'FECHA FINAL',
            flex: 1,
            editable: false,
        },
        {
            field: 'total',
            headerName: 'Total',
            flex: 1,
            editable: false,
        },
        {
            field: 'lider',
            headerName: 'Lider',
            flex: 1,
            editable: false,
        },
    ];

    const fechaHoy = new Date();
    const [anioDefault, setanioDefault] = useState(fechaHoy.getFullYear());
    const [mesDefault, setmesDefault] = useState(fechaHoy.getMonth());
    const [anioFiltro, setanioFiltro] = useState(fechaHoy.getFullYear());
    const [mesFiltro, setmesFiltro] = useState(fechaHoy.getMonth());
    const [parametroGenerico, setparametroGenerico] = useState(`#${anioDefault}#${mesDefault}`);


    useEffect(() => {
        const hoy = new Date();
        setanioDefault(hoy.getFullYear());
        setmesDefault(hoy.getMonth());
    }, [setanioDefault, setmesDefault])

    useEffect(() => {
        console.log('el parametro generico', parametroGenerico);
    }, [parametroGenerico])

    const chageMes = (param) => {
        setmesFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${param}`)
    }
    const chageAnio = (param) => {
        setanioFiltro(param)
        setparametroGenerico(`#${param}#${mesFiltro}`)
    }

    return (
        <>


            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={12}>
                        <Card sx={{ p: 4 }}>
                            <Box
                                rowGap={4}
                                columnGap={4}
                                display="grid"
                                gridTemplateColumns={{
                                    xs: 'repeat(1, 1fr)',
                                    sm: 'repeat(4, 1fr)',
                                }}
                            >
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="periodos"
                                    label="Año"
                                    placeholder="Periodo"
                                    endPointURL={END_POINT_OBTENER_VALOR_ALTENO_CATALOGO_ID}
                                    onChangeFunc={chageAnio}
                                    valorFiltro="anio"
                                    valorDefault={anioDefault}
                                    useChange
                                />

                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="mes"
                                    label="Mes"
                                    placeholder="Mes"
                                    endPointURL={END_POINT_OBTENER_VALOR_ALTENO_CATALOGO_ID}
                                    onChangeFunc={chageMes}
                                    valorFiltro="Meses"
                                    valorDefault={mesDefault}
                                    useChange
                                />
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="mes"
                                    label="Mes"
                                    placeholder="Mes"
                                    endPointURL={END_POINT_OBTENER_VALOR_ALTENO_CATALOGO_ID}
                                    onChangeFunc={chageMes}
                                    valorFiltro="Meses"
                                    valorDefault={mesDefault}
                                    useChange
                                />
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="mes"
                                    label="Mes"
                                    placeholder="Mes"
                                    endPointURL={END_POINT_OBTENER_VALOR_ALTENO_CATALOGO_ID}
                                    onChangeFunc={chageMes}
                                    valorFiltro="Meses"
                                    valorDefault={mesDefault}
                                    useChange
                                />


                            </Box>

                        </Card>
                    </Grid>
                </Grid>
            </FormProvider>


            <GenericDataGridCustom EndPoint={END_POINT_REPORTE_VACACIONES_TOMADAS} genericParamAUX={parametroGenerico} columns={columnsReporte} />
            <GenericDataGridCustom EndPoint={END_POINT_REPORTE_VACACIONES_TOMADAS} genericParamAUX={parametroGenerico} columns={columnsReporte} />

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
function RenderStatus(param1, param2) {

    console.log(param1)
    console.log(param2)

    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    return (
        <div>
            <Label
                variant={isLight ? 'soft' : 'filled'}
                color='success'
                sx={{ mx: 'auto' }}
            >
                solo esto
            </Label>
        </div>
    );
}



