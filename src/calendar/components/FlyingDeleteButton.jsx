
import { useCalendarStore } from '../../hooks'

export const FlyingDeleteButton = () => {
    const { startDeletingEvent, hasEventSelected } = useCalendarStore();
    const handleDeleteEvent = () => {
        
        startDeletingEvent();
    }
    return (
    <button
        className='btn btn-danger flybuttonDelete'
        onClick={ handleDeleteEvent }
        style={{
            display: !hasEventSelected&&'none'
        }}
    >
    <i className=' fas fa-trash-alt '></i> 
    </button>
  )
}
