import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
export default function Header() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <header className="w-full border-b border-gray-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <h1
                   
                    className="text-2xl font-bold tracking-tight text-gray-900"
                >
                    Plan City
                </h1>

                <nav className="flex items-center gap-8">
                   

                    <Link
                        to="/categories"
                        className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
                    >
                        Categories
                    </Link>

                    <Link
                        to="/favorites"
                        className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
                    >
                        Favorites
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                    >
                        Log out
                    </button>
                </nav>
            </div>
        </header>
    );
}