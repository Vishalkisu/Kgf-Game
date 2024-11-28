import React from 'react';
import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface LockOverlayProps {
  onClick: () => void;
}

const LockOverlay: React.FC<LockOverlayProps> = ({ onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10 cursor-pointer"
      onClick={onClick}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="bg-white/10 p-4 rounded-full"
      >
        <Lock className="w-8 h-8 text-white" />
      </motion.div>
    </motion.div>
  );
};

export default LockOverlay;
