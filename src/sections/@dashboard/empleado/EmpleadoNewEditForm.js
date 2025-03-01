import PropTypes from 'prop-types';

import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, TextField, Typography, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { addDays, addWeeks, format } from 'date-fns';
import { esES } from '@mui/material/locale';
import es from 'date-fns/locale/es';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { useSnackbar } from '../../../components/snackbar';
import {
    END_POINT_CREAR_EPLEADO,
    END_POINT_EDITAR_EMPLEADO,
    END_POINT_COMBO_LISTA_EMPRESA,
    END_POINT_COMBO_LISTA_AREA_POR_EMPRESAS,
    END_POINT_COMBO_LISTA_DEPARTAMENTO_POR_AREA,
    END_POINT_COMBO_LISTA_PUESTO_POR_DEPARTAMENTO,
    END_POINT_COMBO_LISTA_ROLES,
    END_POINT_OBTENER_COMBO_CATALOGO_GENERICO,
    END_POINT_SISEC_BANCOS,
    END_POINT_COMBO_POSIBLESJEFES
} from '../../../config-global';

import GenericCombo from '../../../utils/GenericCombo';
import Iconify from '../../../components/iconify';
import { AxiosMandarForm, AxiosCombo, AxiosComboSistemas, AxiosComboParams, AxiosObtenerDatosExternoUsuario } from '../../../_Axios/AxiosFomr';
import GenericEnhancedTransferList from '../../../utils/GenericEnhancedTransferList';
import LoadingScreen from '../../../components/loading-screen';
import GenericComboAPI from '../../../utils/GenericComboAPI';
import GenericComboSelect from '../../../utils/GenericComboSelect';
import { setTockenExterno } from '../../../auth/utils';
import ModalBajaAlta from '../../../pages/Empleado/ModalBajaAlta';
import ModalOtroSistema from '../../../pages/Empleado/ModalOtroSistema';
import { RHFRadioGroup, RHFTextField } from '../../../components/hook-form';
import FormProvider from '../../../components/hook-form/FormProvider';
import HistorialEmpleado from '../../../pages/Empleado/HistorialEmpleado';
// ----------------------------------------------------------------------


EmpleadoNewEditForm.propTypes = {
    isEdit: PropTypes.bool,
    currentEmpleado: PropTypes.object,
};


