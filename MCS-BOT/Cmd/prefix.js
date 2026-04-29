const { createCanvas, loadImage } = require("canvas");
const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');

// Path to your config file
const configPath = path.join(process.cwd(), 'MCS-Config', 'config.js');

module.exports = {
    config: {
        name: "prefix",
        version: "2.5.0", 
        credits: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        role: 0, // Anyone can view, only owner can change
        prefix: false, 
        description: "View (Canvas) or change the bot's command prefix.",
        category: "Utility",
        usage: "prefix [new prefix]",
        cooldown: 5,
    },

    run: async (bot, msg, args) => {
        const chatId = msg.chat.id;
        const messageId = msg.message_id;
        const senderID = msg.from.id;
        const AUTHOR_ID = 6969889252; 

        let currentConfig;
        try {
            if (require.cache[require.resolve(configPath)]) {
                delete require.cache[require.resolve(configPath)];
            }
            currentConfig = require(configPath);
        } catch (e) {
            return bot.sendMessage(chatId, `❌ **Error:** Config file missing!`, { reply_to_message_id: messageId });
        }

        const currentPrefix = currentConfig.BOT_SETTINGS.PREFIX || '/';

        // ==========================================
        // 1. CHANGE PREFIX LOGIC (If Args Provided)
        // ==========================================
        if (args.length > 0) {
            if (senderID !== AUTHOR_ID) { 
                 return bot.sendMessage(chatId, "⛔ **Access Denied!** Only 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر can change the prefix.");
            }
            
            const newPrefix = args[0].trim();
            if (newPrefix.length > 5) {
                 return bot.sendMessage(chatId, "⚠️ **Limit Exceeded!** Prefix must be within 5 characters.");
            }
            
            try {
                currentConfig.BOT_SETTINGS.PREFIX = newPrefix;
                const newContent = `module.exports = ${JSON.stringify(currentConfig, null, 4)};\n`;
                fs.writeFileSync(configPath, newContent, 'utf8');
                
                if (global.reloadConfig) global.reloadConfig();

                bot.sendAudio(chatId, "https://www.myinstants.com/media/sounds/discord-notification.mp3");

                let out = `⚙️ **「 PREFIX UPDATED 」**\n`;
                out += `━━━━━━━━━━━━━━━━━━━━\n`;
                out += `🔹 **Old Prefix:** \`${currentPrefix}\`\n`;
                out += `✅ **New Prefix:** \`${newPrefix}\`\n`;
                out += `━━━━━━━━━━━━━━━━━━━━\n`;
                out += `👤 **Updated By:** \`𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر\``;

                return bot.sendMessage(chatId, out, { parse_mode: 'Markdown' });

            } catch (error) {
                return bot.sendMessage(chatId, "❌ **Failed to save the new prefix.**");
            }
        } 
        
        // ==========================================
        // 2. VIEW PREFIX LOGIC (Canvas Generation)
        // ==========================================
        const width = 900;
        const height = 520;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");

        // Background
        const bg = ctx.createLinearGradient(0, 0, width, height);
        bg.addColorStop(0, "#050B2E");
        bg.addColorStop(1, "#000000");
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, width, height);

        // Border
        ctx.strokeStyle = "rgba(0,242,254,0.7)";
        ctx.lineWidth = 4;
        drawRoundRect(ctx, 25, 25, 850, 470, 40, false, true);

        // Avatar
        try {
            const botInfo = await bot.getMe();
            let avatarUrl = "https://i.imgur.com/6S79p99.png"; 
            const photos = await bot.getUserProfilePhotos(botInfo.id);
            if (photos.total_count > 0) {
                const fileId = photos.photos[0][0].file_id;
                const file = await bot.getFile(fileId);
                avatarUrl = `https://api.telegram.org/file/bot${bot.token}/${file.file_path}`;
            }
            const response = await axios.get(avatarUrl, { responseType: 'arraybuffer' });
            const avatar = await loadImage(Buffer.from(response.data));
            ctx.save();
            ctx.shadowBlur = 20; ctx.shadowColor = "#00f2fe";
            ctx.beginPath(); ctx.arc(130, 115, 65, 0, Math.PI * 2); ctx.clip();
            ctx.drawImage(avatar, 65, 50, 130, 130);
            ctx.restore();
        } catch (e) { console.log("Avatar error"); }

        // Text
        ctx.textAlign = "left";
        ctx.font = "bold 60px sans-serif"; ctx.fillStyle = "#00f2fe";
        ctx.fillText("CSR-BOT", 220, 135);

        ctx.textAlign = "center";
        ctx.font = "bold 34px sans-serif"; ctx.fillStyle = "#ffffff";
        ctx.fillText("Current Bot Prefix", width / 2, 230);
        
        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 65px sans-serif";
        ctx.fillText(`[ ${currentPrefix} ]`, width / 2, 305);

        ctx.font = "bold 30px sans-serif"; ctx.fillStyle = "#00ffaa";
        ctx.fillText(`System Version: 2.5.0`, width / 2, 375);

        ctx.font = "bold 32px sans-serif"; ctx.fillStyle = "#ff0072";
        ctx.fillText("Owner: MOHAMMAD-BADOL", width / 2, 435);

        ctx.font = "18px sans-serif"; ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.fillText("Premium Prefix System • Developed by Mohammad Badol", width / 2, 490);

        const imgPath = path.join(__dirname, `prefix_${Date.now()}.png`);
        fs.writeFileSync(imgPath, canvas.toBuffer("image/png"));

        try {
            await bot.sendPhoto(chatId, fs.createReadStream(imgPath), {
                caption: `✨ **BOT SETTINGS INFO** ✨\n━━━━━━━━━━━━━━━━━━━━\n📌 Current Prefix: \`${currentPrefix}\`\n💡 To Change: \`prefix <new>\`\n━━━━━━━━━━━━━━━━━━━━`,
                parse_mode: "Markdown",
                reply_to_message_id: messageId
            });
        } finally {
            if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        }

        function drawRoundRect(ctx, x, y, w, h, r, fill, stroke) {
            ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
            ctx.quadraticCurveTo(x + w, y, x + w, y + r); ctx.lineTo(x + w, y + h - r);
            ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h);
            ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r);
            ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
            if (fill) ctx.fill(); if (stroke) ctx.stroke();
        }
    }
};
