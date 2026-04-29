/**
 * 🛠️ CSR-BOT COMMAND: MP3 CONVERTER
 * 👤 AUTHOR: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر
 * 🛡️ SYSTEM: ROLE 0, COOLDOWN, CREDIT, FILE SYSTEM
 * 📂 TEMP STORAGE: CSR-BOT/Cmd/Badol/
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios'); // node-fetch এর বদলে axios ব্যবহার করা হয়েছে যা বেশি স্থিতিশীল
const { alldown } = require('nayan-media-downloaders');

module.exports = {
    config: {
        name: "mp3",
        aliases: ["audio", "music"],
        version: "1.0.2",
        role: 0, // সবার জন্য উন্মুক্ত
        credit: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        cooldown: 10, // ১০ সেকেন্ড কুলডাউন (প্রসেসিং এর জন্য সময় লাগে)
        category: "Media",
        description: "ভিডিও ফাইল বা সোশ্যাল মিডিয়া লিংক থেকে MP3 নামান।",
        usage: "/mp3 [URL] অথবা ভিডিওতে রিপ্লাই দিন",
        prefix: true
    },

    run: async (bot, msg, args) => {
        const chatId = msg.chat.id;
        
        // আপনার রিকোয়েস্ট অনুযায়ী Badol ফোল্ডার পাথ
        const badolDir = path.join(__dirname, 'Badol');
        if (!fs.existsSync(badolDir)) {
            fs.mkdirSync(badolDir, { recursive: true });
        }

        const waitingMsg = await bot.sendMessage(chatId, "⏳ আপনার অডিও ফাইলটি প্রসেসিং হচ্ছে, দয়া করে একটু অপেক্ষা করুন...");

        try {
            let audioSourceUrl = "";
            let fileName = `Badol_Audio_${Date.now()}.mp3`;
            const mp3Path = path.join(badolDir, fileName);

            // ১. ভিডিওতে রিপ্লাই দিলে (Telegram Video)
            if (msg.reply_to_message && msg.reply_to_message.video) {
                const video = msg.reply_to_message.video;
                const file = await bot.getFile(video.file_id);
                // bot.token সরাসরি ব্যবহার করা হচ্ছে যা আপনার মেইন ফাইল থেকে আসবে
                audioSourceUrl = `https://api.telegram.org/file/bot${bot.token}/${file.file_path}`;
            } 
            // ২. লিংক দিলে (YouTube/TikTok/FB/Insta etc.)
            else if (args && args.length > 0) {
                const url = args[0];
                const res = await alldown(url);
                if (res.status && res.data && res.data.audio) {
                    audioSourceUrl = res.data.audio;
                }
            }

            if (audioSourceUrl) {
                // ফাইল ডাউনলোড শুরু (Axios Stream ব্যবহার করে)
                const response = await axios({
                    method: 'get',
                    url: audioSourceUrl,
                    responseType: 'stream'
                });

                const writer = fs.createWriteStream(mp3Path);
                response.data.pipe(writer);

                await new Promise((resolve, reject) => {
                    writer.on('finish', resolve);
                    writer.on('error', reject);
                });

                // অডিও ফাইল পাঠানো
                await bot.sendAudio(chatId, mp3Path, {
                    caption: "✅ **Success!**\n\n_Converted by MCS-BOT_",
                    parse_mode: "Markdown",
                    reply_to_message_id: msg.message_id
                });

                // কাজ শেষ হলে সার্ভার থেকে ফাইল মুছে ফেলা (Storage পরিষ্কার রাখতে)
                if (fs.existsSync(mp3Path)) fs.unlinkSync(mp3Path);
            } else {
                await bot.sendMessage(chatId, "❌ আমি কোনো ভিডিও ফাইল বা সঠিক লিংক খুঁজে পাইনি।\n\n💡 **নিয়ম:** ভিডিওতে রিপ্লাই দিয়ে `/mp3` লিখুন অথবা `/mp3 [ভিডিওর লিংক]` দিন।");
            }

        } catch (error) {
            console.error("MP3 Command Error:", error);
            await bot.sendMessage(chatId, "❌ দুঃখিত, অডিও প্রসেস করতে একটি সমস্যা হয়েছে। লিংকটি সঠিক কিনা চেক করুন।");
        } finally {
            // 'Please wait' মেসেজটি ডিলিট করা
            if (waitingMsg) {
                await bot.deleteMessage(chatId, waitingMsg.message_id).catch(() => {});
            }
        }
    }
};


