import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { useEffect, useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns';
import { CalendarEventBox, CalendarModal, FabAddNew, FabDelete, NavBar } from '../'
import { localizer, getMessagesES } from '../../helper/';
import { useUiStore,useCalendarStore, useAuthStore } from '../../hooks/';




export const CalendarPage = () => {

  const { user } = useAuthStore();

  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()
  

  const { openDateModal } = useUiStore()

  
  const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'week');


  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      color: 'white',
      opacity: '0.8',
    }

    return {
      style
    }
  }


  const onDoubleClick = ( event ) => {
    // console.log({ doubleClick: event})
    openDateModal()
  }
  
  const onSelect = ( event ) => {
    setActiveEvent(event)
  }

  const onViewChanged = ( event ) => {
    localStorage.setItem('lastView', event);
    setlastView( event );
  }

  useEffect(() => {
    startLoadingEvents()
  }, [])
  

  return (
    <>
      <NavBar/>

      <Calendar
      culture='es'
      localizer={localizer}
      events={events}
      defaultView={lastView}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 'calc( 100vh - 80px)' }}
      messages={ getMessagesES() }
      eventPropGetter={ eventStyleGetter }
      components={{
        event: CalendarEventBox
      }}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelect}
      onView={ onViewChanged}
    />

    <CalendarModal/>
    <FabAddNew />
    <FabDelete />
    </>
  )
}
