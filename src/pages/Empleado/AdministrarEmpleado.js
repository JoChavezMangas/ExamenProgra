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
    Stack
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import axios from 'axios';

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
    END_POINT_BORRAR_EMPLEADO,
    END_POINT_BANDEJAEMPLEADOS_EN_BASE,
    END_POINT_EMPLEADOS_REACTIVAR,
    END_POINT_REACTIVAR_EMPLEADO,
    END_POINT_INACTIVAR_EMPLEADO,
} from '../../config-global';
import { AxiosEliminar } from '../../_Axios/AxiosFomr';
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';


export default function AdministrarEmpleados() {



    const perfilUsuario = localStorage.getItem('RolId');
    const [openConfirm, setOpenConfirm] = useState(false);
    const [tableData, setTableData] = useState(_employeeList);
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [IdAUX, setIdAUX] = useState();
    const [editRowId, setEditRowId] = useState(null);
    const [action, setAction] = useState(''); // Agrega esta líne;
    // const [activo, setActivo] = useState('');
    const navigate = useNavigate();

    console.log("RolId es ", perfilUsuario);

    // console.log("ACTIVOS", activo);

    const handleOpenConfirm = (id, nombreCompletoo, actionType) => {
        setIdAUX(id)
        setNombreCompleto(nombreCompletoo);
        setAction(actionType);
        setOpenConfirm(true);
    };
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };
    const handleEditRow = (id) => {
        console.log(id)
        navigate(PATH_DASHBOARD.empleado.edit(id));
    };

    const handleDeleteRow = (id) => {
        const deleteRow = tableData.filter((row) => row.id !== id);
        setTableData(deleteRow);
        setOpenConfirm(false);
    };

    const handleDarBajaRow = (id) => {
        const darBajaRow = tableData.filter((row) => row.id !== id);
        setTableData(darBajaRow);
        setOpenConfirm(false);
    };

    const { enqueueSnackbar } = useSnackbar();

    const onDelete = async (id) => {
        try {
            await AxiosEliminar(END_POINT_BORRAR_EMPLEADO, id, succesFunc, enqueueSnackbar);
            enqueueSnackbar('Empleado borrado satisfactoriamente', { variant: 'error' });
        } catch (error) {
            console.error(error);
        }
    };

    const onDarBaja = async (id) => {
        try {
            await AxiosEliminar(END_POINT_INACTIVAR_EMPLEADO, id, succesFunc, enqueueSnackbar);
            enqueueSnackbar('Empleado inactivado satisfactoriamente', { variant: 'warning' });
        } catch (error) {
            console.error(error);
        }
    };

    const onReactivar = async (id) => {
        try {
            await AxiosEliminar(END_POINT_EMPLEADOS_REACTIVAR, id, succesFunc, enqueueSnackbar);
            enqueueSnackbar('Empleado reactivado satisfactoriamente', { variant: 'success' });
        } catch (error) {
            console.error(error);
        }
    };

    const [refreshAUX, setRefreshAUX] = useState('')

    const succesFunc = () => {
        // enqueueSnackbar()
        setRefreshAUX(new Date().getTime())
    }

    const JustAfterClicDelete = () => {
        console.log('OTRO ID', IdAUX)
        handleDeleteRow(IdAUX);
        onDelete(IdAUX);
    }
    const JustAfterClicReacctivar = () => {
        console.log('OTRO ID', IdAUX)
        handleDeleteRow(IdAUX);
        onReactivar(IdAUX);
    }
    const JustAfterClicDarBaja = () => {
        console.log('OTRO ID', IdAUX)
        handleDeleteRow(IdAUX);
        onDarBaja(IdAUX);
    }
    let boton;

    const columns = [
        {
            field: 'avatar',
            headerName: '',
            align: 'center',
            headerAlign: 'center',
            width: 60,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => <CustomAvatar name={params.row.nombreCompleto} sx={{ width: 30, height: 30 }} />,
        },
        {
            field: 'nombreCompleto',
            headerName: 'Colaborador',
            flex: 1,
            editable: false,
            width: 300,
            renderCell: (params) => {
                let color = '#16463f';
                let pointerEvents = 'auto';

                if (params.row.status === '#Activo' || params.row.status === 'empty') {
                    color = '#16463f';
                } else if (params.row.status === '#Baja') {
                    color = 'grey';
                    pointerEvents = 'none';
                }

                return (
                    <Link
                        component="button"
                        fontSize='13px'
                        fontWeight='500'
                        onClick={() => handleEditRow(params.row.id)}
                        color={color}
                        style={{ pointerEvents }}
                    >
                        {params.row.nombreCompleto}
                    </Link>
                );
            }
        },    
        {
            field: 'areaDepartamento',
            headerName: 'Área',
            editable: false,
            width: 160,
            renderCell: (params) => RenderEmpresaAreaDepto(params.row.nombreEmpresa, params.row.nombreArea, '', params.row),
        },
        {
            field: 'puesto',
            headerName: 'Puesto',
            width: 180,
            editable: false,
            renderCell: (params) => (
                <Typography variant="body2" noWrap>
                    {params.row.nombrePuesto}
                </Typography>
            ),
        },
        // {
        //     field: 'status',
        //     headerName: 'Estatus',
        //     width: 160,
        //     editable: false,
        //     renderCell: (params) => RenderEstatus(params.row.status)
        // },
        {
            field: 'action',
            headerName: 'Acciones',
            align: 'center',
            headerAlign: 'center',
            width: 550,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const buttons = [
                    <Button color='secondary' onClick={() => handleEditRow(params.row.id)}>
                        <Iconify icon="formkit:password" />
                        Cambiar Contraseña
                    </Button>,
                    <Button color='error' onClick={() => handleOpenConfirm(params.row.id, params.row.nombreCompleto, 'borrar')}>
                        <Iconify icon="eva:trash-2-outline" />
                        Borrar
                    </Button>
                ];
            
                if (params.row.status === '#Activo' || params.row.status === 'empty') {
                    buttons.push(
                        <Button color='warning' onClick={() => handleOpenConfirm(params.row.id, params.row.nombreCompleto, 'darBaja')}>
                            <Iconify icon="material-symbols:block" />
                            Inactivar
                        </Button>
                    );
                } else if (params.row.status === '#Baja') {
                    buttons.push(
                        <Button color='primary' onClick={() => handleOpenConfirm(params.row.id, params.row.nombreCompleto, 'reactivar')}>
                            <Iconify icon="gg:unblock" />
                            Reactivar
                        </Button>
                    );
                }
            
                return <>{buttons}</>;
            },
            
        },
    ];

    let dialogTitle = '';
    let dialogContent = '';
    let actionC = '';

    if (action === 'reactivar') {
        dialogTitle = 'Reactivar';
        dialogContent = `¿Desea reactivar a ${nombreCompleto}?`;
        actionC =
            (<Button variant="contained" color="primary" onClick={JustAfterClicReacctivar}>
                Reactivar
            </Button>)
    } else if (action === 'darBaja') {
        dialogTitle = 'Inactivar cuenta';
        dialogContent = `¿Desea inactivar la cuenta de ${nombreCompleto}?`;
        actionC =
            (<Button variant="contained" color="warning" onClick={JustAfterClicDarBaja}>
                Inactivar
            </Button>)
    } else if (action === 'borrar') {
        dialogTitle = 'Borrar';
        dialogContent = `¿Desea borrar a ${nombreCompleto}?`;
        actionC =
            (<Button variant="contained" color="error" onClick={JustAfterClicDelete}>
                Borrar
            </Button>)
    }

    return (
        <>
            <Helmet>
                <title> Empleado </title>
            </Helmet>

            <Container>

                <CustomBreadcrumbs
                    heading={
                        <>Empleado</>
                    }
                    links={[{ name: '' },]}

                />


                <Card>
                    <TableContainer sx={{ marginTop: '0px', position: 'relative', overflow: 'unset', }}
                        style={{ width: '100%' }}>
                        <GenericDataGridCustom EndPoint={END_POINT_BANDEJAEMPLEADOS_EN_BASE} columns={columns} refresh={refreshAUX} />
                    </TableContainer>
                </Card>
            </Container>

            <ConfirmDialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                title={dialogTitle}
                content={dialogContent}
                action={actionC}
            />

        </>
    );
}




