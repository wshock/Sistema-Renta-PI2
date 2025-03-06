
import { useForm } from 'react-hook-form';

function Login(){

    const { register, handleSubmit, formState: { errors } } = useForm();

    return(
            <div className='form-box login'>
                <form onSubmit={handleSubmit()}>

                    <h1>Ingresa</h1>

                    <div className='input-box'>
                        <input 
                            type='email' 
                            {...register("email", {required: true})}
                            placeholder='Email'
                        />
                        <i className='bx bxs-envelope'></i>
                    </div>
                    {errors.email && <span>Email requerido</span>}

                    <div className='input-box'>
                        <input 
                            type='password' 
                            {...register("password", {required: true})}
                            placeholder='Contraseña'
                        />

                        <i className='bx bxs-lock-alt'></i>
                    </div>
                    {errors.password && <span>Contraseña requerida</span>}

                    <div className='forgot-link'> 
                        <a href='#'>¿Olvidaste tu contraseña?</a>
                    </div>

                    <button type='submit' className='btn'>Ingresar</button>
                </form>
            </div>

    )
     
}

export default Login;