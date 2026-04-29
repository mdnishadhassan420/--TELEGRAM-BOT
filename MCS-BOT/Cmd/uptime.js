const { createCanvas, loadImage } = require("canvas");
const os = require("os");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports.config = {
    name: "up",
    credits: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
    aliases: ["uptime", "status"],
    prefix: true,
    permission: 0,
    description: "বটের বর্তমান অবস্থা এবং আপটাইম কার্ড দেখায়।",
    tags: ["utility", "tools"]
};

module.exports.run = async (bot, msg, args) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const startPing = Date.now();
    const botPrefix = "/"; // আপনার বটের ডিফল্ট প্রিক্স দিন

    // 🕒 সময় ও তারিখ ক্যালকুলেশন
    const now = new Date();
    const bdTimeStr = now.toLocaleString("en-US", { timeZone: "Asia/Dhaka", hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    const [timePart, ampm] = bdTimeStr.split(' ');
    
    const bdDay = now.toLocaleString("en-US", { timeZone: "Asia/Dhaka", weekday: 'long' });
    const bdDate = now.toLocaleString("en-US", { timeZone: "Asia/Dhaka", day: '2-digit', month: 'long', year: 'numeric' });

    function formatUptime() {
      let totalSeconds = Math.floor(process.uptime());
      const days = Math.floor(totalSeconds / 86400);
      totalSeconds %= 86400;
      const hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      const minutes = Math.floor(totalSeconds / 60);
      return `${days}d ${hours}h ${minutes}m`;
    }

    const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
    const usedRam = ((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(2);
    const ping = Date.now() - startPing;

    // 🎨 Canvas Setup
    const width = 900;
    const height = 650;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // 1. VIP Background
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#010813");
    grad.addColorStop(1, "#000000");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Main Border
    ctx.strokeStyle = "rgba(0, 242, 254, 0.5)";
    ctx.lineWidth = 4;
    drawRoundRect(ctx, 25, 25, 850, 600, 40, false, true);

    // 3. Avatar Box (বটের প্রোফাইল পিকচার)
    try {
      const botInfo = await bot.getMe();
      let avatarUrl = "https://i.imgur.com/6S79p99.png"; // ডিফল্ট ইমেজ
      const photos = await bot.getUserProfilePhotos(botInfo.id);
      if (photos.total_count > 0) {
        const fileId = photos.photos[0][0].file_id;
        const file = await bot.getFile(fileId);
        avatarUrl = `https://api.telegram.org/file/bot${bot.token}/${file.file_path}`;
      }
      const response = await axios.get(avatarUrl, { responseType: 'arraybuffer' });
      const avatar = await loadImage(Buffer.from(response.data));
      
      ctx.save();
      ctx.shadowBlur = 25;
      ctx.shadowColor = "#00f2fe";
      ctx.beginPath();
      ctx.arc(135, 125, 75, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(avatar, 60, 50, 150, 150);
      ctx.restore();
    } catch (e) {
      console.log("Avatar Load Error: ", e.message);
    }

    // 4. Header Info
    ctx.textAlign = "left";
    ctx.fillStyle = "#00f2fe";
    ctx.font = "bold 52px sans-serif";
    ctx.fillText("CSR-BOT", 240, 105);
    
    ctx.font = "bold 28px sans-serif";
    ctx.fillStyle = "#FFD700"; 
    const ownerName = "Owner: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر";
    ctx.fillText(ownerName, 240, 155);

    const ownerTextWidth = ctx.measureText(ownerName).width;
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText(` |  Prefix: [ ${botPrefix} ]`, 240 + ownerTextWidth + 10, 155);

    // 5. Info Boxes
    ctx.fillStyle = "rgba(0, 242, 254, 0.1)";
    drawRoundRect(ctx, 55, 240, 385, 150, 25, true, false);
    ctx.fillStyle = "#00f2fe";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("🕒 REAL-TIME (BD)", 85, 285);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 55px sans-serif";
    ctx.fillText(timePart, 85, 355);
    ctx.font = "bold 28px sans-serif";
    ctx.fillStyle = "#00f2fe";
    ctx.fillText(ampm, 355, 355);

    ctx.fillStyle = "rgba(255, 0, 114, 0.1)";
    drawRoundRect(ctx, 460, 240, 385, 150, 25, true, false);
    ctx.fillStyle = "#ff0072";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText("🚀 SYSTEM UPTIME", 490, 285);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 48px sans-serif";
    ctx.fillText(formatUptime(), 490, 355);

    // 6. Mini Stats
    const drawStat = (label, value, x, y, color) => {
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.font = "20px sans-serif";
      ctx.fillText(label, x, y);
      ctx.fillStyle = color || "#fff";
      ctx.font = "bold 28px sans-serif";
      ctx.fillText(value, x, y + 40);
    };

    drawStat("LATENCY", `${ping}ms`, 85, 470, "#00ffaa");
    drawStat("RAM USAGE", `${usedRam} / ${totalRam} GB`, 340, 470, "#00f2fe");
    drawStat("STATUS", "ONLINE ✅", 650, 470, "#ffcc00");

    // 7. Footer
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    drawRoundRect(ctx, 55, 540, 790, 65, 22, true, false);
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText(`📅 ${bdDay}, ${bdDate}  |  Dev: fb.com/B4D9L`, 450, 582);

    function drawRoundRect(ctx, x, y, width, height, radius, fill, stroke) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      if (fill) ctx.fill();
      if (stroke) ctx.stroke();
    }

    const imgPath = path.join(__dirname, `up_v8_${Date.now()}.png`);
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(imgPath, buffer);

    try {
      await bot.sendPhoto(chatId, fs.createReadStream(imgPath), {
        reply_to_message_id: messageId,
        caption: `🚀 **CSR-BOT ONLINE**\n\n👤 **Owner:** 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر\n⏳ **Uptime:** ${formatUptime()}\n📡 **Ping:** ${ping}ms`,
        parse_mode: "Markdown"
      });
    } catch (err) {
      bot.sendMessage(chatId, "❌ ইমেজ পাঠাতে সমস্যা হয়েছে।");
    } finally {
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }
};

