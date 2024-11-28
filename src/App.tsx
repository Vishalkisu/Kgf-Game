import React, { useState, useEffect } from 'react';
import { Match, fetchMatches } from './services/sportsApi';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import MatchList from './components/MatchList';
import SportSelector from './components/SportSelector';
import BetSlip from './components/BetSlip';
import BetPortfolio from './components/BetPortfolio';
import { AuthProvider } from './context/AuthContext';
import { LoginModalProvider } from './context/LoginModalContext';
import { Toaster } from 'react-hot-toast';

function App() {
  const [selectedSport, setSelectedSport] = useState('cricket');
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMatches(selectedSport);
        setMatches(data);
      } catch (err) {
        setError('Failed to load matches. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
    const interval = setInterval(loadMatches, 30000);
    return () => clearInterval(interval);
  }, [selectedSport]);

  const leagues = Array.from(new Set(matches.map(match => match.league)));
  leagues.unshift('all');

  return (
    <AuthProvider>
      <LoginModalProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Banner />
            <div className="mt-8 flex gap-6">
              {/* Main content */}
              <div className="flex-1 overflow-auto">
                <div className="container mx-auto p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <BetPortfolio />
                      <div className="mt-6">
                        <SportSelector
                          selectedSport={selectedSport}
                          onSelectSport={(sport) => {
                            setSelectedSport(sport);
                            setSelectedLeague('all');
                          }}
                        />

                        <div className="mb-8">
                          <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                            {leagues.map((league) => (
                              <button
                                key={league}
                                onClick={() => setSelectedLeague(league)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                                  selectedLeague === league
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                {league === 'all' ? 'All Matches' : league}
                              </button>
                            ))}
                          </div>

                          {loading ? (
                            <div className="text-center py-12">
                              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-r-transparent"></div>
                              <p className="mt-2 text-gray-600">Loading matches...</p>
                            </div>
                          ) : error ? (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                              {error}
                            </div>
                          ) : matches.length === 0 ? (
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-600">
                              No matches available at the moment.
                            </div>
                          ) : (
                            <MatchList
                              selectedLeague={selectedLeague}
                              selectedSport={selectedSport}
                              matches={matches}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <BetSlip />
                      <Toaster 
                        position="top-right"
                        toastOptions={{
                          duration: 3000,
                          style: {
                            background: '#333',
                            color: '#fff',
                          },
                          success: {
                            iconTheme: {
                              primary: '#22c55e',
                              secondary: '#fff',
                            },
                          },
                          error: {
                            iconTheme: {
                              primary: '#ef4444',
                              secondary: '#fff',
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </LoginModalProvider>
    </AuthProvider>
  );
}

export default App;