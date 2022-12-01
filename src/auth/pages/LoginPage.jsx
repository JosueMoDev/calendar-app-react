import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';

const loginFormFields = {
    loginEmail : '',
    loginPassword : '',

}
const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerConfirmPassword: '',
}

export const LoginPage = () => {
    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);
    
    const { registerName, registerEmail, registerPassword, registerConfirmPassword, onInputChange: onRegisterInputChange
    } = useForm(registerFormFields);
    
    const onLoginSubmit = ( event ) => { 
        event.preventDefault();
        startLogin({ email:loginEmail, password:loginPassword });
    }

    const onRegisterSubmit = ( event ) => { 
        event.preventDefault();
        if (registerPassword !== registerConfirmPassword) {
            return Swal.fire({
                icon: 'error',
                title: 'Password and confirmation password are diferents',
                showConfirmButton: false,
                timer:2000
            })
        }
        startCreatingANewUser({ name: registerName, email:registerEmail, password:registerPassword});
    }

    const { startLogin, errorMessage, startCreatingANewUser } = useAuthStore()

    useEffect(() => {
        if (errorMessage !== undefined) { 
            Swal.fire({
                icon: 'error',
                title: errorMessage,
                showConfirmButton: false,
                timer:2000
            });
        }
    }, [errorMessage])
    
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>LogIn</h3>
                    <form onSubmit={onLoginSubmit}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="email"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Register</h3>
                    <form onSubmit={onRegisterSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name='registerName'
                                value={registerName}
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name='registerEmail'
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                                
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password" 
                                name='registerPassword'
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm Password" 
                                name='registerConfirmPassword'
                                value={registerConfirmPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Create a new account" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
