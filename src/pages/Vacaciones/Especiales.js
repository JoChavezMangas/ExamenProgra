import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import {
    Container,
    Typography,
    Tabs,
    Tab,
    Box,
    Card,
    CardContent,
} from '@mui/material';
import { PATH_DASHBOARD } from '../../routes/paths';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import TablaEspeciales from './TablaEspeciales';
import TablaPeticionesEspeciales from './TablaPeticionesEspeciales';



export default function Especiales() {

    const TABS =
        [
            { value: 'Especiales', label: 'Días especiales', component: <TablaEspeciales /> },
            { value: 'PeticionesEspeciales', label: 'Peticiones especiales', component: <TablaPeticionesEspeciales /> }
        ]

    const [currentTab, setCurrentTab] = useState('Especiales');

    return (
        <>
            <Helmet>
                <title> Especiales </title>
            </Helmet>

            {/* <Container> */}

                <CustomBreadcrumbs
                    heading={
                        <>Especiales</>
                    }
                    links={[
                        {
                            name: 'Inicio',
                            href: PATH_DASHBOARD.root,
                        },
                        {
                            name: 'Especiales',
                            // href: PATH_DASHBOARD.vacaciones
                        },
                    ]}
                />


                <Box sx={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'flex-start', marginTop: '-20px' }}>
                    <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)} >
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


