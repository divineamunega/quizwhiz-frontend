import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-10/12 mx-auto rounded-full bg-white flex py-4 px-8 fixed top-7 left-1/2 -translate-x-1/2 justify-between font-cabin shadow-md z-50">
      <div>Logo</div>
      <ul>
        <NavLink to="/" className='me-5'>Home</NavLink>
        <NavLink to="/" className='me-5'>Quiz</NavLink>
      </ul>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
