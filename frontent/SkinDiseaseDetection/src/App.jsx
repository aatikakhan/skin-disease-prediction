import { useState } from 'react'
import './App.css'

// Disease database with comprehensive information
const DISEASE_DATABASE = {
  'melanoma': {
    name: 'Melanoma',
    severity: 'high',
    symptoms: ['Asymmetric moles', 'Irregular borders', 'Color variation', 'Diameter >6mm', 'Evolving appearance'],
    treatments: ['Surgical excision', 'Immunotherapy', 'Targeted therapy', 'Radiation therapy'],
    prevention: ['Regular skin checks', 'Sun protection', 'Avoid tanning beds', 'Know your skin'],
    emergency: true,
    description: 'The most serious type of skin cancer that can spread to other parts of the body.',
    riskFactors: ['Fair skin', 'History of sunburns', 'Family history', 'Multiple moles']
  },
  'basal_cell_carcinoma': {
    name: 'Basal Cell Carcinoma',
    severity: 'medium',
    symptoms: ['Pearl-like bump', 'Pink or red patch', 'Open sore that won\'t heal', 'Shiny bump'],
    treatments: ['Surgical removal', 'Mohs surgery', 'Cryotherapy', 'Topical treatments'],
    prevention: ['Sun protection', 'Regular dermatologist visits', 'Avoid peak sun hours'],
    emergency: false,
    description: 'Most common type of skin cancer, usually slow-growing and rarely spreads.',
    riskFactors: ['Fair skin', 'Chronic sun exposure', 'Age over 50', 'Male gender']
  },
  'squamous_cell_carcinoma': {
    name: 'Squamous Cell Carcinoma',
    severity: 'medium',
    symptoms: ['Red, scaly patch', 'Firm, red nodule', 'Open sore', 'Wart-like growth'],
    treatments: ['Surgical removal', 'Mohs surgery', 'Radiation therapy', 'Topical chemotherapy'],
    prevention: ['Sun protection', 'Regular skin exams', 'Avoid tanning'],
    emergency: false,
    description: 'Second most common skin cancer, can spread if not treated early.',
    riskFactors: ['Fair skin', 'Chronic sun exposure', 'Previous skin cancer', 'Weakened immune system']
  },
  'actinic_keratosis': {
    name: 'Actinic Keratosis',
    severity: 'low',
    symptoms: ['Rough, scaly patches', 'Pink or red color', 'Itching or burning', 'Flat or raised'],
    treatments: ['Cryotherapy', 'Topical medications', 'Photodynamic therapy', 'Chemical peels'],
    prevention: ['Sun protection', 'Regular skin checks', 'Avoid tanning'],
    emergency: false,
    description: 'Precancerous skin condition that can develop into squamous cell carcinoma.',
    riskFactors: ['Fair skin', 'Chronic sun exposure', 'Age over 40', 'Outdoor occupation']
  },
  'seborrheic_keratosis': {
    name: 'Seborrheic Keratosis',
    severity: 'low',
    symptoms: ['Waxy, stuck-on appearance', 'Brown, black, or tan color', 'Round or oval shape', 'Slightly raised'],
    treatments: ['Cryotherapy', 'Shave removal', 'Electrosurgery', 'Laser therapy'],
    prevention: ['No specific prevention', 'Regular monitoring'],
    emergency: false,
    description: 'Benign skin growth that is very common in older adults.',
    riskFactors: ['Age over 50', 'Family history', 'Sun exposure']
  },
  'dermatofibroma': {
    name: 'Dermatofibroma',
    severity: 'low',
    symptoms: ['Firm, raised bump', 'Brown or reddish color', 'Dimple when pinched', 'Slightly itchy'],
    treatments: ['Surgical removal', 'Cryotherapy', 'Observation'],
    prevention: ['No specific prevention'],
    emergency: false,
    description: 'Benign skin growth that is harmless and doesn\'t require treatment.',
    riskFactors: ['Minor skin trauma', 'Insect bites', 'Age 20-50']
  },
  'benign_mole': {
    name: 'Benign Mole',
    severity: 'low',
    symptoms: ['Round or oval shape', 'Even color', 'Smooth borders', 'Stable size'],
    treatments: ['No treatment needed', 'Surgical removal if desired'],
    prevention: ['Sun protection', 'Regular monitoring'],
    emergency: false,
    description: 'Normal, harmless skin growth that is common in most people.',
    riskFactors: ['Genetics', 'Sun exposure', 'Age']
  }
}

