export default function HowToEat() {
  const ways = [
    {
      title: 'গরম ভাতের সাথে',
      emoji: '🍚',
      description: 'প্রতিটি ভাতের সাথে এক চামচ আচার মিশিয়ে খান এবং স্বর্গীয় স্বাদ অনুভব করুন।',
    },
    {
      title: 'খিচুড়ির সাথে',
      emoji: '🥘',
      description: 'খিচুড়িতে একটি ডলপ যোগ করুন এবং স্বাদ দ্বিগুণ করুন।',
    },
    {
      title: 'পরোটা/রুটির সাথে',
      emoji: '🥖',
      description: 'তাজা পরোটার সাথে আচার মেখে খান সকাল-সন্ধ্যায়।',
    },
    {
      title: 'অতিথি আপ্যায়নে',
      emoji: '🎉',
      description: 'বিশেষ দিনে এবং অনুষ্ঠানে আপনার অতিথিদের মুগ্ধ করুন।',
    },
  ];

  return (
    <section className="w-full py-12 md:py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
          🥄 কিভাবে খাবেন?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ways.map((way, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border-t-4 border-green-500"
            >
              <div className="text-4xl mb-3 text-center">{way.emoji}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">{way.title}</h3>
              <p className="text-gray-600 text-sm text-center leading-relaxed">{way.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
