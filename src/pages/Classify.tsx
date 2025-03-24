
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import { Upload, PlayCircle, FileX, CheckCircle, BarChart2, Loader2 } from 'lucide-react';
import { classifyVideo, getAttentionExplanation, loadModel } from '../utils/classifier';

interface ClassificationResult {
  task: string;
  attention: string;
}

const Classify = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load the model on component mount
  useEffect(() => {
    const init = async () => {
      setLoadingMessage("Initializing TimeSformer vision transformer...");
      await loadModel();
      setIsModelLoaded(true);
      setLoadingMessage("");
    };
    
    init();
  }, []);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    // Reset previous results
    setResult(null);
    setError(null);
    
    // Check if file is a video
    if (!file.type.startsWith('video/')) {
      setError('Please upload a video file.');
      return;
    }
    
    // Create URL for the video file
    const url = URL.createObjectURL(file);
    setVideoFile(file);
    setVideoUrl(url);
  };

  const handleResetVideo = () => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    
    setVideoFile(null);
    setVideoUrl(null);
    setResult(null);
    setError(null);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClassify = async () => {
    if (!videoFile) return;
    
    setIsProcessing(true);
    setLoadingMessage("Preprocessing video frames...");
    
    try {
      // Simulate different stages of processing
      setTimeout(() => setLoadingMessage("Applying TimeSformer vision transformer..."), 1000);
      setTimeout(() => setLoadingMessage("Running LSTM sequence analysis..."), 2000);
      setTimeout(() => setLoadingMessage("Applying dynamic attention modulation..."), 3000);
      
      const classificationResult = await classifyVideo(videoFile);
      setResult(classificationResult);
      setError(null);
    } catch (err) {
      console.error('Classification error:', err);
      setError('An error occurred during classification. Please try again.');
      setResult(null);
    } finally {
      setIsProcessing(false);
      setLoadingMessage("");
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">Gaze Analysis Classifier</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Upload a video to analyze gaze patterns and classify task engagement and attention characteristics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div 
              className={`neo-card h-full flex flex-col ${!videoFile ? 'justify-center' : ''}`}
            >
              {!videoFile ? (
                <div className="p-6 flex flex-col items-center text-center">
                  <h2 className="text-2xl font-semibold mb-6">Upload Video</h2>
                  
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 w-full transition-all duration-300 ${
                      isDragging 
                        ? 'border-teal-500 bg-teal-50' 
                        : 'border-gray-300 hover:border-teal-400 hover:bg-gray-50'
                    }`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center">
                      <Upload className="h-12 w-12 text-teal-500 mb-4" />
                      <p className="text-lg mb-2">Drag and drop your video here</p>
                      <p className="text-sm text-gray-500 mb-4">or</p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
                      >
                        Browse Files
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileInputChange}
                        accept="video/*"
                        className="hidden"
                      />
                    </div>
                  </div>
                  
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 bg-red-100 text-red-700 rounded-md"
                    >
                      <div className="flex items-center">
                        <FileX className="h-5 w-5 mr-2" />
                        {error}
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="mt-6 text-sm text-gray-500">
                    <p>Supported formats: MP4, WebM, Ogg</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Preview</h3>
                      <button 
                        onClick={handleResetVideo} 
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-4 flex items-center justify-center bg-black/5">
                    {videoUrl && (
                      <video 
                        src={videoUrl} 
                        controls 
                        className="max-h-[300px] max-w-full rounded shadow"
                      />
                    )}
                  </div>
                  
                  <div className="p-4 bg-teal-50 border-t">
                    <div className="flex justify-between items-center">
                      <div className="text-sm truncate max-w-[200px]">
                        {videoFile.name}
                      </div>
                      <button
                        onClick={handleClassify}
                        disabled={isProcessing || !isModelLoaded}
                        className={`px-4 py-2 rounded-md flex items-center ${
                          isProcessing || !isModelLoaded
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            : 'bg-teal-500 text-white hover:bg-teal-600'
                        }`}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <BarChart2 className="h-4 w-4 mr-2" />
                            Classify
                          </>
                        )}
                      </button>
                    </div>
                    
                    {!isModelLoaded && (
                      <div className="mt-2 text-sm text-teal-700">
                        <div className="flex items-center">
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          Loading model...
                        </div>
                      </div>
                    )}
                    
                    {isProcessing && loadingMessage && (
                      <div className="mt-2 text-xs text-teal-700">
                        {loadingMessage}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="neo-card h-full">
              <div className="p-4 border-b">
                <h3 className="font-medium">Classification Results</h3>
              </div>
              
              <div className="p-6 flex-1">
                <AnimatePresence mode="wait">
                  {!result && !isProcessing ? (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col items-center justify-center text-center p-8"
                    >
                      <div className="bg-gray-100 rounded-full p-4 mb-4">
                        <BarChart2 className="h-10 w-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">No Results Yet</h3>
                      <p className="text-gray-500 mb-4">
                        Upload a video and run the classifier to see results
                      </p>
                    </motion.div>
                  ) : isProcessing ? (
                    <motion.div
                      key="processing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col items-center justify-center text-center p-8"
                    >
                      <div className="bg-teal-50 rounded-full p-6 mb-6">
                        <Loader2 className="h-12 w-12 text-teal-500 animate-spin" />
                      </div>
                      <h3 className="text-xl font-medium mb-3">Processing Video</h3>
                      <p className="text-gray-600 mb-2">
                        Our TimeSformer model is analyzing your video...
                      </p>
                      <p className="text-sm text-teal-600 font-medium">
                        {loadingMessage}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="flex justify-center mb-6">
                        <div className="bg-teal-50 rounded-full p-4">
                          <CheckCircle className="h-10 w-10 text-teal-500" />
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-center mb-6">
                        Analysis Complete
                      </h3>
                      
                      <div className="grid grid-cols-1 gap-6">
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                          <div className="bg-teal-500 text-white px-4 py-2 font-medium">
                            Task Classification
                          </div>
                          <div className="p-4">
                            <div className="flex items-center justify-center">
                              <div className="text-3xl font-bold text-gray-800">
                                {result?.task}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                          <div className="bg-teal-500 text-white px-4 py-2 font-medium">
                            Attention Classification
                          </div>
                          <div className="p-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-800 mb-2">
                                {result?.attention}
                              </div>
                              <div className="text-sm text-gray-600">
                                {getAttentionExplanation(result?.attention || "")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <h4 className="font-medium text-blue-800 mb-2">Analysis Insights</h4>
                        <p className="text-sm text-blue-700">
                          The TimeSformer vision transformer with LSTM and DAM has identified patterns in the subject's gaze that correlate with 
                          the {result?.task.toLowerCase()} task and exhibits {result?.attention} characteristics.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Classify;
