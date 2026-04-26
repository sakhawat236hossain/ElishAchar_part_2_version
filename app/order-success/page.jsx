"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { downloadInvoice } from "../../utils/pdfGenerator";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    if (orderId) {
      fetch(`/api/orders/getSingle?id=${orderId}`)
        .then(async (res) => {
          // রেসপন্স ঠিক আছে কিনা চেক করুন
          if (!res.ok) {
            const errorData = await res.json().catch(() => ({})); 
            throw new Error(errorData.message || "Something went wrong");
          }
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            setOrder(data.data);
          } else {
            toast.error("ডাটা পাওয়া যায়নি");
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error("অর্ডার লোড করতে সমস্যা হয়েছে");
        })
        .finally(() => setLoading(false));
    }
  }, [orderId]);

  if (loading) return <div className="text-center py-20">অর্ডার ডিটেইলস লোড হচ্ছে...</div>;
  if (!order) return <div className="text-center py-20">অর্ডার খুঁজে পাওয়া যায়নি!</div>;

  return (
    <div className="max-w-xl mx-auto text-center py-20 border rounded-lg bg-green-50 shadow-md">
      <h2 className="text-3xl font-bold text-green-700 mb-4">অভিনন্দন! অর্ডার সফল!</h2>
      <p className="mb-6">আপনার অর্ডার আইডি: {orderId}</p>
      <button
        onClick={() => downloadInvoice(order)}
        className="px-8 py-3 bg-green-600 text-white rounded font-bold cursor-pointer hover:bg-green-700"
      >
        ডাউনলোড ইনভয়েস
      </button>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}