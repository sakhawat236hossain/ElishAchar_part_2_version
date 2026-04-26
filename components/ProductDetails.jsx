import Image from "next/image";

export default function ProductDetails({ onOrderClick }) {
  return (
    // Hero সেকশনের মতো একই গ্রেডিয়েন্ট ব্যাকগ্রাউন্ড দেওয়া হয়েছে
    <section className="w-full py-16 px-4 md:px-8 bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto">
        {/* মেইন কার্ডটি এখন আরও সুন্দর শ্যাডো ও প্যাডিং যুক্ত */}
        <div className=" p-8 md:p-12 rounded-3xl shadow-xl shadow-green-100/50 border border-green-50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* বাম পাশের কন্টেন্ট */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                ইলিশ মাছের আচার
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                বাংলার ঐতিহ্য আর ঘ্রাণের অনন্য সংমিশ্রণ – পরিচয় করিয়ে দিচ্ছি
                "ইলিশ মাছের আচার"। শতভাগ দেশি উপকরণ আর ঘরের রান্নার স্বাদে
                প্রস্তুত এই আচার আপনাকে ফিরিয়ে নিয়ে যাবে মায়ের হাতের সেই
                পুরনো দিনে।
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🔒</span>
                  <span className="text-gray-700 font-medium">
                    ১০০% হাইজেনিক ও নিরাপদ
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">🏠</span>
                  <span className="text-gray-700 font-medium">
                    হোমমেড রেসিপি
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">✨</span>
                  <span className="text-gray-700 font-medium">
                    প্রিজারভেটিভ মুক্ত
                  </span>
                </div>
              </div>

              {/* প্রাইসিং সেকশন */}
              <div className="flex items-center gap-6 pt-6">
                <div className="text-left">
                  <p className="text-sm text-gray-500 uppercase tracking-wide">
                    মূল্য
                  </p>
                  <p className="text-3xl font-bold text-green-700">৳১০০০</p>
                </div>
                <div className="h-10 w-[1px] bg-gray-300"></div>
                <div className="text-left">
                  <p className="text-sm text-gray-500 uppercase tracking-wide">
                    পরিমাণ
                  </p>
                  <p className="text-xl font-semibold text-gray-800">
                    ৫০০ গ্রাম
                  </p>
                </div>
              </div>
            </div>

            {/* ডান পাশের ইমেজ কার্ড */}
            <div className="flex justify-center items-center">
              <div className="relative w-full max-w-sm aspect-square bg-white rounded-3xl shadow-2xl p-4 transition-all duration-500 hover:shadow-green-200/50 border border-slate-100 flex flex-col justify-center items-center">
                {/* প্রিমিয়াম ব্যাজ */}
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold shadow-lg transform rotate-6 z-10">
                  Premium
                </div>

                {/* ইমেজ কন্টেইনার */}
                <div className="relative w-full h-full overflow-hidden rounded-2xl flex items-center justify-center">
                  <Image
                    src="/hero2.png"
                    alt="Product Image"
                    width={300}
                    height={300}
                    className="object-contain transition-transform duration-700 hover:scale-110"
                  />
                </div>

                <div className="mt-4 text-center">
                  <p className="text-gray-800 font-bold text-lg">
                    প্রিমিয়াম প্যাকেজ
                  </p>
                  <p className="text-green-600 font-medium text-sm">
                    সেরা কোয়ালিটির নিশ্চয়তা
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* অর্ডার বাটন */}
          <div className="text-center mt-12">
            <a
              href="#products"
              className="w-full md:w-auto px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-200 transition-all duration-300 hover:-translate-y-1 active:scale-95 inline-block text-center cursor-pointer"
            >
              অর্ডার করুন এখনই
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
