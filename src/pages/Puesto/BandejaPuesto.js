import { Helmet } from 'react-helmet-async';
// import { paramCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
    Card,
    Button,
    // Divider,
    Container,
    IconButton,
    TableContainer,
    Typography,
    MenuItem,
    Link,
    ClickAwayListener,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
// routes
import { paramCase } from 'change-case';
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
// import { _userList, _companyList } from '../../_mock/arrays';
import { _puestoList } from '../../_mock/arrays';
// components
import Iconify from '../../components/iconify';
import ConfirmDialog from '../../components/confirm-dialog';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
// import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';
import { CustomAvatar } from '../../components/custom-avatar';
import Label from '../../components/label';
import MenuPopover from '../../components/menu-popover';
import { END_POINT_BANDEJA_PUESTO, END_POINT_BANDEJA_PUESTO_EMPRESA, END_POINT_BORRAR_PUESTO } from '../../config-global';
import { AxiosEliminar } from '../../_Axios/AxiosFomr';
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';




export default function BandejaPuesto() {
    const perfilUsuario = localStorage.getItem('RolId');
    const [openConfirm, setOpenConfirm] = useState(false);
    const [tableData, setTableData] = useState(_puestoList);
    const [nombre, setNombrePuesto] =useState ('');
    const [IdAUX, setIdAUX] = useState('');

    const navigate = useNavigate();

    const handleOpenConfirm = (id, nombrePuesto) => {
        setIdAUX(id);
        setNombrePuesto(nombrePuesto);
        setOpenConfirm(true);
    };
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const handleEditRow = (id) => {
        console.log(id)
        navigate(PATH_DASHBOARD.puesto.edit(id));
    };
    const JustAfterClicDelete = () => {
        handleDeleteRow(IdAUX);
        onDelete(IdAUX);
    }
    const handleDeleteRow = (id) => {
        const deleteRow = tableData.filter((row) => row.id !== id);
        setTableData(deleteRow);
        setOpenConfirm(false);
    };

    const { enqueueSnackbar } = useSnackbar();
    const onDelete = async (id) => {
        try {
            await AxiosEliminar(END_POINT_BORRAR_PUESTO, id, succesFunc , enqueueSnackbar);;
        } catch (error) {
            console.error(error);
        }
    };

    const succesFunc = () => {
        enqueueSnackbar('El puesto fue borrado')
        setRefreshAUX(new Date().getTime())
    }

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [refreshAUX, setRefreshAUX]=useState('')

    const columns = [
        {
            field: 'avatar',
            headerName: '',
            align: 'center',
            headerAlign: 'center',
            width: 64,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => <CustomAvatar name={params.row.nombre} sx={{ width: 36, height: 36 }} />,
        },
        {
            field: 'nombre',
            headerName: 'Puesto',
            width:300,
            editable: false,
            renderCell: (params) => (
                <Link
                    component="button"
                    fontSize='13px'
                    fontWeight='600'
                    color='#16463f'
                    onClick={() => handleEditRow(params.row.id)}
                >
                    {params.row.nombre}
                </Link>
            ),
        },
        {
            field: 'nombreDepartamento',
            headerName: 'Departamento',
            editable: false,
            width:230,
            // renderCell: (params) => RenderStatus(params.row.nombreDepartamento, params.row),
        },
        {
            field: 'nombreArea',
            headerName: 'Área',
            flex: 1,
            editable: false,
        },
        {
            field: 'nombreEmpresa',
            headerName: 'Empresa',
            flex: 1,
            editable: false,
        },
        {
            field: 'action',
            headerName: 'Acciones',
            headerAlign:'center',
            align: 'center',
            width:200,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <>
                    {/* <IconButton color={openPopover ? 'inherit' : 'default'} onClick={(e) => handleOpenPopover(e, params.row.id)}>
                    <Iconify icon="eva:more-vertical-fill" />
                </IconButton> */}
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
                        onClick={() => handleOpenConfirm(params.row.id, params.row.nombre)}>
                        <Iconify icon="eva:trash-2-outline" />
                        Borrar
                    </Button>
                </>
            ),
        },
    ];

    return (
        <>
            <Helmet>
                <title> Puesto </title>
            </Helmet>

            {/* <Container> */}

                <CustomBreadcrumbs
                    heading={
                        <Typography variant='h4' color='primary'>Puesto</Typography>
                    }
                    links={[
                        { name: '' },
                    ]}
                    action={
                        <Button
                            component={RouterLink}
                            to={PATH_DASHBOARD.puesto.new}
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill" />}
                        >
                            Crear Puesto
                        </Button>
                    }
                />



                <Card>
                    <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                        {perfilUsuario === 'RecursosHumanos' ? (
                            <GenericDataGridCustom EndPoint={END_POINT_BANDEJA_PUESTO} columns={columns} refresh={refreshAUX} />
                        ) :
                            <GenericDataGridCustom EndPoint={END_POINT_BANDEJA_PUESTO} columns={columns} refresh={refreshAUX} />
                        }
                    </TableContainer>
                </Card>
            {/* </Container> */}

            <ConfirmDialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                title="Borrar"
                content={`¿Deseas borrar el puesto de ${nombre}?`}
                action={
                    <Button variant="contained" color="error" onClick={JustAfterClicDelete}>
                        Borrar
                    </Button>
                }
            />

        </>
    );
}


function RenderStatus(getStatus, toshow) {
    console.log(toshow)
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';
    return (
        <Label
            variant={isLight ? 'soft' : 'filled'}
            color={(getStatus === 'Bloqueado' && 'error') || (getStatus === 'Inactivo' && 'warning') || 'success'}
            sx={{ mx: 'auto' }}
        >
            {getStatus}
        </Label>
    );
}

function RenderEmpresaArea(empresa, area) {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';
    return (
        <a>

            <Label
                variant={isLight ? 'soft' : 'filled'}
                color='success'
                sx={{ mx: 'auto' }}
            >
                {empresa}
            </Label>

            <Label
                variant={isLight ? 'soft' : 'filled'}
                color='info'
                sx={{ mx: 'auto' }}
            >
                {area}
            </Label>
        </a>
    );
}


