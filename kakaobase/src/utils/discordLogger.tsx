import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import axios from 'axios';

const DISCORD_LOG_ENABLED = process.env.DISCORD_LOG_ENABLED === 'true';
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL!;
const TEMP_LOG_DIR = path.resolve(process.cwd(), 'logs');

type LogType = 'BUILD' | 'API' | 'SSR' | 'CLIENT';

export const sendDiscordLog = async (
  type: LogType,
  content: string,
  filenameHint?: string
) => {
  if (!DISCORD_LOG_ENABLED) return;

  const timestamp = new Date().toISOString();
  const uuid = randomUUID();
  const filename = `${type.toLowerCase()}-${filenameHint || uuid}.txt`;
  const filePath = path.join(TEMP_LOG_DIR, filename);

  const fullLog = `[${timestamp}] (${type})\nEnvironment: ${process.env.NODE_ENV}\n\n${content}`;

  try {
    await fs.mkdir(TEMP_LOG_DIR, { recursive: true });
    await fs.writeFile(filePath, fullLog, 'utf-8');

    const fileBuffer = await fs.readFile(filePath);

    const formData = new FormData();
    formData.append('file', new Blob([fileBuffer]), filename);
    formData.append(
      'payload_json',
      JSON.stringify({
        content: `🚨 **[${type}] 에러 발생 - ${timestamp}**`,
      })
    );

    await axios.post(DISCORD_WEBHOOK_URL, formData, {
      headers: formData.getHeaders?.() || {},
      maxBodyLength: Infinity,
    });

    await fs.unlink(filePath); // Clean up
  } catch (err) {
    console.error('❌ Discord 전송 실패:', err);
  }
};
