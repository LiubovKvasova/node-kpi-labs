import express from 'express';
import routes from './routes.js';

const app = express();
const PORT = 8800;

app.use(express.json());
app.set('view engine', 'ejs');
app.use('/', routes);

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// On interrupt signal (for example, Ctrl+C)
process.on('SIGINT', () => {
    console.log('Closing all the connections...');

    server.close((error) => {
        if (error) {
            throw error;
        }

        console.log('Closed successfully.');
        process.exitCode = 0;
    });
});
