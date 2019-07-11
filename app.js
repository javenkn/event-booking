const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Event = require('./models/event');
const User = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`
      type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      type User {
        _id: ID!
        email: String!
        password: String
      }

      input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      input UserInput {
        email: String!
        password: String!
      }

      type RootQuery {
        events: [Event!]!
      }

      type RootMutation {
        createEvent(eventInput: EventInput): Event!
        createUser(userInput: UserInput): User!
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      events: () =>
        Event.find()
          .then(events =>
            events.map(event => ({
              ...event._doc,
              _id: event.id,
            })),
          )
          .catch(err => {
            throw err;
          }),
      createEvent: args => {
        const event = new Event({
          ...args.eventInput,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
          creator: '5d26a6870794934912629045',
        });
        let createdEvent;
        return event
          .save()
          .then(result => {
            createdEvent = { ...result._doc, _id: result.id };
            return User.findById('5d26a6870794934912629045');
          })
          .then(user => {
            if (!user) {
              throw new Error('User not found.');
            }
            user.createdEvents.push(event);
            return user.save();
          })
          .then(() => createdEvent)
          .catch(err => {
            console.log(err);
            throw err;
          });
      },
      createUser: args => {
        return User.findOne({ email: args.userInput.email })
          .then(user => {
            if (user) {
              throw new Error('User exists already.');
            }
            return bcrypt.hash(args.userInput.password, 12);
          })
          .then(hashedPassword => {
            const user = new User({
              ...args.userInput,
              password: hashedPassword,
            });
            return user.save();
          })
          .then(result => ({ ...result._doc, _id: result.id, password: null }))
          .catch(err => {
            throw err;
          });
      },
    },
    graphiql: true,
  }),
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-dlpcs.mongodb.net/${
      process.env.MONGO_DB
    }?retryWrites=true&w=majority`,
  )
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
