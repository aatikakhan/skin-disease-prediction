import { useState } from 'react'
import './App.css'

// Import components
import Header from './components/Header'
import TestModeToggle from './components/TestModeToggle'
import ImageUpload from './components/ImageUpload'
import ErrorDisplay from './components/ErrorDisplay'
import ResultsDisplay from './components/ResultsDisplay'
import FeaturesSection from './components/FeaturesSection'
import ResearchValidation from './components/ResearchValidation'
import EducationalSection from './components/EducationalSection'

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
          timestamp: new Date().toISOString(),
          attention_map: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI1MCIgZmlsbD0icmVkIiBvcGFjaXR5PSIwLjciLz48L3N2Zz4=',
          model_metrics: {
            accuracy: 0.94,
            precision: 0.92,
            recall: 0.89,
            f1_score: 0.90,
            auc: 0.96
          }
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

  const handleDismissError = () => {
    setError(null)
  }

  const handleSwitchToTestMode = () => {
    setTestMode(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <div className="max-w-4xl mx-auto">
          <TestModeToggle testMode={testMode} setTestMode={setTestMode} />

          <ImageUpload
            selectedFile={selectedFile}
            preview={preview}
            loading={loading}
            onFileSelect={handleFileSelect}
            onPredict={handlePredict}
            onReset={resetApp}
          />

          <ErrorDisplay
            error={error}
            onDismiss={handleDismissError}
            onSwitchToTestMode={handleSwitchToTestMode}
          />

          <ResultsDisplay
            prediction={prediction}
            preview={preview}
            selectedFile={selectedFile}
          />

          <FeaturesSection />

          <ResearchValidation />

          <EducationalSection />
        </div>
      </div>
    </div>
  )
}

export default App
