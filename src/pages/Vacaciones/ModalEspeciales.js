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
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { GenericFileInput } from '../../utils/GenericFileInput';
import { useSnackbar } from '../../components/snackbar';
import {
    END_POINT_OBTENER_COMBO_CATALOGO_GENERICO,
    END_POINT_OBTENER_VALOR_ALTENO_CATALOGO,
    END_POINT_OBTENER_HISTORIAL_VACACIONES_EMPLEADO,
    END_POINT_AGREGAR_DIASES_PECIALES,
} from '../../config-global';
import { AxiosCombo, AxiosMandarForm } from '../../_Axios/AxiosFomr';


ModalEspeciales.propTypes = {
    NombreEmpleado: PropTypes.string,
    EmpleaodoId: PropTypes.number,
};

export default function ModalEspeciales({ NombreEmpleado, EmpleaodoId }) {

    console.log("este es el empelado Id ya en emodal", EmpleaodoId)

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const { enqueueSnackbar } = useSnackbar();
    // constantes para documentos
    const [preview, setPreview] = useState(false);
    const [files, setFiles] = useState([]);
    const handleDropMultiFile = useCallback(
        (acceptedFiles) => {
            console.log('esto se ejecuta', files);
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



    const changeDias = (param) => {
        // AxiosCombo(END_POINT_OBTENER_VALOR_ALTENO_CATALOGO, param, setLetrero);
        setopcionDiasValor(param);
        console.log(opcionDiasValor)
    }

    const setLetrero = (param) => { setDias(`${param} dias`) };
    const [comentArray, setComentArray] = useState([["nombre", "comentario", "fecha"]]);
    const [dias, setDias] = useState(0);
    const [opcionDiasValor, setopcionDiasValor] = useState(0)


    const [archivoGPT, setArchivoGPT] = useState();
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setArchivoGPT(file)
        // Hacer algo con el archivo seleccionado, como almacenarlo en el estado del componente
    };


    const onSubmit = async (data) => {
        console.log("el data",data)
        console.log("los Dias", dias)

        if (dias) {
            const form = new FormData();
            form.append('tipoIncidencia', opcionDiasValor)
            form.append('comentario', data.texto)
            form.append('EmpleadoSolicitante', EmpleaodoId)
            form.append('diasTotales', dias)
            files.forEach((doc) => { form.append('archivos', doc); })
            AxiosMandarForm(form, END_POINT_AGREGAR_DIASES_PECIALES, enqueueSnackbar, enqueueSnackbar);
        } else {
            enqueueSnackbar("Ingresa un día")
        }

        
    }

    const diasChangeFunc = (e) => { setDias(e.target.value); };


    useEffect(() => {
        AxiosCombo(END_POINT_OBTENER_HISTORIAL_VACACIONES_EMPLEADO, EmpleaodoId, setComentArray)
    }, [EmpleaodoId])

    return (
        <>
            <Button color='secondary' onClick={(e) => handleClickOpen()}>
                <Iconify icon="akar-icons:paper" />Generar solicitud
            </Button>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
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
                                        onChangeFunc={setopcionDiasValor}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        type="number"
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
                        <RHFTextField
                            name="texto"
                            id="simple-editor"
                            label="Comentario*"
                            placeholder='Ingresa tu comentario*'
                            multiline
                            maxRows={4}
                            fullWidth
                        />

                        <GenericFileInput

                            files={files}
                            onDrop={handleDropMultiFile}
                            name="archivo"
                            sx={{ border: 1, width: 1, height: 40 }}
                            onRemove={handleRemoveFile}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="outlined" color='error'>
                            Cerrar
                        </Button>

                        <Button onClick={handleClose} type="submit" variant="contained" color='primary'>
                            Aceptar
                        </Button>
                    </DialogActions>
                </FormProvider >

            </Dialog >

        </>

    )
}

Comentarios.prototype = {
    Nombre: PropTypes.string,
    Comentario: PropTypes.string,
    Fecha: PropTypes.string
};
function Comentarios({ Nombre, Comentario, Fecha }) {
    return (
        <Grid sx={{ "font-size": "11px" }}>
            <Grid container spacing={3}>
                <Grid item xs={4} md={4}>
                    <div>{Nombre}</div>
                    <div>{Fecha}</div>
                </Grid>
                <Grid item xs={8} md={8}>
                    {Comentario}
                </Grid>
            </Grid>
        </Grid>
    )
}







