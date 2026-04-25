'use client';

import { useState } from 'react';
import { useCartStore } from '../app/store/cardStore';

const SHIPPING = 50;

export default function Products() {
	const [loading] = useState(false);
	const { items: products, increment, decrement, removeItem } = useCartStore();

	const [error] = useState(null);
	const [visibleCount, setVisibleCount] = useState(4);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		address: '',
		paymentMethod: 'Cash on Delivery',
		note: '',
	});

	const [orderPlaced, setOrderPlaced] = useState(false);
	const [placedOrder, setPlacedOrder] = useState(null);

	// পিডিএফ জেনারেট করার ফাংশন
	const handleDownloadInvoice = async () => {
		if (!placedOrder) return;

		const { jsPDF } = await import('jspdf/dist/jspdf.umd.min.js');
		const { default: autoTable } = await import('jspdf-autotable');

		const doc = new jsPDF();

		// ১. হেডার
		doc.setFillColor(22, 163, 74);
		doc.rect(0, 0, 210, 30, 'F');
		doc.setTextColor(255, 255, 255);
		doc.setFontSize(22);
		doc.text('ALESHA BAZAR', 14, 20);
		doc.setTextColor(0, 0, 0);

		// ২. অর্ডার ইনফরমেশন
		doc.setFont('helvetica', 'normal');
		doc.setFontSize(10);
		doc.text(`Order ID: #${placedOrder.orderId}`, 14, 40);
		doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 45);
		doc.text(`Customer Name: ${placedOrder.customer.name}`, 14, 50);
		doc.text(`Phone: ${placedOrder.customer.phone}`, 14, 55);
		doc.text(`Address: ${placedOrder.customer.address}`, 14, 60);

		// ৩. প্রোডাক্ট টেবিল
		const invoiceProducts = Array.isArray(placedOrder.products) ? placedOrder.products : [];
		const computedProducts = invoiceProducts.map((p) => ({
			name: p.name || 'Unknown',
			quantity: Number(p.quantity) || 1,
			price: Number(p.price) || 0,
		}));
		const computedSubtotal = computedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);
		const invoiceSubtotal = Number(placedOrder.subtotal) || computedSubtotal;
		const invoiceTotal = Number(placedOrder.total) || invoiceSubtotal + SHIPPING;
		const tableColumn = ['Product Name', 'Qty', 'Price', 'Subtotal'];
		const tableRows = computedProducts.map((p) => [
			p.name,
			p.quantity,
			`Tk ${p.price.toFixed(2)}`,
			`Tk ${(p.price * p.quantity).toFixed(2)}`,
		]);

		autoTable(doc, {
			head: [tableColumn],
			body: tableRows,
			startY: 70,
			headStyles: { fillColor: [22, 163, 74] },
			styles: { font: 'helvetica', fontSize: 11 },
			theme: 'striped',
			margin: { left: 14, right: 14 },
		});

		// ৪. টোটাল সেকশন
		const finalY = (doc.lastAutoTable?.finalY || 70) + 12;
		doc.setFontSize(11);
		doc.setFont('helvetica', 'normal');
		const totalX = 195;
		doc.text(`Subtotal: Tk ${invoiceSubtotal.toFixed(2)}`, totalX, finalY, { align: 'right' });
		doc.text(`Delivery Charge: Tk ${SHIPPING.toFixed(2)}`, totalX, finalY + 6, { align: 'right' });
		doc.setFont('helvetica', 'bold');
		doc.text(`Total Amount: Tk ${invoiceTotal.toFixed(2)}`, totalX, finalY + 12, { align: 'right' });

		// ৫. অতিরিক্ত সেকশন
		const infoY = finalY + 30;
		doc.setFont('helvetica', 'normal');
		doc.setFontSize(10);

		doc.setFont('helvetica', 'bold');
		doc.text('Payment Method:', 14, infoY);
		doc.setFont('helvetica', 'normal');
		doc.text('Cash on Delivery (COD) - Please pay the delivery man upon receiving the product.', 14, infoY + 7);

		doc.setFont('helvetica', 'bold');
		doc.text('Return & Refund Policy:', 14, infoY + 20);
		doc.setFont('helvetica', 'normal');
		doc.text('- Returns are accepted within 7 days if the product is damaged.', 14, infoY + 27);
		doc.text('- This order was placed successfully without any advance payment.', 14, infoY + 32);

		doc.setFont('helvetica', 'bold');
		doc.text('Need Help? Contact Us:', 14, infoY + 45);
		doc.setFont('helvetica', 'normal');
		doc.text('Hotline: 01851121472', 14, infoY + 52);
		doc.text('Email: support@aleshabazar.com', 14, infoY + 57);
		doc.text('Website: www.aleshabazar.com', 14, infoY + 62);

		doc.setDrawColor(22, 163, 74);
		doc.line(14, infoY + 75, 195, infoY + 75);
		doc.text('Thank you for shopping with Alesha Bazar!', 14, infoY + 82);

		doc.save(`Invoice_${placedOrder.orderId}.pdf`);
	};

	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// quantity দিয়ে subtotal হিসাব
	const subtotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
	const total = subtotal + SHIPPING;

	// অর্ডার সাবমিট লজিক
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (products.length === 0) return alert('কার্টে কোনো পণ্য নেই');

		setIsSubmitting(true);

		const orderData = {
			customer: formData,
			products: products.map((p) => ({
				_id: p._id,
				name: p.name,
				price: p.price,
				quantity: p.quantity,
				image: p.image,
				description: p.description,
			})),
			subtotal,
			total,
			orderDate: new Date().toISOString(),
		};

		try {
			const response = await fetch('/api/orders/post', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(orderData),
			});
			const result = await response.json();

			if (result.success) {
				setPlacedOrder({ ...orderData, orderId: result.orderId });
				setOrderPlaced(true);
			} else {
				alert('অর্ডার সফল হয়নি, আবার চেষ্টা করুন।');
			}
		} catch (error) {
			alert('সার্ভার এরর, পরে চেষ্টা করুন।');
		} finally {
			setIsSubmitting(false);
		}
	};

	if (loading) return <div className="text-center py-20 text-lg">পণ্য লোড হচ্ছে...</div>;

	if (error)
		return (
			<div className="text-center py-20">
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg inline-block">
					<p className="font-semibold">{error}</p>
				</div>
			</div>
		);

	if (products.length === 0)
		return (
			<div className="text-center py-20">
				<p className="text-lg text-gray-600">এই মুহূর্তে কোন পণ্য উপলব্ধ নেই</p>
			</div>
		);

	return (
		<section className="py-16 px-4 bg-white" id='products'>
			<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
				{/* বাম পাশ - প্রোডাক্ট লিস্ট */}
				<div className="overflow-y-hidden">
					<h2 className="text-3xl font-bold mb-8">আমাদের সকল পণ্য</h2>
					<div className="space-y-4">
						{products?.slice(0, visibleCount).map((product) => (
							<div
								key={product._id}
								className="flex gap-4 p-4 border-2 border-gray-200 rounded-xl transition-all hover:border-green-400 hover:bg-green-50"
							>
								<img
									src={product.image || '/placeholder.jpg'}
									alt={product.name}
									className="w-20 h-20 rounded-lg object-cover"
								/>
								<div className="flex-1">
									<h4 className="font-bold text-lg">{product.name}</h4>
									<p className="text-gray-500 text-sm">{product.description}</p>
									<p className="font-bold text-green-700 mt-1">৳{product.price}</p>
								</div>

								{/* Increment / Decrement / Remove কন্ট্রোলস */}
								<div className="flex flex-col items-center justify-center gap-2">
									<div className="flex items-center gap-2">
										<button
											onClick={() => decrement(product._id)}
											disabled={product.quantity <= 1}
											className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 font-bold text-lg disabled:opacity-40 disabled:cursor-not-allowed transition"
											aria-label="কমান"
										>
											−
										</button>
										<span className="w-8 text-center font-bold text-base">{product.quantity}</span>
										<button
											onClick={() => increment(product._id)}
											className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 font-bold text-lg transition"
											aria-label="বাড়ান"
										>
											+
										</button>
									</div>
									<button
										onClick={() => removeItem(product._id)}
										className="text-xs text-red-500 hover:text-red-700 font-semibold transition"
										aria-label="সরান"
									>
										🗑 সরান
									</button>
								</div>
							</div>
						))}
					</div>

					{visibleCount < products.length && (
						<button
							onClick={() => setVisibleCount(visibleCount + 4)}
							className="mt-6 w-full py-3 bg-gray-100 font-bold rounded-lg hover:bg-gray-200"
						>
							আরও দেখুন
						</button>
					)}
				</div>

				{/* ডান পাশ - অর্ডার সামারি এবং ফর্ম */}
				<div className="space-y-6">
					{orderPlaced ? (
						<div className="bg-green-100 p-8 rounded-xl text-center border-2 border-green-500">
							<h3 className="text-2xl font-bold text-green-800 mb-2">অভিনন্দন!</h3>
							<p className="text-green-700">আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।</p>

							<button
								onClick={handleDownloadInvoice}
								className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
							>
								📄 ইনভয়েস ডাউনলোড করুন
							</button>

							<button
								onClick={() => window.location.reload()}
								className="mt-4 w-full bg-gray-600 text-white py-3 rounded-lg font-bold hover:bg-gray-700 transition"
							>
								নতুন অর্ডার করুন
							</button>
						</div>
					) : (
						<>
							<div className="bg-green-50 p-6 rounded-xl border border-green-200">
								<h3 className="text-xl font-bold mb-4">অর্ডার সামারি</h3>
								{products.map((p) => (
									<div key={p._id} className="flex justify-between py-1 text-sm">
										<span>
											{p.name}{' '}
											<span className="text-gray-400">× {p.quantity}</span>
										</span>
										<span>৳{p.price * p.quantity}</span>
									</div>
								))}
								<div className="border-t mt-3 pt-3 flex justify-between text-sm text-gray-500">
									<span>ডেলিভারি চার্জ</span>
									<span>৳{SHIPPING}</span>
								</div>
								<div className="border-t mt-3 pt-3 font-bold text-xl flex justify-between">
									<span>মোট:</span>
									<span>৳{total}</span>
								</div>
							</div>

							<form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-xl border space-y-4">
								<input name="name" onChange={handleFormChange} className="w-full p-3 rounded border" placeholder="আপনার নাম" required />
								<input name="phone" onChange={handleFormChange} className="w-full p-3 rounded border" placeholder="ফোন নাম্বার" required />
								<textarea name="address" onChange={handleFormChange} className="w-full p-3 rounded border" placeholder="আপনার ঠিকানা" required />

								<select name="paymentMethod" onChange={handleFormChange} className="w-full p-3 rounded border">
									<option value="Cash on Delivery">ক্যাশ অন ডেলিভারি (COD)</option>
									<option value="Bkash">বিকাশ (Bkash)</option>
								</select>
								<textarea name="note" onChange={handleFormChange} className="w-full p-3 rounded border" placeholder="অর্ডার নোট (ঐচ্ছিক)" />

								<button
									type="submit"
									disabled={isSubmitting}
									className={`w-full font-bold py-3 rounded-lg text-white ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
								>
									{isSubmitting ? 'অর্ডার করা হচ্ছে...' : 'অর্ডার করুন'}
								</button>
							</form>
						</>
					)}
				</div>
			</div>
		</section>
	);
}
