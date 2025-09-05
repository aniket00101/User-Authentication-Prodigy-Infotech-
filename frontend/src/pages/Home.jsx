import React, { useState, useEffect } from 'react'
import { LogOut, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getData } from '@/context/usercontext'
import axios from 'axios'

const Home = () => {
    const navigate = useNavigate()
    const accessToken = localStorage.getItem("accessToken")
    const {user, setUser} = getData()
    const logoutHandleer = async () => {
      try {
        const res = await axios.post(`http://localhost:8000/user/logout`, {}, {
          headers:{
            Authorization:`Bearer ${accessToken}`
          }
        })
        if(res.data.success){
            setUser(null)
            localStorage.clear()            
        }
        navigate('/login')
      } catch (error) {
        console.log(error)
      }
    }
    return (
        <div className="relative w-full h-screen bg-gradient-to-r from-[#232323] to-black overflow-hidden">
            <div className="absolute top-6 right-6 z-10">
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 shadow-lg" onClick={logoutHandleer}>
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>

            <div className="min-h-screen flex flex-col">
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="w-full max-w-md space-y-6">
                        <div className="w-full max-w-sm bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl">
                            
                            <div className="p-8 pb-6 space-y-4">
                                <div className="flex items-center justify-center mb-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                        <User className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <h1 className="text-3xl font-bold text-center text-white">Welcome {user?.username}</h1>
                                <p className="text-sm text-gray-400 text-center">You have successfully logged in to your account</p>
                            </div>
                            <div className="px-8 pb-8">
                                <div className="text-center">
                                    <p className="text-gray-300 text-sm">Welcome to your dashboard. You can now access all the features and manage your account.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home