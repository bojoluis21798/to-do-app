import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import express from 'express';
import connectDb from 'db/connectDb';

import AuthController from 'routes/auth/auth.controller';

const app = createExpressServer({
  controllers: [AuthController],
});

const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDb();

app.listen(PORT, () => {
  console.log(`SERVER LISTENING AT PORT: ${PORT}`);
});
