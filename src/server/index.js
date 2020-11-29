import express from 'express';
import http from 'http';
import errorhandler from 'errorhandler';
import { ApolloServer } from 'apollo-server-express';
import schema from '../graphql/schema';
import { startDB } from '../database';

const formatError = (err) => {
    console.dir(err, {depth: 5});
    return err;
}

export const startServer = async () => {
    const app = express();
    const port = process.env.PORT || 4000;

    if (process.env.NODE_ENV === 'development') {
        app.use(errorhandler());
    }

    const apolloConfig = {
        schema,
        formatError
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

    await startDB();

    server.listen({ port }, () => {
        console.log(`🚀 GraphQL server ready at http://localhost:${port}/graphql`);
    });
}
