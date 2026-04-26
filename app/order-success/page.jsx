"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { downloadInvoice } from "../../utils/pdfGenerator";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetch(`/api/orders/getSingle?id=${orderId}`)
        .then(async (res) => {
          if (!res.ok) throw new Error("অর্ডার খুঁজে পাওয়া যায়নি");
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            setOrder(data.data);
          } else {
            toast.error("ডাটা পাওয়া যায়নি");
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error("অর্ডার লোড করতে সমস্যা হয়েছে");
        })
        .finally(() => setLoading(false));
    }
  }, [orderId]);

  if (loading) return <div className="text-center py-20 font-bold text-xl text-gray-600">অর্ডার প্রসেস হচ্ছে...</div>;
  if (!order) return <div className="text-center py-20 text-red-500">অর্ডার খুঁজে পাওয়া যায়নি!</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8">
      <Toaster />
      
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header Success Section */}
        <div className="bg-green-600 p-8 text-center text-white">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-3xl font-extrabold">অভিনন্দন!</h2>
          <p className="mt-2 text-green-50">আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।</p>
        </div>

        {/* Summary & Action Buttons Section - Moved UP */}
        <div className="bg-gray-50 p-6 md:p-8 border-b border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">অর্ডার আইডি</p>
              <p className="font-bold text-gray-800 text-lg">{orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">মোট টাকা</p>
              <p className="font-bold text-2xl text-green-600">৳{order.total}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => downloadInvoice(order)}
              className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-green-200"
            >
              ইনভয়েস ডাউনলোড করুন
            </button>
            <Link
              href="/"
              className="w-full py-4 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-xl font-bold text-center transition-all"
            >
              আবার অর্ডার করুন (হোম পেজ)
            </Link>
          </div>
        </div>

        {/* Detailed Info Section */}
        <div className="p-6 md:p-8 space-y-8">
          <div>
            <h3 className="font-bold text-gray-700 mb-3 border-b pb-2">শিপিং ডিটেইলস</h3>
            <div className="text-sm space-y-1">
              <p><span className="font-semibold text-gray-500">নাম:</span> {order.customer.name}</p>
              <p><span className="font-semibold text-gray-500">ফোন:</span> {order.customer.phone}</p>
              <p><span className="font-semibold text-gray-500">ঠিকানা:</span> {order.customer.address}</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-700 mb-3 border-b pb-2">পণ্যসমূহ</h3>
            <div className="space-y-3">
              {order.products.map((p, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span>{p.name} <span className="text-gray-400">x {p.quantity}</span></span>
                  <span className="font-bold">৳{p.price * p.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-500">লোডিং...</div>}>
      <SuccessContent />
    </Suspense>
  );
}