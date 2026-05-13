import {
    smd,
    prefix,
    Config,
    distube,
    tlang,
    sleep
} from '../lib/index.js';

import axios from 'axios';
import fetch from 'node-fetch';

const commands = [];

//---------------------------------------------------------------------------
smd({
    pattern: "tr",
    alias: ["translate"],
    desc: "Translate a selected message to the user first language.",
    category: "general",
    use: '< text >',
    filename: __filename
}, async (message, text) => {
    try {
        let q = message.quoted ? message.quoted.text : text;
        if (!q) return await message.reply(`*Please provide text or reply to a message!*`);
        let lang = "en";
        let res = await axios.get(`https://api.popcat.xyz/translate?to=${lang}&text=${encodeURIComponent(q)}`);
        return await message.reply(`*Translated Text:* ${res.data.translated}`);
    } catch (e) {
        return await message.error(`${e}\n\nCommand: tr`, e);
    }
});

//---------------------------------------------------------------------------
smd({
    pattern: "weather",
    desc: "Sends weather info of the told city.",
    category: "general",
    use: '< city >',
    filename: __filename
}, async (message, text) => {
    try {
        if (!text) return await message.reply(`*Please provide a city name!*`);
        let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=061f24e35386c5583aa33bbed5113b9e`);
        let weather = `*City:* ${res.data.name}\n*Temp:* ${res.data.main.temp}°C\n*Description:* ${res.data.weather[0].description}`;
        return await message.reply(weather);
    } catch (e) {
        return await message.error(`${e}\n\nCommand: weather`, e);
    }
});

//---------------------------------------------------------------------------
smd({
    pattern: "pair",
    desc: "To get a pairing code.",
    category: "general",
    filename: __filename
}, async (message) => {
    try {
        return await message.reply(`Check your WhatsApp for the pairing code!`);
    } catch (e) {
        return await message.error(`${e}\n\nCommand: pair`, e);
    }
});

//---------------------------------------------------------------------------
smd({
    pattern: "owner",
    desc: "To get owner number.",
    category: "general",
    filename: __filename
}, async (message) => {
    try {
        const owner = `wa.me/${Config.owner.split(',')[0]}`;
        return await message.reply(`*Owner Number:* ${owner}`);
    } catch (e) {
        return await message.error(`${e}\n\nCommand: owner`, e);
    }
});

//---------------------------------------------------------------------------
smd({
    pattern: "repo",
    alias: ["script"],
    desc: "To get repo link.",
    category: "general",
    filename: __filename
}, async (message) => {
    try {
        let repo = `*Repo Link:* https://github.com/Samyza/SAMYZA-MD`;
        return await message.reply(repo);
    } catch (e) {
        return await message.error(`${e}\n\nCommand: repo`, e);
    }
});

//---------------------------------------------------------------------------
smd({
    pattern: "runtime",
    alias: ["uptime"],
    desc: "To get bot runtime.",
    category: "general",
    filename: __filename
}, async (message) => {
    try {
        return await message.reply(`*Runtime:* ${process.uptime().toFixed(2)} seconds`);
    } catch (e) {
        return await message.error(`${e}\n\nCommand: runtime`, e);
    }
});

//---------------------------------------------------------------------------
smd({
    pattern: "cpu",
    desc: "To get cpu information.",
    category: "general",
    filename: __filename
}, async (message) => {
    try {
        const os = await import('os');
        const cpu = os.cpus();
        let cpuInfo = `*CPU Information:*\n*Model:* ${cpu[0].model}\n*Speed:* ${cpu[0].speed} MHz\n*Cores:* ${cpu.length}`;
        return await message.reply(cpuInfo);
    } catch (e) {
        return await message.error(`${e}\n\nCommand: cpu`, e);
    }
});

//---------------------------------------------------------------------------
smd({
    pattern: "ping",
    desc: "To check bot response speed.",
    category: "general",
    filename: __filename
}, async (message) => {
    try {
        const start = Date.now();
        await message.reply("*Pinging...*");
        const end = Date.now();
        return await message.reply(`*Response Speed:* ${end - start}ms`);
    } catch (e) {
        return await message.error(`${e}\n\nCommand: ping`, e);
    }
});

//---------------------------------------------------------------------------
smd({
    pattern: "quote",
    desc: "To get a random quote.",
    category: "general",
    filename: __filename
}, async (message) => {
    try {
        let res = await axios.get(`https://api.popcat.xyz/quote`);
        return await message.reply(`*Quote:* ${res.data.quote}\n*Author:* ${res.data.author}`);
    } catch (e) {
        return await message.error(`${e}\n\nCommand: quote`, e);
    }
});

//---------------------------------------------------------------------------
smd({
    pattern: "shorten",
    desc: "To shorten a url.",
    category: "general",
    use: '< url >',
    filename: __filename
}, async (message, text) => {
    try {
        if (!text) return await message.reply(`*Please provide a URL!*`);
        let res = await axios.get(`https://tinyurl.com/api-create.php?url=${text}`);
        return await message.reply(`*Shortened URL:* ${res.data}`);
    } catch (e) {
        return await message.error(`${e}\n\nCommand: shorten`, e);
    }
});

//---------------------------------------------------------------------------
smd({
    pattern: "fact",
    desc: "To get a random fact.",
    category: "general",
    filename: __filename
}, async (message) => {
    try {
        let res = await axios.get(`https://api.popcat.xyz/fact`);
        return await message.reply(`*Fact:* ${res.data.fact}`);
    } catch (e) {
        return await message.error(`${e}\n\nCommand: fact`, e);
    }
});

//---------------------------------------------------------------------------
smd({
    pattern: "define",
    desc: "To get definition of a word.",
    category: "general",
    use: '< word >',
    filename: __filename
}, async (message, text) => {
    try {
        if (!text) return await message.reply(`*Please provide a word!*`);
        let res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`);
        let definition = res.data[0].meanings[0].definitions[0].definition;
        return await message.reply(`*Word:* ${text}\n*Definition:* ${definition}`);
    } catch (e) {
        return await message.error(`${e}\n\nCommand: define`, e);
    }
});

//---------------------------------------------------------------------------
smd({
    pattern: "advise",
    desc: "To get a random advice.",
    category: "general",
    filename: __filename
}, async (message) => {
    try {
        let res = await axios.get(`https://api.adviceslip.com/advice`);
        return await message.reply(`*Advice:* ${res.data.slip.advice}`);
    } catch (e) {
        return await message.error(`${e}\n\nCommand: advise`, e);
    }
});

//---------------------------------------------------------------------------
smd({
    pattern: "qr",
    desc: "To generate a qr code.",
    category: "general",
    use: '< text >',
    filename: __filename
}, async (message, text) => {
    try {
        if (!text) return await message.reply(`*Please provide text!*`);
        let qr = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text}`;
        return await message.sendFromUrl(qr, { caption: `*QR Code for:* ${text}` });
    } catch (e) {
        return await message.error(`${e}\n\nCommand: qr`, e);
    }
});
