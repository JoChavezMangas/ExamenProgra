// routes
import { PATH_DASHBOARD } from './routes/paths';

// API 2024-04-29
// ----------------------------------------------------------------------
// Url para ingreso
//  export const HOST_API_KEY = "https://testing.conecta.lat/";
//  export const HOST_API_LOCAL = "https://testing.conecta.lat/";
  export const HOST_API_SISTEMAS = "https://apiexternos.sisec.mx/";
  export const END_POINT_OBTENER_DOCUMENTO = "http://201.161.90.206/api/document/getDocument?documentId=";
  export const END_POINT_TOKEN_DOCUMENTO = "http://201.161.90.206/token";



 export const HOST_API_KEY = "https://pr.conecta.lat/";
 export const HOST_API_LOCAL = "https://pr.conecta.lat/";
// export const HOST_API_KEY = "https://localhost:7285/";
// export const HOST_API_LOCAL = "https://localhost:7285/";
// export const HOST_API_SISTEMAS = "https://papiexternos.sisec.mx/";
// export const END_POINT_OBTENER_DOCUMENTO = "http://apidocumentv3.sisec.mx/api/document/getDocument?documentId=";
// export const END_POINT_TOKEN_DOCUMENTO = "http://apidocumentv3.sisec.mx/token";


 export const MOSTRAR_LOGIN = "MOSTRAR";
// export const MOSTRAR_LOGIN = "ESCONDER";

export const TESTIGO = "20241004";

export const END_POINT_SISTEMAS_RENOVAR_TOKEN = "api/authenticationservice/token";
export const END_POINT_RENOVAR_TOKEN = "api/cuentas/RenovarToken";
export const END_POINT_AGENTESOC_ROLES ="api/AgenteSOC/GetRoles";
export const END_POINT_BROKERS_MASTER = "api/BrokerMaster/GetRoles";
export const END_POINT_CVELOZ_ROLES = "api/CapturaVeloz/GetRoles";
export const END_POINT_CVELOZ_BANCOS = "api/CapturaVeloz/GetBankByRoleCapturista";
export const END_POINT_CVELOZ_ANS = "api/CapturaVeloz/GetYearsByRoleCapturista";
export const END_POINT_CREDIHIPOTECARIO_ROLES = "api/CREDIHIPOTECARIO/GetRole";
export const END_POINT_RESUELVEME_ROLES = "api/Resuelveme/GetRoles";
export const END_POINT_RESUELVEME_DEPARMENT = "api/Resuelveme/GetDepartment";
export const END_POINT_RESUELVEME_COMPANY = "api/Resuelveme/GetCompany";
export const END_POINT_SICAFI_ROLES = "api/SICAFI/GetRoles";
export const END_POINT_SICAFI_FRANQUICIA ="api/SICAFI/GetFranchise";
export const END_POINT_SISEC_ROLES = "api/SISEC/GetRoles";
export const END_POINT_SISEC_FRANCHISE = "api/SISEC/GetFranchise";
export const END_POINT_SISEC_BANCOS ="api/SISEC/GetBankByPagoEjecutivo";
export const END_POINT_VALIDOC_OPERATION ="api/Validoc/GetTypeOperation";
export const END_POINT_VALIDOC_ROLES ="api/Validoc/GetRoles";
export const END_POINT_VALIDOC_SUPERVISOR ="api/Validoc/GetSupervisor";
export const END_POINT_SISEC_CREDIBAKS = "api/SISEC/GetBankByCrediHipotecario";


