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

    console.log(
      "Form data being sent:",
      Object.fromEntries(formPayload.entries())
    );

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
      <div className="!my-20 !p-6 sm:!p-8 md:!p-10 !mx-auto !bg-white !rounded-md !shadow-2xl 
                !w-[320px] sm:!w-[500px] md:!w-[650px] lg:!w-[700px] xl:!w-[700px]">
        <h2 className="!text-2xl !font-bold !mb-4 !mt-4 !text-center">
          Crear un Post
        </h2>

        <form onSubmit={handleSubmit} className="!space-y-4">
          {[
            {
              label: "Tipo de publicación",
              name: "type_post",
              type: "select",
              options: [
                { value: "offer", label: "Ofrezco" },
                { value: "request", label: "Busco" },
              ],
            },
            {
              label: "Título",
              name: "title",
              type: "text",
            },
            {
              label: "Descripción",
              name: "description",
              type: "textarea",
            },
            {
              label: "Precio",
              name: "price",
              type: "number",
            },
            {
              label: "Duración del arriendo",
              name: "rental_duration",
              type: "number",
            },
            {
              label: "Unidad",
              name: "rental_unit",
              type: "select",
              options: [
                { value: "days", label: "Días" },
                { value: "weeks", label: "Semanas" },
                { value: "months", label: "Meses" },
              ],
            },
          ].map((field) => (
            <div
              key={field.name}
              className="!flex !flex-col !bg-slate-50 !rounded-md !p-4"
            >
              <label className="!text-lg !font-medium !mb-1" htmlFor={field.name}>
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  id={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  rows="3"
                  className="!p-2 !rounded !border !border-gray-300"
                />
              ) : field.type === "select" ? (
                <select
                  name={field.name}
                  id={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="!p-2 !rounded !border !border-gray-300"
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="!p-2 !rounded !border !border-gray-300"
                  min={field.type === "number" ? "0" : undefined}
                />
              )}
            </div>
          ))}

          <div className="!flex !flex-col !bg-slate-50 !rounded-md !p-4">
            <label className="!text-lg !font-medium !mb-2" htmlFor="photo">
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
              className="!text-sm !text-gray-500 hidden"
            />
            <button
              type="button"
              className="!bg-blue-500 !text-white !rounded !px-4 !py-2 !hover:bg-blue-600 !transition !w-fit"
              onClick={() => document.getElementById("photo").click()}
            >
              Subir imagen
            </button>
            {formData.photo && (
              <span className="!mt-2 !text-sm !text-gray-600">
                {formData.photo.name}
              </span>
            )}
          </div>

          <div className="!text-center !pb-6">
            <button
              type="submit"
              className="!text-white !bg-blue-700 !hover:bg-blue-800 !focus:ring-4 !focus:ring-blue-300 !font-medium !rounded-lg !text-sm !px-6 !py-2.5 !transition"
            >
              Publicar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateForm;
