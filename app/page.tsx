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

const date = "2025-09-23T08:00:00+07:00"

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);

  const openInvitation = () => {
    setOpened(true);
    handlePlayPause()
    videoRef.current?.play();
  };

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
    <div className="min-h-dvh text-white md:max-w-[500px]">
      <LoadingOverlay />
      {/* Background video fixed */}
      <div className="fixed top-0 left-0 w-full h-dvh -z-10">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          className="w-full h-dvh object-cover brightness-75"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <audio
          ref={audioRef}
          src='/musik.mp3'
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
            className="fixed inset-0 bg-black z-100 h-dvh"
            style={{ backgroundImage: "url('/photo-7.jpeg')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="flex flex-col justify-center items-center gap-2 h-full bg-black/30 ">
              <div className={`${prSerif.className} mb-2`}>The Wedding of</div>
              <div className={`${cormorant.className} mb-2 text-4xl`}>
                Fajar <span className={`${mld.className} text-6xl`}>&</span> Ingka
              </div>
              <div className={`${prSerif.className} mb-8`}>23 September 2025</div>
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
          <div className={`${cormorant.className} text-6xl mb-2 text-right mr-7`}>
            <FadeAnimation type="left" className="mr-15">Ingka</FadeAnimation>
            <span className={`${mld.className} text-8xl opacity-50 absolute right-25 mt-[-40px]`}>&</span>
            <FadeAnimation type="right">Fajar</FadeAnimation>
          </div>
          <div className="flex items-center gap-10 mr-10">
            <div className="flex-1 h-[1px] bg-amber-50" />
            <span className={`${prSerif.className}`}>
              23/09/25
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
            <FadeAnimation type="left">
            <div className={`${cormorant.className} tracking-tighter font-bold uppercase text-6xl opacity-70 z-10 flex items-start mb-[-28px] gap-2`}>
              <span className="text-2xl tracking-normal mt-1">The</span> bride
            </div>
            </FadeAnimation>
            <Image
              src='/bride.jpeg'
              alt="bride"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute mt-[-150px] ml-[30px]">
              <FadeAnimation type="right" className={`${cormorant.className} mb-2 font-bold text-2xl`}>Ingka Fahira</FadeAnimation>
              <FadeAnimation type="up">
                <div className={`${prSerif.className} opacity-80 mb-2 text-sm`}>
                  Bapak Mustofa & Ibu Basimah<br/>
                  Ngalian, Wadaslintang, Kab. Wonosobo
                </div>
                <Link
                  href='https://www.instagram.com/inkaaple_'
                  target="_blank"
                  className="text-sm cursor-pointer opacity-80 border w-fit px-2 text-md self-center shadow-sm shadow-[rgba(0,0,0,.5)] flex flex-non gap-2 items-center">
                  <InstagramLogoIcon /> inkaaple_
                </Link>
              </FadeAnimation>
            </div>
          </div>
          <div>
            <Image
              src='/groom.jpeg'
              alt="groom"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute mt-[-150px] ml-[30px]">
              <FadeAnimation type="right" className={`${cormorant.className} mb-2 font-bold text-2xl`}>Tri Fajar Pangestu</FadeAnimation>
              <FadeAnimation type="up">
                <div className={`${prSerif.className} opacity-90 mb-2 text-sm`}>
                  Bapak Arif Anung R. & Ibu Siti Ngaisah<br/>
                  Surengede, Kertek, Kab. Wonosobo
                </div>
                <Link
                  href='https://www.instagram.com/fajar_png'
                  target="_blank"
                  className="text-sm cursor-pointer opacity-90 border w-fit px-2 text-md self-center shadow-sm shadow-[rgba(0,0,0,.5)] flex flex-non gap-2 items-center">
                  <InstagramLogoIcon /> fajar_png
                </Link>
              </FadeAnimation>
            </div>
            <FadeAnimation type="right">
              <div className={`${cormorant.className} tracking-tighter font-bold uppercase text-6xl opacity-70 flex items-end justify-end mt-[-28px] gap-2`}>
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

            <FadeAnimation type="up" delay={.4}>
              <button className={`${prSerif.className} cursor-pointer  border pt-1 pl-5 pr-5 pb-1 text-md shadow-sm shadow-[rgba(0,0,0,.5)] `}>
                <Link
                  href='https://calendar.google.com/calendar/u/0/r/eventedit?text=
                    &text=The+Wedding+of+Fajar+%26+Ingka
                    &details=Join+us+for+our+special+day!
                    &dates=20250923T090000Z/20250923T140000Z
                    &location=Pukiran,+Ngalian,+Kec.+Wadaslintang,+Kabupaten+Wonosobo,+Jawa+Tengah,+Indonesia'
                  target="_blank"
                  className="flex gap-2 items-center">
                  <CalendarPlusIcon color="white" size={20} /> Save the date
                </Link>
              </button>
            </FadeAnimation>
          </div>
        </section>

        <section className="min-h-dvh p-1 text-center">
          <div className="backdrop-blur-xs border-2 shadow-md shadow-[rgba(0,0,0,.5)] border-white rounded-t-full rounded-b-full p-2 pb-30 min-h-dvh overflow-hidden">
            <Image
              src='/photo-2.jpeg'
              alt="event"
              width={0}
              height={0}
              sizes="100vw"
              className="rounded-t-full w-full h-auto mb-10 contrast-110"
            />

            <div className='relative mb-2 mt-0'>
              <FadeAnimation type="left" className={`${tangerine.className} text-6xl`}>
                Wedding
              </FadeAnimation>
              <FadeAnimation type="right">
                <div className={`${tangerine.className} text-5xl opacity-40 ml-20 mt-[-20px]`}>
                  Event
                </div>
              </FadeAnimation>
            </div>

            <div>
              <div className={`flex ${prSerif.className} mt-10 items-center gap-3`}>
                <FadeAnimation type="left" className="flex-1" delay={.5}>
                  <div className="flex-1 h-[1px] bg-amber-50" />
                    <div className="text-md uppercase text-right mt-1 mb-1">
                      Selasa
                    </div>
                  <div className="flex-1 h-[1px] bg-amber-50" />
                </FadeAnimation>
                <FadeAnimation>
                  <div className="font-bold text-2xl leading-5">23</div>
                  <div className="text-sm font-bold">2025</div>
                </FadeAnimation>
                <FadeAnimation type="right" className="flex-1" delay={.5}>
                  <div className="flex-1 h-[1px] bg-amber-50" />
                    <div className="text-md uppercase text-left mt-1 mb-1">
                      September
                    </div>
                  <div className="flex-1 h-[1px] bg-amber-50" />
                </FadeAnimation>
              </div>

              <div className={`flex ${prSerif.className} mt-10 items-center justify-evenly gap-3`}>
                <FadeAnimation type="left" delay={.5} className="flex-1">
                  <div className="text-2xl mb-5">AKAD</div>
                  <div className="text-sm">08.00 - 10.00</div>
                </FadeAnimation>
                <FadeAnimation type="up" className="w-[1.5px] h-20 bg-amber-50" >
                  <div/>
                </FadeAnimation>
                <FadeAnimation type="right" delay={.5} className="flex-1">
                  <div className="text-2xl mb-5">RESEPSI</div>
                  <div className="text-sm">12.00 - Selesai</div>
                </FadeAnimation>
              </div>

              <FadeAnimation type="up" className={`${prSerif.className} mt-10 flex flex-col gap-5`}>
                <div>Lokasi</div>
                <div>Dsn Pukiran, Ngalian, Wadaslintang, Wonosoobo</div>
                <Link
                  href='https://maps.app.goo.gl/h7X1Ukbkh9WZyvJ68'
                  target="_blank"
                  className="cursor-pointer border pt-1 pl-5 pr-5 pb-1 text-md self-center shadow-sm shadow-[rgba(0,0,0,.5)] flex gap-2 items-center">
                  <MapPinIcon color="white" size={20} /> Google Maps
                </Link>
              </FadeAnimation>

            </div>
          </div>
        </section>

        <section className="mt-10">
          <FadeAnimation type="up">
            <Image
              src='/photo-6.jpeg'
              alt="prewed"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-[300px] object-cover mb-10"
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
                src='/photo-1.jpeg'
                alt="prewed"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[120px] object-cover"
              />
            </FadeAnimation>
            <FadeAnimation type="up">
              <Image
                src='/17.jpeg'
                alt="prewed"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[120px] object-cover"
              />
            </FadeAnimation>
            <FadeAnimation type="up">
              <Image
                src='/photo-4.jpeg'
                alt="prewed"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[120px] object-cover"
              />
            </FadeAnimation>
          </div>
          <div className="grid grid-cols-4 gap-1 justify-center mt-8">
            <FadeAnimation type="up" className="col-span-2">
              <Image
                src='/15.jpeg'
                alt="prewed"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-cover contrast-130 brightness-80"
              />
            </FadeAnimation>
            <FadeAnimation type="up" className="col-span-2">
              <Image
                src='/photo-13.jpeg'
                alt="prewed"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-cover"
              />
            </FadeAnimation>
            <FadeAnimation type="up" className="col-span-2">
              <Image
                src='/photo-14.jpeg'
                alt="prewed"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-cover"
              />
            </FadeAnimation>
            <FadeAnimation type="up" className="col-span-2">
              <Image
                src='/photo-3.jpeg'
                alt="prewed"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-cover"
              />
            </FadeAnimation>
            <FadeAnimation type="up" className="col-span-1">
              <Image
                src='/18.jpeg'
                alt="prewed"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[200px] object-cover"
              />
              </FadeAnimation>
            <FadeAnimation type="up" className="w-full h-[200px] overflow-hidden col-span-3">
              <Image
                src='/16.jpeg'
                alt="prewed"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[200px] object-cover contrast-130 scale-120 rotate-[-1.7deg]"
              />
            </FadeAnimation>
            <FadeAnimation type="up" className="row-span-2 col-span-2">
              <Image
                src='/photo-10.jpeg'
                alt="prewed"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[405px] object-cover"
              />
            </FadeAnimation>
            <FadeAnimation type="up" className="col-span-2">
              <Image
                src='/photo-8.jpeg'
                alt="prewed"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[200px] object-cover grayscale-100"
              />
            </FadeAnimation>
            <FadeAnimation type="up" className="col-span-2">
              <Image
                src='/photo-9.jpeg'
                alt="prewed"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[200px] object-cover"
              />
            </FadeAnimation>
            <FadeAnimation type="up" className="col-span-4">
              <Image
                src='/photo-12.jpeg'
                alt="prewed"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-[300px] object-cover [object-position:center_50%]"
              />
            </FadeAnimation>
          </div>
        </section>
        
        <Suspense>
          <Rsvp />
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
              <div className="text-left px-3 py-3">
                <div>Ingka Fahira</div>
                <button
                  onClick={() => handleCopy('8545722492')}
                  className="cursor-pointer flex items-center gap-2 mt-2">
                  <CopyIcon /> 8545722492
                </button>
              </div>
            </div>
            <div className="flex border backdrop-blur-xs mt-3 rounded overflow-hidden">
              <Image
                src='/seabank.png'
                alt="seabank"
                width={80}
                height={80}
                className="bg-white"
              />
              <div className="backdrop-blur-xs text-left px-3 py-3">
                <div>Tri Fajar Pangestu</div>
                <button
                  onClick={() => handleCopy('901909801341')}
                  className="cursor-pointer flex items-center gap-2 mt-2">
                  <CopyIcon /> 901909801341
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
              <div className="backdrop-blur-xs text-left px-3 py-3">
                <div>Tri Fajar Pangestu</div>
                <button
                  onClick={() => handleCopy('089526651616')}
                  className="cursor-pointer flex items-center gap-2 mt-2">
                  <CopyIcon /> 089526651616
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
            Fajar <span className={`${mld.className} text-6xl`}>&</span> Ingka
          </div>
          <div className={`${prSerif.className} text-md`}>
            Thankyou
            <div className={`${tangerine.className} text-center text-3xl mt-2`}>
              Wassalamualaikum Wr. Wb.
            </div>
          </div>
        </section>

      </div>

      <div className="fixed bottom-0 right-0 m-4 z-50 text-4xl opacity-80" onClick={handlePlayPause}>
        {playing ? <PauseCircleIcon /> : <PlayCircleIcon />}
      </div>
    </div>
  );
}
