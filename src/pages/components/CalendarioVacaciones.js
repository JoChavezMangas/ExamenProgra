import FullCalendar from '@fullcalendar/react'; // => request placed at the top

import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
//
import { Helmet } from 'react-helmet-async';
import { useState, useRef, useEffect } from 'react';
// @mui
import { Card, Button, Container, DialogTitle, Dialog, Avatar } from '@mui/material';
import { es } from 'date-fns/locale';
import { esES } from '@mui/material/locale';
import axios from 'axios';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  selectEvent,
  selectRange,
  onOpenModal,
  onCloseModal,
} from '../../redux/slices/calendar';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
import { fTimestamp } from '../../utils/formatTime';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Iconify from '../../components/iconify';
import { useSnackbar } from '../../components/snackbar';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import { useDateRangePicker } from '../../components/date-range-picker';
// sections
import {
  CalendarForm,
  StyledCalendar,
  CalendarToolbar,
  CalendarFilterDrawer,
} from '../../sections/@dashboard/calendar';
import { END_POINT_SOLICITUDES_CALENDARIO, HOST_API_KEY } from '../../config-global';


// --------------------------------------------------------------------



// -----------------------------------------------------------------------------------------------
export default function CalendarioVacaciones() {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState('dayGridMonth');
  const [dataFiltered, setDataFiltered] = useState([]);
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();
  const isDesktop = useResponsive('up', 'sm');
  const calendarRef = useRef(null);

useEffect(() => {
  setDataFiltered(events);
}, [events, date]);


useEffect(() => {
  const urlEndPoint = HOST_API_KEY + END_POINT_SOLICITUDES_CALENDARIO;
  const AUT = `Bearer ${localStorage.getItem('accessToken')}`
  axios.get(urlEndPoint,
    {
      params: {},
      headers: { 'Authorization': AUT },
    }).then(response => {
      setEvents(response.data);
      dispatch(getEvents());
    }).catch(error => {
      console.error("Error al obtener eventos:", error);
    });
}, [dispatch]);


if (events.length > 0) {
  // Recorrer todos los eventos
  events.forEach(evento => {
    // Obtener la fecha de inicio y finalización del evento
    const fechaInicio = new Date(evento.start);
    const fechaFinal = new Date(evento.end);
    
    // Si la diferencia en días es mayor que 1, agregar 6 horas más a la hora de finalización
    const diferenciaHoras = Math.abs(fechaFinal - fechaInicio) / (1000 * 60 * 60);
    if (diferenciaHoras > 6) {
      fechaFinal.setHours(fechaFinal.getHours() + 6); // Agregar 6 horas más
      evento.end = fechaFinal.toISOString(); // Actualizar la propiedad 'end' del evento
    }
  });
} else {
  console.log('No hay eventos presentes.');
}

const handleClickToday = () => {
  const calendarEl = calendarRef.current;
  if (calendarEl) {
    const calendarApi = calendarEl.getApi();
    calendarApi.today();
    setDate(calendarApi.getDate());
  }
};

  const handleChangeView = (newView) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleClickDatePrev = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleClickDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  const handleSelectEvent = (arg) => {
    dispatch(selectEvent(arg.event.id));
  };


  return (
    <>
      <Card>
        <StyledCalendar>
          <CalendarToolbar
            locale={es}
            date={date}
            view={view}
            onToday={handleClickToday}
            onNextDate={handleClickDateNext}
            onPrevDate={handleClickDatePrev}
            onChangeView={handleChangeView}
          />
          <FullCalendar
            locale={es}
            weekends
            droppable
            allDayMaintainDuration
            eventResizableFromStart
            events={dataFiltered}
            ref={calendarRef}
            initialDate={date.toISOString()}
            initialView={view}
            dayMaxEventRows={3}
            dayCellContent={(arg) => arg.dayNumberText}
            eventDisplay="block" // esta es la barrita de color
            headerToolbar={false}
            height={isDesktop ? 600 : 'auto'}
            plugins={[
              listPlugin,
              dayGridPlugin,
              timelinePlugin,
              timeGridPlugin,
              interactionPlugin,
            ]}
            customClassNames={{
              event: 'fc-event-time',
            }}
          />
        </StyledCalendar>
      </Card>

      <style>
        {`
          .fc-event-time{
            display: none !important;
          }
        `}
      </style>
    </>
  );
}

