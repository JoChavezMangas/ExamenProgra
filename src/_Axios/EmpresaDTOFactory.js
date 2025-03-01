import axios from 'axios';
import { HOST_API_LOCAL, END_POINT_OBTENER_EMPRESA } from '../config-global';

export async function ObtenerEmpresaPorId(IdCompany, setFunc) {

    const urlEndPoint = HOST_API_LOCAL + END_POINT_OBTENER_EMPRESA;
    const AUT = `Bearer ${localStorage.getItem('accessToken')}`
    return(
            axios({
                    method: 'get',
                    url: urlEndPoint,
                    params: { Id: IdCompany },
                    // accept: 'application/json',
                    // contentType: false,
                    // procesData: false,
                headers: { 'Authorization': AUT }
            }).then(response => {
                console.log('este es el response de axios', response.data)
                // result = response.data
                setFunc(response.data)
            }).catch(() => {
                // result = "Error";
            })
    )
    // return result;
}


export async function ObtenerDatosTableros(IdCompany, setFunc) {

    const urlEndPoint = HOST_API_LOCAL + END_POINT_OBTENER_EMPRESA;
    const AUT = `Bearer ${localStorage.getItem('accessToken')}`
    return (
        axios({
            method: 'get',
            url: urlEndPoint,
            params: { Id: IdCompany },
            headers: { 'Authorization': AUT }
        }).then(response => {
            console.log('este es el response de axios', response.data)
            // result = response.data
            setFunc(response.data)
        }).catch(() => {
            // result = "Error";
        })
    )
    // return result;
}


