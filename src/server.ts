import 'source-map-support/register';

import express, { Application } from 'express';
import { spawn } from 'child_process';

import { logger } from '@noodlewrecker7/logger';
import Logger = logger.Logger;

Logger.setLevel(Logger.Levels.TRACE);

const PORT = 1234;

const app: Application = express();

let pythonLog = '';

app.get('/log', (req, res) => {
  res.send(pythonLog);
});

app.listen(PORT, () => {
  Logger.info('listening on port: ' + PORT);
  const python = spawn('python3', ['bot.py'], { cwd: 'innkeeper' });

  python.stdout.on('data', function (data) {
    Logger.debug(data.toString());
    pythonLog += data.toString();
  });
  python.stderr.on('data', (data) => {
    Logger.error(data.toString());
    pythonLog += data.toString();
  });
});
