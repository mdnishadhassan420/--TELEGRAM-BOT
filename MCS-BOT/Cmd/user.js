/**
 * 🤖 CSR-BOT COMMAND: USER MANAGER + BROADCAST
 * 👤 CREDIT: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر
 * 📅 YEAR: 2026
 */

const fs = require("fs");
const path = require("path");

module.exports = {
    config: {
        name: "user",
        aliases: ["users", "broadcast", "db"],
        version: "1.1.0",
        credit: " 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        role: 1, // শুধুমাত্র অ্যাডমিন
        cooldown: 5,
        prefix: true,
        category: "admin",
        description: "ডাটাবেজ ম্যানেজমেন্ট এবং ব্রডকাস্ট সিস্টেম।",
        guide: "/user count\n/user broadcast <মেসেজ>\n/user add <id>\n/user remove <id>"
    },

    run: async (bot, msg, args) => {
        const chatId = msg.chat.id;
        const USERS_FILE = path.join(process.cwd(), "users.json");

        const getSubs = () => {
            if (!fs.existsSync(USERS_FILE)) return [];
            try { return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8")); } catch (e) { return []; }
        };

        const saveSubs = (data) => {
            fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2), "utf-8");
        };

        const action = args[0]?.toLowerCase();
        let subs = getSubs();

        try {
            switch (action) {
                case "count":
                    return bot.sendMessage(chatId, `📊 **মোট ইউজার সংখ্যা:** \`${subs.length}\` জন।\n🛡️ **Credit:** ${module.exports.config.credit}`, { parse_mode: "Markdown" });

                case "list":
                    if (subs.length === 0) return bot.sendMessage(chatId, "📁 ডাটাবেজ খালি।");
                    return bot.sendMessage(chatId, `📜 **USER ID LIST:**\n\n\`${subs.join(", ")}\``, { parse_mode: "Markdown" });

                case "add":
                    let addId = parseInt(args[1]);
                    if (!addId || isNaN(addId)) return bot.sendMessage(chatId, "❌ সঠিক আইডি দিন।");
                    if (subs.includes(addId)) return bot.sendMessage(chatId, "⚠️ আইডিটি অলরেডি আছে।");
                    subs.push(addId);
                    saveSubs(subs);
                    return bot.sendMessage(chatId, `✅ আইডি \`${addId}\` যোগ করা হয়েছে।`);

                case "remove":
                    let remId = parseInt(args[1]);
                    if (!remId || isNaN(remId)) return bot.sendMessage(chatId, "❌ সঠিক আইডি দিন।");
                    subs = subs.filter(id => id !== remId);
                    saveSubs(subs);
                    return bot.sendMessage(chatId, `🗑️ আইডি \`${remId}\` রিমুভ করা হয়েছে।`);

                case "broadcast":
                case "bc":
                    // 📢 ব্রডকাস্ট লজিক
                    const bcMessage = args.slice(1).join(" ");
                    if (!bcMessage) return bot.sendMessage(chatId, "❌ ব্রডকাস্ট করার জন্য একটি মেসেজ লিখুন।\n\n💡 উদাহরণ: `/user broadcast হ্যালো ইউজারস!`");

                    const statusMsg = await bot.sendMessage(chatId, `⏳ ব্রডকাস্ট শুরু হচ্ছে... (Total: ${subs.length})`);
                    let successCount = 0;
                    let failCount = 0;

                    for (const id of subs) {
                        try {
                            await bot.sendMessage(id, `📢 **[ 𝐁𝐑𝐎𝐀𝐃𝐂𝐀𝐒𝐓 𝐌𝐄𝐒𝐒𝐀𝐆𝐄 ]**\n\n${bcMessage}\n\n🛡️ **Credit:** ${module.exports.config.credit}`, { parse_mode: "Markdown" });
                            successCount++;
                        } catch (e) {
                            failCount++;
                        }
                    }

                    return bot.editMessageText(`✅ **ব্রডকাস্ট সম্পন্ন!**\n\n🚀 সফল: \`${successCount}\` জন\n❌ ব্যর্থ: \`${failCount}\` জন`, {
                        chat_id: chatId,
                        message_id: statusMsg.message_id
                    });

                default:
                    let help = `🛠️ **USER & BROADCAST SYSTEM**\n`;
                    help += `━━━━━━━━━━━━━━━━━━━━\n`;
                    help += `📊 \`/user count\` - সংখ্যা দেখতে\n`;
                    help += `📢 \`/user broadcast <text>\` - সবাইকে মেসেজ দিতে\n`;
                    help += `➕ \`/user add <id>\` - আইডি যোগ করতে\n`;
                    help += `➖ \`/user remove <id>\` - আইডি মুছতে\n`;
                    help += `━━━━━━━━━━━━━━━━━━━━\n`;
                    help += `🛡️ **Credit:** ${module.exports.config.credit}`;
                    return bot.sendMessage(chatId, help, { parse_mode: "Markdown" });
            }
        } catch (error) {
            bot.sendMessage(chatId, "❌ অপারেশনটি সফল হয়নি।");
        }
    }
};


