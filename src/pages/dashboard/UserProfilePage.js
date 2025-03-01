import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import axios from 'axios';
// @mui
import { Tab, Card, Tabs, Container, Box, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// _mock_
import {
  _userAbout,
  _userFeeds,
  _userGallery,
  _userFollowers,
} from '../../_mock/arrays';
// components
import Iconify from '../../components/iconify';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
// sections
import {
  Profile,
  ProfileCover,
  ProfileDocumentos,
  ProfileHistorial,
  // ProfileFollowers,
} from '../../sections/@dashboard/user/profile';
// import EmpleadoProfilePrivate from '../../sections/@dashboard/empleado/EmpleadoProfilePrivate'
import { HOST_API_LOCAL, END_POINT_OBTENER_EMPLEADO } from '../../config-global';

// ----------------------------------------------------------------------

export default function UserProfilePage() {
  const { themeStretch } = useSettingsContext();

  const { user } = useAuthContext();

  const [currentTab, setCurrentTab] = useState('configuracion');

  const name = localStorage.getItem('EmpleadoId');

  const [currentEmpleado, setCurrentEmpleado] = useState() // _userList.find((empleado) => paramCase(empleado.name) === name);

  useEffect(() => {

    function ObtenerEmpleado() {
      const urlEndPoint = HOST_API_LOCAL + END_POINT_OBTENER_EMPLEADO;
      const AUT = `Bearer ${localStorage.getItem('accessToken')}`
      axios({
        method: 'get',
        url: urlEndPoint,
        params: { Id: name },
        headers: { 'Authorization': AUT }
      }).then(response => {
        console.log('este es el response de axios', response.data)
        setCurrentEmpleado(response.data)
      }).catch(() => {
        // result = "Error";
      })
    }
    ObtenerEmpleado()
  }, [name])

  const TABS = [
    // {
    //   value: 'publicos',
    //   label: 'Datos públicos',
    //   icon: <Iconify icon="eva:people-fill" />,
    //   component: <Profile info={_userAbout} posts={_userFeeds} />,
    // },
    {
      value: 'configuracion',
      label: 'Configuración',    
      icon: <Iconify icon="ic:round-account-box" />,
      // component: <EmpleadoProfilePrivate isEdit currentEmpleado={currentEmpleado} />,
      // component: <ProfileFollowers followers={_userFollowers} />,
    },
    // {
    //   value: 'documentos',
    //   label: 'Documentos',
    //   icon: <Iconify icon="ic:round-perm-media" />,
    //   component: <ProfileDocumentos />,
    // },
    // {
    //   value: 'historial',
    //   label: 'Historial',
    //   icon: <Iconify icon="material-symbols:work-history" />,
    //   component: <ProfileHistorial/>,
    // },
  ];

  return (
    <>
      <Helmet>
        <title> Perfil</title>
      </Helmet>

      {/* <Container maxWidth={themeStretch ? false : 'lg'}> */}
        <CustomBreadcrumbs
          heading={
              <>Mi perfil</>
          }
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Perfil', href: PATH_DASHBOARD.user.root },
            // { name: user?.displayName },
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <ProfileCover name={localStorage.getItem('EmpleadoId')} role={localStorage.getItem('RolId')} cover={_userAbout.cover} />

          <Tabs
            value={currentTab}
            onChange={(event, newValue) => setCurrentTab(newValue)}
            sx={{
              width: 1,
              bottom: 0,
              zIndex: 9,
              position: 'absolute',
              bgcolor: 'background.paper',
              '& .MuiTabs-flexContainer': {
                pr: { md: 3 },
                justifyContent: {
                  sm: 'center',
                  md: 'flex-end',
                },
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
            ))}
          </Tabs>
        </Card>

        {TABS.map(
          (tab) => tab.value === currentTab && <Box key={tab.value}> {tab.component} </Box>
        )}
      {/* </Container> */}
    </>
  );
}
