import os from 'os'
import moment from 'moment-timezone'
import axios from 'axios'

const startTime = Date.now()

const styles = {
    10: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("").reduce((a, b, i) => {
        const fancy = "ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹⁿᴼᴾᑫᴿˢᵀᵁⱽᵂˣʸᶻ⁰¹²³⁴⁵⁶⁷⁸⁹"
        a[b] = fancy[i]
        return a
    }, {})
}

const applyStyle = (text, styleNumber = 10) => {
    const map = styles[styleNumber]
    return text.split('').map(char => map[char] || char).join('')
}

const formatUptime = (ms) => {
    let s = Math.floor(ms / 1000)
    let m = Math.floor(s / 60)
    let h = Math.floor(m / 60)
    let d = Math.floor(h / 24)
    let parts = []
    if (d > 0) parts.push(`${d} d`)
    if (h % 24 > 0) parts.push(`${h % 24} h`)
    if (m % 60 > 0) parts.push(`${m % 60} m`)
    if (s % 60 > 0) parts.push(`${s % 60} s`)
    return parts.join(', ')
}

const detectPlatform = () => {
    const platforms = {
        'github-actions': 'GitHub Actions',
        'heroku': 'Heroku',
        'vps': 'VPS Server',
        'render': 'Render',
        'replit': 'Replit',
        'local': 'Local Host'
    }
    if (process.env.GITHUB_ACTIONS) return platforms['github-actions']
    if (process.env.HEROKU_APP_NAME) return platforms['heroku']
    return platforms['local']
}

const fetchRepoStats = async () => {
    try {
        const response = await axios.get('https://api.github.com/repos/Samyza/SAMYZA-MD-V3')
        return {
            forks: response.data.forks_count || 0,
            stars: response.data.stargazers_count || 0
        }
    } catch {
        return { forks: 0, stars: 0 }
    }
}

export default {
    name: 'menu',
    aliases: ['list'],
    description: 'Show all available bot commands.',
    category: 'General',
    execute: async ({ sock, from, msg, commands, config }) => {
        try {
            const botName = config.BOT_NAME || 'Flash-MD'
            const botVersion = config.BOT_VERSION || '3.0.0'
            const ownerName = config.OWNER_NAME || 'FLASH-MD'
            const tz = config.TZ || 'Africa/Nairobi'

            const list = Array.from(commands.values())
            if (!list.length) {
                return sock.sendMessage(from, { text: '❌ Command list not available.' }, { quoted: msg })
            }

            const time = moment().tz(tz)
            const uptime = formatUptime(Date.now() - startTime)
            const platform = detectPlatform()
            const usedMem = (os.totalmem() - os.freemem()) / 1024 / 1024 / 1024
            const totalMem = os.totalmem() / 1024 / 1024 / 1024
            const { forks, stars } = await fetchRepoStats()
            const usersFormatted = ((stars * 3) + (forks * 2)).toLocaleString()
            const prefix = config.PREFIXES?.[0] || '.'
            
            let grouped = {}
            for (const cmd of list) {
                const category = cmd.category || 'General'
                if (!grouped[category]) grouped[category] = []
                grouped[category].push(cmd)
            }

            let menuText = `┏━━━⟨ ${applyStyle(`${botName.toUpperCase()} ${botVersion}`, 10)} ⟩━━━┓\n`
            menuText += `┃ 🧩 Commands: ${list.length.toLocaleString()}\n`
            menuText += `┃ ✨ Prefix: ${prefix}\n`
            menuText += `┃ ⌚ Time: ${time.format('HH:mm:ss')}\n`
            menuText += `┃ 🌍 Timezone: ${tz}\n`
            menuText += `┃ 📅 Date: ${time.format('DD/MM/YYYY')}\n`
            menuText += `┃ 🔋 Uptime: ${uptime}\n`
            menuText += `┃ 💻 Platform: ${platform}\n`
            menuText += `┃ 📊 RAM: ${usedMem.toFixed(2)}/${totalMem.toFixed(2)} GB\n`
            menuText += `┃ 👥 Users: ${usersFormatted}\n`
            menuText += `┃ 👑 Owner: ${ownerName}\n`
            menuText += `┗━━━━━━━⟨ ${applyStyle(`Version ${botVersion}`, 10)} ⟩━━━━━━━┛\n\n`

            const sortedCategories = Object.keys(grouped).sort()
            let counter = 1
            for (const category of sortedCategories) {
                const commandsInCategory = grouped[category].sort((a, b) => a.name.localeCompare(b.name))
                menuText += `┌──『 ${applyStyle(category.toUpperCase(), 10)} 』──🚩\n`
                menuText += `│\n`
                for (const cmd of commandsInCategory) {
                    menuText += `│ ${counter++}. ⚡ ${applyStyle(cmd.name, 10)}\n`
                }
                menuText += `│\n`
                menuText += `└───────────╼\n\n`
            }

            // Sends the Samyaza image with the menu text as caption
            await sock.sendMessage(from, {
                image: { url: 'https://github.com/user-attachments/assets/84bb5e1e-abbd-4c2c-a22d-32c7df714585' }, 
                caption: menuText,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363238139244238@newsletter',
                        newsletterName: botName,
                        serverMessageId: -1
                    }
                }
            }, { quoted: msg })

        } catch (error) {
            console.error('Menu error:', error)
            await sock.sendMessage(from, { text: '❌ Error loading menu.' }, { quoted: msg })
        }
    }
}
