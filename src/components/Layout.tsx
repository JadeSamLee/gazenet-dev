
import { ReactNode } from 'react';
import Header from './Header';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <motion.main 
        className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.main>
      
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 bg-mesh-grid pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-teal-50/30 via-transparent to-transparent -z-10 pointer-events-none"></div>
    </div>
  );
};

export default Layout;
