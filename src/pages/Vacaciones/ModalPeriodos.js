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
import { useSnackbar } from '../../components/snackbar';
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import {
    END_POINT_OBTENER_PERIODO_VACACIONES_ADELANTAR,
    END_POINT_AGREGAR_PERIODO_VACACIONES,
    END_POINT_OBTENER_HISTORIAL_VACACIONES_EMPLEADO,
    END_POINT_CREAR_PERIODOS
} from '../../config-global';
import { AxiosMandarForm, AxiosCombo } from '../../_Axios/AxiosFomr';




ModalPeriodos.propTypes = {
    Periodo: PropTypes.string,
    VacacionesActuales: PropTypes.string,
    Personales: PropTypes.string,
    PeriodoId: PropTypes.string,
    refreshBalanceEmpleado: PropTypes.func,
    handleClickOpen: PropTypes.any,
    abrirModal: PropTypes.bool,
    setAbrirModal: PropTypes.func,
    agregarTarjeta: PropTypes.any,
    empleadoId: PropTypes.string,
};

export default function ModalPeriodos({empleadoId, Periodo, VacacionesActuales, Personales, PeriodoId, abrirModal, handleClickOpen, setAbrirModal, agregarTarjeta, refreshBalanceEmpleado }) {
    const [diasPersonales, setdiasPersonales] = useState(VacacionesActuales);
    const [vacacionesDisponibles, setVacacionesDisponibles] = useState(Personales);

    const handleClose = () => {
        setAbrirModal(false);
    };

    const handleKeyPressNumber = (e) => {
        const key = e.key;
        const regex = /[0-9]|\./;
        if (!regex.test(key)) {
            e.preventDefault();
        }
    };
    const methods = useForm({});
    const { handleSubmit, } = methods;
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = async (data) => {

        try {
            const form = new FormData();
            form.append('id', PeriodoId)
            form.append('vacacionesDisponibles', vacacionesDisponibles)
            form.append('diasPersonales', diasPersonales)
            form.append('empleadoId', empleadoId)
            await AxiosMandarForm(form, END_POINT_CREAR_PERIODOS, succesfunc, succesfunc);
        } catch (error) {
            console.error(error);
        }
    };

    const succesfunc = (data) => {
        setAbrirModal(false);
        const successMessage = "Se creó el periodo correctamente";
        enqueueSnackbar(successMessage);
        // window.location.reload();
        refreshBalanceEmpleado (new Date())
        agregarTarjeta({ Periodo, vacacionesDisponibles, diasPersonales});

        // setTimeout(() => {
        //     agregarTarjeta({ Periodo, vacacionesDisponibles, diasPersonales});
        // }, 1000);
    }


    return (
        <>
            <Dialog open={abrirModal} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle variant='h5' color='primary'>Generar Periodo</DialogTitle>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}  >
                    <DialogContent>
                        <br />
                        <div>
                            <Grid container spacing={3}>
                                <Grid item md={12} xs={12} sx={{ paddingTop: 4 }}>
                                    <RHFTextField
                                        onChange={(e) => { setVacacionesDisponibles(e.target.value); }}
                                        onKeyPress={(e) => handleKeyPressNumber(e)}
                                        label="Días del Periodo Actual"
                                        name="vacacionesDisponibles"
                                        variant="outlined"
                                        value={vacacionesDisponibles}
                                    />
                                </Grid>
                                <Grid item md={12} xs={12} sx={{ paddingTop: 2, paddingBottom: 2 }}>
                                    <RHFTextField
                                        onKeyPress={(e) => handleKeyPressNumber(e)}
                                        onChange={(e) => { setdiasPersonales(e.target.value); }}
                                        label="Días Personales"
                                        name="diasPersonales"
                                        variant="outlined"
                                        value={diasPersonales}

                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </DialogContent>
                    <DialogActions>

                        <Button variant="outlined" color='error' onClick={handleClose}>
                            Cancelar
                        </Button>

                        <Button variant="contained" type="submit">
                            Añadir Periodo
                        </Button>

                    </DialogActions>
                </FormProvider >

            </Dialog>

        </>

    )
}
