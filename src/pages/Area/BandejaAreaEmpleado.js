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
import { HOST_API_LOCAL, END_POINT_BANDEJAEMPLEADOS_EMPRESA, END_POINT_BANDEJAEMPLEADOS_RH } from '../../config-global';
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';




BandejaAreaEmpleado.propTypes = {
    areaId: PropTypes.any,
};

export default function BandejaAreaEmpleado({ areaId }) {
    const perfilUsuario = localStorage.getItem('RolId');
    const esRHGeneral = perfilUsuario === 'A0F7252E-D818-4EFB-8E1C-E5B1220650E6';
    const esRHEmpresa = perfilUsuario === '0A3B0F89-0875-40F3-BFE8-BF755E8E4444';

    console.log('consoleRolId:', perfilUsuario);
    console.log('el areaid:', areaId);

    const [tableData, setTableData] = useState(_areaList);
    const [IdAUX, setIdAUX] = useState('');
    const navigate = useNavigate();

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleEditRow = (id) => {
        console.log(id)
        navigate(PATH_DASHBOARD.empleado.edit(id));
    };

    const parametroGenerico = `#Area#${areaId}`

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
            renderCell: (params) => <CustomAvatar name={params.row.nombreCompleto} sx={{ width: 36, height: 36 }} />,
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
            field: 'nombreDepartamento',
            headerName: 'Departamento',
            editable: false,
            width: 200,
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
                                Empleados en esta Área
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>


                                { /* <GenericDataGridCustom EndPoint={END_POINT_BANDEJAEMPLEADOS_EMPRESA} columns={columnsEmpleado} genericParamAUX={parametroGenerico} /> */ }

                                 {perfilUsuario === 'RecursosHumanos' ? ( 
                                    <GenericDataGridCustom EndPoint={END_POINT_BANDEJAEMPLEADOS_RH} genericParamAUX={parametroGenerico} columns={columnsEmpleado} /> 
                                    ) : 
                                    (<GenericDataGridCustom EndPoint={END_POINT_BANDEJAEMPLEADOS_EMPRESA} genericParamAUX={parametroGenerico} columns={columnsEmpleado} /> )
                                 } 
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                </ClickAwayListener>

            </Card>
        </>
    );
}


function RenderPeriodo(periodo) {

    console.log(periodo)

    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    return (
        <div>
            <Label
                variant={isLight ? 'soft' : 'filled'}
                color='success'
                sx={{ mx: 'auto' }}
            >
                {periodo}
            </Label>
        </div>
    );
}

