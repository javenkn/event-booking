import React from 'react';
import { Bar as BarChart } from 'react-chartjs';

import './index.css';

const BOOKING_BUCKETS = {
  Cheap: { min: 0, max: 100 },
  Normal: { min: 100, max: 200 },
  Expensive: { min: 200, max: 100000 },
};

export default function Chart({ bookings }) {
  const chartData = { labels: Object.keys(BOOKING_BUCKETS), datasets: [] };
  let values = [];
  for (const bucket in BOOKING_BUCKETS) {
    const filteredBookingsCount = bookings.reduce((acc, booking) => {
      if (
        booking.event.price > BOOKING_BUCKETS[bucket].min &&
        booking.event.price < BOOKING_BUCKETS[bucket].max
      ) {
        return acc + 1;
      }
      return acc;
    }, 0);
    values.push(filteredBookingsCount);
    chartData.datasets.push({
      fillColor: 'rgba(220,220,220,0.5)',
      strokeColor: 'rgba(220,220,220,0.8)',
      highlightFill: 'rgba(220,220,220,0.75)',
      highlightStroke: 'rgba(220,220,220,1)',
      data: values,
    });
    /**
     * Each dataset has to have the data formatted like:
     * datasets: [
     *  {
     *    ...
     *    data: [5] // first column
     *  },
     *  {
     *    ...
     *    data: [0, 1] // second column
     *  },
     *  {
     *    ...
     *    data: [0, 0, 2] // third column
     *  }
     * ]
     *
     *  */
    values = [...values];
    values[values.length - 1] = 0;
  }
  return (
    <div className='bookings-chart'>
      <BarChart data={chartData} />
    </div>
  );
}
