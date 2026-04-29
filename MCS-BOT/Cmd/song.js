/**
 * 🛠️ CSR-BOT COMMAND: SONG / VIDEO SEARCH
 * 👤 AUTHOR: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر
 * 🛡️ SYSTEM: ROLE 0, COOLDOWN, CREDIT, AUTO SEARCH
 */

const axios = require('axios');
const Youtube = require('youtube-search-api');
const { ytdown } = require('nayan-media-downloaders');

module.exports = {
    config: {
        name: "song",
        aliases: ["sing", "yt"],
        version: "2.0.0",
        role: 0, // সবার জন্য উন্মুক্ত
        credit: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        cooldown: 15, // ভিডিও প্রসেসিংয়ে সময় লাগে তাই ১৫ সেকেন্ড কুলডাউন
        category: "Media",
        description: "ইউটিউব থেকে গান বা ভিডিও সার্চ করে ডাউনলোড করুন।",
        usage: "/song <গানের নাম>",
        prefix: true
    },

    run: async (bot, msg, args) => {
        const chatId = msg.chat.id;

        // ১. যদি ইউজার শুধু /song লিখে কোনো নাম না দেয়
        if (args.length === 0) {
            const waitInput = await bot.sendMessage(chatId, "🔎 আপনি কোন গানটি খুঁজছেন? গানের নাম লিখে রিপ্লাই দিন:", {
                reply_to_message_id: msg.message_id
            });

            // ইউজারের পরবর্তী ইনপুট শোনার জন্য ওয়ান-টাইম লিসেনার
            const inputHandler = async (replyMsg) => {
                if (replyMsg.from.id === msg.from.id && replyMsg.chat.id === chatId) {
                    bot.removeListener('message', inputHandler);
                    await processSong(bot, chatId, replyMsg.text, replyMsg.message_id);
                    // ইনপুট চাওয়ার মেসেজটি ডিলিট করে দেওয়া (ক্লিন ইন্টারফেসের জন্য)
                    bot.deleteMessage(chatId, waitInput.message_id).catch(() => {});
                }
            };
            bot.on('message', inputHandler);
            return;
        }

        // ২. যদি সরাসরি নাম লিখে কমান্ড দেয়
        const songName = args.join(" ");
        await processSong(bot, chatId, songName, msg.message_id);
    }
};

// --- মেইন প্রসেসিং ফাংশন ---
async function processSong(bot, chatId, query, replyToId) {
    const loadingMsg = await bot.sendMessage(chatId, "⏳ ইউটিউব থেকে খোঁজা হচ্ছে, দয়া করে অপেক্ষা করুন...");

    try {
        // ইউটিউব সার্চ (টপ ১ টি রেজাল্ট)
        const searchResult = await Youtube.GetListByKeyword(query, false, 1);
        
        if (!searchResult.items || searchResult.items.length === 0) {
            await bot.deleteMessage(chatId, loadingMsg.message_id);
            return bot.sendMessage(chatId, "❌ দুঃখিত, আপনার দেওয়া নামে কোনো গান পাওয়া যায়নি।", { reply_to_message_id: replyToId });
        }

        const videoId = searchResult.items[0].id;
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

        // ডাউনলোডার এপিআই কল
        const downloadInfo = await ytdown(videoUrl);
        
        if (!downloadInfo.status || !downloadInfo.data || !downloadInfo.data.video) {
            throw new Error("Download URL not found");
        }

        const { title, video } = downloadInfo.data;

        // ভিডিও স্ট্রিম গেট করা
        const response = await axios({
            method: 'get',
            url: video,
            responseType: 'stream'
        });

        const replyMarkup = {
            inline_keyboard: [
                [{ text: "👤 Owner: Mohammad Badol", url: "https://t.me/B4D9L_007" }]
            ]
        };

        // ভিডিও পাঠানো
        await bot.sendVideo(chatId, response.data, {
            caption: `🎥 **Title:** ${title}\n\n✅ _Downloaded by MCS-BOT_`,
            parse_mode: "Markdown",
            reply_to_message_id: replyToId,
            reply_markup: replyMarkup
        });

        // লোডিং মেসেজ ডিলিট
        await bot.deleteMessage(chatId, loadingMsg.message_id);

    } catch (err) {
        console.error("Song Command Error:", err);
        await bot.deleteMessage(chatId, loadingMsg.message_id).catch(() => {});
        await bot.sendMessage(chatId, "❌ দুঃখিত, ভিডিওটি ডাউনলোড করতে সমস্যা হয়েছে। অন্য কোনো নাম দিয়ে চেষ্টা করুন।", {
            reply_to_message_id: replyToId
        });
    }
}


