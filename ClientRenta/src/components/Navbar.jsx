import { useAuth } from '../context/AuthContext';
import logoElkin from '../assets/e l k i n ..svg'

function Navbar(){

    const { logOut } = useAuth();

    const onClickLogout = async () => {
        await logOut();
    }
    return(
        <header className='!flex !justify-between !items-center !text-black !py-6 !px-8 
                           !md:px-32 !bg-white !drop-shadow-md'>

            <a href=''>
                <img src={ logoElkin } className='w-32 hover:scale-103 transition-all' />
            </a>

            <div className='relative !ml-32 flex items-center justify-center gap-3'>
                <i className='bx bx-search absolute left-3 text-gray-500'></i>
                <input type='text' placeholder=' Busca tu producto...' className='!py-2 !pl-10 rounded-xl focus:bg-slate-100'/>
            </div>

            <div className='flex items-center gap-6 font-bold text-base'>
                <a href='/profile' className='bg-[#afc2ff] text-white text-lg !px-5 !py-2 rounded-xl font-semibold shadow-md hover:bg-[#92abff] hover:scale-103 hover:shadow-lg transition-all '>
                    Mi perfil
                </a>

                <button onClick={onClickLogout} className="bg-red-200 text-red-700 text-lg !px-5 !py-2 rounded-xl font-semibold shadow-md hover:bg-red-300 hover:scale-103 hover:shadow-lg transition-all cursor-pointer">
                    Logout
                </button>
            </div>

        </header>
    )

}

export default Navbar;