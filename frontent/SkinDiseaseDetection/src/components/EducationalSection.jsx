import React from 'react'

const EducationalSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-xl p-8 mb-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        📚 Skin Health Education
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
            🛡️ Prevention Tips
          </h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Use broad-spectrum sunscreen (SPF 30+)</li>
            <li>• Avoid peak sun hours (10 AM - 4 PM)</li>
            <li>• Wear protective clothing and hats</li>
            <li>• Perform regular self-examinations</li>
            <li>• Schedule annual dermatologist visits</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
            🔍 ABCDE Rule
          </h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li><strong>A:</strong> Asymmetry - Uneven shape</li>
            <li><strong>B:</strong> Border - Irregular edges</li>
            <li><strong>C:</strong> Color - Multiple colors</li>
            <li><strong>D:</strong> Diameter - Larger than 6mm</li>
            <li><strong>E:</strong> Evolving - Changes over time</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
            ⚠️ Warning Signs
          </h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• New or changing moles</li>
            <li>• Sores that don't heal</li>
            <li>• Unusual skin growths</li>
            <li>• Persistent itching or pain</li>
            <li>• Changes in skin texture</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EducationalSection
