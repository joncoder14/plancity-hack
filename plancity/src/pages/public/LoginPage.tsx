
import React, { useState } from "react"
import { post } from "../../services/post"
import { useAuth } from "../../context/AuthContext"
import type { UserResponse } from "../../types/Users"
import { useNavigate, Link } from "react-router"

function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
  }

  function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      const res = await post<
        UserResponse,
        { email: string; password: string }
      >("auth/login", { email, password })

      const token = res.accessToken
      const user = res.user

      login(token, user)

      if (token) {
        navigate("/categories")
      }
    } catch {
      console.log("incorrecto")
      alert("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-10">

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">

        {/* Login card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur-xl sm:p-10"
        >

          {/* Logo / Brand */}
          <div className="mb-8 text-center">
            

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Sign in to continue to your account
            </p>
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
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                @
              </span>

              <input
                id="email"
                name="email"
                value={email}
                onChange={handleEmail}
                type="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <Link
                to="/forgot-password"
                className="text-xs font-medium text-indigo-600 transition hover:text-indigo-800"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                •
              </span>

              <input
                id="password"
                name="password"
                value={password}
                onChange={handlePassword}
                type="password"
                placeholder="Enter your password"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
          </div>

          {/* Remember */}
          <div className="mb-6 flex items-center gap-2">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />

            <label
              htmlFor="remember"
              className="text-sm text-slate-500"
            >
              Remember me
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition duration-200 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-blue-700 hover:shadow-xl active:translate-y-0"
          >
            Sign in
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-xs text-slate-400">
              OR
            </span>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Register */}
          <p className="text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 transition hover:text-indigo-800"
            >
              Create account
            </Link>
          </p>

          {/* Back */}
          <Link
            to="/"
            className="mt-6 block text-center text-xs font-medium text-slate-400 transition hover:text-slate-700"
          >
            ← Back to home
          </Link>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500">
          © 2026 Your Application. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Login

