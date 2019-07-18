import React from 'react';

import './index.css';

export default function BookingTabs({ activeTab, changeTabHandler }) {
  return (
    <div className='bookings-control'>
      <button
        className={activeTab === 'list' ? 'active' : ''}
        onClick={() => changeTabHandler('list')}
      >
        List
      </button>
      <button
        className={activeTab === 'chart' ? 'active' : ''}
        onClick={() => changeTabHandler('chart')}
      >
        Chart
      </button>
    </div>
  );
}
