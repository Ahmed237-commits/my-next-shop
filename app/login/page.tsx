'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const BACKEND_URL = 'http://localhost:8000/api/auth';

    // 🔐 تسجيل الدخول العادي بالبريد والباسورد
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await fetch(`${BACKEND_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // 🔥 إجبار المتصفح على استقبال وحفظ الكوكيز المرسلة من السيرفر
                credentials: 'include', 
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(data.message || 'Login successful!');
                // 🚫 تمت إزالة الـ localStorage هنا لأن التوكن بيتحفظ تلقائياً في الكوكيز الآن
                setTimeout(() => { router.push('/dashboard'); }, 1500);
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('Unable to connect to the server. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // 🌐 تسجيل الدخول بواسطة Google بدون مكتبات خارجيّة
    const handleGoogleLogin = () => {
        setError('');
        setSuccess('');

        // 1. إعدادات طلب OAuth من جوجل مباشرة للـ Implicit Flow (بيرجع access_token)
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID; 
        const redirectUri = window.location.origin + "/login"; 
        const scope = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
        
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${encodeURIComponent(scope)}`;

        // 2. فتح نافذة تسجيل دخول جوجل
        const popup = window.open(authUrl, "_blank", "width=500,height=600");

        // 3. مراقبة الرابط لمسك الـ access_token لما يرجع
        const checkPopup = setInterval(async () => {
            if (!popup || popup.closed) {
                clearInterval(checkPopup);
                return;
            }

            try {
                const currentUrl = popup.location.href;
                if (currentUrl.includes("access_token=")) {
                    clearInterval(checkPopup);
                    
                    // استخراج التوكين من الرابط
                    const hash = popup.location.hash;
                    const params = new URLSearchParams(hash.replace("#", "?"));
                    const accessToken = params.get("access_token");

                    popup.close(); // قفل النافذة

                    if (accessToken) {
                        setLoading(true);
                        // إرسال التوكين إلى سيرفر Express بتاعك للتحقق والـ JWT
                        const res = await fetch(`${BACKEND_URL}/oauth`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            // 🔥 إجبار المتصفح على استقبال وحفظ الكوكيز المرسلة من السيرفر عند الـ OAuth أيضاً
                            credentials: 'include', 
                            body: JSON.stringify({ accessToken, provider: "google" })
                        });

                        const data = await res.json();

                        if (data.success) {
                            setSuccess(data.message || "Logged in with Google successfully! 🚀");
                            // 🚫 تمت إزالة الـ localStorage هنا أيضاً
                            setTimeout(() => { router.push('/dashboard'); }, 1500);
                        } else {
                            setError(data.message || "Google authentication failed on server");
                        }
                        setLoading(false);
                    }
                }
            } catch (e) {
                // الكاتش دي طبيعية عشان الـ Cross-Origin لحد ما يرجع للدومين بتاعك
            }
        }, 500);
    };

    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          
          <h2 className="mb-2 text-center text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mb-6 text-center text-sm text-gray-500">Sign in to your HealthyLife account</p>

          {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">{error}</div>}
          {success && <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-600">{success}</div>}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* 🔘 فاصل خطي */}
          <div className="my-6 flex items-center justify-between">
            <span className="w-1/5 border-b border-gray-300"></span>
            <span className="text-xs text-gray-400 uppercase font-medium">Or continue with</span>
            <span className="w-1/5 border-b border-gray-300"></span>
          </div>

          {/* 🔴 زرار جوجل المدمج */}
          <button
            type="button" onClick={handleGoogleLogin} disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-gray-200 bg-white py-3 font-semibold text-gray-700 transition hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 cursor-pointer"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.68 1.54 14.98 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.89 3.02C6.21 7.62 8.87 5.04 12 5.04z"/>
              <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.43h6.46c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.39-4.88 3.39-8.48z"/>
              <path fill="#FBBC05" d="M5.28 14.71c-.24-.71-.37-1.47-.37-2.26s.13-1.55.37-2.26L1.39 7.17C.5 8.94 0 10.91 0 13s.5 4.06 1.39 5.83l3.89-3.12z"/>
              <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.66-2.84c-1.01.68-2.31 1.09-3.96 1.09-3.13 0-5.79-2.58-6.72-5.54l-3.89 3.02C3.37 20.33 7.35 23 12 23z"/>
            </svg>
            Sign in with Google
          </button>

        </div>
      </div>
    );
}