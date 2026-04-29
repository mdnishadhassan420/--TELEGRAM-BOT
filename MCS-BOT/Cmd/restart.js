const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage, registerFont } = require('canvas');

module.exports.config = {
    name: "restart",
    credits: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
    aliases: ["resed"],
    version: "1.6.0",
    permission: 2, 
    prefix: true,
    description: "Premium Hacker UI Restart.",
    category: "system",
    usages: "/restart",
    cooldowns: 5,
    msg: {
        starting: "🔄 রিস্টার্ট প্রসেস শুরু হচ্ছে...",
        success: "✅ **বট সফলভাবে রিস্টার্ট হয়েছে!**",
        timeTaken: "⏱ সময় লেগেছে: ",
        error: "❌ রিস্টার্ট ব্যর্থ হয়েছে।"
    }
};

module.exports.run = async (bot, msg, args) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const config = module.exports.config;

    if (msg.from.id !== 6954597258) {
        return bot.sendMessage(chatId, "❌ শুধুমাত্র মালিক এই কমান্ডটি ব্যবহার করতে পারবে।");
    }

    try {
        const width = 800;
        const height = 450;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        // ১. ডার্ক ব্যাকগ্রাউন্ড উইথ গ্রিড
        ctx.fillStyle = '#020202';
        ctx.fillRect(0, 0, width, height);
        
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.05)';
        for (let i = 0; i < width; i += 40) { ctx.strokeRect(i, 0, 1, height); }
        for (let i = 0; i < height; i += 40) { ctx.strokeRect(0, i, width, 1); }

        // ২. সায়ান নিয়ন বর্ডার
        ctx.strokeStyle = '#00FFFF';
        ctx.lineWidth = 5;
        ctx.shadowColor = '#00FFFF';
        ctx.shadowBlur = 15;
        ctx.strokeRect(30, 30, width - 60, height - 60);

        // ৩. বট প্রোফাইল পিকচার (লোগো)
        try {
            const botInfo = await bot.getMe();
            const photos = await bot.getUserProfilePhotos(botInfo.id);
            let botImage;
            
            if (photos.total_count > 0) {
                const file = await bot.getFile(photos.photos[0][0].file_id);
                const url = `https://api.telegram.org/file/bot${bot.token}/${file.file_path}`;
                botImage = await loadImage(url);
            } else {
                // লোগো না থাকলে ডিফল্ট রোবট আইকন (যদি থাকে)
                botImage = await loadImage('https://cdn-icons-png.flaticon.com/512/4712/4712035.png');
            }

            // গোল করে ইমেজ ড্র করা
            ctx.save();
            ctx.beginPath();
            ctx.arc(150, 150, 70, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(botImage, 80, 80, 140, 140);
            ctx.restore();
            
            // ইমেজের চারদিকে রিং
            ctx.strokeStyle = '#00FFFF';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(150, 150, 75, 0, Math.PI * 2, true);
            ctx.stroke();
        } catch (e) { console.log("Logo Load Error"); }

        // ৪. বটের নাম ও স্ট্যাটাস
        ctx.shadowBlur = 10;
        ctx.textAlign = 'left';
        ctx.fillStyle = '#00FFFF';
        ctx.font = 'bold 50px Courier New';
        ctx.fillText('CSR-BOT', 250, 130);
        
        ctx.font = '20px Courier New';
        ctx.fillText('━━━━━━━━━━━━━━━━━━━━━━━━━━', 250, 160);

        // ৫. ওনার ইনফরমেশন (ID এর বদলে নাম)
        ctx.shadowBlur = 0;
        ctx.font = '22px Courier New';
        ctx.fillText(`> PREFIX     : ${global.CONFIG.BOT_SETTINGS.PREFIX || '/'}`, 250, 200);
        ctx.fillText(`> OWNER NAME : MOHAMMAD BADOL`, 250, 240);
        ctx.fillText(`> STATUS     : REBOOTING SYSTEM...`, 250, 280);
        ctx.fillText(`> AUTH       : GRANTED (LEVEL 2)`, 250, 320);

        // ৬. প্রগ্রেস বার
        ctx.strokeStyle = '#00FFFF';
        ctx.strokeRect(100, 370, 600, 20);
        ctx.fillStyle = '#00FFFF';
        ctx.shadowBlur = 10;
        ctx.fillRect(105, 375, 500, 10); // লোডিং

        const buffer = canvas.toBuffer('image/png');
        
        const sentMsg = await bot.sendPhoto(chatId, buffer, { 
            caption: config.msg.starting,
            reply_to_message_id: messageId 
        });

        // ডাটা সেভ
        const restartData = {
            chatId: chatId,
            messageId: sentMsg.message_id,
            time: Date.now()
        };
        
        const jsonPath = path.join(__dirname, 'BADOL', 'restart.json');
        fs.writeFileSync(jsonPath, JSON.stringify(restartData, null, 2));

        setTimeout(() => { process.exit(1); }, 2000); 

    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, config.msg.error);
    }
};

