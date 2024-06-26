import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { nav_item_admin, nav_item_super_admin } from '../../utils/constants/data';
import logo from '/assets/svg/logo.svg';
import { MdOutlineLogout } from 'react-icons/md';
import { FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const role = localStorage.getItem('role');

  const navItems = role === 'super admin' ? nav_item_super_admin : nav_item_admin;

  function handleLogout(){
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/login')
  }
  return (
    <nav className="h-screen min-w-[290px] flex flex-col px-[14px] pt-[37px] pb-[27px] text-[#737791] overflow-y-auto bg-white">
      <img src={logo} alt="logo" className="text-center h-[34px]" />
      <div className="flex flex-col gap-4 mt-11 sub-m">
        {navItems.map((nav) => {
          const isActive = location.pathname === nav.url;
          const isParentActive = location.pathname.includes(nav.url);
          return (
            <div key={nav.name}>
              {nav.children ? (
                <div>
                  <div className="flex flex-col">
                    <button onClick={() => setIsOpen(!isOpen)} key={nav.name} className={`flex items-center justify-between gap-4 p-4 rounded-lg ${isParentActive ? 'bg-primary-500 text-white' : 'bg-transparent'}`}>
                      <div className="flex items-center gap-4">
                        <img src={isParentActive ? nav.iconActive : nav.icon} alt="" />
                        {nav.name}
                      </div>
                      <FaChevronDown className={`${isOpen ? '-rotate-180' : 'rotate-0'} transition-all`} />
                    </button>
                    <div className={`${!isOpen && 'hidden'}`}>
                      {nav.children.map((child) => (
                        <Link key={child.name} to={child.url} className={`flex items-center gap-4 p-4 pl-6 rounded-lg ${location.pathname === child.url ? 'bg-primary-50 text-primary-500' : 'bg-transparent'}`}>
                          <img src={child.icon} alt="" />
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link to={nav.url} className={`flex items-center gap-4 p-4 rounded-lg ${isActive ? 'bg-primary-500 text-white' : 'bg-transparent'}`}>
                  <img src={isActive ? nav.iconActive : nav.icon} alt="" />
                  {nav.name}
                </Link>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex-1 flex items-end justify-start min-h-12">
        <button onClick={handleLogout} className="hover:bg-danger-500 hover:text-white flex items-center gap-4 px-7 py-1 rounded-lg transition-all duration-300">
          <MdOutlineLogout />
          Keluar
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
