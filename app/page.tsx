/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Countdown from "@/components/countdown";
import FadeAnimation from "@/components/fadeAnimation";
import Guest from "@/components/guest";
import LoadingOverlay from "@/components/loadingOverlay";
import Rsvp from "@/components/rsvp";
import { CalendarPlusIcon, CopyIcon, EnvelopeOpenIcon, HandHeartIcon, InstagramLogoIcon, MapPinIcon, PauseCircleIcon, PlayCircleIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { Cormorant_SC, Monsieur_La_Doulaise, PT_Serif, Tangerine } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useRef, useState } from "react";

const cormorant = Cormorant_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const prSerif = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const tangerine = Tangerine({
  subsets: ["latin"],
  weight: '700',
})

const mld = Monsieur_La_Doulaise({
  subsets: ["latin"],
  weight: ["400"],
});

const date = "2026-06-01T09:00:00+07:00"

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);

  const openInvitation = async () => {
    setOpened(true);
    handlePlayPause()
    videoRef.current?.play();

    window.scrollTo({
      top: 0,
      behavior: 'instant', // This removes the smooth sliding effect
    });

    const el = document.documentElement;

    if (el.requestFullscreen) {
      await el.requestFullscreen();
    } else if ((el as any).webkitRequestFullscreen) {
      (el as any).webkitRequestFullscreen();
    } else if ((el as any).msRequestFullscreen) {
      (el as any).msRequestFullscreen();
    }
  }

  const handlePlayPause = () => {
    setPlaying(p => !p)
    if (playing) {
      audioRef.current?.pause();
    } else audioRef.current?.play();
  }

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  }
  
  return (
    <div className="min-h-dvh text-white md:max-w-[500px] md:mx-auto">
      <LoadingOverlay />
      {/* Background video fixed */}
      <div className="fixed top-0 left-0 right-0 w-full md:max-w-[500px] md:mx-auto h-dvh -z-10">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          className="w-full h-dvh object-cover brightness-75"
        >
          <source src="/malinda/video-bg.mp4" type="video/mp4" />
        </video>

        <audio
          ref={audioRef}
          src='/musik2.mp3'
          loop
        />
      </div>

      {/* Overlay open screen */}
      <AnimatePresence>
        {!opened &&
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-black z-100 h-dvh md:max-w-[500px] md:mx-auto"
            style={{ backgroundImage: "url('/malinda/opening.jpeg')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="flex flex-col justify-center items-center gap-2 h-full bg-black/30">
              <div className={`${prSerif.className} mb-2`}>The Wedding of</div>
              <div className={`${cormorant.className} mb-2 text-4xl`}>
                Abi <span className={`${mld.className} text-6xl`}>&</span> Malinda
              </div>
              <div className={`${prSerif.className} mb-90`}>01 Juni 2026</div>
              <div className={`${prSerif.className}`}>Dear ,</div>
              <Suspense>
                <Guest />
              </Suspense>
              <button
                onClick={openInvitation}
                className="bg-transparent shadow-sm shadow-[rgba(0,0,0,.5)] border backdrop-blur-xs border-white px-7 py-2.5 rounded-xs mt-10 cursor-pointer"
              >
                <div className={`${prSerif.className} font-bold text-md flex items-center gap-3`}>
                  <EnvelopeOpenIcon color="white" size={25} /> Buka undangan
                </div>
              </button>
            </div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Scrollable content */}
      <div className="z-0 p-4">
        <section className="h-dvh flex flex-col justify-end pb-30">
          <div className={`${cormorant.className} text-6xl mb-2 text-right mr-7 relative`}>
            <FadeAnimation type="left" className="mr-15">Malinda</FadeAnimation>
            <span className={`${mld.className} text-8xl opacity-50 absolute right-15 bottom-0`}>&</span>
            <FadeAnimation type="right">Abi</FadeAnimation>
          </div>
          <div className="flex items-center gap-10 mr-10">
            <div className="flex-1 h-[1px] bg-amber-50" />
            <span className={`${prSerif.className}`}>
              01/06/26
            </span>
          </div>
        </section>

        <section className="mt-20">
          <FadeAnimation type="up">
            <div className={`${tangerine.className} text-center text-3xl mb-5`}>
              Assalamualaikum Wr. Wb.
            </div>
            <div className={`${prSerif.className} text-center px-5 mb-10`}>
              Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta&apos;ala, Kami mengundang Bapak/Ibu/Saudara/i, untuk menghadiri Resepsi Pernikahan kami.
            </div>
          </FadeAnimation>
          <div className="mb-5">
            <FadeAnimation type="left" className=" mb-[-28px]">
            <div className={`${cormorant.className} tracking-tighter font-bold uppercase text-6xl opacity-70 z-10 flex items-start gap-2`}>
              <span className="text-2xl tracking-normal mt-1">The</span> bride
            </div>
            </FadeAnimation>
            <Image
              src='/malinda/bride.jpeg'
              alt="bride"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-[600px] object-cover bg-gray-50/50"
            />
            <div className="absolute mt-[-150px] ml-[20px] p-3 bg-black/30">
              <FadeAnimation type="right" className={`${cormorant.className} mb-2 font-bold text-2xl`}>Malinda Ni&apos;matun Abaddiyah</FadeAnimation>
              <FadeAnimation type="up">
                <div className={`${prSerif.className} opacity-80 mb-2 text-sm`}>
                  Bapak Narto & Ibu Siti Nur Asiyah<br/>
                  Ds.Sumberagung Kec.Rejotangan Kab.Tulungagung
                </div>
                <Link
                  href='https://www.instagram.com/malindanik'
                  target="_blank"
                  className="text-sm cursor-pointer opacity-80 border w-fit px-2 text-md self-center shadow-sm shadow-[rgba(0,0,0,.5)] flex flex-non gap-2 items-center">
                  <InstagramLogoIcon /> malindanik
                </Link>
              </FadeAnimation>
            </div>
          </div>
          <div>
            <Image
              src='/malinda/groom.jpeg'
              alt="groom"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-[600px] object-cover bg-gray-50/50"
            />
            <div className="absolute mt-[-150px] ml-[20px] p-3 bg-black/30 ">
              <FadeAnimation type="right" className={`${cormorant.className} mb-2 font-bold text-2xl`}>Abi Nur Rahmat</FadeAnimation>
              <FadeAnimation type="up">
                <div className={`${prSerif.className} opacity-90 mb-2 text-sm`}>
                  Bapak Suyono Anung R. & Ibu Sriatun<br/>
                  Ds.Sumberagung Kec.Rejotangan Kab.Tulungagung
                </div>
                <Link
                  href='https://www.instagram.com/mas.abi_cekut'
                  target="_blank"
                  className="text-sm cursor-pointer opacity-90 border w-fit px-2 text-md self-center shadow-sm shadow-[rgba(0,0,0,.5)] flex flex-non gap-2 items-center">
                  <InstagramLogoIcon /> mas.abi_cekut
                </Link>
              </FadeAnimation>
            </div>
            <FadeAnimation type="right" className="mt-[-28px]">
              <div className={`${cormorant.className} tracking-tighter font-bold uppercase text-6xl opacity-70 flex items-end justify-end gap-2`}>
                <span className="text-2xl tracking-normal mb-1">The</span> groom
              </div>
            </FadeAnimation>
          </div>
        </section>

        <section className="h-dvh flex flex-col justify-center items-center">
          <div className="w-[300px] h-[350px] shadow-md shadow-[rgba(0,0,0,.5)] text-center p-5 border-2 backdrop-blur-xs border-white flex flex-col gap-8 justify-center items-center">
            <div className="relative">
              <FadeAnimation type="up">
                <div className={`${tangerine.className} text-6xl`}>
                  Countdown
                </div>
                <div className={`${tangerine.className} text-5xl opacity-40 text-right mt-[-25px]`}>
                  Timer
                </div>
              </FadeAnimation>
            </div>

            <Suspense>
              <FadeAnimation type="up" delay={.3}>
                <div className={`${prSerif.className}`}>
                  <Countdown date={date} />
                </div>
              </FadeAnimation>
            </Suspense>

            <FadeAnimation type="up" delay={.5} className="overflow-visible">
              <Link
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+Wedding+of+Abi+%26+Malinda&details=Akad:+01+Juni+2026+09:00+WIB%0AResepsi:+01+Juni+2026+13:00+WIB%0ALokasi:+Dsn.Sumberagung+RT+002/RW+011+Ds.Sumberagung+Kec.Rejotangan+Kab.Tulungagung%0AMaps:+https://maps.app.goo.gl/uEUaCh4k24PNweSw6&dates=20260601T020000Z/20260601T080000Z&location=Dsn.Sumberagung+RT+002/RW+011+Ds.Sumberagung+Kec.Rejotangan+Kab.Tulungagung"
                target="_blank"
                className={`${prSerif.className} cursor-pointer border pt-1 pl-5 pr-5 pb-1 text-md shadow-sm shadow-[rgba(0,0,0,.5)] flex gap-2 items-center`}
              >
                <CalendarPlusIcon color="white" size={20} /> Save the date
              </Link>
            </FadeAnimation>
          </div>
        </section>

        <section className="min-h-dvh p-1 text-center">
          <div className="backdrop-blur-xs border-2 shadow-md shadow-[rgba(0,0,0,.5)] border-white rounded-t-full rounded-b-full p-2 pb-30 min-h-dvh overflow-hidden">
            <Image
              src='/malinda/1.jpeg'
              alt="event"
              width={0}
              height={0}
              sizes="100vw"
              className="rounded-t-full  max-w-[500px] w-full aspect-9/16 h-auto object-cover mb-10 bg-gray-50/50"
            />

            <div className='relative mb-2 mt-0'>
              <FadeAnimation type="left" className={`${tangerine.className} text-6xl`}>
                Wedding
              </FadeAnimation>
              <FadeAnimation type="right" className="mt-[-20px]">
                <div className={`${tangerine.className} text-5xl opacity-40 ml-20`}>
                  Event
                </div>
              </FadeAnimation>
            </div>

            <div>
              <div className={`flex ${prSerif.className} mt-10 items-center gap-3`}>
                <FadeAnimation type="left" className="flex-1" delay={.5}>
                  <div className="flex-1 h-[1px] bg-amber-50" />
                    <div className="text-md uppercase text-right mt-1 mb-1">
                      Senin
                    </div>
                  <div className="flex-1 h-[1px] bg-amber-50" />
                </FadeAnimation>
                <FadeAnimation>
                  <div className="font-bold text-2xl leading-5">01</div>
                  <div className="text-sm font-bold">2026</div>
                </FadeAnimation>
                <FadeAnimation type="right" className="flex-1" delay={.5}>
                  <div className="flex-1 h-[1px] bg-amber-50" />
                    <div className="text-md uppercase text-left mt-1 mb-1">
                      Juni
                    </div>
                  <div className="flex-1 h-[1px] bg-amber-50" />
                </FadeAnimation>
              </div>

              <div className={`flex ${prSerif.className} mt-10 items-center justify-evenly gap-3`}>
                <FadeAnimation type="left" delay={.5} className="flex-1">
                  <div className="text-2xl mb-5">AKAD</div>
                  <div className="text-sm">09.00 WIB</div>
                </FadeAnimation>
                <FadeAnimation type="up" className="w-[1.5px] h-20 bg-amber-50" >
                  <div/>
                </FadeAnimation>
                <FadeAnimation type="right" delay={.5} className="flex-1">
                  <div className="text-2xl mb-5">RESEPSI</div>
                  <div className="text-sm">13.00 WIB</div>
                </FadeAnimation>
              </div>

              <FadeAnimation type="up">
                <div className={`${prSerif.className} mt-10 flex flex-col gap-5`}>
                  <div>Lokasi</div>
                  <div>Dsn.Sumberagung RT 002/RW 011 Ds.Sumberagung Kec.Rejotangan Kab.Tulungagung</div>
                  <Link
                    href='https://maps.app.goo.gl/uEUaCh4k24PNweSw6'
                    target="_blank"
                    className="cursor-pointer border pt-1 pl-5 pr-5 pb-1 text-md self-center shadow-sm shadow-[rgba(0,0,0,.5)] flex gap-2 items-center">
                    <MapPinIcon color="white" size={20} /> Google Maps
                  </Link>
                </div>
              </FadeAnimation>

            </div>
          </div>
        </section>

        <section className="mt-10">
          <FadeAnimation type="up">
            <Image
              src='/malinda/11.jpeg'
              alt="prewed"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-[300px] object-cover mb-10 [object-position:center_70%] bg-gray-50/50"
            />
          </FadeAnimation>
          <div className={`${prSerif.className} text-center relative mb-5`}>
            <div className="text-4xl">GALLERY</div>
            <div className="opacity-40 text-7xl mt-[-55px] mb-5">OUR</div>
            <div className="">&quot;Pernikahan yang sukses adalah jatuh cinta sering kali dan selalu terhadap orang yang sama.&quot;</div>
          </div>
          <div className="grid grid-cols-3 gap-1 justify-center">
            <FadeAnimation type="up">
              <Image
              src='/malinda/2.jpeg'
                alt="prewed"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[120px] object-cover bg-gray-50/50"
              />
            </FadeAnimation>
            <FadeAnimation type="up">
              <Image
              src='/malinda/14.jpeg'
                alt="prewed"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[120px] object-cover bg-gray-50/50"
              />
            </FadeAnimation>
            <FadeAnimation type="up">
              <Image
              src='/malinda/3.jpeg'
                alt="prewed"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[120px] object-cover bg-gray-50/50"
              />
            </FadeAnimation>
          </div>
          <div className="grid grid-cols-4 gap-1 justify-center mt-8">
            <FadeAnimation type="up" className="col-span-2">
              <Image
                src='/malinda/15.jpeg'
                alt="prewed"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-cover contrast-130 brightness-80 bg-gray-50/50" 
              />
            </FadeAnimation>
            <FadeAnimation type="up" className="col-span-2">
              <Image
                src='/malinda/5.jpeg'
                alt="prewed"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-cover bg-gray-50/50"
              />
            </FadeAnimation>
            <FadeAnimation type="up" className="col-span-2">
              <Image
                src='/malinda/6.jpeg'
                alt="prewed"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-cover bg-gray-50/50"
              />
            </FadeAnimation>
            <FadeAnimation type="up" className="col-span-2">
              <Image
                src='/malinda/17.jpeg'
                alt="prewed"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-cover bg-gray-50/50"
              />
            </FadeAnimation>
            <FadeAnimation type="up" className="col-span-1">
              <Image
                src='/malinda/13.jpeg'
                alt="prewed"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[200px] object-cover bg-gray-50/50"
              />
              </FadeAnimation>
            <FadeAnimation type="up" className="w-full h-[200px] overflow-hidden col-span-3">
              <Image
                src='/malinda/18.jpeg'
                alt="prewed"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[200px] object-cover bg-gray-50/50"
              />
            </FadeAnimation>
            <FadeAnimation type="up" className="row-span-2 col-span-2">
              <Image
                src='/malinda/12.jpeg'
                alt="prewed"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[405px] object-cover bg-gray-50/50"
              />
            </FadeAnimation>
            <FadeAnimation type="up" className="col-span-2">
              <Image
                src='/malinda/21.jpeg'
                alt="prewed"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[200px] object-cover bg-gray-50/50"
              />
            </FadeAnimation>
            <FadeAnimation type="up" className="col-span-2">
              <Image
                src='/malinda/20.jpeg'
                alt="prewed"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[200px] object-cover bg-gray-50/50"
              />
            </FadeAnimation>
            <FadeAnimation type="up" className="col-span-4">
              <Image
                src='/malinda/19.jpeg'
                alt="prewed"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[300px] object-cover [object-position:center_30%] bg-gray-50/50 "
              />
            </FadeAnimation>
          </div>
        </section>
        
        <Suspense>
          <FadeAnimation type="up">
            <Rsvp />
          </FadeAnimation>
        </Suspense>

        <section className={`${prSerif.className} flex flex-col my-10 py-5 px-5 border-t border-b text-center `}>
          <div className={`${prSerif.className} text-3xl my-2`}>
            Wedding Gift
          </div>
          <div>Doa restu Anda adalah hadiah terindah. <br/>Jika berhalangan hadir, dan ingin memberikan tanda kasih dapat dikirim melalui tombol di bawah</div>
          <button
            onClick={() => setGiftOpen(p => !p)}
            className="border backdrop-blur-xs rounded-2xl cursor-pointer my-5 pt-1 pl-5 pr-5 pb-1 text-md self-center flex gap-2 items-center shadow-sm shadow-[rgba(0,0,0,.5)] ">
            <HandHeartIcon /> Kirim kado Pernikahan
          </button>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              giftOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex border backdrop-blur-xs mt-3 rounded overflow-hidden">
              <div>
                <Image
                  src='/bca.png'
                  alt="bca"
                  width={80}
                  height={80}
                />
              </div>
              <div className="text-left pl-2 py-3">
                <div>Malinda Ni&apos;matun Abaddiyah</div>
                <button
                  onClick={() => handleCopy('3230697328')}
                  className="cursor-pointer flex items-center gap-2 mt-2">
                  <CopyIcon /> 3230697328
                </button>
              </div>
            </div>
            <div className="flex border backdrop-blur-xs mt-3 rounded overflow-hidden">
              <div>
                <Image
                  src='/dana.png'
                  alt="dana"
                  width={80}
                  height={80}
                />
              </div>
              <div className="backdrop-blur-xs text-left pl-2 py-3">
                <div>Malinda Ni&apos;matun Abaddiyah</div>
                <button
                  onClick={() => handleCopy('085755157850')}
                  className="cursor-pointer flex items-center gap-2 mt-2">
                  <CopyIcon /> 085755157850
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="min-h-dvh pt-55 pb-45 text-center flex flex-col justify-between">
          <div className={`${prSerif.className} text-md`}>
            See You On Our Special Day
          </div>
          <div className={`${cormorant.className} text-4xl mb-2 mt-0`}>
            Abi <span className={`${mld.className} text-6xl`}>&</span> Malinda
          </div>
          <div className={`${prSerif.className} text-md`}>
            Thankyou
            <div className={`${tangerine.className} text-center text-3xl mt-2`}>
              Wassalamualaikum Wr. Wb.
            </div>
          </div>
        </section>
      </div>
        <div className="text-sm text-center text-white">made with ❤ by fajarpng</div>

      <div className="fixed bottom-0 right-0 m-4 z-50 text-4xl opacity-80" onClick={handlePlayPause}>
        {playing ? <PauseCircleIcon /> : <PlayCircleIcon />}
      </div>
    </div>
  );
}
