
import { useForm } from 'react-hook-form'

function Register(){

    const { register, handleSubmit, formState: { errors } } = useForm();
    
    return(
        <div className='form-box register'>
            <form onSubmit={handleSubmit()}>

                <h1>Regístrate</h1>

                <div className='input-box'>
                    <input 
                        type='text' 
                        {...register("text", {required: true})}
                        placeholder='Nombre completo'
                    />

                    <i className='bx bxs-user'></i>
                </div>

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
                {errors.email && <span>Ingresa un email válido</span>}

                <div className='input-box'>
                    <input 
                        type='password' 
                        {...register("password", {required: true})}
                        placeholder='Contraseña'
                    />

                    <i className='bx bxs-lock-alt'></i>
                </div>
                {errors.password && <span>Contraseña requerida</span>}

                <button type='submit' className='btn'>Registrar</button>
            </form>
        </div>
    )


 /*   return(
        <div className='form-box register'>

            <form onSubmit={handleSubmit()}>
                <input type='text' {...register("username",{required: true})}/>
                <input type='email' {...register("email", {
                    required: true,
                    pattern: /^[a-zA-Z0-9._%+-]+@unac\.edu\.co$/
                })}/>
                {errors.email && <span>El correo debe ser válido y terminar en @unac.edu.co</span>}
                <input type='password' {...register("password",{required: true})}/>
                <button type='submit'>Registrar</button>
            </form>

        </div>
    )
  */  
}

export default Register;