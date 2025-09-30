import React, { useState } from 'react';
import API from '../api';

export default function EventDetail({ event, onBack }) {
  const [seats, setSeats] = useState(1);
  const [message, setMessage] = useState('');

  const book = async () => {
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
      setMessage('Booking confirmed! ID: ' + res.data._id);
    } catch (err) {
      setMessage(err?.response?.data?.error || 'Booking failed');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <button className="text-sm text-indigo-600 mb-4" onClick={onBack}>← back</button>
      <h2 className="text-2xl font-bold">{event.title}</h2>
      <p className="text-sm text-gray-600">{event.date} • {event.venue}</p>
      <p className="mt-3">{event.description}</p>

      <div className="mt-4 flex items-center gap-3">
        <input
          type="number"
          min="1"
          value={seats}
          onChange={e=>setSeats(Number(e.target.value))}
          className="w-20 p-2 border rounded"
        />
        <button
          onClick={book}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Book
        </button>
      </div>

      {message && <p className="mt-3 text-sm">{message}</p>}
    </div>
  );
}
