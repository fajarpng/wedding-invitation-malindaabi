'use client'

import { Cormorant_SC, Monsieur_La_Doulaise, Comic_Neue } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cormorant = Cormorant_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const mld = Monsieur_La_Doulaise({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // const audioRef = useRef<HTMLAudioElement>(null);
  const searh = useSearchParams();
  const guest = searh.get('to') || 'Tamu Undangan';
  const [opened, setOpened] = useState(false);
  // const [playing, setPlaying] = useState(true);

  const openInvitation = () => {
    setOpened(true);
    videoRef.current?.play();
  };

  // const handlePlayPause = () => {
  //   setPlaying(p => !p)
  //   if (playing) {
  //     audioRef.current?.pause();
  //   } else
  //   audioRef.current?.play();
  // }

  return (
    <div className="min-h-dvh text-white md:max-w-[500px] ">
      {/* Background video fixed */}
      <div className="fixed top-0 left-0 w-full h-dvh -z-10">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-dvh object-cover brightness-75"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        {/* <audio
          ref={audioRef}
          src='https://ulemanti.id/wp-content/uploads/2025/03/Billie-Eilish-Birds-of-a-Feather-Acoustic-Cover-by-Conner-Moye.mp3'
          loop
          autoPlay
        /> */}
      </div>

      {/* <div className="absolute bottom-0 right-0" onClick={handlePlayPause}>
        {playing ? 'pause' : 'play'}
      </div> */}

      {/* Overlay open screen */}
      <AnimatePresence>
        {!opened &&
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 bg-black flex flex-col justify-center items-center gap-2 z-10 h-dvh"
            style={{ backgroundImage: "url('/bg-1.jpg')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className={`${comicNeue.className} mb-2`}>The Wedding of</div>
            <div className={`${cormorant.className} mb-2 text-4xl`}>
              Fajar <span className={`${mld.className} text-6xl`}>&</span> Ingka
            </div>
            <div className={`${comicNeue.className} mb-8`}>23 September 2025</div>
            <div className={`${comicNeue.className}`}>Dear ,</div>
            <div className={`${comicNeue.className} font-bold text-xl`}>{guest}</div>
            <button
              onClick={openInvitation}
              className="bg-transparent border-2 border-white px-7 py-2.5 rounded-xl mt-10"
            >
              <div className={`${comicNeue.className} font-bold text-md`}>
                Buka undangan
              </div>
            </button>
          </motion.div>
        }
      </AnimatePresence>

      {/* Scrollable content */}
      <div className="z-0 p-4">
        <section className="h-dvh flex flex-col justify-end pb-30">
          <div className={`${cormorant.className} text-4xl mb-2 text-right mr-7`}>
            Fajar <span className={`${mld.className} text-6xl`}>&</span> Ingka
          </div>
          <div className="flex items-center gap-10 mr-10">
            <div className="flex-1 h-[1px] bg-amber-50" />
            <span className={`${comicNeue.className}`}>
              23/09/25
            </span>
          </div>
        </section>

        <section className="h-dvh flex flex-col justify-center items-center">
          <div className="w-[300px] h-[200px] text-center pt-5 border-2 border-white">
            <div className={`${cormorant.className} font-bold text-md`}>
              countdown
            </div>
          </div>
        </section>

        <section className="min-h-dvh pt-50 pb-45 text-center flex flex-col justify-between">
          <div className={`${comicNeue.className} font-bold text-md`}>
            See You On Our Special Day
          </div>
          <div className={`${cormorant.className} text-4xl mb-2 mt-0`}>
            Fajar <span className={`${mld.className} text-6xl`}>&</span> Ingka
          </div>
          <div className={`${comicNeue.className} font-bold text-xl`}>
            Thankyou
          </div>
        </section>

      </div>
    </div>
  );
}
