// Importing express and the Request/Response types so they become accessible within the application.
import express, { Request, Response } from 'express';

// Initializing the express application object.
const app = express();

// The server port the application will run on.
const port = 3000;

/* The "get" method is used to configure GET requests sent to the server.
* This method handles requests to the "/" path.
* Request and Response objects are utilized to produce the appropriate response. */
app.get('/', (req: Request, res: Response) => {
    // Sending the response to the request. It will display as plain text in the browser.
    res.send('Hello World from TypeScript!');
});

// Start up the express server and listen for connections using the specified port.
// Also runs a callback function once the server begins listening.
app.listen(port, () => {
    // Callback function.
    // Log to indicate that the server has started up successfully and is listening on the specified port.
    console.log(`Example app listening at http://localhost:${port}`);
});