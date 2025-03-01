import * as React from 'react';
import { AppBar, Avatar, Box, Button, Card, Dialog, Divider, Grid, IconButton, List, Toolbar, Typography } from "@mui/material";
import axios from 'axios';
import PropTypes from 'prop-types';
import Iconify from '../../components/iconify/Iconify';
import { CloseIcon } from '../../theme/overrides/CustomIcons';
import { HOST_API_LOCAL, END_POINT_HISTORIAL_BALANCE, END_POINT_TABLEROS_MIS_SOLICITUDES } from '../../config-global';
import DialogEditarSolicitud from './EdicionSolicitud';
import { RenderPeriodo, RenderStatus, RendertipoPeticion } from './MetodosAUX';
import BalanceHistorial from './BalanceHistorial';
import BalancePeticionEspecial from './BalancePeticionEspecial';
import ModalEspeciales from './ModalEspeciales';




export default function BalancePeriodos() {

    const [arrayEmpelados, setArrayEmpleados] = React.useState([])
    const perfilUsuario = localStorage.getItem('RolId');

    React.useEffect(() => {

        function ObtenerEmpleados() {
            const urlEndPoint = HOST_API_LOCAL + END_POINT_HISTORIAL_BALANCE;
            const AUT = `Bearer ${localStorage.getItem('accessToken')}`;
            const lider = localStorage.getItem('EmpleadoId');
            axios({
                method: 'get',
                url: urlEndPoint,
                params: { liderId: lider },
                headers: { 'Authorization': AUT }
            }).then(response => {
                console.log('este es el response de axios', response.data)
                setArrayEmpleados(response.data)
            }).catch(() => {
                // result = "Error";
            })
        }
        ObtenerEmpleados()
    }, [])


console.log('este es el rol', perfilUsuario);

    return (
        <Grid container spacing={3}>

        {perfilUsuario === 'Gerente' ?(
            <>
            {arrayEmpelados.map((item) => (
                <Grid item xs={12} md={4}>
                    <TarjetaBalance
                        key={item.id}
                        Nombre={item.empleadoNombre}
                        VacacionesTotal={item.vacacionesDisponibles}
                        VacacionesActuales={item.vacacionesActuales}
                        VacacionesAnteriores={item.vacacionesAnteriores}
                        Personales={item.personalesDisponibles}
                        Puesto={item.empleadoPuesto}
                        EmpleadoId={item.empleadoId}
                    />
                </Grid>
            ))}
            </>
        ):

            <Grid item xs={12} md={12}>
                <Typography color='text.disabled'> No existen colaboradores disponiles para este perfil</Typography>
            </Grid>

        }
        </Grid>

    )
}


TarjetaBalance.prototype = {
    Nombre: PropTypes.string,
    VacacionesTotal: PropTypes.string,
    VacacionesActuales: PropTypes.string,
    VacacionesAnteriores: PropTypes.string,
    Personales: PropTypes.string,
    Puesto: PropTypes.string,
    EmpleadoId: PropTypes.string
};

function TarjetaBalance({ Nombre, VacacionesTotal, VacacionesActuales, VacacionesAnteriores, Personales, Puesto, EmpleadoId }) {

    console.log('este es el empleadoId', EmpleadoId)

    const [refreshAUX, setRefreshAUX] = React.useState("");
    return (
        <>
            <Card sx={{ p: 2, }}>
                <Grid container spacing={1}>
                    <Grid item md={2} sx={{ pr: 3 }}>
                        {Nombre}
                    </Grid>
                    <Grid item md={10}>
                        <Typography variant='subtitle1' color='primary'>{Nombre} </Typography>
                        <Box sx={{ display: 'flex' }}>
                            <Typography variant='subtitle2'>Puesto:&nbsp;</Typography><Typography variant='body2'>{Puesto}</Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ paddingTop: 2 }} />
                <Grid container spacing={2} sx={{ paddingTop: 2 }}>
                    <Grid item md={10}>
                        <Typography variant='subtitle' color='#007B55'>Vacaciones totales: &nbsp; </Typography>
                    </Grid>
                    <Grid item md={2}>
                        <Typography variant='subtitle' color='primary'>{VacacionesTotal}</Typography>
                    </Grid>
                </Grid>


                {
                    VacacionesAnteriores === 0 ?
                        <Grid item sx={{ height: 0, with: 0 }}>&nbsp;</Grid>
                        :

                        <Grid container spacing={2} display='flex'>
                            <Grid item md={10}>
                                <Typography variant='body2'>
                                    Días de periodos anteriores: &nbsp;
                                </Typography>
                            </Grid>
                            <Grid item md={2}>
                                <Typography variant='subtitle2' >{VacacionesAnteriores}</Typography>
                            </Grid>
                        </Grid>
                }


                <Grid container spacing={2} >
                    <Grid item md={10}>
                        <Typography variant='body2'>Días del período actual: &nbsp; </Typography>
                    </Grid>
                    <Grid item md={2}>
                        <Typography variant='subtitle2' >{VacacionesActuales}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ paddingTop: 3 }}>
                    <Grid item md={10}>
                        <Typography variant='subtitle' color='#007B55'>Días personales:&nbsp;</Typography>
                    </Grid>
                    <Grid item md={2}>
                        <Typography variant='subtitle' color='primary' >{Personales}</Typography>
                    </Grid>
                </Grid>

                <Grid container sx={{ paddingTop: 3 }} spacing={1}>
                    <Grid item xs={7} md={7}>
                        <BalancePeticionEspecial EmpleaodoId={EmpleadoId} NombreEmpleado={Nombre} />
                    </Grid>
                    <Grid item xs={5} md={5}>
                        <BalanceHistorial EmpleadoId={EmpleadoId} Nombre={Nombre} />
                    </Grid>
                </Grid>

            </Card>

        </>
    )
}



