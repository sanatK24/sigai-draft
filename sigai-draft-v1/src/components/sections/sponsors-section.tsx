import Image from "next/image";

const sponsors = [
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3a38a397-005e-4ec0-ae61-a21e39703477-eventis-framer-website/assets/svgs/wLhuCPG1QkEsT8eVbC2WdaJbY-5.svg?",
    alt: "Sponsor logo 1",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3a38a397-005e-4ec0-ae61-a21e39703477-eventis-framer-website/assets/svgs/suEEU5kNCM551JWQ8LQPU9apQ7M-6.svg?",
    alt: "Sponsor logo 2",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3a38a397-005e-4ec0-ae61-a21e39703477-eventis-framer-website/assets/svgs/kfSyDHpupYXqou4Ppy46bPjZow-7.svg?",
    alt: "Sponsor logo 3",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3a38a397-005e-4ec0-ae61-a21e39703477-eventis-framer-website/assets/svgs/PFUwZzf2QYtnQq0xSSrQZtbB8-8.svg?",
    alt: "Sponsor logo 4",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3a38a397-005e-4ec0-ae61-a21e39703477-eventis-framer-website/assets/svgs/lwMHxC1QCTGTFyBWyfPLpxztAJs-9.svg?",
    alt: "Sponsor logo 5",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3a38a397-005e-4ec0-ae61-a21e39703477-eventis-framer-website/assets/svgs/fStqNgoOn7mAnxk1ANzzMoFYJmY-10.svg?",
    alt: "Sponsor logo 6",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3a38a397-005e-4ec0-ae61-a21e39703477-eventis-framer-website/assets/svgs/23vJ110QMjUqNPFpkwXq6bg4gM-11.svg?",
    alt: "Sponsor logo 7",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3a38a397-005e-4ec0-ae61-a21e39703477-eventis-framer-website/assets/svgs/roaoLlSoqyob1e9hZu0cMppTnu0-12.svg?",
    alt: "Sponsor logo 8",
  },
];

const SponsorsSection = () => {
  return (
    <section className="bg-background py-[100px]">
      <div className="container mx-auto flex flex-col items-start gap-20 px-6">
        <div className="flex flex-col items-start gap-6 text-left">
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-zinc-500" />
            <h4 className="text-base font-medium text-muted-foreground">Sponsorship</h4>
          </div>
          <h2 className="max-w-4xl text-5xl font-bold leading-tight text-foreground md:text-[48px]">
            Meet our sponsors who help to bring this think live
          </h2>
        </div>
        <div className="grid w-full grid-cols-2 gap-6 lg:grid-cols-4">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="flex h-[140px] items-center justify-center rounded-2xl border border-border bg-card p-10"
            >
              <Image
                src={sponsor.src}
                alt={sponsor.alt}
                width={130}
                height={40}
                className="h-auto max-h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;