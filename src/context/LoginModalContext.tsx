import React, { createContext, useContext, useState, ReactNode } from 'react';
import LoginModal from '../components/LoginModal';

interface LoginModalContextType {
  showLoginModal: () => void;
  hideLoginModal: () => void;
}

const LoginModalContext = createContext<LoginModalContextType | undefined>(undefined);

export const useLoginModal = () => {
  const context = useContext(LoginModalContext);
  if (context === undefined) {
    throw new Error('useLoginModal must be used within a LoginModalProvider');
  }
  return context;
};

export const LoginModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const showLoginModal = () => setIsOpen(true);
  const hideLoginModal = () => setIsOpen(false);

  return (
    <LoginModalContext.Provider value={{ showLoginModal, hideLoginModal }}>
      {children}
      <LoginModal isOpen={isOpen} onClose={hideLoginModal} />
    </LoginModalContext.Provider>
  );
};
