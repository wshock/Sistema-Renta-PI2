import Swal from "sweetalert2";

const ProfilePostCard = ({
  type_post,
  title,
  description,
  price,
  rental_duration,
  rental_unit,
  image,
  onDelete,
}) => {
  // Función para confirmar eliminación
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el post permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      onDelete();
    }
  };

  return (
    <div className="!w-full !max-w-md !rounded-xl !overflow-hidden !shadow-lg !bg-white !border !border-gray-200 !relative !mx-auto">
      <img
        className="!w-full !h-48 !object-cover"
        src={`http://localhost:5000/uploads/${image}`}
        alt="Post"
      />
      <div className="!px-6 !py-4">
        <div className="!font-bold !text-xl !mb-2 !break-words">{title}</div>
        <p className="!text-gray-700 !text-base !mb-4 !break-words">
          {description}
        </p>
        <div className="!text-sm !text-gray-600 !space-y-1">
          <p>
            <span className="!font-semibold">Tipo:</span>{" "}
            {type_post === "offer" ? "Ofrezco" : "Busco"}
          </p>
          <p>
            <span className="!font-semibold">Precio:</span> ${price}
          </p>
          <p>
            <span className="!font-semibold">Duración:</span> {rental_duration}{" "}
            {rental_unit}
          </p>
        </div>
        <button
          className="!p-1 !absolute !top-0 !right-0 !bg-[#8ba6ff] !text-white !px-3 !py-1 !rounded !hover:bg-red-600 !transition !flex !items-center !justify-center"
          onClick={handleDelete}
          title="Eliminar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="!h-5 !w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h2a2 2 0 012 2v2"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProfilePostCard;
