
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(){

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { signIn, isAuthenticated, loginErrors } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate("/profile")
    })

    const onSubmit = handleSubmit(async (values)=>{
        await signIn(values)
    })

    return(
            <div className='form-box login'>
                <form onSubmit={onSubmit}>

                    <h1 className='!mb-3'>Ingresa</h1>
                    {
                        loginErrors.map((error, index) => (
                            <div className='text-red-700 bg-red-300 !-mb-4 rounded' key={index}>
                                {error}
                            </div>
                        ))
                    }
                    <div className='input-box'>
                        <input 
                            type='email' 
                            {...register("email", {required: true})}
                            placeholder='Email'
                        />
                        <i className='bx bxs-envelope'></i>
                    </div>
                    {errors.email && <p className='text-red-700 bg-red-300 !-mb-4 !-mt-4 rounded'>Email requerido</p>}

                    <div className='input-box'>
                        <input 
                            type='password' 
                            {...register("password", {required: true})}
                            placeholder='Contraseña'
                        />

                        <i className='bx bxs-lock-alt'></i>
                    </div>
                    {errors.password && <p className='text-red-700 bg-red-300 !-mt-4 !mb-6 rounded'>Contraseña requerida</p>}

                    <div className='forgot-link'> 
                        <a href='#'>¿Olvidaste tu contraseña?</a>
                    </div>

                    <button type='submit' className='btn'>Ingresar</button>
                </form>
            </div>

    )
     
}

export default Login;