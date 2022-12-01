import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents:true,
        events: [],
        activeEvent: null
    },
    reducers: {
       
        onSetActiveEvent: (state, { payload }) => { 
            state.activeEvent = payload; 
        },
        onAddNewEvent: (state, { payload }) => { 
            state.events.push(payload);
            state.activeEvent = null; 
        },
        onUpdateEvent: (state, { payload }) => { 
            state.events = state.events.map(event => { 
                if (event.id === payload.id) { 
                    return payload;
                }
                return event
            })
        },
        onDeleteEvent: (state) => { 
            if (state.activeEvent) { 
                state.events = state.events.filter(event => event.id !== state.activeEvent.id);
                state.activeEvent = null;
            }
        },
        onSetAllCalendarEvents: (state, { payload }) => {
            // state.events = state.events = [...payload];
            payload.forEach(event => {
                const eventExists = state.events.some(dbEvent => dbEvent.id === event.id);
                if (!eventExists) { 
                    state.events.push( event)
                }
            });
            state.isLoadingEvents = false;
        },
        onClearStore: (state ) => { 
            state.isLoadingEvents = false;
            state.activeEvent = null;
            state.events = [];
        }
   }
});
export const {
    onAddNewEvent,
    onSetActiveEvent,
    onUpdateEvent,
    onDeleteEvent,
    onSetAllCalendarEvents,
    onClearStore
} = calendarSlice.actions;