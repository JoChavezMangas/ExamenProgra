import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, Stack, TextField, Typography, Divider, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';


import { useSnackbar } from '../../components/snackbar';
import FormProvider, {
    RHFSelect,
    RHFTextField,
    RHFRadioGroup,
    RHFUploadPhoto,
    RHFMultiSelect,

} from '../../components/hook-form';
import {
    END_POINT_OBTENER_VALOR_ALTENO_CATALOGO_ID,
    END_POINT_BROKERS_MASTER,
    END_POINT_CREDIHIPOTECARIO_ROLES,
    END_POINT_SICAFI_ROLES,
    END_POINT_SISEC_ROLES,
    END_POINT_SICAFI_FRANQUICIA,
    END_POINT_CVELOZ_ROLES,
    END_POINT_AGENTESOC_ROLES,
    END_POINT_CVELOZ_BANCOS,
    END_POINT_CVELOZ_ANS,
    END_POINT_RESUELVEME_ROLES,
    END_POINT_RESUELVEME_COMPANY,
    END_POINT_RESUELVEME_DEPARMENT,
    END_POINT_SISEC_FRANCHISE,
    END_POINT_VALIDOC_OPERATION,
    END_POINT_VALIDOC_ROLES,
    END_POINT_VALIDOC_SUPERVISOR,
    END_POINT_MANDAR_OTROSISTEMA,
    END_POINT_OBTENER_OTROS_SISTEMAS,
    END_POINT_SISEC_CREDIBAKS,
    END_POINT_SISEC_BANCOS,
    END_POINT_BANDEJAEMPLEADOS,
    END_POINT_OBTENER_EMPLEADO,
    END_POINT_COMBO_POSIBLESJEFES
} from '../../config-global';

// import GenericCombo from '../../../utils/GenericCombo';
import {
    AxiosMandarForm,
    AxiosCombo,
    AxiosComboSistemas,
    AxiosComboParams,
    AxiosObtenerDatosExternoUsuario,
    AxiosObtenerDatosExternoUsuarioCURP
} from '../../_Axios/AxiosFomr';
import GenericEnhancedTransferList from '../../utils/GenericEnhancedTransferList';
import GenericComboAPI from '../../utils/GenericComboAPI';
import GenericComboSelect from '../../utils/GenericComboSelect';
// import FormProvider from '../../components/hook-form';


ModalOtroSistema.prototype = {
    openModal: PropTypes.bool,
    openFunc: PropTypes.func,
    openLoading: PropTypes.bool,
    empleadoId: PropTypes.string,
    empleadoIdExterno: PropTypes.string,
    nombre: PropTypes.string,
    isEdit: PropTypes.bool,
    curp: PropTypes.string,
};

