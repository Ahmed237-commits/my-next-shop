'use client'; // ضروري عشان نقدر نقرأ من الـ localStorage ونعدل الكميات

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BagPage() {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // تحميل المنتجات من الـ localStorage عند فتح الصفحة
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(savedCart);
        setIsLoading(false);
    }, []);

    // تحديث الكمية (زيادة أو نقصان)
    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return; // منع الكمية تقل عن 1
        
        const updatedCart = cartItems.map(item => 
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // حذف منتج من السلة
    const removeItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // حساب إجمالي الحساب للمنتجات
    const totalCartPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    if (isLoading) {
        return <div className="text-center py-20 text-xl font-medium">Loading your bag...</div>;
    }

    return (
        <div className="bg-gray-55 min-h-screen py-12">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Shopping Bag</h1>

                {cartItems.length === 0 ? (
                    // حالة السلة فاضية
                    <div className="text-center py-16 bg-white rounded-lg shadow-sm p-8">
                        <p className="text-lg text-gray-500 mb-6">Your bag is empty.</p>
                        <Link href="/Products" className="inline-flex items-center rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    // عرض المنتجات في السلة
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
                        {/* قائمة المنتجات */}
                        <div className="lg:col-span-7 bg-white rounded-lg shadow-sm p-6 space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex py-6 border-b border-gray-200 last:border-0">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            width={100}
                                            height={100}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>{item.title}</h3>
                                                <p className="ml-4">${item.price * item.quantity}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">${item.price} each</p>
                                        </div>

                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            {/* أزرار التحكم في الكمية */}
                                            <div className="flex items-center border border-gray-300 rounded-md">
                                                <button 
                                                    type="button"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                                                >
                                                    -
                                                </button>
                                                <span className="px-3 py-1 text-gray-900 font-medium">{item.quantity}</span>
                                                <button 
                                                    type="button"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* زر الحذف */}
                                            <button
                                                type="button"
                                                onClick={() => removeItem(item.id)}
                                                className="font-medium text-red-600 hover:text-red-500"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ملخص الحساب ودفع الفاتورة */}
                        <div className="lg:col-span-5 bg-white rounded-lg shadow-sm p-6 h-fit">
                            <h2 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-4">Order Summary</h2>
                            <div className="mt-6 space-y-4">
                                <div className="flex items-center justify-between text-sm text-gray-600">
                                    <p>Subtotal</p>
                                    <p>${totalCartPrice}</p>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-600">
                                    <p>Shipping estimate</p>
                                    <p className="text-green-600 font-medium">Free</p>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-base font-medium text-gray-900">
                                    <p>Order total</p>
                                    <p>${totalCartPrice}</p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    onClick={() => alert('Proceeding to checkout... 🚀')}
                                    className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}