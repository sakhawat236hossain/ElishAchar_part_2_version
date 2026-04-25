'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useCartStore } from '../app/store/cardStore';

// Swiper এর প্রয়োজনীয় স্টাইল ইমপোর্ট
import { toast } from 'react-toastify';
import 'swiper/css';
import 'swiper/css/navigation';

export default function BestSelling({ onOrderClick }) {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const addItem = useCartStore((state) => state.addItem);

	const handleProductClick = (product) => {
		addItem(product);
		toast.success('আপনার অর্ডারটি গ্রহণ করা হয়েছে!');
	};

	const handleOrderClick = (product) => {
		handleProductClick(product);
		// Smooth scroll to products section
		setTimeout(() => {
			const productsSection = document.getElementById('products');
			if (productsSection) {
				productsSection.scrollIntoView({ behavior: 'smooth' });
			}
		}, 300);
	};

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await fetch('/api/products/get');
				const result = await res.json();

				if (!res.ok) {
					throw new Error(result.error || 'API Error: ' + res.status);
				}

				if (result.success && result.data) {
					setProducts(result.data);
				} else {
					setError(result.error || 'প্রোডাক্ট ডাটা পাওয়া যায়নি');
				}
			} catch (err) {
				console.error('ডাটা ফেচ করতে সমস্যা হয়েছে', err);
				setError(err.message || 'প্রোডাক্ট লোড করতে সমস্যা হয়েছে। পরে চেষ্টা করুন।');
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

	if (loading)
		return (
			<section className="w-full py-12 px-4 md:px-8 bg-gray-50">
				<div className="max-w-7xl mx-auto flex justify-center items-center py-20">
					<div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600"></div>
				</div>
			</section>
		);

	if (error)
		return (
			<section className="w-full py-12 px-4 md:px-8 bg-gray-50">
				<div className="max-w-7xl mx-auto text-center py-20">
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg inline-block">
						<p className="font-semibold">{error}</p>
					</div>
				</div>
			</section>
		);

	if (products.length === 0)
		return (
			<section className="w-full py-12 px-4 md:px-8 bg-gray-50 flex flex-col items-center justify-center">
				<div className="max-w-7xl mx-auto text-center py-20 flex flex-col items-center gap-4">
					<h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">আমাদের বেস্ট সেলিং পণ্যসমূহ</h2>
					<p className="text-gray-600 text-center">এই মুহূর্তে কোন প্রোডাক্ট উপলব্ধ নেই</p>
				</div>
			</section>
		);

	return (
		<section className="w-full py-12 px-4 md:px-8 bg-gray-50" id="best-selling">
			<div className="max-w-7xl mx-auto">
				{/* হেডলাইন এবং নেভিগেশন বাটন */}
				<div className="flex flex-col items-center justify-between gap-6 mb-10 md:flex-row md:items-end">
					<div className="text-center md:text-left">
						<h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-2">আমাদের বেস্ট সেলিং পণ্যসমূহ</h2>
						<p className="text-gray-600 text-sm">সেরা স্বাদের নিশ্চয়তা</p>
					</div>

					{/* বাটনগুলো */}
					<div className="flex gap-2">
						<button className="prev-btn p-3 bg-white border border-gray-300 hover:bg-green-600 hover:text-white rounded-full transition-all duration-300 shadow-sm">&lt;</button>
						<button className="next-btn p-3 bg-white border border-gray-300 hover:bg-green-600 hover:text-white rounded-full transition-all duration-300 shadow-sm">&gt;</button>
					</div>
				</div>

				{/* Swiper Carousel */}
				<Swiper
					modules={[Navigation]}
					spaceBetween={24}
					speed={800}
					navigation={{
						prevEl: '.prev-btn',
						nextEl: '.next-btn',
					}}
					slidesPerView={1}
					slidesPerGroup={1} // একটি করে স্লাইড হবে
					breakpoints={{
						640: {
							slidesPerView: 2,
							slidesPerGroup: 1,
						},
						768: {
							slidesPerView: 3,
							slidesPerGroup: 1,
						},
						1024: {
							slidesPerView: 4,
							slidesPerGroup: 1, // একটি করে স্লাইড হবে
						},
					}}
					className="mySwiper"
				>
					{products.map((product) => (
						<SwiperSlide key={product._id} className="h-auto">
							<div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
								<div className="relative w-full aspect-[4/3] overflow-hidden">
									<Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
								</div>
								<div className="p-4">
									<h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
									<p className="text-gray-500 text-sm mb-4">{product.weight}</p>
									<p className="text-xl font-bold text-green-600 mb-4">৳{product.price}</p>
									<button
										onClick={() => handleOrderClick(product)}
										className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all duration-300 active:scale-95"
									>
										অর্ডার করুন
									</button>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}
