"use client";
import { useState , useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  UserIcon,
  ShoppingBagIcon,
  HeartIcon,
  GiftIcon,
  ArrowRightIcon,
  ClockIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  MagnifyingGlassIcon,
  BellIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useData } from "../context/dataContext";
export default function Dashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsCount, setNotificationsCount] = useState(0);

  const userStats = [
    { label: "Total Orders", value: "0", icon: ShoppingBagIcon, gradient: "from-indigo-500 to-blue-600" },
    { label: "Wishlist", value: "0", icon: HeartIcon, gradient: "from-pink-500 to-rose-600" },
    { label: "Reward Points", value: "0", icon: GiftIcon, gradient: "from-amber-500 to-orange-600" },
  ];

  const chartData = [
    { name: "Jan", orders: 0 },
    { name: "Feb", orders: 0 },
    { name: "Mar", orders: 0 },
    { name: "Apr", orders: 0 },
    { name: "May", orders: 0 },
    { name: "Jun", orders: 0 },
  ];
const {data , setData} = useData();

useEffect(() => {
  const addTheSessionData = async () => {
    const response = await fetch("http://localhost:8000/api/me", {
      credentials: "include",
    });

    const data = await response.json();
const theUserInfo = data.user;
setData({name:theUserInfo.name , email:theUserInfo.email , role:theUserInfo.role})
if (!data.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1>Please login first</h1>
      </div>
    );
  }
};

  addTheSessionData();
}, []);
const user = { 
  name: data['name'], 
  image: data['image']
  };
const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      router.push("/login");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    alert(`Searching for: ${searchQuery}...`);
  };

  const handleNotificationsClick = () => {
    if (notificationsCount === 0) {
      alert("You have no new notifications.");
    } else {
      alert("Opening notifications...");
      setNotificationsCount(0);
    }
  };

  const handleBrowseMore = () => {
    router.push("/Products");
  };
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* شريط جانبي (سطح المكتب) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-60 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200 z-30">
        <div className="flex items-center h-16 px-6 border-b border-gray-100">
          <Link href="/" className="text-xl font-black text-gray-900 tracking-tighter">
            My<span className="text-indigo-600">Shop</span>.
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {[
            { name: "Dashboard", href: "/dashboard", icon: UserIcon, active: true },
            { name: "My Orders", href: "/orders", icon: ShoppingBagIcon },
            { name: "Wishlist", href: "/wishlist", icon: HeartIcon },
            { name: "Profile", href: "/profile", icon: Cog6ToothIcon },
          ].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                link.active
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <link.icon className="h-5 w-5" />
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* قائمة الجوال */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-64 bg-white shadow-xl flex flex-col"
          >
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
              <Link href="/" className="text-xl font-black text-gray-900">
                My<span className="text-indigo-600">Shop</span>.
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="p-1 text-gray-500">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-1">
              {[
                { name: "Dashboard", href: "/dashboard", icon: UserIcon, active: true },
                { name: "My Orders", href: "/orders", icon: ShoppingBagIcon },
                { name: "Wishlist", href: "/wishlist", icon: HeartIcon },
                { name: "Profile", href: "/profile", icon: Cog6ToothIcon },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold ${
                    link.active ? "bg-indigo-50 text-indigo-600" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <link.icon className="h-5 w-5" />
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-gray-100">
              <button onClick={handleLogout} className="flex items-center gap-2 w-full px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl">
                <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                Logout
              </button>
            </div>
          </motion.aside>
        </div>
      )}

      {/* المحتوى الرئيسي */}
      <div className="flex-1 lg:pl-60">
        {/* شريط علوي */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex-1 max-w-md ml-4 hidden sm:block">
              <form onSubmit={handleSearch} className="relative">
                <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600">
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search orders..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
                />
              </form>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={handleNotificationsClick} className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <BellIcon className="h-6 w-6" />
                {notificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white" />
                )}
              </button>

              {/* 2. عرض صورة السيشن بشكل ديناميكي مع الاحتياط البديل */}
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-9 w-9 rounded-full object-cover shadow-sm ring-2 ring-indigo-100 cursor-pointer hover:opacity-90 transition-opacity"
                  onError={(e) => {
                    // إذا فشل تحميل رابط الصورة من السيشن لأي سبب، يتم إخفاؤها واستخدام البديل النصي
                    const img = e.currentTarget as HTMLImageElement;
                    img.style.display = 'none';
                  }}
                />
              ) : (
                <div className="h-9 w-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-sm cursor-pointer hover:opacity-90 transition-opacity">
                  {user.name?.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* جسم الصفحة */}
        <main className="p-4 sm:p-6 lg:p-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Welcome {data['name']} 👋</h1>
            <p className="text-gray-500 mt-1">Your store journey starts here. Let's make your first order!</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {userStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* قسم الرسم البياني */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-8"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-6">Orders Overview (Last 6 Months)</h2>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dx={-10} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="orders" stroke="#4F46E5" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* جدول الطلبات */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <InboxIcon className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-gray-900 font-bold mb-1">No Orders Yet</h3>
                <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">
                  You haven't placed any orders yet. Start shopping to see your history here!
                </p>
                <button onClick={handleBrowseMore} className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-indigo-500 transition-colors">
                  Start Shopping
                </button>
              </div>
            </motion.div>

            {/* التوصيات */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recommended for You</h2>
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-3">
                  <SparklesIcon className="h-6 w-6 text-indigo-400" />
                </div>
                <p className="text-gray-500 text-sm mb-4">
                  We need to know you better! View some products to get personalized recommendations.
                </p>
              </div>
              <button onClick={handleBrowseMore} className="mt-auto w-full py-2.5 text-sm font-bold text-indigo-600 border border-indigo-200 rounded-xl hover:bg-indigo-50 transition-colors">
                Browse Products
              </button>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SparklesIcon(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}