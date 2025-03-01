import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
// @mui
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers';
import GenericCombo from '../../utils/GenericCombo';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { GenericFileInput } from '../../utils/GenericFileInput';
import { useSnackbar } from '../../components/snackbar';
import {
    END_POINT_OBTENER_COMBO_CATALOGO_GENERICO,
    END_POINT_OBTENER_VALOR_ALTENO_CATALOGO,
    END_POINT_AGREGAR_DIASES_EDIT_ESPECIALES,
    END_POINT_OBTENER_DOCUMENTOS_SOLICITUD,
    END_POINT_BORRAR_DOCUMENTOS_SOLICITUD,
    END_POINT_HISTORIAL_SOLICITUD
} from '../../config-global';
import { AxiosFiltroSucces, AxiosMandarForm } from '../../_Axios/AxiosFomr';
import { MultiFilePreview } from '../../components/upload';
import GenericMultiFilePreview from '../../utils/GenericMultiFilePreview';


ModalPeticionesEspeciales.propTypes = {
    NombreEmpleado: PropTypes.string,
    SolicitudId: PropTypes.string,
    tipoPeticionEspecial: PropTypes.string,
    abrirModal: PropTypes.bool,
    diasTotales: PropTypes.string,
    refreshFunc:PropTypes.func,
    metodoCerrar:PropTypes.bool,

};

export default function ModalPeticionesEspeciales({ NombreEmpleado, SolicitudId, abrirModal, metodoCerrar, tipoPeticionEspecial, diasTotales, refreshFunc }) {

    const { enqueueSnackbar } = useSnackbar();

    // constantes para documentos
    const [preview, setPreview] = useState(false);
    const [files, setFiles] = useState([]);
    const handleDropMultiFile = useCallback(
        (acceptedFiles) => {
            setFiles([
                ...files,
                ...acceptedFiles.map((newFile) =>
                    Object.assign(newFile, {
                        preview: URL.createObjectURL(newFile),
                    })
                ),
            ]);
        },
        [files]
    );
    const handleRemoveFile = (inputFile) => {
        const filesFiltered = files.filter((fileFiltered) => fileFiltered !== inputFile);
        setFiles(filesFiltered);
    };
    const [docBorrar, setDocBorrar] = useState()
    const handleDeleteFile = (inputFile) => {
        // console.log("esta pasando por aqui",inputFile)
        setAbrirModalDoc(true)
        setDocBorrar(inputFile)
    };
    const metodoCerrarDoc = () => {
        setAbrirModalDoc(false)
    }
    const borrarDoc = () => {
        AxiosFiltroSucces(END_POINT_BORRAR_DOCUMENTOS_SOLICITUD, docBorrar.id, enqueueSnackbar);
        const docsfiltrados = docsGuardados.filter((fileFiltered) => fileFiltered !== docBorrar);
        setDocsGuardados(docsfiltrados);
        setAbrirModalDoc(false)
    }
    const handleRemoveAllFiles = () => {
        setFiles([]);
    };

    // constantes para el form
    const methods = useForm({
        // setValue
    });
    const {
        handleSubmit,
    } = methods;


    const [abrirModalDoc, setAbrirModalDoc] = useState(false)


    const onSubmit = async (data) => {




        const form = new FormData();
        form.append('Id', SolicitudId)
        form.append('tipoIncidencia', tipoPeticion)
        form.append('diasTotales', dias)
        // form.append('comentario', textoComentario)
        form.append("comentario", quillSimple);
        // form.append('comentario', data.texto)

        form.append('estatus', estatus)
        files.forEach((doc) => { form.append('archivos', doc); })
        // console.log('el data', data)

        AxiosMandarForm(form, END_POINT_AGREGAR_DIASES_EDIT_ESPECIALES, succesfunc, succesfunc);
        

    }

    const succesfunc = (data) => {
        enqueueSnackbar(data);
        refreshFunc( Date.now().toString());
    }


    const diasChangeFunc = (e) => { setDias(e.target.value); }


    // Valores de incio
    const [dias, setDias] = useState(diasTotales);
    // const [textoComentario, setTextoComentario] = useState("");
    const [quillSimple, setQuillSimple] = useState('');
    // const [comentario, setComentarios] = useState([["","brenda", "comentario", "fecha"]]);
    const [comentario, setComentarios] = useState([""]);

    const [tipoPeticion, setTipoPeticion] = useState(tipoPeticionEspecial);
    const [estatus, setEstatus] = useState("");
    // const changeText = (event) => { setTextoComentario(event.target.value); };

    const [docsGuardados, setDocsGuardados] = useState([]);
    // console.log('comentariosssss', comentario)

    useEffect(() => {
        setDias(diasTotales)
        setTipoPeticion(tipoPeticionEspecial)

        // Validamos que tengamos el id de la solicitud.
        if(SolicitudId > 0)
        {
            // es el método para poder actualizar setdocsguardados
            AxiosFiltroSucces(END_POINT_OBTENER_DOCUMENTOS_SOLICITUD, SolicitudId, setDocsGuardados);
            AxiosFiltroSucces(END_POINT_HISTORIAL_SOLICITUD, SolicitudId, setComentarios)
        }

       
    }, [SolicitudId, diasTotales, tipoPeticionEspecial])


    const perfilUsuario = localStorage.getItem('RolId')

    return (
        <>

            <Dialog open={abrirModal} onClose={metodoCerrar} maxWidth="sm" fullWidth>
                <DialogTitle variant='h5' color='primary'>Detalles de la petición</DialogTitle>

                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
                    <DialogContent>


                        <div>{NombreEmpleado}</div>
                        <br />
                        <div>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <GenericCombo
                                        endPointURL={END_POINT_OBTENER_COMBO_CATALOGO_GENERICO}
                                        nameAUX="tipoPeticion"
                                        label="Tipo de petición*"
                                        placeholder="Tipo de petición*"
                                        valorFiltro="Vacaciones"
                                        useChange
                                        valorDefault={tipoPeticionEspecial}
                                        onChangeFunc={setTipoPeticion}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Días de la solicitud*"
                                        onChange={diasChangeFunc}
                                        value={dias}
                                        placeholder="Días de la solicitud*"
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        <br />
                        <Accordion sx={{ border: '1px solid #919EAB', background: 'rgba(243, 246, 249, 0.4)', borderRadius: '8px' }}>
                            <AccordionSummary
                                expandIcon={<GridExpandMoreIcon />}
                                aria-controls="panel1a-content"
                            >
                                Historial de comentarios
                            </AccordionSummary>
                            <AccordionDetails>

                                {comentario.map((item) => (
                                    <Comentarios key={item[0]} Nombress={item[1]} Comentario={item[2]} Fecha={item[3]} />
                                ))}

                            </AccordionDetails>
                        </Accordion>

                        <br />


                        <RHFTextField
                            name="texto"
                            id="simple-editor"
                            label="Comentario*"
                            placeholder='Ingresa tu comentario'
                            multiline
                            maxRows={4}
                            fullWidth
                            onChange={(value) => setQuillSimple(value.target.value)}
                            value={quillSimple}
                        />


                        <GenericFileInput
                            files={files}
                            onDrop={handleDropMultiFile}
                            name="archivo"
                            sx={{ border: 1, width: 1, height: 40 }}
                            onRemove={handleRemoveFile}
                        />


                        <GenericMultiFilePreview files={docsGuardados} onRemove={handleDeleteFile} />


                        {/* Este es el dialog para confirmar borar el documento en el multifile */}
                        <Dialog open={abrirModalDoc} onClose={metodoCerrarDoc} maxWidth="sm" fullWidth>
                            <DialogTitle >
                                ¿Deseas eliminar el documento?
                            </DialogTitle>
                            <DialogActions>
                                <Button onClick={() => { setAbrirModalDoc(false) }}variant="outlined" color='error'>
                                    Cerrar
                                </Button>

                                <Button onClick={borrarDoc} color='error'  variant="contained">
                                    Eliminar
                                </Button>
                            </DialogActions>

                        </Dialog>

                    </DialogContent>
                    {perfilUsuario === 'RecursosHumanos' ? (
                        <>
                            <DialogActions>
                                <Button onClick={metodoCerrar} variant="outlined" color='error'>
                                    Cerrar
                                </Button>

                                <Button type="submit" onClick={() => { setEstatus("#RegresoRH"); metodoCerrar() }} variant="contained" color='error'>
                                    Regresar
                                </Button>
                                <Button type="submit" onClick={() => { setEstatus("#AutorizadoRH"); metodoCerrar()}} variant="contained">
                                    Autorizar
                                </Button>

                            </DialogActions>
                        </>
                    ) :
                        <>
                            <DialogActions>
                                <Button onClick={metodoCerrar} variant="outlined" color='error'>
                                    Cerrar
                                </Button>
                                <Button type="submit" onClick={() => { setEstatus("#RegresoRH"); metodoCerrar() }} variant="contained" color='error'>
                                    Cancelar Petición
                                </Button>
                                <Button onClick={metodoCerrar} type="submit" variant="contained" color='primary'>
                                    Aceptar
                                </Button>

                            </DialogActions>
                        </>
                    }

                </FormProvider >

            </Dialog>

        </>

    )
}

Comentarios.prototype = {
    Nombress: PropTypes.string,
    Comentario: PropTypes.string,
    Fecha: PropTypes.string
};
function Comentarios({ Nombress, Comentario, Fecha }) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
                <Typography variant='caption' >{Nombress}</Typography>
            </Grid>
            <Grid item xs={12} md={2}>
                <Typography variant='caption' >{Fecha}</Typography>
            </Grid>
            <Grid item xs={12} md={7}>
                <Typography variant='caption' >{Comentario}</Typography>
            </Grid>
        </Grid>
    )
}