export const END_POINT_BANDEJA_EMPRESA = "api/Empresa/Listar";
export const END_POINT_BANDEJAEMPLEADOS = "api/Empleado/Listar";
export const END_POINT_BANDEJAEMPLEADOS_EN_BASE = "api/Empleado/ObtenerTodosEmpleadosEnBase";
export const END_POINT_BANDEJAEMPLEADOS_EMPRESA = "api/Empleado/BandeaEmpleadoRHEmpresa";
export const END_POINT_BANDEJAEMPLEADOS_RH = "api/Empleado/BandeaEmpleadoRH";
export const END_POINT_BANDEJA_AREA = "api/Empresa/ObtenerListaBandejaAreas";
export const END_POINT_BANDEJA_AREA_EMPRESA = "api/Empresa/ObtenerListaBandejaAreasPorEmpresa";
export const END_POINT_BANDEJA_DEPARTAMENTO = "api/Empresa/ObtenerListaBandejaDepartamentos";
export const END_POINT_BANDEJA_DEPARTMENTO_EMPLEADO = "api/Empleado/BandeaEmpleadoPorDepto";
export const END_POINT_BANDEJA_PUESTO = "api/Empresa/ObtenerListaBandejaPuesto";
export const END_POINT_BANDEJA_PUESTO_EMPRESA = "api/Empresa/ObtenerListaBandejaPuestoPorEmpresa";
export const END_POINT_CREAR_EMPRESA = "api/Empresa/Crear";
export const END_POINT_CREAR_AREA = "api/Empresa/AgregarArea";
export const END_POINT_CREAR_DEPARTAMENTO = "api/Empresa/AgregarDepartamento";
export const END_POINT_CREAR_PUESTO = "api/Empresa/AgregarPuesto";
export const END_POINT_CREAR_EPLEADO = "api/Empleado/Crear";
export const END_POINT_EDITAR_EMPRESA = "api/Empresa/EditarEmpresa";
export const END_POINT_EDITAR_AREA = "api/Empresa/EditarArea";
export const END_POINT_EDITAR_DEPARTAMENTO = "api/Empresa/EditarDepartamento";
export const END_POINT_EDITAR_PUESTO = "api/Empresa/EditarPuesto";
export const END_POINT_EDITAR_EMPLEADO = "api/Empleado/EditarEmpelado";
export const END_POINT_ELIMINAR_EMPLEADO = "api/Empleado/EliminarEmpleado";
export const END_POINT_OBTENER_EMPRESA = "api/Empresa/ObtenerEmpresaPorId";
export const END_POINT_OBTENER_AREA = "api/Empresa/ObtenerAreaPorId";
export const END_POINT_OBTENER_DEPARTAMENTO = "api/Empresa/ObtenerDepartamentoPorId";
export const END_POINT_OBTENER_PUESTO = "api/Empresa/ObtenerPuestoPorId";
export const END_POINT_OBTENER_EMPLEADO = "api/Empleado/ObtenerEmpleadoPorId";
export const END_POINT_OBTENER_HISTORIAL_EMPLEADO = "api/Empleado/ObtenerHistorialEmpleado";

export const END_POINT_OBTENER_DATOS_TABLERO = "api/SolicitudesIncidencias/ObtenerDatosTableros";
export const END_POINT_CREAR_SOLICITUD = "api/SolicitudesIncidencias/CrearSolicitud";
export const END_POINT_EDITAR_SOLICITUD = "api/SolicitudesIncidencias/ActualizarSolicitud";
export const END_POINT_TABLEROS_MIS_SOLICITUDES = "api/SolicitudesIncidencias/SolicitudesPropias";
export const END_POINT_TABLEROS_HISTORIAL_SOLICITUDES = "api/SolicitudesIncidencias/HistorialSolicitudes";
export const END_POINT_TABLEROS_SOLICITUDES = "api/SolicitudesIncidencias/BandejaSolicitudes";
export const END_POINT_SOLICITUDES_GENERAL_RH ="api/solicitudesIncidencias/BandejaSolcitudesGeneralRH";
export const END_POINT_HISTORIAL_SOLICITUD = "api/SolicitudesIncidencias/ObtenerHistorialPorsolicitud";
export const END_POINT_HISTORIAL_BALANCE = "api/SolicitudesIncidencias/BalanceLider";
export const END_POINT_BANDEJA_PERIODOS = "api/SolicitudesIncidencias/BandejaPeriodos";
export const END_POINT_CREAR_PERIODOS = "api/SolicitudesIncidencias/CrearNuevoPeriodo";
export const END_POINT_BORRAR_PERIODO = "api/SolicitudesIncidencias/BorrarPeriodo"
export const END_POINT_OBTENER_PERIODOS_EMPLEADO = "api/SolicitudesIncidencias/PeriodosPorEmpleado";
export const END_POINT_EDITAR_PERIODO = "api/SolicitudesIncidencias/EditarPeriodo";
export const END_POINT_HISTORIAL_EMPLEADO = "api/Empleado/HistorialEmpleadoporId";

export const END_POINT_HISTORIAL_BALANCE_PARES = "api/Empleado/BalancePares";
export const END_POINT_HISTORIAL_BALANCE_JEFE_DIRECTO = "api/Empleado/BalanceJefeDirecto";

