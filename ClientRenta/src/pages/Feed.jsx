import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import { getPostsRequest } from "../api/posts";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Llamar al backend para obtener los posts
    const fetchPosts = async () => {
      try {
        const res = await getPostsRequest();
        setPosts(res.data);
      } catch (error) {
        console.error("Error al obtener posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <div className="!fixed top-0 right-0 w-full">
        <Navbar />
      </div>

      <div className="grid gap-6 !mt-30 !mb-8">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            type_post={post.type_post}
            title={post.title}
            description={post.description}
            price={post.price}
            rental_duration={post.rental_duration}
            rental_unit={post.rental_unit}
            image={`http://localhost:3000${post.image_url}`} // Esto asume que en la BD guardaste `/uploads/nombre.jpg`
            user={post.user}
          />
        ))}
      </div>

      <Link to="/createpost">
        <button className="fixed bottom-6 right-6 bg-[#8fa9fc] text-white text-lg !px-5 !py-2 rounded-xl font-semibold shadow-md hover:bg-[#809dfe] hover:scale-103 hover:shadow-lg transition-all cursor-pointer">
          + Añadir post
        </button>
      </Link>
    </div>
  );
}

export default Feed;
