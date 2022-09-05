//hooks
import React from "react";
import { useNavigate } from "react-router-dom";
//additional
import { navLinks } from "../../data/navbar-data/navLinks";

function Sidebar({ toggle }) {
  //navigate-hook
  const navigate = useNavigate()


    
  return (
    <nav
      id="sidebar"
      className={
        toggle
          ? "absolute top-full right-0 flex z-20  flex-col items-center w-full p-5 gap-2 bg-[white] shadow-lg sm:w-1/2 md:hidden"
          : "absolute top-full -right-full z-20  flex flex-col items-center w-full py-5 gap-2 bg-[white] shadow-lg sm:w-1/2 md:hidden"
      }
    >
      <ul className="flex flex-col w-full gap-5 py-5">
        {navLinks.mobileNav.map((navLink) => (
          <li onClick={()=>{
            navigate(navLink.to)
          }} className="text-xl">{navLink.name}</li>
        ))}
      </ul>
      <ul className="flex flex-col w-full gap-5 py-5">
        <li className="text-xl flex gap-2 items-center">
          {navLinks.icons.find(icon => icon.name == "userIcon").icon}My account
        </li>
        <li className="text-xl flex gap-2 items-center">
          {navLinks.icons.find(icon => icon.name == "logOutIcon").icon}Log out
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
