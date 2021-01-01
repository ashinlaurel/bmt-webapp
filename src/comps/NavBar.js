import React from "react";
import { BrowserRouter, Link, Router } from "react-router-dom";

const NavBar = () => {
  return (
    <nav class="font-sans bg-white text-center flex justify-between my-4 mx-auhref  overflow-hidden">
      <BrowserRouter>
        <div className="text-xl mx-4 font-bold">BMT CHURCH</div>
        <ul class="text-sm text-gray-700 list-none p-0 flex items-center mr-4 font-bold">
          <li>
            <a
              href="/"
              class="inline-block py-2 px-3 text-gray-900 hover:text-gray-700 no-underline"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/member"
              class="inline-block py-2 px-3 text-gray-900 hover:text-gray-700 no-underline"
            >
              Add Members
            </a>
          </li>
        </ul>
      </BrowserRouter>
    </nav>
  );
};

export default NavBar;
