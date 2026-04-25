'use client';

import { useState, useEffect } from 'react';

// html2pdf will be imported dynamically

const products = [
  {
    id: 1,
    name: 'ইলিশ মাছের আচার',
    emoji: '🐟',
    price: 1000,
    quantity: '৫০০ গ্রাম',
  },
  {
    id: 2,
    name: 'গরুর মাংসের ঝুরা',
    emoji: '🥘',
    price: 800,
    quantity: '৫০০ গ্রাম',
  },
  {
    id: 3,
    name: 'মিশ্র সবজির আচার',
    emoji: '🥒',
    price: 600,
    quantity: '৫০০ গ্রাম',
  },
];

const SHIPPING = 50;

export default function Checkout({ onClose }) {
  const [selectedProducts, setSelectedProducts] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleProductChange = (productId) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const selectedProductsList = products.filter((p) => selectedProducts[p.id]);
  const subtotal = selectedProductsList.reduce((sum, p) => sum + p.price, 0);
  const total = subtotal + SHIPPING;

  const generateInvoiceFile = () => {
    const orderId = `ALB-${Date.now().toString().slice(-8)}`;
    const orderDate = new Date();

    // Create HTML content for invoice
    const htmlContent = `
<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>আলেশা বাজার ইনভয়েস</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: white; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; }
        h1 { text-align: center; color: #16a34a; margin: 0 0 5px 0; }
        .subtitle { text-align: center; color: #666; margin: 0 0 15px 0; font-size: 12px; }
        .order-id { background: #dcfce7; padding: 10px; text-align: center; margin-bottom: 20px; border-radius: 4px; color: #16a34a; font-weight: bold; }
        h3 { color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; font-size: 14px; }
        p { font-size: 12px; margin: 8px 0; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { padding: 10px; border: 1px solid #e5e7eb; font-size: 12px; }
        th { background: #f3f4f6; text-align: left; font-weight: bold; }
        td { text-align: left; }
        .amount { text-align: right; }
        .total-section { background: #f0fdf4; padding: 15px; margin: 15px 0; border-radius: 4px; border-left: 4px solid #22c55e; }
        .payment-section { background: #dbeafe; padding: 15px; margin: 15px 0; border-radius: 4px; border-left: 4px solid #3b82f6; }
        .footer { text-align: center; border-top: 1px solid #e5e7eb; padding-top: 15px; margin-top: 20px; font-size: 11px; color: #666; }
        @media print { body { margin: 0; padding: 0; } }
    </style>
</head>
<body>
    <div class="container">
        <h1>আলেশা বাজার</h1>
        <p class="subtitle">শতভাগ হালাল হোমমেড আচার সরবরাহকারী</p>
        <div class="order-id">অর্ডার আইডি: ${orderId}</div>

        <h3>অর্ডার বিবরণ</h3>
        <p><strong>তারিখ:</strong> ${orderDate.toLocaleDateString('bn-BD')}</p>
        <p><strong>সময়:</strong> ${orderDate.toLocaleTimeString('bn-BD')}</p>

        <h3>গ্রাহক তথ্য</h3>
        <p><strong>নাম:</strong> ${formData.name}</p>
        <p><strong>ফোন:</strong> ${formData.phone}</p>
        <p><strong>ঠিকানা:</strong> ${formData.address}</p>

        <h3>অর্ডারকৃত পণ্য</h3>
        <table>
            <thead>
                <tr><th>পণ্য</th><th class="amount">দাম</th></tr>
            </thead>
            <tbody>
                ${selectedProductsList.map((p) => `<tr><td>${p.emoji} ${p.name}</td><td class="amount">৳${p.price}</td></tr>`).join('')}
            </tbody>
        </table>

        <div class="total-section">
            <p><strong>সাবটোটাল:</strong> <span style="float: right;">৳${subtotal}</span></p>
            <p><strong>ডেলিভারি চার্জ:</strong> <span style="float: right;">৳${SHIPPING}</span></p>
            <p style="margin-top: 10px; padding-top: 10px; border-top: 2px solid #bbf7d0; color: #16a34a;"><strong>মোট:</strong> <span style="float: right; font-size: 16px;">৳${total}</span></p>
        </div>

        <div class="payment-section">
            <h3 style="margin-top: 0; color: #0660d6;">পেমেন্ট তথ্য</h3>
            <p><strong>পেমেন্ট:</strong> 💵 ক্যাশ অন ডেলিভারি (COD)</p>
            <p><strong>ডেলিভারি:</strong> ২-৩ ব্যবসায়িক দিন</p>
            <p style="color: #0660d6; font-size: 11px;">✓ অগ্রিম পেমেন্টের প্রয়োজন নেই</p>
        </div>

        <div class="footer">
            <p>ধন্যবাদ আপনার অর্ডারের জন্য!</p>
            <p>ফোন: 01616123500</p>
        </div>
    </div>
    <script>
        window.print();
    </script>
</body>
</html>
    `;

    // Create blob and download
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `আলেশা_বাজার_ইনভয়েস_${orderId}.html`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedProductsList.length === 0) {
      alert('দয়া করে কমপক্ষে একটি পণ্য নির্বাচন করুন');
      return;
    }

    if (!formData.name || !formData.phone || !formData.address) {
      alert('দয়া করে সমস্ত ফিল্ড পূরণ করুন');
      return;
    }

    generateInvoiceFile();

    const orderData = {
      id: `ALB-${Date.now().toString().slice(-8)}`,
      customer: formData,
      products: selectedProductsList.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: 1,
      })),
      subtotal,
      shipping: SHIPPING,
      total,
      orderDate: new Date().toISOString(),
      paymentMethod: 'Cash on Delivery',
      status: 'pending',
    };

    try {
      const existingOrders = JSON.parse(localStorage.getItem('admin_orders') || '[]');
      existingOrders.push(orderData);
      localStorage.setItem('admin_orders', JSON.stringify(existingOrders));
    } catch (error) {
      console.error('Error saving order:', error);
    }

    console.log('[ADMIN ORDER DATA]', orderData);
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="flex items-center justify-center p-4 min-h-full">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-3xl font-bold text-green-700 mb-4">অর্ডার সফল!</h2>
          <p className="text-gray-600 mb-6">আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <p className="text-gray-700">
              <strong>গ্রাহক নাম:</strong> {formData.name}
            </p>
            <p className="text-gray-700">
              <strong>মোট টাকা:</strong> <span className="text-2xl font-bold text-green-700">৳{total}</span>
            </p>
          </div>
          <button
            onClick={() => onClose()}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg w-full transition-colors"
          >
            হোম পেজে ফিরুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-green-50 to-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onClose}
          className="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg transition-colors"
        >
          ← ফিরে যান
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* বাম পাশ - পণ্য নির্বাচন */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">পণ্য নির্বাচন করুন</h2>
            
            <div className="space-y-4 mb-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all"
                  onClick={() => handleProductChange(product.id)}
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts[product.id] || false}
                      onChange={() => handleProductChange(product.id)}
                      className="w-6 h-6 rounded border-gray-300 text-green-600 cursor-pointer mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{product.emoji}</span>
                        <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">পরিমাণ: {product.quantity}</p>
                      <p className="text-green-700 font-bold text-lg mt-2">৳{product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* অর্ডার সারসংক্ষেপ - বাম পাশে */}
            {selectedProductsList.length > 0 && (
              <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">নির্বাচিত পণ্য</h3>
                <div className="space-y-3 mb-4">
                  {selectedProductsList.map((product) => (
                    <div key={product.id} className="flex justify-between items-center">
                      <span className="text-gray-700">{product.emoji} {product.name}</span>
                      <span className="font-bold text-gray-900">৳{product.price}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t-2 border-green-200 pt-3 space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>সাবটোটাল:</span>
                    <span className="font-semibold">৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>ডেলিভারি চার্জ:</span>
                    <span className="font-semibold">৳{SHIPPING}</span>
                  </div>
                  <div className="border-t-2 border-green-200 pt-3 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">মোট:</span>
                    <span className="text-3xl font-bold text-green-700">৳{total}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ডান পাশ - ফর্ম এবং পেমেন্ট তথ্য */}
          <div className="space-y-6">
            {/* গ্রাহক তথ্য ফর্ম */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">আপনার তথ্য</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">আপনার নাম *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none"
                    placeholder="আপনার সম্পূর্ণ নাম"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">মোবাইল নাম্বার *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none"
                    placeholder="0১xxxxxxxxx"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">সম্পূর্ণ ঠিকানা *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none"
                    placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
                    rows="4"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={selectedProductsList.length === 0}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors text-lg"
                >
                  অর্ড���র করুন (৳{total})
                </button>
              </form>
            </div>

            {/* ক্যাশ অন ডেলিভারি তথ্য */}
            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">💵 ক্যাশ অন ডেলিভারি (COD)</h3>
              <div className="space-y-3 text-blue-900">
                <div className="flex items-start gap-3">
                  <span className="text-xl">✓</span>
                  <div>
                    <p className="font-semibold">অগ্রিম পেমেন্ট নেই</p>
                    <p className="text-sm text-blue-800">কোনো অগ্রিম অর্থ প্রদান করতে হবে না</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">✓</span>
                  <div>
                    <p className="font-semibold">ডেলিভারিতে পেমেন্ট করুন</p>
                    <p className="text-sm text-blue-800">পণ্য গ্রহণের সময় টাকা প্রদান করুন</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">✓</span>
                  <div>
                    <p className="font-semibold">দ্রুত ডেলিভারি</p>
                    <p className="text-sm text-blue-800">২-৩ ব্যবসায়িক দিনে সরবরাহ</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">✓</span>
                  <div>
                    <p className="font-semibold">সম্পূর্ণ নিরাপদ</p>
                    <p className="text-sm text-blue-800">আপনার তথ্য এবং লেনদেন সম্পূর্ণ সুরক্ষিত</p>
                  </div>
                </div>
              </div>
            </div>

            {/* যোগাযোগ তথ্য */}
            <div className="bg-gray-100 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">যোগাযোগ তথ্য</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>📞 ফোন:</strong> 01616123500</p>
                <p><strong>📍 অবস্থান:</strong> Tangail, Dhaka, Bangladesh</p>
                <p className="text-sm text-gray-600 mt-4">যেকোনো সমস্যার জন্য আমাদের সাথে যোগাযোগ করুন</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
