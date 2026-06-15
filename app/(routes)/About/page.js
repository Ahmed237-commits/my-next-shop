import Link from "next/link";

export default function About() {
  return (
    <section className="relative isolate py-16 sm:py-24">
      {/* خلفية زخرفية علوية (ناعمة) */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* قسم الصور (يظهر أولاً على الجوال، ثانياً على سطح المكتب) */}
          <div className="order-last grid grid-cols-2 gap-4 sm:gap-6 lg:order-first">
            {/* الصورة الأولى */}
            <div className="pt-12 sm:pt-16 lg:pt-24">
              <div className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100">
                <img
                  src="https://pagedone.io/asset/uploads/1717741205.png"
                  alt="Our team collaborating"
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
            {/* الصورة الثانية */}
            <div>
              <div className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100">
                <img
                  src="https://pagedone.io/asset/uploads/1717741215.png"
                  alt="Happy customer experience"
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* قسم النص والمحتوى */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="max-w-xl space-y-6">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                  Empowering Each Other to Succeed
                </h2>
                <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
                  Every project we&apos;ve undertaken has been a collaborative effort, where every person
                  involved has left their mark. Together, we&apos;ve not only delivered quality products but
                  also built enduring connections that define our success story.
                </p>
              </div>

              {/* إحصائيات */}
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:justify-start">
                {[
                  { value: "8", label: "Years of Excellence" },
                  { value: "25k+", label: "Happy Customers" },
                  { value: "99%", label: "Satisfaction Rate" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <div className="text-3xl font-bold text-indigo-600 sm:text-4xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* زر الدعوة للإجراء */}
              <div className="pt-4">
                <Link
                  href="/About"
                  className="group inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:scale-105 hover:bg-indigo-700 hover:shadow-indigo-300"
                >
                  Discover Our Story
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}