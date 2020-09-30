import { GraphQLServerLambda } from "graphql-yoga";
import * as dgraph from "dgraph-js";
import * as grpc from "grpc";

const typeDefs = `
  type Query {
    hello(name: String): String
  }

  type Mutation {
    addUser(input: [UserInput!]!): String
  }

  input UserInput {
    name: String!
    age: Int
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "world"}`,
  },
  Mutation: {
    addUser: async (_, { input }) => {
      try {
        const clientStub = new dgraph.DgraphClientStub(
          "localhost:9080",
          grpc.credentials.createInsecure()
        );
        const dgraphClient = new dgraph.DgraphClient(clientStub);

        const p = {
          name: "Alice",
        };

        const txn = dgraphClient.newTxn();
        const mu = new dgraph.Mutation();
        mu.setSetJson(p);

        const req = new dgraph.Request();
        req.setCommitNow(true);
        req.setMutationsList([mu]);

        await txn.doRequest(req);
        return "Success";
      } catch (e) {
        return `Error: ${e}`;
      }
    },
  },
};

const lambda = new GraphQLServerLambda({
  typeDefs,
  resolvers,
});

export const server = lambda.graphqlHandler;
