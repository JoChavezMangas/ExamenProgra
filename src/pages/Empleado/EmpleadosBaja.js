import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
    Card,
    Button,
    Container,
    IconButton,
    TableContainer,
    Typography,
    MenuItem,
    Link,
    Tabs,
    Box,
    Tab,
    DialogContent,
    Grid,
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Dialog,
    DialogActions,
    DialogTitle
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import { _employeeList } from '../../_mock/arrays';
// components
import Iconify from '../../components/iconify';
import ConfirmDialog from '../../components/confirm-dialog';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
// import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';
import Label from '../../components/label';
import { CustomAvatar } from '../../components/custom-avatar';
import MenuPopover from '../../components/menu-popover';
import {
    HOST_API_LOCAL,
    END_POINT_BANDEJAEMPLEADOS,
    END_POINT_ELIMINAR_EMPLEADO,
    END_POINT_OBTENER_EMPLEADO,
    END_POINT_EDITAR_EMPLEADO,
    END_POINT_BANDEJAEMPLEADOS_EMPRESA,
    END_POINT_BORRAR_EMPLEADO,
    END_POINT_EMPLEADOS_BAJA,
    END_POINT_EMPLEADOS_REACTIVAR
} from '../../config-global';
import { AxiosEliminar, AxiosIdSucces } from '../../_Axios/AxiosFomr';
import BandejaEmpresaEmpleado from '../Empresa/BandejaEmpresaEmpleado';
import ModalBajaAlta from './ModalBajaAlta';
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';


