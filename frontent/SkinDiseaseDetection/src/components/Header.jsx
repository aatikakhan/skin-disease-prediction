import React from 'react'

const Header = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        🩺 Skin Disease Detection
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Upload an image of a skin condition to get an AI-powered diagnosis with confidence scores
      </p>
    </div>
  )
}

export default Header
