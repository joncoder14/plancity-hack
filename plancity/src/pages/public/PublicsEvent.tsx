
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { get } from "../../services/get";
import type { Event } from "../../types/Events";

export default function PublicsEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await get<Event[]>("events");

        const filteredEvents = data.filter(
          (event) => event.categoryId === id
        );

        setEvents(filteredEvents);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Header skeleton */}
          <div className="mb-10">
            <div className="mb-4 h-5 w-32 animate-pulse rounded-full bg-white/10" />
            <div className="h-10 w-72 animate-pulse rounded-lg bg-white/10" />
            <div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded-lg bg-white/10" />
          </div>

          {/* Cards skeleton */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <div className="h-52 animate-pulse bg-white/10" />

                <div className="space-y-4 p-6">
                  <div className="h-6 w-3/4 animate-pulse rounded bg-white/10" />
                  <div className="h-4 w-full animate-pulse rounded bg-white/10" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-indigo-400/30 hover:bg-white/10 hover:text-white"
        >
          <span>←</span>
          Back to categories
        </button>

        {/* Header */}
        <header className="mb-10">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300">
            <span className="h-2 w-2 rounded-full bg-indigo-400" />
            Upcoming events
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Discover
                <span className="text-indigo-400"> Events</span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                Find events, discover new experiences and choose the ones
                that interest you.
              </p>
            </div>

            {/* Event count */}
            {events.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-center backdrop-blur-sm">
                <p className="text-2xl font-bold text-white">
                  {events.length}
                </p>

                <p className="text-xs text-slate-400">
                  {events.length === 1 ? "event" : "events"}
                </p>
              </div>
            )}

          </div>
        </header>

        {/* Empty state */}
        {events.length === 0 ? (
          <section className="flex min-h-96 flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-6 text-center backdrop-blur-sm">

            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-800 text-3xl">
              📅
            </div>

            <h2 className="text-2xl font-semibold text-white">
              No events found
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
              There are currently no events available in this category.
              Check another category to discover more events.
            </p>

            <button
              onClick={() => navigate("/categories")}
              className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 hover:shadow-xl"
            >
              Explore categories
            </button>

          </section>
        ) : (

          /* Events */
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {events.map((event) => (

              <article
                key={event.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-indigo-950/40"
              >

                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-slate-900">

                  {event.images.length > 0 ? (
                    <img
                      src={event.images[0].url}
                      alt={event.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                      <span className="text-4xl opacity-40">
                        🎟️
                      </span>
                    </div>
                  )}

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Price badge */}
                  <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-slate-950/80 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-md">
                    ${event.price}
                  </div>

                  {/* Event label */}
                  <div className="absolute bottom-4 left-4">
                    <span className="rounded-full bg-indigo-600/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      Event
                    </span>
                  </div>

                </div>

                {/* Content */}
                <div className="p-6">

                  <h2 className="line-clamp-1 text-xl font-semibold text-white transition group-hover:text-indigo-300">
                    {event.name}
                  </h2>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
                    {event.description}
                  </p>

                  {/* Event information */}
                  <div className="mt-5 space-y-3 border-t border-white/10 pt-5">

                    {/* Location */}
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-indigo-400">
                        📍
                      </span>

                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Location
                        </p>

                        <p className="mt-0.5 text-sm text-slate-300">
                          {event.location}
                        </p>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-indigo-400">
                        📅
                      </span>

                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Date
                        </p>

                        <p className="mt-0.5 text-sm text-slate-300">
                          {new Date(event.date).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Capacity */}
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-indigo-400">
                        👥
                      </span>

                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          Capacity
                        </p>

                        <p className="mt-0.5 text-sm text-slate-300">
                          {event.capacity} people
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Action */}
                  <button
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    View event
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </button>

                </div>
              </article>
            ))}
          </section>
        )}

      </div>
    </main>
  );
}

