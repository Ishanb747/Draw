import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs';
import React from 'react';

const Header = () => {
  return (
    <header className="bg-black">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a
          className="text-white flex items-center gap-2"
          href="#"
          aria-label="Go to Home Page"
        >
          <svg
            className="w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="currentColor"
          >
            <path d="M23.336 27H8.664A3.668 3.668 0 0 1 5 23.336V8.664A3.668 3.668 0 0 1 8.664 5h14.672A3.668 3.668 0 0 1 27 8.664v14.672A3.668 3.668 0 0 1 23.336 27zM8.664 7C7.746 7 7 7.746 7 8.664v14.672C7 24.254 7.746 25 8.664 25h14.672c.918 0 1.664-.746 1.664-1.664V8.664C25 7.746 24.254 7 23.336 7H8.664z" />
          </svg>
          <span className="sr-only">DRAW</span>
          DRAW
        </a>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a className="text-gray-200 transition hover:text-white" href="#">About</a>
              </li>
              <li>
                <a className="text-gray-200 transition hover:text-white" href="#">Services</a>
              </li>
              <li>
                <a className="text-gray-200 transition hover:text-white" href="#">Projects</a>
              </li>
              <li>
                <a className="text-gray-200 transition hover:text-white" href="#">Blog</a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <a
                className="block rounded-md px-5 py-2.5 text-sm font-medium text-white transition"
                href="#"
              >
                <LoginLink>Login</LoginLink>
              </a>

              <a
                className="hidden rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:text-white sm:block border border-r-3 border-white"
                href="#"
              >
                <RegisterLink>Register</RegisterLink>
              </a>
            </div>

            <button
              className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
