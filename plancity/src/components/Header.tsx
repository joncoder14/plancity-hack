import { Link } from "react-router";

function Header() {
    return (
        <header className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900"> Plan City </h1>
                <nav className="flex items-center gap-3">
                    <Link
                        to="/"
                        className="rounded-xl px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
                    >
                        Categories
                    </Link>

                    <Link
                        to="/login"
                        className="rounded-xl px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
                    >
                        Sign In
                    </Link>

                    <Link
                        to="/register"
                        className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Sign Up
                    </Link>
                </nav>
            </div>
        </header>
    )

}

export default Header