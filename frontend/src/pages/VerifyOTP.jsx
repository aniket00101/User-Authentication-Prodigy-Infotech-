import React, { useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const VerifyOTP = () => {
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const inputRefs = useRef([])
  const { email } = useParams()
  const navigate = useNavigate()

  const handleChange = (index, value) => {
    if (value.length > 1) return
    const updatedOtp = [...otp]
    updatedOtp[index] = value
    setOtp(updatedOtp)
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = async () => {
    const finalOtp = otp.join("")
    if (finalOtp.length !== 6) {
      setError("Please enter all 6 digits")
      return
    }

    try {
      setIsLoading(true)
      setError("")
      const res = await axios.post(`http://localhost:8000/user/verify-otp/${email}`, {
        otp: finalOtp,
      })
      setSuccessMessage(res.data.message)
      setIsVerified(true)
      setTimeout(() => {
        navigate(`/change-password/${email}`)
      }, 2000)
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const clearOtp = () => {
    setOtp(["", "", "", "", "", ""])
    setError("")
    inputRefs.current[0]?.focus()
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-[#232323] to-black overflow-hidden">
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md space-y-6">
            <div className="w-full max-w-sm bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl">
              <div className="p-6 pb-4 space-y-2">
                <h2 className="text-2xl font-semibold text-center text-white">{isVerified ? "✅ Verification Successful" : "🔐 Verify Your Email"}</h2>
                <p className="text-sm text-gray-400 text-center">
                    {isVerified ? "Code verified successfully! Redirecting..." : `Enter the 6-digit code sent to ${email || 'your email'}`}
                </p>
              </div>
              <div className="px-6 pb-6">
                {error && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  </div>
                )}
                
                {successMessage && (
                  <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-green-400 text-sm text-center">{successMessage}</p>
                  </div>
                )}
                
                {isVerified ? (
                  <div className="text-center space-y-4 py-4">
                    <div className="bg-green-500/10 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center">
                      <span className="text-3xl">✅</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-lg text-white">Verification Successful</h3>
                      <p className="text-gray-300 text-sm">Your email has been verified. You'll be redirected to reset your password</p>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-gray-400">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-sm">Redirecting...</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between gap-2">
                      {otp.map((digit, index) => (
                        <input key={index} type="text" value={digit} onChange={(e) => handleChange(index, e.target.value)} onKeyDown={(e) => handleKeyDown(index, e)} maxLength={1}
                          ref={(el) => (inputRefs.current[index] = el)} disabled={isLoading} className="w-12 h-12 text-center text-xl font-bold bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 disabled:opacity-50" />
                      ))}
                    </div>
                    <div className="space-y-3">
                      <button onClick={handleVerify} disabled={isLoading || otp.some((digit) => digit === "")} className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50" >
                        {isLoading ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Verifying...
                          </span>
                        ) : ( "Verify Code" )}
                      </button>
                      
                      <button onClick={clearOtp} disabled={isLoading || isVerified} className="w-full py-2 px-4 bg-white/5 hover:bg-white/10 disabled:bg-white/5 disabled:opacity-50 text-white font-medium rounded-lg transition-colors border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20" >
                        <span className="flex items-center justify-center">
                          <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Clear
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="px-6 pb-6">
                <p className="text-center text-sm text-gray-400">
                  Wrong email?{" "}
                  <Link to="/forgot-password" className="text-blue-400 hover:text-blue-300 font-medium hover:underline">Go back</Link>
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-500">For testing purposes, use code:{" "}<span className="font-mono font-medium text-gray-400">123456</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyOTP