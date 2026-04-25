export default function TabList({ activeTab, setActiveTab }) {
  return (
    <div className="flex gap-4 mb-6 cursor-pointer">
      {["pending", "confirmed", "delivered"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 cursor-pointer py-2 capitalize rounded-lg ${activeTab === tab ? "bg-blue-600" : "bg-slate-800"}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}