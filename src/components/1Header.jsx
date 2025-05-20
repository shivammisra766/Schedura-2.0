import logo from "../assets/logo.png";
import apple from "../assets/apple.jpeg";
import { Link } from "react-router-dom";
import LocationSelector from "./LocationSelector";
import { useState } from "react";
import DarkModeButton from "./DarkModeButton"; // Make sure this file exists

const Header = () => {
  const [headerLocation, setHeaderLocation] = useState("");

  const headerItem = [
    { id: 1, name: "About", link: "/about" },
    { id: 2, name: "Contact", link: "/contact" },
  ];

  const handleLocationSelect = (location) => {
    setHeaderLocation(location);
  };

  const [token, setToken] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-900 dark:text-white shadow-md p-4 md:px-20 transition-all duration-300">
      <Link to="/">
        <img
          className="cursor-pointer hover:animate-pulse"
          src={logo}
          alt="Logo"
          width={180}
          height={80}
        />
      </Link>

      <div className="flex-1 md:flex hidden">
        <LocationSelector onLocationSelect={handleLocationSelect} />
      </div>

      <div className="flex items-center gap-10">
        <ul className="md:flex gap-10 hidden">
          {headerItem.map((item) => (
            <Link to={item.link} key={item.id}>
              <li className="hover:text-primary cursor-pointer hover:scale-110 transition-all ease-in-out">
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
        <div className="hidden md:block hover:scale-105">
          <DarkModeButton />
        </div>
      </div>

      {token ? (
        <div className="flex items-center gap-10 mx-10 cursor-pointer group relative">
          <img className="w-8 rounded-full" src={apple} alt="User Avatar" />
        </div>
      ) : (
        <div className="flex items-center gap-10 hover:scale-105">
          <Link to="/login">
            <button className="text-white px-4 py-2 rounded mx-8 bg-gradient-to-r from-green-500 to-emerald-600">
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
