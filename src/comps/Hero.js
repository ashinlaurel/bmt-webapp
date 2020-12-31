import React from "react";
const bg = "https://source.unsplash.com/random/1920x1080";

const Hero = () => {
  return (
    <section
      class="font-sans h-screen w-full bg-cover text-center flex flex-col items-center justify-center"
      style={{ backgroundImage: "url(" + bg + ")" }}
      //   "
      //       background: url(https://source.unsplash.com/random/1920x1080) no-repeat
      //         center;
      //     "
    >
      <div class="bg-white text-black rounded-full h-16 w-16 flex items-center justify-center mb-8">
        <i class="fas fa-play ml-1"></i>
      </div>
      <label
        for=""
        class="uppercase tracking-extrawide text-white text-xs font-hairline mt-8"
      >
        Watch Video
      </label>
      <h3 class="text-white mx-auto max-w-sm mt-4 font-normal text-2xl leading-normal">
        Differentiate Yourself And Attract More Attention Sales And Profits
      </h3>
    </section>
  );
};

export default Hero;
