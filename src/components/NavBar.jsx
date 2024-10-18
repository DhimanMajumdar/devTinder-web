import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, {
        withCredentials: true,
      });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      // Error handling logic
    }
  };

  return (
    <div className="navbar bg-[#d5883f] text-white">
      <div className="flex-1">
        {user ? <Link to="/" className="btn hover:bg-[#D2B48C] hover:text-[#4B3621] transition duration-300 ease-in-out text-xl">
          🧑‍💻 devTinder
        </Link> : <Link to="/login" className="btn hover:bg-[#D2B48C] hover:text-[#4B3621] transition duration-300 ease-in-out text-xl">
          🧑‍💻 devTinder
        </Link> } 
      </div>
     
      {user && (
        <div className="flex-none gap-2">
          <div className="form-control text-amber-950 font-extrabold">Welcome, {user?.firstName}</div>
          <div className="dropdown dropdown-end mx-5">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 h-10 rounded-full border-4 border-[#6F4E37] overflow-hidden">
                <img
                  alt="User profile avatar"
                  src={user?.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to="/connections" className="justify-between">
                  Connections
                </Link></li>
                <li>
                <Link to="/requests" className="justify-between">Requests</Link>
              </li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
