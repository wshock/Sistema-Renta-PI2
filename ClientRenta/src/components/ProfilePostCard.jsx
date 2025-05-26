import React from "react";

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
  return (
    <div className="!max-w-lg !rounded !overflow-hidden !shadow-lg !bg-white border !border-gray-200 relative">
      <img
        className="!w-full !h-48 !object-cover"
        src={"https://picsum.photos/200/200?blur=5"}
        alt="Post"
      />
      <div className="!px-6 !py-4">
        <div className="!font-bold !text-xl !mb-2">{title}</div>
        <p className="!text-gray-700 !text-base !mb-4">{description}</p>
        <div className="!text-sm !text-gray-600">
          <p>
            <span className="font-semibold">Tipo:</span> {type_post === "offer" ? "Ofrezco" : "Busco"}
          </p>
          <p>
            <span className="font-semibold">Precio:</span> ${price}
          </p>
          <p>
            <span className="font-semibold">Duración:</span> {rental_duration} {rental_unit}
          </p>
        </div>
        <button
          className="!p-1 absolute top-0 right-0 bg-red-400 text-white px-3 py-1 rounded hover:bg-red-600 transition flex items-center justify-center"
          onClick={onDelete}
          title="Eliminar"
        >
          {/* Ícono de basura SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h2a2 2 0 012 2v2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProfilePostCard;