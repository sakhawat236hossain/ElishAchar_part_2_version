'use client';
import { useState } from 'react';
import { uploadImageToCloudinary } from '../../hooks';
import toast from 'react-hot-toast';

export default function AddProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [weight, setWeight] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("দয়া করে একটি ইমেজ সিলেক্ট করুন!");
    
    setLoading(true);

    try {
      const imageUrl = await uploadImageToCloudinary(image);
      const response = await fetch('/api/products/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            name, 
            price: Number(price), 
            weight, 
            image: imageUrl,
            description,
        }),
      });

      const responseData = await response.json();

      if (!response.ok || !responseData.success) {
        throw new Error(responseData.error || "ডাটা সেভ করতে সমস্যা হয়েছে");
      }

      toast.success('প্রোডাক্ট সফলভাবে যোগ হয়েছে!');
      
      // ফর্ম রিসেট
      setName(''); 
      setPrice(''); 
      setWeight(''); 
      setImage(null); 
      setPreview(null); 
      setDescription('');
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || 'আপলোডে সমস্যা হয়েছে!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">প্রোডাক্টের নাম</label>
          <input 
            type="text" required placeholder="উদাহরণ: লেদার ব্যাগ"
            className="w-full bg-slate-950 text-white p-4 rounded-xl border border-slate-700 focus:border-green-500 outline-none transition duration-300"
            value={name} onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        {/* Price Input */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">প্রাইস (টাকা)</label>
          <input 
            type="number" required placeholder="উদাহরণ: ৫৫০"
            className="w-full bg-slate-950 text-white p-4 rounded-xl border border-slate-700 focus:border-green-500 outline-none transition duration-300"
            value={price} onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Weight Input */}
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">ওজন (গ্রাম/কেজি)</label>
          <input 
            type="text" required placeholder="উদাহরণ: ৫০০ গ্রাম"
            className="w-full bg-slate-950 text-white p-4 rounded-xl border border-slate-700 focus:border-green-500 outline-none transition duration-300"
            value={weight} onChange={(e) => setWeight(e.target.value)}
          />
        </div>
       
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">বিবরণ</label>
          <input 
            type="text" required placeholder="প্রোডাক্টের বিবরণ"
            className="w-full bg-slate-950 text-white p-4 rounded-xl border border-slate-700 focus:border-green-500 outline-none transition duration-300"
            value={description} onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Image Upload */}
        <div className="border-2 border-dashed border-slate-700 rounded-xl p-4 text-center cursor-pointer hover:border-green-500 hover:bg-slate-800/50 transition-all duration-300">
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="fileInput" />
          <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center gap-3">
            {preview ? (
              <img src={preview} className="h-32 w-32 object-cover rounded-lg shadow-lg border border-slate-700" alt="preview" />
            ) : (
              <div className="py-4 text-slate-500">
                <span className="text-4xl block mb-2">+</span>
                ইমেজ আপলোড করুন
              </div>
            )}
          </label>
        </div>

        {/* Submit Button */}
        <button 
          disabled={loading}
          type="submit" 
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-4 rounded-xl transition duration-300 shadow-lg shadow-green-900/20 disabled:opacity-50"
        >
          {loading ? "আপলোড হচ্ছে..." : "প্রোডাক্ট পাবলিশ করুন"}
        </button>
      </form>
    </div>
  );
}