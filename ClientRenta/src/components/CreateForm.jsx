import React, { useState } from 'react'

const CreateForm = () => {
  
  const [formData, setFormData] = useState({
    type_post: 'offer',
    title: '',
    description: '',
    price: '',
    rental_duration: '',
    rental_unit: 'days',
    status: 'active',
  })


  const handleChange = ((e)=> {
    const {name, value} = e.target;
    setFormData( prev => ({
      ...prev,
      [name]: value,
    })

    )
  })


  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Formulario enviado")
    console.log(formData)
  }
  return (
    <div className=' !my-10 flex flex-col !p-10 max-w-xl min-w-lg mx-auto my-auto bg-white rounded-md shadow-2xl'>
        <h2 className='text-2xl font-bold mb-4'>Crear un Post</h2>
        
        <form onSubmit={handleSubmit} className='space-y-4' action="">

          <div className='flex flex-col bg-slate-50 rounded-md !p-3 !my-4'>
            <label htmlFor="type_post">Tipo de publicación</label>
            <select name="type_post" id="type_post" value={formData.type_post} onChange={handleChange}
            className=''> 
              <option value="offer">Ofrezco</option>
              <option value="request">Busco</option>
            </select>
          </div>


          <div className='flex flex-col bg-slate-50 rounded-md !p-3 !my-4'>
            <label htmlFor='title'>Título</label>
            <input type="text" name='title' id='title' value={formData.title} onChange={handleChange}
            className=''/>
          </div>


          <div className='flex flex-col bg-slate-50 rounded-md !p-3 !my-4'>
            <label htmlFor='description'>Descripción</label>
            <textarea
              className = '!p-2'
              name='description'
              id='description'
              value={formData.description}
              onChange={handleChange}
              rows="3 " // Puedes ajustar el número de filas según sea necesario
            ></textarea>
          </div>


          <div className='flex flex-col bg-slate-50 rounded-md !p-3 !my-4'>
            <label htmlFor="rental_duration">Duración del arriendo</label>
            <input type="number" name='rental_duration' id='rental_duration' value={formData.rental_duration} onChange={handleChange}
            className=''/>
          </div>

          <div className='flex flex-col bg-slate-50 rounded-md !p-3 !my-4'>
            <label htmlFor="price">Precio</label>
            <input type="number" name='price' id='price' value={formData.price} onChange={handleChange}/>
          </div>

          <div className='flex flex-col bg-slate-50 rounded-md !p-3 !my-4'>
            <label htmlFor="rental_unit">Unidad</label>
            <select name="rental_unit" id="rental_unit" value={formData.rental_unit} onChange={handleChange}>
              <option value="days">Días</option>
              <option value="weeks">Semanas</option>
              <option value="months">Meses</option>
            </select>
          </div>


          <button type='submit'>
            Publicar  
          </button>
        </form>
    </div>
  )
}

export default CreateForm