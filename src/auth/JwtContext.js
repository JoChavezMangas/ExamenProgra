import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useCallback, useMemo, useState, forwardRef } from 'react';
// utils
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
  Typography,
} from '@mui/material';
import { fontWeight } from '@mui/system';
import { Navigate, useNavigate } from 'react-router';
import axios from '../utils/axios';
import localStorageAvailable from '../utils/localStorageAvailable';
//
import { isValidToken, setSession, ValidarRenovacion, ValidarTockenExterno } from './utils';
import navConfig from '../layouts/dashboard/nav/config-navigation';
import { END_POINT_LOGOUT_MULTILOGIN, END_POINT_RENOVAR_TOKEN, HOST_API_KEY } from '../config-global';


// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  isInitialized: true,
  isAuthenticated: true,
  user: null,
};

const reducer = (state, action) => {

    // console.log('al entrar al reducer', localStorage.getItem('RolId'));
    // localStorage.getItem('EmpleadoId');
    if (action.type === 'INITIAL') {
        // console.log('el reducer initial',action.payload)
        return {
            isInitialized: true,
            isAuthenticated: action.payload.isAuthenticated,
            user: action.payload.user,
        };
    }
    if (action.type === 'LOGIN') {

       
        return {
          ...state,
          isAuthenticated: true,
            user: {
                "id": localStorage.getItem('EmpleadoId'),
                "role": action.payload.user.role
            },
        };
    }
    if (action.type === 'MULTI') {
        
        return {
            ...state,
            isAuthenticated: true,
            user: {
                "id": localStorage.getItem('EmpleadoId'),
                "role": action.payload.user.role
            },
        };
    }
    if (action.type === 'REGISTER') {
        // console.log('el reducer REGISTER', action.payload)
        return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
    if (action.type === 'LOGOUT') {
        console.log('state',state)

    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};


/// Metodo que provee las variables de sesion de login
export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const storageAvailable = localStorageAvailable();


    const initialize = useCallback(async () => {
        try {





            const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';
            const accessTime = storageAvailable ? localStorage.getItem('expiracionToken') : 0;
            const horaRecarga = new Date().valueOf();
            // console.log("recarga de tocken")
            // console.log('loq ue tiene de acces token',accessToken)
            // console.log('el storageAvailable', storageAvailable)
            // console.log('el accessToken', localStorage.getItem('accessToken'))
            // verifica si hay token y si el token no ha caducado
            const enTiempoRecarga = ((accessTime - horaRecarga) / 1800000) < 60;




            if (accessToken && enTiempoRecarga) {

                // Guarda la hora en la que se ha validado la carga
                localStorage.setItem('horaAcceso', horaRecarga);

                // console.log("el token es valido", isValidToken(accessToken, horaRecarga, mostrarModal))

                // Coloca los valores de sesion, toma tambien el metodo para mostrar modal de tiempo de sesion
                // setSession(accessToken, mostrarModal, localStorage.getItem('expiracionToken'), localStorage.getItem('EmpleadoId'), localStorage.getItem('RolId'));
                // ValidarRenovacion(true, mostrarModal)
                // Carga los valores para el usuario, por el momento solo tien un valor de prueba


                ValidarTockenExterno()

                dispatch({
                    type: 'INITIAL',
                    payload: {
                        isAuthenticated: true,
                        user: { "displayName": "Jaydon Frankie", "role":  localStorage.getItem('RolId')},
                    },
                });

                // console.log('el state 1',state)


            } else {


                // console.log("dentro del else")

                dispatch({
                  type: 'INITIAL',
                  payload: {
                    isAuthenticated: false,
                    user: null,
                  },
                });
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: 'INITIAL',
                payload: {
                  isAuthenticated: false,
                  user: null,
                },
            });
        }
    }, [storageAvailable]);

    useEffect(() => {
        initialize();
    }, [initialize]);

    const loginMulti = useCallback(async (token) => {

        // localStorage.setItem('accessToken', token);
      
        const URLRenovar = HOST_API_KEY + END_POINT_RENOVAR_TOKEN;
        const AUT = `Bearer ${token}`

         axios({
            method: 'get',
             url: URLRenovar,
            params: { email: "loQueSEa" },
            headers: { 'Authorization': AUT }
         }).then(result => {
            setSession(result.data.token, mostrarModal, new Date(result.data.expiracion).valueOf(), result.data.empleadoId, result.data.rolId);
            ValidarTockenExterno()
            dispatch({
                type: 'MULTI',
                payload: {
                    userPrueba,
                    user: { "role": result.data.rolId },
                },
            });
         }).catch(() => {
            setSession(false, () => { })
         })

    },[])

    // LOGIN
    const login = useCallback(async (email, password) => {



        // Obtiene el token para la sesion
        const response = await axios.post('/api/cuentas/login', {
            email,
            password,
            // EmpleadoId,
            // RolId
        })
        .then((result) => {

            const horaRecarga = new Date().valueOf();
            localStorage.setItem('horaAcceso', horaRecarga);
            // console.log('este es el data', result.data)
            // Coloca los valores de sesion
            setSession(result.data.token,
                mostrarModal,
                new Date(result.data.expiracion).valueOf(),
                result.data.empleadoId,
                result.data.rolId
            );

            ValidarTockenExterno()

            dispatch({
                type: 'LOGIN',
                payload: {
                    userPrueba,
                    user: { "role": result.data.rolId },
                },
            });



        })
        .catch(() => {
            console.log('fallo!!')
            dispatch({
                type: 'LOGOUT',
            });
        });

    }, []);

  // REGISTER
    const register = useCallback(async (email, password, firstName, lastName) => {
        const response = await axios.post('/api/account/register', {
          email,
          password,
          firstName,
          lastName,
        });
    const { accessToken, user } = response.data;

    localStorage.setItem('accessToken', accessToken);

    dispatch({
        type: 'REGISTER',
        payload: {
            user,
        },
    });
    }, []);

  // LOGOUT
    const logout = useCallback(() => {
        // setSession(null, () => { });
        
        localStorage.removeItem('EmpleadoId');
        localStorage.removeItem('RolId');
        localStorage.removeItem('horaAcceso');
        localStorage.removeItem('accessToken');
        delete axios.defaults.headers.common.Authorization;
        const redirectUri = HOST_API_KEY + END_POINT_LOGOUT_MULTILOGIN;
        window.location.href = redirectUri;
        
        // axios.get('/api/cuentas/LogeOut');
        // console.log("loginOut");
        // dispatch({
        //  type: 'LOGOUT',
        // });
    }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: 'jwt',
      login,
      register,
      logout,
      loginMulti
    }),
    [state.isAuthenticated, state.isInitialized, state.user, login, logout, register,loginMulti]
  );


  // Muestra el modal de tiempo de sesion
  function mostrarModal(mostrarModalparam) {
    if (mostrarModalparam === 'mostrar') {
      setOpen(true);
      // Borra la sesion, se ejecuta tiempo despues de que se mostro el modal
      setIdTimeOut(setTimeout(() => {
        // console.log('set time Out');
        ValidarRenovacion(false, () => { });
      }, 10000));
    } else {
      setOpen(false);
    }
  }


  // Constante para mostrar el modal de tiempo de sesion
  const [open, setOpen] = useState(false);
  const [idTimeOut, setIdTimeOut] = useState('')
  const Transition = forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);
  // Modal de tiempo de sesion
  function AlertDialog() {
    const handleClose = () => {
      setOpen(false);
    };
    const Renovar = () => {
      ValidarRenovacion(true, mostrarModal);
      setOpen(false);
      // Cancela el SetTimeOut que hace el logOut
      clearTimeout(idTimeOut)
    };
    const Cerrar = () => {
      ValidarRenovacion(false, mostrarModal);
      setOpen(false);
    };
    // console.log('este es el inicial', initial);
    return (
      <div>

        <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle style={
            {
              color: '#00AB55',
              fontWeight: 'bold'
            }
          }>
            Pantalla Inactiva
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ¿Deseas mas tiempo para seguir trabajando?
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={Renovar}
              style={
                {
                  color: '#bdbdbd',
                }
              }>
              Salir de la pagina
            </Button>
            <Button onClick={Cerrar} variant="contained" color='success'>Continuar</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  return <> < AlertDialog />  <AuthContext.Provider value={memoizedValue} >{children}</AuthContext.Provider></>;
}











const userPrueba = {
  "id": "8864c717-587d-472a-929a-8e5f298024da-0",
  "displayName": "Jaydon Frankie",
  "email": "demo@minimals.cc",
  "password": "demo1234",
  "photoURL": "https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_default.jpg",
  "phoneNumber": "+40 777666555",
  "country": "United States",
  "address": "90210 Broadway Blvd",
  "state": "California",
  "city": "San Francisco",
  "zipCode": "94116",
  "about": "Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.",
  "role": "admin",
  "isPublic": true
}

