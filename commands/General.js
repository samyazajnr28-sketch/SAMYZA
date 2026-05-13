import {
    smd,
    prefix,
    Config,
    runtime,
    formatp
} from '../lib/smd.js'; 
import os from 'os';

smd({
    pattern: "menu",
    desc: "To display Samyaza Md main menu",
    category: "general",
    filename: "General.js"
}, async (m, text, { conn }) => {
    try {
        let { name } = await conn.getName(m.sender);
        let uptime = runtime();
        let totalMem = formatp(os.totalmem());
        let freeMem = formatp(os.freemem());

        let menuText = `
╭━━〔 SAMYAZA-MD-V3 3.0.0 〕━━┈
┃ 🧩 Commands: 159
┃ 🌟 Prefix: ${prefix}
┃ 🕒 Time: ${new Date().toLocaleTimeString()}
┃ 🌍 Timezone: Kenya/Kisumu
┃ 📅 Date: 13/05/2026
┃ ⏳ Uptime: ${uptime}
┃ 💾 RAM: ${freeMem}/${totalMem}
┃ 👑 Owner: SAMYAZA
╰━━━━━━〔 VERSION 3.0.0 〕━━━┈

╭━━〔 AI 〕━━┈
┃ 1. DEEPSEEK
┃ 2. GEMINI
┃ 3. GPT
┃ 4. IMAGINE
┃ 5. LLAMA
┃ 6. VISION
╰━━━━━━━━━━━━━┈
`.trim();

        await conn.sendMessage(m.chat, { 
            image: { url: 'https://github.com/user-attachments/assets/84bb5e1e-abbd-4c2c-a22d-32c7df714585' }, 
            caption: menuText,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: "SAMYAZA-MD-V3",
                    body: "The Fallen Angel Automaton",
                    thumbnailUrl: 'https://github.com/user-attachments/assets/84bb5e1e-abbd-4c2c-a22d-32c7df714585',
                    sourceUrl: "https://github.com/samyazajnr28-sketch/SAMYAZA-MD",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });

    } catch (e) {
        console.error("Error in Samyaza menu:", e);
    }
});
