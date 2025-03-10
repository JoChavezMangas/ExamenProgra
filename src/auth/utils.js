// routes
import {
    HOST_API_KEY,
    END_POINT_RENOVAR_TOKEN
} from '../config-global';
import { PATH_AUTH } from '../routes/paths';
// utils
import axios from '../utils/axios';




// ----------------------------------------------------------------------

// function jwtDecode(token) {
//  const base64Url = token.split('.')[1];
//  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//  const jsonPayload = decodeURIComponent(
//    window
//      .atob(base64)
//      .split('')
//      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
//      .join('')
//  );

//  return JSON.parse(jsonPayload);
// }

// ----------------------------------------------------------------------



// verifica si el token actual es valido y si no ha expirado
export const isValidToken = (accessToken, HoraValidar, mostrarModal) => {


    // Verifica si el token no esta vacio
    if (!accessToken) {
        return false;
    }

    const ultimaHoraRegistrada = localStorage.getItem('horaAcceso');
    // verifica que tengamos ultima hora de interaccion
    if (!ultimaHoraRegistrada) {
        return false;
    }
   
    // verifica que no se haya pasado demasiado tiempo desde la ultima interaccion
    if ((HoraValidar - ultimaHoraRegistrada) > 1800000) {
        return false;
    }


    ValidarRenovacion(true, mostrarModal)

    return true;
    
  // const decoded = jwtDecode(accessToken);
  // const currentTime = Date.now() / 1000;
  // return decoded.exp > currentTime;
};



// Coloca el acces token o destruye el token
export const setSession = (accessToken,  fecha,EmpleaodId,RolId) => {
    if (accessToken) {

        const horaRecarga = new Date().valueOf();
        // Guarda los datos de la sesion
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('EmpleadoId', EmpleaodId);
        localStorage.setItem('RolId', RolId);
        localStorage.setItem('expiracionToken', fecha);
        localStorage.setItem('horaAcceso', horaRecarga);

        // Coloca por default el token y la atorizacion 
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        // Inicia el contador para mostrar el modal de tiempo de sesion
        // contadorExpiraSesion(mostrarModal);
        // Inicia los eventos para detectar actividad en la pantalla
        // colocarEventos();
    } else {
        // Destrulle el los datos de sesion 
        localStorage.removeItem('accessToken');
        localStorage.removeItem('EmpleadoId');
        localStorage.removeItem('RolId');
        localStorage.removeItem('horaAcceso');
        // Redirige a la pantalla de login
        window.location.href = PATH_AUTH.login;
        // Borra el valor pre determinado para la autorizacion del axios
        delete axios.defaults.headers.common.Authorization;
    }
};



// Renueva o destrulle la sesion
export const ValidarRenovacion = (renovar, ModalTiempoAgotado) => {

    const URL = HOST_API_KEY + END_POINT_RENOVAR_TOKEN;

    if (renovar) {
        // console.log("deberia de renovar", localStorage.getItem('accessToken'))
        const AUT = `Bearer ${localStorage.getItem('accessToken')}`
        
         axios({
             method: 'get',
             url: URL,
             params: { email: "..." },
             headers: { 'Authorization': AUT }
         }).then(result => {
             setSession(result.data.token, ModalTiempoAgotado, new Date(result.data.expiracion).valueOf(), result.data.empleadoId, result.data.rolId);
         }).catch(() => {
             setSession(false, () => { })
         })
    } else {
        setSession(false, () => { })
    }
}





