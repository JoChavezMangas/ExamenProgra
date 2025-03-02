import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
    Card,
    TableContainer,
    Typography,
    Tabs,
    Tab,
    Box,
    Grid,
    CardContent} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import { _employeeList } from '../../_mock/arrays';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import Label from '../../components/label';
import { CustomAvatar } from '../../components/custom-avatar';
import {
    END_POINT_BORRAR_EMPLEADO,
    END_POINT_BANDEJAREPORTE_EMPLEADOVACACIONES,
    END_POINT_OBTENER_VALOR_ALTENO_CATALOGO_ID,
    END_POINT_REPORTES_COLOCACION_MENSUAL,
    END_POINT_REPORTES_CATALOGOS,
    END_POINT_REPORTES_BANCOS,
    END_POINT_REPORTES_BROKERS,
    END_POINT_EMPLEADOS_BROKERS,
    END_POINT_REPORTES_OPERACION_MENSUAL,
    END_POINT_REPORTES_COLOCACION_BANCO,
    END_POINT_REPORTES_COLOCACION_ESTADO,
    END_POINT_REPORTES_CRECIMIENTO_OPERACIONES,
    END_POINT_REPORTES_CRECIMIENTO_FIRMADO,
    END_POINT_REPORTES_DESGLOSE_COLOCACIONES,
    END_POINT_REPORTES_MONTOS_OPERACIONES,
    END_POINT_REPORTES_COLOCACION_EJECUTIVO
} from '../../config-global';
import { AxiosEliminar } from '../../_Axios/AxiosFomr';
import GenericDataGridCustomExport from '../../sections/_examples/mui/data-grid/GenericDataGridCostomExport';
import FormProvider from '../../components/hook-form/FormProvider';
import GenericCombo from '../../utils/GenericCombo';

import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';



export default function ReportesVacaciones() {

    const TABS = [
        { value: 'colocacionMes', label: 'Colocacion por mes', component: <ColocacionMensual /> },
        { value: 'operacionesMensuales', label: 'Operaciones Mensuales', component: <OperacionesMensuales /> },
        { value: 'colocacionBanco', label: 'Colocacion por Banco', component: <ColcoacionBanco /> },
        { value: 'colocacionEstado', label: 'Colocacion por Estado', component: <ColcacionEstado /> },
        { value: 'crecimientoOperaciones', label: 'Crecimeinto Operaciones', component: <CrecimientoOperaciones /> },
        { value: 'crecimientoFirmado', label: 'Crecimeinto Firmado', component: <CrecimientoFirmado /> },
        { value: 'DesgloseColocacion', label: 'Desglose Colocacion', component: <DesGloseColocacion /> },
        { value: 'montosOperaciones', label: 'Montos Operaciones', component: <MontosOperaciones /> },
        { value: 'colcoacionEjecutivo', label: 'Colocacion Ejecutivo', component: <ColcoacionEjecutivo /> },
        // { value: 'detalles', label: 'Detalles', component: <DetallesVacaciones /> }
        // { value: 'Peticiones', label: 'Peticiones', component: <TablaPeticiones /> },
    ];

    const [currentTab, setCurrentTab] = useState('colocacionMes');


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
                                paddingLeft: '5px',
                                paddingRight: '5px'
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












function ColocacionMensual() {

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
            setCargando(true);
            descargarArchivoExcel(data.periodos, data.mes)

        } catch (error) {
            console.error(error);
            setCargando(false);
        }
    };

    const columnsReporte = [
        {
            field: 'mes',
            headerName: 'mes',
            flex: 1,
            editable: false,
        },
        {
            field: 'a2025',
            headerName: '2025',
            flex: 1,
            editable: false,
        },
        {
            field: 'a2024',
            headerName: '2024',
            flex: 1,
            editable: false,
        }, {
            field: 'a2023',
            headerName: '2023',
            flex: 1,
            editable: false,
        },
        {
            field: 'a2022',
            headerName: '2022',
            flex: 1,
            editable: false,
        },
        {
            field: 'a2021',
            headerName: '2021',
            flex: 1,
            editable: false,
        },
        {
            field: 'a2020',
            headerName: '2020',
            flex: 1,
            editable: false,
        },
        {
            field: 'total',
            headerName: 'Total',
            flex: 1,
            editable: false,
        },
    ];

    const [anioDefault, setanioDefault] = useState("");
    const [mesDefault, setmesDefault] = useState("");
    const [brokerDefault, setBrokerDefault] = useState("")
    const [ejecutivoDefault, setEjecutivoDefault] = useState("")
    const [estadoDefault, setEstadoDefault] = useState("")

    const [anioFiltro, setanioFiltro] = useState("");
    const [mesFiltro, setmesFiltro] = useState("");
    const [brokerFiltro, setBrokerFiltro] = useState("")
    const [ejecutivoFiltro, setEjecutivoFiltro] = useState("")
    const [estadoFiltro, setEstadoFiltro] = useState("")

    const [parametroGenerico, setparametroGenerico] = useState(`#${anioDefault}#${mesDefault}#${brokerDefault}#${ejecutivoDefault}#${estadoDefault}`);


    useEffect(() => {
        const hoy = new Date();
        setanioDefault(hoy.getFullYear());
        setmesDefault(hoy.getMonth());
    }, [setanioDefault, setmesDefault])

    useEffect(() => {
        console.log('el parametro generico', parametroGenerico);
    }, [parametroGenerico])

   
    const chageAnio = (param) => {
        setanioFiltro(param)
        setparametroGenerico(`#${param}#${mesFiltro}#${brokerFiltro}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const chageMes = (param) => {
        setmesFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${param}#${brokerFiltro}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const changeBroker = (param) => {
        setBrokerFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${param}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const changeEjecutivo = (param) => {
        setEjecutivoFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${brokerFiltro}#${param}#${estadoFiltro}`)
    }
    const changeEstado = (param) => {
        setEstadoFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${brokerFiltro}#${ejecutivoFiltro}#${param}`)
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
                                    sm: 'repeat(5, 1fr)',
                                }}
                            >
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="periodos"
                                    label="Año"
                                    placeholder="Periodo"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={chageAnio}
                                    valorFiltro="Año"
                                    valorDefault={anioDefault}
                                    useChange
                                />

                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="mes"
                                    label="Mes"
                                    placeholder="Mes"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={chageMes}
                                    valorFiltro="Mes"
                                    valorDefault={mesDefault}
                                    useChange
                                />
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="broker"
                                    label="Broker"
                                    placeholder="Broker"
                                    endPointURL={END_POINT_REPORTES_BROKERS}
                                    onChangeFunc={changeBroker}
                                    valorFiltro="Broker"
                                    valorDefault={mesDefault}
                                    useChange
                                />

                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="ejecutivo"
                                    label="Ejecutivo"
                                    placeholder="Ejecutivo"
                                    endPointURL={END_POINT_EMPLEADOS_BROKERS}
                                    onChangeFunc={changeEjecutivo}
                                    valorFiltro="0"
                                    valorDefault={mesDefault}
                                    useChange
                                />
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="estado"
                                    label="Estado"
                                    placeholder="Estado"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={changeEstado}
                                    valorFiltro="Estado"
                                    valorDefault={mesDefault}
                                    useChange
                                />

                            </Box>

                        </Card>
                    </Grid>
                </Grid>
            </FormProvider>


            <GenericDataGridCustom EndPoint={END_POINT_REPORTES_COLOCACION_MENSUAL} genericParamAUX={parametroGenerico} columns={columnsReporte} />

        </>
    );
}

