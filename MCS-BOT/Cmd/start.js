const moment = require('moment-timezone');

function getBanglaDateTimeInfo() {
    const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" });
    const dateObj = new Date(now);

    const dayNames = ["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার","শুক্রবার","শনিবার"];
    const monthNames = ["জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"];

    let hour = dateObj.getHours();
    let minute = dateObj.getMinutes().toString().padStart(2,"0");
    let ampm = hour >= 12 ? "PM" : "AM";

    let period = "";
    if(hour>=5 && hour<12) period="সকাল";
    else if(hour>=12 && hour<16) period="দুপুর";
    else if(hour>=16 && hour<19) period="বিকেল";
    else period="রাত";

    let displayHour = hour % 12 || 12;
    let timeText = `${period} ${displayHour}:${minute} ${ampm}`;
    let dayName = dayNames[dateObj.getDay()];
    let day = dateObj.getDate();
    let month = monthNames[dateObj.getMonth()];
    let year = dateObj.getFullYear();
    
    return `আজকে ${dayName}, ${timeText}, ${day}ই ${month} ${year}`;
}

module.exports = {
    config: {
        name: "start",
        version: "2.0.0",
        author: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        countDown: 5,
        role: 0,
        description: "CSR বটের মেইন মেনু এবং ইউজার রিপোর্ট",
        category: "System",
        guide: "{pn}",
        prefix: true
    },

    run: async (bot, msg, args) => {
        const { chat, from, message_id } = msg;
        const ADMIN_ID = 6969889252; // আপনার টেলিগ্রাম আইডি

        try {
            if (!from) return;

            const id = from.id;
            const full_name = ((from.first_name || "") + " " + (from.last_name || "")).trim();
            const username = from.username ? "@" + from.username : "(নেই)";
            const chat_title = chat.title || "Private Chat";
            const used_time = getBanglaDateTimeInfo();

            // --- প্রোফাইল ফটো নেওয়া ---
            let profilePhotos;
            try { 
                profilePhotos = await bot.getUserProfilePhotos(id, { limit: 1 }); 
            } catch { 
                profilePhotos = { total_count: 0, photos: [] }; 
            }

            const infoText = 
`👤 <b>নতুন ইউজার রিপোর্ট (CSR BOT):</b>

🪪 <b>নাম:</b> ${full_name}
🔗 <b>ইউজারনেম:</b> ${username}
🆔 <b>আইডি:</b> <code>${id}</code>
💬 <b>চ্যাট:</b> ${chat_title}
🕰️ <b>সময়:</b> ${used_time}`;

            // --- এডমিনকে রিপোর্ট পাঠানো ---
            if (profilePhotos.total_count > 0) {
                const photo = profilePhotos.photos[0][0].file_id;
                await bot.sendPhoto(ADMIN_ID, photo, { caption: infoText, parse_mode: "HTML" });
            } else {
                await bot.sendMessage(ADMIN_ID, infoText + "\n\n⚠️ কোনো ছবি নেই।", { parse_mode: "HTML" });
            }

            // --- ইউজারকে ওয়েলকাম মেসেজ + বাটন ---
            const botInfo = await bot.getMe();
            const botUsername = botInfo.username;
            
            const welcomeMessage = `স্বাগতম, <b>${from.first_name}</b>! 👋\n\nআমি MCS BOT। আমাকে আপনার গ্রুপে যোগ করে সব সুবিধা উপভোগ করুন।\n\n🤖 বট এর কমান্ড দেখতে টাইপ করুন /help `;

            const buttons = {
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "🔴 Add to Group", url: `https://t.me/${botUsername}?startgroup=true` },
                            { text: "🔵 Add to Channel", url: `https://t.me/${botUsername}?startchannel=true` }
                        ],
                        [{ text: "📩 CSR-SUPPORT-BOT✅", url: "https://t.me/csrsupporter_bot" }],
                        [{ text: "📩 MAIN CHANEL✅", url: "https://t.me/techmatrix360" }],
                        [{ text: "📩 CSR-BOT-GC✅", url: "https://t.me/botgccsr" }]
                    ]
                }
            };

            // ইউজারকে রিপ্লাই (ছবি থাকলে ছবিসহ, না থাকলে টেক্সট)
            if (profilePhotos.total_count > 0) {
                await bot.sendPhoto(chat.id, profilePhotos.photos[0][0].file_id, {
                    caption: welcomeMessage,
                    ...buttons
                });
            } else {
                await bot.sendMessage(chat.id, welcomeMessage, buttons);
            }

        } catch (err) {
            console.error("Error in start command:", err);
        }
    }
};


