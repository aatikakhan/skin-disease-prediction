import React from 'react'

const ImageUpload = ({ 
  selectedFile, 
  preview, 
  loading, 
  onFileSelect, 
  onPredict, 
  onReset 
}) => {
  return (
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
            onChange={onFileSelect}
            className="hidden"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          {selectedFile && (
            <button
              onClick={onPredict}
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
          
          {(selectedFile || false) && (
            <button
              onClick={onReset}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              🔄 Reset
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImageUpload
