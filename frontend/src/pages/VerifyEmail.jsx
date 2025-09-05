import React from 'react'

const VerifyEmail = () => {
    return (
        <div className="relative w-full h-screen bg-gradient-to-r from-[#232323] to-black overflow-hidden">
            <div className="min-h-screen flex flex-col">
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="w-full max-w-md space-y-6">
                        <div className="w-full max-w-sm bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl">
                            
                            <div className="p-6 pb-4 space-y-2">
                                <h2 className="text-2xl font-semibold text-center text-white">✅ Check Your Email</h2>
                                <p className="text-sm text-gray-400 text-center">Verification link sent successfully</p>
                            </div>

                            <div className="px-6 pb-6">
                                <div className="text-center">
                                    <p className="text-gray-300 text-sm">We've sent you an email to verify your account. Please check your inbox and click the verification link</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail