
import Link from "next/link";
import { platforms } from "../../data";
import Image from "next/image";
import ActionButton from "@/components/ActionButton";
const About = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-blue-90 text-gray-10 bg-auto bg-no-repeat font-space-mono p-4">
      <div className="w-full h-full flex flex-col gap-8 md:gap-10 xl:gap-16 items-center justify-center text-center ">
        <div className="grid place-items-center">
        <p className="flex font-orbitron text-4xl md:text-7xl font-bold text-white">
          Conte <span className="text-pink-10">meleon</span>
        </p>
        <p className="text-lg lg:text-xl leading-6 mt-4 font-space-mono font-semibold">
          Your Number 1 Partner in Content Creation.
        </p>
        </div>
        <div className="leading-7">
            From Facebook posts to LinkedIn updates, Contemeleon repurposes your
            <span className="block">existing content into tailored posts for each major social media platform.</span>
        </div>

        <div className="grid grid-cols-3 lg:grid-cols-3 border-2">
          {platforms?.map((type) => (
            <div key={type?.value} className="flex gap-4 p-2 items-center">
              <Image
                alt={type?.name}
                loading="lazy"
                className="w-6 h-6 mr-4 cursor-pointer"
                src={type?.icon}
              />
              <div className="hidden md:flex hover:text-blue-10 cursor-pointer">
                {type?.name}
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 text-base lg:text-xl font-space-mono">
          <div className="">
            {" "}
            Running out of ideas?{" "}
            <span className="text-pink-10 font-semibold"> A prompt is enough!</span>
          </div>
          <div className="text-xs md:text-sm">
          Stick to your posting schedule with Contemeleon and build your
          network.
          </div>
        </div>
     
       <ActionButton/>
   
      </div>
    </main>
  );
};

export default About;
