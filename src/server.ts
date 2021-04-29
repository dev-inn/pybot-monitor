import 'source-map-support/register';

import express, { Application } from 'express';
import { spawn } from 'node-pty';

import { logger } from '@noodlewrecker7/logger';
import Logger = logger.Logger;

Logger.setLevel(Logger.Levels.TRACE);

const PORT = 1234;

const app: Application = express();

const pythonLog: string[] = [];

app.get('/log', (req, res) => {
  res.send(pythonLog);
});

app.listen(PORT, () => {
  Logger.info('listening on port: ' + PORT);
  const python = spawn('python3', ['./bot.py'], { cwd: './innkeeper' });

  python.onData((data: string) => {
    if (data == '\r\n') {
      return;
    }
    Logger.debug(data);
    pythonLog.push(data);
  });
});
