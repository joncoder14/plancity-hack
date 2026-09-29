
import { useEffect, useState } from "react";
import { get } from "../../services/get";
import type { Category } from "../../types/Categories";
import { useNavigate } from "react-router";

function CategoryPage() {
  const [category, setCategory] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await get<Category[]>("categories");
        setCategory(categories);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

        {/* Header */}
        <header className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300">
            <span className="h-2 w-2 rounded-full bg-indigo-400" />
            Explore categories
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Discover
            <span className="text-indigo-400"> Categories</span>
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Explore our available categories and find the events that interest
            you.
          </p>
        </header>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-48 animate-pulse rounded-2xl border border-white/10 bg-white/5"
              />
            ))}
          </div>
        ) : category.length === 0 ? (
          /* Empty state */
          <section className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-6 text-center backdrop-blur-sm">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 text-2xl">
              📂
            </div>

            <h2 className="text-xl font-semibold text-white">
              No categories available
            </h2>

            <p className="mt-2 max-w-md text-sm text-slate-400">
              There are currently no categories to display. Please try again
              later.
            </p>
          </section>
        ) : (
          /* Categories */
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {category.map((item, index) => (
              <article
                key={item.id}
                onClick={() => navigate(`/publicsevents/${item.id}`)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-indigo-950/40"
              >
                {/* Number */}
                <div className="mb-6 flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-sm font-bold text-indigo-400 transition group-hover:bg-indigo-500 group-hover:text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-slate-600 transition group-hover:text-indigo-400">
                    →
                  </span>
                </div>

                {/* Content */}
                <h2 className="text-xl font-semibold text-white transition group-hover:text-indigo-300">
                  {item.name}
                </h2>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
                  {item.description}
                </p>

                {/* Bottom action */}
                <div className="mt-6 flex items-center text-sm font-medium text-indigo-400">
                  View events
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>

                {/* Hover decoration */}
                <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl transition group-hover:bg-indigo-500/20" />
              </article>
            ))}
          </section>
        )}

        {/* Footer information */}
        {!loading && category.length > 0 && (
          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
            <p className="text-xs text-slate-500">
              {category.length}{" "}
              {category.length === 1 ? "category" : "categories"} available
            </p>

            <p className="text-xs text-slate-600">
              Select a category to continue
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default CategoryPage;

