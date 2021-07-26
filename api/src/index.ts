import express from 'express';
import connectDb from 'db/connectDb';
import mapRoutes from 'routes';

const app = express();
const PORT = process.env.PORT || 3000;

connectDb();
mapRoutes(app);

app.listen(PORT, () => {
  console.log(`SERVER LISTENING AT PORT: ${PORT}`);
});
