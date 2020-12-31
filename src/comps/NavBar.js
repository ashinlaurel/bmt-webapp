import React from "react";
import { BrowserRouter, Link, Router } from "react-router-dom";


const NavBar = () => {
  return (
    <nav class="font-sans bg-white text-center flex justify-between my-4 mx-auto container overflow-hidden">
      <BrowserRouter>
      <a href="/" class="block text-left">
        <img
          src="https://stitches.hyperyolo.com/images/logo.png"
          class="h-10 sm:h-10 rounded-full"
          alt="logo"
        />
      </a>
      <ul class="text-sm text-gray-700 list-none p-0 flex items-center">
      <li>
          <Link
            to="/"
            class="inline-block py-2 px-3 text-gray-900 hover:text-gray-700 no-underline"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/member"
            class="inline-block py-2 px-3 text-gray-900 hover:text-gray-700 no-underline"
          >
            Add Members
          </Link>
        </li>
        
      </ul>
      </BrowserRouter>
    </nav>
  );
};

export default NavBar;