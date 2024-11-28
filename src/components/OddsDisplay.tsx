import React from 'react';
import { useBetSlipStore } from '../store/betSlipStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { OddsPoint } from '../services/sportsApi';

interface OddsDisplayProps {
  matchId: string;
  matchName: string;
  selectionName: string;
  backOdds: OddsPoint[];
  layOdds: OddsPoint[];
  disabled?: boolean;
}

const OddsButton: React.FC<{
  odds: OddsPoint;
  isBack: boolean;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
  showVolume?: boolean;
}> = ({ odds, isBack, isSelected, onClick, disabled, showVolume }) => {
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  };

  const checkmarkVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 500, damping: 25 } 
    },
    exit: { 
      scale: 0, 
      opacity: 0,
      transition: { duration: 0.2 } 
    }
  };

  return (
    <motion.button
      variants={buttonVariants}
      initial="initial"
      whileHover={disabled ? undefined : "hover"}
      whileTap={disabled ? undefined : "tap"}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative group w-full py-1.5 sm:py-2 px-2 sm:px-3 rounded-md transition-all duration-200
        ${disabled ? 'cursor-not-allowed bg-gray-50 text-gray-400' : 
          isBack ? 
            isSelected ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' : 'bg-blue-50 text-blue-600 hover:bg-blue-100' :
            isSelected ? 'bg-red-50 text-red-700 hover:bg-red-100' : 'bg-red-50 text-red-600 hover:bg-red-100'
        }
        ${isSelected ? 'ring-1 ' + (isBack ? 'ring-blue-300' : 'ring-red-300') : ''}
        transform-gpu hover:shadow-sm
      `}
    >
      <div className="flex items-center justify-center space-x-1">
        <AnimatePresence>
          {isSelected && (
            <motion.div
              variants={checkmarkVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute top-0.5 sm:top-1 right-0.5 sm:right-1"
            >
              <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.span 
          className="text-sm sm:text-base font-medium"
          animate={{ scale: isSelected ? 1.02 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {odds.price.toFixed(2)}
        </motion.span>
      </div>
      
      {/* Hover effect */}
      {!disabled && (
        <motion.div 
          className={`
            absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 
            transition-opacity duration-200 ease-in-out
            ${isBack ? 'bg-blue-100' : 'bg-red-100'} mix-blend-overlay
          `}
          initial={false}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
};

const OddsDisplay: React.FC<OddsDisplayProps> = ({
  matchId,
  matchName,
  selectionName,
  backOdds,
  layOdds,
  disabled = false,
}) => {
  const { addSelection, removeSelection, getSelectionByMatch } = useBetSlipStore();

  const handleOddsClick = (odds: OddsPoint, isBack: boolean) => {
    if (disabled) return;

    const existingSelection = getSelectionByMatch(matchId, selectionName);
    
    if (existingSelection?.odds === odds.price && existingSelection?.isBack === isBack) {
      removeSelection(matchId, selectionName);
    } else {
      addSelection({
        matchId,
        matchName,
        selectionName,
        odds: odds.price,
        isBack,
        stake: 0
      });
    }
  };

  const isSelected = (odds: OddsPoint, isBack: boolean) => {
    const selection = getSelectionByMatch(matchId, selectionName);
    return selection?.odds === odds.price && selection?.isBack === isBack;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-2 sm:p-3 bg-white rounded-lg shadow-sm border border-gray-100"
    >
      <div className="grid grid-cols-6 gap-2 sm:gap-3">
        {/* Back odds */}
        <div className="col-span-3 space-y-1 sm:space-y-1.5">
          <div className="text-[10px] sm:text-xs font-medium text-blue-600 text-center">Back</div>
          <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
            {backOdds.map((odds, index) => (
              <OddsButton
                key={`back-${index}`}
                odds={odds}
                isBack={true}
                isSelected={isSelected(odds, true)}
                onClick={() => handleOddsClick(odds, true)}
                disabled={disabled}
                showVolume={false}
              />
            ))}
          </div>
        </div>

        {/* Lay odds */}
        <div className="col-span-3 space-y-1 sm:space-y-1.5">
          <div className="text-[10px] sm:text-xs font-medium text-red-600 text-center">Lay</div>
          <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
            {layOdds.map((odds, index) => (
              <OddsButton
                key={`lay-${index}`}
                odds={odds}
                isBack={false}
                isSelected={isSelected(odds, false)}
                onClick={() => handleOddsClick(odds, false)}
                disabled={disabled}
                showVolume={false}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Selection name */}
      <div className="mt-2 sm:mt-3 text-center">
        <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-0.5 sm:mb-1">
          {selectionName}
        </h3>
        <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-2">
          {matchName}
        </p>
      </div>
    </motion.div>
  );
};

export default OddsDisplay;