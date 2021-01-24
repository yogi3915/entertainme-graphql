const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server');
const movieSchema = require("./schema/movieSchema")
const tvSeriesSchema = require("./schema/tvSeriesSchema")
const axios = require('axios');

const typeDefs = gql`
    type Query
    type Mutation
`;
const schema = makeExecutableSchema({
    typeDefs : [
        typeDefs,
        movieSchema.typeDefs,
        tvSeriesSchema.typeDefs
    ],
    resolvers : [
        movieSchema.resolvers,
        tvSeriesSchema.resolvers
    ]
})

const server = new ApolloServer({ schema })

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });