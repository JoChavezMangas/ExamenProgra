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
import { END_POINT_BANDEJA_DIAS_INHABILES, END_POINT_BORRAR_DIAS_INHABILES } from '../../config-global';
import { AxiosEliminar } from '../../_Axios/AxiosFomr';
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';




export default function BandejaDiasInhabiles() {
    const perfilUsuario = localStorage.getItem('RolId');
    const [openConfirm, setOpenConfirm] = useState(false);
    const [tableData, setTableData] = useState(_puestoList);
    const [nombreDia, setNombreDia] =useState ('');
    const [IdAUX, setIdAUX] = useState('');

    const navigate = useNavigate();

    const handleOpenConfirm = (id, nombreDiaConfirm) => {
        setIdAUX(id);
        setNombreDia(nombreDiaConfirm);
        setOpenConfirm(true);
    };
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const handleEditRow = (id) => {
        console.log(id)
        navigate(PATH_DASHBOARD.diasInhabiles.edit(id));
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
            await AxiosEliminar(END_POINT_BORRAR_DIAS_INHABILES, id, succesFunc, enqueueSnackbar);;
        } catch (error) {
            console.error(error);
        }
    };

    const succesFunc = () => {
        enqueueSnackbar('El día fue borrado')
        setRefreshAUX(new Date().getTime())
    }

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [refreshAUX, setRefreshAUX]=useState('')

    const columns = [
        {
            field: 'nombre',
            headerName: 'Nombre',
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
            field: 'fechaString',
            headerName: 'Fecha',
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
                <title> Días Inhábiles </title>
            </Helmet>

            {/* <Container> */}

                <CustomBreadcrumbs
                    heading={
                        <Typography variant='h4' color='primary'>Días Inhábiles</Typography>
                    }
                    links={[
                        { name: '' },
                    ]}
                    action={
                        <Button
                            component={RouterLink}
                            to={PATH_DASHBOARD.diasInhabiles.new}
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill" />}
                        >
                            Crear Día Inhábil
                        </Button>
                    }
                />



                <Card>
                    <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                    <GenericDataGridCustom EndPoint={END_POINT_BANDEJA_DIAS_INHABILES} columns={columns} refresh={refreshAUX} />
                    </TableContainer>
                </Card>
            {/* </Container> */}

            <ConfirmDialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                title="Borrar"
                content={`¿Deseas borrar el día de ${nombreDia}?`}
                action={
                    <Button variant="contained" color="error" onClick={JustAfterClicDelete}>
                        Borrar
                    </Button>
                }
            />

        </>
    );
}




