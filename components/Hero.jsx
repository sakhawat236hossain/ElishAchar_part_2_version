import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero({ onOrderClick }) {
  return (
    <section className="w-full py-16 px-4 md:px-8 bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Image Section */}
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-sm aspect-square bg-white rounded-3xl shadow-2xl p-4 transition-all duration-500 hover:shadow-green-200/50">
              <div className="relative w-full h-full overflow-hidden rounded-2xl">
                <Image
                  src="/hero.jpg"
                  fill
                  alt="ইলিশ মাছের আচার"
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              {/* Badge */}
              <div className="absolute -top-4 -right-4 bg-green-600 text-white px-4 py-2 rounded-full font-bold shadow-lg transform rotate-6">
                সেরা স্বাদ!
              </div>
            </div>
          </div>

          {/* Right Description */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full font-medium">
              <span>✅</span>
              <span className="text-sm uppercase tracking-wider">
                ১০০% হালাল ও ঘরোয়া
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              ঐতিহ্যের স্বাদে <br />
              <span className="text-green-600">ইলিশ মাছের আচার</span>
            </h1>

            <p className="text-gray-600 leading-relaxed text-lg">
              বাংলার ঐতিহ্য আর ঘ্রাণের অনন্য সংমিশ্রণ। শতভাগ দেশি উপকরণ আর ঘরের
              রান্নার স্বাদে প্রস্তুত এই আচার আপনাকে ফিরিয়ে নিয়ে যাবে মায়ের
              হাতের সেই পুরনো দিনে।
            </p>

            {/* Pricing Section */}
            <div className="flex items-center gap-6 py-4">
              <div className="text-left">
                <p className="text-sm text-gray-500 uppercase">দাম</p>
                <p className="text-3xl font-bold text-green-700">৳১০০০</p>
              </div>
              <div className="h-10 w-[1px] bg-gray-300"></div>
              <div className="text-left">
                <p className="text-sm text-gray-500 uppercase">পরিমাণ</p>
                <p className="text-xl font-semibold text-gray-800">৫০০ গ্রাম</p>
              </div>
            </div>
            {/* 
						<a
							// onClick={onOrderClick}
							href="#best-selling"
							className="w-full md:w-auto px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-200 transition-all duration-300 hover:-translate-y-1 active:scale-95"
						>
							অর্ডার করুন এখনই
						</a> */}
            <motion.a
              href="#products"
              initial={{ x: 0 }}
              animate={{
                x: [0, -4, 4, -4, 4, 0],
              }}
              transition={{
                duration: 0.4,
                repeat: 9,
                repeatType: "loop",
                ease: "linear",
                delay: 0.5,
              }}
              whileHover={{
                scale: 1.05,
                x: [0, -4, 4, -4, 4, 0],
                transition: { repeat: Infinity, duration: 0.4 },
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full md:w-auto px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-200 block md:inline-block text-center cursor-pointer"
            >
              অর্ডার করুন এখনই
            </motion.a>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-gray-200">
          {[
            { label: "সন্তুষ্ট গ্রাহক", value: "৩৫০০+" },
            { label: "পজিটিভ রিভিউ", value: "১৫০০+" },
            { label: "ডেলিভারি", value: "সারা দেশ" },
            { label: "মান নিয়ন্ত্রণ", value: "১০০%" },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <p className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                {stat.value}
              </p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
