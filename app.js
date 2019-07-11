const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQLSchema = require('./graphql/schemas');
const graphQLResolvers = require('./graphql/resolvers');

const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
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
