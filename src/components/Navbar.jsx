import React from "react";

const Navbar = () => {
  return (
    <nav className="flex flex-col md:flex-row justify-between items-center bg-violet-800 text-white py-3 px-4 md:px-8">
      {/* Logo */}
      <div className="logo mb-2 md:mb-0">
        <span className="font-bold text-xl">Daily Task</span>
      </div>

      {/* Menu - hidden on mobile, visible on md+ */}
      <ul className="hidden md:flex flex-row gap-8 items-center">
        <li className="cursor-pointer hover:font-bold transition-all duration-300">
          Home
        </li>
        <li className="cursor-pointer hover:font-bold transition-all duration-300">
          Your Tasks
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;