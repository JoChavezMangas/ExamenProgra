import { Helmet } from 'react-helmet-async';
// import { paramCase } from 'change-case';
import { useState, useEffect, useCallback } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
    Card,
    Container,
    Typography,
    Tabs,
    Tab,
    Box,
    TableContainer,
    CardContent
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
// import { _userList, _companyList } from '../../_mock/arrays';
import { _dataList } from '../../_mock/arrays';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import GridTablerosVacaciones from './Tableros';
import TablaMisPeticiones from './MisPeticiones';
import TablaPeticiones from './Peticiones';
import Balance from './Balance';
import PeticionesTodosEmpleados from './PeticionesTodosEmpleados';
import PeticionesPendientes from './PeticionesPendientes';
import PeticionesAutorizadas from './PeticionesAutorizadas';
import PeticionesRechazadas from './PeticionesRechazadas';
// import PeticionesTodosEmpleados from './PeticionesTodosEmpleados';




export default function InicioPeticiones() {
    const TABS = localStorage.getItem('RolId') === 'RecursosHumanos' ?
        [
            { value: 'pendientes', label: 'Pendientes', component: <PeticionesPendientes/> },
            { value: 'autorizadas', label: 'Autorizadas', component: <PeticionesAutorizadas/> },
            { value: 'rechazadas', label: 'Rechazadas', component: <PeticionesRechazadas/> },
            { value: 'Resumen', label: 'Balance', component: <Balance /> },
            { value: 'todosEmpleados', label: 'Todos los Empleados', component: <PeticionesTodosEmpleados /> },
        ] :
        [
            { value: 'pendientes', label: 'Pendientes', component: <PeticionesPendientes/> },
            { value: 'autorizadas', label: 'Autorizadas', component: <PeticionesAutorizadas/> },
            { value: 'rechazadas', label: 'Rechazadas', component: <PeticionesRechazadas/> },
            { value: 'Resumen', label: 'Balance', component: <Balance /> },
        ]

    const [currentTab, setCurrentTab] = useState(localStorage.getItem('RolId') === 'RecursosHumanos' ? 'pendientes' : 'pendientes');

    const [openConfirm, setOpenConfirm] = useState(false);
    const [openPopover, setOpenPopover] = useState(null);
    const [tableData, setTableData] = useState(_dataList);
    const [IdAUX, setIdAUX] = useState('');
    const navigate = useNavigate();
    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };
    const handleOpenPopover = (e, Id) => {
        setIdAUX(Id)
        setOpenPopover(e.currentTarget);
    };
    const handleClosePopover = () => {
        setOpenPopover(null);
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
    const onDelete = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            enqueueSnackbar('Listo');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Helmet>
                <title> Peticiones </title>
            </Helmet>


                <CustomBreadcrumbs
                    heading={
                        <>Peticiones</>
                    }
                    links={[
                        {
                            name: 'Inicio',
                            href: PATH_DASHBOARD.root,
                        },
                        {
                            name: 'Peticiones',
                            // href: PATH_DASHBOARD.vacaciones
                        },
                    ]}
                />
                <Box sx={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'flex-start', marginTop: '-20px' }}>
                    <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
                        {TABS.map((tab) => (
                            <Tab key={tab.value} value={tab.value} label={tab.label}
                                sx={{
                                    minWidth: 'auto',
                                    backgroundColor: '#ffffff',
                                    borderTop: 'rgba(145, 158, 171, 0.14) 1px solid',
                                    borderLeft: 'rgba(145, 158, 171, 0.14) 1px solid',
                                    borderRight: 'rgba(145, 158, 171, 0.14) 1px solid',
                                    borderRadius: '8px 8px 0 0',
                                    paddingLeft: '10px',
                                    paddingRight: '10px'
                                }}
                            />
                        ))}
                    </Tabs>
                </Box>
                <Card
                    sx={{
                        borderTop: 'rgba(145, 158, 171, 0.14) 1px solid',
                        borderLeft: 'rgba(145, 158, 171, 0.14) 1px solid',
                        borderRight: 'rgba(145, 158, 171, 0.14) 1px solid',
                        borderRadius: '0 0 8px 8px',
                    }}>
                    <CardContent>
                        {TABS.map(
                            (tab) =>
                                tab.value === currentTab && (
                                    <Box key={tab.value} sx={{ mt: 2 }}>
                                        {tab.component}
                                    </Box>
                                )
                        )}
                    </CardContent>
                </Card>
           

        </>
    );
}


