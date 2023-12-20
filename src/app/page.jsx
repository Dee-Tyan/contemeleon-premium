import Link from "next/link";
import { Header } from "../components/Header";
import ActionButton from "@/components/ActionButton";
import Image from "next/image";
import Footer from "@/components/Footer";
import logo from "@/assets/logo.png";

export default function Home() {
  return (
    <main className="text-gray-10 bg-black px-4 font-obitron lg:px-8">
      <Header />

      <section className="grid lg:flex lg:justify-between lg:items-center lg:m-8">
        <div className="w-full lg:w-1/2">
          <div className="grid gap-4">
            <div className="grid">
              
              <p className="text-4xl lg:text-7xl leading-6 mt-4 font-semibold">
                Your Content Creation Partner.
              </p>
            </div>
            <div className="leading-7 font-space-mono">
              From Facebook posts to LinkedIn updates, Contemeleon repurposes
              your existing content into tailored posts for each major social media
              platform.
            </div>
          </div>
          <div className="flex mt-4">
            <ActionButton />
          </div>
        </div>
        <div className="z-10 hidden md:flex md:flex-end">
        <Image alt="Create content" loading="lazy" className="" src={logo} />
        </div>
      </section>
    </main>
  );
}
