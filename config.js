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
  SESSION: process.env.SESSION || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUI2V1h3aHBsWjlWM1E3ckZXcmZCVC8rdVFOams1ZTdBTE1oMWptY0praz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM0dnS2dkK01sbTRMOWJnRjRZMTgwVDJoU05DUU9DN2ZmbDU0UjE1NncwUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJQWJvNlNjVXFxYi9UbGZPOEMxQ3J4NXJBdi95dHJ0clYwR21oSjFFVTN3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0RVRKWWk2UmZrL2xob3I2SVRFZFNiUXpDbmMwTzlRZE9rRzROeGZVeFRnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndCQ0VIZXVCdzV2MUJ2SzkwekRsUTVPL25aZjN0OXdXa0lUckhPcTVqVlk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1uNTdpMWJjUU1TU2I4bzdFUk9jNkVuT0l2OElzbU1sUFFjRWNnTnhpemM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0lCTmxDN2NEc2VsRFZwN2g3Szl1a2RLNHZyRkNTdG5qRWlYVTRTNnNuUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic2Joci9lcElyclM3SXNlZEgzNDc3ck54Rko2RFFmM0pPMWFzMTd2dHRGST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZKMVh5aTZsakVkN0xkdThhTTkvQ2RHMEQrZWRrNDVvQTlZWUU5OEx2NUpONHQyajNaVGtHWTRQSXE2dzZUZVZ5a0duenp2eEg5MFEyRGZBTE96RWdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM5LCJhZHZTZWNyZXRLZXkiOiJOQzlsaFlQSkJNOExaYmxjK0I4TStHQzd1eHg2azJDZldWRlVDdnVVMzFzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJSUzhOOFExNiIsIm1lIjp7ImlkIjoiMjU0NzA2NjEwMTg1OjhAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxMzUzNjg2NDc4ODY5OjhAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOZklvKzRERUppZjdNOEdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJlVFF3UTZ6V011VnFPeEdVdE0rTWNPOCtOZkM4K1B4NCs3SXpoTGtrcnhvPSIsImFjY291bnRTaWduYXR1cmUiOiI2Wmk4TUZPSHkwclJwRVplNlRYdlVGYVFQRGlBM0NMenc4M1NFNmZvSmZ3cDdtWDdPVjRNRnFrZmdqSkJzcHpHdjU4UlNVMzFBaWVrMTNkU1ZFeU1DZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTER1QWYyTUpneEtUL25GWElERnBXbkg2WnZRR2hXWGY1YWN6Z0puMGgvUlhoSU1EaVZyRGhwT3Q1QnpYam1FVGVvNy9WcHg0NnZYWEwwaEI0WE1talE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3MDY2MTAxODU6OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYazBNRU9zMWpMbGFqc1JsTFRQakhEdlBqWHd2UGo4ZVB1eU00UzVKSzhhIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQU1JQ3dnQyJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NzgwNjEyMTUsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQ210In0=',
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
  OWNER_NUMBER: process.env.OWNER_NUMBER || '254706610185',
  OWNER_NAME: process.env.OWNER_NAME || 'SAMYAZA',
  BOT_NAME: process.env.BOT_NAME || 'SAMYAZA-MD-V3',
  BOT_VERSION: process.env.BOT_VERSION || '3.0.0'
}

export default CONFIG
