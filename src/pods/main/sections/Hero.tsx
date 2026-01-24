import Background from '@/assets/background.avif';
import { ArrowRight, AudioLines, Mic, Plus, SlidersHorizontal } from 'lucide-react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useEffect } from 'react';

export default function Hero() {
  const avatars = [
    'https://i.pravatar.cc/150?img=59',
    'https://i.pravatar.cc/150?img=53',
    'https://i.pravatar.cc/150?img=57',
    'https://i.pravatar.cc/150?img=64',
  ];

  useEffect(() => {
    gsap.registerPlugin(SplitText);

    const tl = gsap.timeline();

    const ctaText = new SplitText('.hero-cta', { type: 'words' });
    const heroText = new SplitText('.hero-title', { type: 'words' });

    tl.to('.hero-cta', {
      autoAlpha: 1,
      duration: .4,
    });

    tl.from(heroText.words, {
      autoAlpha: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.08,
    }, '-=0.2');

    tl.from(ctaText.words, {
      autoAlpha: 0,
      y: 10,
      duration: 0.3,
      ease: 'power2.out',
      stagger: 0.05,
    }, '-=0.5');

    return () => {
      tl.kill();
      ctaText.revert();
      heroText.revert();
    };
  }, []);

  return (
    <>
      <div
        style={{ backgroundImage: `url(${Background})` }}
        className="hero-section relative flex flex-col justify-center items-center overflow-hidden min-h-dvh bg-cover bg-no-repeat"
      >
        <div className="spolight absolute left-60 -rotate-20 top-40 blur-[77px] bg-white/12 rounded-full w-3xs h-90" />
        <div className="spolight absolute rotate-20 right-60 top-40 blur-[77px] bg-white/12 rounded-full w-3xs h-90" />
        <div className="spolight absolute bottom-20 right-40 rotate-20 blur-[77px] bg-white/12 rounded-full w-3xs h-90" />
        <div className="spolight absolute bottom-20 -rotate-20 left-40 blur-[77px] bg-white/12 rounded-full w-3xs h-90" />

        <div className="absolute inset-0 h-90 w-7xl left-1/2 top-0 -translate-x-1/2 bg-[linear-gradient(to_right,#ffffff09_1px,transparent_1px),linear-gradient(to_bottom,#ffffff09_1px,transparent_1px)] bg-size-[64px_64px]"/>

        <div className="hero-content max-2xl:mt-12 flex flex-col gap-12 text-sm font-medium items-center justify-center">
          <div className="countdown bg-white flex gap-2 pr-1 pl-0.5 py-0.5 items-center rounded-sm">
            <div className="countdown-text text-white bg-black px-2 py-0.5 rounded-sm">
              2026 is here
            </div>
            <span className="tracking-wider">Make every second count</span>
          </div>
          <div>
            <h1 className="font-bold leading-20 hero-title text-7xl text-center text-white max-w-[20ch] tracking-wide max-xl:text-6xl max-md:text-5xl max-sm:text-4xl">Build Your Perfect Day & <span className="hero-cta-title bg-linear-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Supercharge your focus.</span></h1>
          </div>
          <div className="hero-input w-2xl max-md:w-[95%] mx-auto bg-black/20 flex flex-col text-white border min-h-40 p-4 border-white/30 rounded-xl">
            <textarea
              className="w-full resize-none min-h-14 overflow-y-auto outline-0 text-base"
              placeholder="Describe your ideal day... (e.g. Wake up at 6am, workout, deep work for 4 hours, and dinner at 8pm)"
            />
            <span className="flex-1"/>
            <div className="buttons w-full pb-2 h-full flex justify-between items-end text-white/80">
              <div className="left-icons flex items-center gap-4">
                <Plus />
                <div className="tools flex items-center gap-2">
                  <SlidersHorizontal />
                  <span className="text-white">Tools</span>
                </div>
              </div>
              <div className="right-icons flex items-center gap-4">
                <Mic />
                <div className="real-time-ai bg-white/30 text-white/50 rounded-full p-1.5">
                  <AudioLines size={24} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 w-full relative">
            <button className="rounded-lg text-lg h-12 relative font-medium pl-6 pr-1 cursor-pointer bg-linear-to-r from-orange-400 to-orange-600 text-white flex gap-4 items-center">
              Create Routine
              <div className="next-icon w-max h-max rounded-md bg-white p-1.5 text-orange-400">
                <ArrowRight />
              </div>
            </button>
            <div className="group-avatars flex flex-row items-center relative max-lg:hidden">
              {avatars.map((avatar, i) => (
                <div key={i} className="avatar size-12 -mr-4">
                  <img
                    src={avatar}
                    alt={avatar}
                    draggable={false}
                    className="w-full h-full select-none rounded-full border border-white"
                  />
                </div>
              ))}
              <div className="avatars-text hero-cta opacity-0 select-none absolute -right-90 h-26 flex justify-end items-end max-w-[30ch] text-center uppercase">
                <svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" className="absolute top-10 -left-14" viewBox="0 0 365.28 365.28" transform="rotate(170)">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                  <g id="SVGRepo_iconCarrier"> <g> <path d="M364.091,335.48c-19.584-32.436-40.392-64.26-59.976-96.695c-3.672-6.12-14.076-3.673-13.465,3.672 c0,14.076,0.612,27.54,0.612,41.616c-9.792-10.404-12.24-22.645-14.076-37.332c-1.224-6.12-3.672-12.853-10.403-14.688 c-10.404-3.06-22.032,7.344-29.988,12.852c-20.196,14.076-38.556,30.601-60.588,42.229c-25.704,12.852-26.316-5.508-20.808-25.704 c5.508-21.42,15.3-42.84,26.316-61.812c19.584-33.048,42.229-67.32,47.736-105.876c3.06-21.42-7.956-53.856-34.885-52.632 c-33.047,1.224-70.992,25.704-92.412,50.184c-12.24,12.24-82.008,104.04-88.74,51.408c-4.896-38.556,26.928-85.68,45.9-117.504 c2.448-4.284-3.672-8.568-6.732-4.896C28.715,49.677,9.743,87.009,1.175,124.341c-4.284,20.196,2.448,57.528,31.824,49.572 c34.272-9.18,56.916-47.736,78.948-73.44c13.464-16.524,34.884-28.764,53.244-38.556c39.168-20.808,56.916,9.792,47.124,45.288 c-12.239,43.452-43.452,78.947-61.2,119.952c-6.12,14.688-28.152,63.647-4.284,75.888c27.54,14.076,64.26-20.809,83.844-36.108 c-1.224,0.612,31.212-25.704,33.048-20.195c1.836,5.508,1.836,12.239,3.061,18.359c2.447,11.628,7.344,20.809,15.3,28.152 c-11.628-0.612-23.256,0-34.884,1.836c-6.12,1.224-6.732,10.404-1.836,13.464c34.884,19.584,74.052,24.48,111.384,37.332 C362.255,348.333,367.763,340.989,364.091,335.48z M297.995,304.269c3.672,0,4.896-3.06,4.284-5.508 c1.836-1.224,3.06-3.06,3.06-5.508c0-7.956,0-16.524,0-24.48c12.24,19.584,24.48,38.557,36.72,58.141 c-23.256-6.732-47.124-11.628-69.155-20.809C280.859,305.493,289.427,304.881,297.995,304.269z"/> </g> </g>
                </svg>
                <span className="font-gloria text-white font-medium text-lg mx-auto">2k+ people are already ahead of you</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