export default function EmpleadoNewEditForm({ isEdit = false, currentEmpleado }) {
    const localizedFormat = date => format(date, 'dd/MM/yyyy', { locale: es });
    const [telefono, setTelefono] = useState("");
    const [loadingBTN, setloadingBTN] = useState(false);
    setTockenExterno();
    // Importa para navegacion
    const navigate = useNavigate();
    // Importar para mostrar letrero de guardado
    const { enqueueSnackbar } = useSnackbar();
    // Validaciones de campos
    const NewEmpleadoSchema = Yup.object().shape({
        nombre: Yup
            .string()
            .required('Ingresa nombre')
            .min(1, "Debe tener como mínimo 2 caracteres").max(50)
            .matches(/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+$/i, "Sólo letras"),

        apellidoPaterno: Yup
            .string()
            .required('Ingresa apellido paterno')
            .min(1, "Debe tener como mínimo 2 caracteres").max(50)
            .matches(/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/i, "Sólo letras"),

        apellidoMaterno: Yup
            .string()
            .required('Ingresa apellido paterno')
            .min(1, "Debe tener como mínimo 2 caracteres").max(50)
            .matches(/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/i, "Sólo letras"),

        curp: Yup
            .string()
            .min(18, "Debe tener como mínimo 18 caracteres")
            .max(18, "Debe tener como máximo 18 caracteres")
            .matches(/^[A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9]$/, "Ingrese un CURP válido"),

        rfc: Yup
            .string()
            .nullable()
            .max(13)
            .matches(/^[A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z0-9]{3}$/,
                "Ingrese un RFC válido"),

        correoEmpresarial: Yup
            .string()
            .required('Ingresa Correo Empresarial')
            .email("El email no tiene un formato válido"),
         telefono: Yup.string()
            .max(10)
            .required('Ingresa Teléfono')
            .matches(/^[0-9]/, "Ingresa un teléfono válido"),
         fechaIngreso: Yup
            .string(),
         fechaNacimiento: Yup
            .string(),

    });

   

    // Metodo para validar que solo se coloquen numeros
    const handleKeyPressNumber = (e) => {
        const key = e.key;
        const regex = /[0-9]|\./;
        if (!regex.test(key)) {
            e.preventDefault();
        }
        // else {
        //    
        // }
    };
    // Metodo para validare que solo se coloquen letras
    const handleKeyPressLetter = (e) => {
        const key = e.key;
        const regex = /^[a-zA-ZÁÉÍÓÚÜÑáéíóúüñ\s]+$/;
        if (!regex.test(key)) {
            e.preventDefault();
        }
    };
    // Metodo para validar que no ingresen carcteres especiales
    const handleKeyPressLetterSpace = (e) => {
        const key = e.key;
        const regex = /^[a-zA-ZÁÉÍÓÚÜÑáéíóúüñ\s]+$/;
        if (!regex.test(key)) {
            e.preventDefault();
        }
    };
    // Metodo para validar que no se ingresen espacios
    const handleKeyNoSpace = (e) => {
        const key = e.key;
        const regex = /^[\s]+$/;
        if (regex.test(key)) {
            e.preventDefault();
        }
    };
    // Colocar Valores por default
    const [defaultValues, setDefaultValues] = useState(
        {
            // Personales
            nombre: currentEmpleado?.nombre || '',
            segundoNombre: currentEmpleado?.segundoNombre || null,
            apellidoPaterno: currentEmpleado?.apellidoPaterno || '',
            apellidoMaterno: currentEmpleado?.apellidoMaterno || '',
            fechaNacimiento: currentEmpleado?.fechaNacimiento || null,
            lugarNacimiento: currentEmpleado?.lugarNacimiento || '',
            nacionalidad: currentEmpleado?.nacionalidad || '',
            curp: currentEmpleado?.curp || '',
            telefono: currentEmpleado?.telefono || '',
            correoPersonal: currentEmpleado?.correoPersonal || '',
            nivelEstudios: currentEmpleado?.nivelEstudios || '',
            sexo: currentEmpleado?.sexo || '',
            numeroINE: currentEmpleado?.numeroINE || '',
            estadoCivil: currentEmpleado?.estadoCivil || '',

            // Empleado dirección
            pais: currentEmpleado?.pais || '',
            estado: currentEmpleado?.estado || '',
            municipio: currentEmpleado?.municipio || '',
            colonia: currentEmpleado?.colonia || '',
            calle: currentEmpleado?.calle || '',
            codigoPostal: currentEmpleado?.codigoPostal || '',

            // Tipo de contratación
            noColaborador: currentEmpleado?.noColaborador || '',
            rfc: currentEmpleado?.rfc || '',
            cpfiscal: currentEmpleado?.cpfiscal || '',
            nss: currentEmpleado?.nss || '',
            correoEmpresarial: currentEmpleado?.correoEmpresarial || '',
            fechaIngreso: currentEmpleado?.fechaIngreso || null,
            fechaTerminacionPrueba: currentEmpleado?.fechaTerminacionPrueba || '',
            empresaId: currentEmpleado?.empresaId || '',
            areaId: currentEmpleado?.areaId || '',
            departamento: currentEmpleado?.departamento || '',
            puestoId: currentEmpleado?.puestoId || '',
            rolId: currentEmpleado?.rolId || '',
            esquemaOutsourcing: currentEmpleado?.esquemaOutsourcing || false,

            // Datos bancarios
            bancoId: currentEmpleado?.bancoId || null,
            clabe: currentEmpleado?.clabe || null,
            noCuenta: currentEmpleado?.noCuenta || null,
            bancoExterno: currentEmpleado?.bancoExterno || '00000000-0000-0000-0000-000000000000', 

            // Contacto Emergencia
            nombreContacto: currentEmpleado?.nombreContacto || '',
            parentesco: currentEmpleado?.parentesco || '',
            telefonoContacto: currentEmpleado?.telefonoContacto || '',
            correoContacto: currentEmpleado?.correoContacto || '',

            // Lider Directo
            liderDirecto: currentEmpleado?.liderDirecto || '',
        }
    )
    //---
    const methods = useForm({
        resolver:
            yupResolver(NewEmpleadoSchema),
        defaultValues,
    });

    const {
        control,
        watch,
        setValue,
        getValues,
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    const [leftArray, setLeftArray] = useState([]);
    const [rightArray, setRightArray] = useState([]);
    const [Idempleado, setIdEmpleado] = useState(0);
    const [IdempleadoExterno, setIdEmpleadoExteno] = useState('00000000-0000-0000-0000-000000000000');
    const [curp, setcurp] = useState("");
    const [nombre, setNombre] = useState("");

    useEffect(() => {

        if (isEdit && currentEmpleado) {


            setempresaValor(currentEmpleado?.empresaId || 0)
            setfiltroValorArea(currentEmpleado?.empresaId || 0)
            setAreaValor(currentEmpleado?.areaId || 0)
            setfiltroValorDepartamento(currentEmpleado?.areaId || 0)
            setDepartamentoValor(currentEmpleado?.departamentoId || 0)
            setPuestoValor(currentEmpleado?.puestoId || 0)
            setfiltroValorPuesto(currentEmpleado?.departamentoId || 0)
            setRolValor(currentEmpleado?.rolId || 0)
            setBanco(currentEmpleado?.bancoId || null)
            setBancoExterno(currentEmpleado?.bancoExterno || '00000000-0000-0000-0000-000000000000')
            setempresaLiderValor(currentEmpleado?.empresaLiderId || 0)
            setfiltroLiderValorArea(currentEmpleado?.empresaLiderId || 0)
            setAreaLiderValor(currentEmpleado?.areaLiderId || 0)
            setfiltroLiderValor(currentEmpleado?.areaLiderId || 0)
            // setfiltroLiderValor(26)
            setLiderDirecto(currentEmpleado?.liderDirecto || 0)
            // --

            setStartDate(new Date(currentEmpleado?.fechaIngreso || null));
            setIdEmpleado(currentEmpleado?.id || 0)
            setIdEmpleadoExteno(currentEmpleado?.idUser || 0)
            setcurp(currentEmpleado?.curp || "")
            reset(currentEmpleado);
        }
        setIdEmpleado(currentEmpleado?.id || 0)
        setNombre(currentEmpleado?.userName || '')
        setTockenExterno();
    }, [isEdit, currentEmpleado, reset, setDefaultValues]);


    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
    const [errorSelect, setErrorSelect] = useState(false);


    // Metodo de submit
    const onSubmit = async (data) => {

        const form = new FormData();
        const urlEndPoint = isEdit ? END_POINT_EDITAR_EMPLEADO : END_POINT_CREAR_EPLEADO;
        const empleadoId = isEdit ? data.id : 0;
        const stringEmpty = "";
        const fecha = new Date(data.fechaIngreso).toJSON();

        // Informacion base del empleado
        form.append('nombre', data.nombre)
        form.append('segundoNombre', data.segundoNombre ? data.segundoNombre : stringEmpty)
        form.append('apellidoPaterno', data.apellidoPaterno)
        form.append('apellidoMaterno', data.apellidoMaterno)
        form.append('fechaNacimiento', new Date(data.fechaNacimiento).toJSON());
        form.append('lugarNacimiento', data.lugarNacimiento)
        form.append('nacionalidad', data.nacionalidad)
        form.append('sexo', data.sexo);
        form.append('curp', data.curp)
        form.append('telefono', data.telefono)
        form.append('correoPersonal', data.correoPersonal)
        form.append('estadoCivil', data.estadoCivil)
        form.append('nivelEstudios', data.nivelEstudios)
        form.append('numeroINE', data.numeroINE ? data.numeroINE : stringEmpty)

        // EmpleadoDireccion
        form.append('pais', data.pais);
        form.append('estado', data.estado);
        form.append('municipio', data.municipio);
        form.append('colonia', data.colonia);
        form.append('calle', data.calle);
        form.append('codigoPostal', data.codigoPostal);

        // TipoContratacion
        form.append('rfc', data.rfc);
        form.append('cpfiscal', data.cpfiscal);
        form.append('nss', data.nss);
        form.append('telefonoFijo', data.telefonoFijo)
        form.append('correoEmpresarial', data.correoEmpresarial)

        form.append('noColaborador', data.noColaborador);
        form.append('fechaIngreso', fecha);
        form.append('fechaTerminacionPrueba', new Date(endDate).toJSON());
        form.append('empresaId', 5)
        form.append('departamento', data.departamento)
        form.append('puestoId', puestoValor)
        form.append('rolId', rolValor)
        form.append('id', empleadoId)

        // DatoBancarios
        form.append('bancoId', 0);
        form.append('bancoExterno', "00000000-0000-0000-0000-000000000000");
        form.append('Clabe', data.clabe);
        form.append('NoCuenta', data.noCuenta ? data.noCuenta : stringEmpty);

        // EmpleadoContactoEmergecia
        form.append('nombreContacto', data.nombreContacto);
        form.append('parentesco', data.parentesco);
        form.append('telefonoContacto', data.telefonoContacto);
        form.append('correoContacto', data.correoContacto);

        // Lider Directo
        form.append("liderDirecto", liderDirecto);
        const stringNoEmpti = "...";
        form.append('_contextNombre', stringNoEmpti);
        form.append('_contextPuestoId', stringNoEmpti);
        form.append('_contextEmpresaId', stringNoEmpti);
        form.append('_contextPuestoNombre', stringNoEmpti);
        form.append('_contextEmpresaNombre', stringNoEmpti);
        form.append('NombreArea', stringNoEmpti);
        form.append('NombreEmpresa', stringNoEmpti);
        form.append('NombrePuesto', stringNoEmpti);
        form.append('NombreCompleto', stringNoEmpti);
        form.append('userName', stringNoEmpti);

        const sistemasArray = [];
        rightArray.forEach((element) => { sistemasArray.push(element.id) })
        form.append('sistemas', sistemasArray);
        
        const ValidacionPass = handleClick(data);


        console.log("some",form)

         // Valida que se tiene todos los campos
        if (ValidacionPass) {
            setloadingBTN(true)
            AxiosMandarForm(form, urlEndPoint, succesfunc, errorfunc);
        }
         else
             errorfunc("¡Por favor completa el formulario!");

    };
    const [openModalSistemas, setopenModalSistemas] = useState(false)

    // const [openModalOtroSistema, setOpenModalOtroSistema] = useState(false);
    const [openModalBajaAlta, setOpenModalBajaAlta] = useState(false);
    const [errorPuesto, setErrorPuesto] = useState(false);
    const [errorDepartamento, setErrorDepartamento] = useState(false);
    const [errorArea, setErrorArea] = useState(false);
    const [errorEmpresa, setErrorEmpresa] = useState(false);
    const [errorRol, setErrorRol] = useState(false);
    const [errorEmpresaLider, setErrorEmpresaLider] = useState(false);
    const [errorAreaLider, setErrorAreaLider] = useState(false);
    const [errorLider, setErrorLider] = useState(false);


    


    // Valida campos requeridos
    const handleClick = (data) => {

        let permisoSubmit = true;

        if (!document.getElementById('nombre').value)
            permisoSubmit = false;
        if (!document.getElementById('apellidoPaterno').value)
            permisoSubmit = false;
        if (!document.getElementById('apellidoMaterno').value)
            permisoSubmit = false;
        if (!document.getElementById('fechaNacimiento').value)
            permisoSubmit = false;
        if (!document.getElementById('rfc').value)
            permisoSubmit = false;
        if (!document.getElementById('curp').value)
            permisoSubmit = false;
        if (!document.getElementById('telefono').value)
            permisoSubmit = false;
        if (!document.getElementById('correoEmpresarial').value)
            permisoSubmit = false;
        if (!document.getElementById('fechaIngreso').value)
            permisoSubmit = false;

        // console.log('el telefono', document.getElementById('telefono').value.length)

        if (document.getElementById('telefono').value.length > 10)
            permisoSubmit = false

        if ((empresaValor <= 0)) {
            setErrorEmpresa(true);
            permisoSubmit = false;
        } else {
            setErrorEmpresa(false);
        }

        if ((areaValor <= 0)) {
            setErrorArea(true);
            permisoSubmit = false;
        } else {
            setErrorArea(false);
        }

        if ((departamentoValor <= 0 )) {
            setErrorDepartamento(true);
            permisoSubmit = false;
        } else {
            setErrorDepartamento(false);
        }

        if ((puestoValor <= 0)) {
            setErrorPuesto(true);
            permisoSubmit = false;
        } else {
            setErrorPuesto(false);
        }

        if ((rolValor <= 0 )) {
            setErrorRol(true);
            permisoSubmit = false;
        } else {
            setErrorRol(false);
        }

         if ((empresaLiderValor <= 0)) {
            setErrorEmpresaLider(true);
            permisoSubmit = false;
         } else {
            setErrorEmpresaLider(false);
         }

         if ((areaLiderValor <= 0)) {
            setErrorAreaLider(true);
            permisoSubmit = false;
         } else {
            setErrorAreaLider(false);
         }

         if ((liderDirecto <= 0)) {
            setErrorLider(true);
            permisoSubmit = false;
         } else {
            setErrorLider(false);
         }

        if (!permisoSubmit)
            errorfunc("¡Por favor completa el formulario!");
         

        return permisoSubmit;
    }

    const succesfunc = (param) => {
        setloadingBTN(false)
        setIsLoading(false);
        enqueueSnackbar("Los datos fueron ingresados correctamente");
        // setIdEmpleado(param.param);
        // setNombre(param.userName);
    };

    const errorfunc = (Mnsaje) => {
        setloadingBTN(false)
        setIsLoading(false);
        enqueueSnackbar(Mnsaje, { variant: 'error' });
    };


    // Valores para combos (para colocarlos por default en caso de edicion)
    const [filtroValorArea, setfiltroValorArea] = useState(0);
    const [filtroValorDepartamento, setfiltroValorDepartamento] = useState(0);
    const [filtroValorPuesto, setfiltroValorPuesto] = useState(0);
    const [filtroValorLider, setFiltroValorLider] = useState(0);
    const [empresaValor, setempresaValor] = useState(0);
    const [areaValor, setAreaValor] = useState(0);
    const [departamentoValor, setDepartamentoValor] = useState(0);
    const [puestoValor, setPuestoValor] = useState(0);
    const [rolValor, setRolValor] = useState(0);
    const [liderDirecto, setLiderDirecto] = useState(0);
    const [bancoId, setBanco] = useState('00000000-0000-0000-0000-000000000000');
    const [disabled, setDisabled] = useState(isEdit);
    const [mostrarBotonEditar, setMostrarBotonEditar] = useState(isEdit);
    const [empresaLiderValor, setempresaLiderValor] = useState(0);
    const [areaLiderValor, setAreaLiderValor] = useState(0);
    const [filtroLiderValorArea, setfiltroLiderValorArea] = useState(0);
    const [filtroLiderValor, setfiltroLiderValor] = useState(0);
    const [bancoExterno, setBancoExterno] = useState('00000000-0000-0000-0000-000000000000');

    // Metodos para llenar los combos dependiendo del valor dado
    const changeFuncEmpresa = (param) => {
        setempresaValor(param);
        setfiltroValorArea(param);
        setfiltroValorDepartamento(0);
        setfiltroValorPuesto(0);
        setFiltroValorLider(0);
        setAreaValor(0);
        setDepartamentoValor(0);
        setPuestoValor(0);
    }
    const changeFuncArea = (param) => {
        setAreaValor(param)
        setfiltroValorDepartamento(param);
        setfiltroValorPuesto(0);
        setFiltroValorLider(0);
        setDepartamentoValor(0);
        setPuestoValor(0);
    }
    const changeFuncDepto = (param) => {
        setDepartamentoValor(param);
        setfiltroValorPuesto(param);
        setFiltroValorLider(0);
    }
    const changeFuncPuesto = (param) => {
        setPuestoValor(param)
    }

    const changeFuncRol = (param) => {
        setRolValor(param);
    }

    const changeFuncLiderEmpresa = (param) => {
        setempresaLiderValor(param)
        setfiltroLiderValorArea(param);
        setFiltroValorLider(0);
        setAreaLiderValor(0);
        setLiderDirecto(0);
    }

    const changeFuncLiderArea = (param) => {
        setAreaLiderValor(param)
        setFiltroValorLider(0);
        setfiltroLiderValor(param)
        setLiderDirecto(0);
    }

    const changeFuncLider = (param) => {
        setLiderDirecto(param);
    }
    
    // ----

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [startDate, setStartDate] = useState(null);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    // Metodo para agregar 3 meses a una fecha 
    const addThreeMonths = (date) => {

        if (!date) return null;

        let newDate = addWeeks(date, 12);

        // Si la fecha cae en un sábado o domingo, la ajustamos al siguiente lunes
        while (newDate.getDay() === 0 || newDate.getDay() === 6) {
            newDate = addDays(newDate, 1);
        }
        return newDate;
    };
    const endDate = addThreeMonths(startDate);

    const perfilUsuario = localStorage.getItem('RolId');

    // Constantes y funciones del modal de baja
    const [nombreEmpleado, setNombreEmpleado] = useState("");
    const [refreshAUX, setRefreshAUX] = useState('')
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = (parametro) => {
        setOpen(true);
    };

    // Abrir ModalBajaAlta
    const handleOpenModalBajaAlta = () => {
        setOpenModalBajaAlta(true);
    };

    // Cerrar ModalBajaAlta
    const handleCloseModalBajaAlta = () => {
        setOpenModalBajaAlta(false);
    };

    const bankChangeFunc = (data) => {
        setBancoExterno(data);
    }

    return (
        <>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Card sx={{ p: 3 }}>

                            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                <AccordionSummary
                                    expandIcon={<Iconify icon="iconamoon:arrow-down-2" />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography
                                        style={{ fontWeight: expanded === 'panel1' ? 'bold' : '500', color: expanded === 'panel1' ? '#1f9382' : 'black' }}>
                                        Datos Personales
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        rowGap={3}
                                        columnGap={3}
                                        display="grid"
                                        gridTemplateColumns={{
                                            xs: 'repeat(1, 1fr)',
                                            sm: 'repeat(4, 1fr)',
                                        }}
                                    >
                                        <RHFTextField disabled={disabled} id="nombre" name="nombre" label="Nombre*" onKeyPress={(e) => handleKeyPressLetter(e)} />
                                        <RHFTextField disabled={disabled} name="segundoNombre" label="Segundo Nombre" onKeyPress={(e) => handleKeyPressLetterSpace(e)} />
                                        <RHFTextField disabled={disabled} id="apellidoPaterno" name="apellidoPaterno" label="Apellido Paterno*" onKeyPress={(e) => handleKeyPressLetterSpace(e)} />
                                        <RHFTextField disabled={disabled} id="apellidoMaterno" name="apellidoMaterno" label="Apellido Materno*" onKeyPress={(e) => handleKeyPressLetterSpace(e)} />
                                        <Controller
                                            name="fechaNacimiento"
                                            render={({ field, fieldState: { error } }) => (
                                                <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        {...field}
                                                        label="Fecha de Nacimiento*"
                                                        disabled={disabled}
                                                        inputFormat="dd/MM/yyyy"
                                                        maxDate={new Date()}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                fullWidth
                                                                {...params}
                                                                error={!!error}
                                                                helperText={error ? 'Ingresa fecha' : ''}
                                                                id="fechaNacimiento"
                                                            />
                                                        )}
                                                    />
                                                </LocalizationProvider>
                                            )}
                                        />
                                        <RHFTextField disabled={disabled} name="nacionalidad" label="Nacionalidad" onKeyPress={(e) => handleKeyPressLetterSpace(e)} />
                                        <RHFTextField disabled={disabled} name="lugarNacimiento" label="Lugar de Nacimiento" onKeyPress={(e) => handleKeyPressLetterSpace(e)} />
                                        <RHFRadioGroup
                                            row
                                            name="sexo"
                                            label="Sexo"
                                            options={[
                                                { label: 'Hombre', value: 'Hombre' },
                                                { label: 'Mujer', value: 'Mujer' },
                                            ]}
                                            disabledParam={disabled}
                                        />
                                        <RHFTextField disabled={disabled} id="curp" onKeyPress={(e) => handleKeyNoSpace(e)} name="curp" label="CURP*" />
                                        <RHFTextField disabled={disabled} id="telefono"  onKeyPress={(e) => handleKeyPressNumber(e)} name="telefono" label="Teléfono Móvil*" />
                                        <RHFTextField disabled={disabled} onKeyPress={(e) => handleKeyNoSpace(e)} name="correoPersonal" label="Correo Personal" />
                                        <RHFTextField disabled={disabled} onKeyPress={(e) => handleKeyNoSpace(e)} name="estadoCivil" label="Estado Civil" />

                                        <GenericCombo
                                            endPointURL={END_POINT_OBTENER_COMBO_CATALOGO_GENERICO}
                                            nameAUX="nivelEstudios"
                                            label="Nivel de Estudios"
                                            placeholder="Nivel de Estudios"
                                            valorFiltro="Estudios"
                                            disabled={disabled}
                                            valorDefault={0}
                                        />

                                        <RHFTextField disabled={disabled} name="numeroINE" onKeyPress={(e) => handleKeyNoSpace(e)} label="INE" />
                                    </Box>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                <AccordionSummary
                                    expandIcon={<Iconify icon="iconamoon:arrow-down-2" />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography
                                        style={{ fontWeight: expanded === 'panel2' ? 'bold' : '500', color: expanded === 'panel2' ? '#1f9382' : 'black' }}
                                    >
                                        Dirección
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        rowGap={3}
                                        columnGap={3}
                                        display="grid"
                                        gridTemplateColumns={{
                                            xs: 'repeat(1, 1fr)',
                                            sm: 'repeat(4, 1fr)',
                                        }}
                                    >
                                        <RHFTextField disabled={disabled} name="pais" label="País" />
                                        <RHFTextField disabled={disabled} name="estado" label="Estado" />
                                        <RHFTextField disabled={disabled} name="municipio" label="Municipio" />
                                        <RHFTextField disabled={disabled} name="colonia" label="Colonia" />
                                        <RHFTextField disabled={disabled} name="calle" label="Calle" />
                                        <RHFTextField disabled={disabled} onKeyPress={(e) => handleKeyPressNumber(e)} name="codigoPostal" label="Código Postal" />
                                    </Box>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                <AccordionSummary
                                    expandIcon={<Iconify icon="iconamoon:arrow-down-2" />}
                                    aria-controls="panel3a-content"
                                    id="panel3a-header"
                                >
                                    <Typography
                                        style={{ fontWeight: expanded === 'panel3' ? 'bold' : '500', color: expanded === 'panel3' ? '#1f9382' : 'black' }}
                                    >
                                        Datos Laborales
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        rowGap={3}
                                        columnGap={3}
                                        display="grid"
                                        gridTemplateColumns={{
                                            xs: 'repeat(1, 1fr)',
                                            sm: 'repeat(4, 1fr)',
                                        }}
                                    >
                                        <RHFTextField disabled={disabled} onKeyPress={(e) => handleKeyNoSpace(e)} name="noColaborador" label="Número de Colaborador" />
                                        <RHFTextField disabled={disabled} id="rfc" onKeyPress={(e) => handleKeyNoSpace(e)} name="rfc" label="RFC con homoclave*" />
                                        <RHFTextField disabled={disabled} onKeyPress={(e) => handleKeyNoSpace(e)} name="cpfiscal" label="Código Postal Fiscal" />
                                        <RHFTextField disabled={disabled} onKeyPress={(e) => handleKeyPressNumber(e)} name="nss" label="NSS" />
                                        <RHFTextField disabled={disabled} name="telefonoFijo" label="Teléfono Empresarial" onKeyPress={(e) => handleKeyPressNumber(e)} />
                                        <RHFTextField disabled={disabled} id="correoEmpresarial" onKeyPress={(e) => handleKeyNoSpace(e)} name="correoEmpresarial" label="Correo Empresarial*" />
                                        <Controller name="fechaIngreso"
                                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        locale={esES}
                                                        disabled={disabled}
                                                        maxDate={new Date()}
                                                        label="Fecha de Ingreso*"
                                                        value={value}
                                                        onChange={(date) => {
                                                            handleStartDateChange(date);
                                                            onChange(date);
                                                        }}
                                                        inputFormat="dd/MM/yyyy"
                                                        renderInput={(params) => (
                                                            <TextField
                                                                fullWidth
                                                                {...params}
                                                                error={!!error}
                                                                helperText={error ? 'Ingresa fecha' : ''}
                                                                id="fechaIngreso"
                                                            />
                                                        )}
                                                    />
                                                </LocalizationProvider>

                                            )}
                                        />
                                        <Controller
                                            name="fechaTerminacionPrueba"
                                            inputFormat="dd/MM/yyyy"
                                            control={control}
                                            render={({ field: { value } }) => (
                                                <TextField
                                                    fullWidth
                                                    label="Terminación del Periódo de Prueba"
                                                    value={endDate ? endDate.toLocaleDateString() : ''}
                                                    disabled
                                                />
                                            )}
                                        />
                                        <GenericCombo
                                            endPointURL={END_POINT_COMBO_LISTA_EMPRESA}
                                            nameAUX="empresaId"
                                            label="Empresa*"
                                            placeholder="Empresa"
                                            valorFiltro={empresaValor}
                                            useChange
                                            disabled={disabled}
                                            valorDefault={empresaValor}
                                            onChangeFunc={changeFuncEmpresa}
                                            error={errorEmpresa}
                                        />

                                        <GenericCombo
                                            endPointURL={END_POINT_COMBO_LISTA_AREA_POR_EMPRESAS}
                                            nameAUX="areaId"
                                            label="Área*"
                                            placeholder="Área"
                                            valorFiltro={filtroValorArea}
                                            useChange
                                            disabled={disabled}
                                            valorDefault={areaValor}
                                            onChangeFunc={changeFuncArea}
                                            revisarValorFiltro
                                            error={errorArea}
                                        />

                                        <GenericCombo
                                            endPointURL={END_POINT_COMBO_LISTA_DEPARTAMENTO_POR_AREA}
                                            nameAUX="departamento"
                                            label="Departamento*"
                                            placeholder="Departamento"
                                            valorFiltro={filtroValorDepartamento}
                                            useChange
                                            disabled={disabled}
                                            valorDefault={departamentoValor}
                                            onChangeFunc={changeFuncDepto}
                                            revisarValorFiltro
                                            error={errorDepartamento}
                                        />

                                        <GenericCombo
                                            endPointURL={END_POINT_COMBO_LISTA_PUESTO_POR_DEPARTAMENTO}
                                            nameAUX="puestoId"
                                            label="Puesto*"
                                            placeholder="Puesto*"
                                            valorFiltro={filtroValorPuesto}
                                            disabled={disabled}
                                            valorDefault={puestoValor}
                                            revisarValorFiltro
                                            useChange
                                            onChangeFunc={changeFuncPuesto}
                                            error={errorPuesto}
                                        />

                                        <GenericCombo
                                            endPointURL={END_POINT_COMBO_LISTA_ROLES}
                                            nameAUX="rolId"
                                            label="Rol de Usuario en Conecta*"
                                            placeholder="Rol de Usuario en Conecta*"
                                            disabled={disabled}
                                            valorDefault={rolValor}
                                            useChange
                                            onChangeFunc={changeFuncRol}
                                            valorFiltro="0"
                                            error={errorRol}
                                        />


                                         <GenericCombo
                                            endPointURL={END_POINT_COMBO_LISTA_EMPRESA}
                                            nameAUX="empresaLiderId"
                                            label="Empresa del lider directo*"
                                            placeholder="Empresa*"
                                            valorFiltro={empresaLiderValor}
                                            useChange
                                            disabled={disabled}
                                            valorDefault={empresaLiderValor}
                                            onChangeFunc={changeFuncLiderEmpresa}
                                            error={errorEmpresaLider}
                                        />

                                        <GenericCombo
                                            endPointURL={END_POINT_COMBO_LISTA_AREA_POR_EMPRESAS}
                                            nameAUX="areaLiderId"
                                            label="Área del lider directo*"
                                            placeholder="Área*"
                                            valorFiltro={filtroLiderValorArea}
                                            useChange
                                            disabled={disabled}
                                            valorDefault={areaLiderValor}
                                            onChangeFunc={changeFuncLiderArea}
                                            revisarValorFiltro
                                            error={errorAreaLider}
                                        />

                                         <GenericCombo
                                            endPointURL={END_POINT_COMBO_POSIBLESJEFES}
                                            nameAUX="liderDirecto"
                                            label="Lider Directo*"
                                            placeholder="Lider Directo*"
                                            disabled={disabled}
                                            valorDefault={liderDirecto}
                                            valorFiltro={filtroLiderValor}
                                            useChange
                                            onChangeFunc={changeFuncLider}
                                            revisarValorFiltro
                                            error={errorLider}
                                        /> 

                                      
                                    </Box>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                                <AccordionSummary
                                    expandIcon={<Iconify icon="iconamoon:arrow-down-2" />}
                                    aria-controls="panel4a-content"
                                    id="panel4a-header"
                                >
                                    <Typography
                                        style={{ fontWeight: expanded === 'panel4' ? 'bold' : '500', color: expanded === 'panel4' ? '#1f9382' : 'black' }}
                                    >
                                        Datos Bancarios
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        rowGap={3}
                                        columnGap={3}
                                        display="grid"
                                        gridTemplateColumns={{
                                            xs: 'repeat(1, 1fr)',
                                            sm: 'repeat(4, 1fr)',
                                        }}
                                    >

                                        <GenericComboAPI
                                            endPointURL={END_POINT_SISEC_BANCOS}
                                            nameAUX="bancoExterno"
                                            label="Banco"
                                            placeholder="Banco"
                                            disabled={disabled}
                                            // valorFiltro={bancoId}
                                            valorDefault={bancoExterno}
                                            onChangeFunc={bankChangeFunc}
                                        />

                                        <RHFTextField disabled={disabled} name="noCuenta" label="Cuenta de Banco" onKeyPress={(e) => handleKeyPressNumber(e)} />
                                        <RHFTextField disabled={disabled} name="clabe" label="Clabe Interbancaria" onKeyPress={(e) => handleKeyPressNumber(e)} />
                                    </Box>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                                <AccordionSummary
                                    expandIcon={<Iconify icon="iconamoon:arrow-down-2" />}
                                    aria-controls="panel6a-content"
                                    id="panel6a-header"
                                >
                                    <Typography
                                        style={{ fontWeight: expanded === 'panel6' ? 'bold' : '500', color: expanded === 'panel6' ? '#1f9382' : 'black' }}
                                    >
                                        Contacto de Emergencia
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box
                                        sx={{ mb: 2 }}
                                        rowGap={3}
                                        columnGap={3}
                                        display="grid"
                                        gridTemplateColumns={{
                                            xs: 'repeat(1, 1fr)',
                                            sm: 'repeat(4, 1fr)',
                                        }}
                                    >
                                        <RHFTextField disabled={disabled} name="nombreContacto" label="Nombre" onKeyPress={(e) => handleKeyPressLetterSpace(e)} />
                                        <RHFTextField disabled={disabled} name="parentesco" label="Parentesco" onKeyPress={(e) => handleKeyPressLetterSpace(e)} />
                                        <RHFTextField disabled={disabled} name="telefonoContacto" label="Teléfono" onKeyPress={(e) => handleKeyPressNumber(e)} />
                                        <RHFTextField disabled={disabled} name="correoContacto" label="Correo" onKeyPress={(e) => handleKeyNoSpace(e)} />
                                    </Box>
                                </AccordionDetails>
                            </Accordion>

                            <Stack spacing={2} direction="row" justifyContent="flex-end" sx={{ pt: 2 }}>

                                {mostrarBotonEditar ?
                                    <>
                                        <LoadingButton variant='outlined' color='primary' onClick={() => { setDisabled(false); setMostrarBotonEditar(false); }}>
                                            <Iconify icon="eva:edit-fill" /> Editar
                                        </LoadingButton>
                                        <Button variant='outlined' color='error' onClick={handleOpenModalBajaAlta}>
                                            <Iconify icon="mdi:account-reactivate-outline" />Dar de Baja
                                        </Button>
                                    </>
                                    : null
                                }

                                {isEdit ? null :
                                    <LoadingButton type="submit" loading={loadingBTN } variant='contained' color='primary' onClick={handleClick} >
                                        Crear Empleado
                                    </LoadingButton>
                                }

                                {mostrarBotonEditar ?
                                    null :
                                    <>
                                        {!isEdit ? null :
                                            <>
                                                <LoadingButton variant="outlined" onClick={() => { setOpen(true); }}>
                                                    Editar sistemas
                                                </LoadingButton>

                                                <LoadingButton type="submit" loading={loadingBTN} variant='contained' color='primary' onClick={()=>handleClick()} >
                                                    Guardar Cambios
                                                </LoadingButton>
                                            </>
                                        }
                                    </>
                                }
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </FormProvider>
            <br />
            <HistorialEmpleado
                empleadoId={Idempleado}
            />

            <ModalOtroSistema
                openModal={open}
                openFunc={setOpen}
                openLoading={isLoading}
                loadingFunc={setIsLoading}
                empleadoId={Idempleado}
                empleadoIdExterno={IdempleadoExterno}
                nombre={nombre}
                isEdit
                curp={curp}
            />

            <ModalBajaAlta
                empleadoId={Idempleado}
                NombreEmpleado={nombre}
                refreshFunc={setRefreshAUX}
                abrirModal={openModalBajaAlta}
                metodoCerrar={handleCloseModalBajaAlta}
            />

        </>
    )


}