export function RenderEstatus(estatus) {

    console.log("estatus", estatus);

    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    const param = estatus;

    let resultBorrado

    if (param.includes('#Borrado'))
        resultBorrado = <Label variant={isLight ? 'soft' : 'filled'} color="error" sx={{ mx: 'auto', marginLeft: .5, }}>#Borrado</Label>;
    else
        resultBorrado = <></>;

    let resultInactivo

    if (param.includes('#Inactivo'))
        resultInactivo = <Label variant={isLight ? 'soft' : 'filled'} color="warning" sx={{ mx: 'auto', marginLeft: .5, }}>#Inactivo</Label>;
    else
        resultInactivo = <></>;

    const result = <div>{resultBorrado}{resultInactivo}</div>

    return (
        result
    );
}

function RenderEmpresaAreaDepto(empresa, area, dpto, toshow) {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';
    let result;
    console.log('Mostrar', toshow);

    if (dpto !== '') {

        result = (
            <a>
                <Label
                    variant={isLight ? 'soft' : 'filled'}
                    color='secondary'
                    sx={{ mx: 'auto' }}
                >
                    {area}
                </Label>
                <Label
                    variant={isLight ? 'soft' : 'filled'}
                    color='success'
                    sx={{ mx: 'auto' }}
                >
                    {dpto}
                </Label>
            </a>
        );




    } else {
        result = (
            <a>
                <Label
                    variant={isLight ? 'soft' : 'filled'}
                    color='secondary'
                    sx={{ mx: 'auto' }}
                >
                    {area}
                </Label>
            </a>
        );
    }

    return (
        <>
            {result}
        </>
    )
}