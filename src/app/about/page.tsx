import Image from "next/image";
import { StatsBar } from "@/components/about/StatsBar";
import { TeamSection } from "@/components/about/TeamSection";
import { AGENTS } from "@/lib/data/agents";

export const metadata = {
  title: "About Us",
  description: "Learn about LuxEstate — 15 years of excellence in real estate.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="bg-brand-primary py-20 px-4 text-center">
        <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase mb-3">Our Story</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white">About LuxEstate</h1>
        <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-lg">
          Founded in 2010, LuxEstate has grown into one of the most respected real estate firms in India,
          with offices in 8 cities and over 50 dedicated agents.
        </p>
      </div>

      <StatsBar />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div>
              <p className="text-sm font-semibold tracking-widest text-brand-accent uppercase mb-3">Our Mission</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Connecting People with Exceptional Places
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  We believe that finding the right home is one of life&apos;s most meaningful journeys. That&apos;s why we&apos;ve
                  built a team of dedicated professionals who combine deep local knowledge with world-class technology
                  to deliver an unparalleled real estate experience.
                </p>
                <p>
                  From your first conversation to the day you get your keys, LuxEstate is with you every step of the
                  way. Our agents are more than advisors — they&apos;re advocates, negotiators, and partners who put your
                  interests first.
                </p>
                <p>
                  We&apos;re proud to have helped over 1,200 families and investors find their perfect properties, and we&apos;d
                  love to make you our next success story.
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                alt="LuxEstate office"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <TeamSection agents={AGENTS} />
    </div>
  );
}
