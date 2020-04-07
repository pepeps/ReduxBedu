import React from "react";
import { Link } from "react-router-dom";

const Navbar = props => {
  return (
    <nav className='navbar'>
      <div className='navbar-logo'>LOGO </div>
      <div className='navbar-nav'>
        <ul>
          <li>
            <Link to='/'>Users</Link>
          </li>
          <li>
            <Link to='/task'>Tasks</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