function OperacionesMensuales() {
    const methods = useForm({});

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const [cargando, setCargando] = useState(false);

    const onSubmit = async (data) => {
        try {
            setCargando(true);

        } catch (error) {
            console.error(error);
            setCargando(false);
        }
    };

    const columnsReporte = [
        {
            field: 'mes',
            headerName: 'mes',
            flex: 1,
            editable: false,
        },
        {
            field: 'a2025',
            headerName: '2025',
            flex: 1,
            editable: false,
        },
        {
            field: 'a2024',
            headerName: '2024',
            flex: 1,
            editable: false,
        }, {
            field: 'a2023',
            headerName: '2023',
            flex: 1,
            editable: false,
        },
        {
            field: 'a2022',
            headerName: '2022',
            flex: 1,
            editable: false,
        },
        {
            field: 'a2021',
            headerName: '2021',
            flex: 1,
            editable: false,
        },
        {
            field: 'a2020',
            headerName: '2020',
            flex: 1,
            editable: false,
        },
        {
            field: 'total',
            headerName: 'Total',
            flex: 1,
            editable: false,
        },
    ];

    const [anioDefault, setanioDefault] = useState("");
    const [mesDefault, setmesDefault] = useState("");
    const [brokerDefault, setBrokerDefault] = useState("")
    const [ejecutivoDefault, setEjecutivoDefault] = useState("")
    const [estadoDefault, setEstadoDefault] = useState("")

    const [anioFiltro, setanioFiltro] = useState("");
    const [mesFiltro, setmesFiltro] = useState("");
    const [brokerFiltro, setBrokerFiltro] = useState("")
    const [ejecutivoFiltro, setEjecutivoFiltro] = useState("")
    const [estadoFiltro, setEstadoFiltro] = useState("")

    const [parametroGenerico, setparametroGenerico] = useState(`#${anioDefault}#${mesDefault}#${brokerDefault}#${ejecutivoDefault}#${estadoDefault}`);


    useEffect(() => {
        const hoy = new Date();
        setanioDefault(hoy.getFullYear());
        setmesDefault(hoy.getMonth());
    }, [setanioDefault, setmesDefault])

    useEffect(() => {
        console.log('el parametro generico', parametroGenerico);
    }, [parametroGenerico])


    const chageAnio = (param) => {
        setanioFiltro(param)
        setparametroGenerico(`#${param}#${mesFiltro}#${brokerFiltro}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const chageMes = (param) => {
        setmesFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${param}#${brokerFiltro}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const changeBroker = (param) => {
        setBrokerFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${param}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const changeEjecutivo = (param) => {
        setEjecutivoFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${brokerFiltro}#${param}#${estadoFiltro}`)
    }
    const changeEstado = (param) => {
        setEstadoFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${brokerFiltro}#${ejecutivoFiltro}#${param}`)
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
                                    sm: 'repeat(5, 1fr)',
                                }}
                            >
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="periodos"
                                    label="Año"
                                    placeholder="Periodo"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={chageAnio}
                                    valorFiltro="Año"
                                    valorDefault={anioDefault}
                                    useChange
                                />

                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="mes"
                                    label="Mes"
                                    placeholder="Mes"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={chageMes}
                                    valorFiltro="Mes"
                                    valorDefault={mesDefault}
                                    useChange
                                />
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="broker"
                                    label="Broker"
                                    placeholder="Broker"
                                    endPointURL={END_POINT_REPORTES_BROKERS}
                                    onChangeFunc={changeBroker}
                                    valorFiltro="Broker"
                                    valorDefault={mesDefault}
                                    useChange
                                />

                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="ejecutivo"
                                    label="Ejecutivo"
                                    placeholder="Ejecutivo"
                                    endPointURL={END_POINT_EMPLEADOS_BROKERS}
                                    onChangeFunc={changeEjecutivo}
                                    valorFiltro="0"
                                    valorDefault={mesDefault}
                                    useChange
                                />
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="estado"
                                    label="Estado"
                                    placeholder="Estado"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={changeEstado}
                                    valorFiltro="Estado"
                                    valorDefault={mesDefault}
                                    useChange
                                />

                            </Box>

                        </Card>
                    </Grid>
                </Grid>
            </FormProvider>


            <GenericDataGridCustom EndPoint={END_POINT_REPORTES_OPERACION_MENSUAL} genericParamAUX={parametroGenerico} columns={columnsReporte} />

        </>
    );
} 

function ColcoacionBanco() {
    const methods = useForm({});

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const [cargando, setCargando] = useState(false);

    const onSubmit = async (data) => {
        try {
            setCargando(true);

        } catch (error) {
            console.error(error);
            setCargando(false);
        }
    };

    const columnsReporte = [
        {
            field: 'banco',
            headerName: 'Banco',
            flex: 1,
            editable: false,
        },
        {
            field: 'a2025',
            headerName: '2025',
            flex: 1,
            editable: false,
        },
        {
            field: 'a2024',
            headerName: '2024',
            flex: 1,
            editable: false,
        }, {
            field: 'a2023',
            headerName: '2023',
            flex: 1,
            editable: false,
        },
        {
            field: 'a2022',
            headerName: '2022',
            flex: 1,
            editable: false,
        },
        {
            field: 'a2021',
            headerName: '2021',
            flex: 1,
            editable: false,
        },
        {
            field: 'a2020',
            headerName: '2020',
            flex: 1,
            editable: false,
        },
        {
            field: 'total',
            headerName: 'Total',
            flex: 1,
            editable: false,
        },
    ];

    const [anioDefault, setanioDefault] = useState("");
    const [mesDefault, setmesDefault] = useState("");
    const [brokerDefault, setBrokerDefault] = useState("")
    const [ejecutivoDefault, setEjecutivoDefault] = useState("")
    const [estadoDefault, setEstadoDefault] = useState("")

    const [anioFiltro, setanioFiltro] = useState("");
    const [mesFiltro, setmesFiltro] = useState("");
    const [brokerFiltro, setBrokerFiltro] = useState("")
    const [ejecutivoFiltro, setEjecutivoFiltro] = useState("")
    const [estadoFiltro, setEstadoFiltro] = useState("")

    const [parametroGenerico, setparametroGenerico] = useState(`#${anioDefault}#${mesDefault}#${brokerDefault}#${ejecutivoDefault}#${estadoDefault}`);


    useEffect(() => {
        const hoy = new Date();
        setanioDefault(hoy.getFullYear());
        setmesDefault(hoy.getMonth());
    }, [setanioDefault, setmesDefault])

    useEffect(() => {
        console.log('el parametro generico', parametroGenerico);
    }, [parametroGenerico])


    const chageAnio = (param) => {
        setanioFiltro(param)
        setparametroGenerico(`#${param}#${mesFiltro}#${brokerFiltro}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const chageMes = (param) => {
        setmesFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${param}#${brokerFiltro}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const changeBroker = (param) => {
        setBrokerFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${param}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const changeEjecutivo = (param) => {
        setEjecutivoFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${brokerFiltro}#${param}#${estadoFiltro}`)
    }
    const changeEstado = (param) => {
        setEstadoFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${brokerFiltro}#${ejecutivoFiltro}#${param}`)
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
                                    sm: 'repeat(5, 1fr)',
                                }}
                            >
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="periodos"
                                    label="Año"
                                    placeholder="Periodo"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={chageAnio}
                                    valorFiltro="Año"
                                    valorDefault={anioDefault}
                                    useChange
                                />

                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="mes"
                                    label="Mes"
                                    placeholder="Mes"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={chageMes}
                                    valorFiltro="Mes"
                                    valorDefault={mesDefault}
                                    useChange
                                />
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="broker"
                                    label="Broker"
                                    placeholder="Broker"
                                    endPointURL={END_POINT_REPORTES_BROKERS}
                                    onChangeFunc={changeBroker}
                                    valorFiltro="Broker"
                                    valorDefault={mesDefault}
                                    useChange
                                />

                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="ejecutivo"
                                    label="Ejecutivo"
                                    placeholder="Ejecutivo"
                                    endPointURL={END_POINT_EMPLEADOS_BROKERS}
                                    onChangeFunc={changeEjecutivo}
                                    valorFiltro="0"
                                    valorDefault={mesDefault}
                                    useChange
                                />
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="estado"
                                    label="Estado"
                                    placeholder="Estado"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={changeEstado}
                                    valorFiltro="Estado"
                                    valorDefault={mesDefault}
                                    useChange
                                />

                            </Box>

                        </Card>
                    </Grid>
                </Grid>
            </FormProvider>


            <GenericDataGridCustom EndPoint={END_POINT_REPORTES_COLOCACION_BANCO} genericParamAUX={parametroGenerico} columns={columnsReporte} />

        </>
    );
} 

