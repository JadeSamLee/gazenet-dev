
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Info, BarChart2, Menu, X, Eye } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { to: '/', label: 'Home', icon: <Home className="w-4 h-4 mr-2" /> },
    { to: '/about', label: 'About', icon: <Info className="w-4 h-4 mr-2" /> },
    { to: '/classify', label: 'Classify', icon: <BarChart2 className="w-4 h-4 mr-2" /> }
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/70 backdrop-blur-lg shadow-sm border-b border-slate-200/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <NavLink to="/" className="flex items-center">
              <div className="relative h-10 w-10 bg-gradient-to-br from-teal-700 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm"></span>
                <Eye className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold gradient-text">GazeNet</span>
            </NavLink>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex space-x-1"
          >
            {navItems.map((item, index) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md transition-all duration-300 ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-md'
                      : 'hover:bg-teal-100 text-gray-700'
                  }`
                }
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center"
                >
                  {item.icon}
                  {item.label}
                </motion.div>
              </NavLink>
            ))}
          </motion.nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-teal-700" />
              ) : (
                <Menu className="h-6 w-6 text-teal-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white border-b border-slate-200/50"
      >
        <div className="container mx-auto px-4 py-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-md ${
                  isActive
                    ? 'bg-teal-700 text-white'
                    : 'hover:bg-teal-100 text-gray-700'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
