import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";

function Feed() {

    return (
        <div>
            <div className="!fixed top-0 right-0 w-full">
                <Navbar />
            </div>

            <h1>Render posts...</h1>

            <Link to="/createpost">
                <button
                    className="fixed bottom-6 right-6 bg-[#8fa9fc] text-white text-lg !px-5 !py-2 rounded-xl font-semibold shadow-md hover:bg-[#809dfe] hover:scale-103 hover:shadow-lg transition-all cursor-pointer"
                >
                    + Añadir post
                </button>
            </Link>

        

        </div>
        
    )

}

export default Feed;