export const END_POINT_BANDEJA_PERIODOS_VENCIMIENTO = "api/SolicitudesIncidencias/BandejaPeriodosVencimiento";
export const END_POINT_SOLICITUDES_CERRAR_ABRIR_PERIODOS = "api/SolicitudesIncidencias/CerrarAbrirPeriodo";
export const END_POINT_OBTENER_PERIODO_VACACIONES_ADELANTAR = "api/ComunAuxiliares/PeriodosAdelatar";
export const END_POINT_BANDEJA_PERIODO_VACACIONES_ADELANTAR = "api/SolicitudesIncidencias/BandejaAdelatarPeriodoVacacional";
export const END_POINT_AGREGAR_PERIODO_VACACIONES = "api/SolicitudesIncidencias/AgregarPeriodo";
export const END_POINT_AGREGAR_PETICIONES_ESPECIALES = "api/SolicitudesIncidencias/BandejaPeticionesEspeciales";
export const END_POINT_OBTENER_HISTORIAL_VACACIONES_EMPLEADO = "api/SolicitudesIncidencias/ObtenerHistorialVacacionesEmpleado";
export const END_POINT_BANDEJA_PETICIONES_ESPECIALES = "api/SolicitudesIncidencias/BandejaPeticionesEspeciales";
export const END_POINT_AGREGAR_DIASES_PECIALES = "api/SolicitudesIncidencias/DiasEspeciales";
export const END_POINT_AGREGAR_DIASES_EDIT_ESPECIALES = "api/SolicitudesIncidencias/EditarDiasEspeciales";
export const END_POINT_OBTENER_COMBO_CATALOGO_GENERICO = "api/ComunAuxiliares/ObtenerCatalogosGenericos";
export const END_POINT_OBTENER_VALOR_ALTENO_CATALOGO = "api/ComunAuxiliares/ObtenerCatalogosGenericosValorAlterno";
export const END_POINT_OBTENER_VALOR_ALTENO_CATALOGO_ID = "api/ComunAuxiliares/ObtenerCatalogosGenericosValorAlternoId";
export const END_POINT_OBTENER_DOCUMENTOS_SOLICITUD = "api/SolicitudesIncidencias/ObtenerDocumentosSolicitud";
export const END_POINT_BORRAR_DOCUMENTOS_SOLICITUD = "api/SolicitudesIncidencias/BorrarDocumentosSolicitud";
export const END_POINT_BORRAR_CANCELAR_SOLICITUD = "api/SolicitudesIncidencias/CancelarSolicitud";
export const END_POINT_SOLICITUDES_CALENDARIO = "api/SolicitudesIncidencias/SolicitudesCalendario";
export const END_POINT_MANDAR_OTROSISTEMA = "api/Empleado/MandarEmpeladoSistemas";
export const END_POINT_OBTENER_OTROS_SISTEMAS = "api/ComunAuxiliares/ObtenerComboSistemasPorEmpleado";
export const END_POINT_ACTUALIZAR_POLITICA_EMPLEADO = "api/SolicitudesIncidencias/ActualizarPoliticaEmpleado";
export const END_POINT_OBTENER_POLITICA_EMPLEADO = "api/SolicitudesIncidencias/ObtenerPoliticaEmpleado";
export const END_POINT_BANDEJA_DIAS_INHABILES = "api/ComunAuxiliares/BandejaDiasInhailes";
export const END_POINT_CREAR_DIAS_INHABILES = "api/ComunAuxiliares/CrearDiaFeriado";
export const END_POINT_EDITAR_DIAS_INHABILES = "api/ComunAuxiliares/ActualizarDiaFeriado";
export const END_POINT_OBTENER_DIAS_INHABILES = "api/ComunAuxiliares/ObtenerDiaFeriado";
export const END_POINT_BORRAR_DIAS_INHABILES = "api/ComunAuxiliares/BorrarDiaFeriado";
export const END_POINT_REPORTE_VACACIONES_PENDIENTES = "api/ComunAuxiliares/ReporteVacionesPendientes";
export const END_POINT_REPORTE_VACACIONES_TOMADAS = "api/ComunAuxiliares/ReporteVacionestomadas";

// const TOKEN_ENDPOINT = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvY2hhdmV6QHNvY2FzZXNvcmVzLmNvbSIsIkVzQWRtaW4iOiIxIiwiZXhwIjoxNjc3MTc0OTk0fQ.PYtyDTAvSc6-UtCe9LORDjse5GAm0yoPWViZJzOFRPiP_GG2SFeOUewKkO-o99U7rhbzp8st8A9qKDCshYRyZw'
export const BEARER_TOKEN = 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvY2hhdmV6QHNvY2FzZXNvcmVzLmNvbSIsIkVzQWRtaW4iOiIxIiwiZXhwIjoxNjc3MTkyNDc4fQ.3YyfEE9YwuhOJ6cDBPPys3YOudTgDZ6IyW-4-w4BEqDgZzZ7f_DqnR4IL08z5J3NuWDv_mP_wBv3WQCpyz86ug';

