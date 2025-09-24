import React from 'react'

const PerformanceMetrics = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
        📊 Model Performance Metrics
      </h4>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h5 className="font-medium text-green-800 mb-2">Accuracy</h5>
          <div className="text-2xl font-bold text-green-600">94.2%</div>
          <p className="text-xs text-green-700">Overall correctness</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h5 className="font-medium text-blue-800 mb-2">Precision</h5>
          <div className="text-2xl font-bold text-blue-600">92.1%</div>
          <p className="text-xs text-blue-700">True positives / (True + False positives)</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h5 className="font-medium text-purple-800 mb-2">Recall</h5>
          <div className="text-2xl font-bold text-purple-600">89.3%</div>
          <p className="text-xs text-purple-700">True positives / (True positives + False negatives)</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <h5 className="font-medium text-orange-800 mb-2">F1-Score</h5>
          <div className="text-2xl font-bold text-orange-600">90.7%</div>
          <p className="text-xs text-orange-700">Harmonic mean of precision and recall</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h5 className="font-medium text-red-800 mb-2">AUC-ROC</h5>
          <div className="text-2xl font-bold text-red-600">96.4%</div>
          <p className="text-xs text-red-700">Area under ROC curve</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h5 className="font-medium text-gray-800 mb-2">Specificity</h5>
          <div className="text-2xl font-bold text-gray-600">95.8%</div>
          <p className="text-xs text-gray-700">True negatives / (True negatives + False positives)</p>
        </div>
      </div>
    </div>
  )
}

export default PerformanceMetrics
