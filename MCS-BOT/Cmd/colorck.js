/**
 * 🤖 CSR-BOT COMMAND: COLOR CHECK
 * 👤 CREDIT: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر
 * 📅 YEAR: 2026
 * 🆔 TELEGRAM ID: 6969889252
 */

module.exports = {
    config: {
        name: "colorck",
        aliases: ["colerck", "checkcolor", "hex"],
        version: "1.0.0",
        credit: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر", // ক্রেডিট সিস্টেম
        role: 0,                   // সবার জন্য উন্মুক্ত
        cooldown: 5,               // ৫ সেকেন্ড কুলডাউন
        prefix: true,
        category: "utility",
        description: "HEX কালার চেক এবং RGB মান ও কাছাকাছি নাম দেখায়।",
        guide: "/colorck #ff5733"
    },

    run: async (bot, msg, args) => {
        const chatId = msg.chat.id;

        try {
            let input = args[0]; // আপনার লোডারে args আলাদা করা আছে

            // ইনপুট যাচাই (3 বা 6 digit HEX কোড)
            if (!input || !/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(input)) {
                return bot.sendMessage(chatId, 
                    "⚠️ সঠিক HEX কোড দিন, যেমন:\n<code>/colorck #ff5733</code>\nঅথবা সংক্ষিপ্ত: <code>/colorck #f53</code>", 
                    { parse_mode: "HTML", reply_to_message_id: msg.message_id }
                );
            }

            // # থাকলে সরাও
            input = input.replace("#", "");

            // যদি 3-digit HEX হয়, তাহলে 6-digit এ রূপান্তর
            if (input.length === 3) {
                input = input.split("").map(c => c + c).join("");
            }

            // আবার # যোগ করো ও ক্যাপিটালাইজ
            input = "#" + input.toUpperCase();

            // HEX থেকে RGB কনভার্ট
            function hexToRgb(hex) {
                hex = hex.replace("#", "");
                let bigint = parseInt(hex, 16);
                let r = (bigint >> 16) & 255;
                let g = (bigint >> 8) & 255;
                let b = bigint & 255;
                return { r, g, b };
            }

            // দুইটা RGB রঙের মধ্যে দূরত্ব (Euclidean distance)
            function colorDistance(c1, c2) {
                return Math.sqrt(
                    Math.pow(c1.r - c2.r, 2) +
                    Math.pow(c1.g - c2.g, 2) +
                    Math.pow(c1.b - c2.b, 2)
                );
            }

            // রঙের ডাটাবেজ
            let colorDatabase = [
                { name: "লাল", r: 255, g: 0, b: 0 },
                { name: "সবুজ", r: 0, g: 255, b: 0 },
                { name: "নীল", r: 0, g: 0, b: 255 },
                { name: "হলুদ", r: 255, g: 255, b: 0 },
                { name: "কমলা", r: 255, g: 165, b: 0 },
                { name: "গোলাপি", r: 255, g: 192, b: 203 },
                { name: "বেগুনি", r: 128, g: 0, b: 128 },
                { name: "সাদা", r: 255, g: 255, b: 255 },
                { name: "কালো", r: 0, g: 0, b: 0 },
                { name: "ধূসর", r: 128, g: 128, b: 128 },
                { name: "হালকা হলুদ", r: 255, g: 255, b: 134 },
                { name: "মেরুন", r: 128, g: 0, b: 0 },
                { name: "সাবুজ নীল", r: 0, g: 128, b: 128 },
                { name: "লাইট ব্লু", r: 173, g: 216, b: 230 },
                { name: "ডার্ক গ্রে", r: 64, g: 64, b: 64 },
                { name: "হালকা গোলাপি", r: 255, g: 182, b: 193 }
            ];

            // কাছাকাছি কালার খুঁজে বের করার ফাংশন
            function getNearestColorName(hex) {
                let inputRgb = hexToRgb(hex);
                let minDistance = Infinity;
                let nearestColor = "অজানা রঙ";

                for (let color of colorDatabase) {
                    let dist = colorDistance(inputRgb, color);
                    if (dist < minDistance) {
                        minDistance = dist;
                        nearestColor = color.name;
                    }
                }

                return { name: nearestColor, rgb: inputRgb };
            }

            let result = getNearestColorName(input);
            let rgb = result.rgb;
            let name = result.name;

            // কালার প্রিভিউ URL
            let previewUrl = "https://dummyimage.com/300x100/" + input.replace("#", "") + "/ffffff&text=" + encodeURIComponent(input);

            // টেক্সট মেসেজ ডিজাইন
            let text = `
╭━─━─━❮ 𝐂𝐨𝐥𝐨𝐫 𝐂𝐡𝐞𝐜𝐤 𝐑𝐞𝐬𝐮𝐥𝐭 ❯━─━─━╮
├‣ 🔹 HEX কোড: <code>${input}</code>
├‣ 🔹 RGB মান: <code>(${rgb.r}, ${rgb.g}, ${rgb.b})</code>
├‣ 🔹 কাছাকাছি নাম: <b>${name}</b>
╰━──━─━─━━──━─━─━─━❍

🛡️ 𝐂𝐫𝐞𝐝𝐢𝐭: ${module.exports.config.credit}`;

            // পাঠানো
            bot.sendPhoto(chatId, previewUrl, { 
                caption: text, 
                parse_mode: "HTML",
                reply_to_message_id: msg.message_id 
            });

        } catch (error) {
            console.error("COLORCK ERROR:", error.message);
            bot.sendMessage(chatId, "⚠️ কালার চেক করতে সমস্যা হয়েছে।");
        }
    }
};


