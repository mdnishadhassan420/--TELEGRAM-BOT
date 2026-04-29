const { createCanvas, loadImage } = require('canvas');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
    config: {
        name: "welcome",
        eventType: "new_chat_members", 
        author: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        description: "নতুন মেম্বার জয়েন করলে প্রিমিয়াম কার্ডসহ স্বাগতম জানাবে"
    },

    run: async (bot, msg) => {
        const chatId = msg.chat.id;
        const groupName = msg.chat.title || "Group";
        const newMembers = msg.new_chat_members;
        const ownerID = "6954597258"; 
        const ownerName = "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر";

        // ১. সময় ও তারিখ (বাংলাদেশ টাইমজোন)
        const now = new Date();
        const options = { timeZone: 'Asia/Dhaka' };
        const timeStr = now.toLocaleTimeString('en-US', { ...options, hour: '2-digit', minute: '2-digit', hour12: true });
        const dateStr = now.toLocaleDateString('en-GB', { ...options, day: '2-digit', month: '2-digit', year: 'numeric' });
        
        const hour = parseInt(now.toLocaleTimeString('en-GB', { ...options, hour: '2-digit', hour12: false }));
        let period = (hour >= 5 && hour < 12) ? "সকাল" : (hour >= 12 && hour < 15) ? "দুপুর" : (hour >= 15 && hour < 18) ? "বিকাল" : (hour >= 18 && hour < 20) ? "সন্ধ্যা" : "রাত";

        for (const user of newMembers) {
            // বট নিজেকে স্বাগতম জানানো থেকে বিরত রাখতে
            const botInfo = await bot.getMe();
            if (user.id === botInfo.id) continue;

            try {
                const memberCount = await bot.getChatMemberCount(chatId);
                const addedBy = msg.from ? msg.from.first_name : "System";

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

                // ৩. ক্যানভাস ডিজাইন
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // ছবি সার্কেল
                ctx.save();
                ctx.beginPath();
                ctx.arc(450, 120, 90, 0, Math.PI * 2);
                ctx.clip();
                ctx.drawImage(groupImg, 360, 30, 180, 180);
                ctx.restore();
                ctx.strokeStyle = '#3b82f6';
                ctx.lineWidth = 5;
                ctx.stroke();

                ctx.textAlign = 'center';
                ctx.font = 'bold 60px Arial';
                ctx.fillStyle = '#10b981';
                ctx.fillText('WELCOME', 450, 260);

                ctx.font = 'bold 40px Arial';
                ctx.fillStyle = '#ffffff';
                ctx.fillText(user.first_name.substring(0, 20), 450, 320);

                // স্ট্যাটাস বক্স
                const stats = [
                    { label: "অ্যাড করেছেন", val: addedBy.substring(0, 12), col: '#f59e0b' },
                    { label: "সদস্য সংখ্যা", val: `#${memberCount}`, col: '#3b82f6' },
                    { label: "সময়", val: `${period} ${timeStr}`, col: '#10b981' }
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
                ctx.fillText("⚡ MCS-BOT SYSTEM ⚡", 840, 540);

                const buffer = canvas.toBuffer();

                // ৪. ক্যাপশন মেসেজ
                const captionMsg = 
                    `<b>┏━━━━━━━❰ WELCOME ❱━━━━━━┓</b>\n\n` +
                    `  <b>🎉 স্বাগতম, <a href="tg://user?id=${user.id}">${user.first_name}</a> !</b>\n` +
                    `  <i>আমাদের গ্রুপে আপনাকে উষ্ণ অভ্যর্থনা।</i>\n\n` +
                    `  👤 <b>অ্যাড করেছেন:</b> ${addedBy}\n` +
                    `  🔢 <b>মেম্বার নম্বর:</b> ${memberCount}\n` +
                    `  🏠 <b>গ্রুপ:</b> ${groupName}\n` +
                    `  ⏰ <b>সময়:</b> ${period} ${timeStr}\n\n` +
                    `  ✨ <i>আশা করি গ্রুপের নিয়ম মেনে চলবেন।</i>\n\n` +
                    `<b>┗━━━━━━━━━━━━━━━━━━━━━━┛</b>`;

                await bot.sendPhoto(chatId, buffer, {
                    caption: captionMsg,
                    parse_mode: "HTML",
                    reply_markup: {
                        inline_keyboard: [[{ text: "👑 Contact Developer", url: `tg://user?id=${ownerID}` }]]
                    }
                });

                await delay(1000); 
            } catch (err) {
                console.error("Welcome Error:", err);
            }
        }
    }
};

