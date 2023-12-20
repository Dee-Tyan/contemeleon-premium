/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { Header } from "../components/Header";
import ufo from "../assets/ufo.svg";

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-blue-90 text-gray-10 bg-auto bg-no-repeat font-space-mono p-4">
      <div className="w-full h-full flex flex-col gap-y-6 items-center justify-center text-center ">
        
        <p className="font-orbitron text-4xl md:text-7xl font-bold">
          Fellow{" "}
          <span className="text-pink-30 relative">
            Explorer
          </span>
        </p>
        <p className="text-sm lg:text-xl leading-6 mt-4">
          "It seems you&apos;ve wandered off the beaten path."
        </p>
        <Image alt="404 - page not found" loading="lazy" src={ufo} />

        <p className="text-sm lg:text-xl leading-7">
          <span className="text-blue-20">Fear not!</span> Even the most intrepid
          wanderers find themselves in uncharted territories. Let&apos;s embark on a
          new journey together – click your heels or hit that back button, and
          let the adventure continue!"
        </p>
      </div>
    </main>
  );
}
