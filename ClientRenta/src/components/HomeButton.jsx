import { useNavigate } from "react-router-dom"


function HomeButton (){
    const navigate = useNavigate();
    
    const handleBack = () => {
        navigate(-1)
    }

    return (

        <button onClick={handleBack}
        className="absolute top-6 left-6 bg-white text-blue-900 text-lg !px-5 !py-2 rounded-xl font-semibold shadow-md hover:bg-[#dde6ff] hover:scale-103 hover:shadow-lg transition-all
        ">Atrás
        </button>

    )

    
}

export default HomeButton