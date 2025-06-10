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
            Swal.fire(
              "Éxito",
              "Perfil actualizado correctamente",
              "success"
            ).then(() => {
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
    <div className="!flex !flex-col !px-4 md:!px-12">
      <HomeButton />

      <div className="!flex !justify-center !items-center !min-h-60 !mt-20">
        <div className="!w-full !max-w-3xl !bg-white !shadow-2xl !rounded-2xl !p-6 !border !border-gray-200 !flex !flex-col md:!flex-row !items-center !gap-6">
          <img
            src={userDefault}
            alt="User Avatar"
            className="!w-28 !h-28 md:!w-32 md:!h-32 !rounded-full !border-4 !border-gray-300 !shadow-md"
          />
          <div className="!flex !flex-col !text-left !flex-grow !w-full">
            <h2 className="!text-xl md:!text-2xl !font-semibold !text-gray-800 !break-words">
              {user.name}
            </h2>
            <p className="!text-gray-600 !text-sm !break-all">{user.email}</p>
            <p className="!mt-2 !text-gray-700 !text-sm !break-words !whitespace-pre-wrap">
              {user.bio}
            </p>
            <button
              onClick={handleEditProfile}
              className="!mt-4 !bg-[#8ba6ff] !text-white !font-medium !px-5 !py-1 !rounded-xl !hover:bg-[#7f90c9] !hover:scale-103 !transition !shadow-md !w-fit"
            >
              Editar perfil
            </button>
          </div>
        </div>
      </div>


      <div className="!flex !flex-col !items-center !mt-10 !mb-8 !bg-gradient-to-b !from-white/90 !via-white/60 !to-gray-100/90 !shadow-md !rounded-lg !p-6 !border !border-gray-200 !w-full !max-w-5xl !mx-auto">
        <h2 className="!text-2xl md:!text-3xl !font-semibold !text-gray-800 !mb-6 !text-center">
          Post activos
        </h2>

        <div className="!flex !flex-col !gap-6 !items-center !w-full">
          {posts.map((post) => (
            <ProfilePostCard
              key={post.id}
              type_post={post.type_post}
              title={post.title}
              description={post.description}
              price={post.price}
              rental_duration={post.rental_duration}
              rental_unit={post.rental_unit}
              image={post.photo}
              onDelete={async () => {
                try {
                  const res = await deletePostRequest(post.id);
                  if (res.status === 200) {
                    Swal.fire(
                      "Éxito",
                      "Post eliminado correctamente",
                      "success"
                    ).then(() => {
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
