import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }) {
    return (
        <Link href={`/Products/${product.id}`} className="group">
            <div className="relative overflow-hidden rounded-2xl bg-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Image Container */}
                <div className="aspect-square w-full overflow-hidden bg-white">
                    <Image
                        src={product.images[0]}
                        alt={product.title}
                        width={400}
                        height={400}
                        className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                {/* Content */}
                <div className="p-5 bg-white">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                            {product.category}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                            {product.title}
                        </h3>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Price</span>
                            <span className="text-xl font-extrabold text-gray-900">${product.price}</span>
                        </div>
                        <div className="rounded-full bg-indigo-50 p-2 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Discount Badge if available */}
                {product.discountPercentage > 0 && (
                    <div className="absolute top-4 left-4 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                        -{Math.round(product.discountPercentage)}%
                    </div>
                )}
            </div>
        </Link>
    );
}
