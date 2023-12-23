import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";

const Header = () => {
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
      <div className="flex gap-2 justify-center items-center">menu tab</div>
    </div>
  );
};

export default Header;
