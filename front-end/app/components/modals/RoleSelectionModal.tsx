
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Briefcase } from 'lucide-react';
import { useAppContext } from '@/app/context/ModalContext';

const RoleSelectionModal = () => {
  const { isRoleModalOpen, setRoleModalOpen, handleRoleSelect } = useAppContext();

  return (
    <AnimatePresence>
      {isRoleModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={() => setRoleModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-800 border border-blue-500/20 rounded-2xl p-8 w-full max-w-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setRoleModalOpen(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <h3 className="text-3xl font-bold text-center mb-8">Choose your role</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRoleSelect('Landowner')}
                className="flex flex-col items-center justify-center p-8 bg-gray-700/50 rounded-xl border border-transparent hover:border-blue-500 transition-all duration-300"
              >
                <Home size={48} className="text-blue-400 mb-4" />
                <span className="text-xl font-semibold">Landowner</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRoleSelect('Buyer')}
                className="flex flex-col items-center justify-center p-8 bg-gray-700/50 rounded-xl border border-transparent hover:border-purple-500 transition-all duration-300"
              >
                <Briefcase size={48} className="text-purple-400 mb-4" />
                <span className="text-xl font-semibold">Buyer / Investor</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RoleSelectionModal;
