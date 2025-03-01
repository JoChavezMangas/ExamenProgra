import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Card, Typography, AccordionDetails, Accordion, AccordionSummary, ClickAwayListener, Stack, Box } from '@mui/material';
import axios from 'axios';
import { HOST_API_LOCAL, END_POINT_HISTORIAL_EMPLEADO } from '../../config-global';
import Iconify from '../../components/iconify';



HistorialEmpleado.prototype = {
    empleadoId: PropTypes.string,
};
export default function HistorialEmpleado({empleadoId}) {

    const [historialEmpleado, setHistorialEmpleado] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [creadoPorNombre, setCreadoPorNombre] = useState();
    const [datoNuevo, setDatoNuevo] = useState();
    const [fechaCreacion, setFechaCreacion] = useState();
    
    useEffect(() => {
        function ObtenerEmpleados() {
            const urlEndPoint = HOST_API_LOCAL + END_POINT_HISTORIAL_EMPLEADO;
            const AUT = `Bearer ${localStorage.getItem('accessToken')}`;
            const historialId = empleadoId;
            console.log("AQUI HAY UN DATO", historialId);
            axios({
                method: 'get',
                url: urlEndPoint,
                params: { Id: historialId },
                headers: { 'Authorization': AUT }
            })
                .then(response => {
                    console.log('un axios', response.data);
                    setHistorialEmpleado(response.data);

                })
                .catch((error) => {
                    console.log('el error en el axios es', error);
                });
        }

        if (empleadoId > 0) {
            ObtenerEmpleados();
        }
        
    }, [empleadoId]);

    return (
        <Card>
            <ClickAwayListener onClickAway={() => setExpanded(false)}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<Iconify icon="iconamoon:arrow-down-2" />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{
                            backgroundColor: expanded === 'panel1' ? 'white' : 'rgba(0, 171, 85, 0.08)', // Change the colors as needed
                            '&:hover': {
                                backgroundColor: 'rgba(0, 171, 85, 0.08)', // Change the hover color as needed
                            },
                        }}
                    >
                        <Typography style={{ fontWeight: expanded === 'panel1' ? 'bold' : '700', color: expanded === 'panel1' ? '#1f9382' : '#16463f' }}>
                            Historial del Empleado
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                        <Box
                            rowGap={3}
                            columnGap={2}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(3, 1fr)',
                            }}
                        >
                            {historialEmpleado.map((item, index) => (
                                <Card sx={{ padding: 4, }} key={index}>
                                    <Typography >Creado por: {item.creadoPorNombre}</Typography>
                                    <Typography >Descripción: {item.datoNuevo}</Typography>
                                    <Typography >Fecha: {item.fechaCreacion}</Typography>
                                </Card>
                            ))}
                        </Box>

                    </AccordionDetails>
                </Accordion>
            </ClickAwayListener>
        </Card>
    );

}
