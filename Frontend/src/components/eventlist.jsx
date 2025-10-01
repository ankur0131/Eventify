import React, {useEffect, useState} from 'react';
import API from '../api';
import EventCard from './eventcard';
import EventDetail from './eventdetail';

export default function EventList(){
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=> {
    API.get('/events')
      .then(r => {
        setEvents(r.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load events. Please try again later.');
        setLoading(false);
      });
  },[]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <svg className="animate-spin h-12 w-12 text-purple-600 mb-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-gray-600 font-semibold">Loading amazing events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
        <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-red-800 font-semibold text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {selected ? (
        <EventDetail event={selected} onBack={() => setSelected(null)} />
      ) : (
        <>
          {events.length === 0 ? (
            <div className="bg-white/70 backdrop-blur-lg border-2 border-purple-200 rounded-2xl p-12 text-center">
              <svg className="w-20 h-20 text-purple-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Events Available</h3>
              <p className="text-gray-600">Check back soon for exciting events!</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {events.map(e => (
                <EventCard key={e._id} e={e} onView={setSelected} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
