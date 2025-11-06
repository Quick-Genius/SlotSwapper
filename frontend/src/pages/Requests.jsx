import { useState, useEffect } from 'react';
import axios from '../api/axios';
import './Requests.css';

const Requests = () => {
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/swaps/requests');
      setIncoming(response.data.incoming);
      setOutgoing(response.data.outgoing);
    } catch (err) {
      console.error('Failed to fetch requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = async (requestId, accept) => {
    try {
      await axios.post(`/swaps/response/${requestId}`, { accept });
      alert(accept ? 'Swap accepted! Your calendars have been updated.' : 'Swap rejected.');
      fetchRequests();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to respond to swap request');
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

  const getStatusBadge = (status) => {
    const statusClasses = {
      PENDING: 'status-pending',
      ACCEPTED: 'status-accepted',
      REJECTED: 'status-rejected'
    };
    return <span className={`status-badge ${statusClasses[status]}`}>{status}</span>;
  };

  if (loading) {
    return <div className="loading">Loading requests...</div>;
  }

  return (
    <div className="requests">
      <h2>Swap Requests</h2>

      <div className="requests-section">
        <h3>Incoming Requests</h3>
        <p className="section-description">Other users want to swap with you</p>
        {incoming.length === 0 ? (
          <div className="empty-state">
            <p>No incoming swap requests</p>
          </div>
        ) : (
          <div className="requests-list">
            {incoming.map((request) => (
              <div key={request.id} className="request-card">
                <div className="request-header">
                  <div>
                    <span className="request-from">From: {request.proposer.name}</span>
                    {getStatusBadge(request.status)}
                  </div>
                </div>
                
                <div className="swap-details">
                  <div className="swap-slot">
                    <div className="slot-label">They offer:</div>
                    <div className="slot-info">
                      <div className="slot-info-title">{request.myEvent.title}</div>
                      <div className="slot-info-time">
                        {formatDateTime(request.myEvent.startTime)} - {formatDateTime(request.myEvent.endTime)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="swap-arrow-horizontal">⇄</div>
                  
                  <div className="swap-slot">
                    <div className="slot-label">For your:</div>
                    <div className="slot-info">
                      <div className="slot-info-title">{request.theirEvent.title}</div>
                      <div className="slot-info-time">
                        {formatDateTime(request.theirEvent.startTime)} - {formatDateTime(request.theirEvent.endTime)}
                      </div>
                    </div>
                  </div>
                </div>

                {request.status === 'PENDING' && (
                  <div className="request-actions">
                    <button
                      onClick={() => handleResponse(request.id, true)}
                      className="btn btn-success btn-small"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleResponse(request.id, false)}
                      className="btn btn-danger btn-small"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="requests-section">
        <h3>Outgoing Requests</h3>
        <p className="section-description">Swaps you've requested from others</p>
        {outgoing.length === 0 ? (
          <div className="empty-state">
            <p>No outgoing swap requests</p>
          </div>
        ) : (
          <div className="requests-list">
            {outgoing.map((request) => (
              <div key={request.id} className="request-card">
                <div className="request-header">
                  <div>
                    <span className="request-from">To: {request.responder.name}</span>
                    {getStatusBadge(request.status)}
                  </div>
                </div>
                
                <div className="swap-details">
                  <div className="swap-slot">
                    <div className="slot-label">You offer:</div>
                    <div className="slot-info">
                      <div className="slot-info-title">{request.myEvent.title}</div>
                      <div className="slot-info-time">
                        {formatDateTime(request.myEvent.startTime)} - {formatDateTime(request.myEvent.endTime)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="swap-arrow-horizontal">⇄</div>
                  
                  <div className="swap-slot">
                    <div className="slot-label">For their:</div>
                    <div className="slot-info">
                      <div className="slot-info-title">{request.theirEvent.title}</div>
                      <div className="slot-info-time">
                        {formatDateTime(request.theirEvent.startTime)} - {formatDateTime(request.theirEvent.endTime)}
                      </div>
                    </div>
                  </div>
                </div>

                {request.status === 'PENDING' && (
                  <div className="request-status-text">
                    Waiting for response...
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
