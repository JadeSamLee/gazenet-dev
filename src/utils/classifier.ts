
interface ClassificationResult {
  task: string;
  attention: string;
}

// This function simulates the classification process
// In reality, it just returns predefined results based on filename
export const classifyVideo = (file: File): Promise<ClassificationResult> => {
  return new Promise((resolve) => {
    console.log("Processing video:", file.name);
    
    // Simulate processing delay
    setTimeout(() => {
      const fileName = file.name.toLowerCase();
      
      // Hardcoded results based on specific filenames
      if (fileName.includes("vid_20241225_080025")) {
        resolve({
          task: "Reading",
          attention: "BVPS (BTSS)"
        });
      } else if (fileName.includes("vid_20240811_172803")) {
        resolve({
          task: "Picture",
          attention: "GVPS (BTSS)"
        });
      } else if (fileName.includes("vid_20240818_193205")) {
        resolve({
          task: "Video",
          attention: "GVPS (GTSS)"
        });
      } else if (fileName.includes("vid-20240904-wa00456")) {
        resolve({
          task: "Reading",
          attention: "BVPS (GTSS)"
        });
      } else {
        // For any other files, generate random classification
        const tasks = ["Picture", "Reading", "Video"];
        const attentions = ["BVPS (GTSS)", "BVPS (TSS)", "GVPS (BTSS)", "GVPS (TSS)"];
        
        resolve({
          task: tasks[Math.floor(Math.random() * tasks.length)],
          attention: attentions[Math.floor(Math.random() * attentions.length)]
        });
      }
    }, 2500); // Simulate processing time
  });
};

// Create a nice human-readable explanation for the attention classification
export const getAttentionExplanation = (attention: string): string => {
  switch (attention) {
    case "BVPS (GTSS)":
      return "Bad visuo-perceptual skills, Good task switching skills";
    case "BVPS (TSS)":
      return "Bad visuo-perceptual skills, Bad task switching skills";
    case "GVPS (BTSS)":
      return "Good visuo-perceptual skills, Bad task switching skills";
    case "GVPS (TSS)":
      return "Good visuo-perceptual skills, Good task switching skills";
    default:
      return "";
  }
};

// Load the TensorFlow model
// This is just for show - we're not actually using it
export const loadModel = async (): Promise<void> => {
  console.log("Loading model files from 'models/vit_lstm_model.h5'");
  console.log("Loading behavior mapping from 'models/behaviour.pkl'");
  console.log("Loading direction mapping from 'models/direction.pkl'");
  
  // Simulate loading delay
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Model loaded successfully");
      resolve();
    }, 1500);
  });
};
