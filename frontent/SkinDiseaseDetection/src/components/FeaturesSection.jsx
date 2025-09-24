import React from 'react'

const FeaturesSection = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <div className="text-4xl mb-4">🤖</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">AI-Powered</h3>
        <p className="text-gray-600">Advanced machine learning algorithms for accurate skin condition analysis</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <div className="text-4xl mb-4">⚡</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast Results</h3>
        <p className="text-gray-600">Get instant predictions with confidence scores in seconds</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <div className="text-4xl mb-4">🔒</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Privacy First</h3>
        <p className="text-gray-600">Your images are processed securely and not stored permanently</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <div className="text-4xl mb-4">📊</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Comprehensive</h3>
        <p className="text-gray-600">Detailed analysis with symptoms, treatments, and prevention tips</p>
      </div>
    </div>
  )
}

export default FeaturesSection
