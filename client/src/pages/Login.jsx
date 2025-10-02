import React, { useState } from 'react'
import { login } from '../Services/api'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

const Login = () => {
    const defaultValues = { email: "", password: "" }
    const [form, setForm] = useState(defaultValues)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.email || !form.password) {
            toast.error('Please fill in all fields')
            return
        }

        setLoading(true)

        try {
            const { data } = await login(form)
            localStorage.setItem("token", data.token)
            toast.success('Login successful! Redirecting...', {
                duration: 2000,
                position: 'top-center',
            })
            setTimeout(() => navigate("/dashboard"), 1500)
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed. Please try again.", {
                duration: 4000,
                position: 'top-center',
            })
        } finally {
            setLoading(false)
            setForm(defaultValues)
        }
    }

    return (
        <>
            <Toaster
                toastOptions={{
                    success: {
                        style: {
                            background: '#10B981',
                            color: '#fff',
                        },
                        iconTheme: {
                            primary: '#fff',
                            secondary: '#10B981',
                        },
                    },
                    error: {
                        style: {
                            background: '#EF4444',
                            color: '#fff',
                        },
                        iconTheme: {
                            primary: '#fff',
                            secondary: '#EF4444',
                        },
                    },
                }}
            />

            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 space-y-8">

                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                            <p className="text-gray-500 text-sm">Enter your credentials to access your account</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
                                    disabled={loading}
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <button type="button" className="text-xs text-green-600 hover:text-green-700 font-medium">
                                        Forgot?
                                    </button>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none"
                                    disabled={loading}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-green-500/30"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Logging in...
                                    </span>
                                ) : (
                                    'Login'
                                )}
                            </button>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">or</span>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-gray-600 text-sm">
                                New User?{' '}
                                <span
                                    onClick={() => navigate("/register")}
                                    className="text-green-600 hover:text-green-700 font-semibold cursor-pointer hover:underline"
                                >
                                    Create an account
                                </span>
                            </p>
                        </div>
                    </div>

                    <p className="text-center text-gray-500 text-xs mt-6">
                        © 2025 Your Company. All rights reserved.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login