import React from "react";

const PostCard = ({ type_post, title, description, price, rental_duration, rental_unit, image, user={name: "---", email: "---"} }) => {
  return (
    <div className="!max-w-lg !rounded !overflow-hidden !shadow-lg !bg-white border !border-gray-200">
      <img
        className="!w-full !h-48 !object-cover"
        src={"https://picsum.photos/200/200?blur=5"} // Imagen por defecto si no se proporciona una
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
          <p className="!mt-4 !text-gray-500 bg-gray-100 !p-2 !rounded">
            <span className="font-semibold">Contacto:</span> {user?.name} ({user?.email})
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;