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
import { isValidToken, setSession, ValidarRenovacion } from './utils';
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

            if (accessToken) {

                // Guarda la hora en la que se ha validado la carga
                localStorage.setItem('horaAcceso', horaRecarga);


                // ValidarTockenExterno()

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
            setSession(result.data.token,
                new Date(result.data.expiracion).valueOf(),
                result.data.empleadoId,
                result.data.rolId
            );

            // ValidarTockenExterno()

            dispatch({
                type: 'LOGIN',
                payload: {
                    userPrueba,
                    user: { "role": result.data.rolId },
                },
            });



        })
        .catch(() => {
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
      logout
      
    }),
    [state.isAuthenticated, state.isInitialized, state.user, login, logout, register]
  );



  return <>   <AuthContext.Provider value={memoizedValue} >{children}</AuthContext.Provider></>;
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

