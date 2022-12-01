import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthStore } from '../../hooks';

export const NavBar = () => {
    const { startLogout, user } = useAuthStore();

  return (
      <div className='navbar navbar-dark bg-dark mb-4 px-4'>
          <span className='navbar-brand'>
              <i className='fas fa-calendar-alt'></i>&nbsp;
              <strong className='pl-2'>CalendarApp</strong>
          </span>
          <div> 
                <strong className='text-light p-4' >
                    {user.name}
                </strong>
                <button className='btn btn-outline-light'
                onClick={ startLogout }
                >
                    <i className='fas fa-sign-out-alt'></i>
                    <span> Logout</span>
                </button>
            </div>
      </div>
  )
}
