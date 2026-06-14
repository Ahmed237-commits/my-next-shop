'use client';
import { useState } from 'react';

export default function AddToCartButton({ product }) {
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault(); // منع الصفحة من إعادة التحميل
        setIsAdding(true);

        // 1. هنا تحط منطق الـ Cart بتاعك (مثال: حفظ في LocalStorage)
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // التأكد إذا كان المنتج مضاف مسبقاً لزيادة الكمية أو إضافته كمنتج جديد
        const existingProductIndex = currentCart.findIndex(item => item.id === product.id);
        
        if (existingProductIndex > -1) {
            currentCart[existingProductIndex].quantity += 1;
        } else {
            currentCart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.images[0],
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(currentCart));

        // 2. عمل تأثير بصري بسيط للمستخدم عند الضغط
        alert(`تم إضافة ${product.title} إلى السلة بنجاح! 🎉`);
        
        setTimeout(() => {
            setIsAdding(false);
        }, 500);
    };

    return (
        <form onSubmit={handleAddToCart} className="mt-10">
            <button
                type="submit"
                disabled={isAdding}
                className={`mt-10 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors
                    ${isAdding ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'}
                `}
            >
                {isAdding ? 'Adding...' : 'Add to bag'}
            </button>
        </form>
    );
}