import React from "react";

const Home = () => {
  return (
    <div
      className="w-screen bg-fixed bg-left bg-cover h-screen flex items-center   "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1453219562534-36e2ce0ea18e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=666&q=80')",
      }}
    >
      <div
        for=""
        class="uppercase tracking-extrawide text-black text-4xl font-hairline flex items-center w-1/2 px-40 pb-56 "
      >
        Bethel Marthoma Church Data Entry Portal
      </div>
    </div>
  );
};

export default Home;
