import React from "react";
import logo from "@/assets/logo.png";
import {EmptyProfile} from "@/components/SVGs";

const Footer = () => {
  return (
    <footer className="bg-cream dark:bg-gray-900 font-body">
      <div className="container px-6 py-8 mx-auto">
        <div className="flex flex-col items-center text-center">
          <a href="#">
            <img className="w-auto h-16 rounded-full" src={logo} alt="" />
          </a>

          <p className="max-w-md mx-auto mt-4 text-coalBrown dark:text-coalBrown">
            convert all your content in a single click.
          </p>

          <div className="flex flex-col mt-4 sm:flex-row sm:items-center sm:justify-center">
            <button className="flex items-center justify-center order-1 w-full px-2 py-2 mt-3 text-sm tracking-wide text-coalBrown capitalize transition-colors duration-300 transform border rounded-md sm:mx-2 border border-coalBrown dark:text-gray-300 sm:mt-0 sm:w-auto focus:outline-none focus:ring-2 dark:hover:bg-buttonBrown focus:ring-coalBrown">
              <EmptyProfile />

              <span className="mx-1">View Demo</span>
            </button>

            <button className="w-full px-5 py-2 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-coalBrown rounded-md sm:mx-2 sm:order-2 sm:w-auto hover:bg-scrollBrown focus:outline-none focus:ring-4 focus:ring-darkBrown">
              Get started
            </button>
          </div>
        </div>

        <hr className="my-10 border-coalBrown dark:border-coalBrown" />

        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-sm text-coalBrown">
            © Copyright 2023. All Rights Reserved.
          </p>

          <div className="flex mt-3 -mx-2 sm:mt-0">
            <a
              href="#"
              className="mx-2 text-sm text-coalBrown transition-colors duration-300 hover:text-scrollBrown dark:hover:text-gray-300"
              aria-label="Reddit"
            >
              {" "}
              Teams{" "}
            </a>

            <a
              href="#"
              className="mx-2 text-sm text-coalBrown transition-colors duration-300 hover:text-buttonBrown dark:hover:text-gray-300"
              aria-label="Reddit"
            >
              {" "}
              Privacy{" "}
            </a>

            <a
              href="#"
              className="mx-2 text-sm text-coalBrown transition-colors duration-300 hover:text-buttonBrown dark:hover:text-gray-300"
              aria-label="Reddit"
            >
              {" "}
              Cookies{" "}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
