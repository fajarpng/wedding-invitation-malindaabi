'use client'

import { CircleWavyCheckIcon, PaperPlaneRightIcon, SealQuestionIcon, XCircleIcon } from "@phosphor-icons/react";
import { PT_Serif } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const prSerif = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
});

type MessageType = {
  _id?: number
  message: string
  sender: string
  presence: string
}

export default function Rsvp() {
  const search = useSearchParams();
  const guest = search.get('to') || '';
    
  const [message, setMessage] = useState<MessageType[]>([]);
  const [body, setBody] = useState<MessageType>({message: '', sender: guest, presence: ''});
  
  const fetchMessage = async () => {
    await fetch("/api")
      .then((res) => res.json())
      .then((data) => {setMessage(data)})
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchMessage()
  }, [])
  
  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!body.message) return
    const data = {...body}
    if (!data.presence) data.presence = 'Masih Ragu'
    if (!data.sender) data.sender = 'Guest'
    await fetch("/api", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(() => {
        fetchMessage()
        setBody({message: '', sender: '', presence: ''})
      })
      .catch(error => console.log(error))
  }

  return (
    <section className={`${prSerif.className} p-1 mt-10`}>
      <div className='text-center relative'>
        <div className="text-4xl">UCAPAN</div>
        <div className="opacity-40 text-7xl mt-[-55px] mb-5">RSVP</div>
        <div>Please, fill confirmation of attendance below.</div>
      </div>
      <form onSubmit={handleSend} className="py-10 flex flex-col gap-3">
        <input
          className="border backdrop-blur-xs py-2 px-4 outline-0 w-full placeholder:text-white"
          placeholder="nama"
          value={body.sender}
          onChange={e => setBody(p => ({...p, sender: e.target.value }))}
        />
        <textarea
          className="border backdrop-blur-xs py-2 px-4 outline-0 w-full placeholder:text-white"
          placeholder="harapan anda ..."
          value={body.message}
          onChange={e => setBody(p => ({...p, message: e.target.value }))}
          rows={4}
        />
        <select
          className="border backdrop-blur-sm py-2 px-4 outline-0 w-full appearance-none"
          value={body.presence}
          onChange={e => setBody(p => ({...p, presence: e.target.value }))}
        >
          <option value="" disabled hidden>
            konfirmasi kehadiran
          </option>
          <option value="hadir" className="text-black">Hadir</option>
          <option value="tidak" className="text-black">Tidak Hadir</option>
          <option value="ragu" className="text-black">Masih Ragu</option>
        </select>
        <button
          type="submit"
          className="border cursor-pointer mt-5 pt-1 pl-5 pr-5 pb-1 text-md self-center flex gap-2 items-center shadow-sm shadow-[rgba(0,0,0,.5)] ">
          <PaperPlaneRightIcon color="white" size={20} /> Submit
        </button>
      </form>
      
      <div className="flex flex-col gap-2">
        <div className="border-t-1"/>
        {message.map(v => (
          <div key={v?._id} className="py-2 px-5 border backdrop-blur-xs rounded-xl">
            <div className="font-bold flex gap-3">
              {v.sender}
              {v.presence === 'hadir' && (
                <span className="font-light text-sm flex items-center gap-1"><CircleWavyCheckIcon /> hadir</span>
              )}
              {v.presence === 'tidak' && (
                <span className="font-light text-sm flex items-center gap-1"><XCircleIcon /> tidak hadir</span>
              )}
              {v.presence === 'ragu' && (
                <span className="font-light text-sm flex items-center gap-1"><SealQuestionIcon /> masih ragu</span>
              )}
            </div>
            <div className="ml-5 mt-1">{v.message}</div>
          </div>
        ))}
        <div className="border-t-1"/>
      </div>
    </section>
  );
}
