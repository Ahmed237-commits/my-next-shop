'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const BACKEND_URL = 'http://localhost:8000/api/auth';

    // 📝 الـ Submit العادي للفورم
    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await fetch(`${BACKEND_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, bio }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(data.message || 'Account created successfully! 🎉');
                setTimeout(() => { router.push('/login'); }, 2000);
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Unable to connect to the server. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // 🌐 تسجيل الحساب أو الدخول بواسطة Google
    const handleGoogleSignUp = () => {
        setError('');
        setSuccess('');

        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID; 
        const redirectUri = window.location.origin + "/signUp"; 
        const scope = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
        
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${encodeURIComponent(scope)}`;

        const popup = window.open(authUrl, "_blank", "width=500,height=600");

        const checkPopup = setInterval(async () => {
            if (!popup || popup.closed) {
                clearInterval(checkPopup);
                return;
            }

            try {
                const currentUrl = popup.location.href;
                if (currentUrl.includes("access_token=")) {
                    clearInterval(checkPopup);
                    
                    const hash = popup.location.hash;
                    const params = new URLSearchParams(hash.replace("#", "?"));
                    const accessToken = params.get("access_token");

                    popup.close();

                    if (accessToken) {
                        setLoading(true);
                        // إرسال التوكين لإندبوينت الـ oauth المشتركة
                        const res = await fetch(`${BACKEND_URL}/oauth`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ accessToken, provider: "google" })
                        });

                        const data = await res.json();

                        if (data.success) {
                            setSuccess("Authenticated via Google successfully! 🚀");
                            localStorage.setItem('token', data.token); // حفظ الـ JWT
                            setTimeout(() => { router.push('/dashboard'); }, 1500);
                        } else {
                            setError(data.message || "Google registration failed");
                        }
                        setLoading(false);
                    }
                }
            } catch (e) {}
        }, 500);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg border border-gray-200">
                
                <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">Create Your Account</h2> 

                {error && <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-4 text-sm font-semibold text-red-800">{error}</div>}
                {success && <div className="mb-4 rounded-lg bg-green-50 border border-green-200 p-4 text-sm font-semibold text-green-800">{success}</div>}

                <form onSubmit={handleSignUp} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-800 mb-1">Full Name</label>
                        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border-2 border-gray-300 bg-white p-3 text-gray-900 font-medium placeholder-gray-400 focus:border-blue-600 focus:outline-none transition" placeholder="John Doe" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-800 mb-1">Email Address</label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border-2 border-gray-300 bg-white p-3 text-gray-900 font-medium placeholder-gray-400 focus:border-blue-600 focus:outline-none transition" placeholder="name@example.com" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-800 mb-1">Password</label>
                        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border-2 border-gray-300 bg-white p-3 text-gray-900 font-medium placeholder-gray-400 focus:border-blue-600 focus:outline-none transition" placeholder="••••••••" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-800 mb-1">Bio (Optional)</label>
                        <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full rounded-lg border-2 border-gray-300 bg-white p-3 text-gray-900 font-medium placeholder-gray-400 focus:border-blue-600 focus:outline-none transition" placeholder="Tell us about yourself..." rows={2} />
                    </div>

                    <button
                        type="submit" disabled={loading}
                        className="w-full rounded-lg bg-blue-600 px-5 py-3 text-center text-base font-bold text-white hover:bg-blue-700 active:bg-blue-800 focus:outline-none transition disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </button>
                </form>

                {/* 🔘 فاصل خطي */}
                <div className="my-5 flex items-center justify-between">
                    <span className="w-1/5 border-b border-gray-300"></span>
                    <span className="text-xs text-gray-400 uppercase font-medium">Or Sign Up with</span>
                    <span className="w-1/5 border-b border-gray-300"></span>
                </div>

                {/* 🔴 زرار جوجل المدمج */}
                <button
                    type="button" onClick={handleGoogleSignUp} disabled={loading}
                    className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-gray-200 bg-white py-3 font-bold text-gray-700 transition hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 cursor-pointer"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.68 1.54 14.98 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.89 3.02C6.21 7.62 8.87 5.04 12 5.04z"/>
                        <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.43h6.46c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.39-4.88 3.39-8.48z"/>
                        <path fill="#FBBC05" d="M5.28 14.71c-.24-.71-.37-1.47-.37-2.26s.13-1.55.37-2.26L1.39 7.17C.5 8.94 0 10.91 0 13s.5 4.06 1.39 5.83l3.89-3.12z"/>
                        <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.66-2.84c-1.01.68-2.31 1.09-3.96 1.09-3.13 0-5.79-2.58-6.72-5.54l-3.89 3.02C3.37 20.33 7.35 23 12 23z"/>
                    </svg>
                    Sign up with Google
                </button>

                <p className="mt-4 text-center text-sm font-medium text-gray-700">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-600 font-bold hover:underline">Sign In</a>
                </p>
            </div>
        </div>
    );
}