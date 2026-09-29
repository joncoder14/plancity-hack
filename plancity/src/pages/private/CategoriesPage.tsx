import { useEffect, useState } from "react"
import { get } from "../../services/get"
import type { User } from "../../types/Users"
import type {
    Category,
    CreateCategory,
    EditCategory,
} from "../../types/Categories"
import { post } from "../../services/post"
import { patch } from "../../services/patch"
import { remove } from "../../services/delete"
import { useNavigate } from "react-router"

function CategoryPage() {
    const [category, setCategory] = useState<Category[]>([])
    const [selectedEditId, setSelectedEditId] = useState<string | null>(null)

    const [loading, setLoading] = useState(true)
    const [creating, setCreating] = useState(false)
    const [editing, setEditing] = useState(false)
    const [removing, setRemoving] = useState(false)

    const [showModal, setShowModal] = useState(false)
    const [showPatchModal, setShowPatchModal] = useState(false)

    const storedUser = localStorage.getItem("user")
    const user: User | null = storedUser ? JSON.parse(storedUser) : null

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        description: "",
    })

    const [formEditData, setFormEditData] = useState({
        name: "",
        description: "",
    })

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true)

                const categories = await get<Category[]>("categories")
                setCategory(categories)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            setCreating(true)

            const newCategory = await post<Category, CreateCategory>(
                "categories",
                formData
            )

            setCategory((prev) => [...prev, newCategory])

            setShowModal(false)

            setFormData({
                name: "",
                description: "",
            })
        } catch (error) {
            console.log(error)
            alert("Error creating category")
        } finally {
            setCreating(false)
        }
    }

    function handleEdit(item: Category) {
        setSelectedEditId(item.id)

        setFormEditData({
            name: item.name ?? "",
            description: item.description ?? "",
        })

        setShowPatchModal(true)
    }

    async function handlePatch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!selectedEditId) return

        try {
            setEditing(true)

            const updatedCategory = await patch<Category, EditCategory>(
                "categories",
                formEditData,
                selectedEditId
            )

            setCategory((prev) =>
                prev.map((item) =>
                    item.id === selectedEditId ? updatedCategory : item
                )
            )

            setShowPatchModal(false)
            setSelectedEditId(null)
        } catch (error) {
            console.log(error)
            alert("Error editing category")
        } finally {
            setEditing(false)
        }
    }

    async function handleDelete(id: string) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this category?"
        )

        if (!confirmed) return

        try {
            setRemoving(true)

            await remove("categories", id)

            setCategory((prev) =>
                prev.filter((item) => item.id !== id)
            )
        } catch (error) {
            console.log(error)
            alert("Error deleting category")
        } finally {
            setRemoving(false)
        }
    }

    function closeCreateModal() {
        if (creating) return

        setShowModal(false)

        setFormData({
            name: "",
            description: "",
        })
    }

    function closeEditModal() {
        if (editing) return

        setShowPatchModal(false)
        setSelectedEditId(null)
    }

    return (
        <main className="min-h-screen bg-slate-950 text-white relative overflow-hidden">

            {/* Decorative background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm">
                            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                            Event Management
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                            Categories
                        </h1>

                        <p className="text-slate-400 mt-2 max-w-xl">
                            Organize and manage the categories available
                            for your events.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">

                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-2xl font-bold text-white">
                                {category.length}
                            </span>

                            <span className="text-xs text-slate-500">
                                Total categories
                            </span>
                        </div>

                        {user?.role === "admin" && (
                            <button
                                onClick={() => setShowModal(true)}
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-lg shadow-indigo-600/20 hover:from-indigo-500 hover:to-blue-500 hover:-translate-y-0.5 transition-all duration-200"
                            >
                                <span className="text-lg">+</span>
                                Create Category
                            </button>
                        )}
                    </div>
                </header>

                {/* Loading */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border border-white/10 bg-white/5 p-6 animate-pulse"
                            >
                                <div className="w-10 h-10 rounded-xl bg-white/10 mb-5" />

                                <div className="h-5 w-2/3 bg-white/10 rounded mb-3" />

                                <div className="h-4 w-full bg-white/10 rounded mb-2" />
                                <div className="h-4 w-5/6 bg-white/10 rounded" />

                                <div className="mt-6 h-10 w-full bg-white/10 rounded-xl" />
                            </div>
                        ))}

                    </div>
                ) : category.length === 0 ? (

                    /* Empty state */
                    <div className="flex flex-col items-center justify-center text-center py-24 px-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">

                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5">
                            <span className="text-3xl">📁</span>
                        </div>

                        <h2 className="text-xl font-semibold mb-2">
                            No categories yet
                        </h2>

                        <p className="text-slate-400 max-w-md mb-6">
                            There are currently no categories available.
                            Create your first category to get started.
                        </p>

                        {user?.role === "admin" && (
                            <button
                                onClick={() => setShowModal(true)}
                                className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold transition"
                            >
                                Create Category
                            </button>
                        )}

                    </div>

                ) : (

                    /* Category grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {category.map((item, index) => (

                            <article
                                key={item.id}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 hover:border-indigo-500/40 hover:bg-white/[0.07] hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-950/30 transition-all duration-300"
                            >

                                {/* Top gradient */}
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div
                                    onClick={() =>
                                        navigate(`/categories/${item.id}`)
                                    }
                                    className="cursor-pointer"
                                >

                                    <div className="flex items-start justify-between mb-5">

                                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-500/10 border border-indigo-500/20 flex items-center justify-center">
                                            <span className="text-indigo-300 font-bold">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                        </div>

                                        <span className="text-slate-600 group-hover:text-indigo-400 transition text-xl">
                                            →
                                        </span>

                                    </div>

                                    <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                                        {item.name}
                                    </h2>

                                    <p className="text-slate-400 text-sm leading-relaxed min-h-[48px]">
                                        {item.description ||
                                            "No description available for this category."}
                                    </p>

                                </div>

                                {/* Admin actions */}
                                {user?.role === "admin" && (
                                    <div className="flex gap-3 mt-6 pt-5 border-t border-white/10">

                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-medium hover:bg-indigo-500/20 hover:border-indigo-500/40 transition"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            disabled={removing}
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                            className="flex-1 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 font-medium hover:bg-red-500/20 hover:border-red-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                        >
                                            {removing
                                                ? "Deleting..."
                                                : "Delete"}
                                        </button>

                                    </div>
                                )}

                            </article>
                        ))}

                    </div>
                )}

            </div>

            {/* CREATE MODAL */}
            {showModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            closeCreateModal()
                        }
                    }}
                >

                    <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/50 overflow-hidden">

                        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">

                            <div>
                                <h2 className="text-xl font-semibold">
                                    Create Category
                                </h2>

                                <p className="text-sm text-slate-400 mt-1">
                                    Add a new event category.
                                </p>
                            </div>

                            <button
                                onClick={closeCreateModal}
                                disabled={creating}
                                className="w-9 h-9 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition disabled:opacity-50"
                            >
                                ✕
                            </button>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="p-6"
                        >

                            <div className="space-y-5">

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Category name
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="e.g. Technology"
                                        required
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Description
                                    </label>

                                    <textarea
                                        placeholder="Describe what this category is about..."
                                        rows={4}
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition resize-none"
                                    />
                                </div>

                            </div>

                            <div className="flex justify-end gap-3 mt-7">

                                <button
                                    type="button"
                                    onClick={closeCreateModal}
                                    disabled={creating}
                                    className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 transition disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={creating}
                                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold hover:from-indigo-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    {creating
                                        ? "Creating..."
                                        : "Create Category"}
                                </button>

                            </div>

                        </form>

                    </div>
                </div>
            )}

            {/* EDIT MODAL */}
            {showPatchModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            closeEditModal()
                        }
                    }}
                >

                    <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/50 overflow-hidden">

                        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">

                            <div>
                                <h2 className="text-xl font-semibold">
                                    Edit Category
                                </h2>

                                <p className="text-sm text-slate-400 mt-1">
                                    Update the category information.
                                </p>
                            </div>

                            <button
                                onClick={closeEditModal}
                                disabled={editing}
                                className="w-9 h-9 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition disabled:opacity-50"
                            >
                                ✕
                            </button>

                        </div>

                        <form
                            onSubmit={handlePatch}
                            className="p-6"
                        >

                            <div className="space-y-5">

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Category name
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Category name"
                                        required
                                        value={formEditData.name}
                                        onChange={(e) =>
                                            setFormEditData({
                                                ...formEditData,
                                                name: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Description
                                    </label>

                                    <textarea
                                        placeholder="Category description"
                                        rows={4}
                                        value={formEditData.description}
                                        onChange={(e) =>
                                            setFormEditData({
                                                ...formEditData,
                                                description: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-white/10 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition resize-none"
                                    />
                                </div>

                            </div>

                            <div className="flex justify-end gap-3 mt-7">

                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    disabled={editing}
                                    className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 transition disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={editing}
                                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold hover:from-indigo-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    {editing
                                        ? "Saving..."
                                        : "Save Changes"}
                                </button>

                            </div>

                        </form>

                    </div>
                </div>
            )}

        </main>
    )
}

export default CategoryPage