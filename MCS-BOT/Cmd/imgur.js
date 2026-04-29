/**
 * 🤖 CSR-BOT COMMAND: IMGUR UPLOADER
 * 👤 AUTHOR: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر (SYSTEM SYNCED)
 * 📝 ORIGINAL CREDITS: Nayan
 */

const axios = require('axios');

module.exports.config = {
    name: "imgur",
    version: "1.0.0",
    role: 0, // আপনার সিস্টেম অনুযায়ী (০ = ইউজার, ১ = এডমিন, ২ = অনার)
    credit: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر", // সিস্টেম রিকোয়ারমেন্ট অনুযায়ী ক্রেডিট নাম
    description: "Upload images or videos to Imgur via link or reply",
    prefix: true, // প্রিফিক্স প্রয়োজন কি না
    category: "utility",
    usage: "reply to an image or provide a link",
    cooldown: 5 // ৫ সেকেন্ড কুলডাউন
};

module.exports.run = async (bot, msg, args) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;

    // --- ১. লিংক বা রিপ্লাই চেক ---
    let linkanh = "";
    
    // যদি মেসেজটি কোনো ফটো বা ভিডিওতে রিপ্লাই করা হয়
    if (msg.reply_to_message) {
        const reply = msg.reply_to_message;
        if (reply.photo) {
            // টেলিগ্রাম ফটোর সবচেয়ে বড় সাইজটি নিবে
            const fileId = reply.photo[reply.photo.length - 1].file_id;
            const fileLink = await bot.getFileLink(fileId);
            linkanh = fileLink;
        } else if (reply.video) {
            const fileLink = await bot.getFileLink(reply.video.file_id);
            linkanh = fileLink;
        } else if (reply.animation) {
            const fileLink = await bot.getFileLink(reply.animation.file_id);
            linkanh = fileLink;
        }
    }

    // যদি রিপ্লাই না থাকে তবে আর্গুমেন্ট চেক করবে
    if (!linkanh && args.length > 0) {
        linkanh = args.join(" ").trim();
    }

    if (!linkanh) {
        return bot.sendMessage(chatId, '⚠️ **[ ERROR ]**\n━━━━━━━━━━━━━━━━━━━━\nদয়া করে একটি ইমেজ/ভিডিও লিঙ্কে রিপ্লাই দিন অথবা সরাসরি লিঙ্ক দিন।', { 
            reply_to_message_id: messageId,
            parse_mode: 'Markdown'
        });
    }

    try {
        // ইউআরএল ভ্যালিডেশন
        if (!/^https?:\/\//.test(linkanh)) {
            return bot.sendMessage(chatId, '❌ লিঙ্কটি অবশ্যই http:// বা https:// দিয়ে শুরু হতে হবে।', { reply_to_message_id: messageId });
        }

        const waitingMsg = await bot.sendMessage(chatId, '📤 **Uploading to Imgur...**', { reply_to_message_id: messageId, parse_mode: 'Markdown' });

        // --- ২. API থেকে ডাটা সংগ্রহ ---
        // আপনার আগের কোডের লজিক অনুযায়ী API লিঙ্ক সংগ্রহ
        const apisResponse = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json');
        const apiUrlBase = apisResponse.data.api;

        const encodedItemUrl = encodeURIComponent(linkanh);
        const res = await axios.get(`${apiUrlBase}/imgur?url=${encodedItemUrl}`);

        if (res.data && res.data.success) {
            const resultLink = res.data.link;
            
            let responseText = `✅ **「 IMGUR UPLOAD SUCCESS 」**\n━━━━━━━━━━━━━━━━━━━━\n`;
            responseText += `🔗 **Link:** \`${resultLink}\`\n`;
            responseText += `👤 **Credit:** \`${module.exports.config.credit}\`\n`;
            responseText += `━━━━━━━━━━━━━━━━━━━━`;

            return bot.editMessageText(responseText, {
                chat_id: chatId,
                message_id: waitingMsg.message_id,
                parse_mode: 'Markdown'
            });
        } else {
            throw new Error("API failed to upload");
        }

    } catch (e) {
        console.error(e);
        return bot.sendMessage(chatId, '❌ **[ ERROR ]**\nআপলোড করার সময় একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।', { reply_to_message_id: messageId });
    }
};


