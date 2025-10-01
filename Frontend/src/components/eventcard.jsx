import React from 'react';

export default function EventCard({ e, onView }) {
  return (
    <div className="group relative bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 hover:scale-[1.02] hover:-translate-y-1">
      {/* Gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur"></div>
      
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {e.title.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">{e.title}</h3>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{e.date}</span>
                <span>•</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{e.venue}</span>
              </div>
            </div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{e.description}</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
              {e.capacity} seats
            </span>
          </div>
        </div>
        
        <div className="flex md:flex-col items-end justify-between md:justify-start gap-3">
          <div className="text-right">
            <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ${e.price}
            </div>
            <div className="text-xs text-gray-500">per ticket</div>
          </div>
          <button
            onClick={() => onView(e)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <span>View Details</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
