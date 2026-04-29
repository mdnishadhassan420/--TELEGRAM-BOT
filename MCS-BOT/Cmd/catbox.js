/**
 * 🤖 CSR-BOT COMMAND: CATBOX
 * 👤 CREDIT: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر
 * 📅 YEAR: 2026
 * 🆔 TELEGRAM ID: 6969889252
 */

const axios = require("axios");

// API URL Fetcher
const baseApiUrl = async () => {
  try {
    const base = await axios.get(`https://noobs-api-team-url.vercel.app/N1SA9/baseApiUrl.json`);
    return base.data.api;
  } catch (err) {
    return "https://noobs-api2.vercel.app"; // Fallback URL
  }
};

module.exports = {
  config: {
    name: "catbox",
    aliases: ["cat", "cb", "upload"],
    version: "1.7.0",
    credit: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر", // শুধুমাত্র ক্রেডিট সিস্টেম রাখা হলো
    role: 0,                   // Role Permission System
    cooldown: 5,               // Cooldown System
    prefix: true,
    category: "utility",
    description: "ভিডিও/অডিও/ছবি থেকে ডিরেক্ট লিঙ্ক তৈরি করুন (Max 20MB)",
    guide: "যেকোনো ফাইল বা ছবিতে রিপ্লাই দিয়ে লেখুন: /catbox"
  },

  run: async (bot, msg, args) => {
    const chatId = msg.chat.id;

    try {
      // ১. চেক করা হচ্ছে মেসেজটি কোনো রিপ্লাই কি না
      const replyMsg = msg.reply_to_message;
      if (!replyMsg) {
        return bot.sendMessage(chatId, "❌ দয়া করে একটি ছবি, ভিডিও বা অডিও ফাইলে রিপ্লাই দিয়ে কমান্ডটি ব্যবহার করুন।");
      }

      // ২. ফাইল আইডি এবং সাইজ ডিটেকশন
      let fileId, fileSize;
      
      if (replyMsg.photo) {
        const photo = replyMsg.photo[replyMsg.photo.length - 1];
        fileId = photo.file_id;
        fileSize = photo.file_size;
      } else if (replyMsg.video) {
        fileId = replyMsg.video.file_id;
        fileSize = replyMsg.video.file_size;
      } else if (replyMsg.audio || replyMsg.voice) {
        const audio = replyMsg.audio || replyMsg.voice;
        fileId = audio.file_id;
        fileSize = audio.file_size;
      } else if (replyMsg.document) {
        fileId = replyMsg.document.file_id;
        fileSize = replyMsg.document.file_size;
      }

      if (!fileId) {
        return bot.sendMessage(chatId, "❌ আমি কোনো ফাইল খুঁজে পাচ্ছি না।");
      }

      // ৩. ২০ এমবি লিমিট চেক
      const limitInBytes = 20 * 1024 * 1024;
      if (fileSize > limitInBytes) {
        return bot.sendMessage(chatId, "⚠️ ফাইলটি ২০ এমবি-র বেশি বড়! এটি আপলোড করা সম্ভব নয়।");
      }

      const processingMsg = await bot.sendMessage(chatId, "⏳ আপলোড হচ্ছে... অনুগ্রহ করে অপেক্ষা করুন।");

      // ৪. টেলিগ্রাম থেকে লিঙ্ক জেনারেট
      const fileLink = await bot.getFileLink(fileId);

      // ৫. এপিআই কল
      const base = await baseApiUrl();
      const response = await axios.get(`${base}/catbox?url=${encodeURIComponent(fileLink)}`);

      // ৬. প্রসেসিং মেসেজ ডিলিট
      await bot.deleteMessage(chatId, processingMsg.message_id).catch(() => {});

      // ৭. ফাইনাল আউটপুট (শুধুমাত্র ক্রেডিট ডিসপ্লে)
      if (response.data && response.data.url) {
        bot.sendMessage(chatId, `✅ **Uploaded Successfully!**\n\n🔗 **URL:** ${response.data.url}\n\n🛡️ **Credit:** ${module.exports.config.credit}`, {
          parse_mode: "Markdown",
          reply_to_message_id: msg.message_id
        });
      } else {
        throw new Error("API Response Error");
      }

    } catch (e) {
      bot.sendMessage(chatId, "❌ ফাইলটি আপলোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  }
};

