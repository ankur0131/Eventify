import React, {useEffect, useState} from 'react';
import API from '../api';
import EventCard from './eventcard';
import EventDetail from './eventdetail';

export default function EventList(){
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(()=> {
    API.get('/events').then(r => setEvents(r.data)).catch(console.error);
  },[]);

  return (
    <div className="space-y-4">
      {selected ? (
        <EventDetail event={selected} onBack={() => setSelected(null)} />
      ) : (
        <div className="grid gap-4">
          {events.map(e => (
            <EventCard key={e._id} e={e} onView={setSelected} />
          ))}
        </div>
      )}
    </div>
  );
}
