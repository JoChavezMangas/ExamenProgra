import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import {
    Container,
    Typography,
    Tabs,
    Tab,
    Box,
    CardContent,
    Card,
} from '@mui/material';
import { PATH_DASHBOARD } from '../../routes/paths';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import TablaAdelanto from './TablaAdelanto';
import TablaCerrados from './TablaCerrados';
import TablaProximos from './TablaProximos';
import TablaEspeciales from './TablaEspeciales';
import TablaPeticionesEspeciales from './TablaPeticionesEspeciales';
import TablaEmpleados from './TablaEmpleados';



export default function Periodos() {

    const TABS = localStorage.getItem('RolId') === 'RecursosHumanos' ?
        [
            { value: 'Empleados', label: 'Empleados', component: <TablaEmpleados /> },
            { value: 'Proximo', label: 'Próximos a vencer', component: <TablaProximos /> },
            { value: 'Cerrados', label: 'Cerrados', component: <TablaCerrados /> },

        ] :
        [
            { value: 'Cerrados', label: 'Cerrados', component: <TablaCerrados /> },
            { value: 'Adelanto', label: 'Adelanto', component: <TablaAdelanto /> }
        ]

    const [currentTab, setCurrentTab] = useState(localStorage.getItem('RolId') === 'RecursosHumanos' ? 'Empleados' : 'Cerrados');

    return (
        <>
            <Helmet>
                <title> Periodos </title>
            </Helmet>

            {/* <Container> */}

                <CustomBreadcrumbs
                    heading={
                        <>Periodos</>
                    }
                    links={[
                        {
                            name: 'Inicio',
                            href: PATH_DASHBOARD.root,
                        },
                        {
                            name: 'Periodos',
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
                                    background: '#fff',
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
            {/* </Container> */}

        </>
    );
}