function ColcacionEstado() {
    const methods = useForm({});

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const [cargando, setCargando] = useState(false);

    const onSubmit = async (data) => {
        try {
            setCargando(true);

        } catch (error) {
            console.error(error);
            setCargando(false);
        }
    };

    const columnsReporte = [
        {
            field: 'estado',
            headerName: 'Estado',
            flex: 1,
            editable: false,
        },
        {
            field: 'a2025',
            headerName: '2025',
            flex: 1,
            editable: false,
        },
        {
            field: 'a2024',
            headerName: '2024',
            flex: 1,
            editable: false,
        }, {
            field: 'a2023',
            headerName: '2023',
            flex: 1,
            editable: false,
        },
        {
            field: 'a2022',
            headerName: '2022',
            flex: 1,
            editable: false,
        },
        {
            field: 'a2021',
            headerName: '2021',
            flex: 1,
            editable: false,
        },
        {
            field: 'a2020',
            headerName: '2020',
            flex: 1,
            editable: false,
        },
        {
            field: 'total',
            headerName: 'Total',
            flex: 1,
            editable: false,
        },
    ];

    const [anioDefault, setanioDefault] = useState("");
    const [mesDefault, setmesDefault] = useState("");
    const [brokerDefault, setBrokerDefault] = useState("")
    const [ejecutivoDefault, setEjecutivoDefault] = useState("")
    const [estadoDefault, setEstadoDefault] = useState("")

    const [anioFiltro, setanioFiltro] = useState("");
    const [mesFiltro, setmesFiltro] = useState("");
    const [brokerFiltro, setBrokerFiltro] = useState("")
    const [ejecutivoFiltro, setEjecutivoFiltro] = useState("")
    const [estadoFiltro, setEstadoFiltro] = useState("")

    const [parametroGenerico, setparametroGenerico] = useState(`#${anioDefault}#${mesDefault}#${brokerDefault}#${ejecutivoDefault}#${estadoDefault}`);


    useEffect(() => {
        const hoy = new Date();
        setanioDefault(hoy.getFullYear());
        setmesDefault(hoy.getMonth());
    }, [setanioDefault, setmesDefault])

    useEffect(() => {
        console.log('el parametro generico', parametroGenerico);
    }, [parametroGenerico])


    const chageAnio = (param) => {
        setanioFiltro(param)
        setparametroGenerico(`#${param}#${mesFiltro}#${brokerFiltro}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const chageMes = (param) => {
        setmesFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${param}#${brokerFiltro}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const changeBroker = (param) => {
        setBrokerFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${param}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const changeEjecutivo = (param) => {
        setEjecutivoFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${brokerFiltro}#${param}#${estadoFiltro}`)
    }
    const changeEstado = (param) => {
        setEstadoFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${brokerFiltro}#${ejecutivoFiltro}#${param}`)
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
                                    sm: 'repeat(5, 1fr)',
                                }}
                            >
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="periodos"
                                    label="Año"
                                    placeholder="Periodo"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={chageAnio}
                                    valorFiltro="Año"
                                    valorDefault={anioDefault}
                                    useChange
                                />

                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="mes"
                                    label="Mes"
                                    placeholder="Mes"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={chageMes}
                                    valorFiltro="Mes"
                                    valorDefault={mesDefault}
                                    useChange
                                />
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="broker"
                                    label="Broker"
                                    placeholder="Broker"
                                    endPointURL={END_POINT_REPORTES_BROKERS}
                                    onChangeFunc={changeBroker}
                                    valorFiltro="Broker"
                                    valorDefault={mesDefault}
                                    useChange
                                />

                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="ejecutivo"
                                    label="Ejecutivo"
                                    placeholder="Ejecutivo"
                                    endPointURL={END_POINT_EMPLEADOS_BROKERS}
                                    onChangeFunc={changeEjecutivo}
                                    valorFiltro="0"
                                    valorDefault={mesDefault}
                                    useChange
                                />
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="estado"
                                    label="Estado"
                                    placeholder="Estado"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={changeEstado}
                                    valorFiltro="Estado"
                                    valorDefault={mesDefault}
                                    useChange
                                />

                            </Box>

                        </Card>
                    </Grid>
                </Grid>
            </FormProvider>


            <GenericDataGridCustom EndPoint={END_POINT_REPORTES_COLOCACION_ESTADO} genericParamAUX={parametroGenerico} columns={columnsReporte} />

        </>
    );
} 

