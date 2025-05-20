import * as fs from 'fs/promises';
import { createReadStream } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import FormData from 'form-data';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // .env 파일 로딩

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL!;
const DISCORD_LOG_ENABLED = process.env.DISCORD_LOG_ENABLED === 'true';
const TEMP_LOG_DIR = path.resolve(process.cwd(), 'logs');

type LogType = 'BUILD' | 'API' | 'SSR' | 'CLIENT';

/**
 * 디스코드에 에러 로그를 .txt 파일로 전송
 * @param type - 로그 유형 ('API', 'SSR', 'BUILD', 'CLIENT')
 * @param content - 로그 본문 (에러 스택 등)
 * @param filenameHint - 파일명 힌트 (옵션)
 */
export const sendDiscordLog = async (
  type: LogType,
  content: string,
  filenameHint?: string
) => {
  if (!DISCORD_LOG_ENABLED) {
    console.log(`[DISCORD LOGGER] Disabled via .env`);
    return;
  }

  const timestamp = new Date().toISOString();
  const uuid = randomUUID();
  const filename = `${type.toLowerCase()}-${filenameHint || uuid}.txt`;
  const filePath = path.join(TEMP_LOG_DIR, filename);

  const fullLog = `[${timestamp}] (${type})\nEnvironment: ${process.env.NODE_ENV}\n\n${content}`;

  try {
    await fs.mkdir(TEMP_LOG_DIR, { recursive: true });
    await fs.writeFile(filePath, fullLog, 'utf-8');

    const formData = new FormData();
    formData.append('file', createReadStream(filePath));
    formData.append(
      'payload_json',
      JSON.stringify({
        content: `🚨 **[${type}] 에러 발생 - ${timestamp}**`,
      })
    );

    await axios.post(DISCORD_WEBHOOK_URL, formData, {
      headers: formData.getHeaders(),
      maxBodyLength: Infinity,
    });

    await fs.unlink(filePath); // 사용 후 삭제
    console.log(`[DISCORD LOGGER] ${filename} sent successfully`);
  } catch (err) {
    console.error('❌ Discord 전송 실패:', err);
  }
};
