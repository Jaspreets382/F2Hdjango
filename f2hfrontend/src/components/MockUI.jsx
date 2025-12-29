import React from 'react'
import { ShieldUser,ChartSpline,Network } from 'lucide-react'
function MockUI() {
    return (
        <>
            <section id="features" class="py-24 bg-white">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div class="order-2 lg:order-1 reveal">
                            <h2 class="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-6">Everything you need to manage your harvest.</h2>
                            <p class="text-gray-600 text-lg mb-8">Farm2Home isn't just a store; it's a comprehensive ecosystem built for scalability and security.</p>

                            <div class="space-y-6">
                                <div class="flex items-start gap-4">
                                    <div class="shrink-0 mt-1 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <ShieldUser size={18}></ShieldUser>
                                    </div>
                                    <div>
                                        <h5 class="font-bold text-gray-900">Role-Based Permissions</h5>
                                        <p class="text-gray-500 text-sm mt-1">Secure access control for Admins, Farmers, and Buyers using Django's robust auth system.</p>
                                    </div>
                                </div>

                                <div class="flex items-start gap-4">
                                    <div class="shrink-0 mt-1 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <ChartSpline size={18}></ChartSpline>
                                    </div>
                                    <div>
                                        <h5 class="font-bold text-gray-900">Advanced Dashboards</h5>
                                        <p class="text-gray-500 text-sm mt-1">Visual analytics for sales, inventory management, and order history tracking.</p>
                                    </div>
                                </div>

                                <div class="flex items-start gap-4">
                                    <div class="shrink-0 mt-1 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                        <Network size={18}></Network>
                                    </div>
                                    <div>
                                        <h5 class="font-bold text-gray-900">RESTful API Architecture</h5>
                                        <p class="text-gray-500 text-sm mt-1">Headless capability allows mobile app integration or third-party logistics connections seamlessly.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                         <div class="order-1 lg:order-2 relative reveal">
                        <div class=" absolute inset-0 bg-linear-to-tr from-green-500 to-yellow-400 rounded-3xl rotate-3 opacity-40"></div>
                        <div class="relative bg-white border border-gray-100 rounded-3xl shadow-2xl  p-6 md:p-10">
                            <div class="flex items-center justify-between mb-8">
                                <div class="h-8 w-32 bg-gray-100 rounded animate-pulse"></div>
                                <div class="h-8 w-8 bg-gray-100 rounded-full"></div>
                            </div>
                            <div class="space-y-4">
                                <div class="flex items-center p-4 bg-gray-50 rounded-xl">
                                    <div class="h-10 w-10 rounded-full bg-green-200 mr-4"></div>
                                    <div class="flex-1">
                                        <div class="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                                        <div class="h-3 w-16 bg-gray-100 rounded"></div>
                                    </div>
                                    <div class="text-right">
                                        <div class="h-4 w-12 bg-gray-200 rounded mb-1"></div>
                                        <span class="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Active</span>
                                    </div>
                                </div>
                                <div class="flex items-center p-4 bg-gray-50 rounded-xl">
                                    <div class="h-10 w-10 rounded-full bg-orange-200 mr-4"></div>
                                    <div class="flex-1">
                                        <div class="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                                        <div class="h-3 w-16 bg-gray-100 rounded"></div>
                                    </div>
                                    <div class="text-right">
                                        <div class="h-4 w-12 bg-gray-200 rounded mb-1"></div>
                                        <span class="inline-block px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full">Pending</span>
                                    </div>
                                </div>
                            </div>
                            <button class="w-full mt-6 py-3 bg-green-600 text-white rounded-lg font-medium shadow-lg hover:bg-green-700 transition">View All Orders</button>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MockUI