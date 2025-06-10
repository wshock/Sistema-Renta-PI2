
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Register(){

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { signUp, isAuthenticated, registerErrors } = useAuth();

    const navigate = useNavigate();
    
    useEffect(() => {
        if (isAuthenticated) navigate("/feed")
    })


    const onSubmit = handleSubmit(async (values) => {
        await signUp(values);
    })


    return(
        <div className='form-box register'>
            <form onSubmit={onSubmit}>

                <h1 className='!mb-3'>Regístrate</h1>
                
                {
                    registerErrors.map((error, index) => (
                        <div className='text-red-700 bg-red-300 !-mb-4 rounded' key={index}>
                            {error}
                        </div>
                    ))
                }

                <div className='input-box'>
                    <input 
                        type='text' 
                        {...register("name", {required: true})}
                        placeholder='Nombre completo'
                    />

                    <i className='bx bxs-user'></i>
                </div>
                {errors.name && <p className='text-red-700 bg-red-300 !-mb-4 !-mt-4 rounded'>Ingresa tu nombre</p>}

                <div className='input-box'>
                    <input 
                        type='email' 
                        {...register("email", {
                            required: true,
                            pattern: /^[a-zA-Z0-9._%+-]+@unac\.edu\.co$/
                        })}
                        placeholder='Email'
                    />
                    <i className='bx bxs-envelope'></i>
                </div>
                {errors.email && <p className='text-red-700 bg-red-300 !-mb-4 !-mt-4 rounded'>Ingresa un email válido</p>}

                <div className='input-box'>
                    <input 
                        type='password' 
                        {...register("password", {required: true})}
                        placeholder='Contraseña'
                    />

                    <i className='bx bxs-lock-alt'></i>
                </div>
                {errors.password && <p className='text-red-700 bg-red-300 !-mt-4 !mb-4 rounded'>Contraseña requerida</p>}

                <button type='submit' className='btn'>Registrar</button>
            </form>
        </div>
    )
}

export default Register;