import Image from 'next/image';

export default function ProductDetails({ onOrderClick }) {
	return (
		<section className="w-full py-12 md:py-16 px-4 md:px-8 bg-white">
			<div className="max-w-6xl mx-auto">
				<div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 md:p-12 rounded-xl shadow-md">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Left Content */}
						<div>
							<h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">ইলিশ মাছের আচার</h2>
							<p className="text-gray-700 leading-relaxed mb-6">
								বাংলার ঐতিহ্য আর ঘ্রাণের অনন্য সংমিশ্রণ – পরিচয় করিয়ে দিচ্ছি "ইলিশ মাছের আচার"। শতভাগ দেশি উপকরণ আর ঘরের রান্নার স্বাদে প্রস্তুত এই আচার আপনাকে ফিরিয়ে নিয়ে যাবে
								মায়ের হাতের রান্নায়।
							</p>

							<div className="space-y-3 mb-8">
								<div className="flex items-center gap-3">
									<span className="text-lg">🔒</span>
									<span className="text-gray-700">১০০% হাইজেনিক ও নিরাপদ</span>
								</div>
								<div className="flex items-center gap-3">
									<span className="text-lg">🏠</span>
									<span className="text-gray-700">হোমমেড রেসিপি</span>
								</div>
								<div className="flex items-center gap-3">
									<span className="text-lg">✨</span>
									<span className="text-gray-700">প্রিজারভেটিভ মুক্ত</span>
								</div>
							</div>

							<div className="flex flex-col sm:flex-row gap-4">
								<div className="bg-white p-4 rounded-lg shadow flex-1">
									<p className="text-sm text-gray-600">পরিমাণ</p>
									<p className="text-2xl font-bold text-green-600">৫০০ গ্রাম</p>
								</div>
								<div className="bg-white p-4 rounded-lg shadow flex-1">
									<p className="text-sm text-gray-600">মূল্য</p>
									<p className="text-2xl font-bold text-green-600">৳১০০০</p>
								</div>
							</div>
						</div>

						{/* Right Image */}
						{/* Right Image/Package Section */}
						<div className="flex justify-center items-center p-4">
							<div className="group relative w-full max-w-xs h-80 bg-white border-2 border-green-50 rounded-3xl shadow-xl flex flex-col items-center justify-center transition-all duration-500 hover:-translate-y-2 hover:shadow-green-200/50">
								{/* Premium Badge */}
								<div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Premium</div>

								{/* Image container */}
								<div className="relative mb-6 transform transition-transform duration-500 group-hover:scale-110">
									<div className="absolute inset-0 bg-green-200 blur-2xl opacity-20 rounded-full"></div>
									<Image src="/hero2.png" alt="Product Image" width={220} height={220} className="relative z-10 drop-shadow-2xl h-auto" />
								</div>

								{/* Text */}
								<div className="text-center">
									<p className="text-gray-800 font-bold text-xl mb-1">প্রিমিয়াম প্যাকেজ</p>
									<p className="text-green-600 font-medium text-sm">সেরা কোয়ালিটির নিশ্চয়তা</p>
								</div>
							</div>
						</div>
					</div>

					<div className="text-center mt-8">
						<a
							href="#best-selling"
							className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 inline-block"
						>
							অর্ডার করুন এখনই
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
