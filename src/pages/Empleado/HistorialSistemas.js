import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Card, Typography, AccordionDetails, Accordion, AccordionSummary, ClickAwayListener, Stack, Box } from '@mui/material';
import axios from 'axios';
import { HOST_API_LOCAL, END_POINT_HISTORIAL_EMPLEADO } from '../../config-global';
import Iconify from '../../components/iconify';
import { AxiosObtenerDatosExternoUsuario } from '../../_Axios/AxiosFomr';



HistorialSistemas.prototype = {
    empleadoId: PropTypes.string,
    empleadoExternoId: PropTypes.string,
};
export default function HistorialSistemas({ empleadoId, empleadoExternoId }) {

    console.log('hipotesis', empleadoId, empleadoExternoId)

    const [historialEmpleado, setHistorialEmpleado] = useState([]);
    const [testigoDeCarga, setTestigo] = useState(0);

    useEffect(() => {
        if (empleadoId > 0 && testigoDeCarga <= 0) {
            AxiosObtenerDatosExternoUsuario("api/Resuelveme/GetUserData", empleadoExternoId, succesResuelveme, () => { });
            setTestigo(1);
        }
    }, [testigoDeCarga, empleadoId, empleadoExternoId]);


    const succesResuelveme = (param) => {
        console.log('succes de Resuelveme en el modal111',param);
    }


    return (

        <Box
            mt={4}
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
            }}
        >
             <Card sx={{ padding: 4, }} >
                        <Typography >Sistema: SISEC</Typography>
                        <Typography >Rol: CUENTA MAESTRA</Typography>
                        <Typography >Otros Datos: OTROS DATOS</Typography>
            </Card> 
            <Card sx={{ padding: 4, }} >
                <Typography >Sistema: SISEC</Typography>
                <Typography >Rol: CUENTA MAESTRA</Typography>
                <Typography >Otros Datos: OTROS DATOS</Typography>
            </Card> 
            <Card sx={{ padding: 4, }} >
                <Typography >Sistema: SISEC</Typography>
                <Typography >Rol: CUENTA MAESTRA</Typography>
                <Typography >Otros Datos: OTROS DATOS</Typography>
            </Card> 
            <Card sx={{ padding: 4, }} >
                <Typography >Sistema: SISEC</Typography>
                <Typography >Rol: CUENTA MAESTRA</Typography>
                <Typography >Otros Datos: OTROS DATOS</Typography>
            </Card> 


            {historialEmpleado.map((item, index) => (
                <Card sx={{ padding: 4, }} key={index}>
                    <Typography >Sistema: {item.creadoPorNombre}</Typography>
                    <Typography >Rol: {item.datoNuevo}</Typography>
                    <Typography >Otros Datos: {item.fechaCreacion}</Typography>
                </Card>
            ))}
        </Box>

    );

}
