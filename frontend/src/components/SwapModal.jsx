import { useState } from 'react';
import './SwapModal.css';

const SwapModal = ({ selectedSlot, mySwappableSlots, onSubmit, onClose, formatDateTime }) => {
  const [selectedMySlot, setSelectedMySlot] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMySlot) {
      alert('Please select one of your slots to offer');
      return;
    }
    onSubmit(parseInt(selectedMySlot));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Request Swap</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          <div className="swap-section">
            <h4>You want:</h4>
            <div className="slot-preview">
              <div className="slot-preview-title">{selectedSlot.title}</div>
              <div className="slot-preview-owner">by {selectedSlot.owner.name}</div>
              <div className="slot-preview-time">
                {formatDateTime(selectedSlot.startTime)} - {formatDateTime(selectedSlot.endTime)}
              </div>
            </div>
          </div>

          <div className="swap-arrow">⇅</div>

          <div className="swap-section">
            <h4>Select your slot to offer:</h4>
            <form onSubmit={handleSubmit}>
              <div className="slots-selection">
                {mySwappableSlots.map((slot) => (
                  <label key={slot.id} className="slot-option">
                    <input
                      type="radio"
                      name="mySlot"
                      value={slot.id}
                      checked={selectedMySlot === slot.id.toString()}
                      onChange={(e) => setSelectedMySlot(e.target.value)}
                    />
                    <div className="slot-option-content">
                      <div className="slot-option-title">{slot.title}</div>
                      <div className="slot-option-time">
                        {formatDateTime(slot.startTime)} - {formatDateTime(slot.endTime)}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              <div className="modal-actions">
                <button type="button" onClick={onClose} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Send Swap Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapModal;
