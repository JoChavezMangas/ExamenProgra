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
    AccordionDetails,
    ClickAwayListener,
    Accordion,
    AccordionSummary,
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
import { HOST_API_LOCAL, END_POINT_BANDEJA_EMPRESA, END_POINT_BANDEJAEMPLEADOS_RH, END_POINT_BANDEJAEMPLEADOS_EMPRESA } from '../../config-global';
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';



BandejaEmpresaEmpleado.propTypes = {
    empresaId: PropTypes.any,
};
export default function BandejaEmpresaEmpleado({empresaId }) {
    const perfilUsuario = localStorage.getItem('RolId');
    console.log('el perfil', perfilUsuario)
    const [tableData, setTableData] = useState(_dataList);
    const [IdAUX, setIdAUX] = useState('');
    const navigate = useNavigate();
    const handleEditRow = (id) => {
        console.log(id)
        navigate(PATH_DASHBOARD.empresa.edit(id));
    };

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const parametroGenerico = `#Empresa#${empresaId}`
    const columnsEmpleado = [
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
            renderCell: (params) => <CustomAvatar name={params.row.nombreCompleto} sx={{ width: 36, height: 36 }} />,
        },
        {
            field: 'nombreCompleto',
            headerName: 'Empleado',
            editable: false,
            width:300,
        },
        {
            field: 'nombreArea',
            headerName: 'Área',
            editable: false,
            width:200,
        },
        {
            field: 'nombreDepartamento',
            headerName: 'Departamento',
            editable: false,
            width:200,
        },
        {
            field: 'nombrePuesto',
            headerName: 'Puesto',
            editable: false,
            width:200,
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
                                Empleados en esta Empresa
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                                {perfilUsuario === 'RecursosHumanos' ? (
                                    <GenericDataGridCustom EndPoint={END_POINT_BANDEJAEMPLEADOS_RH} columns={columnsEmpleado} genericParamAUX={parametroGenerico} />
                                ) :
                                    <GenericDataGridCustom EndPoint={END_POINT_BANDEJAEMPLEADOS_EMPRESA} columns={columnsEmpleado} genericParamAUX={parametroGenerico} />
                                }
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                </ClickAwayListener>
            </Card>
        </>
    );
}




