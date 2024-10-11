function App() {

  return (<>
    <div className="navbar bg-[#d5883f] text-white">
  <div className="flex-1">
    <a className="btn hover:bg-[#D2B48C] hover:text-[#4B3621] transition duration-300 ease-in-out  text-xl">🧑‍💻 devTinder</a>
  </div>
  <div className="flex-none gap-2">
    
    <div className="dropdown dropdown-end mx-5">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
  </>)
}

export default App
