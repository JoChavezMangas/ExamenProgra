import axios from 'axios';
import {
    HOST_API_LOCAL,
    END_POINT_OBTENER_DOCUMENTO,
    HOST_API_SISTEMAS,
    END_POINT_SICAFI_ROLES,
    END_POINT_SICAFI_FRANQUICIA,
    END_POINT_BROKERS_MASTER,
    END_POINT_CREDIHIPOTECARIO_ROLES,
    END_POINT_CVELOZ_ROLES,
    END_POINT_AGENTESOC_ROLES,
    END_POINT_CVELOZ_BANCOS,
    END_POINT_CVELOZ_ANS,
    END_POINT_RESUELVEME_ROLES,
    END_POINT_RESUELVEME_DEPARMENT,
    END_POINT_RESUELVEME_COMPANY,
    END_POINT_SISEC_ROLES,
    END_POINT_SISEC_FRANCHISE,
    END_POINT_VALIDOC_OPERATION,
    END_POINT_SISEC_CREDIBAKS,
    END_POINT_SISEC_BANCOS,
    END_POINT_PASWORD_OLVIDADO,
    END_POINT_PASWORD_CAMBIAR,
    END_POINT_PASSWORD_CAMBIAR_ADMIN,
    END_POINT_TOKEN_DOCUMENTO,
    END_POINT_OBTENER_DOC_API_CONECTA,
    
} from '../config-global';
// import { HOST_API_LOCAL } from '../../config-global';

export function AxiosMandarForm(form, url, metodoOK, metodoError) {

    const urlEndPoint = HOST_API_LOCAL + url;

    const AUT = `Bearer ${localStorage.getItem('accessToken')}`
    form.append("_contextEmpleadoId", localStorage.getItem('EmpleadoId'));

    console.log("ya en el axiossss", JSON.stringify(form))

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

export function AxiosObtenerDatosExternoUsuarioCURP(url,curp, succesFunc, errorFunc) {

    const token = localStorage.getItem('tokenExterno');
    const UrlAUX = `${HOST_API_SISTEMAS}${url}?curp=${curp}`
    // const UrlAUX = `${HOST_API_SISTEMAS}${url}?curp=HUMG870418MDFRRL04`
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    // console.log('la url', UrlAUX);

    axios.post(UrlAUX, {},config)
        .then(response => {
            // console.log('este cambio debe de verse', response.data);
            succesFunc(response.data);
        })
        .catch(error => {
            console.error('Error!:', error.message);
            // errorFunc(error.message)
        });
}

export function AxiosObtenerDatosExternoUsuario(endPointURL,idEmpleado,nombreUsuario,correoUsuario,succesFunc,errorFunc) {

    const token = localStorage.getItem('tokenExterno'); 
    const UrlAUX = `${HOST_API_SISTEMAS}${endPointURL}?Id=${idEmpleado}`
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const data = {
        userId: idEmpleado,
        userName: nombreUsuario,
        email: correoUsuario
    };

    axios.post(UrlAUX, data, config)
        .then(response => {
            succesFunc(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
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

export function AxiosComboParams(endPointURL, succesFunc, valorFiltro1, valorFiltro2) {
    const urlAUX = HOST_API_LOCAL + endPointURL;
    const AUT = `Bearer ${localStorage.getItem('accessToken')}`;
    axios({ method: 'get', url: urlAUX, params: { empleadoId: valorFiltro1, sistemasActuales: valorFiltro2  }, headers: { 'Authorization': AUT } })
        .then(response => { succesFunc(response.data); })
        .catch(error => {  console.log('el error del combo', error) })
}

export function AxiosComboSistemas(endPointURL, valorFiltro, succesFunc) {

    const urlAUX = `${HOST_API_SISTEMAS}${endPointURL}?Id=a0d0d47d-536b-4520-a486-c65f4b695d4c`;
    const AUT = `Bearer ${localStorage.getItem('tokenExterno')}`
    axios({ method: 'get', url: urlAUX, params: { CompanyId: valorFiltro }, headers: { 'Authorization': AUT } })
        .then(response => {
            const arrayAux = [];
            // // console.log(arrayAux)
            switch (endPointURL) {
                case END_POINT_AGENTESOC_ROLES:
                    response.data.roles.map(item => arrayAux.push({ id: item.id, name: item.roleName }));
                    break;
                case END_POINT_BROKERS_MASTER:
                    response.data.roles.map(item => arrayAux.push({ id: item.id, name: item.roleName }));
                    break;
                case END_POINT_CVELOZ_ROLES:
                    response.data.roles.map(item => arrayAux.push({ id: item.id, name: item.roleName }));
                    break;
                case END_POINT_CVELOZ_BANCOS:
                    response.data.banks.map(item => arrayAux.push({ id: item.id, name: item.bankName }));
                    break;
                case END_POINT_CVELOZ_ANS:
                    response.data.years.map(item => arrayAux.push({ id: item.id, name: item.year }));
                    break;
                case END_POINT_CREDIHIPOTECARIO_ROLES:
                    response.data.roles.map(item => arrayAux.push({ id: item.id, name: item.roleName }));
                    break;
                case END_POINT_SISEC_CREDIBAKS:
                    response.data.banks.map(item => arrayAux.push({ id: item.id, name: item.bankName }));
                    break;
                case END_POINT_RESUELVEME_ROLES:
                    response.data.roles.map(item => arrayAux.push({ id: item.id, name: item.roleName }));
                    break;
                case END_POINT_RESUELVEME_COMPANY:
                    response.data.company.map(item => arrayAux.push({ id: item.id, name: item.companyName }));
                    break;
                case END_POINT_RESUELVEME_DEPARMENT:
                    response.data.department.map(item => arrayAux.push({ id: item.id, name: item.departmentName }));
                    break;
                case END_POINT_SICAFI_ROLES:
                    response.data.roles.map(item => arrayAux.push({ id: item.id, name: item.roleName }));
                    break;
                case END_POINT_SICAFI_FRANQUICIA:
                    response.data.franchise.map(item => arrayAux.push({ id: item.id, name: item.franchiseName }));
                    break;
                case END_POINT_SISEC_ROLES:
                    response.data.roles.map(item => arrayAux.push({ id: item.id, name: item.roleName }));
                    break;
                case END_POINT_SISEC_FRANCHISE:
                    response.data.franchise.map(item => arrayAux.push({ id: item.id, name: item.franchiseName }));
                    break;
                case END_POINT_SISEC_BANCOS:
                    response.data.banks.map(item => arrayAux.push({ id: item.id, name: item.bankName }));
                    break;
                // case END_POINT_VALIDOC_OPERATION:
                // response.data..map(item => arrayAux.push({ id: item.id, name: item.franchiseName }));
                // break;
                default:
                     console.log( response.data);
            }
            succesFunc(arrayAux);
            // // console.log('Chavos, sí está llamando combo sistemas', response.data);
            // // console.log( Array.isArray(response.data));
        })

        .catch(error => {  console.log('Error en el combo sistemas ', error) })
}

export function AxiosEliminar(url, name, metodoOK, metodoError) {
    const urlEndPoint = HOST_API_LOCAL + url;
    const empleadoActual = localStorage.getItem('EmpleadoId');
    const AUT = `Bearer ${localStorage.getItem('accessToken')}`;
    // console.log('el empeladoId', empleadoActual)
    axios({
        method: 'get',
        url: urlEndPoint,
        params: { Id: name, _contextEmpleadoId: empleadoActual },
        headers: { 'Authorization': AUT }
    })
        .then(response => {

            // console.log("se tuvo un succees")

            if (response.data) {
                metodoOK(response.data);
            } else {
                metodoError(response.data);
                // console.log("Hay un error en el axios", response.data);
            }
        })
        .catch(error => {
             console.log('el error en el axios es', error);
        });
}

export function AxiosFiltroSucces(endPointURL, valorFiltro, succesFunc) {
    const urlAUX = HOST_API_LOCAL + endPointURL;
    const AUT = `Bearer ${localStorage.getItem('accessToken')}`;
    const contextEmpleadoId = localStorage.getItem('EmpleadoId');
    axios({ method: 'get', url: urlAUX, params: { filtro: valorFiltro, _contextEmpleadoId: contextEmpleadoId }, headers: { 'Authorization': AUT } })
        .then(response => {
            succesFunc(response.data);
            // console.log('aquí está la data', response.data)
        })
        .catch(error => {  console.log('el error', error) })
}

export function AxiosActivarMulti(endPointURL, param, succesFunc) {
    const urlAUX = HOST_API_LOCAL + endPointURL;
    const AUT = `Bearer ${localStorage.getItem('accessToken')}`;
    axios({ method: 'get', url: urlAUX, params: { empleadoId: param }, headers: { 'Authorization': AUT } })
        .then(response => {
            succesFunc(response.data);
            // console.log('aquí está la data', response.data)
        })
        .catch(error => { console.log('el error', error) })
}

export function AxiosCrearMulti(endPointURL, param, succesFunc) {
    const urlAUX = HOST_API_LOCAL + endPointURL;
    const AUT = `Bearer ${localStorage.getItem('accessToken')}`;
    axios({ method: 'get', url: urlAUX, params: { Id: param }, headers: { 'Authorization': AUT } })
        .then(response => {
            succesFunc(response.data);
            // console.log('aquí está la data', response.data)
        })
        .catch(error => { console.log('el error', error) })
}

export function AxiosActualziarIdExternoCRUP(endPointURL, idEmpleado, curp, IdempleadoExterno, succesFunc,errorFunc) {
    const urlAUX = HOST_API_LOCAL + endPointURL;
    const AUT = `Bearer ${localStorage.getItem('accessToken')}`;

    console.log("pasa por aqui")

    axios({
        method: 'get',
        url: urlAUX, params: { id: idEmpleado, curpValue: curp, idExterno: IdempleadoExterno },
        headers: { 'Authorization': AUT }
    }).then(response => {

        console.log(response.data)

        if (response.data.status === "ERROR") {
            console.log("entra en el erroor")
            errorFunc(response.data.message);
        }
        else {
            console.log("entra en el else")
            succesFunc(response.data.message);
        }
            
        
    }).catch(error => { console.log('el error', error) })
}


export function AxiosCambiarPassword(usCorreo,pass ,nuevoPass ,succesFunc, errorFunc) {
    const urlEndPoint = HOST_API_LOCAL + END_POINT_PASWORD_CAMBIAR;
    const empleadoActual = localStorage.getItem('EmpleadoId')
    const AUT = `Bearer ${localStorage.getItem('accessToken')}`;
    axios.get(urlEndPoint, { params: { usuarioId: empleadoActual, usuarioCorreo: usCorreo,actualPass: pass, newPass: nuevoPass }, headers: { 'Authorization': AUT } }).
        then(response => {
            if (response.data.status === "OK")
                succesFunc(response.data.status);
            else
                errorFunc("Error");
        }).
        catch(error => {  console.log('el error', error) });
}

export function AxiosCambiarPasswordAdmin(usCorreo, nuevoPass ,succesFunc, errorFunc) {
    const urlEndPoint = HOST_API_LOCAL + END_POINT_PASSWORD_CAMBIAR_ADMIN;
    const empleadoActual = localStorage.getItem('EmpleadoId')
    const AUT = `Bearer ${localStorage.getItem('accessToken')}`;
    axios.get(urlEndPoint, { params: { usuarioId: empleadoActual, usuarioCorreo: usCorreo, newPass: nuevoPass }, headers: { 'Authorization': AUT } }).
        then(response => {
            if (response.data.status === "OK")
                succesFunc(response.data.status);
            else
                errorFunc("Error");
        }).
        catch(error => {  console.log('el error', error) });
}

export function AxiosPasswordOlvidado(usuarioId,succesFunc,errorFunc) {
    const urlEndPoint = HOST_API_LOCAL + END_POINT_PASWORD_OLVIDADO;
    axios.get(urlEndPoint, { params: { usuario: usuarioId } }).
        then(response => {
            // // console.log('el respuesta', response.data.status)
            if (response.data.status === "OK") 
                succesFunc(response.data.status);
            else 
                errorFunc("Error");
        }).
        catch(error => {  console.log('el error', error) });
}

export async function GuardarDocEnDom(IdDoc, succesFunc, openFunc, metodoPdf) {


    // console.log('eso es el cambio visible que quieres', IdDoc)

    const token = localStorage.getItem('accessToken');
    // const token = await GetTokenDoc()
    // const token = "2IcNYNAKhDd7x-_qocdYfU57b1vKlrvb81att4K_Zp1LNE2-1-EGEJzsuaLwTlC8RGwUMTwbVbNJwcTckZZ-yLOioQxPYfno9TZmje5kGOJfTcMHCtaFUJiUAktfCsSMxjRwbBhMdUsuKQFwqgWu6IfAhdClulWBC7RuGMfBR2IkngIWS5gyG3OOwA1YTh3CdH_7tYdokJPnjDwjm9T6MaDZqiFZFZfw9IwP9Jc9LYuYFxjoOC6bkK2aOg3cpetCwBbAL4QTODDaOdMVZqwc5eN6REbeEH2MeEdMrzAwp_UC6pdtKwsy2Wdzq65YpUPn";
    const urlEndPoint = HOST_API_LOCAL + END_POINT_OBTENER_DOC_API_CONECTA; // "https://localhost:7285/api/ComunAuxiliares/Documentos2"; // END_POINT_OBTENER_DOCUMENTO + IdDoc;
    console.log("el token?", token)
    const AUT = `Bearer ${token}`
    axios.get(urlEndPoint,
        {
            params: { documentId: IdDoc },
            headers: { 'Authorization': AUT },
        }).then(response => {

            console.log("el response", response);

            const tipoArchivo = response.data.fileName.split('.').pop();
            // validar que sea un pdf
            if (tipoArchivo === "pdf")
                metodoPdf(true)
            else
                metodoPdf(false)

            succesFunc(response.data.file)
            openFunc(true);
        }).catch(error => {  console.log('el error', error) });
}

const GetTokenDoc = async () => {

    // const instance = axios.create({
    //    baseURL: 'http://servidor-externo.com',
    //    headers: {
    //        'Content-Type': 'application/json',
    //    },
    // });



    const bodyParam = { grant_type: "password", password: "user", username: "user" }


    try {
        const response0 = await axios({
            method: 'post',
            url: END_POINT_TOKEN_DOCUMENTO,
            data: bodyParam,
            timeout: 0,
            headers: { "Content-Type": "multipart/form-data" }
        }).then(response => { console.log(response) }).catch(console.log('fallo 0 multipart/form-data'));
    } catch (error) {
        console.error('Ocurrió un error en alguna de las solicitudes:', error);
    }

    try {
        const response1 = await axios({
            method: 'post',
            url: END_POINT_TOKEN_DOCUMENTO,
            data: bodyParam,
            timeout: 0,
            headers: { "Content-Type": "text/plain" }
        }).then(response => { console.log(response) }).catch(console.log('fallo 1 text/plain'));
    } catch (error) {
        console.error('Ocurrió un error en alguna de las solicitudes:', error);
    }

    const response = await axios({
        method: 'post',
        url: END_POINT_TOKEN_DOCUMENTO,
        data: bodyParam,
        timeout: 0,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }).catch(console.log('fallo el original, application/x-www-form-urlencoded'));;

    console.log("la bandera que estoy buscando",response.data)

    return response.data.access_token;
}


export function AxiosIdSucces(IdParam, url, succesAxiosFunc) {
    const urlEndPoint = HOST_API_LOCAL + url;
    const AUT = `Bearer ${localStorage.getItem('accessToken')}`;
    axios({
        method: 'get',
        url: urlEndPoint,
        params: { Id: IdParam },
        headers: { 'Authorization': AUT }
    }).then(response => {
        // console.log('algo para reconocer el response', response.data)
        succesAxiosFunc(response.data)
    })

}

