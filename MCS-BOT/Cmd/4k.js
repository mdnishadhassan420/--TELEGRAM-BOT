/**
 * 🤖 CSR-BOT COMMAND: 4K IMAGE UPSCALE
 * 👤 AUTHOR: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر (Converted)
 * 📅 YEAR: 2026
 */

const axios = require("axios");

// API URL Fetcher
const noobcore = "https://raw.githubusercontent.com/noobcore404/NC-STORE/main/NCApiUrl.json";

async function getFahimApi() {
    try {
        const res = await axios.get(noobcore, { timeout: 10000 });
        if (!res.data?.fahim) throw new Error("API base not found");
        return res.data.fahim;
    } catch (e) {
        return null;
    }
}

module.exports = {
    config: {
        name: "4k",
        aliases: ["upscale", "hd", "enhance"],
        role: 0,            // ০ = সবাই ব্যবহার করতে পারবে
        cooldown: 10,       // ১০ সেকেন্ড কুলডাউন (ইমেজ প্রসেসিং এর জন্য বেশি রাখা ভালো)
        prefix: true,       // প্রিপিক্স লাগবে
        credit: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر", // আপনার ক্রেডিট সিস্টেম অনুযায়ী
        description: "ইমেজকে 4K কোয়ালিটিতে রূপান্তর করুন (Reply to image)"
    },

    run: async (bot, msg, args) => {
        const chatId = msg.chat.id;
        const messageId = msg.message_id;

        let imageUrl = "";

        // ১. ইমেজ ডিটেকশন (Reply check)
        if (msg.reply_to_message && msg.reply_to_message.photo) {
            // টেলিগ্রাম ফটো অ্যারের লাস্ট আইটেমটি সবচেয়ে হাই রেজোলিউশন হয়
            const photos = msg.reply_to_message.photo;
            const fileId = photos[photos.length - 1].file_id;
            const fileData = await bot.getFile(fileId);
            imageUrl = `https://api.telegram.org/file/bot${global.CONFIG.BOT_TOKEN}/${fileData.file_path}`;
        } 
        else if (msg.photo) {
            const photos = msg.photo;
            const fileId = photos[photos.length - 1].file_id;
            const fileData = await bot.getFile(fileId);
            imageUrl = `https://api.telegram.org/file/bot${global.CONFIG.BOT_TOKEN}/${fileData.file_path}`;
        }
        else {
            return bot.sendMessage(chatId, "❌ অনুগ্রহ করে একটি ছবিতে রিপ্লাই দিয়ে `/4k` লিখুন।", { reply_to_message_id: messageId });
        }

        const waitMsg = await bot.sendMessage(chatId, "⏳ আপনার ছবিটি 4K করা হচ্ছে, দয়া করে অপেক্ষা করুন...", { reply_to_message_id: messageId });

        try {
            // ২. API থেকে ডাটা আনা
            const BASE_URL = await getFahimApi();
            if (!BASE_URL) throw new Error("API Server Down");

            const apiUrl = `${BASE_URL}/4k?url=${encodeURIComponent(imageUrl)}`;
            const res = await axios.get(apiUrl);

            if (!res.data || !res.data.image) {
                throw new Error("Invalid API Response");
            }

            // ৩. আপস্কেল করা ছবি পাঠানো
            await bot.sendPhoto(chatId, res.data.image, {
                caption: `✅ **4K Upscale Complete!**\n👤 **Credit:** ${module.exports.config.credit}`,
                reply_to_message_id: messageId,
                parse_mode: 'Markdown'
            });

            // ৪. প্রসেসিং মেসেজ ডিলিট করা
            bot.deleteMessage(chatId, waitMsg.message_id).catch(() => {});

        } catch (error) {
            console.error("4K Error:", error);
            bot.editMessageText("❌ দুঃখিত! এই মুহূর্তে ইমেজটি প্রসেস করা সম্ভব হচ্ছে না।", {
                chat_id: chatId,
                message_id: waitMsg.message_id
            });
        }
    }
};


