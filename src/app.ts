import express, { Application, Request, Response } from 'express';
import notFound from './middleware/notFound';
import globalErrorHandler from './middleware/globalErrorHandler';
import cors from 'cors';
import router from './router';
import cookieParser from 'cookie-parser';
const app: Application = express();

app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173", "https://mern-crud-123.netlify.app"], credentials: true }));
app.use(cookieParser());
app.use('/api/v1', router);

// default route to test the server is running or not
app.get('/', (req: Request, res: Response) => {
    res.send('CRUD server is running');
});

// route not found
app.use('*', notFound);

// global error handler
app.use(globalErrorHandler);

export default app;