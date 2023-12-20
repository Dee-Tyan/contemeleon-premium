import React from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="font-orbitron">
      <div className="container px-6 py-8 mx-auto">
        <div className="grid place-items-center">
          <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="flex gap-2 justify-center items-center">
              <Link href="/" className="flex items-center justify-center gap-2">
                <Image
                  alt="Create content"
                  loading="lazy"
                  className="w-12"
                  src={logo}
                />
                <p className="flex font-orbitron text-3xl font-bold ">
                  Conte <span className="text-pink-10">meleon</span>
                </p>
              </Link>
            </div>
            <div class="mx-auto max-w-screen-sm text-center">
              <h2 class="my-4 text-2xl md:text-4xl font-semibold leading-tight mx-4">
                Start your free trial today
              </h2>
              <p class="mb-6 font-light font-space-mono text-gray-30 text-sm">
                Try Contemeleon for 30 days. No credit card required.
              </p>
              <div className="w-full">
                <Link
                  href="/create"
                  className="rounded-md bg-pink-10 hover:bg-purple-10 text-sm lg:text-lg text-center p-4 w-full h-14 flex items-center justify-center font-orbitron font-semibold"
                >
                  Convert Content
                </Link>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-10 border-4 border-pink-10 dark:border-pink-10 " />

        <div className="flex flex-col items-center sm:flex-row sm:justify-between font-space-mono">
          <p className="text-sm">© Copyright 2023. All Rights Reserved.</p>

          <div className="flex mt-3 -mx-2 sm:mt-0">
            <a
              href="#"
              className="mx-2 text-sm transition-colors duration-300 hover:text-purple-10"
              aria-label="features"
            >
              {" "}
              Features{" "}
            </a>

            <a
              href="#"
              className="mx-2 text-sm transition-colors duration-300 hover:text-purple-10"
              aria-label="privacy"
            >
              {" "}
              Privacy{" "}
            </a>

            <a
              href="#"
              className="mx-2 text-sm transition-colors duration-300 hover:text-purple-10"
              aria-label="cookies"
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