export default function ModalOtroSistema({ openModal, openFunc, openLoading, empleadoId, nombre, isEdit, empleadoIdExterno,curp }) {




    // Constantes para tener el los las empresas a la derecha o izquierda
    const [leftArray, setLeftArray] = useState([]);
    const [rightArray, setRightArray] = useState([]);

    // Constantes para modal de loading y mantener abierto
    const [isLoading, setIsLoading] = useState(openLoading);
    const [isLoadingBTN, setIsLoadingBTN] = useState(openLoading);
    const [open, setOpen] = useState(openModal);

    // constantes para usar el fomr y el metodo submit
    const handleClickOpen = () => {
        setOpen(true);
        openFunc(true)
    };
    const handleClose = () => {
        setOpen(false);
        openFunc(false)
    };
    const methods = useForm({
        // setValue
    });
    const {
        handleSubmit,
    } = methods;

    // constante para generar letreo de OK
    const { enqueueSnackbar } = useSnackbar();

    // metodo de submit
    const onSubmit = async (data) => {

        setIsLoadingBTN(true);

        const form = new FormData();
        const sistemasArray = [];
        rightArray.forEach((element) => { sistemasArray.push(element.id) })

        form.append('sistemas', sistemasArray);
        form.append('id', empleadoId);
        form.append('agenteRoles', agenteRoles);
        form.append('brokerRoles', brokerRoles);
        form.append('validocOperacion', validocOperacion);
        form.append('validocRoles', validocRoles);
        form.append('validocSupervisor', validocSupervisor);
        form.append('crediBancos', crediBancos);
        form.append('crediRoles', crediRoles);
        form.append('cvelozRoles', cvelozRoles);
        form.append('cvelozBancos', cvelozBancosArray);
        form.append('cvelozAnios', cvelozAniosArray);
        form.append('resuelveEmpresa', resuelveEmpresa);
        form.append('resuleveDepartameto', resuleveDepartameto);
        form.append('resuelveRoles', resuelveRoles);
        form.append('sicafiRoles', sicafiRoles);
        form.append('sicafiFranquicia', sicafiFrancArray);
        form.append('sisecRoles', sisecRoles === "" ? '00000000-0000-0000-0000-000000000000' : sisecRoles);
        form.append('sisecFranquicia', sisecFrancArray.join());

       

        // console.log('los sistemas',sistemasArray)

        const pass = submitPass(sistemasArray)
        

        // console.log("los sistemas",sistemasArray)

        // AxiosMandarForm(form, END_POINT_MANDAR_OTROSISTEMA, succesfunc, errorfunc);

        if (pass) 
            AxiosMandarForm(form, END_POINT_MANDAR_OTROSISTEMA, succesfunc, errorfunc);
        else if ((sistemasArray.indexOf("#AgenteSOC") > -1) && !(sistemasArray.indexOf("#Sisec") > -1)) 
            enqueueSnackbar("Los empleados registrados en Agente SOC deben de estar registrados tambien en SISEC", { variant: "error" });       
        else
            enqueueSnackbar("por favor ingresa todo los datos del formulario", { variant: "error" });


        setIsLoadingBTN(false);
    }

    // validacion para submit
    const submitPass = (sistemasArray) =>{

        let pass = true;

        if (sistemasArray.indexOf("#Resuelveme") > -1) {

            // console.log('para ver', resuelveEmpresa, resuleveDepartameto, resuelveRoles )

            if (resuelveEmpresa === "00000000-0000-0000-0000-000000000000" || resuelveEmpresa === "") {
                seterrorResuelvemeEmpresa(true);
                pass = false;
            } else 
                seterrorResuelvemeEmpresa(false);

            if (resuleveDepartameto === "00000000-0000-0000-0000-000000000000" || resuleveDepartameto === "") {
                seterrorResuelvemeDepartameto(true);
                pass = false;
            } else
                seterrorResuelvemeDepartameto(false);

            if (resuelveRoles === "00000000-0000-0000-0000-000000000000" || resuelveRoles === "") {
                seterrorResuelvemeRoles(true);
                pass = false;
            } else
                seterrorResuelvemeRoles(false);
        }

        if (sistemasArray.indexOf("#Sisec") > -1) {

            if (sisecRoles === "00000000-0000-0000-0000-000000000000" || sisecRoles === "") {
                seterrorSISECRoles(true);
                pass = false;
            } else 
                seterrorSISECRoles(false);

            console.log('sisecFrancArray', sisecFrancArray.length, sisecFrancArray.length < 1)

            if (sisecFrancArray.length < 1) {
                seterrorSISECFranchice(true);
                pass = false;
            } else
                seterrorSISECFranchice(false);
            
        }

        if (sistemasArray.indexOf("#AgenteSOC") > -1) {

            // console.log('deberia ser false', !(sistemasArray.indexOf("#Sisec") > -1))

            // console.log('el rol del agente',agenteRoles)

            if (agenteRoles<1) {
                seterrorAgenteRol(true);
                pass = false;
            } else
                seterrorAgenteRol(false);

            if (!(sistemasArray.indexOf("#Sisec") > -1))
                pass=false;
        }

        if (sistemasArray.indexOf("#Sicafi") > -1) {

            if (sicafiRoles === "00000000-0000-0000-0000-000000000000" || sicafiRoles==="") {
                seterrorSicafiRol(true);
                pass = false;
            } else
                seterrorSicafiRol(false)
            
            if (sicafiRoles === "f23c8506-87f3-4b6b-aa90-648776c18f90" ||
                sicafiRoles === "c12641d0-4bff-436d-81d1-9106eb5fec72" ||
                sicafiRoles === "97b60ef3-f531-4f86-93f0-7a91c9505bb7") {

                if (sicafiFrancArray.length < 1) {
                    seterrorSicafiFranchice(true);
                    pass = false;
                } else
                    seterrorSicafiFranchice(false);

            }

        }

        if (sistemasArray.indexOf("#CVeloz") > -1) {

            if (cvelozRoles === "00000000-0000-0000-0000-000000000000" || sicafiRoles ==="") {
                seterrorCvelozRol(true);
                pass = false;
            } else
                seterrorCvelozRol(false);

            if (cvelozRoles === "ffbd1415-bf3d-49b5-815d-7977183e7921") {
                if (cvelozBancosArray.length < 1) {
                    seterrorCvelozBancos(true);
                    pass = false;
                } else
                    seterrorCvelozBancos(false);

                if (cvelozAniosArray.length < 1) {
                    seterrorCvelozAnios(true);
                    pass = false;
                } else
                    seterrorCvelozAnios(false);
            }

        }

        if (sistemasArray.indexOf("#BrokersMaster") > -1) {

            if (brokerRoles === "00000000-0000-0000-0000-000000000000" || brokerRoles === "") {
                seterrorbrokerRoles(true);
                pass = false;
            } else
                seterrorbrokerRoles(false);
        }

        // No tenemos catalogo para validoc
        if (sistemasArray.indexOf("#Validoc") > -1) {
            if (validocRoles === "00000000-0000-0000-0000-000000000000") {
                seterrorSISECRoles(true);
                pass = false;
            }
        }

        if (sistemasArray.indexOf("#CrediHipotecario") > -1) {

            if (crediBancos === "00000000-0000-0000-0000-000000000000" || crediBancos === "") {
                seterrorcrediBancos(true);
                pass = false;
            } else
                seterrorcrediBancos(false)

            if (crediRoles === "00000000-0000-0000-0000-000000000000" || crediRoles === "") {
                seterrorcrediRoles(true);
                pass = false;
            } else
                seterrorcrediRoles(false)
        }

        if (!pass)
            setIsLoadingBTN(false);

        return pass;

    }

    // constantes de error 
    const [errorResuelvemeEmpresa, seterrorResuelvemeEmpresa] = useState(false);
    const [errorResuelvemeDepartameto, seterrorResuelvemeDepartameto] = useState(false);
    const [errorResuelvemeRoles, seterrorResuelvemeRoles] = useState(false);
    const [errorSISECRoles, seterrorSISECRoles] = useState(false);
    const [errorSISECFranchice, seterrorSISECFranchice] = useState(false);
    const [errorAgenteRol, seterrorAgenteRol] = useState(false);
    const [errorSicafiRol, seterrorSicafiRol] = useState(false);
    const [errorSicafiFranchice, seterrorSicafiFranchice] = useState(false);
    const [errorCvelozRol, seterrorCvelozRol] = useState(false);
    const [errorCvelozBancos, seterrorCvelozBancos] = useState(false);
    const [errorCvelozAnios, seterrorCvelozAnios] = useState(false);
    const [errorbrokerRoles, seterrorbrokerRoles] = useState(false);
    const [errorcrediBancos, seterrorcrediBancos] = useState(false);
    const [errorcrediRoles, seterrorcrediRoles] = useState(false);
    
     



    // metodo para ok del submit
    const succesfunc = (param) => {
        // enqueueSnackbar(param);
        // console.log("aqui debe de haber array",param)
         setIsLoadingBTN(false);
         param.forEach(obj => {
            enqueueSnackbar(obj[0], { variant: obj[1] });
         });

        
        // enqueueSnackbar(param);
    }

    const errorfunc = (param) => {
        setIsLoadingBTN(false);
        enqueueSnackbar(param, { variant: 'error' });
    }


    // valores por default
    const [agenteRoles, setagenteRoles] = useState(0);
    const [brokerRoles, setbrokerRoles] = useState('00000000-0000-0000-0000-000000000000');
    const [cvelozRoles, setcvelozRoles] = useState('00000000-0000-0000-0000-000000000000');
    const [crediBancos, setcrediBancos] = useState('00000000-0000-0000-0000-000000000000');
    const [crediRoles, setcrediRoles] = useState('00000000-0000-0000-0000-000000000000');
    const [resuelveEmpresa, setresuelveEmpresa] = useState('00000000-0000-0000-0000-000000000000');
    const [resuleveDepartameto, setresuleveDepartameto] = useState('00000000-0000-0000-0000-000000000000');
    const [resuelveRoles, setresuelveRoles] = useState('00000000-0000-0000-0000-000000000000');
    const [sicafiRoles, setsicafiRoles] = useState('00000000-0000-0000-0000-000000000000');
    const [sisecRoles, setsisecRoles] = useState('00000000-0000-0000-0000-000000000000');
    const [validocOperacion, setvalidocOperacion] = useState('00000000-0000-0000-0000-000000000000');
    const [validocRoles, setvalidocRoles] = useState('00000000-0000-0000-0000-000000000000');
    const [validocSupervisor, setvalidocSupervisor] = useState('00000000-0000-0000-0000-000000000000');
    const [cvelozAniosArray, setCvelozAniosArray] = useState([]);
    const [cvelozBancosArray, setCvelozBancosArray] = useState([]);
    const [sicafiFrancArray, setSicafiFrancArray] = useState([]);
    const [sisecFrancArray, setSisecFrancArray] = useState([]);



    const [testigoSoloUnaVes, setTestigo] = useState(0);
    const rightArrayAUX = rightArray;


    // Primer use efect 1.-
    // UseEffect para llenar combos de sistemas seleccionados (a la derecha o a la izquierda)
    useEffect(() => {
        if (isEdit && empleadoId !== 0) {

            AxiosComboParams(END_POINT_OBTENER_OTROS_SISTEMAS, setLeftArray, empleadoId, false);
            AxiosComboParams(END_POINT_OBTENER_OTROS_SISTEMAS, setRightArray, empleadoId, true);

        } else {
            AxiosCombo(END_POINT_OBTENER_VALOR_ALTENO_CATALOGO_ID, 'Sistema', setLeftArray);
        }
    }, [isEdit, empleadoId, empleadoIdExterno])

    // Segundo efect 2.-
    // UseEffect para mostrar combos de un inicio
    useEffect(() => {
        funcionEspecial(rightArray)
        // console.log('pasa por aqui')
    }, [rightArray])
    
    

    const CorreoEmpleado = "correo@comrre.com"

    // Tercer efect 3.-
    useEffect(() => {

        // console.log('la curp',curp)

        if (rightArray.length > 0 && testigoSoloUnaVes <= 0) {

             if (rightArray.find(objeto => objeto.id === "#Validoc"))
                AxiosObtenerDatosExternoUsuarioCURP("api/Validoc/GetUserData", curp, succesValidoc, () => { });
             if (rightArray.find(objeto => objeto.id === "#AgenteSOC"))
                AxiosObtenerDatosExternoUsuarioCURP("api/AgenteSoc/GetUserData", curp, succesAgenteSoc, () => { });
             if (rightArray.find(objeto => objeto.id === "#BrokersMaster"))
                AxiosObtenerDatosExternoUsuarioCURP("api/BrokerMaster/GetUserData", curp, succesBrokerMaster, () => { });
             if (rightArray.find(objeto => objeto.id === "#CrediHipotecario"))
                AxiosObtenerDatosExternoUsuarioCURP("api/CREDIHIPOTECARIO/GetUserData", curp, succesCREDIHIPOTECARIO, () => { });
             if (rightArray.find(objeto => objeto.id === "#Sicafi"))
                AxiosObtenerDatosExternoUsuarioCURP("api/SICAFI/GetUserData", curp, succesSICAFI, () => { });
             if (rightArray.find(objeto => objeto.id === "#Sisec"))
                AxiosObtenerDatosExternoUsuarioCURP("api/SISEC/GetUserData", curp, succesSISEC, () => { });
             if (rightArray.find(objeto => objeto.id === "#CVeloz"))
                 AxiosObtenerDatosExternoUsuario("api/CapturaVeloz/GetUserData", empleadoIdExterno, nombre, CorreoEmpleado, succesCapturaVeloz, () => { });
             if (rightArray.find(objeto => objeto.id === "#Resuelveme"))
                AxiosObtenerDatosExternoUsuario("api/Resuelveme/GetUserData", empleadoIdExterno, nombre, CorreoEmpleado, succesResuelveme, () => { });

            setTestigo(1)
        }

        // console.log('el array derecho',rightArray)

    }, [rightArray, empleadoIdExterno, testigoSoloUnaVes, nombre, curp])
    // useEffect para mostrar el modal
    useEffect(() => {
        setOpen(openModal)
        openFunc(openModal)
    }, [openModal, openFunc])
    // useEffect para colocar o quitar la vista de loading
    useEffect(() => {
        setIsLoading(openLoading)
    }, [openLoading])




    // Metodos de succes de los axios
    const succesAgenteSoc = (param) => { setagenteRoles(param.roleId) }
    const succesBrokerMaster = (param) => { setbrokerRoles(param.roleID) }
    const succesValidoc = (param) => {
        setvalidocRoles(param.roleId)
        setvalidocSupervisor(param.roleId)
        setvalidocOperacion(param.roleId)
    }
    const succesCapturaVeloz = (param) => {
        setcvelozRoles(param.roleId);
        setCvelozAniosArray(param.years);
        setCvelozBancosArray(param.banks);
    }
    const succesCREDIHIPOTECARIO = (param) => {
        setcrediRoles(param.roleId);
        setcrediBancos(param.bankId);
    }
    const succesResuelveme = (param) => {
        setresuelveRoles(param.roleId)
        setresuelveEmpresa(param.companyId)
        setResuelveDepartamentoCombo(param.companyId)
        setresuleveDepartameto(param.departmentId)
    }
    const succesSICAFI = (param) => {
        setsicafiRoles(param.roleId)
        setSicafiFrancArray(param.franchise)
    }
    const succesSISEC = (param) => {
        setsisecRoles(param.roleId)
        setSisecFrancArray(param.franchise)
    }
    





    // constantes para mostrar combos
    const [mostrarAgenteSoc, setMostrarAgenteSoc] = useState(false);
    const [mostrarBrokerMaster, setMostrarBrokerMaster] = useState(false);
    const [mostrarCVeloz, setMostrarCVeloz] = useState(false);
    const [mostrarCrediHipotecario, setMostrarCrediHipotecario] = useState(false);
    const [mostrarResuelveme, setMostrarResuelveme] = useState(false);
    const [mostrarSicafi, setMostrarSicafi] = useState(false);
    const [mostrarSisec, setMostrarSisec] = useState(false);
    const [mostrarValidoc, setMostrarValidoc] = useState(false);


    const [resuelveDepartamentoCombo, setResuelveDepartamentoCombo] = useState("");
    const changeFuncEmpresaRes = (param) => {
        setResuelveDepartamentoCombo(param);
        setresuelveEmpresa(param)
    }

    // Catalogo de sistemas
    const someParam = [
        { id: "#AgenteSOC" },
        { id: "#BrokersMaster" },
        { id: "#CVeloz" },
        { id: "#CrediHipotecario" },
        { id: "#Resuelveme" },
        { id: "#Sicafi" },
        { id: "#Sisec" },
        { id: "#Validoc" }
    ];

    // Metodo para mostrar/esconder combos de sistemas
    const funcionEspecial = (value) => {
        const arrayId = value.map(obj => obj.id);
        if (arrayId.includes("#AgenteSOC"))
            setMostrarAgenteSoc(true)
        else
            setMostrarAgenteSoc(false)

        if (arrayId.includes("#BrokersMaster"))
            setMostrarBrokerMaster(true)
        else
            setMostrarBrokerMaster(false)


        if (arrayId.includes("#CVeloz"))
            setMostrarCVeloz(true)
        else
            setMostrarCVeloz(false)

        if (arrayId.includes("#CrediHipotecario"))
            setMostrarCrediHipotecario(true)
        else
            setMostrarCrediHipotecario(false)

        if (arrayId.includes("#Resuelveme"))
            setMostrarResuelveme(true)
        else
            setMostrarResuelveme(false)

        if (arrayId.includes("#Sicafi"))
            setMostrarSicafi(true)
        else
            setMostrarSicafi(false)

        if (arrayId.includes("#Sisec"))
            setMostrarSisec(true)
        else
            setMostrarSisec(false)

        if (arrayId.includes("#Validoc"))
            setMostrarValidoc(true)
        else
            setMostrarValidoc(false)

    }


    return (

        <Dialog open={open} onClose={handleClose}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
                {/* Aqu� est� el circular progress para el loading */}
                {isLoading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" p={4}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <DialogTitle color='primary' >Sistemas en los que aparecerá {nombre}</DialogTitle>
                        <DialogContent >
                            <GenericEnhancedTransferList
                                right={rightArray}
                                setRight={setRightArray}
                                left={leftArray}
                                setLeft={setLeftArray}
                                valoresEspeciales={someParam}
                                funcionEspecial={funcionEspecial}
                            />
                            {mostrarAgenteSoc ?
                                <>
                                    <Box sx={{ border: 1, padding: 1, borderRadius: 2, marginBottom: 2, marginTop: 2 }}>
                                        <DialogTitle sx={{ p: 1, }} variant='h6' color='primary'>Datos para Agentes SOC</DialogTitle>
                                        <Grid container spacing={1}>

                                            <Grid item xs={6}>
                                                <GenericComboAPI
                                                        endPointURL={END_POINT_AGENTESOC_ROLES}
                                                        nameAUX="agenteRoles"
                                                        label="Roles Agente SOC"
                                                        placeholder="Roles Agente SOC"
                                                        valorFiltro="EstadoCivil"
                                                        valorDefault={agenteRoles}
                                                        onChangeFunc={setagenteRoles}
                                                        error={errorAgenteRol}
                                                 />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </>
                                :
                                null
                            }

                            {mostrarBrokerMaster ?
                                <>
                                    <Box sx={{ border: 1, padding: 1, borderRadius: 2, marginBottom: 2, marginTop: 2 }}>
                                        <DialogTitle sx={{ p: 1, }} variant='h6' color='primary'>Datos para Brokers Master</DialogTitle>
                                        <Grid container spacing={1}>

                                            <Grid item xs={6}>
                                                <GenericComboAPI
                                                        endPointURL={END_POINT_BROKERS_MASTER}
                                                        nameAUX="brokerRoles"
                                                        label="Roles Brokers Master"
                                                        placeholder="Roles Brokers Master"
                                                        valorDefault={brokerRoles}
                                                        onChangeFunc={setbrokerRoles}
                                                        error={errorbrokerRoles}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </>
                                :
                                null
                            }

                            {mostrarCVeloz ?
                                <Box sx={{ border: 1, padding: 1, borderRadius: 2, marginBottom: 2, marginTop: 2 }}>
                                    <DialogTitle sx={{ p: 1, }} variant='h6' color='primary'>Datos para Captura Veloz</DialogTitle>
                                    <Grid container spacing={1}>

                                        <Grid item xs={6}>
                                            <GenericComboAPI
                                                    endPointURL={END_POINT_CVELOZ_ROLES}
                                                    nameAUX="cvelozRoles"
                                                    label="Roles Captura Veloz"
                                                    placeholder='Roles captura veloz'
                                                    valorDefault={cvelozRoles}
                                                    onChangeFunc={setcvelozRoles}
                                                    error={errorCvelozRol}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <GenericComboSelect
                                                    endPointURL={END_POINT_CVELOZ_BANCOS}
                                                    nameAUX="cvelozBancos"
                                                    label="Bancos"
                                                    placeholder="Bancos"
                                                    actualizarArray={setCvelozBancosArray}
                                                    valorDefault={cvelozBancosArray}
                                                    errorColor={errorCvelozBancos}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <GenericComboSelect
                                                endPointURL={END_POINT_CVELOZ_ANS}
                                                nameAUX="cvelozAnios"
                                                label="Años"
                                                placeholder="Años"
                                                    actualizarArray={setCvelozAniosArray}
                                                    valorDefault={cvelozAniosArray}
                                                    errorColor={errorCvelozAnios}
                                            />

                                        </Grid>
                                    </Grid>
                                </Box>
                                : null
                            }

                            {mostrarCrediHipotecario ?
                                <Box sx={{ border: 1, padding: 1, borderRadius: 2, marginBottom: 2, marginTop: 2 }}>
                                    <DialogTitle sx={{ p: 1, }} variant='h6' color='primary'>Datos para CrediHipotecario</DialogTitle>
                                    <Grid container spacing={1}>

                                        <Grid item xs={6}>
                                            <GenericComboAPI
                                                    endPointURL={END_POINT_CREDIHIPOTECARIO_ROLES}
                                                    nameAUX="crediRoles"
                                                    label="Roles Credihipotecario"
                                                    placeholder="Roles Credihipotecario"
                                                    valorDefault={crediRoles}
                                                    onChangeFunc={setcrediRoles}
                                                    error={errorcrediRoles}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <GenericComboAPI
                                                endPointURL={END_POINT_SISEC_CREDIBAKS}
                                                nameAUX="crediBancos"
                                                label="Bancos Credihipotecario"
                                                placeholder="Bancos Credihipotecario"
                                                    valorDefault={crediBancos}
                                                    onChangeFunc={setcrediBancos}
                                                    error={errorcrediBancos}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                                : null
                            }


                            {mostrarResuelveme ?
                                <Box sx={{ border: 1, padding: 1, borderRadius: 2, marginBottom: 2, marginTop: 2 }}>
                                    <DialogTitle sx={{ p: 1, }} variant='h6' color='primary'>Datos para Resuelveme</DialogTitle>
                                    <Grid container spacing={1}>

                                        <Grid item xs={6}>
                                            <GenericComboAPI
                                                endPointURL={END_POINT_RESUELVEME_COMPANY}
                                                nameAUX="resuelveEmpresa"
                                                label="Empresa Resuelveme"
                                                placeholder="Empresa Resuelveme"
                                                useChange
                                                valorFiltro={resuelveEmpresa}
                                                valorDefault={resuelveEmpresa}
                                                onChangeFunc={changeFuncEmpresaRes}
                                                error={errorResuelvemeEmpresa}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <GenericComboAPI
                                                endPointURL={END_POINT_RESUELVEME_DEPARMENT}
                                                nameAUX="resuelveDepartamento"
                                                label="Departamento"
                                                placeholder="Departamento"
                                                valorFiltro={resuelveDepartamentoCombo}
                                                valorDefault={resuleveDepartameto}
                                                onChangeFunc={setresuleveDepartameto}
                                                    error={errorResuelvemeDepartameto}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <GenericComboAPI
                                                endPointURL={END_POINT_RESUELVEME_ROLES}
                                                nameAUX="resuelveRoles"
                                                label="Roles Resuelveme"
                                                placeholder="Roles Resuelveme"
                                                valorDefault={resuelveRoles}
                                                    onChangeFunc={setresuelveRoles}
                                                    error={errorResuelvemeRoles}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                                : null
                            }

                            {mostrarSicafi ?
                                <>
                                    <Box sx={{ border: 1, padding: 1, borderRadius: 2, marginBottom: 2, marginTop: 2 }}>
                                        <DialogTitle sx={{ p: 1, }} variant='h6' color='primary'>Datos para Sicafi</DialogTitle>
                                        <Grid container spacing={1}>

                                            <Grid item xs={6}>
                                                <GenericComboAPI
                                                        endPointURL={END_POINT_SICAFI_ROLES}
                                                        nameAUX="sicafiRoles"
                                                        label="Roles SICAFI"
                                                        placeholder="Roles SICAFI"
                                                        valorFiltro="EstadoCivil"
                                                        valorDefault={sicafiRoles}
                                                        onChangeFunc={setsicafiRoles}
                                                        error={errorSicafiRol}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <GenericComboSelect
                                                        endPointURL={END_POINT_SICAFI_FRANQUICIA}
                                                        nameAUX="sicafiFranquicia"
                                                        label="Franquicia"
                                                        placeholder="Franquicia"
                                                        actualizarArray={setSicafiFrancArray}
                                                        valorDefault={sicafiFrancArray}
                                                        errorColor={errorSicafiFranchice}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </>
                                :
                                null
                            }

                            {mostrarSisec ?
                                <>
                                    <Box sx={{ border: 1, padding: 1, borderRadius: 2, marginBottom: 2, marginTop: 2 }}>
                                        <DialogTitle sx={{ p: 1, }} variant='h6' color='primary'>Datos para Sisec</DialogTitle>
                                        <Grid container spacing={1}>

                                            <Grid item xs={6}>
                                                <GenericComboAPI
                                                    endPointURL={END_POINT_SISEC_ROLES}
                                                    nameAUX="sisecRoles"
                                                    label="Roles SISEC"
                                                    placeholder="Roles SISEC"
                                                    valorFiltro="Roles"
                                                    valorDefault={sisecRoles}
                                                        onChangeFunc={setsisecRoles}
                                                        error={errorSISECRoles}
                                                />
                                            </Grid>

                                            <Grid item xs={6}>
                                                <GenericComboSelect
                                                        endPointURL={END_POINT_SISEC_FRANCHISE}
                                                        nameAUX="sisecFranquicia"
                                                        label="Franquicia"
                                                        placeholder="Franquicia"
                                                        valorFiltro="Franquicia"
                                                        actualizarArray={setSisecFrancArray}
                                                        valorDefault={sisecFrancArray}
                                                        errorColor={errorSISECFranchice }
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </>
                                :
                                null
                            }


                            {mostrarValidoc ?
                                <>
                                    <Box sx={{ border: 1, padding: 1, borderRadius: 2 }}>
                                        <DialogTitle sx={{ p: 1, }} variant='h6' color='primary'>Datos para Validoc</DialogTitle>
                                        <Grid container spacing={1}>

                                            <Grid item xs={6}>
                                                <GenericComboAPI
                                                    endPointURL={END_POINT_VALIDOC_OPERATION}
                                                    nameAUX="validocOperacion"
                                                    label="Tipo de Operación"
                                                    placeholder="Tipo de Operación"
                                                    valorFiltro="EstadoCivil"
                                                        valorDefault={validocOperacion}
                                                        onChangeFunc={setvalidocOperacion}
                                                />
                                            </Grid>

                                            <Grid item xs={6}>
                                                <GenericComboAPI
                                                    endPointURL={END_POINT_VALIDOC_ROLES}
                                                    nameAUX="validocRoles"
                                                    label="Roles Validoc"
                                                    placeholder="Roles Validoc"
                                                    valorFiltro="EstadoCivil"
                                                        valorDefault={validocRoles}
                                                        onChangeFunc={setvalidocRoles}
                                                />
                                            </Grid>

                                            <Grid item xs={6}>
                                                <GenericComboAPI
                                                    endPointURL={END_POINT_VALIDOC_SUPERVISOR}
                                                    nameAUX="validocSupervisor"
                                                    label="Supervisor"
                                                    placeholder="Supervisor"
                                                    valorFiltro="EstadoCivil"
                                                        valorDefault={validocSupervisor}
                                                        onChangeFunc={setvalidocSupervisor}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <br />
                                </>
                                :
                                null
                            }


                        </DialogContent>


                        <DialogActions>
                            <Button onClick={handleClose} variant="outlined" color='error'>
                                Cerrar
                            </Button>

                                <LoadingButton type="submit" loading={isLoadingBTN } variant="contained" color='primary'>
                                Aceptar
                            </LoadingButton>
                        </DialogActions>
                    </>
                )}
            </FormProvider>
        </Dialog >


    )



}







