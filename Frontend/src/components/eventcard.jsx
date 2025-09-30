import React from 'react';

export default function EventCard({ e, onView }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-start">
      <div>
        <h3 className="font-semibold">{e.title}</h3>
        <p className="text-sm text-gray-500">{e.date} • {e.venue}</p>
        <p className="mt-2 text-sm">{e.description}</p>
      </div>
      <div className="text-right">
        <div className="text-lg font-medium">${e.price}</div>
        <button
          onClick={() => onView(e)}
          className="mt-2 px-3 py-1 rounded bg-indigo-600 text-white text-sm"
        >
          View
        </button>
      </div>
    </div>
  );
}
