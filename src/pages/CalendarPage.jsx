import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { es } from 'date-fns/locale';
import { Heart, Star, Calendar as CalendarIcon, Plus, X, Trash2 } from 'lucide-react';
import bow from '../assets/images/bow.png';

const CalendarPage = () => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem('hk-events');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('hk-events', JSON.stringify(events));
  }, [events]);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate
  });

  const handleDayClick = (day) => {
    setSelectedDate(day);
    setIsModalOpen(true);
  };

  const addEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle.trim() || !selectedDate) return;

    setEvents([...events, {
      id: Date.now(),
      date: selectedDate.toISOString(),
      title: newEventTitle,
      type: 'custom'
    }]);
    setNewEventTitle('');
    setIsModalOpen(false);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const getEventsForDay = (day) => {
    return events.filter(e => isSameDay(new Date(e.date), day));
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <img src={bow} alt="Bow" style={{ width: '50px', mixBlendMode: 'multiply' }} />
        <h1 style={{ color: 'var(--hk-pink-hot)', margin: 0, textTransform: 'capitalize' }}>
          {format(today, 'MMMM yyyy', { locale: es })}
        </h1>
        <img src={bow} alt="Bow" style={{ width: '50px', mixBlendMode: 'multiply' }} />
      </div>

      <div style={{
        backgroundColor: 'var(--hk-white)',
        borderRadius: 'var(--hk-radius)',
        padding: '15px',
        boxShadow: 'var(--hk-shadow)'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '10px', textAlign: 'center', fontWeight: 'bold', color: 'var(--hk-pink-hot)' }}>
          {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(d => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
          {calendarDays.map((dayItem, i) => {
            const isCurrentMonth = isSameMonth(dayItem, monthStart);
            const isDayToday = isToday(dayItem);
            const isAnniversary = dayItem.getDate() === 27;
            const dayEvents = getEventsForDay(dayItem);
            const hasEvents = dayEvents.length > 0;

            return (
              <div
                key={i}
                onClick={() => handleDayClick(dayItem)}
                style={{
                  aspectRatio: '1/1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '15px',
                  backgroundColor: isDayToday ? 'var(--hk-pink-hot)' : isAnniversary ? 'var(--hk-pink-light)' : 'transparent',
                  color: isDayToday ? 'white' : isCurrentMonth ? 'var(--hk-text)' : '#ddd',
                  fontWeight: isDayToday || isAnniversary ? 'bold' : 'normal',
                  border: isAnniversary && !isDayToday ? '2px solid var(--hk-pink-medium)' : '1px solid transparent',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                {format(dayItem, 'd')}
                {hasEvents && (
                  <div style={{ display: 'flex', gap: '2px', marginTop: '2px' }}>
                    {dayEvents.map((ev, idx) => (
                      <div key={idx} style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: isDayToday ? 'white' : 'var(--hk-pink-hot)' }} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Event List for Selected Day or Upcoming */}
      <div style={{ marginTop: '20px', backgroundColor: 'var(--hk-white)', padding: '15px', borderRadius: 'var(--hk-radius)' }}>
        <h3 style={{ color: 'var(--hk-pink-hot)', marginBottom: '10px' }}>Eventos</h3>
        <ul style={{ listStyle: 'none' }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <Heart size={16} color="var(--hk-red)" fill="var(--hk-red)" />
            <span>27: Nuestro Aniversario Mensual 💖</span>
          </li>
          {events.map(ev => (
            <li key={ev.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Star size={16} color="var(--hk-pink-hot)" />
              <span style={{ flex: 1 }}>
                <strong>{format(new Date(ev.date), 'd MMM')}:</strong> {ev.title}
              </span>
              <button onClick={() => deleteEvent(ev.id)} style={{ color: '#ff9999', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <Trash2 size={14} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Event Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: 'var(--hk-radius)',
            width: '80%',
            maxWidth: '300px',
            boxShadow: 'var(--hk-shadow)'
          }}>
            <h3 style={{ marginBottom: '15px', color: 'var(--hk-pink-hot)' }}>
              Añadir evento el {format(selectedDate, 'd MMM')}
            </h3>
            <form onSubmit={addEvent}>
              <input
                type="text"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                placeholder="Ej: Cita romántica"
                autoFocus
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  border: '1px solid var(--hk-pink-medium)',
                  marginBottom: '15px'
                }}
              />
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: '8px 15px', borderRadius: '10px', backgroundColor: '#f0f0f0', border: 'none', cursor: 'pointer' }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 15px', borderRadius: '10px', backgroundColor: 'var(--hk-pink-hot)', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
