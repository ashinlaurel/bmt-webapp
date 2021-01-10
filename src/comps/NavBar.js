import React from "react";
import { BrowserRouter, Link, Router } from "react-router-dom";
import firebase from "firebase/app";

const NavBar = () => {
  return (
    <nav class="font-sans bg-white text-center flex justify-between my-4 mx-auhref  overflow-hidden">
      <BrowserRouter>
      <div className="mx-4 font-bold text-xl">BMT Church </div>
      <ul class="text-sm text-gray-700 list-none p-0 flex items-center">
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
        <li>
          <div
            href="/member"
            class="inline-block py-2 px-3 text-gray-900 hover:text-gray-700 no-underline cursor-pointer"
            onClick={()=>{
              firebase.auth().signOut().then(function() {
                console.log('Signed Out');
              }, function(error) {
                console.error('Sign Out Error', error);
});
            }}
          >Logout
          </div>
        </li>
        
        
      </ul>
      </BrowserRouter>
    </nav>
  );
};

export default NavBar;
