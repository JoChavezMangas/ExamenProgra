import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { useState } from 'react';
// @mui
import {
  Box,
  Stack,
  Badge,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListItemButton,
} from '@mui/material';

// utils
// components
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover';
import { IconButtonAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const [openPopover, setOpenPopover] = useState(null);

  const [notificaciones, setNotificaciones] = useState(_notificaciones);

  const totalUnRead = notificaciones.filter((item) => item.isUnRead === true).length;

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleMarkAllAsRead = () => {
    setNotificaciones(
      notificaciones.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };

  return (
    <>
      <IconButtonAnimate
        color={openPopover ? 'primary' : 'default'}
        onClick={handleOpenPopover}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 360, p: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notificaciones</Typography>
            {/* Número total de notificaciones */}
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Tienes {totalUnRead} notificaciones sin leer
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
          >
            {notificaciones.slice(0, 2).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar> */}

      </MenuPopover>
    </>
  );
}

export const _notificaciones = [...Array(2)].map((_, index) => ({
  title: [
    ' Vacaciones próximas a vencer,',
    ' Tienes una solicitud',
  ][index],
  description: [
    'mira la bandeja',
    'revisar solicitudes',
  ][index],
  type: ['vacaciones_vencidas', 'solicitudes'][index],
  isUnRead: [true, false][index],
}));
// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    isUnRead: PropTypes.bool,
    description: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),

  }),
};

function NotificationItem({ notification }) {
  const {title} = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      
      <ListItemText
        disableTypography
        primary={title}
        secondary={
          <Stack direction="row" sx={{ mt: 0.5, typography: 'caption', color: 'text.disabled' }}>
            <Iconify icon="eva:clock-fill" width={16} sx={{ mr: 0.5 }} />
            <Typography variant="caption">Tiempo de notificación</Typography>
          </Stack>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );



  if (notification.type === 'vacaciones_vencidas') {
    return {
      title,

    };
  }
  if (notification.type === 'solicitudes') {
    return {
      title,
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    title,
  };
}
