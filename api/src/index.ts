import 'reflect-metadata';
import express from 'express';
import { useContainer, useExpressServer } from 'routing-controllers';
import expressWinston from 'express-winston';
import winston from 'winston';
import { Container } from 'typedi';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDb from 'db/connectDb';
import ErrorHandler from 'middlewares/errorHandler.middleware';

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(cookieParser());

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
      winston.format.prettyPrint(),
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) {
      return false;
    }, // optional: allows to skip some log messages based on request and/or response
  }),
);

useContainer(Container);

useExpressServer(app, {
  routePrefix: '/api',
  controllers: [__dirname + '/**/*.controller.ts'],
  middlewares: [ErrorHandler],
  defaultErrorHandler: false,
  validation: {
    whitelist: true,
    forbidNonWhitelisted: true,
  },
});

app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
    ),
  }),
);

const PORT = process.env.PORT || 3001;

connectDb();

app.listen(PORT, () => {
  console.log(`SERVER LISTENING AT PORT: ${PORT}`);
});
