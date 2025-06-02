import { useAuth } from "../context/AuthContext";
import userDefault from "../assets/user-default.svg";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { editProfileRequest } from "../api/profile.js";
import HomeButton from "../components/HomeButton.jsx";
import { useEffect, useState } from "react";
import { getUserPostsRequest, deletePostRequest } from "../api/posts";
import ProfilePostCard from "../components/ProfilePostCard.jsx";

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


  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Llamar al backend para obtener los posts
    const fetchPosts = async () => {
      try {
        const res = await getUserPostsRequest(user.id);
        setPosts(res.data);
      } catch (error) {
        console.error("Error al obtener posts:", error);
      }
    };

    fetchPosts();
  }, []);



  return (
    <div className="flex flex-col">
      <HomeButton></HomeButton>

      <div className="flex justify-center items-center min-h-60">
        <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl !p-6 border border-gray-200 flex flex-row items-center gap-6">
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

      <div className="flex flex-col justify-center space-between items-center !mt-6 !mb-4 bg-gradient-to-b from-white/90 via-white/60 to-gray-100/90 shadow-md rounded-lg p-4 border border-gray-200 w-3xl"> 
        <h2 className="text-3xl !mt-10 font-semibold text-gray-800">Post activos</h2>

        <div className="grid gap-6 !my-15">
        {posts.map((post) => (
          <ProfilePostCard
            key={post.id}
            type_post={post.type_post}
            title={post.title}
            description={post.description}
            price={post.price}
            rental_duration={post.rental_duration}
            rental_unit={post.rental_unit}
            image={post.photo} // Esto asume que en la BD guardaste `/uploads/nombre.jpg`
            onDelete={async () => {
              try {
                const res = await deletePostRequest(post.id);
                if (res.status === 200) {
                  Swal.fire("Éxito", "Post eliminado correctamente", "success").then(() => {
                    window.location.reload();
                  });
                } else {
                  throw new Error("Error al eliminar el post");
                }
              } catch (error) {
                console.error(error);
                Swal.fire("Error", "No se pudo eliminar el post", "error");
              }
            }}
          />
        ))}
      </div>
      </div>

      
    </div>
  );
}

export default Profile;
