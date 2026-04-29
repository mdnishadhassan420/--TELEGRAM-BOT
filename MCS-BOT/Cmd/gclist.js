/**
 * 🤖 CSR-BOT COMMAND: LIST GROUPS (AUTO FILE CREATION)
 * 👤 AUTHOR: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر
 * 🆔 TELEGRAM ID: 6969889252
 */

const fs = require('fs-extra'); // fs-extra ব্যবহার করা হয়েছে ফোল্ডার তৈরির সুবিধার্থে
const path = require('path');

function makeBotBox(text) {
    return `╭━─━─━❮ ✿𝐂𝐒𝐑-𝐁𝐎𝐓✿ ❯━─━─━╮\n\n${text}\n\n╰━──━─━−━━──━━─━━─━━─━❍`;
}

module.exports = {
    config: {
        name: "gclist",
        aliases: ["group", "grplist"],
        version: "1.1.0",
        author: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        credit: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        role: 2,
        cooldown: 10,
        prefix: true,
        description: "বটের গ্রুপ লিস্ট দেখা এবং অটো ফাইল তৈরি",
        category: "Owner",
        guide: "{prefix}listgroups"
    },

    run: async function (bot, msg, args) {
        const chatId = msg.chat.id;

        // আপনার রিকোয়েস্ট করা নির্দিষ্ট পাথ
        const DIR_PATH = path.join(__dirname, 'BADOL');
        const SETTINGS_FILE = path.join(DIR_PATH, 'group_settings.json');

        try {
            // ১. যদি BADOL ফোল্ডার না থাকে তবে তৈরি করবে
            if (!fs.existsSync(DIR_PATH)) {
                fs.ensureDirSync(DIR_PATH);
            }

            // ২. যদি জেসন ফাইল না থাকে তবে একটি খালি অবজেক্ট দিয়ে তৈরি করবে
            if (!fs.existsSync(SETTINGS_FILE)) {
                fs.writeJsonSync(SETTINGS_FILE, {}, { spaces: 2 });
            }

            // ৩. বর্তমান গ্রুপটি যদি ডাটাবেজে না থাকে তবে অ্যাড করে নেবে (Auto Sync)
            let settings = fs.readJsonSync(SETTINGS_FILE);
            if (msg.chat.type !== 'private' && !settings[chatId]) {
                settings[chatId] = { joinedAt: new Date().toISOString() };
                fs.writeJsonSync(SETTINGS_FILE, settings, { spaces: 2 });
            }

            // ৪. লিস্ট তৈরি করা
            const groupIds = Object.keys(settings);
            let report = `📊 **[ BOT ACTIVE GROUPS ]**\n`;
            report += `━━━━━━━━━━━━━━━━━━━━\n`;

            let groupCount = 0;
            for (let id of groupIds) {
                try {
                    const chat = await bot.getChat(id);
                    groupCount++;
                    const memberCount = await bot.getChatMemberCount(id);
                    report += `${groupCount}. **${chat.title}**\n🔹 ID: \`${id}\`\n👥 Members: ${memberCount}\n\n`;
                } catch (e) {
                    // বট গ্রুপে না থাকলে ডাটাবেজ থেকে রিমুভ করতে চাইলে নিচের লাইনটি আনকমেন্ট করতে পারেন
                    // delete settings[id]; fs.writeJsonSync(SETTINGS_FILE, settings);
                    continue;
                }
            }

            if (groupCount === 0) {
                return bot.sendMessage(chatId, makeBotBox("❌ কোনো গ্রুপের তথ্য এখনো জমা হয়নি।"));
            }

            report += `━━━━━━━━━━━━━━━━━━━━\n✅ মোট অ্যাক্টিভ গ্রুপ: ${groupCount}`;
            return bot.sendMessage(chatId, makeBotBox(report), { parse_mode: 'Markdown' });

        } catch (error) {
            console.error(error);
            return bot.sendMessage(chatId, "❌ সিস্টেম এরর: ডাটাবেজ তৈরি বা রিড করতে সমস্যা হয়েছে।");
        }
    }
};


