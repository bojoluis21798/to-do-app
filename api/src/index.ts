import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import connectDb from 'db/connectDb';

import AuthController from 'routes/auth/auth.controller';

const app = createExpressServer({
  controllers: [AuthController],
});

const PORT = process.env.PORT || 3000;

connectDb();

app.listen(PORT, () => {
  console.log(`SERVER LISTENING AT PORT: ${PORT}`);
});
