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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
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
    END_POINT_BANDEJAEMPLEADOS_EN_BASE,
    END_POINT_CAMBIAR_PASS_MULTI
} from '../../config-global';
import { AxiosEliminar, AxiosMandarForm } from '../../_Axios/AxiosFomr';
import BandejaEmpresaEmpleado from '../Empresa/BandejaEmpresaEmpleado';
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';
import FormProvider, {
    RHFSelect,
    RHFTextField,
} from '../../components/hook-form';


export default function EmpleadosTotal() {
    const perfilUsuario = localStorage.getItem('RolId');
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openChangeConfirm, setOpenChangeConfirm] = useState(false);
    const [tableData, setTableData] = useState(_employeeList);
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [correo, setCorreo] = useState('');
    const [usuario, setUsuario] = useState('');
    const [IdAUX, setIdAUX] = useState();
    const [editRowId, setEditRowId] = useState(null);
    const [pass, setPas] = useState('')
    const [confirmPass, setconfirmPass] = useState('')

    const navigate = useNavigate();

    // console.log("RolId es ", perfilUsuario);

    const handleOpenConfirm = (id, nombreCompletoo) => {
        setIdAUX(id)
        setNombreCompleto(nombreCompletoo);
        setOpenConfirm(true);

    };
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const handleCloseChange = () => {
        setOpenChangeConfirm(false);
    };

    const handleEditRow = (id) => {
        // console.log(id)
        navigate(PATH_DASHBOARD.empleado.edit(id));
    };

    const handleDeleteRow = (id) => {
        const deleteRow = tableData.filter((row) => row.id !== id);
        setTableData(deleteRow);
        setOpenConfirm(false);
    };

    const handleChangePassword = (id, nombreEmpleado, nombreUsuario, correoEmpleado) => {
        setIdAUX(id);
        setNombreCompleto(nombreEmpleado);
        setOpenChangeConfirm(true);
        setCorreo(correoEmpleado);
        setUsuario(nombreUsuario);
        setPas("");
        setconfirmPass("");
    };

    const { enqueueSnackbar } = useSnackbar();

    const onDelete = async (id) => {
        try {
            await AxiosEliminar(END_POINT_BORRAR_EMPLEADO, id, succesFunc, enqueueSnackbar);;
        } catch (error) {
            console.error(error);
        }
    };

    const [refreshAUX, setRefreshAUX] = useState('')

    const succesFunc = () => {
        enqueueSnackbar('El empleado fue borrado')
        setRefreshAUX(new Date().getTime())
    }

    const JustAfterClicDelete = () => {
        // console.log('OTRO ID', IdAUX)
        handleDeleteRow(IdAUX);
        onDelete(IdAUX);
    }

    const JustAfterClicChange = () => {

        console.log("miauuu", IdAUX, pass, confirmPass)

        if (pass === confirmPass) {
            const form = new FormData();
            form.append("Id", IdAUX);
            form.append("Username", '...');
            form.append("Email", correo);
            form.append("Password", pass);
            form.append("ConfirmPassword", confirmPass);
            AxiosMandarForm(form, END_POINT_CAMBIAR_PASS_MULTI, metodoOk, metodoError)
        } else {
            enqueueSnackbar("las contraselñas no coinciden", { variant: 'error' });
        }

    }

    const metodoOk = (data) => {
        setOpenChangeConfirm(false);
        enqueueSnackbar(data)
    }
    const metodoError = (data) => {
        enqueueSnackbar(data, { variant: 'error' });
    }

    const methods = useForm();

    const columns = [
        {
            field: 'nombreCompleto',
            headerName: 'Colaborador',
            width: 250,
            editable: false,
            renderCell: (params) => (

                <Link
                    component="button"
                    fontSize='13px'
                    fontWeight='600'
                    color='#16463f'
                    onClick={() => handleEditRow(params.row.id)}
                >
                    {params.row.nombreCompleto}
                </Link>
            ),
        },
        {
            field: 'userName',
            headerName: 'Usuario',
            width: 280,
            editable: false,
            renderCell: (params) => (
                <>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleChangePassword(
                            params.row.id,
                            params.row.nombreCompleto,
                            params.row.userName,
                            params.row.correoEmpresarial)}
                    >
                        <Iconify icon="game-icons:key" />
                        {params.row.userName}
                    </Button>
                </>
            ),
        },
        {
            field: 'status',
            headerName: 'Estatus',
            width: 160,
            editable: false,
            renderCell: (params) => RenderEstatus(params.row.status)
        },
        {
            field: 'nombreEmpresa',
            headerName: 'Empresa',
            width: 150,
            editable: false,
        },
        {
            field: 'nombreArea',
            headerName: 'Área',
            editable: false,
            width: 200,
        },
        {
            field: 'nombreDepartamento',
            headerName: 'Departamento',
            editable: false,
            width: 200,
        },
        {
            field: 'nombrePuesto',
            headerName: 'Puesto',
            width: 200,
            editable: false,
        },
        {
            field: 'action',
            headerName: 'Acciones',
            align: 'center',
            headerAlign: 'center',
            width: 300,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <>

                    <Button
                        color="primary"
                        onClick={() => handleEditRow(params.row.id)}
                        sx={{ p: 1 }}
                    >
                        <Iconify icon="eva:edit-fill" />
                        Editar
                    </Button>
                    <Button color='error'
                        onClick={() => handleOpenConfirm(params.row.id, params.row.nombreCompleto)}>
                        <Iconify icon="eva:trash-2-outline" />
                        Borrar
                    </Button>

                </>
            ),
        },

    ];

    const columnsEmpresa = [
        // {
        //     field: 'avatar',
        //     headerName: '',
        //     align: 'center',
        //     headerAlign: 'center',
        //     width: 64,
        //     sortable: false,
        //     filterable: false,
        //     disableColumnMenu: true,
        //     renderCell: (params) => <CustomAvatar name={params.row.nombreCompleto} sx={{ width: 36, height: 36 }} />,
        // },
        {
            field: 'nombreCompleto',
            headerName: 'Colaborador',
            width: 250,
            editable: false,
            renderCell: (params) => (
                <Link
                    component="button"
                    fontSize='13px'
                    fontWeight='600'
                    color='#16463f'
                    onClick={() => handleEditRow(params.row.id)}
                >
                    {params.row.nombreCompleto}
                </Link>
            ),
        },
        {
            field: 'status',
            headerName: 'Estatus',
            width: 160,
            editable: false,
            // renderCell: (params) => RenderEstatus(params.row.status)
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
                <>
                    <Button
                        color="primary"
                        onClick={() => handleEditRow(params.row.id)}
                        sx={{ p: 1 }}
                    >
                        <Iconify icon="eva:edit-fill" />
                        Editar
                    </Button>
                    |
                    <Button color='error'
                        onClick={() => handleOpenConfirm(params.row.id, params.row.nombreCompleto)}>
                        <Iconify icon="eva:trash-2-outline" />
                        Borrar
                    </Button>

                </>
            ),
        },
        {
            field: 'nombreArea',
            headerName: 'Área',
            width: 200,
            editable: false,
            disableExtendRowFullWidth: true,
        },
        {
            field: 'nombreDepartamento',
            headerName: 'Departamento',
            width: 200,
            editable: false,
            disableExtendRowFullWidth: true,
        },
        {
            field: 'puesto',
            headerName: 'Puesto',
            width: 220,
            editable: false,
            renderCell: (params) => (
                <Typography variant="body2" noWrap>
                    {params.row.nombrePuesto}
                </Typography>
            ),
        },
    ];

    const columnsPerfiles = [
        {
            field: 'avatar',
            headerName: '',
            align: 'center',
            headerAlign: 'center',
            width: 64,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => <CustomAvatar name={params.row.nombreCompleto} sx={{ width: 36, height: 36 }} />,
        },
        {
            field: 'nombreCompleto',
            headerName: 'Colaborador',
            width: 250,
            editable: false,
            renderCell: (params) => (
                <Link
                    component="button"
                    fontSize='13px'
                    fontWeight='600'
                    color='#16463f'
                    onClick={() => handleEditRow(params.row.id)}
                >
                    {params.row.nombreCompleto}
                </Link>
            ),
        },
        {
            field: 'nombreEmpresa',
            headerName: 'Empresa',
            width: 150,
            editable: false,
        },
        {
            field: 'areaDepartamento',
            headerName: 'Área',
            editable: false,
            width: 200,
        },
        {
            field: 'nombreDepartamento',
            headerName: 'Departamento',
            editable: false,
            width: 200,
        },
        {
            field: 'nombrePuesto',
            headerName: 'Puesto',
            width: 200,
            editable: false,
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
                <>
                    <Button
                        color="primary"
                        onClick={() => handleEditRow(params.row.id)}
                        sx={{ p: 1 }}
                    >
                        <Iconify icon="eva:edit-fill" />
                        Editar
                    </Button>
                    |
                    <Button color='error'
                        onClick={() => handleOpenConfirm(params.row.id, params.row.nombreCompleto)}>
                        <Iconify icon="eva:trash-2-outline" />
                        Borrar
                    </Button>

                </>
            ),
        },
    ];







    return (
        <>
            <Card>
                <TableContainer sx={{ marginTop: '0px', position: 'relative', overflow: 'unset' }} style={{ width: '100%' }}>
                    {perfilUsuario === 'Admin' && (
                        <>
                            <GenericDataGridCustom EndPoint={END_POINT_BANDEJAEMPLEADOS_EN_BASE} columns={columns} refresh={refreshAUX} />
                        </>
                    )}
                    {perfilUsuario === 'RecursosHumanos' && (
                        <>
                            <GenericDataGridCustom EndPoint={END_POINT_BANDEJAEMPLEADOS_EN_BASE} columns={columns} refresh={refreshAUX} />
                        </>
                    )}
                    {perfilUsuario === 'RHEmpresa' && (
                        <>
                            <GenericDataGridCustom EndPoint={END_POINT_BANDEJAEMPLEADOS_EMPRESA} columns={columnsEmpresa} refresh={refreshAUX} />
                        </>
                    )}
                    {perfilUsuario === 'RHPerfiles' && (
                        <>
                            <GenericDataGridCustom EndPoint={END_POINT_BANDEJAEMPLEADOS_EN_BASE} columns={columnsPerfiles} refresh={refreshAUX} />
                        </>
                    )}
                </TableContainer>
            </Card>

            <Dialog
                open={openChangeConfirm}
                onClose={handleCloseChange}
                fullWidth
            >
                <DialogTitle color="primary">Cambiar Contraseña de {nombreCompleto}</DialogTitle>
                <br />
                { /* <FormProvider methods={methods} > */}
                <DialogContent>
                    <Box
                        rowGap={3}
                        columnGap={3}
                        display="grid"
                        sx={{ p: 1 }}
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                        }}
                    >
                        <TextField label="Usuario" value={usuario} disabled />
                        <TextField label="Correo institucional" value={correo} disabled />
                        <TextField type='password' value={pass} onChange={(e) => setPas(e.target.value)} label="Nueva contraseña" />
                        <TextField type='password' value={confirmPass} onChange={(e) => setconfirmPass(e.target.value)} label="Confirmar contraseña" />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="error" onClick={handleCloseChange}>
                        Cancelar
                    </Button>
                    <Button variant="contained" color="primary" onClick={JustAfterClicChange}>
                        Cambiar Contraseña
                    </Button>
                </DialogActions>
                { /* </FormProvider> */}
            </Dialog>
        </>
    );
}

// export function RenderModal(emleadoId, usuario) {


//    <Link
//        component="button"
//        fontSize='13px'
//        fontWeight='600'
//        color='#16463f'
//        onClick={() => handleChangePassword(params.row.id)}
//    >
//        modal

//    </Link>
// }

export function RenderEstatus(status) {

    // console.log("estatus", status);

    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    const param = status;

    let resultBaja

    if (param.includes('#Baja'))
        resultBaja = <Label variant={isLight ? 'soft' : 'filled'} color="error" sx={{ mx: 'auto', marginLeft: .5, }}>#Baja</Label>;
    else
        resultBaja = <Label variant={isLight ? 'soft' : 'filled'} color="primary" sx={{ mx: 'auto', marginLeft: .5, }}>#Activo</Label>;

    const result = <div>{resultBaja}</div>

    return (
        result
    );
}


