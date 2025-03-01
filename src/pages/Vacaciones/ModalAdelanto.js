import * as React from 'react';
import { useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import GenericCombo from '../../utils/GenericCombo';
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import {
    END_POINT_OBTENER_PERIODO_VACACIONES_ADELANTAR,
    END_POINT_AGREGAR_PERIODO_VACACIONES,
    END_POINT_OBTENER_HISTORIAL_VACACIONES_EMPLEADO
} from '../../config-global';
import { AxiosMandarForm,AxiosCombo } from '../../_Axios/AxiosFomr';



ModalAdelanto.propTypes = {
    NombreEmpleado: PropTypes.string,
    empleadoId: PropTypes.string,
    params: PropTypes.any,
    esResponsable:PropTypes.bool,
    refreshFunc:PropTypes.func,
    handleClickOpen:PropTypes.any,
    abrirModal: PropTypes.bool,
    setAbrirModal: PropTypes.func,

};

export default function ModalAdelanto({NombreEmpleado, params, abrirModal, empleadoId, esResponsable, handleClickOpen, setAbrirModal, refreshFunc}) {
    const [empleadoNombre, setEmpleadoNombre] = useState();
    const [quillSimple, setQuillSimple] = useState('');
    const [comentarios, setComentarios] = useState( [["nombre", "comentario", "fecha"]])
    const [empleado, setEmpleado] = useState("");
    const handleClose = () => {
        setAbrirModal(false);
    };
    const methods = useForm({
        // setValue
    });
    const {
        handleSubmit,
    } = methods;
    const onSubmit = async (data) => {
        try {
            const form = new FormData();
            form.append('EmpleadoSolicitante', empleadoId)
            // form.append('comentario', data.texto)
            form.append("comentario", quillSimple);

           await AxiosMandarForm(form, END_POINT_AGREGAR_PERIODO_VACACIONES, () => { }, () => { } )
           setTimeout(() => {
            refreshFunc(Date.now().toString());
          }, 1500);

        }  catch (error) {
            console.error(error);
        }
    };


    React.useEffect(() => {
        function ObtenerComentarios() {
            AxiosCombo(END_POINT_OBTENER_HISTORIAL_VACACIONES_EMPLEADO, empleadoId, setComentarios)
        }
        ObtenerComentarios()
    }, [empleadoId])

    return (
        <>
            {/*  */}

            <Dialog open={abrirModal} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle variant='h5' color='primary'>Detalles de la petición</DialogTitle>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}  >
                    <DialogContent>
                        <div>{NombreEmpleado}</div>
                        <br />
                        <div>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={12}>
                                    <GenericCombo
                                        endPointURL={END_POINT_OBTENER_PERIODO_VACACIONES_ADELANTAR}
                                        nameAUX="tipoRegimen"
                                        label="Período a adelantar"
                                        placeholder="Período a adelantar"
                                        valorFiltro={empleadoId}
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

                                {comentarios.map((item) =>
                                    <Comentarios Nombre={item[0]} Comentario={item[1]} Fecha={item[2]}/>
                                )}
                                
                            </AccordionDetails>
                        </Accordion>

                        <br />

                        <RHFTextField
                            name="texto"
                            id="simple-editor"
                            label="Comentario"
                            placeholder='Ingresa tu comentario'
                            multiline
                            maxRows={4}
                            fullWidth
                            onChange={(value) => setQuillSimple(value.target.value)}
                            value={quillSimple}
                        />

                    </DialogContent>
                    <DialogActions>

                        <Button variant="contained" color='error' onClick={handleClose}>
                            Cancelar
                        </Button>

                        <Button type="submit" variant="contained" onClick={handleClose}>
                            Autorizar
                        </Button>

                    </DialogActions>
                </FormProvider >

            </Dialog>

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
            <Grid item xs={12} md={3}>
                <Typography variant='caption' >{Nombre}</Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                <Typography variant='caption' >{Fecha}</Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                <Typography variant='caption' >{Comentario}</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}







