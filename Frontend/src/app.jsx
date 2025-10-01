import React, {useEffect, useState} from 'react';
import EventList from './components/eventlist';
import { setToken } from './api';

export default function App(){
  const [token, setT] = useState(localStorage.getItem('token') || null);
  useEffect(()=> setToken(token), [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-12 text-center">
          <div className="inline-block">
            <h1 className="text-6xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-3 animate-gradient">
              Eventify
            </h1>
            <div className="h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 rounded-full"></div>
          </div>
          <p className="mt-4 text-lg text-gray-600 font-medium">Discover Amazing Events & Book Your Spot</p>
        </header>

        <main>
          <EventList />
        </main>
      </div>
    </div>
  );
}
