"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Tangerine } from "next/font/google";
import { useEffect, useState } from "react";

const mld = Tangerine({
  subsets: ["latin"],
  weight: '700',
});

export default function LoadingOverlay() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1300); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-150 flex flex-col gap-3 items-center justify-center bg-black/50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`${mld.className} text-8xl`}>IF</div>
          <div className="w-[170px] h-2 bg-black/50 rounded overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
