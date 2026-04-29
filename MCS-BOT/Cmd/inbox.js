/**
 * 🛠️ CSR-BOT COMMAND: INBOX (NO PREFIX)
 * 👤 AUTHOR: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر
 * 🛡️ SYSTEM: ROLE 0, COOLDOWN, CREDIT, NO-PREFIX
 */

module.exports = {
    config: {
        name: "inbox",
        aliases: ["ib", "in"],
        version: "1.1.0",
        role: 0, // সবার জন্য উন্মুক্ত
        credit: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        cooldown: 5, // ৫ সেকেন্ড কুলডাউন
        category: "Utility",
        description: "ইউজারের ইনবক্সে এডমিন কন্টাক্ট এবং নোটিশ পাঠানো।",
        usage: "inbox (No Prefix)",
        prefix: false // এই কমান্ডটি প্রিফিক্স ছাড়াই কাজ করবে
    },

    run: async (bot, msg, args) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const userName = msg.from.first_name || "ইউজার";
        const AUTHOR_ID = 6969889252; // আপনার সেভ করা আইডি

        // ইনবক্সে পাঠানোর মেসেজ ডিজাইন
        const privateNotice = `🔔 **অফিসিয়াল নোটিশ**\n━━━━━━━━━━━━━━━━━━━━\nপ্রিয় **${userName}**, আমাদের বট ব্যবহার করার জন্য আপনাকে ধন্যবাদ।\n\n🚀 **আপডেট:** বটের নতুন সব ফিচার এবং আপডেট জানতে আমাদের সাথেই থাকুন। কোনো সমস্যা হলে ওনারের সাথে যোগাযোগ করুন।`;

        // বাটন কনফিগারেশন
        const inlineKeyboard = {
            inline_keyboard: [
                [
                    {
                        text: "👨‍💻 Admin Contact",
                        url: `tg://user?id=${AUTHOR_ID}`
                    }
                ]
            ]
        };

        try {
            // ১. ইউজারের পার্সোনাল ইনবক্সে মেসেজ পাঠানো
            await bot.sendMessage(userId, privateNotice, {
                parse_mode: "Markdown",
                reply_markup: inlineKeyboard
            });

            // ২. যদি গ্রুপ থেকে কমান্ড দেয়, তবে গ্রুপে কনফার্মেশন পাঠানো
            if (msg.chat.type !== 'private') {
                return bot.sendMessage(chatId, `✅ **হাই ${userName}!**\nআমি আপনার ইনবক্সে একটি প্রয়োজনীয় নোটিশ ও এডমিন কন্টাক্ট পাঠিয়েছি। চেক করুন।`, { 
                    reply_to_message_id: msg.message_id,
                    parse_mode: "Markdown" 
                });
            }

        } catch (error) {
            // যদি ইউজার বটকে আগে থেকে ব্লক করে রাখে বা স্টার্ট না করে
            if (error.response && error.response.statusCode === 403) {
                return bot.sendMessage(chatId, `❌ **${userName}**, আমি আপনাকে মেসেজ পাঠাতে পারছি না।\n\nদয়া করে প্রথমে বটের ইনবক্সে গিয়ে /start চাপুন।`, { 
                    reply_to_message_id: msg.message_id 
                });
            }
            console.error("Inbox Command Error:", error.message);
        }
    }
};


