import Image from "next/image";

export default function WhyChooseUs() {
  const reasons = [
    {
      emoji: '🐟',
      title: 'শুদ্ধ পদ্মা-মেঘনার দেশি ইলিশ মাছ',
      description: 'শুধুমাত্র দেশের সেরা ইলিশ মাছ নির্বাচন করা হয় প্রতিটি ব্যাচে।',
    },
    {
      emoji: '🧄',
      title: 'খাঁটি মসলা আর দেশি রেসিপি',
      description: 'প্রজন্মের পর প্রজন্ম ধরে চলে আসা ঐতিহ্যবাহী রেসিপি ব্যবহার করি আমরা।',
    },
    {
      emoji: '🌶️',
      title: 'হালকা ঝাল আর দারুণ ফ্লেভার',
      description: 'প্রতিটি স্বাদের জন্য নিখুঁত ভারসাম্য - সুস্বাদু এবং স্বাস্থ্যকর।',
    },
    {
      emoji: '🧴',
      title: 'কোনো প্রিজারভেটিভ নেই',
      description: 'সম্পূর্ণ প্রাকৃতিক উপাদান দিয়ে তৈরি - আপনার পরিবারের জন্য সেরা।',
    },
  ];

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            কেন খাবেন আমাদের ইলিশ মাছের আচার?
          </h2>
          <p className="text-gray-600">আমাদের অনন্য বৈশিষ্ট্য এবং গুণমান জানুন</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 items-center">
          
          
          <div className="flex justify-center items-center order-2 md:order-1">
            <div className="relative w-full max-w-sm aspect-[4/5] bg-white rounded-3xl overflow-hidden shadow-2xl shadow-green-100 border-4 border-white grouptransition-all duration-500 hover:shadow-green-200/50">
              <Image
                src="/mas.jpg"
                alt="Elish Achhar"
                fill 
                priority 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay with Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <p className="text-white font-bold text-xl">প্রিমিয়াম মানের আচার</p>
              </div>
            </div>
          </div>

          {/* Right Grid - আপনার আগের টেক্সট কার্ডগুলো */}
          <div className="grid grid-cols-1 gap-5 order-1 md:order-2">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-green-500 hover:-translate-y-1"
              >
                <div className="flex gap-4">
                  <div className="text-3xl flex-shrink-0">{reason.emoji}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 tracking-tight text-base md:text-lg">
                      {reason.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}