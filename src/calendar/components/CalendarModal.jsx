import { useMemo, useState, useEffect } from 'react';
import Modal from 'react-modal'
import { addHours, differenceInSeconds } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useCalendarStore, useUiStore } from '../../hooks';

// Do this configuration if you want set spanish,  
// import { registerLocale } from "react-datepicker";
// import es from 'date-fns/locale/es';
// registerLocale('es', es)

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');
export const CalendarModal = () => {
    const { isDataModalOpen, closeDateModal } = useUiStore();

    const { activeEvent, startSavingEvent } = useCalendarStore();

    

    const [formSubmitted, SetFormSubmitted] = useState(false);

    
    const [formValues, setFormValues] = useState({
        title: 'Mom bithday',
        notes: 'buy cake',
        start: new Date(),
        end: addHours( new Date(), 2 )
    });

  console.log(formValues)
    
    const titleClass = useMemo(
        () => {
            if (!formSubmitted) return '';
            return (formValues.title.length > 0 ? '' : 'is-invalid')
        }, [formValues.title, formSubmitted]);

    
    useEffect(() => {
        if (activeEvent !== null) { 
            setFormValues({ ...activeEvent });
        }
    }, [ activeEvent ])
    const onInputChange = ({ target }) => { 
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChange = ( event, changing) => { 
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }
    const onSubmit = async(event) => { 
        event.preventDefault();
        SetFormSubmitted(true);
        const difference = differenceInSeconds(formValues.end, formValues.start);
        if (isNaN(difference)|| difference <=0 ) {
            Swal.fire({
                title: 'error',
                icon: 'error',
                text: 'Check date',
                timer: 2000,
                showConfirmButton:false
            });
            return
        }
        if( formValues.title.length<=0) return
        console.log(formValues);
        await startSavingEvent(formValues);
        closeDateModal();
        SetFormSubmitted(false);
    }
    return (
        <Modal
        isOpen={ isDataModalOpen }
        onRequestClose={closeDateModal}
        style={customStyles}
        className='modal'
        overlayClassName='modal-bg'
        closeTimeoutMS={ 200 }
        >
           <h1> New Event </h1>
            <hr />
            <form className="container" onSubmit={ onSubmit }>

                <div className="form-group mb-2">
                    <label>Date and Hour Starts</label>
                    <DatePicker
                        selected={formValues.start}
                        onChange={ (event) => onDateChange(event, 'start') }
                        className='form-control'
                        dateFormat="Pp"
                        showTimeSelect
                    />                    
                </div>

                <div className="form-group mb-2">
                    <label>Date and Hour Ends</label>
                    <DatePicker
                        minDate={ formValues.start }
                        selected={formValues.end}
                        onChange={ (event) => onDateChange(event, 'end') }
                        className='form-control'
                        dateFormat="Pp"
                        showTimeSelect
                        // locale='es'
                        //timeCaption='hora'- set header to spanish

                    />  
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Title and Notes</label>
                    <input 
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Title event"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={ onInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Sort Description</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notes"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={ onInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Additional information</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Save </span>
                </button>

            </form>
        </Modal>
    )
}
