
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { Code, LineChart, Layers, ChevronsRight } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-4 gradient-text">About GazeNet</h1>
          <p className="text-lg text-slate-600">
            Advancing gaze analysis with cutting-edge AI technology
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="neo-card p-8 mb-10"
        >
          <h2 className="text-2xl font-bold mb-4">Our Technology</h2>
          <p className="text-slate-600 mb-6">
            GazeNet leverages state-of-the-art computer vision and deep learning technologies to analyze gaze patterns and classify tasks and attention levels. Our platform uses TimeSformer, a type of vision transformer combined with LSTM and Dynamic Attention Modulation (DAM) to achieve high accuracy and robustness.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: <Layers className="h-6 w-6 text-teal-500" />,
                title: "TimeSformer Vision Transformer",
                description: "Processes video sequences with high temporal awareness"
              },
              {
                icon: <Code className="h-6 w-6 text-teal-500" />,
                title: "LSTM Neural Networks",
                description: "Captures sequential patterns in gaze movements"
              },
              {
                icon: <LineChart className="h-6 w-6 text-teal-500" />,
                title: "Dynamic Attention Modulation",
                description: "Adaptively focuses on the most informative visual cues"
              }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                className="bg-teal-50 p-4 rounded-lg"
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-1">{tech.icon}</div>
                  <div>
                    <h3 className="font-medium text-teal-900 mb-1">{tech.title}</h3>
                    <p className="text-sm text-slate-600">{tech.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="neo-card p-8 mb-10"
        >
          <h2 className="text-2xl font-bold mb-4">Classification Capabilities</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-teal-700">Task Classification</h3>
            <p className="text-slate-600 mb-4">
              GazeNet can identify the following tasks based on gaze patterns:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {["Picture", "Reading", "Video"].map((task, i) => (
                <li key={i} className="flex items-center bg-white p-3 rounded-md border border-teal-100 shadow-sm">
                  <ChevronsRight className="h-4 w-4 text-teal-500 mr-2" />
                  <span className="font-medium">{task}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2 text-teal-700">Attention Classification</h3>
            <p className="text-slate-600 mb-4">
              Our system categorizes attention into these detailed patterns:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  label: "BVPS (GTSS)",
                  description: "Bad visuo-perceptual skills, Good task switching skills"
                },
                {
                  label: "BVPS (TSS)",
                  description: "Bad visuo-perceptual skills, Bad task switching skills"
                },
                {
                  label: "GVPS (BTSS)",
                  description: "Good visuo-perceptual skills, Bad task switching skills"
                },
                {
                  label: "GVPS (TSS)",
                  description: "Good visuo-perceptual skills, Good task switching skills"
                }
              ].map((attention, i) => (
                <div key={i} className="bg-white p-3 rounded-md border border-teal-100 shadow-sm">
                  <div className="flex items-center mb-1">
                    <ChevronsRight className="h-4 w-4 flex-shrink-0 text-teal-500 mr-2" />
                    <span className="font-medium">{attention.label}</span>
                  </div>
                  <p className="text-xs text-slate-500 pl-6">{attention.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-gradient-to-br from-teal-500/10 to-teal-300/10 rounded-xl p-6 border border-teal-200/30 backdrop-blur-sm text-center"
        >
          <h2 className="text-xl font-bold mb-2">Experience GazeNet</h2>
          <p className="text-slate-600 mb-4">
            Upload your own videos to see our advanced classification system in action.
          </p>
          <a 
            href="/classify" 
            className="inline-block px-5 py-2 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg shadow-md transition-all duration-300"
          >
            Try the Classifier
          </a>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default About;
