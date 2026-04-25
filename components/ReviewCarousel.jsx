import { useState } from 'react';

const reviews = [
  { id: 1, name: 'রহিম সাহেব', image: '👨', rating: 5, text: 'অসাধারণ স্বাদ! মায়ের রান্নার কথা মনে পড়ে গেল। প্যাকেজিংও খুবই ভালো ছিল।' },
  { id: 2, name: 'ফাতিমা বেগম', image: '👩', rating: 5, text: 'এত সুস্বাদু আচার আগে কখনো খাইনি! ঘর ভেঙে বাজারে যাওয়ার দরকার নেই।' },
  { id: 3, name: 'করিম ভাই', image: '👨', rating: 5, text: 'বন্ধুদের কাছে সবাই সুপারিশ করেছি। গুণমান এবং স্বাদ অতুলনীয়।' },
  { id: 4, name: 'নাজমা আপা', image: '👩', rating: 5, text: 'বাজারের যেকোনো আচারের চেয়ে ভালো। দামও ন্যায্য দিয়েছেন।' },
  { id: 5, name: 'আমিন হোসেন', image: '👨', rating: 5, text: 'প্রতি সপ্তাহে অর্ডার করি এখন। পরিবারের সবাই ভালোবাসে।' },
];

export default function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  const goToNext = () => setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));

  const currentReview = reviews[currentIndex];

  return (
    <section className="w-full py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-2">গ্রাহকদের মতামত</h2>
        <p className="text-center text-gray-500 mb-12">আমাদের সন্তুষ্ট গ্রাহকরা কি বলেছেন</p>

        <div className="relative">
          {/* Main Card */}
          <div 
            key={currentIndex} // animation trigger
            className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-green-100 border border-green-50 animate-in fade-in duration-500 transition-all"
          >
            {/* Decorative Quote */}
            <div className="absolute top-6 left-6 text-green-100 text-8xl font-serif">"</div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mb-6 border-4 border-white shadow-md">
                {currentReview.image}
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(currentReview.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>

              <p className="text-gray-700 text-lg md:text-xl mb-8 leading-relaxed italic max-w-2xl">
                "{currentReview.text}"
              </p>

              <p className="text-gray-900 font-bold text-lg">{currentReview.name}</p>
              <p className="text-green-600 text-sm font-medium">ভেরিফাইড ক্রেতা</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-8 mt-8">
            <button
              onClick={goToPrevious}
              className="p-3 rounded-full cursor-pointer bg-white shadow-lg border hover:bg-green-600 hover:text-white transition-all duration-300"
            >
              ←
            </button>
            
            <div className="flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 cursor-pointer rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-green-600 w-8' : 'bg-gray-300 w-2.5'}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="p-3 cursor-pointer rounded-full bg-white shadow-lg border hover:bg-green-600 hover:text-white transition-all duration-300"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}