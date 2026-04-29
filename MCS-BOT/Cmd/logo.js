/**
 * 🤖 CSR-BOT COMMAND: LOGO TEXT EFFECTS (With Random Support)
 * 👤 AUTHOR: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر (Converted)
 * 📅 YEAR: 2026
 */

const axios = require("axios");

const availableTEMPLATES = {
    "1": "Multicolored Neon Light", "2": "Galaxy Style Free Name", "3": "3D Underwater Text Effect",
    "4": "Logo Viettel", "5": "Typography Text on Pavement", "6": "Lovely Cute 3D Pig Text",
    "7": "Green Neon Light Effect", "8": "Futuristic Light Text Effect", "9": "Graffiti Cover",
    "10": "Neon Devil Wings Text", "11": "Advanced Glow Effects", "12": "Dragon Ball Style Text",
    "13": "Blue Metal Text Effect", "14": "Modern Gold", "15": "Galaxy Tree Effect",
    "16": "Gold Letters Online", "17": "Metal Mascots Logo Maker", "18": "Plasma Text Effect",
    "19": "Handwritten Foggy Glass", "20": "Modern Gold 3", "21": "Metal Logo Online",
    "22": "Graffiti Lettering", "23": "Galaxy Write Effect", "24": "Graffiti Text 5",
    "25": "Road Paint Text", "26": "Chocolate Text", "27": "Naruto Shippuden Logo",
    "28": "Typography Art Layers", "29": "Write in Sand Beach", "30": "Green Brush Typography",
    "31": "Boom Comic Text", "32": "3D Crack Text", "33": "Paint Splatter Text",
    "34": "Digital Glitch Text", "35": "Dragon Steel Text", "36": "Graffiti Text 3",
    "37": "Zombie 3D Text", "38": "Matrix Text Effect", "39": "Galaxy Neon Light Text",
    "40": "3D Metal Text", "41": "Chalkboard Writing", "42": "Writing on Cakes",
    "43": "Wet Glass Text", "44": "Galaxy Angel Wings", "45": "Wooden 3D Text",
    "46": "3D Foil Balloon", "47": "Christmas Snow Text", "48": "Luxury Gold Text",
    "49": "Anonymous Hacker Avatar", "50": "Broken Glass Text", "51": "Blackpink Style Logo",
    "52": "Jean Fabric Text", "53": "Foggy Rainy Text", "54": "Birthday Foil Balloon",
    "55": "Stars Night Effect", "56": "Paper Cut Effect", "57": "Water Text",
    "58": "Unique Green Light Word", "59": "3D Beach Text", "60": "Chalkboard Writing 2",
    "61": "Dragon Fire Text", "62": "Underwater Text", "63": "Cake Text",
    "64": "Metallic Impressive Font", "65": "Eraser Deleting Text", "66": "Metal Text Online",
    "67": "Dance Text", "68": "Cloud Text in Sky", "69": "3D Water Text",
    "70": "Chrome Text Effect", "71": "Bokeh Text Effect", "72": "Incandescent Bulb Text",
    "73": "Metal Avatar Name", "74": "3D Hologram Text", "75": "Stars Night Online",
    "76": "Gold Text Effect", "77": "Purple Text Effect", "78": "Pixel Glitch Text",
    "79": "Dark Green Typography", "80": "Diamond Text", "81": "Blue Neon Logo",
    "82": "Neon Text Effect", "83": "Shadow Text", "84": "Galaxy Light Text",
    "85": "Titanium Text", "86": "Fabric Text Effect", "87": "Blackpink Logo 2",
    "88": "3D Text Effect", "89": "Magic Text Effect", "90": "Sand Beach Text",
    "91": "Neon Glitch Text", "92": "Cloth Text Effect", "93": "Message Coffee Text",
    "94": "Jewel Text Effect", "95": "Hot Metallic Effect", "96": "Typography Maker 5",
    "97": "Candy Text Effect", "98": "Galaxy Bat Write", "99": "Firework Text Effect",
    "100": "Graffiti Text Online"
};

