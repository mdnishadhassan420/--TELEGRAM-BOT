/**
 * 🛠️ CSR-BOT COMMAND: KICK
 * 👤 AUTHOR: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر
 */

module.exports = {
    config: {
        name: "kick",
        aliases: ["vag", "remove"],
        version: "1.0.2",
        role: 1, // শুধু অ্যাডমিন এবং ওনার ব্যবহার করতে পারবে
        credit: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        cooldown: 5,
        category: "Admin",
        description: "রিপ্লাই করা ইউজারকে নোটিশ দিয়ে গ্রুপ থেকে কিক করে।",
        usage: "/kick (reply to user)",
        prefix: true
    },

    run: async (bot, msg, args) => {
        const chatId = msg.chat.id;
        const AUTHOR_ID = 6969889252; // আপনার আইডি

        // ১. রিপ্লাই চেক
        if (!msg.reply_to_message) {
            return bot.sendMessage(chatId, "❌ অনুগ্রহ করে যাকে কিক করতে চান তার মেসেজে রিপ্লাই দিন।", {
                reply_to_message_id: msg.message_id
            });
        }

        const target = msg.reply_to_message.from;
        const targetId = target.id;
        const targetMention = `[${target.first_name}](tg://user?id=${targetId})`;
        const ownerMention = `[Boss 😎](tg://user?id=${AUTHOR_ID})`;
        const botInfo = await bot.getMe();

        // ২. সেলফ-কিক এবং ওনার-কিক প্রোটেকশন
        if (targetId === botInfo.id) {
            return bot.sendMessage(chatId, "❌ আমি নিজেকে কিক করতে পারব না!");
        }

        if (targetId === AUTHOR_ID) {
            return bot.sendMessage(chatId, "❌ আমি আমার Boss-কে কিক করতে পারব না! 😅", {
                reply_to_message_id: msg.message_id
            });
        }

        try {
            // ৩. টার্গেট ইউজার অ্যাডমিন কিনা চেক
            const targetMember = await bot.getChatMember(chatId, targetId);
            if (targetMember.status === 'administrator' || targetMember.status === 'creator') {
                return bot.sendMessage(chatId, `❌ ${target.first_name} একজন অ্যাডমিন! আমি অ্যাডমিনকে রিমুভ করতে পারি না।`);
            }

            // ৪. বটের পারমিশন চেক
            const botMember = await bot.getChatMember(chatId, botInfo.id);
            if (!botMember.can_restrict_members) {
                return bot.sendMessage(chatId, "❌ আমার কাছে 'Restrict Members' পারমিশন নেই। আমাকে অ্যাডমিন করুন!");
            }

            // ৫. কিক করার আগের ফানি নোটিশ (আগের মতো)
            await bot.sendMessage(
                chatId,
                `⚠️ *Attention Everyone!* ⚠️\n\n${targetMention} বক্সে অনেক বেশি *পাকনামি* করছিল তাই \n${ownerMention} এর নির্দেশে এখনই তাকে বক্স থেকে উড়িয়ে দেওয়া হলো! 🤣✈️\n\n_Bye Bye 👋 Next time behave!_`,
                { parse_mode: "Markdown" }
            );

            // ৬. ফাইনাল কিক লজিক
            await bot.banChatMember(chatId, targetId);
            // সাথে সাথে আনব্যান (যাতে সে ব্যান হয়ে না থাকে, শুধু গ্রুপ থেকে বের হয়ে যায়)
            await bot.unbanChatMember(chatId, targetId); 

            // ৭. কিক করার পরের কনফার্মেশন মেসেজ
            await bot.sendMessage(chatId, `✅ ${targetMention} সফলভাবে বক্স থেকে রিমুভ হয়েছে।`, { parse_mode: "Markdown" });

        } catch (err) {
            console.error(err);
            await bot.sendMessage(chatId, "❌ কিক করতে ব্যর্থ হয়েছি। সম্ভবত আমার পর্যাপ্ত পারমিশন নেই।");
        }
    }
};


