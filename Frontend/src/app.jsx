import React, {useEffect, useState} from 'react';
import EventList from './components/eventlist';
import { setToken } from './api';

export default function App(){
  const [token, setT] = useState(localStorage.getItem('token') || null);
  useEffect(()=> setToken(token), [token]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Eventify</h1>
        <p className="text-sm text-gray-600">MERN Events & Booking Demo</p>
      </header>

      <main>
        <EventList />
      </main>
    </div>
  );
}
