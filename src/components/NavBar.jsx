import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const user=useSelector((store)=>store.user);
  console.log(user);
  return (
    <div className="navbar bg-[#d5883f] text-white">
      <div className="flex-1">
        <Link to="/" className="btn hover:bg-[#D2B48C] hover:text-[#4B3621] transition duration-300 ease-in-out text-xl">🧑‍💻 devTinder</Link>
      </div>
     
      {user && (<div className="flex-none gap-2">
        <div className="form-control text-amber-950 font-extrabold">Welcome, {user?.firstName}</div>
        <div className="dropdown dropdown-end mx-5">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 h-10 rounded-full border-4 border-[#6F4E37] overflow-hidden"> {/* Coffee-colored border */}
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                className="w-full h-full object-cover" // Ensures the image fits nicely in the circle
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <Link className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>)}
    </div>
  );
}

export default NavBar;
