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
    Accordion,
    AccordionSummary,
    AccordionDetails,
    ClickAwayListener,
    Link
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
// routes
import { paramCase } from 'change-case';
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
// import { _userList, _companyList } from '../../_mock/arrays';
import { _areaList } from '../../_mock/arrays';
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
    END_POINT_BANDEJA_AREA,
    END_POINT_BANDEJA_AREA_EMPRESA,
    END_POINT_OBTENER_AREA,
    END_POINT_BORRAR_AREA
} from '../../config-global';
import { AxiosEliminar } from '../../_Axios/AxiosFomr';
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';




export default function BandejaArea() {
    const perfilUsuario = localStorage.getItem('RolId');

    const [openConfirm, setOpenConfirm] = useState(false);
    const [tableData, setTableData] = useState(_areaList);
    const [nombre, setNombreArea] = useState('');
    const [IdAUX, setIdAUX] = useState('');

    const navigate = useNavigate();
    
    const handleOpenConfirm = (id, nombreArea) => {
        setIdAUX(id);
        setNombreArea(nombreArea);
        setOpenConfirm(true);
    };
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const handleEditRow = (id) => {
        console.log(id)
        navigate(PATH_DASHBOARD.area.edit(id));
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
            await AxiosEliminar(END_POINT_BORRAR_AREA, id, succesFunc, enqueueSnackbar);;
        } catch (error) {
            console.error(error);
        }
    };

    const succesFunc = () => {
        enqueueSnackbar('El área fue borrada');
        setRefreshAUX(new Date().getTime())
    }

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [refreshAUX, setRefreshAUX] = useState('')

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
            headerName: 'Área',
            flex: 1,
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
            field: 'nombreRazonSocial',
            headerName: 'Empresa',
            flex: 1,
            editable: false,
        },
        {
            field: 'action',
            headerName: 'Acciones',
            align: 'center',
            headerAlign:'center',
            width:200,
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
                <title> Área </title>
            </Helmet>

            {/* <Container> */}

                <CustomBreadcrumbs
                    heading={
                        <Typography variant='h4' color='primary'>Área</Typography>
                    }
                    links={[
                        { name: '' },
                    ]}
                    action={
                        <Button
                            component={RouterLink}
                            to={PATH_DASHBOARD.area.new}
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill" />}
                        >
                            Crear Área
                        </Button>
                    }
                />



                <Card>
                    <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                        {perfilUsuario === 'RecursosHumanos' ? (
                            <GenericDataGridCustom EndPoint={END_POINT_BANDEJA_AREA} columns={columns} refresh={refreshAUX} />
                        ) :
                            <GenericDataGridCustom EndPoint={END_POINT_BANDEJA_AREA_EMPRESA} columns={columns} refresh={refreshAUX} />
                        }
                    </TableContainer>
                </Card>
            {/* </Container> */}

            <ConfirmDialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                title="Borrar"
                content={`¿Deseas borrar el área de ${nombre}?`}
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
