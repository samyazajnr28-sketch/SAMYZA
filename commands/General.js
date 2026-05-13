/**
 * SAMYAZA-MD-V3 
 * Full Code Reconstruction from 1778681114607.jpeg
 */

const { 
    BufferJSON, 
    WA_DEFAULT_EPHEMERAL, 
    generateWAMessageFromContent, 
    proto, 
    generateWAMessageContent, 
    generateWAMessage, 
    prepareWAMessageMedia, 
    areJidsSameUser, 
    getContentType 
} = require('@whiskeysockets/baileys');

const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const speed = require('performance-now');
const { smsg, formatp, tanggal, formatDate, getTime, sleep, runtime, fetchJson, getBuffer, jsonformat, delay } = require('./lib/myfunc');

module.exports = samyaza = async (conn, m, chatUpdate, store) => {
    try {
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : '';
        var budy = (typeof m.text == 'string' ? m.text : '');
        var prefix = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/)[0] : '';
        const isCmd = body.startsWith(prefix);
        const command = isCmd ? body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase() : '';
        const args = body.trim().split(/ +/).slice(1);
        const pushname = m.pushName || "No Name";
        const text = q = args.join(" ");
        const fatkuns = (m.quoted || m);
        const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'productMessage') ? fatkuns.productMessage[Object.keys(fatkuns.productMessage)[0]] : m.quoted ? m.quoted : m;
        const mime = (quoted.msg || quoted).mimetype || '';
        const qmsg = (quoted.msg || quoted);

        // Configuration for AdReply 
        const samyazaContext = {
            externalAdReply: {
                title: "SAMYAZA-MD-V3",
                body: "The Ultimate WhatsApp Automaton",
                thumbnailUrl: 'https://github.com/user-attachments/assets/84bb5e1e-abbd-4c2c-a22d-32c7df714585',
                sourceUrl: "https://github.com/samyazajnr28-sketch/SAMYAZA-MD",
                mediaType: 1,
                renderLargerThumbnail: true
            }
        };

        switch (command) {

            case 'menu':
            case 'help': {
                let menuText = `*SAMYAZA-MD-V3* 🤖\n\n` +
                               `*User:* ${pushname}\n` +
                               `*Library:* Baileys\n` +
                               `*Runtime:* ${runtime(process.uptime())}\n\n` +
                               `*MAIN COMMANDS*\n` +
                               `• ${prefix}ping\n` +
                               `• ${prefix}owner\n` +
                               `• ${prefix}runtime\n` +
                               `• ${prefix}speed`;

                await conn.sendMessage(m.chat, { 
                    image: { url: 'https://github.com/user-attachments/assets/84bb5e1e-abbd-4c2c-a22d-32c7df714585' }, 
                    caption: menuText,
                    contextInfo: samyazaContext
                }, { quoted: m });
            }
            break;

            case 'ping':
            case 'speed': {
                const timestamp = speed();
                const latensi = speed() - timestamp;
                await conn.sendMessage(m.chat, { 
                    text: `*Speed:* ${latensi.toFixed(4)} ms`,
                    contextInfo: samyazaContext
                }, { quoted: m });
            }
            break;

            case 'runtime': {
                await conn.sendMessage(m.chat, { 
                    text: `*UpTime:* ${runtime(process.uptime())}`,
                    contextInfo: samyazaContext
                }, { quoted: m });
            }
            break;

            case 'owner': {
                const vcard = 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:Samyaza Jnr\n' + 'ORG:Samyaza MD;\n' + 'TEL;type=CELL;type=VOICE;waid=1234567890:+1234567890\n' + 'END:VCARD';
                await conn.sendMessage(m.chat, { contacts: { displayName: 'Samyaza Jnr', contacts: [{ vcard }] } }, { quoted: m });
            }
            break;

            default:
                if (isCmd && body) {
                    console.log(chalk.redBright('[ERROR]'), chalk.white(`Unknown Command: ${command}`));
                }
        }
    } catch (err) {
        console.log(util.format(err));
    }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright(`Update ${__filename}`));
    delete require.cache[file];
    require(file);
});