function CrecimientoOperaciones() {
    const methods = useForm({});

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const [cargando, setCargando] = useState(false);

    const onSubmit = async (data) => {
        try {
            setCargando(true);

        } catch (error) {
            console.error(error);
            setCargando(false);
        }
    };

    const columnsReporte = [
        {
            field: 'anio',
            headerName: 'Año',
            flex: 1,
            editable: false,
        },
        {
            field: 'operaciones',
            headerName: 'Operaciones',
            flex: 1,
            editable: false,
        },
        {
            field: 'crecimineto',
            headerName: 'Crecimiento',
            flex: 1,
            editable: false,
        },
       
    ];

    const [anioDefault, setanioDefault] = useState("");
    const [mesDefault, setmesDefault] = useState("");
    const [brokerDefault, setBrokerDefault] = useState("")
    const [ejecutivoDefault, setEjecutivoDefault] = useState("")
    const [estadoDefault, setEstadoDefault] = useState("")

    const [anioFiltro, setanioFiltro] = useState("");
    const [mesFiltro, setmesFiltro] = useState("");
    const [brokerFiltro, setBrokerFiltro] = useState("")
    const [ejecutivoFiltro, setEjecutivoFiltro] = useState("")
    const [estadoFiltro, setEstadoFiltro] = useState("")

    const [parametroGenerico, setparametroGenerico] = useState(`#${anioDefault}#${mesDefault}#${brokerDefault}#${ejecutivoDefault}#${estadoDefault}`);


    useEffect(() => {
        const hoy = new Date();
        setanioDefault(hoy.getFullYear());
        setmesDefault(hoy.getMonth());
    }, [setanioDefault, setmesDefault])

    useEffect(() => {
        console.log('el parametro generico', parametroGenerico);
    }, [parametroGenerico])


    const chageAnio = (param) => {
        setanioFiltro(param)
        setparametroGenerico(`#${param}#${mesFiltro}#${brokerFiltro}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const chageMes = (param) => {
        setmesFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${param}#${brokerFiltro}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const changeBroker = (param) => {
        setBrokerFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${param}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const changeEjecutivo = (param) => {
        setEjecutivoFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${brokerFiltro}#${param}#${estadoFiltro}`)
    }
    const changeEstado = (param) => {
        setEstadoFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${brokerFiltro}#${ejecutivoFiltro}#${param}`)
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
                                    sm: 'repeat(5, 1fr)',
                                }}
                            >
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="periodos"
                                    label="Año"
                                    placeholder="Periodo"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={chageAnio}
                                    valorFiltro="Año"
                                    valorDefault={anioDefault}
                                    useChange
                                />

                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="mes"
                                    label="Mes"
                                    placeholder="Mes"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={chageMes}
                                    valorFiltro="Mes"
                                    valorDefault={mesDefault}
                                    useChange
                                />
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="broker"
                                    label="Broker"
                                    placeholder="Broker"
                                    endPointURL={END_POINT_REPORTES_BROKERS}
                                    onChangeFunc={changeBroker}
                                    valorFiltro="Broker"
                                    valorDefault={mesDefault}
                                    useChange
                                />

                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="ejecutivo"
                                    label="Ejecutivo"
                                    placeholder="Ejecutivo"
                                    endPointURL={END_POINT_EMPLEADOS_BROKERS}
                                    onChangeFunc={changeEjecutivo}
                                    valorFiltro="0"
                                    valorDefault={mesDefault}
                                    useChange
                                />
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="estado"
                                    label="Estado"
                                    placeholder="Estado"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={changeEstado}
                                    valorFiltro="Estado"
                                    valorDefault={mesDefault}
                                    useChange
                                />

                            </Box>

                        </Card>
                    </Grid>
                </Grid>
            </FormProvider>


            <GenericDataGridCustom EndPoint={END_POINT_REPORTES_CRECIMIENTO_OPERACIONES} genericParamAUX={parametroGenerico} columns={columnsReporte} />

        </>
    );
} 

function CrecimientoFirmado() {
    const methods = useForm({});

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const [cargando, setCargando] = useState(false);

    const onSubmit = async (data) => {
        try {
            setCargando(true);

        } catch (error) {
            console.error(error);
            setCargando(false);
        }
    };

    const columnsReporte = [
        {
            field: 'anio',
            headerName: 'Año',
            flex: 1,
            editable: false,
        },
        {
            field: 'monto',
            headerName: 'Operaciones',
            flex: 1,
            editable: false,
        },
        {
            field: 'crecimineto',
            headerName: 'Crecimiento',
            flex: 1,
            editable: false,
        },

    ];

    const [anioDefault, setanioDefault] = useState("");
    const [mesDefault, setmesDefault] = useState("");
    const [brokerDefault, setBrokerDefault] = useState("")
    const [ejecutivoDefault, setEjecutivoDefault] = useState("")
    const [estadoDefault, setEstadoDefault] = useState("")

    const [anioFiltro, setanioFiltro] = useState("");
    const [mesFiltro, setmesFiltro] = useState("");
    const [brokerFiltro, setBrokerFiltro] = useState("")
    const [ejecutivoFiltro, setEjecutivoFiltro] = useState("")
    const [estadoFiltro, setEstadoFiltro] = useState("")

    const [parametroGenerico, setparametroGenerico] = useState(`#${anioDefault}#${mesDefault}#${brokerDefault}#${ejecutivoDefault}#${estadoDefault}`);


    useEffect(() => {
        const hoy = new Date();
        setanioDefault(hoy.getFullYear());
        setmesDefault(hoy.getMonth());
    }, [setanioDefault, setmesDefault])

    useEffect(() => {
        console.log('el parametro generico', parametroGenerico);
    }, [parametroGenerico])


    const chageAnio = (param) => {
        setanioFiltro(param)
        setparametroGenerico(`#${param}#${mesFiltro}#${brokerFiltro}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const chageMes = (param) => {
        setmesFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${param}#${brokerFiltro}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const changeBroker = (param) => {
        setBrokerFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${param}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const changeEjecutivo = (param) => {
        setEjecutivoFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${brokerFiltro}#${param}#${estadoFiltro}`)
    }
    const changeEstado = (param) => {
        setEstadoFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${brokerFiltro}#${ejecutivoFiltro}#${param}`)
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
                                    sm: 'repeat(5, 1fr)',
                                }}
                            >
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="periodos"
                                    label="Año"
                                    placeholder="Periodo"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={chageAnio}
                                    valorFiltro="Año"
                                    valorDefault={anioDefault}
                                    useChange
                                />

                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="mes"
                                    label="Mes"
                                    placeholder="Mes"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={chageMes}
                                    valorFiltro="Mes"
                                    valorDefault={mesDefault}
                                    useChange
                                />
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="broker"
                                    label="Broker"
                                    placeholder="Broker"
                                    endPointURL={END_POINT_REPORTES_BROKERS}
                                    onChangeFunc={changeBroker}
                                    valorFiltro="Broker"
                                    valorDefault={mesDefault}
                                    useChange
                                />

                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="ejecutivo"
                                    label="Ejecutivo"
                                    placeholder="Ejecutivo"
                                    endPointURL={END_POINT_EMPLEADOS_BROKERS}
                                    onChangeFunc={changeEjecutivo}
                                    valorFiltro="0"
                                    valorDefault={mesDefault}
                                    useChange
                                />
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="estado"
                                    label="Estado"
                                    placeholder="Estado"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={changeEstado}
                                    valorFiltro="Estado"
                                    valorDefault={mesDefault}
                                    useChange
                                />

                            </Box>

                        </Card>
                    </Grid>
                </Grid>
            </FormProvider>


            <GenericDataGridCustom EndPoint={END_POINT_REPORTES_CRECIMIENTO_FIRMADO} genericParamAUX={parametroGenerico} columns={columnsReporte} />

        </>
    );
} 

