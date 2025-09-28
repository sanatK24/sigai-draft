import Image from "next/image";

const HostsSection = () => {
  const images = [
    {
      src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3a38a397-005e-4ec0-ae61-a21e39703477-eventis-framer-website/assets/images/gK15eiL8HDGVKRFaHyqL10wQI-24.png?",
      alt: "A man in a dark coat smiling, one of the hosts.",
      width: 260,
      height: 320,
      desktopClass: "absolute top-[10%] left-[5%] w-[40%] max-w-[260px] z-10",
    },
    {
      src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3a38a397-005e-4ec0-ae61-a21e39703477-eventis-framer-website/assets/images/Pdu0ydWv06aVahAXONWTkMqds6M-23.png?",
      alt: "A woman with blonde hair smiling, one of the hosts.",
      width: 260,
      height: 320,
      desktopClass: "absolute top-0 right-[5%] w-[40%] max-w-[260px] z-20",
    },
    {
      src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3a38a397-005e-4ec0-ae61-a21e39703477-eventis-framer-website/assets/images/8483GEf3jVBW85R0d6WUCXZ8nw-25.png?",
      alt: "A woman with striking pink hair, one of the hosts.",
      width: 340,
      height: 420,
      desktopClass: "absolute bottom-0 left-[15%] w-[50%] max-w-[340px] z-20",
    },
    {
      src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3a38a397-005e-4ec0-ae61-a21e39703477-eventis-framer-website/assets/images/xMPNc1N0DWdxCCh9KXjQIquw-22.png?",
      alt: "A man in a turtleneck sweater, one of the hosts.",
      width: 340,
      height: 420,
      desktopClass: "absolute bottom-[8%] right-[10%] w-[50%] max-w-[340px] z-10",
    },
  ];

  return (
    <section id="host" className="bg-background text-foreground py-24 lg:py-32">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="lg:w-1/2 flex flex-col items-start text-left w-full lg:pr-8">
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-zinc-500" />
              <h4 className="text-base font-medium text-text-secondary">Our Host</h4>
            </div>
            <h2 className="mt-6 text-4xl sm:text-5xl font-bold leading-tight text-text-primary max-w-lg">
              Meet Our Hosts: The Visionaries Behind <span className="text-zinc-400">AIcron Tech Summit</span>
            </h2>
            <p className="mt-6 text-lg text-text-secondary max-w-lg">
              The AIcron Tech Summit is brought to you by a team of passionate innovators and industry leaders. Our hosts are dedicated to shaping the future of technology by bringing together the brightest minds in AI, automation, and digital transformation.
            </p>
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3a38a397-005e-4ec0-ae61-a21e39703477-eventis-framer-website/assets/svgs/BQY6ShJn5H5iyXXYMKWRaKnGrg-13.svg?"
              alt="Host signature"
              width={168}
              height={42}
              className="mt-8 brightness-0 invert"
            />
          </div>
          
          <div className="lg:w-1/2 w-full mt-12 lg:mt-0">
            <div className="hidden lg:block relative h-[650px]">
              {images.map((img, index) => (
                <div key={index} className={img.desktopClass}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    className="w-full h-auto rounded-3xl object-cover shadow-2xl"
                  />
                </div>
              ))}
            </div>
            
            <div className="lg:hidden grid grid-cols-2 gap-4 sm:gap-6">
                {images.map((img, index) => (
                    <div key={index} 
                         className={`w-full ${index > 1 ? 'mt-4 sm:mt-6' : ''} ${index % 2 !== 0 ? 'translate-y-8 sm:translate-y-12' : ''}`}>
                      <Image
                          src={img.src}
                          alt={img.alt}
                          width={img.width}
                          height={img.height}
                          className="w-full h-auto rounded-2xl object-cover shadow-lg"
                      />
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostsSection;