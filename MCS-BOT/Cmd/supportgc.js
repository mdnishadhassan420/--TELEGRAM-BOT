/**
 * 🤖 CSR-BOT SUPPORT COMMAND
 * 👤 AUTHOR: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر
 * 📅 YEAR: 2026
 */

module.exports = {
    config: {
        name: "supportgc",
        aliases: ["links", "link", "community"],
        version: "1.2.1",
        credit: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر", // আপনার সিস্টেম অনুযায়ী Credit Name
        role: 0,                   // সবার জন্য উন্মুক্ত
        prefix: true,              
        cooldown: 5,               // ৫ সেকেন্ড কুলডাউন
        description: "বটের সকল অফিসিয়াল গ্রুপ এবং চ্যানেলের তালিকা।"
    },

    run: async (bot, msg, args) => {
        const chatId = msg.chat.id;
        const firstName = msg.from.first_name || "User";

        const supportText = 
            `🌟 **স্বাগতম, ${firstName}!** 🌟\n` +
            `━━━━━━━━━━━━━━━━━━━━━━\n` +
            `🚀 **সেরা টেক আপডেট এবং প্রিমিয়াম সাপোর্ট পেতে আমাদের সাথে যুক্ত হন!**\n\n` +
            `নিচের লিংকগুলো আপনি কপি করে বন্ধুদের সাথে শেয়ার করতে পারেন। প্রতিটি লিংকের ওপর ক্লিক করলেই কপি হয়ে যাবে! 🔥\n\n` +
            `📢 **অফিসিয়াল চ্যানেল ও গ্রুপসমূহ:**\n` +
            `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `🔹 **MAIN CHANEL** 🎬\n` +
            `🔗 \`https://t.me/techmatrix360\`\n\n` +
            `🔹 **CSR SUPPORT** 🛠️\n` +
            `🔗 \`https://t.me/csrsupporter_bot\`\n\n` +
            `🔹 **CSR BOT GC** 🤖\n` +
            `🔗 \`https://t.me/botgccsr\`\n\n` +
            `🔹 **SR MODS APK** 📲\n` +
            `🔗 \`https://t.me/testcsrriyad\`\n\n` +
            `👤 **OWNER USERNAME:**\n` +
            `🔗 \`@aurariyad\`\n\n` +
            `✨ **${firstName}**, দেরি না করে এখনই নিচের বাটনগুলোতে ক্লিক করে আমাদের পরিবারের সদস্য হয়ে যান! 🦋\n` +
            `━━━━━━━━━━━━━━━━━━━━━━\n` +
            `*Shared with Love & Support.*\n` +
            `👤 **Developer:** \`𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر\``;

        const replyMarkup = {
            inline_keyboard: [
                [
                    { text: "🎬 MAIN CHANNEL", url: "https://t.me/techmatrix360" },
                    { text: "🛠️ CSR Support", url: "https://t.me/csrsupporter_bot" }
                ],
                [
                    { text: "🤖 CSR Bot GC", url: "https://t.me/botgccsr" },
                    { text: "📲 Main Channel", url: "https://t.me/testcsrriyad" }
                ],
                [
                    { text: "👨‍💻 Contact Owner", url: "https://t.me/aurariyad" }, // এখানে ইউজারনেম লিংক আপডেট করা হয়েছে
                    { text: "📤 Share All Links", url: "https://t.me/share/url?url=Check%20out%20our%20Official%20Communities!%0A%0A🎬%20Editor%20Zone:%20https://t.me/mreditorzone%0A🛠️%20Support:%20https://t.me/mcssupport%0A🤖%20Bot%20GC:%20https://t.me/BADOLBOTGC%0A📲%20Main:%20https://t.me/SB_MODS_APK" }
                ]
            ]
        };

        try {
            await bot.sendMessage(chatId, supportText, {
                parse_mode: "Markdown",
                disable_web_page_preview: true, 
                reply_markup: replyMarkup
            });
        } catch (error) {
            console.error("Support Command Error:", error);
        }
    }
};


