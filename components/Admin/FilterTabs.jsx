export default function TabList({ activeTab, setActiveTab }) {
  return (
    <div className="flex flex-wrap gap-2 md:gap-4 mb-6 cursor-pointer">
      {["pending", "confirmed", "delivered"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 capitalize rounded-lg text-sm md:text-base ${
            activeTab === tab ? "bg-blue-600" : "bg-slate-800"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}