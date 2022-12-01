import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { converEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onSetAllCalendarEvents} from "../store";

export const useCalendarStore = () => { 
    const dispatch = useDispatch();
    const { events, activeEvent, isLoadingEvents } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    
    const setActiveEvent = (calendarEvent) => dispatch(onSetActiveEvent(calendarEvent));

    const startLoadingEvents = async () => { 

        try {
            const { data } = await calendarApi.get('/all-events');
            const events = converEventsToDateEvents(data.events);
            dispatch(onSetAllCalendarEvents(events));
        } catch (error) {
            console.log(error)
        }
    }
    const startSavingEvent = async (calendarEvent) => { 
        


        // *ok
        try {
            if (calendarEvent.id) {
                // ? update an event
                await calendarApi.put(`/edit-event/${calendarEvent.id}`, calendarEvent)
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
            } else { 
                // ? create an event
                const { data } = await calendarApi.post('/new-event', calendarEvent);
                dispatch(onAddNewEvent({ ...calendarEvent, id:data.savedEvent.id, user }));
            }
        } catch (error) {
            console.log(error.respose.data);
            Swal.fire({
                icon: 'error',
                title: 'Error saving',
                text: error,
                showConfirmButton: false,
                timer:2000
            });
        }
   
    }

    const startDeletingEvent = async () => {
        try {
            
            // ? deleting an event
            await calendarApi.delete(`/delete-event/${activeEvent.id}`)
            dispatch(onDeleteEvent());
            
        } catch ( error) {
            Swal.fire({
                icon: 'error',
                title: "Error deleting event",
                text: error.response.data.message,
                showConfirmButton: false,
                timer:2000
            });
        }
    }

    return {
        // * PROPERTIES
        activeEvent,
        events,
        isLoadingEvents,
        hasEventSelected: !!activeEvent,
        // * METHODS
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent, 
        startLoadingEvents

    }
}