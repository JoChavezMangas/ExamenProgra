// routes
import { PATH_DASHBOARD } from './routes/paths';

// ----------------------------------------------------------------------
// Url para ingreso

 export const HOST_API_KEY = "https://localhost:7285/";
 export const HOST_API_LOCAL = "https://localhost:7285/";


 export const MOSTRAR_LOGIN = "MOSTRAR";
// export const MOSTRAR_LOGIN = "ESCONDER";

export const TESTIGO = "20241004";


export const END_POINT_LOGINRAPIDO = "api/cuentas/ResultadoRapidoLogin";
export const END_POINT_LOGIN = "api/cuentas/Login";
export const END_POINT_PEDIDOS_CATALOGOS = "api/pedidos/ObetenerCombo";
export const END_POINT_PEDIDOS_BANCOS = "api/pedidos/ObtenerBancos";
export const END_POINT_PEDIDOS_BROKERS = "api/pedidos/ObtenerBrokers";
export const END_POINT_PEDIDOS_REGISTRAR = "api/pedidos/RegistrarPedidos";
export const END_POINT_REPORTES_COLOCACION_MENSUAL = "api/reportes/ColocacionMensual";
export const END_POINT_REPORTES_OPERACION_MENSUAL = "api/reportes/OperacionesMensual";
export const END_POINT_REPORTES_COLOCACION_BANCO = "api/reportes/ColocacionBancos";
export const END_POINT_REPORTES_COLOCACION_ESTADO = "api/reportes/ColocacionEstados";
export const END_POINT_REPORTES_CRECIMIENTO_OPERACIONES = "api/reportes/CrecimientoOperaciones";
export const END_POINT_REPORTES_CRECIMIENTO_FIRMADO = "api/reportes/CrecimientoFirmado";
export const END_POINT_REPORTES_DESGLOSE_COLOCACIONES = "api/reportes/DesgloseColocaciones";
export const END_POINT_REPORTES_MONTOS_OPERACIONES = "api/reportes/MontosOperaciones";
export const END_POINT_REPORTES_COLOCACION_EJECUTIVO = "api/reportes/ColcoacionEjecutivo";
export const END_POINT_REPORTES_CATALOGOS = "api/reportes/ObetenerCombo";
export const END_POINT_REPORTES_BANCOS = "api/reportes/ObtenerBancos";
export const END_POINT_REPORTES_BROKERS = "api/reportes/ObtenerBrokers";
export const END_POINT_EMPLEADOS_BROKERS = "api/empleado/ObetenerComboEmpleados";
export const END_POINT_OBTENER_EMPLEADO = "api/Empleado/ObtenerEmpleadoPorId";
export const END_POINT_RENOVAR_TOKEN = "api/cuentas/RenovarToken";
export const LOGE_OUT = "/dashboard/app";
export const TEXTO_ERROR_PASS = "Las contraseñas deben de coincidir";

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
