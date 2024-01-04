import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import profile from "@/assets/profile2.svg";
import { useState } from "react";

const Header = () => {
  const [show, setShow] = useState(false);
  const handleDropDown = () => {
    setShow((prevState) => !prevState);
    console.log("show!", show);
  };
  return (
    <div className="flex justify-between mx-4 h-24">
      <div className="hidden lg:flex gap-2 justify-center items-center">
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
      <Link
        href="/"
        className="flex md:hidden items-center justify-center gap-2"
      >
        <Image
          alt="Create content"
          loading="lazy"
          className="w-12"
          src={logo}
        />
      </Link>
      <div className="relative flex items-center justify-center">
        <button onClick={handleDropDown}>
          <Image alt="profile" loading="lazy" className="w-12 " src={profile} />
        </button>
        {show && (
          <div className="absolute right-0 bottom-0 w-36 bg-pink-10 text-white filter contrast-100 shadow-md rounded drop-shadow-md bg-brightness-50">
            <ul>
              <li className="">
                {" "}
                <Link
                  href="/welcome/dashboard"
                  className="text-center text-sm p-4 font-bold"
                >
                  View Profile
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
