import React from 'react'
import {FaPython,FaDocker,FaReact,FaDatabase}from 'react-icons/fa'
function TechStack() {
  return (
    <>
    <div className="py-10 border-y border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">Built with Modern Tech</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex  gap-2 justify-center text-3xl font-bold text-gray-700">
                    <FaPython size={38}></FaPython> Django
                </div>
                <div className="flex  gap-2 justify-center text-3xl font-bold text-gray-700">
                    <FaDatabase size={38} ></FaDatabase> PostgreSQL
                </div>
                <div className="flex gap-2  justify-center text-3xl font-bold text-gray-700">
                    <FaReact size={38}></FaReact> React
                </div>
                <div className="flex gap-2 justify-center text-3xl font-bold text-gray-700">
                    <FaDocker size={38}></FaDocker> Docker
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default TechStack