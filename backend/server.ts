import * as Express from "express";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema, UseMiddleware } from "type-graphql";

import {ContactResolver} from './src/Resolver'

require("dotenv").config();

const app = Express();


const main = async () => {
    const schema = await buildSchema({
      resolvers: [ContactResolver],
      //emitSchemaFile: true
    });
    const apolloServer = new ApolloServer({
      schema,
      context: async ({ req, res }) => {
        return { res, req, payload: "asd" };
      },
    });

    await apolloServer.start();
  
    apolloServer.applyMiddleware({ app, cors: {
      credentials: true,
      methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
      origin: 'http://localhost:3000',
    } });
  
    app.listen(4000, () => {
      console.log("Server started on 4000");
    });
  };
  main();