



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
    <div className="p-4 md:p-8 bg-slate-950 min-h-screen text-white">
      {/* Header section adjusted for mobile wrap */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Admin Dashboard</h1>

        <div className="flex gap-2">
          <Link
            href="/AddProduct"
            className="bg-green-600 px-3 md:px-4 py-2 rounded text-sm md:text-base"
          >
            Add Product
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 px-3 md:px-4 py-2 rounded text-sm md:text-base"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Grid responsive adjustment: 1 column on mobile, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
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