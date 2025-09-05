import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const navigate = useNavigate()

    const handleForgotPassword = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            setError("")
            const res = await axios.post(`http://localhost:8000/user/forgot-password`, {
                email
            });
            if (res.data.success) {
                navigate(`/verify-otp/${email}`)
                setEmail("")
                setIsSubmitted(true)
            }
        } catch (error) {
            console.log(error);
            setError("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="relative w-full h-screen bg-gradient-to-r from-[#232323] to-black overflow-hidden">
            <div className="min-h-screen flex flex-col">
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="w-full max-w-md space-y-6">
                        <div className="w-full max-w-sm bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl">
                            <div className="p-6 pb-4 space-y-2">
                                <h2 className="text-2xl font-semibold text-center text-white">{isSubmitted ? "✅ Check Your Email" : "🔑 Reset Password"}</h2>
                                <p className="text-sm text-gray-400 text-center">
                                    {isSubmitted ? "Reset link sent successfully" : "Enter your email to reset your password"}
                                </p>
                            </div>
                            <div className="px-6 pb-6">
                                {error && (
                                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                        <p className="text-red-400 text-sm text-center">{error}</p>
                                    </div>
                                )}
                                
                                {isSubmitted ? (
                                    <div className="text-center space-y-4">
                                        <div className="bg-green-500/10 rounded-full p-3 w-16 h-16 mx-auto flex items-center justify-center">
                                            <span className="text-2xl">✅</span>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="font-medium text-lg text-white">Check your inbox</h3>
                                            <p className="text-gray-300 text-sm">We've sent a password reset link to{" "}<span className="font-medium text-white">{email}</span></p>
                                            <p className="text-gray-400 text-sm">If you don't see the email, check your spam folder or{" "}
                                                <button className="text-blue-400 hover:text-blue-300 font-medium underline" onClick={() => setIsSubmitted(false)}>try again</button>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleForgotPassword} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-300">Email</label>
                                            <input type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading}
                                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 disabled:opacity-50"/>
                                        </div>

                                        <button type="submit" disabled={isLoading} className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                                            {isLoading ? (
                                                <span className="flex items-center justify-center">
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Sending reset link...
                                                </span>
                                            ) : (
                                                "Send reset link"
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                            
                            <div className="px-6 pb-6">
                                <p className="text-center text-sm text-gray-400">Remember your password?{" "}
                                    <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium hover:underline">Sign in</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword