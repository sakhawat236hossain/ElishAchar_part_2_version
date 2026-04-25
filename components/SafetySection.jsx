export default function SafetySection() {
  return (
    <section className="w-full py-20 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Heading Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            আমাদের সেবা ও নিশ্চয়তা
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            আপনার স্বাস্থ্য এবং সুবিধার কথা মাথায় রেখে আমরা দিচ্ছি সেরা মানের প্রতিশ্রুতি।
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Hygiene Card - Green Accent */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border-t-4 border-green-500 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-3xl mb-6">
              🔒
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ১০০% হাইজেনিক ও নিরাপদ
            </h3>
            <p className="text-gray-600 leading-relaxed">
              আমাদের প্রতিটি আচারের বোতল তৈরি হয় অত্যন্ত পরিষ্কার ও স্বাস্থ্যকর পরিবেশে। ঘরের মতো বিশ্বাসযোগ্য স্বাদ আর মান আমরা দিচ্ছি প্রতিটি প্যাকেজে।
            </p>
          </div>

          {/* Delivery Card - Blue Accent */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border-t-4 border-blue-500 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-6">
              🚚
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              সারাদেশে ক্যাশ অন ডেলিভারি
            </h3>
            <p className="text-gray-600 leading-relaxed">
              সারাদেশে ক্যাশ অন হোম ডেলিভারি দেয়া হয়। পণ্য হাতে পেয়ে টাকা পরিশোধ করুন - সম্পূর্ণ নিরাপদ এবং সুবিধাজনক। দ্রুততম সময়ে পৌঁছে যাবে আপনার ঠিকানায়।
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}