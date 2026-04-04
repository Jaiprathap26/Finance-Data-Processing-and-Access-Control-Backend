import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import router from './routes';
import { errorHandler } from './middleware/error-handler.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.use(errorHandler);

app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
});

export default app;