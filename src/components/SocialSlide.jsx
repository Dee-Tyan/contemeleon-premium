import Link from "next/link";
import { platforms } from "../data";
import Image from "next/image";

const SocialSlide = () => {
  return (
    <div className="flex items-center justify-around mx-16 py-4">
      {platforms?.map((type) => (
        <div key={type?.value} className="flex gap-4 items-center">
          <div className="hidden md:flex hover:text-purple-10 cursor-pointer w-full animate-slide text-white font-semibold">
            {type?.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SocialSlide;