// Combos
export const END_POINT_COMBO_LISTA_EMPRESA = "api/Empresa/ObtenerListaEmpresas";
export const END_POINT_COMBO_LISTA_AREA_POR_EMPRESAS = "api/Empresa/ObtenerListaAreaPorEmpresas";
export const END_POINT_COMBO_LISTA_PUESTO_POR_AREA = "api/Empresa/ObtenerListaPuestoPorArea";
export const END_POINT_COMBO_LISTA_PUESTO_POR_DEPARTAMENTO = "api/Empresa/ObtenerListaPuestoPorDepartamento";
export const END_POINT_COMBO_LISTA_DEPARTAMENTO_POR_AREA = "api/Empresa/ObtenerListaDepartamentoPorArea";

export const END_POINT_COMBO_LISTA_ROLES = "api/Empleado/ObtenerListaRoles";
export const END_POINT_COMBO_POSIBLESJEFES = "api/ComunAuxiliares/ObtenerPosiblesJefesDirectos";

export const END_POINT_PASWORD_OLVIDADO = "api/cuentas/PasswordOlvidado";
export const END_POINT_PASSWORD_CAMBIAR_ADMIN = "api/cuentas/CambiarPasswordEmpleado";
export const END_POINT_PASWORD_CAMBIAR = "api/cuentas/CambiarPassword";

export const END_POINT_BORRAR_EMPRESA = "api/Empresa/BorrarEmpresa";
export const END_POINT_BORRAR_AREA = "api/Empresa/BorrarArea";
export const END_POINT_BORRAR_DEPARTAMENTO = "api/Empresa/BorrarDepartamento";
export const END_POINT_BORRAR_PUESTO = "api/Empresa/BorrarPuesto";
export const END_POINT_BORRAR_EMPLEADO = "api/Empleado/BorrarEmpleado";
export const END_POINT_EMPLEADOS_BAJA = "api/Empleado/BajaEmpleado"
export const END_POINT_EMPLEADOS_REACTIVAR = "api/Empleado/ReactivarEmpleado"
export const END_POINT_INACTIVAR_EMPLEADO = "api/Empleado/InactivarEmpleado";
export const END_POINT_REACTIVAR_EMPLEADO = "api/Empleado/ReactivarEmpleado";
export const END_POINT_BANDEJAREPORTE_EMPLEADOVACACIONES = "api/SolicitudesIncidencias/BandejaReporteEmpleadoVacaciones";
export const END_POINT_LOGIN_MULTILOGIN = "api/cuentas/obtener";
export const END_POINT_LOGOUT_MULTILOGIN = "api/cuentas/LogeOut";
export const END_POINT_LOGINRAPIDO = "api/cuentas/ResultadoRapidoLogin";
export const END_POINT_OBTENER_GENERALESVACACIONES = "api/SolicitudesIncidencias/DetallesGeneralesVacacionesEmpleado";
export const END_POINT_OBTENER_HISTVACACIONES = "api/SolicitudesIncidencias/HisorialGeneralesVacacionesEmpleado";

export const END_POINT_EMPLEADO_VERIFICAR_MULTI = "api/Empleado/VerificarEmpleadoMulti";
export const END_POINT_CREAR_MULTILOGIN = "api/Empleado/CrearEmpleadoMultilogin";
export const END_POINT_ACTUALIZAR_USUARIO = "api/cuentas/ActualizarUsuario";
export const END_POINT_CAMBIAR_PASS_MULTI = "api/cuentas/CambiarPassMulti";
export const END_POINT_OBTENER_DOC_API_CONECTA = "api/ComunAuxiliares/ObtenerDocumento";
export const END_POINT_BANDEJA_LOGS = "api/ComunAuxiliares/BandejaLog";
export const END_POINT_ACTUALIZAR_CURP_IDEXTERNO = "api/Empleado/ActualizarCURPIdExterno";



export const TEXTO_ERROR_PASS = "Las contrase�as deben de coincidir";

export const FIREBASE_API = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export const COGNITO_API = {
  userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
  clientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID,
};

export const AUTH0_API = {
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
};

export const MAP_API = process.env.REACT_APP_MAPBOX_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.general.app; // as '/dashboard/app'

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  H_MOBILE: 64,
  H_MAIN_DESKTOP: 72,
  H_DASHBOARD_DESKTOP: 72,
  H_DASHBOARD_DESKTOP_OFFSET: 88 - 32,
};

export const NAV = {
  W_BASE: 230,
  W_DASHBOARD: 250,
  W_DASHBOARD_MINI: 88,
  //
  H_DASHBOARD_ITEM: 48,
  H_DASHBOARD_ITEM_SUB: 36,
  //
  H_DASHBOARD_ITEM_HORIZONTAL: 32,
};

export const ICON = {
  NAV_ITEM: 24,
  NAV_ITEM_HORIZONTAL: 22,
  NAV_ITEM_MINI: 22,
};
