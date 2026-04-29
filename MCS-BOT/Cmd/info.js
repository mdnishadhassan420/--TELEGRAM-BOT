const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

module.exports.config = {
    name: "owner",
    credits: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
    aliases: ["info", "author", "admin"],
    version: "1.3.0",
    permission: 1, 
    prefix: true,
    description: "Detailed owner info with social links and contact buttons.",
    category: "info",
    usages: "/owner",
    cooldowns: 5
};

module.exports.run = async (bot, msg, args) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    
    const ownerInfo = {
        name: "6969889252",
        age: "20+ (Developer)",
        home: "DHAKA, BANGLADESH",
        city: "RAJSHAHI",
        job: "FULL STACK DEVELOPER",
        telegram: "@aurariyad",
        facebook: "nai",
        uid: "6969889252"
    };

    try {
        const width = 900;
        const height = 550;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = '#020202';
        ctx.fillRect(0, 0, width, height);
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.08)';
        for (let i = 0; i < width; i += 50) { ctx.strokeRect(i, 0, 1, height); }
        for (let i = 0; i < height; i += 50) { ctx.strokeRect(0, i, width, 1); }

        ctx.strokeStyle = '#00FFFF';
        ctx.lineWidth = 6;
        ctx.shadowColor = '#00FFFF';
        ctx.shadowBlur = 15;
        ctx.strokeRect(25, 25, width - 50, height - 50);

        try {
            const photos = await bot.getUserProfilePhotos(ownerInfo.uid);
            let ownerImage;
            if (photos.total_count > 0) {
                const file = await bot.getFile(photos.photos[0][0].file_id);
                const url = `https://api.telegram.org/file/bot${bot.token}/${file.file_path}`;
                ownerImage = await loadImage(url);
            } else {
                ownerImage = await loadImage('https://i.ibb.co/LzN6p6p/default-avatar.png');
            }

            ctx.save();
            ctx.beginPath();
            ctx.arc(170, 180, 100, 0, Math.PI * 2, true);
            ctx.clip();
            ctx.drawImage(ownerImage, 70, 80, 200, 200);
            ctx.restore();
            ctx.strokeStyle = '#00FFFF';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(170, 180, 105, 0, Math.PI * 2, true);
            ctx.stroke();
        } catch (e) { console.log("Image Load Error"); }

        ctx.shadowBlur = 10;
        ctx.fillStyle = '#00FFFF';
        ctx.textAlign = 'left';
        ctx.font = 'bold 45px Courier New';
        ctx.fillText('OWNER PROFILE', 320, 100);
        
        ctx.font = '22px Courier New';
        ctx.shadowBlur = 0;
        const infoX = 320;
        let startY = 170;
        
        const infoLines = [
            `NAME     : ${ownerInfo.name}`,
            `AGE      : ${ownerInfo.age}`,
            `JOB      : ${ownerInfo.job}`,
            `HOME     : ${ownerInfo.home}`,
            `CITY     : ${ownerInfo.city}`,
            `TELEGRAM : ${ownerInfo.telegram}`,
            `FACEBOOK : ${ownerInfo.facebook}`
        ];

        infoLines.forEach(line => {
            ctx.fillText(`> ${line}`, infoX, startY);
            startY += 45;
        });

        ctx.fillStyle = '#00FFFF';
        ctx.fillRect(320, 480, 500, 3);
        ctx.font = 'italic 18px Courier New';
        ctx.textAlign = 'right';
        ctx.fillText('System Secure: MCS-BOT HIGH-LEVEL', 850, 520);

        const buffer = canvas.toBuffer('image/png');

        const inline_keyboard = {
            inline_keyboard: [
                [
                    { text: "💬 Telegram", url: `https://t.me/${ownerInfo.telegram.replace('@','')}` },
                    { text: "👤 Facebook", url: `https://${ownerInfo.facebook}` }
                ]
            ]
        };

        await bot.sendPhoto(chatId, buffer, { 
            caption: `⚡ **${ownerInfo.name} - Official Profile**`,
            reply_to_message_id: messageId,
            parse_mode: 'Markdown',
            reply_markup: inline_keyboard
        });

        const textMsg = `
👤 **OWNER DETAILS**
━━━━━━━━━━━━━━━━━━
**Name:** ${ownerInfo.name}
**Age:** ${ownerInfo.age}
**Job:** ${ownerInfo.job}
**Home:** ${ownerInfo.home}
**City:** ${ownerInfo.city}

🌐 **SOCIAL LINKS**
━━━━━━━━━━━━━━━━━━
**Telegram:** [${ownerInfo.telegram}](https://t.me/${ownerInfo.telegram.replace('@','')})
**Facebook:** [Contact Me](https://${ownerInfo.facebook})
**User ID:** \`${ownerInfo.uid}\`
        `;

        await bot.sendMessage(chatId, textMsg, {
            parse_mode: 'Markdown',
            disable_web_page_preview: true,
            reply_markup: inline_keyboard
        });

    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, "❌ তথ্য লোড করতে সমস্যা হয়েছে।");
    }
};



