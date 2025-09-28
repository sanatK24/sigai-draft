import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const ticketTiers = [
  {
    name: 'General Admission',
    description: 'Access to the main stage, exhibitions, and standard networking sessions throughout the summit.',
    price: 299,
    priceDescription: 'Single admission',
    features: [
      'Entry to keynote sessions',
      'Access to tech expo floor',
      'Standard networking lounge',
      'Summit welcome kit',
    ],
    href: 'https://www.framer.com/',
  },
  {
    name: 'VIP Pass',
    description: 'Premium experience with priority access, exclusive sessions, and VIP-only networking opportunities.',
    price: 599,
    priceDescription: 'Single admission',
    features: [
      'Priority seating at all sessions',
      'Access to VIP lounge',
      'Invitation to speaker dinner',
      'Premium summit kit',
    ],
    href: 'https://www.framer.com/',
  },
  {
    name: 'Team Pass',
    description: 'Perfect for companies or teams attending together. Includes access for 5 members and group perks.',
    price: 1299,
    priceDescription: '5 Members',
    features: [
      '5 full-access passes',
      'Reserved group seating',
      'Team branding opportunities',
      'Group photo with keynote speakers',
    ],
    href: 'https://www.framer.com/',
  },
];

const RegistrationSection = () => {
  return (
    <section id="tickets" className="bg-background py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto px-6">
        {/* Heading: left-aligned eyebrow without border/bg */}
        <div className="max-w-4xl mx-auto text-left mb-16 flex flex-col items-start">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-px w-6 bg-zinc-500" />
            <h4 className="text-sm font-medium text-text-secondary">Registration</h4>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-text-primary">
            Secure Your Spot at <span className="text-zinc-400">AIcron Tech Summit</span> Today!
          </h2>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          {ticketTiers.map((tier) => (
            <a
              key={tier.name}
              href={tier.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative bg-card border border-border rounded-3xl overflow-hidden transition-colors duration-300 hover:border-primary/50">
                <div className="flex flex-col lg:flex-row">
                  {/* Left side */}
                  <div className="flex-1 p-8 lg:p-10">
                    <h3 className="text-2xl lg:text-3xl font-semibold text-text-primary">{tier.name}</h3>
                    <p className="mt-4 text-base lg:text-lg text-text-secondary">{tier.description}</p>
                    <div className="mt-8 space-y-4">
                      {tier.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-4">
                          <div className="w-0.5 h-6 bg-gradient-to-b from-primary to-accent rounded-full" />
                          <p className="text-base lg:text-lg text-text-secondary">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dashed line separator */}
                  <div className="hidden lg:block w-px border-l border-dashed border-white/10 my-10" />

                  {/* Right side (ticket stub) */}
                  <div className="relative w-full lg:w-[380px] lg:flex-shrink-0 flex flex-col p-8 lg:p-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-80"></div>
                     <div 
                      className="absolute inset-0 bg-repeat opacity-[0.02]"
                      style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}
                    ></div>
                    <div className="relative z-10 flex flex-col grow">
                      <div className="inline-flex items-center gap-2 self-start rounded-full bg-white/10 backdrop-blur-sm px-3 py-1">
                        <Image
                          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3a38a397-005e-4ec0-ae61-a21e39703477-eventis-framer-website/assets/images/3kxldV7BC3d9wSymJCgCONopL4-26.png?"
                          alt="Early bird icon"
                          width={14}
                          height={14}
                          className="opacity-80"
                        />
                        <p className="text-sm font-medium text-white">Early Bird</p>
                      </div>

                      <div className="my-auto text-center lg:text-left py-8 lg:py-0">
                        <p className="text-6xl lg:text-7xl font-extrabold text-white">
                          ${tier.price}
                        </p>
                        <p className="mt-2 text-lg text-white/80">{tier.priceDescription}</p>
                      </div>

                      <div className="mt-auto flex items-center justify-between rounded-full bg-white/10 backdrop-blur-sm px-6 py-4 transition-colors duration-300 group-hover:bg-white/20">
                        <p className="font-medium text-white">Buy Ticket</p>
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative cutouts */}
                <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-[calc(100%-380px)] -translate-x-1/2 w-6 h-6 bg-background rounded-full"></div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;