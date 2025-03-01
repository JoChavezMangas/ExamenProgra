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
    Link
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
// routes
import { paramCase } from 'change-case';
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
// import { _userList, _companyList } from '../../_mock/arrays';
import { _dataList } from '../../_mock/arrays';
// components
import Iconify from '../../components/iconify';
import ConfirmDialog from '../../components/confirm-dialog';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
// import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';
import Label from '../../components/label';
import { CustomAvatar } from '../../components/custom-avatar';
import MenuPopover from '../../components/menu-popover';
import { HOST_API_LOCAL, END_POINT_BANDEJA_EMPRESA, END_POINT_OBTENER_EMPRESA, END_POINT_BORRAR_EMPRESA } from '../../config-global';
import { AxiosEliminar } from '../../_Axios/AxiosFomr';
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';




export default function BandejaEmpresa() {

    const [openConfirm, setOpenConfirm] = useState(false);
    const [tableData, setTableData] = useState(_dataList);
    const [razonSocial, setNombreEmpresa] = useState('');
    const [IdAUX, setIdAUX] = useState();

    const navigate = useNavigate();

    const handleOpenConfirm = (id, nombreEmpresaa) => {
        setIdAUX(id);
        setNombreEmpresa(nombreEmpresaa)
        setOpenConfirm(true);
    };
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const handleEditRow = (id) => {
        console.log(id)
        navigate(PATH_DASHBOARD.empresa.edit(id));
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
            await AxiosEliminar(END_POINT_BORRAR_EMPRESA, id, succesFunc, enqueueSnackbar);;
        } catch (error) {
            console.error(error);
        }
    };

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const succesFunc = () => {
        enqueueSnackbar('La empresa fue borrada')
        setRefreshAUX(new Date().getTime())
    }

    const [refreshAUX, setRefreshAUX] = useState('')

    const columns = [
        {
            field: 'id',
            headerName: 'Id',
            flex: 1,
            editable: false,
            hide: true
        },
        {
            field: 'avatar',
            headerName: '',
            align: 'center',
            headerAlign: 'center',
            width: 64,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => <CustomAvatar name={params.row.razonSocial} sx={{ width: 36, height: 36 }} />,
        },
        {
            field: 'razonSocial',
            headerName: 'Empresa',
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
                    {params.row.razonSocial}
                </Link>
            ),
        },
        {
            field: 'rfc',
            headerName: 'RFC',
            flex: 1,
            editable: false,
        },
        {
            field: 'telefono',
            headerName: 'Teléfono',
            flex: 1,
            editable: false,
            align: 'center',
            headerAlign: 'center',
            width: 120,
            renderCell: (params) => (
                <Typography variant="body2">
                    {params.row.telefono}
                </Typography>
            ),
        },
        {
            field: 'correo',
            headerName: 'Email',
            flex: 1,
            editable: false,
            renderCell: (params) => (
                <Typography variant="body2" noWrap>
                    {params.row.correo}
                </Typography>
            ),
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
                        onClick={() => handleOpenConfirm(params.row.id, params.row.razonSocial)}>
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
                <title> Empresa </title>
            </Helmet>

            {/* <Container> */}

                <CustomBreadcrumbs
                    heading={
                        <>Empresa</>
                    }
                    links={[{ name: '' },]}
                    action={<Button component={RouterLink}
                        to={PATH_DASHBOARD.empresa.new}
                        variant="contained"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                    >
                        Crear Empresa
                    </Button>} />



                <Card>
                    <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                        <GenericDataGridCustom EndPoint={END_POINT_BANDEJA_EMPRESA} columns={columns} refresh={refreshAUX} />
                    </TableContainer>
                </Card>
            {/* </Container> */}

{/* 

            <MenuPopover
                open={openPopover}
                onClose={handleClosePopover}
                arrow="right-top"
                sx={{ width: 140 }}
            >
                <MenuItem
                    onClick={() => {
                        handleOpenConfirm();
                        handleClosePopover();
                    }}
                    sx={{ color: 'error.main' }}
                >
                    <Iconify icon="eva:trash-2-outline" />
                    Borrar
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        handleEditRow(IdAUX);
                        handleClosePopover();
                    }}
                >
                    <Iconify icon="eva:edit-fill" />
                    Editar
                </MenuItem>
            </MenuPopover>
 */}

            <ConfirmDialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                title="Borrar"
                content={`¿Deseas borrar a ${razonSocial}?`}
                action={
                    <Button variant="contained" color="error" onClick={JustAfterClicDelete}>
                        Borrar
                    </Button>
                }
            />

        </>
    );
}

function RenderStatus(status) {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    let colorStatus = "info";

    if (status === "#Activo")
        colorStatus = "primary";
    else if (status === "#Bloqueado")
        colorStatus = "error";
    else if (status === "#Inactivo")
        colorStatus = "warning";

    return (
        <div>
            <Label
                variant={isLight ? 'soft' : 'filled'}
                color={colorStatus}
                sx={{ mx: 'auto' }}
            >
                {status}
            </Label>
        </div>
    );
}
