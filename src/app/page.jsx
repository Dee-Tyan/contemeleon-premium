import Link from "next/link";
import { Header } from "../components/Header";
import ActionButton from "@/components/ActionButton";
import Image from "next/image";
import Footer from "@/components/Footer";
import logo from "@/assets/logo.png";
import SocialSlide from "@/components/SocialSlide";
import { featureBenefits } from "@/data";
import FaqSection from "@/components/FaqSection";
import FeatureSection from "@/components/FeatureSection";

export default function Home() {
  return (
    <main className="text-gray-10 bg-black px-4 font-obitron lg:px-8">
      <Header />

      <section className="grid lg:flex lg:justify-between lg:items-center lg:m-8">
        <div className="w-full lg:w-1/2">
          <div className="grid gap-4">
            <div className="grid">
              <div className="lg:hidden sm:flex md:flex-end">
                <Image
                  alt="Create content"
                  loading="lazy"
                  className=""
                  src={logo}
                />
              </div>
              <p className="hidden md:grid text-3xl text-center md:text-left lg:text-7xl leading-6 sm:mt-8 lg:mt-4 font-semibold">
                Your Content Creation Partner.
              </p>
            </div>
            <div className="hidden md:grid font-space-mono text-sm lg:text-lg">
              From Facebook posts to LinkedIn updates, Contemeleon repurposes
              your existing content into tailored posts for each major social
              media platform.
            </div>
          </div>
          <div className="hidden md:flex mt-4">
            <ActionButton />
          </div>
        </div>
        <div className="z-10 hidden md:flex md:flex-end">
          <Image alt="Create content" loading="lazy" className="" src={logo} />
        </div>
      </section>
      <section className="hidden md:grid">
        <SocialSlide />
      </section>
      <section className="mt-8 font-space-mono">
        <div className="flex flex-col px-8 mx-auto space-y-12 max-w-7xl xl:px-12">
          <div class="relative ">
            <h2 class="w-full text-3xl p-4 font-bold text-center sm:text-4xl md:text-5xl leading-6">
              {" "}
              Get different forms of the same content in one click.
            </h2>
            <p class="lg:hidden w-full py-8 mx-auto -mt-2 text-lg text-center intro sm:max-w-3xl ">
              {" "}
              Contemeleon puts the magic in your hands. From Facebook posts to LinkedIn updates, Contemeleon repurposes
              your existing content into tailored posts for each major social
              media platform.
            </p>
          </div>
          {featureBenefits.map((feature, index) => (
            <FeatureSection
              key={index}
              title={feature.title}
              featureDescription={feature.description}
              imageUrl={feature.imageUrl}
              altText={feature.altText}
              orderLast={feature.orderLast}
            />
          ))}
        </div>
      </section>
      <section>
        <FaqSection />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
}
