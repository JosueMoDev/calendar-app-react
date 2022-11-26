import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const temEvents = {
    _id: new Date().getTime(),
    title: "Chief's brithday",
    notes: "buying a brithday cake",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafa',
    user: {
        _id: '12345',
        name: 'Jonas Morales'
    }
}    
export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [ temEvents ],
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
                if (event._id === payload._id) { 
                    return payload;
                }
                return event
            })
        },
        onDeleteEvent: (state) => { 
            if (state.activeEvent) { 
                state.events = state.events.filter(event => event._id !== state.activeEvent._id);
                state.activeEvent = null;
            }
        }
   }
});
export const { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;