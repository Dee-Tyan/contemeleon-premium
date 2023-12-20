/* eslint-disable react/no-unescaped-entities */
import { BackArrow } from "@/components/SVGs";
import Link from "next/link";

const Features = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-blue-90 text-gray-10 bg-auto bg-no-repeat font-space-mono p-4">
      <div className="w-full h-full flex flex-col gap-y-6 items-center justify-center text-center ">
        
        <p className="font-orbitron text-4xl md:text-7xl font-bold">
          Coming{" "}
          <span className="text-pink-30 relative">
            Soon
          </span>
        </p>
        <p className="text-sm lg:text-xl leading-6 mt-4">
          Look who caught the Contemeleon bug...
        </p>

        <p className="text-sm lg:text-xl leading-7">
          <span className="text-blue-20">Don't worry!</span> We are always finding ways to make content creation easier for you. 
          <span className='block'> Check back with us sometime soon, and you won&apos;t be disappointed.</span>
        </p>
        <Link href='/' className="flex items-center justify-center font-bold"><BackArrow /> Return to Homepage</Link>
      </div>
    </main>
  );
};

export default Features;
