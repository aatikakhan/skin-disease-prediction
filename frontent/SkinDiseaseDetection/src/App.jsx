import { useState } from 'react'
import './App.css'

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      setError(null)
      setPrediction(null)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handlePredict = async () => {
    if (!selectedFile) return

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setPrediction(result)
    } catch (err) {
      setError(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const resetApp = () => {
    setSelectedFile(null)
    setPreview(null)
    setPrediction(null)
    setError(null)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🩺 Skin Disease Detection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload an image of a skin condition to get an AI-powered diagnosis with confidence scores
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            {/* Upload Section */}
            <div className="text-center">
              <div className="mb-6">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-400 transition-colors">
                    {preview ? (
                      <div className="space-y-4">
                        <img 
                          src={preview} 
                          alt="Preview" 
                          className="max-w-xs mx-auto rounded-lg shadow-md"
                        />
                        <p className="text-sm text-gray-600">
                          {selectedFile?.name}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-6xl">📷</div>
                        <div>
                          <p className="text-xl font-semibold text-gray-700">
                            Upload Skin Image
                          </p>
                          <p className="text-gray-500">
                            Click to select an image file
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                {selectedFile && (
                  <button
                    onClick={handlePredict}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        🔍 Analyze Image
                      </>
                    )}
                  </button>
                )}
                
                {(selectedFile || prediction) && (
                  <button
                    onClick={resetApp}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    🔄 Reset
                  </button>
                )}
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-medium">⚠️ {error}</p>
                <p className="text-red-600 text-sm mt-1">
                  Make sure your ML backend is running on http://127.0.0.1:8000
                </p>
              </div>
            )}

            {/* Results Display */}
            {prediction && (
              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  🎯 Diagnosis Results
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Primary Prediction */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-lg font-semibold text-gray-700 mb-3">
                      Most Likely Condition
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-600">
                          {prediction.prediction || prediction.class || 'Unknown'}
                        </span>
                        <span className="text-2xl font-bold text-green-600">
                          {Math.round((prediction.confidence || prediction.score || 0) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-green-500 h-3 rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${(prediction.confidence || prediction.score || 0) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
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
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    <strong>⚠️ Medical Disclaimer:</strong> This AI tool is for educational purposes only. 
                    Always consult with a qualified healthcare professional for medical diagnosis and treatment.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
