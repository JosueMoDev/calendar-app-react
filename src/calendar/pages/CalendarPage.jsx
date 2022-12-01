import { useEffect, useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { NavBar, CalendarEvent, CalendarModal, FlyingActionButton, FlyingDeleteButton } from '../'
import { localizer } from '../../helpers'
import { useUiStore, useCalendarStore } from '../../hooks'


export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents, isLoadingEvents} = useCalendarStore();
  const [lastWiew, setLastWiew] = useState(localStorage.getItem('lastView') || 'week');
  const eventStyleGetter = ( event, start, end, isSelected ) => { 
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color:'#fafafa'
    }
    return {
      style
    }
  }
  const onDoubleClick = () => openDateModal();
  const onSelect = (event) => setActiveEvent(event);
  const onViewChange = (event) => {
    localStorage.setItem('lastView', event);
    setLastWiew(event);
  }

  useEffect(() => {
    startLoadingEvents();
  }, [])
  
  return (
    <>
      <NavBar />
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={ lastWiew }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        // Set Spanish Language 
        // messages = {getMessagesES()} - you have to import this function from helpers
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={ onViewChange }
      />
      <CalendarModal />
      <FlyingActionButton />
      <FlyingDeleteButton />
    </>
  )
}
