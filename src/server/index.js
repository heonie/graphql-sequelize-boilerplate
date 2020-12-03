import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import schema from '../graphql/schema';
import { startDB } from '../database';
import {authenticateReq} from "../passport";

const formatError = (err) => {
    console.dir(err, {depth: 5});
    return err;
}

export const startServer = async () => {
    const app = express();
    const port = process.env.PORT || 4000;

    app.use(authenticateReq);

    const apolloConfig = {
        schema,
        formatError,
        context: ({req}) => ({
            request: req
        })
    };
    const apollo = new ApolloServer(apolloConfig);

    const apolloRegistration = {
        app,
        path: '/graphql',
        cors: true,
        bodyParserConfig: true,
    };
    apollo.applyMiddleware(apolloRegistration);

    const server = http.createServer(app);

    await startDB();

    server.listen({ port }, () => {
        console.log(`🚀 GraphQL server ready at http://localhost:${port}/graphql`);
    });
}
