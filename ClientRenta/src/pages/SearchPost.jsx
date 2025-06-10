import { searchPostsRequest } from "../api/posts";
import HomeButton from "../components/HomeButton";
import { useState } from "react";
import PostCard from "../components/PostCard";


function SearchPost() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!search.trim()) {
      console.log('Por favor, ingresa un término de búsqueda.');
      return;
    }
    try {
      const res = await searchPostsRequest(search);
      if (res.data && res.data.length > 0) {
        setResults(res.data);
        console.log('Resultados encontrados:', res.data);
      } else {
        console.log('No se encontraron resultados.');
        setResults([]);
      }
    } catch (error) {
      console.error('Error al buscar:', error);
    }
  };

  return (
    <div className="!flex !flex-col !items-center !min-h-screen !px-4 !pt-24 !pb-10 ">
      <HomeButton />


      <div className="!flex !flex-col sm:!flex-row !items-center !justify-center !gap-4 !w-full sm:!w-auto !mb-10">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Busca un producto..."
          className="bg-amber-50 !border !border-gray-300 !rounded-xl !px-5 !py-2 text-lg !shadow-md focus:outline-none !focus:ring-2 !focus:ring-blue-200 !transition-all !w-full sm:!w-80"
        />
        <button
          onClick={handleSearch}
          className="bg-[#8fa9fc] text-white text-lg !px-5 !py-2 !rounded-xl !font-semibold !shadow-md hover:!bg-[#809dfe] hover:scale-103 hover:!shadow-lg transition-all !w-full sm:!w-auto"
        >
          Buscar
        </button>
      </div>


      <div className="!flex !flex-col !gap-6 !w-full max-w-2xl">
        {results.map((post) => (
          <PostCard
            key={post.id}
            type_post={post.type_post}
            title={post.title}
            description={post.description}
            price={post.price}
            rental_duration={post.rental_duration}
            rental_unit={post.rental_unit}
            image={post.photo}
            userName={post.name}
            userEmail={post.email}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchPost;