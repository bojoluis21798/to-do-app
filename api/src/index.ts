import express from 'express';
import connectDb from 'db/connectDb';
import mapRoutes from 'routes';
import errorHandler from 'middlewares/errorhandler.middleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDb();
mapRoutes(app);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`SERVER LISTENING AT PORT: ${PORT}`);
});
