import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PhraseStrip } from "@/components/PhraseStrip";
import { Problem } from "@/components/Problem";
import { Insight } from "@/components/Insight";
import { WhatIsBuildroom } from "@/components/WhatIsBuildroom";
import { HowItWorks } from "@/components/HowItWorks";
import { Difference } from "@/components/Difference";
import { Benefits } from "@/components/Benefits";
import { WhoShouldApply } from "@/components/WhoShouldApply";
import { BuiltForIndia } from "@/components/BuiltForIndia";
import { Vision } from "@/components/Vision";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

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
        <Difference />
        <Benefits />
        <WhoShouldApply />
        <BuiltForIndia />
        <PhraseStrip phrase="find cofounders. build products. launch startups." variant="brand" />
        <Vision />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
