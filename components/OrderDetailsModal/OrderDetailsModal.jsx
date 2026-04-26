import React from "react";

export default function OrderDetailsModal({ order, onClose }) {
  if (!order) return null;

  // ডাটাবেজের ফিল্ডগুলো সেফটি চেক করে নেওয়া
  const { customer, products, subtotal, total, shipping, orderDate, _id } = order;

  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-700 overflow-hidden max-h-[90vh] flex flex-col text-slate-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-700 flex justify-between items-center bg-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white">অর্ডার ডিটেইলস</h2>
            <p className="text-xs text-slate-400">ID: {_id?.$oid || "N/A"}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-3xl transition"
          >
            &times;
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Customer & Payment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <h4 className="text-slate-400 text-xs uppercase font-bold mb-2">কাস্টমার তথ্য</h4>
              <p className="text-white font-semibold text-lg">{customer?.name || "N/A"}</p>
              <p className="text-slate-300">📞 {customer?.phone || "N/A"}</p>
              <p className="text-slate-400 text-sm mt-1 break-words">📍 {customer?.address || "N/A"}</p>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <h4 className="text-slate-400 text-xs uppercase font-bold mb-2">পেমেন্ট ও নোট</h4>
              <p className="text-white font-semibold">{customer?.paymentMethod || "ক্যাশ অন ডেলিভারি"}</p>
              <p className="text-slate-400 text-xs italic mt-2">নোট: {customer?.note || "কোনো নোট নেই"}</p>
            </div>
          </div>

          {/* Products List */}
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <h4 className="text-slate-400 text-xs uppercase font-bold mb-3">
              পণ্যসমূহ ({products?.length || 0})
            </h4>
            <div className="space-y-3">
              {products?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-slate-900 p-3 rounded-lg border border-slate-700"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-700 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = "/placeholder-image.png"; }}
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="text-white font-medium">{item.name}</p>
                    <div className="flex gap-3 text-slate-400 text-xs mt-1">
                        <span>ওজন: {item.weight || "N/A"}</span>
                        <span className="font-bold text-slate-200">পরিমাণ: {item.quantity || 1}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold">৳{ (item.price * (item.quantity || 1)).toLocaleString() }</p>
                    <p className="text-slate-500 text-[10px]">৳{item.price} × {item.quantity || 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col gap-2">
            <div className="flex justify-between text-slate-400">
              <span>সাবটোটাল</span>
              <span>৳{subtotal?.toLocaleString() || 0}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>শিপিং চার্জ</span>
              <span>৳{shipping?.toLocaleString() || 0}</span>
            </div>
            <div className="flex justify-between text-white text-xl font-bold border-t border-slate-700 pt-2 mt-1">
              <span>মোট</span>
              <span className="text-green-400">৳{total?.toLocaleString() || 0}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-800 border-t border-slate-700 text-center text-slate-500 text-xs">
          অর্ডারের সময়: {orderDate ? new Date(orderDate).toLocaleString("bn-BD") : "N/A"}
        </div>
      </div>
    </div>
  );
}