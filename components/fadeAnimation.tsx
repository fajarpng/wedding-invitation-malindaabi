'use client'

import { motion } from "framer-motion";
import React from "react";

type FadeSlideProps = {
  type?: "fade" | "left" | "right" | "up" | "down";
  duration?: number;
  delay?: number;
  children: React.ReactNode;
  className?: string;
};

const variants = {
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  left: { hidden: { opacity: 0, x: -35 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 35 }, visible: { opacity: 1, x: 0 } },
  up: { hidden: { opacity: 0, y: 35 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -35 }, visible: { opacity: 1, y: 0 } },
};

const FadeSlide: React.FC<FadeSlideProps> = ({
  type = "fade",
  duration = 1,
  delay = 0.3,
  children,
  className,
}) => {
  return (
    <div className={className+ " overflow-hidden "}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={variants[type]}
        transition={{ duration, delay, ease: "easeOut" }}
        
      >
        {children}
      </motion.div>
    </div>
  );
};

export default FadeSlide;
