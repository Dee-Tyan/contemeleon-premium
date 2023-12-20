"use client";
import { useState } from "react";
import Link from "next/link";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { navData } from "../data";
import Image from "next/image";
import logo from "@/assets/logo.png";

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed top-4 right-4 z-5 w-full md:hidden">
      <button
        onClick={toggleMenu}
        className="block md:hidden w-fit h-fit fixed top-4 right-4"
      >
        {!isOpen ? (
          <RxHamburgerMenu size="1.5rem" />
        ) : (
          <RxCross2 size="1.5rem" />
        )}
      </button>

      {isOpen && (
        <ul className="flex flex-col items-center bg-blue-90 mt-6 p-4 w-full ml-4">
          {navData.map((item) => (
            <li
              key={item.key}
              className="hover:rounded-md p-2 sm:text-xl font-montserrat"
            >
              <Link
                href={item.link}
                className="text-gray-10 hover:text-blue-20 capitalize"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const DesktopNav = () => {
  return (
    <ul className="hidden space-x-6 md:flex gap-2 py-4 px-6 md:items-center">
      {navData.map((item) => {
        {
          return item.key === "create" ? (
            <Link
              key={item.id}
              href={item.link}
              className="rounded-md bg-c-pink to-92.36% hover:purple-10 ext-center px-4 h-14 flex items-center justify-center font-space-mono font-bold"
            >
              {item.name}
            </Link>
          ) : (
            <div
              key={item.id}
              className="text-sm hover:text-blue-20 font-space-mono transition cursor-pointer"
            >
              <li key={item.name} className="hover:rounded-md">
                <Link href={item.link}>{item.name}</Link>
              </li>
            </div>
          );
        }
      })}
    </ul>
  );
};

export const Header = () => {
  return (
    <nav className="w-full container flex justify-between py-3 lg:p-3 items-center sticky z-[999]">
      <div className="flex gap-2 justify-center items-center">
        <Image
          alt="Create content"
          loading="lazy"
          className="w-12"
          src={logo}
        />
        <Link href="/">
          <h1 className="text-3xl font-semibold font-orbitron text-pink hover:text-blue-10 pl-4 md:pl-0">
            Contemeleon
          </h1>
        </Link>
      </div>
      <DesktopNav />
      <MobileNav />
    </nav>
  );
};
