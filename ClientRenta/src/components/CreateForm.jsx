import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { createPostRequest } from "../api/posts";

const CreateForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    type_post: "offer",
    title: "",
    description: "",
    price: "",
    rental_duration: "",
    rental_unit: "days",
    status: "active",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formPayload = new FormData();
  formPayload.append("user_id", user.id);
  formPayload.append("type_post", formData.type_post);
  formPayload.append("title", formData.title);
  formPayload.append("description", formData.description);
  formPayload.append("price", formData.price);
  formPayload.append("rental_duration", formData.rental_duration);
  formPayload.append("rental_unit", formData.rental_unit);
  formPayload.append("status", formData.status);
  if (formData.photo) {
    formPayload.append("photo", formData.photo);
  }

  console.log("Form data being sent:", Object.fromEntries(formPayload.entries()));

  try {
    const response = await createPostRequest(formPayload); // No metas JSON
    if (response.status === 201 || response.status === 200) {
      navigate("/feed");
    } else {
      throw new Error("Error en la respuesta del servidor");
    }
  } catch (error) {
    console.error("Error al crear el post:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo crear el post. Intenta nuevamente.",
      confirmButtonColor: "#3085d6",
    });
  }
};
  return (
    <>
      <div className=" !my-10 flex flex-col !p-10 w-xl mx-auto bg-white rounded-md shadow-2xl">
        <h2 className="text-2xl font-bold mb-4">Crear un Post</h2>

        <form onSubmit={handleSubmit} className="space-y-4" action="">
          <div className="flex flex-col bg-slate-50 rounded-md !p-3 !my-4">
            <label className="text-lg font-medium" htmlFor="type_post">
              Tipo de publicación
            </label>
            <select
              name="type_post"
              id="type_post"
              value={formData.type_post}
              onChange={handleChange}
              className="!p-1"
            >
              <option value="offer">Ofrezco</option>
              <option value="request">Busco</option>
            </select>
          </div>

          <div className="flex flex-col bg-slate-50 rounded-md !p-3 !my-4">
            <label className="text-lg font-medium" htmlFor="title">
              Título
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="!p-1"
            />
          </div>

          <div className="flex flex-col bg-slate-50 rounded-md !p-3 !my-4">
            <label className="text-lg font-medium" htmlFor="description">
              Descripción
            </label>
            <textarea
              className="!p-1"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows="3 " // Puedes ajustar el número de filas según sea necesario
            ></textarea>
          </div>

          <div className="flex flex-col bg-slate-50 rounded-md !p-3 !my-4">
            <label className="text-lg font-medium" htmlFor="price">
              Precio
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="!p-1"
              min="0"
            />
          </div>

          <div className="flex flex-col bg-slate-50 rounded-md !p-3 !my-4">
            <label className="text-lg font-medium" htmlFor="rental_duration">
              Duración del arriendo
            </label>
            <input
              type="number"
              name="rental_duration"
              id="rental_duration"
              value={formData.rental_duration}
              onChange={handleChange}
              className="!p-1"
              min="0"
            />
          </div>

          <div className="flex flex-col bg-slate-50 rounded-md !p-3 !my-4">
            <label className="text-lg font-medium" htmlFor="rental_unit">
              Unidad
            </label>
            <select
              name="rental_unit"
              id="rental_unit"
              value={formData.rental_unit}
              onChange={handleChange}
              className="!p-1"
            >
              <option value="days">Días</option>
              <option value="weeks">Semanas</option>
              <option value="months">Meses</option>
            </select>
          </div>

          
          <div className="flex flex-col bg-slate-50 rounded-md !p-3 !my-4">
            <label className="text-lg font-medium mb-2" htmlFor="photo">
              Imagen
            </label>
            <input
              type="file"
              name="photo"
              id="photo"
              accept="image/*"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  photo: e.target.files[0],
                }))
              }
              className="!mt-2 text-sm text-gray-500"
            />
            <button
              type="button"
              className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition "
              onClick={() => document.getElementById("photo").click()}
            >
              Subir imagen
            </button>
            {formData.photo && (
              <span className="mt-2 text-sm text-gray-600">{formData.photo.name}</span>
            )}
          </div>

          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm !px-5 !py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Publicar
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateForm;
