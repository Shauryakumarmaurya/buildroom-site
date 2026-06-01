import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PhraseStrip } from "@/components/PhraseStrip";
import { Problem } from "@/components/Problem";
import { Insight } from "@/components/Insight";
import { WhatIsBuildroom } from "@/components/WhatIsBuildroom";
import { HowItWorks } from "@/components/HowItWorks";
import { WhosInTheRoom } from "@/components/WhosInTheRoom";
import { CohortStats } from "@/components/CohortStats";
import { Difference } from "@/components/Difference";
import { Benefits } from "@/components/Benefits";
import { WhoShouldApply } from "@/components/WhoShouldApply";
import { BuiltForIndia } from "@/components/BuiltForIndia";
import { Vision } from "@/components/Vision";
import { Testimonials } from "@/components/Testimonials";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PhraseStrip phrase="find cofounders. build products. launch startups." variant="light" />
        <Problem />
        <Insight />
        <WhatIsBuildroom />
        <HowItWorks />
        <WhosInTheRoom />
        <CohortStats />
        <Difference />
        <Benefits />
        <WhoShouldApply />
        <BuiltForIndia />
        <PhraseStrip phrase="find cofounders. build products. launch startups." variant="brand" />
        <Vision />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}
