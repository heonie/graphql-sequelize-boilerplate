import express from 'express';
import http from 'http';
import errorhandler from 'errorhandler';

export const startServer = () => {
    const app = express();
    const port = process.env.PORT || 4000;

    if (process.env.NODE_ENV === 'development') {
        app.use(errorhandler());
    }
    const server = http.createServer(app);

    server.listen(port, () => {
        console.log(`express server is listening port ${port}`);
    });
}
