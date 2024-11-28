import React, { useState, useEffect } from 'react';

const Banner: React.FC = () => {
  const slides = [
    {
      title: "Live Cricket Betting",
      description: "Experience the thrill of live cricket betting with real-time odds",
      gradient: "from-orange-500 via-amber-500 to-orange-400",
      icons: "🏏 💰 🎯 ⚡"
    },
    {
      title: "Multiple Match Types",
      description: "Bet on T20, ODI, and Test matches with competitive odds",
      gradient: "from-orange-600 via-amber-500 to-yellow-500",
      icons: "🏆 🎲 📈 💫"
    },
    {
      title: "Instant Payouts",
      description: "Quick withdrawals and secure transactions for your winnings",
      gradient: "from-amber-500 via-orange-500 to-red-500",
      icons: "💎 ⭐ 🌟 ✨"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[300px] sm:h-[350px] md:h-[400px] w-full overflow-hidden shadow-lg">
      {/* Background Gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].gradient} transition-all duration-1000 ease-in-out`}
      />
      
      {/* Animated Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)',
          backgroundSize: '12px 12px',
          animation: 'movePattern 20s linear infinite'
        }} />
      </div>

      {/* Content Overlay */}
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4 text-center">
        <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
          {/* Icons with Animation */}
          <div className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-4 space-x-2 sm:space-x-4 animate-bounce-subtle">
            {slides[currentSlide].icons.split(' ').map((icon, index) => (
              <span 
                key={index}
                className="inline-block transform hover:scale-125 transition-transform duration-300"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {icon}
              </span>
            ))}
          </div>
          
          {/* Title with Animation */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-shadow-glow animate-fade-in px-2">
            {slides[currentSlide].title}
          </h2>
          
          {/* Description */}
          <p className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto opacity-90 text-shadow-sm px-2">
            {slides[currentSlide].description}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-6 md:mt-8 px-4">
            <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-orange-600 rounded-lg 
              hover:bg-orange-50 transform hover:scale-105 transition-all duration-300
              shadow-lg hover:shadow-xl font-bold text-base sm:text-lg w-full sm:w-auto">
              Place Bet Now
            </button>
            <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-transparent border-2 border-white text-white rounded-lg 
              hover:bg-white/10 transform hover:scale-105 transition-all duration-300
              shadow-lg hover:shadow-xl font-bold text-base sm:text-lg w-full sm:w-auto">
              View Matches
            </button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center space-x-2 sm:space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-white w-6 sm:w-8' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

/* Add keyframes for animations */
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes movePattern {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100px 100px;
    }
  }

  .text-shadow-glow {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }

  .text-shadow-sm {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  @keyframes bounce-subtle {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .animate-bounce-subtle {
    animation: bounce-subtle 2s ease-in-out infinite;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
`;
document.head.appendChild(styleSheet);

export default Banner;
