import express from 'express';
import http from 'http';
import errorhandler from 'errorhandler';
import { ApolloServer } from 'apollo-server-express';
import schema from '../graphql/schema';

export const startServer = () => {
    const app = express();
    const port = process.env.PORT || 4000;

    if (process.env.NODE_ENV === 'development') {
        app.use(errorhandler());
    }

    const apolloConfig = {
        schema
    };

    const apolloRegistration = {
        app,
        path: '/graphql',
        cors: true,
        bodyParserConfig: true,
    };

    const apollo = new ApolloServer(apolloConfig);
    apollo.applyMiddleware(apolloRegistration);

    const server = http.createServer(app);
    server.listen({ port }, () => {
        console.log(`🚀 GraphQL server ready at http://localhost:${port}/graphql`);
    });
}
