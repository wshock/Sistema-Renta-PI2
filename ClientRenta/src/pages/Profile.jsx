import { useAuth } from "../context/AuthContext";
import userDefault from "../assets/user-default.svg";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { editProfileRequest } from "../api/profile.js";


const MySwal = withReactContent(Swal);

function Profile() {    

  const { user } = useAuth();
  const handleEditProfile = () => {
    MySwal.fire({
      title: "Editar perfil",
      html: (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            id="name"
            className="border !p-2 rounded w-full"
            placeholder="Nombre"
            defaultValue={user.name}
          />
          <textarea
            id="bio"
            className="border !p-2 rounded w-full"
            placeholder="Biografía"
            defaultValue={user.bio}
          />
        </div>
      ),
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      preConfirm: async () => {
        const name = document.getElementById("name").value.trim();
        const bio = document.getElementById("bio").value;
        if (!name) {
          Swal.showValidationMessage("No dejes vacío tu nombre!");
          return false;
        }
        if (bio.length > 300) {
          Swal.showValidationMessage(
            "La biografía no puede tener más de 300 caracteres"
          );
          return false;
        }
        if (name.length > 32) {
            Swal.showValidationMessage(
              "Tu nombre no puede tener más de 32 caracteres"
            );
            return false;
          }

        const updateInfo = {
          name,
          bio,
        };
        try {
          const res = await editProfileRequest(updateInfo);
          if (res.status === 200) {
            Swal.fire("Éxito", "Perfil actualizado correctamente", "success").then(() => {
                window.location.reload();
            });
          } else {
            throw new Error("Error en la actualización");
          }
        } catch (error) {
          console.log(error);
          Swal.fire("Error", "No se pudo actualizar el perfil", "error");
        }
      },
    });
  };
  return (
    <div>
      <a
        href="/feed"
        className="absolute top-6 left-6 bg-white text-blue-900 text-lg !px-5 !py-2 rounded-xl font-semibold shadow-md hover:bg-[#dde6ff] hover:scale-103 hover:shadow-lg transition-all"
      >
        Volver
      </a>

      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl !p-6 border border-gray-200 flex flex-row items-center gap-6">
          <img
            src={userDefault}
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md"
          />
          <div className="flex flex-col text-left flex-grow">
            <h2 className="text-2xl font-semibold text-gray-800 break-all overflow-hidden max-w-full">
              {user.name}
            </h2>
            <p className="text-gray-600 text-sm">{user.email}</p>
            <p className="!mt-2 text-gray-700 text-sm break-all overflow-hidden max-w-full">
              {user.bio}
            </p>
            <button
              onClick={handleEditProfile}
              className="!mt-4 bg-[#8ba6ff] text-white font-medium !px-5 !py-1 rounded-xl hover:bg-[#7f90c9] hover:scale-103 cursor-pointer transition shadow-md w-fit"
            >
              Editar perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
