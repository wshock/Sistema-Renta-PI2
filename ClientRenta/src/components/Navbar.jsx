import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import logoElkin from '../assets/e l k i n ..svg';

function Navbar() {
  const { logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const onClickLogout = async () => {
    await logOut();
  };

  return (
    <header className='!fixed top-0 right-0 w-full !bg-white !drop-shadow-md z-50'>
      <div className='!flex !justify-between !items-center !py-6 !px-8 !md:px-32'>

        <a href='/'>
          <img
            src={logoElkin}
            className='w-28 md:w-32 hover:scale-103 transition-transform'
            alt='logo'
          />
        </a>


        <button
          className='md:!hidden text-black text-2xl focus:outline-none'
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>


        <div className='!hidden md:!flex !items-center !gap-6 !font-bold !text-base'>
          <a
            href='/searchProduct'
            className='!bg-[#afc2ff] !text-white !text-lg !px-5 !py-2 !rounded-xl !font-semibold !shadow-md hover:!bg-[#92abff] hover:scale-103 hover:!shadow-lg transition-all'
          >
            Busca un producto
          </a>

          <a
            href='/profile'
            className='!bg-[#afc2ff] !text-white !text-lg !px-5 !py-2 !rounded-xl !font-semibold !shadow-md hover:!bg-[#92abff] hover:scale-103 hover:!shadow-lg transition-all'
          >
            Mi perfil
          </a>

          <button
            onClick={onClickLogout}
            className='!bg-red-200 !text-red-700 !text-lg !px-5 !py-2 !rounded-xl !font-semibold !shadow-md hover:!bg-red-300 hover:scale-103 hover:!shadow-lg transition-all cursor-pointer'
          >
            Logout
          </button>
        </div>
      </div>

      {isOpen && (
        <div className='!md:hidden !flex !flex-col !items-center !gap-4 !pb-4 !px-8'>
          <a
            href='/searchProduct'
            className='!bg-[#afc2ff] !text-white !w-full !text-center !text-lg !px-4 !py-2 !rounded-xl !font-semibold !shadow-md hover:!bg-[#92abff] hover:scale-103 hover:!shadow-lg transition-all'
          >
            Busca un producto
          </a>

          <a
            href='/profile'
            className='!bg-[#afc2ff] !text-white !w-full !text-center !text-lg !px-4 !py-2 !rounded-xl !font-semibold !shadow-md hover:!bg-[#92abff] hover:scale-103 hover:!shadow-lg transition-all'
          >
            Mi perfil
          </a>

          <button
            onClick={onClickLogout}
            className='!bg-red-200 !text-red-700 !w-full !text-lg !px-4 !py-2 !rounded-xl !font-semibold !shadow-md hover:!bg-red-300 hover:scale-103 hover:!shadow-lg transition-all'
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;