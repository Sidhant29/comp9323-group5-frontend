import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
   return (
      <div>
         <Link to='/home'>
            <li>Home</li>
         </Link>
         <Link to='/home'>
            <li>Upload new project</li>
         </Link>
         <Link to='/home'>
            <li>My Account</li>
         </Link>
         <Link to='/home'>
            <li>Logout</li>
         </Link>
      </div>
   );
}
