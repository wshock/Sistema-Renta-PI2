
import { useAuth } from '../context/AuthContext';

function Profile () {

    const { user, logOut } = useAuth();

    const onClickLogout = async () => {
        await logOut();
    }

    return(
        <div>
            <button onClick={onClickLogout} className="absolute top-6 right-6 bg-red-200 text-red-700 text-lg !px-5 !py-2 rounded-xl font-semibold shadow-md hover:bg-red-300 hover:shadow-lg transition-all">
                Logout
            </button>


            <p> Profile of: { user.name } </p>
        </div>
    )
}

export default Profile;