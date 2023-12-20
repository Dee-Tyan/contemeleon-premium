import Link from "next/link";
import { Header } from "../components/Header";
import ActionButton from "@/components/ActionButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-gray-10 bg-auto bg-no-repeat bg-right-bottom font-space-mono">
      <Header />

      <section className="grid gap-8">
      <div>
        <div className="grid place-items-center">
          <p className="flex font-orbitron text-4xl md:text-7xl font-bold ">
            Conte <span className="text-purple-10">meleon</span>
          </p>
          <p className="text-lg lg:text-xl leading-6 mt-4 font-space-mono font-semibold">
            Your Number 1 Partner in Content Creation.
          </p>
        </div>
        <div className="leading-7">
          From Facebook posts to LinkedIn updates, Contemeleon repurposes your
          <span className="block">
            existing content into tailored posts for each major social media
            platform.
          </span>
        </div>
      </div>
      <ActionButton/>
      </section>
    </main>
  );
}
