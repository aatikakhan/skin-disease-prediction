import React from 'react'

const ErrorDisplay = ({ error, onDismiss, onSwitchToTestMode }) => {
  if (!error) return null

  return (
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
              onClick={onSwitchToTestMode}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              Switch to Test Mode
            </button>
            <button
              onClick={onDismiss}
              className="px-4 py-2 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorDisplay
