import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { nav_item } from '../../utils/constants/data'
import logo from '/assets/svg/logo.svg'
import { MdOutlineLogout } from "react-icons/md";

const Sidebar = () => {
  const location = useLocation();

  return (
    <nav className='h-screen min-w-[290px] flex flex-col px-[14px] pt-[37px] pb-[27px] text-[#737791] overflow-y-auto'>
      <img src={logo} alt="logo" className='text-center h-[34px]'/>
      <div className='flex flex-col gap-6 mt-11 sub-m'>
        {nav_item.map(nav => {
          const isActive = location.pathname === nav.url;
          return (
            <Link
              key={nav.url}
              to={nav.url}
              className={`flex items-center gap-4 p-4 rounded-lg ${isActive ? 'bg-primary-500 text-white' : 'bg-transparent'}`}
            >
              <img src={isActive ?  nav.iconActive : nav.icon} alt="" />
              {nav.name}
            </Link>
          );
        })}
      </div>
      <div className='flex-1 flex items-end justify-start px-7 min-h-12'>
        <div className='flex items-center gap-4'>
          <MdOutlineLogout />
          Keluar
        </div>
      </div>
    </nav>
  )
}

export default Sidebar
