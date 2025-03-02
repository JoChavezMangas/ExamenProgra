import axios from 'axios';
import {
    HOST_API_LOCAL    
} from '../config-global';

export function AxiosMandarForm(form, url, metodoOK, metodoError) {

    const urlEndPoint = HOST_API_LOCAL + url;

    const AUT = `Bearer ${localStorage.getItem('accessToken')}`
    form.append("_contextEmpleadoId", localStorage.getItem('EmpleadoId'));

    axios({
        method: 'post',
        url: urlEndPoint,
        data: form,
        headers: { 'Authorization': AUT }
    }).then(response => {
        console.log(response)
        // console.log("en el metodo",response.data.status)
        if (response.data === "OK" || response.data.status === "OK" ) {

            if (response.data.message)
                metodoOK(response.data.message)
            else if (response.data === "OK")
                metodoOK(response.data)
            else if (response.data.status === "OK")
                metodoOK(response.data.status)
        } else if (response.data.status === "ARRAY") {
            // console.log('el array', response.data.array)
            metodoOK(response.data.array)
        }
        else
        {
            console.log("*****", response.data)
            if (response.data.status === "ERROR")
                metodoError(response.data.message)
            if (response.data.message)
                metodoError(response.data.message)
            else if (response.data.status)
                metodoError(response.data.status)
            
        }

    }).catch(resp => {
        console.log("el error",     );
        metodoError(resp.message)
    });

}

export function AxiosBandejaGenerica(url, succeseFunc, filter_Value, operator_Value, column_Field, paramaAUX) {

    const urlEndPoint = HOST_API_LOCAL + url;
    const AUT = `Bearer ${localStorage.getItem('accessToken')}`
    const empleadoActual = localStorage.getItem('EmpleadoId');
    const filter = filter_Value!== null ? filter_Value : " ";
    const operator = operator_Value !== null ? operator_Value : " ";
    const colum = column_Field !== null ? column_Field : " ";
    axios.get(urlEndPoint,
        {
            params: { filterValue0: filter, operatorValue0: operator, columnField0: colum, EmpleadoActual: empleadoActual, genericParam: paramaAUX },
            headers: { 'Authorization': AUT },
            // data: { FilterValue: filterValue0, operatorValue: operatorValue0, columnField: columnField0 }
        }).then(response => {
            succeseFunc(response.data)
        });
}  

export function AxiosCombo(endPointURL, valorFiltro, succesFunc) {
    const urlAUX = HOST_API_LOCAL + endPointURL;
    const AUT = `Bearer ${localStorage.getItem('accessToken')}`;

    // const paraLetrero = `estoe s lo que trajeron ${endPointURL}`

    axios({ method: 'get', url: urlAUX, params: { filtro: valorFiltro }, headers: { 'Authorization': AUT } })
        .then(response => {
            // // console.log(paraLetrero,response.data)
            succesFunc(response.data);
        })
        .catch(error => { console.log('el error del combo', error) })
}