function DesGloseColocacion() {
    const methods = useForm({});

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const [cargando, setCargando] = useState(false);

    const onSubmit = async (data) => {
        try {
            setCargando(true);

        } catch (error) {
            console.error(error);
            setCargando(false);
        }
    };

    const columnsReporte = [
        {
            field: 'anio',
            headerName: 'Año',
            flex: 1,
            editable: false,
        },
        {
            field: 'firmaHipo',
            headerName: 'Firma Hipotecarias',
            flex: 1,
            editable: false,
        },
        {
            field: 'operacionesHipo',
            headerName: 'Operaciones Hipotecarias',
            flex: 1,
            editable: false,
        },
        {
            field: 'firmaPyme',
            headerName: 'Firma Pyme',
            flex: 1,
            editable: false,
        },
        {
            field: 'operacionesPyme',
            headerName: 'Operaciones Pyme',
            flex: 1,
            editable: false,
        },
        {
            field: 'firmaAuto',
            headerName: 'Firma Auto',
            flex: 1,
            editable: false,
        },
        {
            field: 'operacionesAuto',
            headerName: 'Operaciones Auto',
            flex: 1,
            editable: false,
        },
        {
            field: 'firmaTotal',
            headerName: 'Firma Total',
            flex: 1,
            editable: false,
        },
        {
            field: 'operacionesTotal',
            headerName: 'Operaciones Total',
            flex: 1,
            editable: false,
        },

    ];

    const [anioDefault, setanioDefault] = useState("");
    const [mesDefault, setmesDefault] = useState("");
    const [brokerDefault, setBrokerDefault] = useState("")
    const [ejecutivoDefault, setEjecutivoDefault] = useState("")
    const [estadoDefault, setEstadoDefault] = useState("")

    const [anioFiltro, setanioFiltro] = useState("");
    const [mesFiltro, setmesFiltro] = useState("");
    const [brokerFiltro, setBrokerFiltro] = useState("")
    const [ejecutivoFiltro, setEjecutivoFiltro] = useState("")
    const [estadoFiltro, setEstadoFiltro] = useState("")

    const [parametroGenerico, setparametroGenerico] = useState(`#${anioDefault}#${mesDefault}#${brokerDefault}#${ejecutivoDefault}#${estadoDefault}`);


    useEffect(() => {
        const hoy = new Date();
        setanioDefault(hoy.getFullYear());
        setmesDefault(hoy.getMonth());
    }, [setanioDefault, setmesDefault])

    useEffect(() => {
        console.log('el parametro generico', parametroGenerico);
    }, [parametroGenerico])


    const chageAnio = (param) => {
        setanioFiltro(param)
        setparametroGenerico(`#${param}#${mesFiltro}#${brokerFiltro}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const chageMes = (param) => {
        setmesFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${param}#${brokerFiltro}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const changeBroker = (param) => {
        setBrokerFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${param}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const changeEjecutivo = (param) => {
        setEjecutivoFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${brokerFiltro}#${param}#${estadoFiltro}`)
    }
    const changeEstado = (param) => {
        setEstadoFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${brokerFiltro}#${ejecutivoFiltro}#${param}`)
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
                                    sm: 'repeat(5, 1fr)',
                                }}
                            >
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="periodos"
                                    label="Año"
                                    placeholder="Periodo"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={chageAnio}
                                    valorFiltro="Año"
                                    valorDefault={anioDefault}
                                    useChange
                                />

                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="mes"
                                    label="Mes"
                                    placeholder="Mes"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={chageMes}
                                    valorFiltro="Mes"
                                    valorDefault={mesDefault}
                                    useChange
                                />
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="broker"
                                    label="Broker"
                                    placeholder="Broker"
                                    endPointURL={END_POINT_REPORTES_BROKERS}
                                    onChangeFunc={changeBroker}
                                    valorFiltro="Broker"
                                    valorDefault={mesDefault}
                                    useChange
                                />

                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="ejecutivo"
                                    label="Ejecutivo"
                                    placeholder="Ejecutivo"
                                    endPointURL={END_POINT_EMPLEADOS_BROKERS}
                                    onChangeFunc={changeEjecutivo}
                                    valorFiltro="0"
                                    valorDefault={mesDefault}
                                    useChange
                                />
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="estado"
                                    label="Estado"
                                    placeholder="Estado"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={changeEstado}
                                    valorFiltro="Estado"
                                    valorDefault={mesDefault}
                                    useChange
                                />

                            </Box>

                        </Card>
                    </Grid>
                </Grid>
            </FormProvider>


            <GenericDataGridCustom EndPoint={END_POINT_REPORTES_DESGLOSE_COLOCACIONES} genericParamAUX={parametroGenerico} columns={columnsReporte} />

        </>
    );
} 

