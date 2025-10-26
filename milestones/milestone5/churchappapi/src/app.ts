import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import sermonsRouter from './sermons/sermons.routes';
import songsRouter from './songs/songs.routes'
import versesRouter from './verses/verses.routes'
import logger from './middleware/logger.middleware';

import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

// Parse JSON bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// enable all CORS request
app.use(cors());
// add security middleware
app.use(helmet());

if (process.env.NODE_ENV == 'development') {
    // add logger middleware
    app.use(logger);
    console.log('In dev mode');
}

app.use('/', [sermonsRouter, songsRouter, versesRouter]);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World from TypeScript!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
