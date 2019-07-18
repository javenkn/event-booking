import React from 'react';

import './index.css';

function BookingItem({ _id, event, createdAt, onCancelBooking }) {
  return (
    <li className='bookings__item'>
      <div className='bookings__item-data'>
        {event.title} - {new Date(createdAt).toLocaleDateString()}
      </div>
      <div className='bookings__item-actions'>
        <button className='btn' onClick={() => onCancelBooking(_id)}>
          Cancel
        </button>
      </div>
    </li>
  );
}

export default function BookingList({ bookings, onCancelBooking }) {
  return (
    <ul className='bookings__list'>
      {bookings.map(booking => (
        <BookingItem
          key={booking._id}
          {...booking}
          onCancelBooking={onCancelBooking}
        />
      ))}
    </ul>
  );
}