export default function EmpleadosBajas() {
    const perfilUsuario = localStorage.getItem('RolId');
    const [tableData, setTableData] = useState(_employeeList);
    const [nombreCompleto, setNombreCompleto] = useState("");
    const [IdAUX, setIdAUX] = useState();
    const [openConfirm, setOpenConfirm] = useState(false);
    const [open, setOpen] = useState(false);
    const [quillSimple, setQuillSimple] = useState('');
    const [comentarios, setComentarios] = useState([{ id: 0, creadoPorNombre: '', fechaCreacion: '', datoAnterior: null, datoNuevo: '' }]);

    const handleClose = () => {
        setOpen(false);
    };
    const [editRowId, setEditRowId] = useState(null);

    const navigate = useNavigate();

    const handleEditRow = (id) => {
        navigate(PATH_DASHBOARD.empleado.edit(id));
    };

    const handleOpenConfirm = (id, nombreEmpleadoo) => {
        setIdAUX(id)
        setNombreCompleto(nombreEmpleadoo);
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const handleReactivarRow = (id) => {
        const reactivarRow = tableData.filter((row) => row.id !== id);
        setTableData(reactivarRow);
    };

    const { enqueueSnackbar } = useSnackbar();


    const onReactivar = async (id) => {
        try 
        {
            const enviarComentario = quillSimple.trim();

            if (!enviarComentario) {
                enqueueSnackbar("Debes ingresar un comentario", { variant: 'error' });
            } else {
            // const enviarComentario = quillSimple;
            const enviarId = id;
            const urlEndPoint = HOST_API_LOCAL + END_POINT_EMPLEADOS_REACTIVAR;
            const AUT = `Bearer ${localStorage.getItem('accessToken')}`;
            const empleadoActual = localStorage.getItem('EmpleadoId')

            axios({
                method: 'get',
                url: urlEndPoint,
                params: { Id: enviarId, comentario: enviarComentario, _contextEmpleadoId: empleadoActual },
                headers: { 'Authorization': AUT }
            })
            .then(response => {
                console.log('Respuesta', response)
                if (response.data.status === 'OK'){
                succesFunc()
                setOpenConfirm(false);

                }
                else{
                    enqueueSnackbar("Faltan datos", { variant: 'error' });
                }
            });
        } 
    }
        catch (error) 
        {
            console.error('el error en el axios es', error);
        }
    };

    

    const succesFunc = () => {
        enqueueSnackbar('El empleado fue reactivado')
        setRefreshAUX(new Date().getTime())
    }

    const JustAfterClicReactivar = () => {
        console.log('OTRO ID', IdAUX)
        handleReactivarRow(IdAUX);
        onReactivar(IdAUX);

    }



    useEffect(() => {



        AxiosIdSucces(IdAUX, "api/Empleado/HistorialEmpleadoporId", succesAxiosFunc)

        console.log('este id deberia de cambiar', IdAUX);

    }, [IdAUX]);

    const succesAxiosFunc = (param) => {

        console.log('el array en el frente', param)

        if (param.length > 0)
            setComentarios(param)
    }


    const [refreshAUX, setRefreshAUX] = useState('')
    const columns = [
        {
            field: 'nombreCompleto',
            headerName: 'Colaborador',
            width: 250,
            editable: false,
        },
        {
            field: 'fechaBaja',
            headerName: 'Fecha de Baja',
            width: 150,
            editable: false,
            renderCell: (params) => (<div>{params.row.fechaBaja.split(' ')[0]}</div>),
        },
        {
            field: 'comentario',
            headerName: 'Comentarios',
            editable: false,
            width: 200,
        },
        {
            field: 'action',
            headerName: 'Acciones',
            align: 'center',
            headerAlign: 'center',
            width: 200,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <Button color='secondary' onClick={(e) =>
                    handleOpenConfirm(
                        params.row.id,
                        params.row.nombreCompleto,
                    )}>
                    <Iconify icon="mdi:account-reactivate" />Reactivar Empleado
                </Button>),
        }
    ];

    
      
    return (
        <>
                <Card>
                <TableContainer sx={{ marginTop: '0px', position: 'relative', overflow: 'unset' }} style={{ width: '100%' }}>
                    <GenericDataGridCustom EndPoint={END_POINT_BANDEJAEMPLEADOS} columns={columns} refresh={refreshAUX} />
                </TableContainer>

                </Card>
                <Dialog open={openConfirm} onClose={handleCloseConfirm} maxWidth="sm" fullWidth>
                    <DialogTitle variant='h5' color='primary'>
                        Reactivar a :
                        {nombreCompleto}
                    </DialogTitle>
                    <DialogContent>
                        <br />
                        <DatePicker
                            disabled
                            label="Fecha"
                            inputFormat="dd/MM/yyyy"
                            renderInput={(paramst) => (
                                <TextField
                                    fullWidth
                                    {...paramst}
                                />
                            )}
                        />
                        <br/>
                        <Accordion sx={{ border: '1px solid #919EAB', background: 'rgba(243, 246, 249, 0.4)', borderRadius: '8px' }}>
                            <AccordionSummary
                                expandIcon={<GridExpandMoreIcon />}
                                aria-controls="panel1a-content"
                            >
                                Historial de comentarios
                            </AccordionSummary>
                            <AccordionDetails>
                            {comentarios.map((item) => (
                                <Comentarios key={item.id} Nombre={item.creadoPorNombre} Comentario={item.datoNuevo} Fecha={item.fechaCreacion} />
                                ))}
                            </AccordionDetails>
                        </Accordion>
                        <br />
                        <TextField
                            name="texto"
                            id="simple-editor"
                            label="Comentario*"
                            placeholder='Ingresa tu Comentario*'
                            multiline
                            maxRows={4}
                            fullWidth
                            value={quillSimple}
                            onChange={(value) => setQuillSimple(value.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color='error' onClick={handleCloseConfirm}>
                            Cerrar
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color='primary'
                            onClick={JustAfterClicReactivar}
                        >
                            Reactivar
                        </Button>
                    </DialogActions>
                </Dialog>

        </>
    );
}


Comentarios.prototype = {
    Nombre: PropTypes.string,
    Comentario: PropTypes.string,
    Fecha: PropTypes.string
};
function Comentarios({ Nombre, Comentario, Fecha }) {
    return (
        <Grid>
            <Grid container spacing={2}>
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
