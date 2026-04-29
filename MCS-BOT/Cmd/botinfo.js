/**
 * 🤖 COMMAND: BOT INFO (PREMIUM EDITION WITH BUTTON)
 * 👤 AUTHOR: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر
 * 📅 YEAR: 2026
 * 💠 SYSTEM: CSR-BOT CORE V5
 */

const os = require('os');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "botinfo",
        aliases: ["status", "system", "botin", "owner"],
        version: "5.5.0 (ULTIMATE)",
        credit: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        role: 0,
        cooldown: 5,
        category: "System",
        description: "বটের মেইন সিস্টেম এবং মেকানিজম সম্পর্কে বিস্তারিত জানুন।"
    },

    run: async (bot, msg, args) => {
        const { chat, message_id } = msg;

        // --- 📊 ডাটা ক্যালকুলেশন ---
        const uptime = process.uptime();
        const days = Math.floor(uptime / (24 * 3600));
        const hours = Math.floor((uptime % (24 * 3600)) / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        
        const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const totalCommands = global.loadedCommands.length;

        // ইউজার সংখ্যা চেক
        const USERS_FILE = path.join(__dirname, '../../users.json');
        let totalUsers = 0;
        try {
            if (fs.existsSync(USERS_FILE)) {
                const users = JSON.parse(fs.readFileSync(USERS_FILE));
                totalUsers = users.length;
            }
        } catch (e) { totalUsers = "Error"; }

        // --- 🎨 স্টাইলিশ মেসেজ ফরম্যাটিং ---
        let info = `✨ **${global.CONFIG.BOT_SETTINGS.NAME || "MCS-BOT"} | PREMIUM SYSTEM** ✨\n`;
        info += `┏━━━━━━━━━━━━━━━━━━━━━━━━┓\n`;
        info += `┃   💠 **DEVELOPER PROFILE**\n`;
        info += `┃ 👤 **Author:** 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر\n`;
        info += `┃ 🛡️ **Version:** ${module.exports.config.version}\n`;
        info += `┃ 📅 **Year:** 2026 (CSR-CORE)\n`;
        info += `┗━━━━━━━━━━━━━━━━━━━━━━━━┛\n\n`;

        info += `⚙️ **ACTIVE CORE ENGINES**\n`;
        info += `◈ ┠ 🛡️ **Security:** Anti-Exploit Active\n`;
        info += `◈ ┠ 🕵️ **Tracker:** Name & Username Sync\n`;
        info += `◈ ┠ 🔗 **Anti-Link:** Smart Filter On\n`;
        info += `◈ ┠ 🕌 **Prayer:** Auto Daily Refresh\n`;
        info += `◈ ┠ 💎 **Membership:** Group Access Shield\n`;
        info += `◈ ┠ 🔄 **NoPrefix:** ${global.isNoprefixActive ? "Enabled" : "Disabled"}\n`;
        info += `◈ ┗ ⏱️ **Cooldown:** Auto Spam Prevention\n\n`;

        info += `📊 **REAL-TIME ANALYTICS**\n`;
        info += `┣ 📂 **Commands:** ${totalCommands} Loaded\n`;
        info += `┣ 👥 **Total Users:** ${totalUsers} Active\n`;
        info += `┣ ⏳ **Uptime:** ${days}d ${hours}h ${minutes}m ${seconds}s\n`;
        info += `┣ 🧠 **RAM:** ${memoryUsage} MB / Free\n`;
        info += `┗ 🛰️ **Prefix:** [ \`${global.CONFIG.BOT_SETTINGS.PREFIX}\` ]\n\n`;

        info += `━━━━━━━━━━━━━━━━━━━━━━━\n`;
        info += `⚡ _CSR-BOT is optimized for 2026_`;

        // --- 🔘 ইনলাইন কিবোর্ড বাটন ---
        const options = {
            parse_mode: 'Markdown',
            reply_to_message_id: message_id,
            disable_web_page_preview: true,
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '✈️ Telegram', url: 'https://t.me/aurariyad' },
                        { text: '🔵 Telegram', url: 'https://m.me/aurariyadsir' }
                    ],
                    [
                        { text: '👨‍💻 Owner Contact', url: 'https://t.me/aurariyad' }
                    ]
                ]
            }
        };

        try {
            await bot.sendMessage(chat.id, info, options);
        } catch (error) {
            console.error("BotInfo Error:", error.message);
        }
    }
};


