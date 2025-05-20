import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { sendDiscordLog } from '../utils/discordLogger';

const LOG_FILE_PATH = path.resolve(__dirname, '~/.pm2/logs/dev-release-fe-error.log');

let lastFileSize = 0;

function watchLogFile() {
  console.log(`[WATCHING] ${LOG_FILE_PATH}`);
  fs.watchFile(LOG_FILE_PATH, { interval: 1000 }, async (curr, prev) => {
    if (curr.size <= lastFileSize) return;

    const stream = fs.createReadStream(LOG_FILE_PATH, {
      start: lastFileSize,
      end: curr.size,
    });

    const rl = readline.createInterface({ input: stream });

    let newLogs = '';
    for await (const line of rl) {
      newLogs += line + '\n';
    }

    lastFileSize = curr.size;

    if (newLogs.includes('Error') || newLogs.includes('Exception') || newLogs.includes('Unhandled')) {
      console.log(`[ERROR DETECTED]\n${newLogs}`);
      await sendDiscordLog('API', newLogs, 'pm2-error');
    }
  });
}

watchLogFile();
