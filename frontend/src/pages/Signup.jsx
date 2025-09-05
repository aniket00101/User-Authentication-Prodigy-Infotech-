import React, { useState } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const response = await fetch('http://localhost:8000/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            if (data.success) {
                alert('Account created successfully!')
            }
            navigate('/verify')
        } catch (error) {
            alert('An error occurred. Please try again.')
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

                                <h2 className="text-2xl font-semibold text-center text-white">Sign Up</h2>

                                <p className="text-sm text-gray-400 text-center">Join us and start your journey</p>

                            </div>
                            <div className="px-6 pb-4">
                                <div className="flex flex-col gap-5">
                                    
                                    <div className="grid gap-3">

                                        <label htmlFor="username" className="text-sm font-medium leading-none text-gray-300">Full Name</label>

                                        <input id="username" type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter your full name" required className="flex h-12 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300 hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-50" />

                                    </div>
                                    
                                    <div className="grid gap-3">

                                        <label htmlFor="email" className="text-sm font-medium leading-none text-gray-300" >Email Address</label>

                                        <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required className="flex h-12 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300 hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-50"/>

                                    </div>
                                    
                                    <div className="grid gap-3">
                                        
                                        <label htmlFor="password" className="text-sm font-medium leading-none text-gray-300">Password</label>
                                        
                                        <div className="relative">
                                            
                                            <input id="password" type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Create a secure password" required className="flex h-12 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 pr-12 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300 hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-50"/>
                                            
                                            <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-2 text-gray-400 hover:text-white focus:outline-none transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50"  onClick={() => setShowPassword(!showPassword)} disabled={isLoading}>
                                                {showPassword ? ( <EyeOff className="w-5 h-5" /> ) : ( <Eye className="w-5 h-5" /> )}
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="p-6 pt-4 flex flex-col gap-4">
                                
                                <button onClick={handleSubmit} type="submit" disabled={isLoading} className="w-full inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:pointer-events-none bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02] h-12 px-6 py-3">
                                    
                                    {isLoading ? ( 
                                        <> <Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating account...</>
                                        ) : ( "Create Account" )
                                    }

                                </button>
                                
                                <p className="text-xs text-center text-gray-500"> Already have an account? <span className="text-blue-400 hover:text-blue-300 cursor-pointer ml-1 transition-colors"><button onClick={() => navigate("/login")}>Sign in</button></span>
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup