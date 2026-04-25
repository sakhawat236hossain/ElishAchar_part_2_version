export default function VideoSection() {
  return (
    <section className="w-full py-12 md:py-16 px-4 md:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
          আমাদের পণ্য কিভাবে তৈরি হয়
        </h2>

        <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="আমাদের পণ্য প্রস্তুতি"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <p className="text-center text-gray-600 mt-6 text-sm">
          আমাদের হাতে তৈরি আচারের সম্পূর্ণ প্রক্রিয়া দেখুন
        </p>
      </div>
    </section>
  );
}
