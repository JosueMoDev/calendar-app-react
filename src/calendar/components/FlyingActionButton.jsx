import { addHours } from 'date-fns';
import React from 'react'
import { useCalendarStore, useUiStore } from '../../hooks'

export const FlyingActionButton = () => {
    const { openDateModal } = useUiStore();
    const { setActiveEvent  } = useCalendarStore();

    const handleClickNew = () => { 

        setActiveEvent({
            title: "hola",
            notes: "mundo",
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafa',
            user: {
                _id: '12345',
                name: 'Jonas Morales'
            }
        });
        openDateModal();
    }

    return (
    <button
        className='btn btn-primary flybutton'
        onClick={ handleClickNew }
    >
    <i className=' fas fa-plus '></i> 
    </button>
  )
}
