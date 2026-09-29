export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 py-10">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900"> Plan Ciyt </h2>
                        <p className="mt-1 text-sm text-gray-500"> Plan smarter. Build better. </p>
                    </div> <nav className="flex gap-6 text-sm text-gray-600">
                        <a href="#" className="transition hover:text-indigo-600"> About </a>
                        <a href="#" className="transition hover:text-indigo-600"> Contact </a>
                        <a href="#" className="transition hover:text-indigo-600"> Privacy </a>
                        <a href="#" className="transition hover:text-indigo-600"> Terms </a>
                    </nav>
                </div>
                <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-400"> © 2026 Plan Ciyt. All rights reserved. </div>
            </div>
        </footer>);
}
