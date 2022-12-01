import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { onChecking, onLogin, onLogout, onClearErrorMessage, onClearStore } from "../store";
import { useCalendarStore } from "./useCalendarStore";



export const useAuthStore = () => { 
    const dispatch = useDispatch();
    const { status, user, errorMessage } = useSelector(state => state.auth);
    
    const startLogin = async ({ email, password }) => { 

        dispatch(onChecking);
        try {
            const { data } = await calendarApi.post('/auth/login', { email, password });
            localStorage.setItem('token', data.user.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            
            dispatch(onLogin({ email , user_id: data.user.user_id, username: data.user.username }));
            
        } catch (error) {
            dispatch(onLogout('Check your credentials'));
            setTimeout(() => {
                dispatch(onClearErrorMessage());
            }, 1000);
        }
    }

    const startCreatingANewUser = async ({ name, email, password }) => {
        dispatch(onChecking);
        try {
            const { data } = await calendarApi.post('/auth/register', { name, email, password });
            localStorage.setItem('token', data.user.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ email, username: name, token: data.user.token }));

        } catch (error) {
            const errorMessage = error.response.data?.message || 'You must fill all fields';

            dispatch(onLogout(errorMessage));
            setTimeout(() => {
                dispatch(onClearErrorMessage());
            }, 1000);
        }

    }

    const checkingIfTokenIsValid = async () => { 
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {

            const { data } = await calendarApi.get('/auth/renew-token');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, user_id: data.user_id }));

        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    } 
    const startLogout = () => { 

        localStorage.clear();
        dispatch(onClearStore());
        dispatch(onLogout());
    }

    return {
        // * PROPERTIES
        status,
        user,
        errorMessage,
        // *METHODS
        startLogin,
        startCreatingANewUser,
        checkingIfTokenIsValid,
        startLogout
    }
}