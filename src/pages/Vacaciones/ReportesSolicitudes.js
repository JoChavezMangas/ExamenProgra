import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
    Card,
    TableContainer,
    Typography,
    Tabs,
    Tab,
    Box,
    Grid,
    CardContent,
    Stack
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import { _employeeList } from '../../_mock/arrays';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import Label from '../../components/label';
import { CustomAvatar } from '../../components/custom-avatar';
import {

    END_POINT_BANDEJAEMPLEADOS,
    END_POINT_BANDEJAEMPLEADOS_EMPRESA,
    END_POINT_BORRAR_EMPLEADO,
    END_POINT_BANDEJAREPORTE_EMPLEADOVACACIONES,
    END_POINT_OBTENER_VALOR_ALTENO_CATALOGO_ID,
    END_POINT_BANDEJAEMPLEADOS_RH, END_POINT_REPORTE_VACACIONES_PENDIENTES,
    END_POINT_REPORTE_VACACIONES_TOMADAS
} from '../../config-global';
import { AxiosEliminar } from '../../_Axios/AxiosFomr';
import FormProvider, { RHFSelect } from '../../components/hook-form';
import GenericCombo from '../../utils/GenericCombo';
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';



export default function ReportesVacaciones() {

    const TABS = [
        { value: 'Pendientes', label: 'Pendientes', component: <Pendientes /> },
        { value: 'Historial', label: 'Historial', component: <Historial /> },
        // { value: 'detalles', label: 'Detalles', component: <DetallesVacaciones /> }
        // { value: 'Peticiones', label: 'Peticiones', component: <TablaPeticiones /> },
    ];

    const [currentTab, setCurrentTab] = useState('Historial');


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
        console.log('el parametro generico',parametroGenerico);
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
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Card sx={{ p: 3 }}>
                            <Box
                                rowGap={3}
                                columnGap={3}
                                display="grid"
                                gridTemplateColumns={{
                                    xs: 'repeat(1, 1fr)',
                                    sm: 'repeat(3, 1fr)',
                                }}
                            >
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="periodos"
                                    label="Periodo"
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

                                { /* <LoadingButton type="submit" variant="contained" loading={cargando}>
                                    Generar Reporte
                                </LoadingButton> */ }

                            </Box>
                         
                        </Card>
                    </Grid>
                </Grid>
            </FormProvider>


            <GenericDataGridCustom EndPoint={END_POINT_REPORTE_VACACIONES_TOMADAS} genericParamAUX={parametroGenerico} columns={columnsReporte}  /> 

        </>
    );
}


function Pendientes() {

    const descargarArchivoExcel = async (parametro1, parametro2) => {
        try {
            // const response = await axios.get('https://localhost:7285/api/cuentas/DescargarExcel', {
            //    responseType: 'blob' // Especifica el tipo de respuesta como un blob
            // });

            const AUT = `Bearer ${localStorage.getItem('accessToken')}`;
            const response = await axios(
                {
                    method: 'get',
                    url: 'https://localhost:7285/api/ComunAuxiliares/ReporteVacionestomadas',
                    params: { param1: parametro1, param2: parametro2 },
                    headers: { 'Authorization': AUT }
                });



            // Crea un enlace temporal en el navegador para descargar el archivo
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'nombre_del_archivo.xlsx');
            document.body.appendChild(link);
            link.click();

            // Libera el objeto URL creado
            window.URL.revokeObjectURL(url);

            setCargando(false);

        } catch (error) {
            console.error('Error al descargar el archivo Excel:', error);
            setCargando(false);
        }
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
            field: 'comentario',
            headerName: 'Comentario',
            flex: 1,
            editable: false,
        },
        {
            field: 'estatus',
            headerName: 'Estatus',
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
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Card sx={{ p: 3 }}>
                            <Box
                                rowGap={3}
                                columnGap={3}
                                display="grid"
                                gridTemplateColumns={{
                                    xs: 'repeat(1, 1fr)',
                                    sm: 'repeat(3, 1fr)',
                                }}
                            >
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="periodos"
                                    label="Periodo"
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

                                { /* <LoadingButton type="submit" variant="contained" loading={cargando}>
                                    Generar Reporte
                                </LoadingButton> */ }

                            </Box>

                        </Card>
                    </Grid>
                </Grid>
            </FormProvider>


            <GenericDataGridCustom EndPoint={END_POINT_REPORTE_VACACIONES_PENDIENTES} genericParamAUX={parametroGenerico} columns={columnsReporte} />

        </>
    );

}


function RenderStatus(param1,param2) {

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

