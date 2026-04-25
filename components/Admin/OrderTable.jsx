export default function OrderTable({ data, onView, onUpdateStatus, activeTab }) {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
      {/* Container to prevent table breaking on mobile */}
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[500px]">
          <thead className="bg-slate-800/50">
            <tr>
              <th className="p-3 md:p-5 text-slate-300 font-semibold text-sm md:text-base">Customer Name</th>
              <th className="p-3 md:p-5 text-slate-300 font-semibold text-sm md:text-base">Status</th>
              <th className="p-3 md:p-5 text-slate-300 font-semibold text-sm md:text-base">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item._id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-3 md:p-5 text-sm md:text-base">{item.customer?.name}</td>
                  <td className="p-3 md:p-5">
                    <span className="px-2 py-1 bg-slate-800 rounded text-[10px] md:text-xs capitalize">{item.status}</span>
                  </td>
                  <td className="p-3 md:p-5 flex gap-2 md:gap-3">
                    <button onClick={() => onView(item)} className="text-blue-400 cursor-pointer hover:underline text-xs md:text-sm">View</button>
                    
                    {activeTab === "pending" && (
                      <button onClick={() => onUpdateStatus(item._id, "confirmed")} className="bg-green-600/20 text-green-400 cursor-pointer px-2 py-1 md:px-3 rounded-lg text-[10px] md:text-xs hover:bg-green-600 hover:text-white transition-all whitespace-nowrap">Confirm</button>
                    )}
                    {activeTab === "confirmed" && (
                      <button onClick={() => onUpdateStatus(item._id, "delivered")} className="bg-purple-600/20 text-purple-400 cursor-pointer px-2 py-1 md:px-3 rounded-lg text-[10px] md:text-xs hover:bg-purple-600 hover:text-white transition-all whitespace-nowrap">Delivery</button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="3" className="p-10 text-center text-slate-500">No orders found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}