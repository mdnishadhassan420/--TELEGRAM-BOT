/**
 * 🤖 MCS-BOT COMMAND: LIVE SUPPORT SYSTEM
 * 👤 AUTHOR: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر
 * 🆔 TELEGRAM ID: 6969889252
 */

function makeBotBox(text) {
    return `╭━─━─━❮ ✿CSR-BOT✿ ❯━─━─━╮\n\n${text}\n\n╰━──━─━−━━──━━─━━─━━─━❍`;
}

module.exports = {
    config: {
        name: "report",
        aliases: ["contact", "support"],
        version: "3.0.0",
        author: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        credit: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        role: 0,
        cooldown: 10, // ১০ সেকেন্ড কুলডাউন
        prefix: true,
        description: "অ্যাডমিনের সাথে সরাসরি চ্যাট করুন",
        category: "User",
        guide: "{prefix}report [আপনার মেসেজ]"
    },

    run: async function (bot, msg, args) {
        const chatId = msg.chat.id;
        const senderId = msg.from.id;
        const ADMIN_ID = 6969889252;

        // --- ১. অ্যাডমিন রিপ্লাই হ্যান্ডলিং (সরাসরি রিপ্লাই দিলেই কাজ করবে) ---
        if (senderId === ADMIN_ID && msg.reply_to_message) {
            const replyMsg = msg.reply_to_message.text || "";
            const targetIdMatch = replyMsg.match(/🆔 ID: (\d+)/);
            
            if (targetIdMatch) {
                const targetUserId = targetIdMatch[1];
                // এখানে অ্যাডমিন কমান্ডের নাম ছাড়াই যা লিখবে সেটাই উত্তর হিসেবে যাবে
                const adminReply = args.length > 0 ? args.join(" ") : msg.text;

                try {
                    await bot.sendMessage(targetUserId, makeBotBox(`📩 **[ ADMIN REPLY ]**\n\n${adminReply}`));
                    return bot.sendMessage(chatId, `✅ Message sent to User: ${targetUserId}`);
                } catch (e) {
                    return bot.sendMessage(chatId, "❌ ইউজারকে মেসেজ পাঠানো যায়নি।");
                }
            }
        }

        // --- ২. ইউজারের রিপোর্ট পাঠানো ---
        const reportText = args.join(" ");
        if (!reportText) {
            return bot.sendMessage(chatId, makeBotBox("❗ অনুগ্রহ করে আপনার সমস্যাটি লিখুন।\nউদাহরণ: `/report ভাই সাহায্য চাই`"));
        }

        const senderName = msg.from.first_name;
        const username = msg.from.username ? `@${msg.from.username}` : "N/A";

        const adminNotify = `📢 **[ NEW SUPPORT TICKET ]**\n` +
                           `━━━━━━━━━━━━━━━━━━━━\n` +
                           `👤 User: ${senderName}\n` +
                           `🆔 ID: ${senderId}\n` +
                           `🔗 Profile: ${username}\n` +
                           `📝 Message: ${reportText}\n` +
                           `━━━━━━━━━━━━━━━━━━━━\n` +
                           `💡 এই মেসেজে রিপ্লাই দিয়ে সরাসরি উত্তর পাঠান।`;

        try {
            await bot.sendMessage(ADMIN_ID, adminNotify);
            return bot.sendMessage(chatId, makeBotBox(`✅ অ্যাডমিনকে জানানো হয়েছে! আপনার ইনবক্সে উত্তরের জন্য অপেক্ষা করুন।`));
        } catch (error) {
            return bot.sendMessage(chatId, "❌ অ্যাডমিনের ইনবক্স লক করা বা সমস্যা আছে।");
        }
    }
};

