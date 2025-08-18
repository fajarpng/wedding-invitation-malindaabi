"use client";

import { PT_Serif } from "next/font/google";
import { useSearchParams } from "next/navigation";

const serif = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Guest() {
  const search = useSearchParams();
  const guest = search.get('to') || 'Tamu Undangan';

  return (
    <div className={`${serif.className} font-bold text-xl`}>{guest}</div>
  )
}