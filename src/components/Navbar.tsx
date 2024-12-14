import { useState } from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { TbLogout } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/userSlice";
import { removeTodo } from "@/store/todoSlice";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch: ThunkDispatch<any, unknown, AnyAction> = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="shadow-[0_30px_30px_-20px_rgba(0,0,0,0.1)] rounded-lg ">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-950">To - Do</div>

        {/* Menu button for small screens */}
        <button
          className="md:hidden text-gray-950 text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          ☰
        </button>

        {/* Nav links */}
        <ul
          className={`md:flex md:items-center md:gap-6 absolute md:static left-0 top-full w-full md:w-auto bg-gray-800 md:bg-transparent p-5 md:p-0 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <li>
            <Link
              to="/"
              className="block md:inline-block py-2 px-4 hover:bg-gray-700 hover:text-white rounded text-gray-950"
            >
              Task list
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="block md:inline-block py-2 px-4 hover:bg-gray-700 hover:text-white rounded text-gray-950"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Button onClick={() => {
              dispatch(logoutUser())
              dispatch(removeTodo())
              }}><TbLogout color="white"/></Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
