import PropTypes from 'prop-types';
// @mui
import { Stack, Button, Tooltip, Typography, IconButton, ToggleButton } from '@mui/material';
import { es } from 'date-fns/locale';

// utils
import { fDate, fEspDate } from '../../../utils/formatTime';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Iconify from '../../../components/iconify';
import { onOpenModal } from '../../../redux/slices/calendar';
import { useDispatch, useSelector } from '../../../redux/store';

// ----------------------------------------------------------------------

const VIEW_OPTIONS = [
  { value: 'dayGridMonth', label: 'Mes', icon: 'ic:round-view-module' },
  { value: 'timeGridWeek', label: 'Semana', icon: 'ic:round-view-week' },
  { value: 'timeGridDay', label: 'Día', icon: 'ic:round-view-day' },
  { value: 'listWeek', label: 'Agenda', icon: 'ic:round-view-agenda' },
];
const dfltLocales = {
  months: 'Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre'.split(','),
  monthsShort: 'Ene,Feb,Mar,Abr,May,Jun,Jul,Agu,Sep,Oct,Nov,Dic'.split(','),
  weekdays: 'Domingo,Lunes,Martes,Miércoles,Jueves,Viernes,Sábado'.split(','),
  weekdaysShort: 'Dom,Lun,Mar,Mie,Jue,Vie,Sáb'.split(',')
};
// ----------------------------------------------------------------------

CalendarToolbar.propTypes = {
  onToday: PropTypes.func,
  onNextDate: PropTypes.func,
  onPrevDate: PropTypes.func,
  onOpenFilter: PropTypes.func,
  onChangeView: PropTypes.func,
  date: PropTypes.instanceOf(Date),
  view: PropTypes.oneOf(['dayGridMonth', 'timeGridWeek', 'timeGridDay', 'listWeek']),
  // view: PropTypes.oneOf(['dayGridMonth']),

};

export default function CalendarToolbar({
  date,
  view,
  onToday,
  onNextDate,
  onPrevDate,
  onChangeView,
  onOpenFilter,
}) {
  const isDesktop = useResponsive('up', 'sm');
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(onOpenModal());
  };


  function fEspDateWrapper(localDate) {
    if (!(localDate instanceof Date)) {
      console.error("Error: Se esperaba un objeto Date en fEspDate");
      return "Fecha no válida";
    }

    // Cambia el formato de fecha según tus preferencias
    const day = String(localDate.getDate()).padStart(2, '0');
    const month = localDate.toLocaleString('es-ES', { month: 'short' }).toUpperCase();
    const year = String(localDate.getFullYear());

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }
  return (
    <Stack
      alignItems="center"
      justifyContent="space-between"
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ p: 2.5, backgroundColor:'rgba(31,147,130,0.18)' }}
      
    >
      {/* {isDesktop && (
        <Stack direction="row" spacing={1}>
          {VIEW_OPTIONS.map((viewOption) => (
            <Tooltip key={viewOption.value} title={viewOption.label}>
              <ToggleButton
                size="small"
                value={view}
                selected={viewOption.value === view}
                onChange={() => onChangeView(viewOption.value)}
              >
                <Iconify icon={viewOption.icon} />
              </ToggleButton>
            </Tooltip>
          ))}
        </Stack>
      )} */}
      <Stack direction="row" spacing={1}>
        <Typography variant="h4" color='primary'>Vacaciones</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2}>
        <IconButton onClick={onPrevDate}>
          <Iconify icon="eva:arrow-ios-back-fill" />
        </IconButton>

        <Typography variant="h6">{fEspDateWrapper(date)}</Typography>

        <IconButton onClick={onNextDate}>
          <Iconify icon="eva:arrow-ios-forward-fill" />
        </IconButton>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={1}>
        {/* 
        {isDesktop && (
          <Button size="small" color="error" variant="contained" onClick={onToday}>
            Hoy
          </Button>
        )}
        {isDesktop && (
          <Button size="small" color="primary" variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenModal}>
            Nuevo evento
        </Button>
        )}
        */}
        {/* <IconButton onClick={onOpenFilter}>
          <Iconify icon="ic:round-filter-list" />
        </IconButton> */}
      </Stack>
    </Stack>
  );
}
