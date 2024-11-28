import React, { useState } from 'react';
import { Wallet, Menu, X, LogOut } from 'lucide-react';
import { useWalletStore } from '../store/walletStore';
import { useAuth } from '../context/AuthContext';
import WalletModal from './WalletModal';
import LoginModal from './LoginModal';

const Navbar: React.FC = () => {
  const [activeItem, setActiveItem] = useState('sports-betting');
  const [showWallet, setShowWallet] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { balance, currency } = useWalletStore();
  const { userId, logout } = useAuth();

  const menuItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'sports-betting', label: 'Sports Betting', icon: '⚽' },
    { id: 'casino', label: 'Casino Games', icon: '🎰' }
  ];

  const handleNavigation = (id: string) => {
    if (id === 'home') {
      window.open('http://localhost:3000', '_blank');
    } else if (id === 'casino') {
      window.open('http://localhost:3002', '_blank');
    } else {
      setActiveItem(id);
    }
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-40 border-b-2 border-amber-400">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => window.location.href = 'http://localhost:3000'}>
            <span className="text-2xl mr-2">🎯</span>
            <h1 className="text-xl font-semibold text-orange-600">KGF Game</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <div className="flex space-x-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-2
                    ${activeItem === item.id 
                      ? 'bg-orange-50 text-orange-600' 
                      : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                    }`}
                  onClick={() => handleNavigation(item.id)}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            {/* Wallet button (visible on desktop) */}
            {userId && (
              <button 
                onClick={() => setShowWallet(true)}
                className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#0A9480] hover:bg-[#0A9480]/90 hover:shadow-lg hover:shadow-[#0A9480]/30 transition-all duration-300 rounded-xl"
              >
                <div className="bg-white/20 rounded-full p-1">
                  <Wallet className="w-4 h-4" />
                </div>
                <span>₹{balance.toLocaleString()}</span>
              </button>
            )}

            {/* User profile/Login button (visible on desktop) */}
            {userId ? (
              <div className="hidden lg:flex items-center space-x-3 bg-orange-50 rounded-lg p-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-medium">
                    {userId.charAt(0).toUpperCase()}
                  </div>
                  <span className="ml-2 text-orange-600 font-medium">
                    {userId}
                  </span>
                </div>
                <div className="h-6 w-px bg-orange-200"></div>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-md transition-colors duration-200 border-none outline-none flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="hidden lg:flex px-4 py-2 rounded-md text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 transition-all duration-200"
              >
                Login
              </button>
            )}

            {/* Mobile and Tablet menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile and Tablet menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-2">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* User Profile for Mobile and Tablet */}
              {userId && (
                <div className="px-4 py-3 border-b border-gray-200 mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-medium text-lg">
                      {userId.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <div className="text-gray-900 font-medium">{userId}</div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>Logged in</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Items */}
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className={`w-full px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200 flex items-center space-x-3
                    ${activeItem === item.id 
                      ? 'bg-orange-50 text-orange-600' 
                      : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                    }`}
                  onClick={() => {
                    handleNavigation(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}

              {/* Wallet Button for Mobile and Tablet */}
              {userId && (
                <button 
                  onClick={() => {
                    setShowWallet(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium text-white bg-[#0A9480] hover:bg-[#0A9480]/90 hover:shadow-lg hover:shadow-[#0A9480]/30 transition-all duration-300"
                >
                  <div className="bg-white/20 rounded-full p-1 mr-2">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <span>₹{balance.toLocaleString()}</span>
                </button>
              )}

              {/* Login/Logout Button */}
              {userId ? (
                <div className="flex items-center justify-between px-3 py-2">
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-md transition-colors duration-200 border-none outline-none flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsLoginModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full mt-2 px-4 py-3 rounded-md text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span className="text-xl">🔑</span>
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <WalletModal 
        isOpen={showWallet}
        onClose={() => setShowWallet(false)}
      />
    </nav>
  );
};

export default Navbar;