function MontosOperaciones() {
    const methods = useForm({});

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const [cargando, setCargando] = useState(false);

    const onSubmit = async (data) => {
        try {
            setCargando(true);

        } catch (error) {
            console.error(error);
            setCargando(false);
        }
    };

    const columnsReporte = [
        {
            field: 'anio',
            headerName: 'Año',
            flex: 1,
            editable: false,
        },
        {
            field: 'firmaTotal',
            headerName: 'Firma Total',
            flex: 1,
            editable: false,
        },
        {
            field: 'operacionesTotal',
            headerName: 'Operaciones Total',
            flex: 1,
            editable: false,
        },
        {
            field: 'firmaTicket',
            headerName: 'Ticket',
            flex: 1,
            editable: false,
        },

    ];

    const [anioDefault, setanioDefault] = useState("");
    const [mesDefault, setmesDefault] = useState("");
    const [brokerDefault, setBrokerDefault] = useState("")
    const [ejecutivoDefault, setEjecutivoDefault] = useState("")
    const [estadoDefault, setEstadoDefault] = useState("")

    const [anioFiltro, setanioFiltro] = useState("");
    const [mesFiltro, setmesFiltro] = useState("");
    const [brokerFiltro, setBrokerFiltro] = useState("")
    const [ejecutivoFiltro, setEjecutivoFiltro] = useState("")
    const [estadoFiltro, setEstadoFiltro] = useState("")

    const [parametroGenerico, setparametroGenerico] = useState(`#${anioDefault}#${mesDefault}#${brokerDefault}#${ejecutivoDefault}#${estadoDefault}`);


    useEffect(() => {
        const hoy = new Date();
        setanioDefault(hoy.getFullYear());
        setmesDefault(hoy.getMonth());
    }, [setanioDefault, setmesDefault])

    useEffect(() => {
        console.log('el parametro generico', parametroGenerico);
    }, [parametroGenerico])


    const chageAnio = (param) => {
        setanioFiltro(param)
        setparametroGenerico(`#${param}#${mesFiltro}#${brokerFiltro}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const chageMes = (param) => {
        setmesFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${param}#${brokerFiltro}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const changeBroker = (param) => {
        setBrokerFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${param}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const changeEjecutivo = (param) => {
        setEjecutivoFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${brokerFiltro}#${param}#${estadoFiltro}`)
    }
    const changeEstado = (param) => {
        setEstadoFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${brokerFiltro}#${ejecutivoFiltro}#${param}`)
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
                                    sm: 'repeat(5, 1fr)',
                                }}
                            >
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="periodos"
                                    label="Año"
                                    placeholder="Periodo"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={chageAnio}
                                    valorFiltro="Año"
                                    valorDefault={anioDefault}
                                    useChange
                                />

                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="mes"
                                    label="Mes"
                                    placeholder="Mes"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={chageMes}
                                    valorFiltro="Mes"
                                    valorDefault={mesDefault}
                                    useChange
                                />
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="broker"
                                    label="Broker"
                                    placeholder="Broker"
                                    endPointURL={END_POINT_REPORTES_BROKERS}
                                    onChangeFunc={changeBroker}
                                    valorFiltro="Broker"
                                    valorDefault={mesDefault}
                                    useChange
                                />

                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="ejecutivo"
                                    label="Ejecutivo"
                                    placeholder="Ejecutivo"
                                    endPointURL={END_POINT_EMPLEADOS_BROKERS}
                                    onChangeFunc={changeEjecutivo}
                                    valorFiltro="0"
                                    valorDefault={mesDefault}
                                    useChange
                                />
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="estado"
                                    label="Estado"
                                    placeholder="Estado"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={changeEstado}
                                    valorFiltro="Estado"
                                    valorDefault={mesDefault}
                                    useChange
                                />

                            </Box>

                        </Card>
                    </Grid>
                </Grid>
            </FormProvider>


            <GenericDataGridCustom EndPoint={END_POINT_REPORTES_MONTOS_OPERACIONES} genericParamAUX={parametroGenerico} columns={columnsReporte} />

        </>
    );
} 

