import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/events');
      setEvents(response.data);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/events', { title, startTime, endTime });
      setTitle('');
      setStartTime('');
      setEndTime('');
      fetchEvents();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create event');
    }
  };

  const handleStatusChange = async (eventId, newStatus) => {
    try {
      await axios.patch(`/events/${eventId}`, { status: newStatus });
      fetchEvents();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDeleteEvent = async (eventId, status) => {
    let confirmMessage = 'Are you sure you want to delete this event?';
    
    if (status === 'SWAP_PENDING') {
      confirmMessage = 'This event is part of a pending swap request. Deleting it will cancel the swap and notify the other user. Are you sure you want to delete it?';
    }
    
    if (!confirm(confirmMessage)) return;
    
    try {
      await axios.delete(`/events/${eventId}`);
      fetchEvents();
      if (status === 'SWAP_PENDING') {
        alert('Event deleted and swap request cancelled.');
      }
    } catch (err) {
      console.error('Failed to delete event:', err);
      alert(err.response?.data?.error || 'Failed to delete event');
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <div className="sidebar-section">
          <div className="sidebar-title">SHORTCUTS</div>
          <div className="sidebar-item active"> All content</div>
          <div className="sidebar-item" onClick={() => navigate('/coming-soon')}>Analytics</div>
          <div className="sidebar-item" onClick={() => navigate('/coming-soon')}>Questions</div>
          <div className="sidebar-item" onClick={() => navigate('/coming-soon')}>Calendars</div>
          <div className="sidebar-item" onClick={() => navigate('/coming-soon')}>Space settings</div>
        </div>
        <div className="sidebar-section">
          <div className="sidebar-title">CONTENT</div>
          <div className="sidebar-item" onClick={() => navigate('/coming-soon')}>Strategy</div>
          <div className="sidebar-item" onClick={() => navigate('/coming-soon')}>Content</div>
          <div className="sidebar-item" onClick={() => navigate('/coming-soon')}>Design</div>
          <div className="sidebar-item" onClick={() => navigate('/coming-soon')}>Research</div>
        </div>
      </aside>

      <main className="dashboard-main">
        <div className="page-header">
          <h1 className="page-title">My Calendar</h1>
        </div>
        
        <div className="content-section">
          <h3 className="section-title">Create New Event</h3>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleCreateEvent} className="event-form">
            <div className="form-group">
              <label>Event Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Team Meeting"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Start Time</label>
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>End Time</label>
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="create-event-btn">Create Event</button>
          </form>
        </div>

        <div className="content-section">
          <h3 className="section-title">My Events</h3>
          {events.length === 0 ? (
            <div className="empty-state">
              <p>No events yet. Create your first event above!</p>
            </div>
          ) : (
            <div className="events-list">
              {events.map((event) => (
                <div key={event.id} className="event-card">
                  <div className="event-info">
                    <h4 className="event-title">{event.title}</h4>
                    <div className="event-time">
                      {formatDateTime(event.startTime)} - {formatDateTime(event.endTime)}
                    </div>
                  </div>
                  <span className={`event-status ${event.status.toLowerCase().replace('_', '-')}`}>
                    {event.status.replace('_', ' ')}
                  </span>
                  <div className="event-actions">
                    {event.status === 'BUSY' && (
                      <button
                        onClick={() => handleStatusChange(event.id, 'SWAPPABLE')}
                        className="btn btn-success"
                      >
                        Make Swappable
                      </button>
                    )}
                    {event.status === 'SWAPPABLE' && (
                      <button
                        onClick={() => handleStatusChange(event.id, 'BUSY')}
                        className="btn btn-secondary"
                      >
                        Mark as Busy
                      </button>
                    )}
                    {event.status === 'SWAP_PENDING' && (
                      <span style={{ color: '#FF991F', fontSize: '0.875rem', fontWeight: 500 }}>
                        Swap in progress...
                      </span>
                    )}
                    <button
                      onClick={() => handleDeleteEvent(event.id, event.status)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
