import Image from 'next/image';
import { motion } from "framer-motion";

export default function Packaging({ onOrderClick }) {
	const packagingDetails = [
		{
			icon: '⚖️',
			title: 'পরিমাণ',
			text: '৫০০ গ্রাম - ১ কেজি (আপনার প্রয়োজন অনুযায়ী)',
			color: 'green',
		},
		{
			icon: '🛡️',
			title: 'প্যাকেজিং মান',
			text: 'ফুড-গ্রেড জারে ভ্যাকুয়াম প্যাক করা হয় যা সম্পূর্ণ নিরাপদ, স্বাস্থ্যকর এবং লিক-প্রুফ।',
			color: 'green',
		},
		{
			icon: '⏳',
			title: 'সংরক্ষণ মেয়াদ',
			text: '৬ মাস পর্যন্ত সংরক্ষণযোগ্য (সরাসরি সূর্যালোক থেকে দূরে, ঠান্ডা ও শুষ্ক স্থানে)',
			color: 'green',
		},
		{
			icon: '🚚',
			title: 'ডেলিভারি',
			text: 'সারা বাংলাদেশে দ্রুত ও নিরাপদ হোম ডেলিভারি - আপনার দোরগোড়ায় ইনশাআল্লাহ।',
			color: 'blue',
		},
	];

	return (
    <section className="w-full py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            📦 প্যাকেজিং ও পরিমাণ
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            আমরা নিশ্চিত করি প্রতিটি জার সর্বোচ্চ স্বাস্থ্যের নিয়ম মেনে এবং
            যত্ন সহকারে প্যাক করা হয়।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Image Section - Fixed Layout */}
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-green-100 group border-4 border-white">
              {/* Image Container */}
              <Image
                src="/elish.png"
                alt="Packaging Image"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay Gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

              {/* Content on Image */}
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-bold text-2xl">প্রিমিয়াম কোয়ালিটি</p>
                <p className="text-sm opacity-90">সুরক্ষিত কাঁচের জারে</p>
              </div>
            </div>
          </div>

          {/* Right Information Section */}
          <div className="space-y-4">
            {packagingDetails.map((detail, index) => (
              <div
                key={index}
                className={`flex gap-4 items-start p-5 rounded-2xl transition-all duration-300 border border-transparent hover:border-green-100 ${
                  detail.color === "blue"
                    ? "bg-white shadow-sm hover:shadow-md"
                    : "bg-white shadow-sm hover:shadow-md"
                }`}
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-inner ${
                    detail.color === "blue"
                      ? "bg-blue-50 text-blue-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {detail.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-lg">
                    {detail.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {detail.text}
                  </p>
                </div>
              </div>
            ))}

            {/* Order Button */}
            {/* <div className="mt-8">
							<a
								href="#best-selling"
								className="w-full block text-center py-4 cursor-pointer bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-200 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 text-lg"
							>
								অর্ডার করুন এখনই
							</a>
						</div> */}
            <motion.a
              href="#best-selling"
              initial={{ x: 0 }}
              animate={{
                x: [0, -4, 4, -4, 4, 0],
              }}
              transition={{
                duration: 0.4,
                repeat: 9,
                repeatType: "loop",
                ease: "easeInOut",
                delay: 0.5,
              }}
              whileHover={{
                x: [0, -4, 4, -4, 4, 0],
                transition: { repeat: Infinity },
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full block text-center py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-200 text-lg cursor-pointer"
            >
              অর্ডার করুন এখনই
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
