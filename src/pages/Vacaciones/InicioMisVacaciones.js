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
    TableContainer
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
import DetallesVacaciones from './DetallesVacaciones';



export default function InicioMisVacaciones() {

    const TABS = [
        { value: 'solicitudes', label: 'Solicitudes', component: <GridTablerosVacaciones /> },
        { value: 'MisPeticiones', label: 'Mis Peticiones', component: <TablaMisPeticiones /> },
        { value: 'detalles', label: 'Detalles', component: <DetallesVacaciones/>}
        // { value: 'Peticiones', label: 'Peticiones', component: <TablaPeticiones /> },
    ];
    const [currentTab, setCurrentTab] = useState('solicitudes');
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
                <title> Vacaciones - Incidencias </title>
            </Helmet>

            {/* <Container> */}
                <CustomBreadcrumbs
                    heading={
                        <Typography variant='h4' >Vacaciones - Incidencias</Typography>
                    }
                    links={[
                        {
                            name: 'Inicio',
                            href: PATH_DASHBOARD.root,
                        },
                        {
                            name: 'Vacaciones',
                            href: PATH_DASHBOARD.misvacaciones,
                        },
                    ]}
                />

                <Box sx={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'flex-start', marginTop: '-20px' }}>
                    <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
                        {TABS.map((tab) => (
                            <Tab key={tab.value} value={tab.value} label={tab.label} />
                        ))}
                    </Tabs>
                </Box>
                {TABS.map(
                    (tab) =>
                        tab.value === currentTab && (
                            <Box key={tab.value} sx={{ mt: 2 }}>
                                {tab.component}
                            </Box>
                        )
                )}
            {/* </Container> */}

        </>
    );
}


