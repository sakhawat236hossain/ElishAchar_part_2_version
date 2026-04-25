// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import OrderDetailsModal from "../OrderDetailsModal/OrderDetailsModal";
// import StatsCard from "./StatsCard";
// import TabList from "./FilterTabs";
// import OrderTable from "./OrderTable";

// export default function Admin() {
//   // Auth State
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginError, setLoginError] = useState("");

//   // Dashboard State
//   const [activeTab, setActiveTab] = useState("pending");
//   const [data, setData] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [stats, setStats] = useState({ orders: 0, products: 0, revenue: 0 });

//   // --- Auth Handlers ---
//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (username === "admin" && password === "admin") {
//       setIsLoggedIn(true);
//       setLoginError("");
//     } else {
//       setLoginError("ভুল ইউজারনেম বা পাসওয়ার্ড");
//     }
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setUsername("");
//     setPassword("");
//   };

//   // --- Data Fetching ---
//   const fetchStats = async () => {
//     try {
//       const [oRes, pRes, rRes] = await Promise.all([
//         fetch("/api/admin/total-orders").then((res) => res.json()),
//         fetch("/api/admin/total-products").then((res) => res.json()),
//         fetch("/api/admin/total-revenue").then((res) => res.json()),
//       ]);
//       setStats({
//         orders: oRes.count || 0,
//         products: pRes.count || 0,
//         revenue: rRes.revenue || 0,
//       });
//     } catch (err) {
//       console.error("Stats load failed", err);
//     }
//   };

//   const fetchData = async () => {
//     try {
//       const res = await fetch("/api/orders");
//       const result = await res.json();
//       if (result.orders) {
//         setData(result.orders.filter((o) => o.status === activeTab));
//       }
//     } catch (err) {
//       console.error("Data load failed", err);
//     }
//   };

//   useEffect(() => {
//     if (isLoggedIn) {
//       fetchStats();
//       fetchData();
//     }
//   }, [activeTab, isLoggedIn]);

//   const handleUpdateStatus = async (id, newStatus) => {
//     const res = await fetch(`/api/orders/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ status: newStatus }),
//     });
//     if (res.ok) fetchData();
//   };

//   // --- Render Login Page ---
//   if (!isLoggedIn) {
//     return (
//       <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
//         <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8">
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-white mb-2">⚙️ অ্যাডমিন লগইন</h1>
//             <p className="text-slate-400">ড্যাশবোর্ডে প্রবেশ করতে লগইন করুন</p>
//           </div>
//           <form onSubmit={handleLogin} className="space-y-6">
//             <div>
//               <label className="block text-slate-300 font-medium mb-2">ইউজারনেম</label>
//               <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-slate-300 font-medium mb-2">পাসওয়ার্ড</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
//                 required
//               />
//             </div>
//             {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
//             <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all">
//               লগইন করুন
//             </button>
//           </form>
//           <div className="mt-6 text-center">
//             <Link href="/" className="text-slate-500 hover:text-white transition-colors">← হোম পেজে ফিরুন</Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // --- Render Dashboard ---
//   return (
//     <div className="p-8 bg-slate-950 min-h-screen text-white">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg transition-all"
//         >
//           লগআউট
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <StatsCard title="Total Orders" value={stats.orders} color="text-blue-400" />
//         <StatsCard title="Total Products" value={stats.products} color="text-green-400" />
//         <StatsCard title="Total Revenue" value={`৳${stats.revenue}`} color="text-purple-400" />
//       </div>

//       <TabList activeTab={activeTab} setActiveTab={setActiveTab} />

//       <OrderTable
//         data={data}
//         activeTab={activeTab}
//         onView={setSelectedOrder}
//         onUpdateStatus={handleUpdateStatus}
//       />

//       {selectedOrder && (
//         <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
//       )}
//     </div>
//   );
// }





// new code for Admin start
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import OrderDetailsModal from "../OrderDetailsModal/OrderDetailsModal";
import StatsCard from "./StatsCard";
import TabList from "./FilterTabs";
import OrderTable from "./OrderTable";

export default function Admin() {
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Dashboard State
  const [activeTab, setActiveTab] = useState("pending");
  const [data, setData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [stats, setStats] = useState({ orders: 0, products: 0, revenue: 0 });

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth === "true") {
      setIsLoggedIn(true);
    }
  }, []);

 
  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true);
      localStorage.setItem("adminAuth", "true"); // 🔥 IMPORTANT
      setLoginError("");
    } else {
      setLoginError("ভুল ইউজারনেম বা পাসওয়ার্ড");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("adminAuth"); // 🔥 IMPORTANT
    setUsername("");
    setPassword("");
  };

 
  const fetchStats = async () => {
    try {
      const [oRes, pRes, rRes] = await Promise.all([
        fetch("/api/admin/total-orders").then((res) => res.json()),
        fetch("/api/admin/total-products").then((res) => res.json()),
        fetch("/api/admin/total-revenue").then((res) => res.json()),
      ]);

      setStats({
        orders: oRes.count || 0,
        products: pRes.count || 0,
        revenue: rRes.revenue || 0,
      });
    } catch (err) {
      console.error("Stats load failed", err);
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch("/api/orders");
      const result = await res.json();

      if (result.orders) {
        setData(result.orders.filter((o) => o.status === activeTab));
      }
    } catch (err) {
      console.error("Data load failed", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchStats();
      fetchData();
    }
  }, [activeTab, isLoggedIn]);

  const handleUpdateStatus = async (id, newStatus) => {
    const res = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) fetchData();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8">

          <h1 className="text-3xl font-bold text-white text-center mb-6">
            ⚙️ অ্যাডমিন লগইন
          </h1>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-800 p-3 rounded text-white"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 p-3 rounded text-white"
            />

            {loginError && (
              <p className="text-red-500 text-sm">{loginError}</p>
            )}

            <button className="w-full bg-blue-600 py-3 rounded text-white font-bold">
              লগইন
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- DASHBOARD ---
  return (
    <div className="p-8 bg-slate-950 min-h-screen text-white">

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <div className="flex gap-3">
          <Link
            href="/AddProduct"
            className="bg-green-600 px-4 py-2 rounded"
          >
            Add Product
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatsCard title="Orders" value={stats.orders} />
        <StatsCard title="Products" value={stats.products} />
        <StatsCard title="Revenue" value={"৳" + stats.revenue} />
      </div>

      <TabList activeTab={activeTab} setActiveTab={setActiveTab} />

      <OrderTable
        data={data}
        activeTab={activeTab}
        onView={setSelectedOrder}
        onUpdateStatus={handleUpdateStatus}
      />

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
// new code for Admin end 