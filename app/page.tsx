import { CardSpotlightDemo } from "@/components/global/card";
import { CardHoverEffectDemo } from "@/components/global/cardHover";
import { ContainerScroll } from "@/components/global/container-scroll-animation";
import { LampComponent } from "@/components/global/lamp";
import { InfiniteMovingCards } from "@/components/global/moving-cards";
import Navbar from "@/components/global/navbar";
import { TypewriterEffectSmoothDemo } from "@/components/global/TypewriterEffect";
import { WavyBackgroundDemo } from "@/components/global/wavyBackground";
import { Button } from "@/components/ui/button";
import { clients } from "@/lib/constants";


export default function Home() {
  return (
    <div>
      <Navbar />
      <section className="w-full h-screen bg-neutral-950 rounded-md !overflow-visible relative flex flex-col items-center antialiased">
        <div className="absolute inset-0  h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]"></div>
        <div className="flex flex-col mt-[-100px] md:mt-[-50px]">
          <ContainerScroll titleComponent={
            <div className="flex items-center flex-col">
              <Button
                size={'lg'}
                className="cursor-pointer p-8 mb-8 md:mb-0 text-2xl w-full sm:w-fit border-t-2 rounded-full border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
              >
                <span className=" bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-600  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black goup-hover:to-black">
                  Get Started Now
                </span>
              </Button>
              <h1 className="text-5xl md:text-8xl  bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-600 font-sans font-bold">
                Automate Your Work With Automation
              </h1>
            </div>
          } />
        </div>
      </section>

      <InfiniteMovingCards
        className="md:mt-[18rem] mt-[-100px]"
        items={clients}
        direction="right"
        speed="slow"
      />

      <section>
        {/* <HeroParallas products={products}></HeroParallas> */}
        {/* <BackgroundLinesDemo/> */}
        <p className="text-2xl mt-32 md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
        Supercharge Your Productivity
        </p>
        <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        Streamline your workflows with intelligent automation – fast, flexible, and code-free.
        </p>
        <CardHoverEffectDemo />
      </section>

      <section className="mt-32">
        <LampComponent/>
      </section>
      <section >
        <TypewriterEffectSmoothDemo/>
      </section>
    </div>
  );
}
