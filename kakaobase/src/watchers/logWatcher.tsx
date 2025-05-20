import fs from 'fs';
import path from 'path';
import os from 'os';
import readline from 'readline';
import { sendDiscordLog } from '../utils/discordLogger';

const LOG_FILE_PATH = path.join(os.homedir(), '.pm2/logs/dev-release-fe-error.log');
let lastFileSize = 0;

async function watchLogFile() {
  if (!fs.existsSync(LOG_FILE_PATH)) {
    console.error(`❌ 로그 파일 없음: ${LOG_FILE_PATH}`);
    return;
  }

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

    const lowerLogs = newLogs.toLowerCase();
    if (
      lowerLogs.includes('error') ||
      lowerLogs.includes('exception') ||
      lowerLogs.includes('unhandled')
    ) {
      console.log(`[ERROR DETECTED]`);
      console.log(newLogs);

      try {
        await sendDiscordLog('API', newLogs, 'pm2-error');
      } catch (e) {
        console.error('❌ Discord 전송 실패 (logWatcher):', e);
      }
    }
  });
}

watchLogFile();

