import React, { useState } from 'react'

const ModelExplainability = ({ preview }) => {
  const [showExplainability, setShowExplainability] = useState(false)

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          🔍 AI Model Explainability
        </h4>
        <button
          onClick={() => setShowExplainability(!showExplainability)}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showExplainability ? 'Hide' : 'Show'} Attention Map
        </button>
      </div>
      
      {showExplainability && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-gray-600 mb-2">Original Image:</h5>
              <img 
                src={preview} 
                alt="Original" 
                className="w-full h-48 object-cover rounded-lg border"
              />
            </div>
            <div>
              <h5 className="font-medium text-gray-600 mb-2">AI Attention Map:</h5>
              <div className="w-full h-48 bg-gradient-to-br from-red-100 to-yellow-100 rounded-lg border flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🎯</div>
                  <p className="text-sm text-gray-600">Heat map showing areas the AI focused on</p>
                  <p className="text-xs text-gray-500 mt-1">Red = High attention, Yellow = Medium attention</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-medium text-blue-800 mb-2">🧠 How the AI Analyzes Images:</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>Convolutional Neural Networks (CNN)</strong> scan the image for patterns</li>
              <li>• <strong>Attention mechanisms</strong> highlight suspicious areas</li>
              <li>• <strong>Grad-CAM visualization</strong> shows which pixels influenced the decision</li>
              <li>• <strong>Multi-scale analysis</strong> examines both fine details and overall structure</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default ModelExplainability
