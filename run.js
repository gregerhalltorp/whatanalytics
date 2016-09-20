import { logger, requestLogger } from '@gregerhalltorp/web-app-utils';
import bodyParser from 'body-parser';
import cors from 'cors';
import Express from 'express';
import morgan from 'morgan';
import path from 'path';

process.on('uncaughtException', (error) => {
  logger.fatal('Exiting process', { error }, () => {
    process.exit(1);
  });
});

const app = new Express();
app.use(cors());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(requestLogger);
app.use('/public', Express.static(path.resolve(__dirname, '../public')));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use('/', (req, res, next) => {
  res.send('hej');
});

app.listen(4001, (error) => {
  if (!error) {
    logger.log('Running on port 4001');
  } else {
    logger.error('Error on startup!');
  }
});

export default app;
