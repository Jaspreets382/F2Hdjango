import React from 'react'
import { Vegan } from 'lucide-react'
import { FaInstagram,FaTwitter,FaLinkedin } from 'react-icons/fa'

function Footer() {
  return (
<footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800  w-full" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-green-600 rounded-tr-lg rounded-bl-lg flex items-center justify-center text-white">
                            <Vegan></Vegan>
                        </div>
                        <span className="font-display font-bold text-xl text-white">Farm2Home</span>
                    </div>
                    <p className="text-sm text-gray-400">Connecting the fields to your kitchen. Fresh, fast, and fair.</p>
                </div>
                
                <div>
                    <h4 className="text-white font-bold mb-4">Platform</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-green-400 transition">Browse Products</a></li>
                        <li><a href="#" className="hover:text-green-400 transition">For Farmers</a></li>
                        <li><a href="#" className="hover:text-green-400 transition">API Documentation</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4">Company</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-green-400 transition">About Us</a></li>
                        <li><a href="#" className="hover:text-green-400 transition">Careers</a></li>
                        <li><a href="#" className="hover:text-green-400 transition">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-4">Connect</h4>
                    <div className="flex space-x-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition">
                            <FaTwitter/>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition">
                            <FaInstagram/>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition">
                           <FaLinkedin/>
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                &copy; 2025 Farm2Home Project. All rights reserved.
            </div>
        </div>
    </footer>
  )
}

export default Footer