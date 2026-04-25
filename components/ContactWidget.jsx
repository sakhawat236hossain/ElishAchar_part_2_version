"use client"; // Next.js এ ব্যবহার করলে এটি অবশ্যই লাগবে
import { useState } from 'react';

export default function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-3">
      {isOpen && (
        <div className="flex flex-col gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/*     */}
          {/* WhatsApp */}
<a
  href="https://wa.me/8801XXXXXXXXX"
  target="_blank"
  rel="noopener noreferrer"
  className="w-14 h-14 shadow-2xl rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform overflow-hidden bg-green-500"
>
  <img src="https://img.icons8.com/?size=100&id=A1JUR9NRH7sC&format=png&color=000000" alt="WhatsApp" className="w-8 h-8" />
</a>
            
          
          {/* Phone Call */}
          <a
            href="tel:+8801851121472" 
            className="w-14 h-14 cursor-pointer  rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform text-white text-2xl bg-blue-500"
          >
            <img src="https://img.icons8.com/?size=100&id=9729&format=png&color=000000" alt="Phone" className="w-8 h-8" />
          </a>
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 cursor-pointer bg-gray-100 rounded-full flex items-center justify-center shadow-2xl hover:bg-gray-200 transition-all duration-300 text-white text-3xl"
      >
        {isOpen ? <img  src="https://img.icons8.com/?size=100&id=11997&format=png&color=000000" alt="Close" className="w-8 h-8" /> : <img src="https://img.icons8.com/?size=100&id=hByk2bcP4aZ5&format=png&color=000000" alt="Contact" className="w-8 h-8" />}
      </button>
    </div>
  );
}