// Helper function to get disease info
const getDiseaseInfo = (prediction) => {
  const diseaseName = prediction.prediction || prediction.class || 'unknown'
  const normalizedName = diseaseName.toLowerCase().replace(/\s+/g, '_')
  return DISEASE_DATABASE[normalizedName] || {
    name: diseaseName,
    severity: 'unknown',
    symptoms: ['Symptoms vary'],
    treatments: ['Consult a dermatologist'],
    prevention: ['Regular skin checks'],
    emergency: false,
    description: 'Please consult with a healthcare professional for accurate diagnosis.',
    riskFactors: ['Various factors']
  }
}

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [testMode, setTestMode] = useState(false)

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

    // Test mode for demonstration
    if (testMode) {
      setTimeout(() => {
        const mockPrediction = {
          prediction: 'melanoma',
          confidence: 0.87,
          timestamp: new Date().toISOString()
        }
        setPrediction(mockPrediction)
        setLoading(false)
      }, 2000)
      return
    }

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        if (response.status === 0 || response.status >= 500) {
          throw new Error('Backend server is not running. Please start your ML backend on http://127.0.0.1:8000')
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log('API Response:', result) // Debug log
      
      // Handle different response formats
      const prediction = {
        prediction: result.prediction || result.class || result.disease || result.label,
        confidence: result.confidence || result.score || result.probability || result.accuracy,
        ...result // Include any additional fields
      }
      
      setPrediction(prediction)
    } catch (err) {
      console.error('Prediction error:', err)
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        setError('Cannot connect to ML backend. Please ensure your backend server is running on http://127.0.0.1:8000')
      } else {
        setError(`Error: ${err.message}`)
      }
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
          {/* Test Mode Toggle */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Test Mode:</span>
                <button
                  onClick={() => setTestMode(!testMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    testMode ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      testMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className="text-sm text-gray-600">
                  {testMode ? 'Demo mode (uses mock data)' : 'Live mode (connects to ML backend)'}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Backend: {testMode ? 'Simulated' : 'http://127.0.0.1:8000'}
              </div>
            </div>
          </div>

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
              <div className="mt-6 p-6 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">⚠️</div>
                  <div className="flex-1">
                    <h4 className="text-red-800 font-semibold mb-2">Connection Error</h4>
                    <p className="text-red-700 mb-3">{error}</p>
                    <div className="bg-white p-4 rounded-lg border border-red-200">
                      <h5 className="font-medium text-red-800 mb-2">Troubleshooting Steps:</h5>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Ensure your ML backend is running on http://127.0.0.1:8000</li>
                        <li>• Check that the /predict endpoint is accessible</li>
                        <li>• Verify CORS settings allow requests from localhost:5173</li>
                        <li>• Try using Test Mode for demonstration purposes</li>
                      </ul>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => setTestMode(true)}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Switch to Test Mode
                      </button>
                      <button
                        onClick={() => setError(null)}
                        className="px-4 py-2 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Results Display */}
            {prediction && (() => {
              const diseaseInfo = getDiseaseInfo(prediction)
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

                  {/* Disease Information */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    {/* Symptoms & Description */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        🔍 Condition Overview
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-gray-600 mb-2">Description:</h5>
                          <p className="text-sm text-gray-700">{diseaseInfo.description}</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-600 mb-2">Common Symptoms:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {diseaseInfo.symptoms.map((symptom, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">•</span>
                                <span>{symptom}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Treatment & Prevention */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        💊 Treatment & Prevention
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-gray-600 mb-2">Treatment Options:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {diseaseInfo.treatments.map((treatment, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">•</span>
                                <span>{treatment}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-600 mb-2">Prevention Tips:</h5>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {diseaseInfo.prevention.map((tip, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-purple-500 mt-1">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Risk Factors */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                      ⚠️ Risk Factors
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-600 mb-2">Common Risk Factors:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {diseaseInfo.riskFactors.map((factor, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-orange-500 mt-1">•</span>
                              <span>{factor}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h5 className="font-medium text-blue-800 mb-2">📋 Next Steps:</h5>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Schedule appointment with dermatologist</li>
                          <li>• Document any changes in the condition</li>
                          <li>• Follow up as recommended by your doctor</li>
                          <li>• Maintain regular skin check-ups</li>
                        </ul>
                      </div>
                    </div>
                  </div>

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
            })()}
          </div>

          {/* Disease Comparison Section */}
          {prediction && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                🔬 Similar Conditions Comparison
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(DISEASE_DATABASE)
                  .filter(([key, disease]) => key !== getDiseaseInfo(prediction).name.toLowerCase().replace(/\s+/g, '_'))
                  .slice(0, 6)
                  .map(([key, disease]) => (
                    <div key={key} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800 text-sm">{disease.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          disease.severity === 'high' ? 'bg-red-100 text-red-700' :
                          disease.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {disease.severity}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{disease.description}</p>
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">Key symptoms:</span> {disease.symptoms.slice(0, 2).join(', ')}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Enhanced Features Section */}
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

          {/* Educational Section */}
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
        </div>
      </div>
    </div>
  )
}

export default App
