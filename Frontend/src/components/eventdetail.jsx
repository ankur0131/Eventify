import React, { useState } from 'react';
import API from '../api';

export default function EventDetail({ event, onBack }) {
  const [seats, setSeats] = useState(1);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const book = async () => {
    setLoading(true);
    let token = localStorage.getItem('token');
    if (!token) {
      const email = prompt('Enter email:');
      const password = prompt('Enter password:');
      try {
        const reg = await API.post('/auth/register', { name: email.split('@')[0], email, password });
        localStorage.setItem('token', reg.data.token);
        API.defaults.headers.common['Authorization'] = `Bearer ${reg.data.token}`;
        token = reg.data.token;
      } catch {
        const lg = await API.post('/auth/login', { email, password });
        localStorage.setItem('token', lg.data.token);
        API.defaults.headers.common['Authorization'] = `Bearer ${lg.data.token}`;
        token = lg.data.token;
      }
    }

    try {
      const res = await API.post('/bookings', { event_id: event._id, seats });
      setMessage('✅ Booking confirmed! ID: ' + res.data._id);
    } catch (err) {
      setMessage('❌ ' + (err?.response?.data?.error || 'Booking failed'));
    }
    setLoading(false);
  };

  const totalPrice = event.price * seats;

  return (
    <div className="animate-fadeIn">
      <button 
        className="mb-6 flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors group" 
        onClick={onBack}
      >
        <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Events
      </button>

      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 p-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center text-3xl font-bold">
              {event.title.charAt(0)}
            </div>
            <div>
              <h2 className="text-4xl font-black">{event.title}</h2>
              <div className="flex items-center gap-3 mt-2 text-white/90">
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{event.date}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{event.venue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About This Event
            </h3>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-xl border border-purple-100">
              <div className="text-sm text-gray-600 mb-1">Price per Ticket</div>
              <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ${event.price}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-pink-50 p-4 rounded-xl border border-blue-100">
              <div className="text-sm text-gray-600 mb-1">Available Seats</div>
              <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
                {event.capacity}
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Book Your Tickets</h3>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Seats</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSeats(Math.max(1, seats - 1))}
                    className="w-10 h-10 rounded-lg bg-white border-2 border-purple-200 text-purple-600 font-bold hover:bg-purple-50 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={seats}
                    onChange={e=>setSeats(Math.max(1, Number(e.target.value)))}
                    className="w-20 h-10 text-center text-xl font-bold border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                  <button
                    onClick={() => setSeats(seats + 1)}
                    className="w-10 h-10 rounded-lg bg-white border-2 border-purple-200 text-purple-600 font-bold hover:bg-purple-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex-1 text-right">
                <div className="text-sm text-gray-600 mb-1">Total Amount</div>
                <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  ${totalPrice}
                </div>
              </div>
            </div>

            <button
              onClick={book}
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Confirm Booking
                </>
              )}
            </button>
          </div>

          {message && (
            <div className={`mt-4 p-4 rounded-xl ${message.includes('✅') ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'} font-semibold animate-fadeIn`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
