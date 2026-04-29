/**
 * 🤖 CSR-BOT COMMAND: IFTAR & SEHRI TIMING
 * 👤 AUTHOR: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر (Converted for CSR-BOT by Gemini)
 * 📝 DESCRIPTION: Real-time Ramadan timings with dynamic image generation.
 */

const axios = require("axios");

module.exports = {
    config: {
        name: "iftar",
        aliases: ["ifter", "roja", "sehri"],
        role: 0,        // সবার জন্য উন্মুক্ত
        cooldown: 5,    // ৫ সেকেন্ড কুলডাউন
        prefix: true,   // প্রিফিক্স প্রয়োজন (আপনি চাইলে false করতে পারেন)
        credit: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        description: "Fixed Premium Ramadan Interface with timings and countdown.",
        usage: "[city] --c [color]"
    },

    run: async function (bot, msg, args) {
        const chatId = msg.chat.id;
        const messageId = msg.message_id;

        // --- সেটিংস ---
        let city = args[0] || "Dhaka";
        let color = args.includes("--c")
            ? args[args.indexOf("--c") + 1]
            : "white";

        const diptoApi = "https://api.noobs-api.rf.gd/dipto";
        let url = `${diptoApi}/ifter?city=${encodeURIComponent(city)}&color=${encodeURIComponent(color)}`;

        // --- ফন্ট স্টাইলিস্ট (Bold Serif) ---
        const boldSerif = (text) => {
            const letters = {
                'A':'𝐀','B':'𝐁','C':'𝐂','D':'𝐃','E':'𝐄','F':'𝐅','G':'𝐆','H':'𝐇','I':'𝐈','J':'𝐉','K':'𝐊','L':'𝐋','M':'𝐌','N':'𝐍','O':'𝐎','P':'𝐏','Q':'𝐐','R':'𝐑','S':'𝐒','T':'𝐓','U':'𝐔','V':'𝐕','W':'𝐖','X':'𝐗','Y':'𝐘','Z':'𝐙',
                'a':'𝐚','b':'𝐛','c':'𝐜','d':'𝐝','e':'𝐞','f':'𝐟','g':'𝐠','h':'𝐡','i':'𝐢','j':'𝐣','k':'𝐤','l':'𝐥','m':'𝐦','n':'𝐧','o':'𝐨','p':'𝐩','q':'𝐪','r':'𝐫','s':'𝐬','t':'𝐭','u':'𝐮','v':'𝐯','w':'𝐰','x':'𝐱','y':'𝐲','z':'𝐳'
            };
            return text.split('').map(char => letters[char] || char).join('');
        };

        try {
            // ইউজারকে একটি ওয়েটিং মেসেজ দেখানো (ঐচ্ছিক)
            const waitMsg = await bot.sendMessage(chatId, "🔍 Fetching Ramadan timings...", { reply_to_message_id: messageId });

            let { data } = await axios.get(url);

            if (!data.today) {
                return bot.editMessageText("⚠️ Invalid city name! Please try again.", {
                    chat_id: chatId,
                    message_id: waitMsg.message_id
                });
            }

            let msgText = 
`🌙 ${boldSerif("Ramadan Kareem")}
◈━━━━━━━━━━━━━━━◈

📍 ${boldSerif("CITY")}: ${data.city.toUpperCase()}

｢ ${boldSerif("TODAY'S TIMING")} ｣
🌅 ${boldSerif("Sehri Ends")} : ${data.today.sehri}
🕌 ${boldSerif("Fajr Time")}  : ${data.today.fajr}
🌆 ${boldSerif("Iftar Time")} : ${data.today.iftar}

⏳ ${boldSerif("REMAINING TIME")}
◽ ${boldSerif("Sehri")}: ${data.sahriRemain}
◽ ${boldSerif("Iftar")}: ${data.iftarRemain}

📅 ${boldSerif("TOMORROW PLAN")}
» ${boldSerif("Sehri")}: ${data.tomorrow.sehri}
» ${boldSerif("Iftar")}: ${data.tomorrow.iftar}
» ${boldSerif("Date")}: ${data.tomorrowDate}

⏰ ${boldSerif("Current Time")}: ${data.currentTime}
◈━━━━━━━━━━━━━━━◈
🤲 ${boldSerif("DUA (IFTAR)")}
"Allahumma laka sumtu wa ala rizqika aftartu."
👤 ${boldSerif("Credit")}: ${this.config.credit}`;

            // ইমেজ পাঠানো
            await bot.sendPhoto(chatId, data.imgUrl, {
                caption: msgText,
                parse_mode: 'Markdown',
                reply_to_message_id: messageId
            });

            // ওয়েটিং মেসেজটি ডিলিট করে দেওয়া
            bot.deleteMessage(chatId, waitMsg.message_id).catch(() => {});

        } catch (e) {
            console.error(e);
            bot.sendMessage(chatId, "❌ Connection failed! API is not responding.", { reply_to_message_id: messageId });
        }
    }
};



