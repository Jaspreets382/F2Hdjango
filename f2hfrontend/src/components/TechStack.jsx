import React from 'react'

function TechStack() {
  return (
    <>
    <div class="py-10 border-y border-gray-200 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p class="text-center text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">Built with Modern Tech</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <div class="flex justify-center text-3xl font-bold text-gray-700">
                    <i class="fa-brands fa-python mr-2"></i> Django
                </div>
                <div class="flex justify-center text-3xl font-bold text-gray-700">
                    <i class="fa-solid fa-database mr-2"></i> PostgreSQL
                </div>
                <div class="flex justify-center text-3xl font-bold text-gray-700">
                    <i class="fa-brands fa-react mr-2"></i> React
                </div>
                <div class="flex justify-center text-3xl font-bold text-gray-700">
                    <i class="fa-brands fa-docker mr-2"></i> Docker
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default TechStack