import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Button } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_AUTH } from '../../../routes/paths';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// components
import { CustomAvatar } from '../../../components/custom-avatar';
import { useSnackbar } from '../../../components/snackbar';
import MenuPopover from '../../../components/menu-popover';
import { IconButtonAnimate } from '../../../components/animate';
import { HOST_API_LOCAL, END_POINT_OBTENER_EMPLEADO } from '../../../config-global';

// ----------------------------------------------------------------------

const OPTIONS = [
  // {
  //   label: 'Inicio',
  //   linkTo: '/',
  // },
  {
    label: 'Perfil',
    linkTo: PATH_DASHBOARD.user.profile,
  },
  // {
  //   label: 'Configuración',
  //   linkTo: PATH_DASHBOARD.user.account,
  // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();

  const { user, logout } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleLogout = async () => {
    try {
      logout();
      // navigate(PATH_AUTH.login, { replace: true });
      handleClosePopover();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const handleClickItem = (path) => {
    handleClosePopover();
    navigate(path);
  };
  const name = localStorage.getItem('EmpleadoId');

  const [nombre, setNombre] =useState()
  const [apellidoPaterno, setApellidoPaterno] =useState()
  const [apellidoMaterno, setApellidoMaterno] =useState()
  const [rolId, setRolId] =useState()

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
            setNombre(response.data.nombre)
            setApellidoPaterno(response.data.apellidoPaterno)
            setApellidoMaterno(response.data.apellidoMaterno)
            setRolId(response.data.rolId)      
        }).catch(() => {
            // result = "Error";
        })
    }
    ObtenerEmpleado()
}, [name])

  return (
    <>
      <Button
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          ...(openPopover && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '2px',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[800], 0.5),
            },
          }),
        }}
      >
        <CustomAvatar src={nombre} alt={nombre} name={nombre} sx={{margin:1}} />
        {/* <CustomAvatar src={user?.photoURL} alt={user?.displayName} name={user?.displayName} /> */}
        <Box sx={{color:'#000', textAlign:'left', marginRight:1}}>
          <Typography variant="subtitle2" noWrap>
          {nombre} {apellidoPaterno} {apellidoMaterno}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {rolId}
          </Typography>
        </Box>

      </Button>


      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 200, p: 0 }}>

        {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Cerrar sesión
        </MenuItem>
      </MenuPopover>
    </>
  );
}
