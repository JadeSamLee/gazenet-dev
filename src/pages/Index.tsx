
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BarChart2, Brain, Eye, Activity } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="gradient-text">Vision Intelligence</span>
          <span className="block">for Attention Analysis</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
          GazeNet uses advanced TimeSformer vision transformer technology to analyze gaze patterns 
          and classify task engagement and attention characteristics.
        </p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link 
            to="/classify" 
            className="inline-flex items-center px-6 py-3 bg-teal-500 text-white font-medium rounded-lg shadow-lg hover:bg-teal-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            <BarChart2 className="mr-2 h-5 w-5" />
            Try Classifier
          </Link>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
      >
        {[
          {
            icon: <Eye className="h-10 w-10 text-teal-500" />,
            title: "Gaze Detection",
            description: "Advanced computer vision algorithms track and analyze eye movements with precision."
          },
          {
            icon: <Brain className="h-10 w-10 text-teal-500" />,
            title: "Neural Classification",
            description: "TimeSformer vision transformer with LSTM and Dynamic Attention Modulation for state-of-the-art performance."
          },
          {
            icon: <Activity className="h-10 w-10 text-teal-500" />,
            title: "Task Analysis",
            description: "Identifies current tasks and assesses attention patterns to provide comprehensive insights."
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
            className="neo-card p-6 hover-lift glow-effect"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-teal-50 p-3">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="bg-gradient-to-r from-teal-500/10 to-teal-300/10 rounded-2xl p-8 border border-teal-200/30 backdrop-blur-sm"
      >
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h2 className="text-2xl font-bold mb-2">Ready to analyze your data?</h2>
            <p className="text-slate-600">
              Upload your videos to our secure platform and get instant classification results.
            </p>
          </div>
          <Link 
            to="/classify" 
            className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg shadow-md transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
