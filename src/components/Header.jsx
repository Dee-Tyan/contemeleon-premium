"use client";
import { useState } from "react";
import Link from "next/link";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { navData } from "../data";
import Image from "next/image";
import logo from "@/assets/logo.png";
import ActionButton from "./ActionButton";

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
    <ul className="hidden space-x-6 md:flex gap-4 py-4 md:items-center">
      {navData.map((item) => {
        {
          return item.key === "create" ? (
            <Link
              key={item.id}
              href={item.link}
              className="rounded-md bg-pink-10 hover:bg-purple-10 font-orbitron text-center py-2 px-8 flex items-center justify-center font-bold"
            >
              {item.name}
            </Link>
          ) : (
            <div
              key={item.id}
              className="text-sm hover:text-blue-20 font-orbitron transition cursor-pointer font-bold"
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
    <nav className="flex justify-between py-2 items-center sticky">
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
      <DesktopNav />
      <MobileNav />
    </nav>
  );
};
