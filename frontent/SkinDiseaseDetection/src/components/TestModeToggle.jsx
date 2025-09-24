import React from 'react'

const TestModeToggle = ({ testMode, setTestMode }) => {
  return (
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
  )
}

export default TestModeToggle
