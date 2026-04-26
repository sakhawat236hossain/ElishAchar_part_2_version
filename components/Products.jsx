"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [shippingLocation, setShippingLocation] = useState("inside");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetch("/api/products/get")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setAllProducts(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleProduct = (product) => {
    const exists = selectedProducts.find((p) => p._id === product._id);
    if (exists) {
      setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id));
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setSelectedProducts(
      selectedProducts.map((p) =>
        p._id === id ? { ...p, quantity: Math.max(1, p.quantity + delta) } : p
      )
    );
  };

  const subtotal = selectedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const shipping = shippingLocation === "inside" ? 60 : 100;
  const total = subtotal + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedProducts.length === 0) return toast.error("পণ্য সিলেক্ট করুন");
    if (/\d/.test(formData.name)) return toast.error("নামে নাম্বার থাকা যাবে না");
    if (formData.phone.length !== 11 || isNaN(formData.phone))
      return toast.error("ফোন নাম্বার ১১ ডিজিটের হতে হবে");
    if (/\d/.test(formData.address)) return toast.error("ঠিকানায় নাম্বার থাকা যাবে না");

    setIsSubmitting(true);
    const orderData = { customer: formData, products: selectedProducts, total, shipping };

    const res = await fetch("/api/orders/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const result = await res.json();
    if (result.success) {
      toast.success("অর্ডার সফল হয়েছে!");
      // সাকসেস পেজে রিডাইরেক্ট
      router.push(`/order-success?orderId=${result.orderId}`);
    } else {
      toast.error("সমস্যা: " + result.message);
      setIsSubmitting(false);
    }
  };

  if (loading)
    return <div className="text-center py-20 font-bold">লোড হচ্ছে...</div>;

  return (
    <div className="max-w-5xl mx-auto" id="products">
      <Toaster position="top-right" />
      
      {/* ব্যানার সেকশন */}
      <div className="w-full bg-green-900 text-white text-center text-3xl font-bold p-3">
        🔒 ১০০% হাইজেনিক ও নিরাপদ
      </div>
      <div className="w-full bg-green-900 text-white text-center text-2xl font-bold p-4">
        আমাদের প্রতিটি আচারের বোতল তৈরি হয় অত্যন্ত পরিষ্কার ও স্বাস্থ্যকর পরিবেশে। ঘরের মতো বিশ্বাসযোগ্য স্বাদ আর মান আমরা দিচ্ছি প্রতিটি প্যাকেজে।
      </div>
      <div className="w-full bg-white text-black text-center text-3xl font-bold p-4 border-b border-gray-300">
        🚚 সারাদেশে ক্যাশ অন হোম ডেলিভারি দেয়া হয়। পণ্য হাতে পেয়ে টাকা পরিশোধ।
      </div>

      <div className="p-4 py-8">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {allProducts.map((p) => {
            const isSelected = selectedProducts.find((item) => item._id === p._id);
            return (
              <div
                key={p._id}
                className={`flex items-center gap-4 p-3 border-2 transition-all cursor-pointer ${
                  isSelected ? "border-green-500 bg-green-50" : "border-gray-200"
                }`}
                onClick={() => toggleProduct(p)}
              >
                <input type="checkbox" checked={!!isSelected} onChange={() => {}} className="w-5 h-5 accent-green-600" />
                <img src={p.image} className="w-16 h-16 object-cover" alt={p.name} />
                <div className="flex-1">
                  <h4 className="font-bold">{p.name}</h4>
                  <p className="font-bold text-green-700">৳{p.price}</p>
                </div>
              </div>
            );
          })}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-gray-300 p-0">
            <div className="p-4 border-b border-gray-300 font-bold bg-gray-50">অর্ডার সামারি</div>
            {selectedProducts.map((p) => (
              <div key={p._id} className="flex gap-4 items-center p-4 border-b border-gray-300">
                <img src={p.image} className="w-12 h-12 object-cover" alt={p.name} />
                <div className="flex-1">
                  <h4 className="font-bold text-sm">{p.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <button onClick={() => updateQuantity(p._id, -1)} className="px-2 py-1 bg-gray-200 text-sm cursor-pointer">-</button>
                    <span className="font-bold">{p.quantity}</span>
                    <button onClick={() => updateQuantity(p._id, 1)} className="px-2 py-1 bg-gray-200 text-sm cursor-pointer">+</button>
                  </div>
                </div>
                <p className="font-bold">৳{p.price * p.quantity}</p>
              </div>
            ))}
            <div className="p-4 border-b border-gray-300 flex justify-between">
              <span className="font-bold">Subtotal</span> <span className="font-bold">৳{subtotal}</span>
            </div>
            <div className="p-4 border-b border-gray-300 flex justify-between">
              <span className="font-bold">Shipping</span> <span className="font-bold text-green-700">৳{shipping}</span>
            </div>
            <div className="p-4 flex justify-between bg-gray-50">
              <span className="font-bold text-lg">Total</span> <span className="font-bold text-lg">৳{total}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border border-gray-300 p-6 space-y-4">
              <h3 className="font-bold text-xl border-b pb-2">Billing Details</h3>
              <input className="w-full p-2 border border-gray-300" placeholder="নাম*" onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              <input className="w-full p-2 border border-gray-300" placeholder="মোবাইল নাম্বার*" maxLength={11} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
              <textarea className="w-full p-2 border border-gray-300" placeholder="সম্পূর্ণ ঠিকানা*" onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />
              <select className="w-full p-2 border border-gray-300" onChange={(e) => setShippingLocation(e.target.value)}>
                <option value="inside">ঢাকার ভেতরে (৳60)</option>
                <option value="outside">ঢাকার বাইরে (৳100)</option>
              </select>
            </div>

            <div className="border border-gray-300 p-4 bg-green-50">
              <h3 className="font-bold">Payment</h3>
              <div className="flex items-center gap-2 mt-2">
                <input type="radio" checked className="w-4 h-4 accent-green-700" onChange={() => {}} />
                <span className="font-bold text-sm">Cash on delivery</span>
              </div>
              <p className="text-xs mt-1 ml-6 text-gray-600">Pay with Cash on delivery</p>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-slate-600 text-white font-bold text-lg cursor-pointer hover:bg-slate-700">
              {isSubmitting ? "অর্ডার হচ্ছে..." : "Order Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}