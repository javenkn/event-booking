import React from 'react';

import './index.css';

function EventItem({ _id, title, price, date, creator, userId, onDetail }) {
  return (
    <li className='events__list-item'>
      <div>
        <h1>{title}</h1>
        <h2>
          ${price} - {new Date(date).toLocaleDateString()}
        </h2>
      </div>
      <div>
        {userId === creator._id ? (
          <p>You are the owner of this event.</p>
        ) : (
          <button className='btn' onClick={() => onDetail(_id)}>
            View Details
          </button>
        )}
      </div>
    </li>
  );
}

export default function EventList({ events, authUserId, onViewDetail }) {
  return (
    <ul className='events__list'>
      {events.map(event => (
        <EventItem
          key={event._id}
          {...event}
          userId={authUserId}
          onDetail={onViewDetail}
        />
      ))}
    </ul>
  );
}
