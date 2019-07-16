const Event = require('../../models/event');

const { transformEvent } = require('./merge');

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => transformEvent(event));
    } catch (error) {
      throw error;
    }
  },
  createEvent: async args => {
    const event = new Event({
      ...args.eventInput,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: '5d26f099853502e79c401ca9',
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = transformEvent(result);
      const creator = await User.findById('5d26f099853502e79c401ca9');
      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdEvents.push(event);
      await creator.save();
      return createdEvent;
    } catch (error) {
      throw error;
    }
  },
};
