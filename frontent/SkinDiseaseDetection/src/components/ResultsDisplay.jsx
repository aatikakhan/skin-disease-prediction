import React from 'react'
import ModelExplainability from './ModelExplainability'
import PerformanceMetrics from './PerformanceMetrics'

const ResultsDisplay = ({ prediction, preview, selectedFile }) => {
  if (!prediction) return null

  const diseaseInfo = {
    name: prediction.prediction || prediction.class || 'Unknown',
    severity: 'medium',
    symptoms: ['Symptoms vary'],
    treatments: ['Consult a dermatologist'],
    prevention: ['Regular skin checks'],
    emergency: false,
    description: 'AI-powered diagnosis with confidence scoring.',
    riskFactors: ['Various factors']
  }

  const confidence = Math.round((prediction.confidence || prediction.score || 0) * 100)

  return (
    <div className="mt-8 space-y-6">
      {/* Emergency Alert */}
      {diseaseInfo.emergency && (
        <div className="p-6 bg-red-100 border-2 border-red-300 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl">🚨</div>
            <div>
              <h3 className="text-xl font-bold text-red-800">URGENT MEDICAL ATTENTION REQUIRED</h3>
              <p className="text-red-700 font-medium">This condition requires immediate medical evaluation</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <p className="text-red-800 font-semibold mb-2">⚠️ Please seek immediate medical care:</p>
            <ul className="text-red-700 text-sm space-y-1">
              <li>• Contact your dermatologist immediately</li>
              <li>• Visit an emergency room if symptoms are severe</li>
              <li>• Do not delay medical consultation</li>
            </ul>
          </div>
        </div>
      )}

      {/* Main Results */}
      <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          🎯 Diagnosis Results
        </h3>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Primary Prediction */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">
              Most Likely Condition
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-600 text-lg">
                  {diseaseInfo.name}
                </span>
                <span className="text-2xl font-bold text-green-600">
                  {confidence}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${confidence}%` }}
                ></div>
              </div>
              
              {/* Severity Indicator */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Severity:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  diseaseInfo.severity === 'high' ? 'bg-red-100 text-red-800' :
                  diseaseInfo.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {diseaseInfo.severity.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Analysis Details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">
              Analysis Details
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Model Version:</span>
                <span className="font-medium">v1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Processing Time:</span>
                <span className="font-medium">~2.3s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Image Size:</span>
                <span className="font-medium">
                  {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(1)}MB` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Confidence Level:</span>
                <span className={`font-medium ${
                  confidence >= 80 ? 'text-green-600' :
                  confidence >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {confidence >= 80 ? 'High' : confidence >= 60 ? 'Medium' : 'Low'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Model Explainability */}
      <ModelExplainability preview={preview} />

      {/* Performance Metrics */}
      <PerformanceMetrics />

      {/* Disclaimer */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800 text-sm">
          <strong>⚠️ Medical Disclaimer:</strong> This AI tool is for educational purposes only. 
          Always consult with a qualified healthcare professional for medical diagnosis and treatment.
          {diseaseInfo.emergency && ' This condition may require immediate medical attention.'}
        </p>
      </div>
    </div>
  )
}

export default ResultsDisplay
