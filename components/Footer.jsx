export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">আলেশা বাজার</h3>
            <p className="text-gray-400 leading-relaxed">
              শতভাগ হালাল এবং হোমমেড আচার সরাসরি আপনার দোরগোড়ায়। দেশি উপকরণ এবং ঐতিহ্যবাহী রেসিপি দিয়ে তৈরি।
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">যোগাযোগ</h3>
            <div className="space-y-3">
              <p className="flex items-center gap-2">
                <span className="text-green-500">📍</span>
                Tangail, Dhaka, Bangladesh
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-500">📱</span>
                01616123500
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-500">💬</span>
                ক্যাশ অন ডেলিভারি উপলব্ধ
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">গুরুত্বপূর্ণ লিঙ্ক</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-green-500 transition-colors">
                গোপনীয়তা নীতি
              </a>
              <a href="#" className="block text-gray-400 hover:text-green-500 transition-colors">
                শর্ত এবং শর্তাবলী
              </a>
              <a href="#" className="block text-gray-400 hover:text-green-500 transition-colors">
                ফেরত নীতি
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>
            © {currentYear} আলেশা বাজার। সর্বাধিকার সংরক্ষিত।
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-green-500 transition-colors">
              ফেসবুক
            </a>
            <a href="#" className="hover:text-green-500 transition-colors">
              হোয়াটসঅ্যাপ
            </a>
            <a href="#" className="hover:text-green-500 transition-colors">
              ইনস্টাগ্রাম
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
