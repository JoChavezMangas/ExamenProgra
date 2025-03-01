import PropTypes from 'prop-types';
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
import { END_POINT_BANDEJA_PUESTO, END_POINT_BANDEJAEMPLEADOS_EMPRESA, END_POINT_BANDEJAEMPLEADOS_RH } from '../../config-global';
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';


BandejaPuestoEmpleado.propTypes = {
    puestoId: PropTypes.any,
};

export default function BandejaPuestoEmpleado({ puestoId }) {
    const perfilUsuario = localStorage.getItem('RolId');


    const [tableData, setTableData] = useState(_puestoList);
    const [IdAUX, setIdAUX] = useState('');
    const navigate = useNavigate();

    const handleEditRow = (id) => {
        console.log(id)
        navigate(PATH_DASHBOARD.empleado.edit(id));
    };

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const parametroGenerico = `#Puesto#${puestoId}`

    console.log('parametroGenerico', parametroGenerico)

    const columnsEmpleado = [
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
            field: 'nombreCompleto',
            headerName: 'Colaborador',
            width: 350,
            editable: false,
            renderCell: (params) => (
                <Link
                    component="button"
                    fontSize='14px'
                    fontWeight='500'
                    color='#16463f'
                    onClick={() => handleEditRow(params.row.id)}
                >
                    {params.row.nombreCompleto}
                </Link>
            ),
        },
        {
            field: 'nombreArea',
            headerName: 'Área',
            editable: false,
            width:230,
        },
        {
            field: 'nombreDepartamento',
            headerName: 'Departamento',
            editable: false,
            width:230,
        },
    ];
    return (
        <>
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
                                Empleados en este Puesto
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                                {perfilUsuario === 'RecursosHumanos' ? (
                                    <GenericDataGridCustom EndPoint={END_POINT_BANDEJAEMPLEADOS_RH} columns={columnsEmpleado} genericParamAUX={parametroGenerico} />
                                ) :
                                    <GenericDataGridCustom EndPoint={END_POINT_BANDEJAEMPLEADOS_RH} columns={columnsEmpleado} genericParamAUX={parametroGenerico} />
                                }
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                </ClickAwayListener>
            </Card>
        </>
    );
}
