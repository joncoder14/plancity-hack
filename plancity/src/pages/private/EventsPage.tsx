
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { get } from "../../services/get";
import { post } from "../../services/post";
import { patch } from "../../services/patch";
import { remove } from "../../services/delete";
import type { Event, CreateEvent } from "../../types/Events";
import type { User } from "../../types/Users";

export default function EventsPage() {
  const { id } = useParams();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [selectedEditId, setSelectedEditId] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [showPatchModal, setShowPatchModal] = useState(false);

  const [removing, setRemoving] = useState(false);

  const storedUser = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  const [formData, setFormData] = useState<CreateEvent>({
    name: "",
    description: "",
    date: "",
    location: "",
    price: 0,
    capacity: 0,
    categoryId: id || "",
    images: [""],
  });

  const [formEditData, setFormEditData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    price: 0,
    capacity: 0,
    images: [""],
  });

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

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      categoryId: id || "",
    }));
  }, [id]);

  // =========================
  // CREATE EVENT
  // =========================

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!id) {
      alert("Category not found");
      return;
    }

    try {
      setCreating(true);

      const newEvent = await post<Event, CreateEvent>(
        "events",
        formData
      );

      setEvents((prev) => [...prev, newEvent]);

      setFormData({
        name: "",
        description: "",
        date: "",
        location: "",
        price: 0,
        capacity: 0,
        categoryId: id,
        images: [""],
      });

      alert("Event created successfully");
    } catch (error) {
      console.log(error);
      alert("Error creating event");
    } finally {
      setCreating(false);
    }
  }

  // =========================
  // OPEN EDIT MODAL
  // =========================

  function handleEdit(item: Event) {
    setSelectedEditId(item.id);

    setFormEditData({
      name: item.name ?? "",
      description: item.description ?? "",
      date: item.date ?? "",
      location: item.location ?? "",
      price: item.price ?? 0,
      capacity: item.capacity ?? 0,
      images: [item.images[0]?.url ?? ""],
    });

    setShowPatchModal(true);
  }

  // =========================
  // EDIT EVENT
  // =========================

  async function handlePatch(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!selectedEditId) return;

    try {
      setEditing(true);

      const updatedEvent = await patch<Event, typeof formEditData>(
        "events",
        formEditData,
        selectedEditId
      );

      setEvents((prev) =>
        prev.map((item) =>
          item.id === selectedEditId ? updatedEvent : item
        )
      );

      setShowPatchModal(false);
      setSelectedEditId(null);

      alert("Event edited successfully");
    } catch (error) {
      console.log(error);
      alert("Error editing event");
    } finally {
      setEditing(false);
    }
  }

  // =========================
  // DELETE EVENT
  // =========================

  async function handleDelete(eventId: string) {
    try {
      setRemoving(true);

      await remove("events", eventId);

      setEvents((prev) =>
        prev.filter((item) => item.id !== eventId)
      );

      alert("Event deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Error deleting event");
    } finally {
      setRemoving(false);
    }
  }

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 px-5 py-10">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10">
            <div className="h-5 w-32 animate-pulse rounded-full bg-white/10" />
            <div className="mt-4 h-10 w-72 animate-pulse rounded-lg bg-white/10" />
            <div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded-lg bg-white/10" />
          </div>

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

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

        {/* HEADER */}
        <header className="mb-10">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300">
            <span className="h-2 w-2 rounded-full bg-indigo-400" />
            Event management
          </div>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Events
                <span className="text-indigo-400"> Dashboard</span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                Manage, create and organize the events available in this
                category.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-center backdrop-blur-sm">
              <p className="text-2xl font-bold text-white">
                {events.length}
              </p>

              <p className="text-xs text-slate-400">
                {events.length === 1 ? "Event" : "Events"}
              </p>
            </div>

          </div>
        </header>

        {/* CREATE EVENT */}
        {user?.role === "admin" && (
          <section className="mb-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm">

            <div className="border-b border-white/10 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-xl">
                  +
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Create new event
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Add a new event to this category.
                  </p>
                </div>

              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-6 sm:p-8"
            >

              {/* Name + Location */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Event name
                  </label>

                  <input
                    type="text"
                    value={formData.name}
                    maxLength={150}
                    placeholder="Enter event name"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Location
                  </label>

                  <input
                    type="text"
                    value={formData.location}
                    maxLength={200}
                    placeholder="Where will it take place?"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    required
                  />
                </div>

              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Description
                </label>

                <textarea
                  value={formData.description}
                  placeholder="Describe your event..."
                  rows={4}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  className="w-full resize-none rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  required
                />
              </div>

              {/* Date / Price / Capacity */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Date
                  </label>

                  <input
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        date: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Price
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Capacity
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        capacity: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    required
                  />
                </div>

              </div>

              {/* Image */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Image URL
                </label>

                <input
                  type="url"
                  value={formData.images[0]}
                  placeholder="https://example.com/image.jpg"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      images: [e.target.value],
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={creating}
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:from-indigo-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {creating ? "Creating event..." : "+ Create event"}
              </button>

            </form>
          </section>
        )}

        {/* EVENTS HEADER */}
        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold text-white">
              Available events
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {events.length === 0
                ? "No events available"
                : "Manage the events in this category"}
            </p>
          </div>

        </div>

        {/* EMPTY */}
        {events.length === 0 ? (
          <section className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-6 text-center">

            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 text-2xl">
              📅
            </div>

            <h2 className="text-xl font-semibold text-white">
              No events found
            </h2>

            <p className="mt-2 max-w-md text-sm text-slate-400">
              There are currently no events in this category.
              {user?.role === "admin" &&
                " Use the form above to create one."}
            </p>

          </section>
        ) : (

          /* EVENT CARDS */
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {events.map((event) => (

              <article
                key={event.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-indigo-950/40"
              >

                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-slate-900">

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

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />

                  {/* Price */}
                  <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-slate-950/80 px-3 py-1.5 text-sm font-bold text-white backdrop-blur-md">
                    ${event.price}
                  </div>

                  {/* Event badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="rounded-full bg-indigo-600/90 px-3 py-1 text-xs font-semibold text-white">
                      Event
                    </span>
                  </div>

                </div>

                {/* Content */}
                <div className="p-6">

                  <h3 className="line-clamp-1 text-xl font-semibold text-white group-hover:text-indigo-300">
                    {event.name}
                  </h3>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
                    {event.description}
                  </p>

                  {/* Info */}
                  <div className="mt-5 space-y-3 border-t border-white/10 pt-5">

                    <div className="flex gap-3">
                      <span className="text-indigo-400">
                        📍
                      </span>

                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-600">
                          Location
                        </p>

                        <p className="text-sm text-slate-300">
                          {event.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <span className="text-indigo-400">
                        📅
                      </span>

                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-600">
                          Date
                        </p>

                        <p className="text-sm text-slate-300">
                          {new Date(event.date).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <span className="text-indigo-400">
                        👥
                      </span>

                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-600">
                          Capacity
                        </p>

                        <p className="text-sm text-slate-300">
                          {event.capacity} people
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* ADMIN ACTIONS */}
                  {user?.role === "admin" && (
                    <div className="mt-6 flex gap-3">

                      <button
                        onClick={() => handleEdit(event)}
                        className="flex-1 rounded-xl border border-indigo-500/30 bg-indigo-500/10 py-2.5 text-sm font-semibold text-indigo-300 transition hover:bg-indigo-500 hover:text-white"
                      >
                        Edit
                      </button>

                      <button
                        disabled={removing}
                        onClick={() => handleDelete(event.id)}
                        className="flex-1 rounded-xl border border-red-500/20 bg-red-500/10 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {removing ? "Deleting..." : "Delete"}
                      </button>

                    </div>
                  )}

                </div>
              </article>
            ))}
          </section>
        )}

      </div>

      {/* =========================
          EDIT MODAL
      ========================= */}

      {showPatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-8 backdrop-blur-sm">

          <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">

            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

              <div>
                <h2 className="text-xl font-bold text-white">
                  Edit event
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update the information of this event.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPatchModal(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>

            </div>

            {/* Modal form */}
            <form
              onSubmit={handlePatch}
              className="max-h-[75vh] space-y-5 overflow-y-auto p-6"
            >

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Event name
                </label>

                <input
                  type="text"
                  required
                  value={formEditData.name}
                  onChange={(e) =>
                    setFormEditData({
                      ...formEditData,
                      name: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Description
                </label>

                <textarea
                  rows={4}
                  value={formEditData.description}
                  onChange={(e) =>
                    setFormEditData({
                      ...formEditData,
                      description: e.target.value,
                    })
                  }
                  className="w-full resize-none rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>

              {/* Date + Location */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Date
                  </label>

                  <input
                    type="datetime-local"
                    required
                    value={formEditData.date}
                    onChange={(e) =>
                      setFormEditData({
                        ...formEditData,
                        date: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Location
                  </label>

                  <input
                    type="text"
                    required
                    value={formEditData.location}
                    onChange={(e) =>
                      setFormEditData({
                        ...formEditData,
                        location: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>

              </div>

              {/* Price + Capacity */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Price
                  </label>

                  <input
                    type="number"
                    min="0"
                    required
                    value={formEditData.price}
                    onChange={(e) =>
                      setFormEditData({
                        ...formEditData,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Capacity
                  </label>

                  <input
                    type="number"
                    min="1"
                    required
                    value={formEditData.capacity}
                    onChange={(e) =>
                      setFormEditData({
                        ...formEditData,
                        capacity: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>

              </div>

              {/* Image */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Image URL
                </label>

                <input
                  type="url"
                  value={formEditData.images[0]}
                  onChange={(e) =>
                    setFormEditData({
                      ...formEditData,
                      images: [e.target.value],
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>

              {/* Editing status */}
              {editing && (
                <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-3 text-sm text-indigo-300">
                  Saving changes...
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => setShowPatchModal(false)}
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={editing}
                  className="rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:from-indigo-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {editing ? "Saving..." : "Save changes"}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}
    </main>
  );
}

