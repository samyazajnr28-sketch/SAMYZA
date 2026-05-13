const {
    smd,
    prefix,
    Config,
    getData,
    decodeJid,
    getAdmin,
    tlang,
    runtime,
    formatp
} = require('../lib');

smd({
    pattern: "menu",
    desc: "To display Samyaza Md main menu",
    category: "general",
    filename: __filename
}, async (m, text, { conn }) => {
    try {
        let { name } = await conn.getName(m.sender);
        let date = new Date().toLocaleDateString('en-GB');
        let time = new Date().toLocaleTimeString('en-GB');
        let _runtime = runtime();
        
        let menuText = `
*Hello, ${name}!*

*–––『 SAMYAZA MD 』–––*
*👑 Owner:* ${Config.ownername}
*📅 Date:* ${date}
*🕒 Time:* ${time}
*⌛ Runtime:* ${_runtime}
*💾 Mode:* ${Config.WORKTYPE}
*⚡ Speed:* 1.2s

*--- COMMANDS LIST ---*
*『 GENERAL 』*
* ${prefix}menu
* ${prefix}owner
* ${prefix}runtime
* ${prefix}speed

*『 DOWNLOAD 』*
* ${prefix}ytmp3
* ${prefix}ytmp4
* ${prefix}facebook
* ${prefix}instagram

*『 GROUP 』*
* ${prefix}add
* ${prefix}kick
* ${prefix}promote
* ${prefix}demote

*『 TOOLS 』*
* ${prefix}sticker
* ${prefix}qc
* ${prefix}translate
* ${prefix}trt

*『 OWNER 』*
* ${prefix}eval
* ${prefix}shell
* ${prefix}restart

> Use ${prefix}help <command> for details.
        `.trim();

        await conn.sendMessage(m.chat, { 
            image: { url: 'https://github.com/user-attachments/assets/84bb5e1e-abbd-4c2c-a22d-32c7df714585' }, 
            caption: menuText,
            contextInfo: {
                externalAdReply: {
                    title: "SAMYAZA-MD-V3",
                    body: "The Ultimate WhatsApp Automaton",
                    thumbnailUrl: 'https://github.com/user-attachments/assets/84bb5e1e-abbd-4c2c-a22d-32c7df714585',
                    sourceUrl: "https://github.com/samyazajnr28-sketch/SAMYAZA-MD",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });

    } catch (e) {
        m.error(`${e}\n\nCommand: menu`, e);
    }
});

smd({
    pattern: "owner",
    desc: "To check Samyaza Md owner info",
    category: "general",
    filename: __filename
}, async (m, text, { conn }) => {
    const ownerVcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${Config.ownername}\nORG:Samyaza Md;\nTEL;type=CELL;type=VOICE;waid=${Config.owner.split(',')[0]}:+${Config.owner.split(',')[0]}\nEND:VCARD`;
    await conn.sendMessage(m.chat, { contacts: { displayName: Config.ownername, contacts: [{ vcard: ownerVcard }] } }, { quoted: m });
});

smd({
    pattern: "runtime",
    desc: "To check Samyaza Md runtime",
    category: "general",
    filename: __filename
}, async (m, text, { conn }) => {
    m.reply(`*SAMYAZA-MD RUNTIME:* ${runtime()}`);
});

smd({
    pattern: "speed",
    desc: "To check Samyaza Md ping",
    category: "general",
    filename: __filename
}, async (m, text, { conn }) => {
    const start = new Date().getTime();
    const { key } = await m.reply('*Testing Ping...*');
    const end = new Date().getTime();
    await conn.sendMessage(m.chat, { text: `*SAMYAZA-MD PING:* ${end - start}ms`, edit: key });
});

