import * as React from 'react';
// @mui
import {
    Card,
    Button,
    Container,
    TableContainer,
    Typography,
    DialogActions,
    TextField,
    Grid,
    DialogContent,
    Dialog,
    DialogTitle,
    DialogContentText,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Controller, FormProvider } from 'react-hook-form';
// routes
// components
import Iconify from '../../components/iconify';

// sections
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';
import Label from '../../components/label';
import { GenericFileInput } from '../../utils/GenericFileInput';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';



// Aquí comienza el botón para re abririr el dialog de días especiales
export default function DialogSolicitud() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            {/* Dibujo del botón para solicitudes */}
            <Button color='default' onClick={handleClickOpen}>
                <Iconify icon="eva:more-vertical-fill" />
            </Button>

            {/* Aquí comienza el dialog form para la solicitud */}
            <Dialog  open={open}
                onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle variant='h5' color='primary'>Empleado</DialogTitle>
                <FormProvider>
                    <DialogContent>
                        <DialogContentText sx={{ pb: 3 }}>
                            Por favor, selecciona las fechas
                        </DialogContentText>
                        <Grid container spacing={3} sx={{ pb: 3 }}>
                            <Grid item xs={6} md={4}>
                                <Controller
                                    name="fechaInicio"
                                    render={({ field, fieldState: { error } }) => (
                                        <LocalizationProvider locale={es} dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            {...field}
                                            label="Fecha de Inicio"
                                            inputFormat="dd/MM/yyyy"
                                            renderInput={(params) => (
                                                <TextField
                                                    fullWidth
                                                    {...params}
                                                    error={!!error}
                                                    helperText={error?.message}
                                                />
                                            )}
                                        />
                                        </LocalizationProvider>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <Controller
                                    name="fechaFin"
                                    render={({ field, fieldState: { error } }) => (
                                        <DatePicker
                                            {...field}
                                            label="Fecha de Fin"
                                            inputFormat="dd/MM/yyyy"
                                            renderInput={(params) => (
                                                <TextField
                                                    fullWidth
                                                    {...params}
                                                    error={!!error}
                                                    helperText={error?.message}
                                                />
                                            )}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>

                        <TextField
                            name="comentario"
                            // id="simple-editor"
                            label="Comentario"
                            placeholder='Ingresa tu Comentario'
                            multiline
                            maxRows={4}
                            fullWidth
                        />
                        <GenericFileInput
                            // files={files}
                            // onDrop={handleDropMultiFile}
                            name="archivo"
                            sx={{ border: 1, width: 1, height: 40 }}
                            // onRemove={handleRemoveFile}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="outlined" color='error'>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained">
                            Solicitar
                        </Button>
                    </DialogActions>
                </FormProvider>
            </Dialog>

        </>
    );
}