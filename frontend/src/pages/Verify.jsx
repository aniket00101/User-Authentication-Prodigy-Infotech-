import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Verify = () => {
    const {token} = useParams()
    const [status, setStatus] = useState("Verifying...")
    const navigate = useNavigate()

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const res = await axios.post('http://localhost:8000/user/verify', {}, {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log("Hello")
                if(res.data.success){
                    setStatus("✅ Email Verified Successfully")
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000)
                } else {
                    setStatus("❌ Invalid or Expired token")
                }
            } catch (error) {
                setStatus("❌ Verification failed. Please try again")
            }
        }
        verifyEmail()
    },[token, navigate])

    return (
        <div className="relative w-full h-screen bg-gradient-to-r from-[#232323] to-black overflow-hidden">
            <div className="min-h-screen flex flex-col">
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="w-full max-w-md space-y-6">
                        <div className="w-full max-w-sm bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl">
                            
                            <div className="p-6 pb-4 space-y-2">
                                <h2 className="text-2xl font-semibold text-center text-white">{status}</h2>
                                {status === "Verifying..." && (
                                    <p className="text-sm text-gray-400 text-center">Please wait while we verify your email...</p>
                                )}
                                {status === "✅ Email Verified Successfully" && (
                                    <p className="text-sm text-gray-400 text-center">Redirecting to login page...</p>
                                )}
                                {(status === "❌ Invalid or Expired token" || status === "❌ Verification failed. Please try again") && (
                                    <p className="text-sm text-gray-400 text-center">Please try the verification process again</p>
                                )}
                            </div>

                            <div className="px-6 pb-6">
                                <div className="text-center">
                                    {status === "Verifying..." && (
                                        <p className="text-gray-300 text-sm">We're checking your verification token. This should only take a moment.</p>
                                    )}
                                    {status === "✅ Email Verified Successfully" && (
                                        <p className="text-gray-300 text-sm">Your email has been successfully verified. You will be redirected to the login page shortly.</p>
                                    )}
                                    {(status === "❌ Invalid or Expired token" || status === "❌ Verification failed. Please try again") && (
                                        <p className="text-gray-300 text-sm">The verification link may have expired or is invalid. Please request a new verification email.</p>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Verify