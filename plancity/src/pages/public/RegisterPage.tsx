
import { useState } from "react";
import { post } from "../../services/post";
import type { User, UserRegister } from "../../types/Users";
import { useNavigate, Link } from "react-router";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCreated = await post<User, UserRegister>(
        "auth/register",
        formData
      );

      if (userCreated) {
        alert("Account created successfully!");

        setFormData({
          name: "",
          email: "",
          password: "",
        });

        setConfirmPassword("");

        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setError("Unable to create your account. Please try again.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-10 text-white">

      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">

        {/* Register card */}
        <div className="rounded-3xl border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur-xl sm:p-10">

          {/* Header */}
          <div className="mb-8 text-center">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 text-xl font-bold text-white shadow-lg shadow-indigo-500/30">
              A
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Create account
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Join us and start exploring events
            </p>

          </div>

          {/* Error message */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="mb-5">

              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Full name
              </label>

              <div className="relative">

               

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  required
                />

              </div>

            </div>

            {/* Email */}
            <div className="mb-5">

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email address
              </label>

              <div className="relative">

              

                <input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  required
                />

              </div>

            </div>

            {/* Password */}
            <div className="mb-5">

              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <div className="relative">

               

                <input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  required
                  minLength={6}
                />

              </div>

              <p className="mt-2 text-xs text-slate-400">
                Minimum 6 characters
              </p>

            </div>

            {/* Confirm password */}
            <div className="mb-6">

              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Confirm password
              </label>

              <div className="relative">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  ✓
                </span>

                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  required
                  minLength={6}
                />

              </div>

            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition duration-200 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-blue-700 hover:shadow-xl active:translate-y-0"
            >
              Create account
            </button>

          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">

            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-xs text-slate-400">
              OR
            </span>

            <div className="h-px flex-1 bg-slate-200" />

          </div>

          {/* Login */}
          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 transition hover:text-indigo-800"
            >
              Sign in
            </Link>
          </p>

          {/* Back */}
          <Link
            to="/"
            className="mt-6 block text-center text-xs font-medium text-slate-400 transition hover:text-slate-700"
          >
            ← Back to home
          </Link>

        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500">
          © 2026 Your Application. All rights reserved.
        </p>

      </div>
    </main>
  );
}

export default Register;

