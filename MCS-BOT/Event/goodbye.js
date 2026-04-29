const { createCanvas, loadImage } = require('canvas');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
    config: {
        name: "goodbye",
        eventType: "left_chat_member", // মেম্বার লিভ নিলে এই ইভেন্ট ট্রিগার হয়
        author: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        description: "মেম্বার গ্রুপ থেকে চলে গেলে কার্ডসহ বিদায় জানাবে"
    },

    run: async (bot, msg) => {
        const chatId = msg.chat.id;
        const groupName = msg.chat.title || "Group";
        const leftUser = msg.left_chat_member;
        const ownerID = "6969889252"; 
        const ownerName = "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر";

        if (!leftUser) return;

        // ১. সময় ও তারিখ (বাংলাদেশ টাইমজোন)
        const now = new Date();
        const options = { timeZone: 'Asia/Dhaka' };
        const timeStr = now.toLocaleTimeString('en-US', { ...options, hour: '2-digit', minute: '2-digit', hour12: true });
        
        const hour = parseInt(now.toLocaleTimeString('en-GB', { ...options, hour: '2-digit', hour12: false }));
        let period = (hour >= 5 && hour < 12) ? "সকাল" : (hour >= 12 && hour < 15) ? "দুপুর" : (hour >= 15 && hour < 18) ? "বিকাল" : (hour >= 18 && hour < 20) ? "সন্ধ্যা" : "রাত";

        try {
            const memberCount = await bot.getChatMemberCount(chatId);

            // ২. গ্রুপের ছবি লোড ফাংশন
            async function getGroupImg(id) {
                try {
                    const chat = await bot.getChat(id);
                    if (!chat.photo) return await loadImage('https://i.imgur.com/8K9670n.png');
                    const file = await bot.getFile(chat.photo.big_file_id);
                    return await loadImage(`https://api.telegram.org/file/bot${bot.token}/${file.file_path}`);
                } catch (e) { return await loadImage('https://i.imgur.com/8K9670n.png'); }
            }

            const groupImg = await getGroupImg(chatId);
            const canvas = createCanvas(900, 600);
            const ctx = canvas.getContext('2d');

            // ৩. ক্যানভাস ডিজাইন (রেড থিম - বিদায় জানানোর জন্য)
            ctx.fillStyle = '#1e1b4b'; // ডার্ক ব্লু/ইন্ডিগো ব্যাকগ্রাউন্ড
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // ছবি সার্কেল
            ctx.save();
            ctx.beginPath();
            ctx.arc(450, 120, 90, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(groupImg, 360, 30, 180, 180);
            ctx.restore();
            ctx.strokeStyle = '#ef4444'; // রেড বর্ডার
            ctx.lineWidth = 5;
            ctx.stroke();

            ctx.textAlign = 'center';
            ctx.font = 'bold 60px Arial';
            ctx.fillStyle = '#ef4444';
            ctx.fillText('GOODBYE', 450, 260);

            ctx.font = 'bold 40px Arial';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(leftUser.first_name.substring(0, 20), 450, 320);

            // স্ট্যাটাস বক্স
            const stats = [
                { label: "অবস্থা", val: "বিদায় নিয়েছেন", col: '#fca5a5' },
                { label: "বাকি মেম্বার", val: `${memberCount}`, col: '#3b82f6' },
                { label: "লিভ টাইম", val: `${period} ${timeStr}`, col: '#10b981' }
            ];

            stats.forEach((s, i) => {
                let x = 60 + (i * 270);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
                ctx.beginPath();
                if (ctx.roundRect) ctx.roundRect(x, 360, 240, 100, 15);
                else ctx.rect(x, 360, 240, 100);
                ctx.fill();
                ctx.strokeStyle = s.col;
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.font = 'bold 18px Arial';
                ctx.fillStyle = s.col;
                ctx.fillText(s.label, x + 120, 395);
                ctx.font = 'bold 20px Arial';
                ctx.fillStyle = '#ffffff';
                ctx.fillText(s.val, x + 120, 435);
            });

            ctx.textAlign = 'left';
            ctx.font = 'bold 20px Arial';
            ctx.fillStyle = '#f59e0b';
            ctx.fillText(`👑 Dev: ${ownerName}`, 60, 540);

            ctx.textAlign = 'right';
            ctx.font = 'bold 18px Arial';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.fillText("⚡ CSR-BOT SYSTEM ⚡", 840, 540);

            const buffer = canvas.toBuffer();

            // ৪. বিদায় ক্যাপশন
            const captionMsg = 
                `<b>┏━━━━━━━❰ GOODBYE ❱━━━━━━┓</b>\n\n` +
                `  <b>👋 বিদায়, ${leftUser.first_name} !</b>\n` +
                `  <i>আপনি আমাদের গ্রুপ থেকে বিদায় নিয়েছেন।</i>\n\n` +
                `  🏠 <b>গ্রুপ:</b> ${groupName}\n` +
                `  🔢 <b>বাকি মেম্বার:</b> ${memberCount}\n` +
                `  ⏰ <b>সময়:</b> ${period} ${timeStr}\n\n` +
                `  ✨ <i>আপনার ভবিষ্যৎ যাত্রা শুভ হোক।</i>\n\n` +
                `<b>┗━━━━━━━━━━━━━━━━━━━━━━┛</b>`;

            await bot.sendPhoto(chatId, buffer, {
                caption: captionMsg,
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [[{ text: "👑 Contact Developer", url: `tg://user?id=${ownerID}` }]]
                }
            });

        } catch (err) {
            console.error("Goodbye Error:", err);
        }
    }
};
