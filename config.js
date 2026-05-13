import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

function parsePrefixes(prefixStr) {
  if (!prefixStr || prefixStr.trim() === '' || prefixStr.toLowerCase() === 'none') return []
  return prefixStr.split(',').map(p => p.trim()).filter(Boolean)
}

function parseBoolean(value) {
  if (typeof value === 'string') {
    return value.toLowerCase() === 'on' || value.toLowerCase() === 'true' || value === '1'
  }
  return Boolean(value)
}

function parseLids(lidStr) {
  if (!lidStr || lidStr.trim() === '') return []
  return lidStr.split(',').map(l => l.trim()).filter(Boolean)
}

const CONFIG = {
  MODE: process.env.MODE || 'private',
  PREFIXES: parsePrefixes(process.env.PREFIXES),
  PORT: parseInt(process.env.PORT) || 3000,
  SESSION: process.env.SESSION || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUFhekw2bmR2NXRaNjJZWk1ZeDI4aktqMSttVXNWNUwrN0RsQ0lzMEpXND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZTM5ZEYwY0tZY25uMGF0a2FUajB2WVhSZEhnK01NUnJSVTBzdjl0VXhDcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3SlhMVjlPMEtYdFAxMG41VjlHS203WW91ZVdUb2cyell6OVBDZUFMMG1ZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4ak12UllUYTAvakVBL0w4YWlBcU1Md1JJZjRvL0I0Ry8rVmZtQUV0T3lrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVOUy9BTXE1QVVKYmk0UVhvaEY1cjdROUYzL3kxL2FCaXBLdVFRaGdRMFU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBOU1NYcERmKzl6VXZUWjI0alhFVFBybTZOQnMreUpkdVp4MXlEa3RJVlk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0YzQnJQcnNzQ0NLWTgyTGljYjU2c2FCQ0xta1pSQWJ3Z3RoUzZqd1RFTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWForQmMyU0RHTzlDODFEam4yaVpQMERrZm1uRTRLdkk1R1k4N3RCTGcyaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJidUZrOFQ5Q2ZzejVUc0ZPNmgvOTdyVmxjdVNHVFRkWTcvcDQwVVpqUStWMG94M09yTGp5MWFMb3ljWjVwdndMdkNXaUNsUkRMeEllZzdsekpIdEJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgzLCJhZHZTZWNyZXRLZXkiOiJCMUg3U25TRTAwWnQzWFFkY0x3eEpBVTFaWSt4aS9wekRZR012RjFGbmEwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJLR1JBUDE2UCIsIm1lIjp7ImlkIjoiMjU0NzE1MTgyMTUzOjEwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IlNBTVlBWkFcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5BTk9OWU1PVVMgVEVDSFxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuTUQiLCJsaWQiOiI2MTU3NzAxMzI4OTA1MzoxMEBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09MSzFiRUVFUEdpa2RBR0dBVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InU2Q2ZxbElWbUd5dENMd0R3bjFWTDlla0FkUDR3RDVCOEdxSUMzbWd4QlE9IiwiYWNjb3VudFNpZ25hdHVyZSI6InVnRHZzbm5LY29hWjlBR2s5LzNZaG5qN2NkaHpSSmZxSDNKMGFmUEdiRHFTNkRBdlYvdXN3MmFTY3hLc1VvMTFyb3RNOXlKZmQzS1VDUmJnckgwekR3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ4b0Y4WkhLZU5SQ1lzQWx2Skh6UHYwSzJsVEc3alpSS0ZLZERPbUJqL1FQMHEzNHdJaVBCbEsxWjYveGxjMU9zWnhmQmZ2L3ErRVpMeW5yTy9JckZEUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDcxNTE4MjE1MzoxMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJidWduNnBTRlpoc3JRaThBOEo5VlMvWHBBSFQrTUErUWZCcWlBdDVvTVFVIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWtJQWdnTiJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Nzg2Njc4OTQsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTmlZIn0=',
  TZ: process.env.TZ || 'Kenya/Kisumu',
  ANTICALL: parseBoolean(process.env.ANTICALL || 'off'),
  ANTIDELETE: parseBoolean(process.env.ANTIDELETE || 'on'),
  ANTIEDIT: parseBoolean(process.env.ANTIEDIT || 'on'),
  AUTO_READ: parseBoolean(process.env.AUTO_READ || 'off'),
  AUTO_VIEW: parseBoolean(process.env.AUTO_VIEW || 'on'),
  AUTO_LIKE: parseBoolean(process.env.AUTO_LIKE || 'on'),
  AUTO_REPLY: parseBoolean(process.env.AUTO_REPLY || 'on'),
  AUTO_TYPING: (process.env.AUTO_TYPING || 'on').toLowerCase() === 'on',
  DM_PRESENCE: process.env.DM_PRESENCE || 'True',
  GRP_PRESENCE: process.env.GRP_PRESENCE || 'True',
  USER_LID: parseLids(process.env.USER_LID || '61577013289053'),
  OWNER_NUMBER: process.env.OWNER_NUMBER || '254715182153',
  OWNER_NAME: process.env.OWNER_NAME || 'SAMYAZA',
  BOT_NAME: process.env.BOT_NAME || 'SAMYAZA-MD-V3',
  IMAGE_URL: process.env.IMAGE_URL || 'https://github.com/user-attachments/assets/84bb5e1e-abbd-4c2c-a22d-32c7df714585',
  BOT_VERSION: process.env.BOT_VERSION || '3.0.0'
}

export default CONFIG
