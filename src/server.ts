import 'source-map-support/register';

import express, { Application } from 'express';
import { spawn } from 'node-pty';

import { logger } from '@noodlewrecker7/logger';
import Logger = logger.Logger;

Logger.setLevel(Logger.Levels.TRACE);

const PORT = 1234;

const app: Application = express();

const pythonLog = '';

app.get('/log', (req, res) => {
  res.send(pythonLog);
});

app.listen(PORT, () => {
  Logger.info('listening on port: ' + PORT);
  const python = spawn('python3', ['./bot.py'], { cwd: './innkeeper' });

  /* python.on('data', function (data) {
    Logger.debug(data.toString());
    pythonLog += data.toString();
  });*/
  python.onData((data) => {
    Logger.debug(data);
  });
  /*  python.on('data', (data) => {
      Logger.error(data.toString());
      pythonLog += data.toString();
    });*/
});
