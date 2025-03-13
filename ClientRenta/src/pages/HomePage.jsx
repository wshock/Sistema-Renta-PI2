
import { Navigate, useNavigate } from "react-router-dom";

function HomePage () {

    const navigate = useNavigate();

    const onClickHome = () => {
        navigate("/log-reg")
    }

    return (
        <div>
            <button onClick={onClickHome} className="absolute top-6 right-6 bg-white text-blue-950 text-lg !px-5 !py-2 rounded-xl font-semibold shadow-md hover:bg-blue-200 hover:shadow-lg transition-all">
                Ingresa
            </button>

            <div> Home Page </div>
        </div>
        
        
    )
}

export default HomePage;