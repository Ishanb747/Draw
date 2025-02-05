import React from 'react';

const Hero = () => {
  return (
    <section className="bg-black relative overflow-hidden">
      {/* Background SVG */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-[200vh] h-[120vh] text-white/3 transform rotate-45"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="currentColor"
        >
          <path d="M23.336 27H8.664A3.668 3.668 0 0 1 5 23.336V8.664A3.668 3.668 0 0 1 8.664 5h14.672A3.668 3.668 0 0 1 27 8.664v14.672A3.668 3.668 0 0 1 23.336 27zM8.664 7C7.746 7 7 7.746 7 8.664v14.672C7 24.254 7.746 25 8.664 25h14.672c.918 0 1.664-.746 1.664-1.664V8.664C25 7.746 24.254 7 23.336 7H8.664z" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl text-white font-extrabold sm:text-5xl">
            Documents & diagrams
            <strong className="font-extrabold text-white sm:block">
              for EVERYONE!!
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed text-white">
            All-in-one markdown editor, collaborative canvas, and diagram-as-code builder
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-black px-12 py-3 text-sm font-medium text-white hover:scale-110 focus:outline-none focus:ring border border-white sm:w-auto transition-transform"
              href="#"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
