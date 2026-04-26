"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function CheckoutPage() {
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
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

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
      setSelectedProducts(
        selectedProducts.filter((p) => p._id !== product._id),
      );
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setSelectedProducts(
      selectedProducts.map((p) =>
        p._id === id ? { ...p, quantity: Math.max(1, p.quantity + delta) } : p,
      ),
    );
  };

  const subtotal = selectedProducts.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0,
  );
  const shipping = shippingLocation === "inside" ? 60 : 100;
  const total = subtotal + shipping;

const handleDownloadInvoice = async () => {
  if (!placedOrder) return;
  const { jsPDF } = await import("jspdf/dist/jspdf.es.min.js");
  const { default: autoTable } = await import("jspdf-autotable");
  const doc = new jsPDF();

  // ১. হেডার সেকশন
  doc.setFillColor(34, 197, 94); // Green Header
  doc.rect(0, 0, 210, 35, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("INVOICE", 15, 22);
  
  // কোম্পানির তথ্য বা ডানপাশে কিছু টেক্সট
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Thank you for your business!", 150, 20);

  // ২. কাস্টমার ডিটেইলস সেকশন
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("BILL TO:", 15, 50);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Name: ${placedOrder.customer.name}`, 15, 56);
  doc.text(`Phone: ${placedOrder.customer.phone}`, 15, 61);
  doc.text(`Address: ${placedOrder.customer.address}`, 15, 66);

  // একটি পাতলা লাইন ডিভাইডার
  doc.setDrawColor(200, 200, 200);
  doc.line(15, 72, 195, 72);

  // ৩. টেবিল সেকশন
  const tableColumn = ["Product Name", "Qty", "Price ", "Total "];
  const tableRows = placedOrder.products.map((p) => [
    p.name,
    p.quantity,
    p.price.toLocaleString(),
    (p.price * p.quantity).toLocaleString(),
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 80,
    headStyles: { fillColor: [34, 197, 94], fontSize: 11, halign: 'center' },
    columnStyles: { 
        1: { halign: 'center' }, 
        2: { halign: 'right' }, 
        3: { halign: 'right' } 
    },
    theme: 'striped', // সুন্দর স্ট্রাইপড লুক
    margin: { left: 15, right: 15 },
  });

  // ৪. টোটাল সামারি সেকশন
  const finalY = doc.lastAutoTable.finalY + 15;
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(`Shipping:`, 140, finalY);
  doc.text(`${placedOrder.shipping?.toLocaleString() || 0}`, 190, finalY, { align: 'right' });
  
  doc.setFontSize(14);
  doc.setTextColor(34, 197, 94); // সবুজের হাইলাইট
  doc.text(`Total Amount:`, 140, finalY + 10);
  doc.text(`${placedOrder.total?.toLocaleString()}`, 190, finalY + 10, { align: 'right' });

  // ৫. ফুটার (থ্যাঙ্কস নোট)
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(9);
  doc.text("This is a computer generated invoice.", 105, 285, { align: 'center' });

  doc.save(`Invoice_${placedOrder.orderId || 'Generated'}.pdf`);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedProducts.length === 0) return toast.error("পণ্য সিলেক্ট করুন");
    if (/\d/.test(formData.name))
      return toast.error("নামে নাম্বার থাকা যাবে না");
    if (formData.phone.length !== 11 || isNaN(formData.phone))
      return toast.error("ফোন নাম্বার ১১ ডিজিটের হতে হবে");
    if (/\d/.test(formData.address))
      return toast.error("ঠিকানায় নাম্বার থাকা যাবে না");

    setIsSubmitting(true);
    const orderData = {
      customer: formData,
      products: selectedProducts,
      total,
      shipping,
    };

    const res = await fetch("/api/orders/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const result = await res.json();
    if (result.success) {
      setPlacedOrder({ ...orderData, orderId: result.orderId });
      setOrderPlaced(true);
      toast.success("অর্ডার সফল হয়েছে!");
    } else {
      toast.error("সমস্যা: " + result.message);
    }
    setIsSubmitting(false);
  };

  if (loading)
    return <div className="text-center py-20 font-bold">লোড হচ্ছে...</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 py-8" id="products">
      <Toaster position="top-right" />
      {orderPlaced ? (
        <div className="text-center py-20 border rounded-lg bg-green-50">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            অভিনন্দন! অর্ডার সফল!
          </h2>
          <button
            onClick={handleDownloadInvoice}
            className="px-6 py-2 bg-green-600 text-white rounded font-bold cursor-pointer"
          >
            ডাউনলোড ইনভয়েস
          </button>
        </div>
      ) : (
        <>
          {/* হাইজেনি ব্যানার */}
         {/* সেকশন ১: টাইটেল (সবুজ ব্যাকগ্রাউন্ড) */}
{/* সেকশন ১: টাইটেল */}
<div className="w-full bg-green-900 text-white text-center text-3xl font-bold p-3">
  🔒 ১০০% হাইজেনিক ও নিরাপদ
</div>

{/* সেকশন ২: বর্ণনা */}
<div className="w-full bg-green-900 text-white text-center text-2xl font-bold p-4 mt-5">
  আমাদের প্রতিটি আচারের বোতল তৈরি হয় অত্যন্ত পরিষ্কার ও স্বাস্থ্যকর পরিবেশে। ঘরের মতো বিশ্বাসযোগ্য স্বাদ আর মান আমরা দিচ্ছি প্রতিটি প্যাকেজে।
</div>

{/* সেকশন ৩: ডেলিভারি */}
<div className="w-full bg-white text-black text-center text-3xl font-bold p-4">
  সারাদেশে ক্যাশ অন হোম ডেলিভারি দেয়া হয়। পণ্য হাতে পেয়ে টাকা পরিশোধ।
</div>

          {/* প্রোডাক্ট লিস্ট */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {allProducts.map((p) => {
              const isSelected = selectedProducts.find(
                (item) => item._id === p._id,
              );
              return (
                <div
                  key={p._id}
                  className={`flex items-center gap-4 p-3 border-2 rounded-lg cursor-pointer transition-all ${isSelected ? "border-green-500 bg-green-50" : "border-gray-200"}`}
                  onClick={() => toggleProduct(p)}
                >
                  <input
                    type="checkbox"
                    checked={!!isSelected}
                    onChange={() => {}}
                    className="w-5 h-5 accent-green-600"
                  />
                  <img
                    src={p.image}
                    className="w-16 h-16 object-cover rounded"
                    alt={p.name}
                  />
                  <div className="flex-1">
                    <h4 className="font-bold">{p.name}</h4>
                    <p className="text-xs text-gray-500">{p.description}</p>
                    <p className="font-bold text-green-700">৳{p.price}</p>
                  </div>
                </div>
              );
            })}
          </section>

          {/* কার্ট এবং বিলিং */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border rounded shadow-sm p-4">
              <h3 className="font-bold mb-4">অর্ডার সামারি</h3>
              {selectedProducts.map((p) => (
                <div
                  key={p._id}
                  className="flex gap-4 items-center mb-4 border-b pb-4"
                >
                  <img
                    src={p.image}
                    className="w-16 h-16 object-cover rounded"
                    alt={p.name}
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">{p.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQuantity(p._id, -1)}
                        className="px-2 py-1 bg-gray-100 rounded cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-sm px-2 font-bold">
                        {p.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(p._id, 1)}
                        className="px-2 py-1 bg-gray-100 rounded cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="font-bold">৳{p.price * p.quantity}</p>
                </div>
              ))}
              <div className="mt-4 font-bold flex justify-between">
                <span>ডেলিভারি চার্জ:</span> <span>৳{shipping}</span>
              </div>
              <div className="mt-2 text-xl font-bold flex justify-between">
                <span>Total:</span> <span>৳{total}</span>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 border rounded shadow-sm space-y-4"
            >
              <h3 className="font-bold">Billing Details</h3>
              <input
                className="w-full p-2 border rounded"
                placeholder="নাম"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <input
                className="w-full p-2 border rounded"
                placeholder="ফোন (১১ ডিজিট)"
                maxLength={11}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
              <textarea
                className="w-full p-2 border rounded"
                placeholder="ঠিকানা"
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
              />

              <select
                className="w-full p-2 border rounded"
                onChange={(e) => setShippingLocation(e.target.value)}
              >
                <option value="inside">ঢাকার ভেতরে (৳60)</option>
                <option value="outside">ঢাকার বাইরে (৳100)</option>
              </select>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-slate-600 text-white font-bold rounded cursor-pointer"
              >
                {isSubmitting ? "অর্ডার হচ্ছে..." : "Confirm Order"}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
