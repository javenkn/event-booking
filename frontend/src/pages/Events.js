import React, { useState } from 'react';

import Modal from '../components/Modal';
import Backdrop from '../components/Backdrop';
import './Events.css';

export default function EventsPage() {
  const [creating, setCreating] = useState(false);
  return (
    <>
      {creating && <Backdrop />}
      {creating && (
        <Modal
          title='Add Event'
          canCancel
          canConfirm
          onCancel={() => setCreating(false)}
          onConfirm={() => setCreating(false)}
        />
      )}
      <div className='events-control'>
        <p>Share your own events!</p>
        <button className='btn' onClick={() => setCreating(true)}>
          Create Event
        </button>
      </div>
    </>
  );
}
