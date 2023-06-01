import express from 'express';
import routes from './routes.js';
import databaseClient from './databaseClient.js';

const app = express();
const PORT = 8800;

app.use(express.json());
app.set('view engine', 'ejs');
app.use('/', routes);

const server = app.listen(PORT, () => {
    databaseClient.connect().then(() => {
        console.log(`Server listening on port ${PORT}`);
    }).catch((error) => {
        console.error(error);
    });
});

// On interrupt signal (for example, Ctrl+C)
process.on('SIGINT', () => {
    console.log('Closing all the connections...');

    server.close((error) => {
        if (error) {
            console.error(error);
        }

        databaseClient.close().then(() => {
            console.log('Closed successfully.');
            process.exitCode = 0;
        }).catch((error) => {
            console.error(error);
        });
    });
});
