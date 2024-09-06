import express, { Application, Request, Response } from 'express';
import notFound from './middleware/notFound';
import globalErrorHandler from './middleware/globalErrorHandler';
import cors from 'cors';
import router from './router';
const app: Application = express();
import cookieParser from 'cookie-parser';

app.use(express.json());
app.use(cors({origin: ['http://localhost:5173']}));
app.use(cookieParser());
app.use("/image", express.static("./public/uploads"));
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
    res.send('Express CRUD App')
});

// route not found
app.use('*', notFound);

// global error handler
app.use(globalErrorHandler);

export default app;