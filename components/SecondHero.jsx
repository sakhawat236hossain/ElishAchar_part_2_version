import Image from 'next/image';

export default function SecondHero({ onOrderClick }) {
	return (
		<section className="w-full py-16 md:py-24 px-4 md:px-8 bg-gray-900 overflow-hidden">
			<div className="max-w-6xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Left Content */}
					<div className="text-white space-y-8">
						{/* Halal Badge */}
						<div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">
							<span className="text-xl">✅</span>
							<span className="font-medium">শতভাগ হালাল ও বিশুদ্ধ</span>
						</div>

						<div className="space-y-4">
							<h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
								গরুর মাংসের <br className="hidden md:block" />
								<span className="text-green-500">ঝুরা আচার</span>
							</h1>
							<p className="text-gray-300 text-lg leading-relaxed max-w-md">
								দেশি মসলায় নিখুঁতভাবে তৈরি। প্রতিটি কামড়ে পাবেন খাঁটি গরুর মাংসের স্বাদ এবং আচারের অনন্য ঘ্রাণ। আপনার খাবারের টেবিলকে করুন আরও উৎসবমুখর।
							</p>
						</div>

						{/* Price & Quantity Grid */}
						<div className="flex gap-4">
							<div className="bg-white/5 border border-white/10 p-5 rounded-2xl min-w-[120px]">
								<p className="text-gray-400 text-sm mb-1">পরিমাণ</p>
								<p className="text-xl font-bold">৫০০ গ্রাম</p>
							</div>
							<div className="bg-green-600/20 border border-green-600/50 p-5 rounded-2xl min-w-[120px]">
								<p className="text-green-400 text-sm mb-1">মূল্য</p>
								<p className="text-xl font-bold">৳৮০০</p>
							</div>
						</div>

						<a
							href="#best-selling"
							className="px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl shadow-lg shadow-green-900/50 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg"
						>
							অর্ডার করুন এখনই
						</a>
					</div>

					{/* Right Image */}
					<div className="relative w-full aspect-[4/5] md:aspect-square lg:max-w-md mx-auto">
						<div className="absolute inset-0 bg-gradient-to-tr from-green-500 to-transparent rounded-3xl opacity-20 blur-2xl"></div>
						<div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
							<Image src="/goru.jpg" alt="Gorur Mangsher Jhura Achhar" fill className="object-cover transition-transform duration-700 hover:scale-110" />
							{/* Overlay Gradient */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
							<div className="absolute bottom-6 left-6">
								<p className="text-white font-bold text-xl">প্রিমিয়াম ঝুরা আচার</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
