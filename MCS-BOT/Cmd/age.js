/**
 * 🤖 CSR-BOT COMMAND: AGE CALCULATOR (COMPLETE DETAILS)
 * 👤 AUTHOR: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر
 * 📅 YEAR: 2026
 */

module.exports = {
    config: {
        name: "age",
        aliases: ["myage"],
        description: "Calculate exact age with hours, minutes and seconds",
        usage: "/age DD-MM-YYYY",
        role: 0,
        cooldown: 5,
        prefix: true,
        credit: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر" 
    },

    run: async (bot, msg, args) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;

        let input = args.join(" ");

        if (!input) {
            return bot.sendMessage(
                chatId,
                "⚠️ **আপনার জন্মতারিখ দিন!**\n━━━━━━━━━━━━━━━━━━━━\n💡 **উদাহরণ:** `/age 06-01-1998`",
                { parse_mode: "Markdown" }
            );
        }

        let parts = input.trim().split(/[-\/.]/);
        if (parts.length !== 3) {
            return bot.sendMessage(chatId, "❌ **ভুল ফরম্যাট!** তারিখ দিন: `DD-MM-YYYY`", { parse_mode: "Markdown" });
        }

        let d = parseInt(parts[0], 10);
        let m = parseInt(parts[1], 10);
        let y = parseInt(parts[2], 10);

        let birthDate = new Date(y, m - 1, d);
        let now = new Date();

        if (isNaN(birthDate.getTime()) || birthDate > now) {
            return bot.sendMessage(chatId, "❌ **সঠিক জন্মতারিখ দিন!** (ভবিষ্যতের তারিখ গ্রহণযোগ্য নয়)");
        }

        // --- বয়স ক্যালকুলেশন (বছর, মাস, দিন) ---
        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let days = now.getDate() - birthDate.getDate();

        if (days < 0) {
            let lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += lastMonth.getDate();
            months--;
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        // --- ডিটেইলড ক্যালকুলেশন ---
        let diffMs = now - birthDate;
        let totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        let totalHours = Math.floor(diffMs / (1000 * 60 * 60));
        let totalMinutes = Math.floor(diffMs / (1000 * 60));
        let totalSeconds = Math.floor(diffMs / 1000);

        // --- পরবর্তী জন্মদিন ক্যালকুলেশন ---
        let nextBD = new Date(now.getFullYear(), m - 1, d);
        if (now > nextBD) nextBD.setFullYear(now.getFullYear() + 1);
        let diffNextBD = nextBD - now;
        let leftDays = Math.floor(diffNextBD / (1000 * 60 * 60 * 24));
        let leftHours = Math.floor((diffNextBD % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let leftMinutes = Math.floor((diffNextBD % (1000 * 60 * 60)) / (1000 * 60));

        const weekdays = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
        const monthsBangla = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];

        let caption = `🎉 **আপনার বয়সের বিস্তারিত তথ্য**\n`;
        caption += `━━━━━━━━━━━━━━━━━━━━\n`;
        caption += `👤 **ইউজার:** ${msg.from.first_name}\n`;
        caption += `🎂 **জন্ম তারিখ:** ${d} ${monthsBangla[m-1]} ${y}\n`;
        caption += `━━━━━━━━━━━━━━━━━━━━\n\n`;
        
        caption += `📌 **বর্তমান বয়স:**\n`;
        caption += `┗ **${years} বছর, ${months} মাস, ${days} দিন**\n\n`;

        caption += `⏳ **পরবর্তী জন্মদিন:**\n`;
        caption += `┗ ${nextBD.getDate()} ${monthsBangla[nextBD.getMonth()]} (${weekdays[nextBD.getDay()]})\n`;
        caption += `┗ বাকি: **${leftDays} দিন, ${leftHours} ঘণ্টা, ${leftMinutes} মিনিট**\n\n`;

        caption += `📊 **মোট অতিক্রান্ত সময়:**\n`;
        caption += `┗ মোট দিন: ${totalDays.toLocaleString()}\n`;
        caption += `┗ মোট ঘণ্টা: ${totalHours.toLocaleString()}\n`;
        caption += `┗ মোট মিনিট: ${totalMinutes.toLocaleString()}\n`;
        caption += `┗ মোট সেকেন্ড: ${totalSeconds.toLocaleString()}\n`;
        
        caption += `━━━━━━━━━━━━━━━━━━━━\n`;
        caption += `🛡️ **Credit:** ${module.exports.config.credit}`;

        try {
            let photos = await bot.getUserProfilePhotos(userId, { limit: 1 });
            if (photos.total_count > 0) {
                return bot.sendPhoto(chatId, photos.photos[0][0].file_id, { caption, parse_mode: "Markdown" });
            }
            return bot.sendMessage(chatId, caption, { parse_mode: "Markdown" });
        } catch (err) {
            return bot.sendMessage(chatId, caption, { parse_mode: "Markdown" });
        }
    }
};


