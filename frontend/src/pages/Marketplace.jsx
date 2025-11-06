import { useState, useEffect } from 'react';
import axios from '../api/axios';
import SwapModal from '../components/SwapModal';
import './Marketplace.css';

const Marketplace = () => {
  const [swappableSlots, setSwappableSlots] = useState([]);
  const [mySwappableSlots, setMySwappableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [slotsResponse, myEventsResponse] = await Promise.all([
        axios.get('/swaps/swappable-slots'),
        axios.get('/events')
      ]);
      setSwappableSlots(slotsResponse.data);
      setMySwappableSlots(myEventsResponse.data.filter(e => e.status === 'SWAPPABLE'));
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSwap = (slot) => {
    if (mySwappableSlots.length === 0) {
      alert('You need to have at least one swappable slot to request a swap. Go to Dashboard and mark an event as swappable.');
      return;
    }
    setSelectedSlot(slot);
    setShowModal(true);
  };

  const handleSwapSubmit = async (mySlotId) => {
    try {
      await axios.post('/swaps/request', {
        mySlotId,
        theirSlotId: selectedSlot.id
      });
      alert('Swap request sent successfully!');
      setShowModal(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to send swap request');
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

  if (loading) {
    return <div className="loading">Loading marketplace...</div>;
  }

  return (
    <div className="marketplace">
      <h2>Marketplace</h2>
      <p className="marketplace-description">
        Browse available time slots from other users and request a swap with one of your swappable slots.
      </p>

      {swappableSlots.length === 0 ? (
        <div className="empty-state">
          <p>No swappable slots available at the moment.</p>
          <p>Check back later or mark your own slots as swappable!</p>
        </div>
      ) : (
        <div className="slots-grid">
          {swappableSlots.map((slot) => (
            <div key={slot.id} className="slot-card">
              <div className="slot-header">
                <h4 className="slot-title">{slot.title}</h4>
                <span className="slot-owner">by {slot.owner.name}</span>
              </div>
              <div className="slot-time">
                <div className="time-label">Start:</div>
                <div>{formatDateTime(slot.startTime)}</div>
              </div>
              <div className="slot-time">
                <div className="time-label">End:</div>
                <div>{formatDateTime(slot.endTime)}</div>
              </div>
              <button
                onClick={() => handleRequestSwap(slot)}
                className="btn btn-primary btn-small"
              >
                Request Swap
              </button>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <SwapModal
          selectedSlot={selectedSlot}
          mySwappableSlots={mySwappableSlots}
          onSubmit={handleSwapSubmit}
          onClose={() => setShowModal(false)}
          formatDateTime={formatDateTime}
        />
      )}
    </div>
  );
};

export default Marketplace;
