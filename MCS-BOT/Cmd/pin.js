/**
 * 📌 CSR-BOT PIN & UNPIN SYSTEM
 * 👤 AUTHOR: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر
 */

module.exports = {
    config: {
        name: "pin",
        aliases: ["পিন"],
        role: 1, // শুধু অ্যাডমিন/ওনার ব্যবহার করতে পারবে
        cooldown: 5,
        credit: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        description: "মেসেজ পিন বা আনপিন করুন",
        usage: "/pin (রিপ্লাই দিয়ে) অথবা /pin un (আনপিন করতে)",
        prefix: true
    },

    run: async function (bot, msg, args) {
        const chatId = msg.chat.id;
        const messageId = msg.message_id;
        const action = args[0] ? args[0].toLowerCase() : "";

        // --- আনপিন করার লজিক ---
        if (action === "un" || action === "unpin" || action === "আনপিন") {
            try {
                await bot.unpinChatMessage(chatId);
                return bot.sendMessage(chatId, "✅ পিন করা মেসেজটি সফলভাবে আনপিন করা হয়েছে।", {
                    reply_to_message_id: messageId
                });
            } catch (error) {
                return bot.sendMessage(chatId, "❌ আনপিন করার মতো কোনো মেসেজ পাওয়া যায়নি বা আমি অ্যাডমিন নই।");
            }
        }

        // --- পিন করার লজিক ---
        if (!msg.reply_to_message) {
            return bot.sendMessage(chatId, "⚠️ পিন করার জন্য একটি মেসেজে রিপ্লাই দিন!\n\n💡 টিপস: আনপিন করতে লিখুন `/pin un`", {
                reply_to_message_id: messageId
            });
        }

        const targetMessageId = msg.reply_to_message.message_id;

        try {
            await bot.pinChatMessage(chatId, targetMessageId);
            bot.sendMessage(chatId, "📌 মেসেজটি সফলভাবে পিন করা হয়েছে।", {
                reply_to_message_id: targetMessageId
            });

        } catch (error) {
            if (error.response && error.response.body && error.response.body.description.includes("not enough rights")) {
                bot.sendMessage(chatId, "❌ আমাকে পিন করার পারমিশন (Admin Rights) দিন।");
            } else {
                bot.sendMessage(chatId, "❌ এরর: মেসেজটি পিন করা সম্ভব হয়নি।");
            }
        }
    }
};


