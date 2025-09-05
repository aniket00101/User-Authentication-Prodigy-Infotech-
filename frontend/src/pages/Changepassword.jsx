import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const ChangePassword = () => {
    const { email } = useParams()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isChanged, setIsChanged] = useState(false)
    const navigate = useNavigate()

    const handleChangePassword = async (e) => {
        e.preventDefault()
        setError("")
        setSuccess("")

        if (!newPassword || !confirmPassword) {
            setError("Please fill in all fields")
            return
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters long")
            return
        }

        try {
            setIsLoading(true)
            const res = await axios.post(`http://localhost:8000/user/change-password/${email}`, {
                newPassword,
                confirmPassword
            })

            setSuccess(res.data.message)
            setIsChanged(true)
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong")
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
                                <h2 className="text-2xl font-semibold text-center text-white">{isChanged ? "✅ Password Changed" : "🔐 Change Password"}</h2>
                                <p className="text-sm text-gray-400 text-center">{isChanged ? "Password changed successfully! Redirecting..." : `Set a new password for ${email || 'your account'}`}</p>
                            </div>
                            
                            <div className="px-6 pb-6">
                                {error && (
                                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                        <p className="text-red-400 text-sm text-center">{error}</p>
                                    </div>
                                )}
                                
                                {success && (
                                    <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                                        <p className="text-green-400 text-sm text-center">{success}</p>
                                    </div>
                                )}
                                
                                {isChanged ? (
                                    <div className="text-center space-y-4 py-4">
                                        <div className="bg-green-500/10 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center">
                                            <span className="text-3xl">✅</span>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="font-medium text-lg text-white">Password Changed Successfully</h3>
                                            <p className="text-gray-300 text-sm">Your password has been updated. You'll be redirected to login</p>
                                        </div>
                                        <div className="flex items-center justify-center space-x-2 text-gray-400">
                                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span className="text-sm">Redirecting to login...</span>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleChangePassword} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-300">New Password</label>
                                            <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required disabled={isLoading}
                                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 disabled:opacity-50" />
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
                                            <input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required
                                                disabled={isLoading} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 disabled:opacity-50"/>
                                        </div>
                                        
                                        <button type="submit" disabled={isLoading} className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                                            {isLoading ? (
                                                <span className="flex items-center justify-center">
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Changing Password...
                                                </span>
                                            ) : (
                                                "Change Password"
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                            
                            {!isChanged && (
                                <div className="px-6 pb-6">
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500">Password must be at least 6 characters long</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword