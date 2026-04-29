/**
 * 🎬 AUTO VIDEO DOWNLOADER (NO PREFIX)
 * 👤 AUTHOR: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر
 */

const axios = require('axios');
const { alldown } = require('nayan-media-downloaders');

module.exports = {
    config: {
        name: "alldown",
        version: "1.3.6",
        author: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        prefix: false, // প্রিফিক্স ছাড়াই কাজ করবে
        category: "Media"
    },

    // এই ফাংশনটি প্রতিটি মেসেজ চেক করবে
    handleMessage: async (bot, msg) => {
        const text = msg.text;
        if (!text) return;

        // চেক করা হচ্ছে মেসেজটি কি কোনো ভিডিও লিঙ্ক কি না
        const supportedLinks = ["facebook.com", "fb.watch", "instagram.com", "tiktok.com", "reels"];
        const isVideoLink = supportedLinks.some(link => text.includes(link)) && text.startsWith("http");

        if (isVideoLink) {
            const chatId = msg.chat.id;
            const messageId = msg.message_id;

            // ওয়েটিং মেসেজ
            const waitMsg = await bot.sendMessage(chatId, "⏳ **লিঙ্ক পাওয়া গেছে! ভিডিওটি প্রসেস হচ্ছে...**", {
                reply_to_message_id: messageId,
                parse_mode: "Markdown"
            });

            try {
                const res = await alldown(text);
                if (!res || !res.data || !res.data.high) throw new Error("Link invalid");

                const { high, title } = res.data;
                const vidResponse = await axios.get(high, { responseType: 'stream' });

                await bot.sendVideo(chatId, vidResponse.data, {
                    caption: `🎬 **Title:** ${title || "Auto Downloader"}\n\n👤 **Credit:** Mohammad Badol`,
                    parse_mode: 'Markdown',
                    reply_to_message_id: messageId,
                    reply_markup: {
                        inline_keyboard: [[{ text: '👤 𝐁𝐎𝐓 𝐎𝐖𝐍𝐄𝐑', url: 'tg://user?id=6954597258' }]]
                    }
                });

                await bot.deleteMessage(chatId, waitMsg.message_id).catch(() => {});
            } catch (err) {
                await bot.editMessageText("❌ **দুঃখিত, ভিডিওটি ডাউনলোড করা সম্ভব হয়নি।**", {
                    chat_id: chatId,
                    message_id: waitMsg.message_id
                }).catch(() => {});
            }
        }
    },

    run: async (bot, msg, args) => {
        // এখানে কিছু না দিলেও চলবে কারণ handleMessage সব সামলাচ্ছে
    }
};


