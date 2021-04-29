import 'source-map-support/register';

import express, { Application } from 'express';
import { ChildProcess, spawn } from 'child_process';

import { logger } from '@noodlewrecker7/logger';
import Logger = logger.Logger;
import * as Process from 'process';

Logger.setLevel(Logger.Levels.TRACE);

const PORT: number = 1234;

const app: Application = express();

var pythonLog: String = '';

app.get('/log', (req, res) => {
  res.send(pythonLog);
});

app.listen(PORT, () => {
  console.log('listening on port: ' + PORT);
  const python = spawn('python', ['bot.py']);

  python.stdout.on('data', function (data) {
    console.log(data.toString());
    Logger.debug(data.toString());
    pythonLog += data.toString();
  });
  python.stderr.on('data', (data) => {
    console.log(data.toString());
    Logger.error(data.toString());
    pythonLog += data.toString();
  });
});

console.log('hello');