module.exports = {
    config: {
        name: "logo",
        aliases: ["ephoto", "textstyle"],
        role: 0,
        cooldown: 8,
        prefix: true,
        credit: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        description: "বিভিন্ন স্টাইলে লোগো তৈরি করুন (আইডি না দিলে র‍্যান্ডম স্টাইল হবে)।"
    },

    run: async (bot, msg, args) => {
        const chatId = msg.chat.id;
        const messageId = msg.message_id;
        const prefix = global.CONFIG?.BOT_SETTINGS?.PREFIX || "/";

        const input = args.join(" ").trim();

        // ১. টেমপ্লেট লিস্ট
        if (input.toLowerCase() === "list") {
            let listMsg = "🎨 **𝐋𝐎𝐆𝐎 𝐌𝐀𝐊𝐄𝐑 𝐓𝐄𝐌𝐏𝐋𝐀𝐓𝐄𝐒 (1–100)**\n━━━━━━━━━━━━━━━━━━━━\n";
            for (const i in availableTEMPLATES) {
                listMsg += `🆔 \`${i}\` → ${availableTEMPLATES[i]}\n`;
            }
            listMsg += `\n━━━━━━━━━━━━━━━━━━━━\n💡 **ব্যবহার নিয়ম:**\n\`${prefix}logo <text> - <id>\` (নির্দিষ্ট আইডির জন্য)\n\`${prefix}logo <text>\` (র‍্যান্ডম আইডির জন্য)`;
            
            return bot.sendMessage(chatId, listMsg, { parse_mode: 'Markdown' });
        }

        // ২. ইনপুট হ্যান্ডলিং
        const parts = input.split("-");
        const text = parts[0]?.trim();
        let id = parseInt(parts[1]?.trim());

        // যদি টেক্সট না থাকে
        if (!text) {
            return bot.sendMessage(chatId, `⚠️ **ব্যবহার নিয়ম:**\n\`${prefix}logo <নাম>\` (র‍্যান্ডম স্টাইল)\n\`${prefix}logo <নাম> - <আইডি>\` (নির্দিষ্ট স্টাইল)\n\n💡 লিস্ট দেখতে: \`${prefix}logo list\``, { parse_mode: 'Markdown' });
        }

        // যদি আইডি না দেওয়া হয়, তবে র‍্যান্ডম আইডি সিলেক্ট হবে (১-১০০)
        let isRandom = false;
        if (!id || isNaN(id)) {
            id = Math.floor(Math.random() * 100) + 1;
            isRandom = true;
        }

        if (id < 1 || id > 100) {
            return bot.sendMessage(chatId, `❌ **ভুল আইডি!** ১ থেকে ১০০ এর মধ্যে আইডি দিন অথবা আইডি ছাড়াই নাম লিখুন।`);
        }

        const waitMsg = await bot.sendMessage(chatId, `🖌️ **"${text}"** দিয়ে লোগো তৈরি হচ্ছে... ${isRandom ? "(Random Style)" : ""}`, { parse_mode: 'Markdown' });

        try {
            const githubRawUrl = "https://raw.githubusercontent.com/Saim-x69x/sakura/main/ApiUrl.json";
            const apiRes = await axios.get(githubRawUrl);
            const baseUrl = apiRes.data.apiv1;

            const res = await axios.get(`${baseUrl}/api/ephoto?id=${id}&text=${encodeURIComponent(text)}`);

            if (!res.data?.status || !res.data.result_url) {
                throw new Error("API Failure");
            }

            await bot.sendPhoto(chatId, res.data.result_url, {
                caption: `✅ **𝐋𝐨𝐠𝐨 𝐃𝐞𝐬𝐢𝐠𝐧 𝐂𝐨𝐦𝐩𝐥𝐞𝐭𝐞!**\n\n✨ **Style:** ${availableTEMPLATES[id]}\n🆔 **ID:** ${id}\n🔤 **Text:** ${text}\n👤 **Created by:** ${module.exports.config.credit}`,
                reply_to_message_id: messageId,
                parse_mode: 'Markdown'
            });

            bot.deleteMessage(chatId, waitMsg.message_id).catch(() => {});

        } catch (e) {
            console.error("Logo Error:", e);
            bot.editMessageText("❌ সার্ভার ত্রুটি! পরে আবার চেষ্টা করুন।", {
                chat_id: chatId,
                message_id: waitMsg.message_id
            });
        }
    }
};


