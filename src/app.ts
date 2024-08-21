import express, { Application, Request, Response } from 'express';
import notFound from './middleware/notFound';
import globalErrorHandler from './middleware/globalErrorHandler';
import cors from 'cors';
import router from './modules/crud/crud.route';
const app: Application = express();

app.use(express.json())
app.use(cors())
app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
    res.send('Full stack CRUD App')
})

// route not found
app.use('*', notFound)

// global error handler
app.use(globalErrorHandler)

export default app;