function ColcoacionEjecutivo() {
    const methods = useForm({});

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const [cargando, setCargando] = useState(false);

    const onSubmit = async (data) => {
        try {
            setCargando(true);

        } catch (error) {
            console.error(error);
            setCargando(false);
        }
    };

    const columnsReporte = [
        {
            field: 'ejecutivo',
            headerName: 'Ejecutivo',
            flex: 1,
            editable: false,
        },
        {
            field: 'operaciones2025',
            headerName: 'Operaciones 2025',
            flex: 1,
            editable: false,
        },
        {
            field: 'firma2025',
            headerName: 'firma2025',
            flex: 1,
            editable: false,
        },
        {
            field: 'operaciones2024',
            headerName: 'Operaciones 2024',
            flex: 1,
            editable: false,
        },
        {
            field: 'firma2024',
            headerName: 'Firma 2024',
            flex: 1,
            editable: false,
        },
        {
            field: 'operaciones2023',
            headerName: 'Operaciones 2023',
            flex: 1,
            editable: false,
        },
        {
            field: 'firma2023',
            headerName: 'Firma 2023',
            flex: 1,
            editable: false,
        },
        {
            field: 'operaciones2022',
            headerName: 'Operaciones 2022',
            flex: 1,
            editable: false,
        },
        {
            field: 'firma2022',
            headerName: 'Firma 2022',
            flex: 1,
            editable: false,
        },
        {
            field: 'operaciones2021',
            headerName: 'Operaciones 2021',
            flex: 1,
            editable: false,
        },
        {
            field: 'firma2021',
            headerName: 'Firma 2021',
            flex: 1,
            editable: false,
        },
        {
            field: 'operacionesTotal',
            headerName: 'Operaciones Total',
            flex: 1,
            editable: false,
        },
        {
            field: 'firmaTotal',
            headerName: 'Firma Total',
            flex: 1,
            editable: false,
        },

    ];

    const [anioDefault, setanioDefault] = useState("");
    const [mesDefault, setmesDefault] = useState("");
    const [brokerDefault, setBrokerDefault] = useState("")
    const [ejecutivoDefault, setEjecutivoDefault] = useState("")
    const [estadoDefault, setEstadoDefault] = useState("")

    const [anioFiltro, setanioFiltro] = useState("");
    const [mesFiltro, setmesFiltro] = useState("");
    const [brokerFiltro, setBrokerFiltro] = useState("")
    const [ejecutivoFiltro, setEjecutivoFiltro] = useState("")
    const [estadoFiltro, setEstadoFiltro] = useState("")

    const [parametroGenerico, setparametroGenerico] = useState(`#${anioDefault}#${mesDefault}#${brokerDefault}#${ejecutivoDefault}#${estadoDefault}`);


    useEffect(() => {
        const hoy = new Date();
        setanioDefault(hoy.getFullYear());
        setmesDefault(hoy.getMonth());
    }, [setanioDefault, setmesDefault])

    useEffect(() => {
        console.log('el parametro generico', parametroGenerico);
    }, [parametroGenerico])


    const chageAnio = (param) => {
        setanioFiltro(param)
        setparametroGenerico(`#${param}#${mesFiltro}#${brokerFiltro}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const chageMes = (param) => {
        setmesFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${param}#${brokerFiltro}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const changeBroker = (param) => {
        setBrokerFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${param}#${ejecutivoFiltro}#${estadoFiltro}`)
    }
    const changeEjecutivo = (param) => {
        setEjecutivoFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${brokerFiltro}#${param}#${estadoFiltro}`)
    }
    const changeEstado = (param) => {
        setEstadoFiltro(param)
        setparametroGenerico(`#${anioFiltro}#${mesFiltro}#${brokerFiltro}#${ejecutivoFiltro}#${param}`)
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
                                    sm: 'repeat(5, 1fr)',
                                }}
                            >
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="periodos"
                                    label="Año"
                                    placeholder="Periodo"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={chageAnio}
                                    valorFiltro="Año"
                                    valorDefault={anioDefault}
                                    useChange
                                />

                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="mes"
                                    label="Mes"
                                    placeholder="Mes"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={chageMes}
                                    valorFiltro="Mes"
                                    valorDefault={mesDefault}
                                    useChange
                                />
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="broker"
                                    label="Broker"
                                    placeholder="Broker"
                                    endPointURL={END_POINT_REPORTES_BROKERS}
                                    onChangeFunc={changeBroker}
                                    valorFiltro="Broker"
                                    valorDefault={mesDefault}
                                    useChange
                                />

                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="ejecutivo"
                                    label="Ejecutivo"
                                    placeholder="Ejecutivo"
                                    endPointURL={END_POINT_EMPLEADOS_BROKERS}
                                    onChangeFunc={changeEjecutivo}
                                    valorFiltro="0"
                                    valorDefault={mesDefault}
                                    useChange
                                />
                                <GenericCombo
                                    // disabled={disabled}
                                    nameAUX="estado"
                                    label="Estado"
                                    placeholder="Estado"
                                    endPointURL={END_POINT_REPORTES_CATALOGOS}
                                    onChangeFunc={changeEstado}
                                    valorFiltro="Estado"
                                    valorDefault={mesDefault}
                                    useChange
                                />

                            </Box>

                        </Card>
                    </Grid>
                </Grid>
            </FormProvider>


            <GenericDataGridCustom EndPoint={END_POINT_REPORTES_COLOCACION_EJECUTIVO} genericParamAUX={parametroGenerico} columns={columnsReporte} />

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



