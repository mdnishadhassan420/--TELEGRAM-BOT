const axios = require("axios");

// গ্লোবাল স্টোরেজ
if (!global.activeReplies) global.activeReplies = {};
if (!global.cooldowns) global.cooldowns = {};

module.exports = {
    config: {
        name: "bot",
        author: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        version: "2.5.1",
        aliases: ["baby", "বট"], 
        category: "fun",
        description: "AI Chat - All Triggers Fixed, No Double Reply, All Greetings Restored.",
        prefix: false,
        role: 0,
        countDown: 5
    },

    run: async (bot, msg, args) => {
        const usermsg = args.join(" ");
        if (!usermsg) return await sendGreetingAndSetHandler(bot, msg);
        await handleAIChat(bot, msg, usermsg);
    },

    handleMessage: async (bot, msg) => {
        if (!msg.text || msg.from.is_bot) return;
        const text = msg.text.trim();
        const lowerText = text.toLowerCase();
        const triggerWords = ["bot", "বট", "baby"];

        // ১. Cooldown Check
        const now = Date.now();
        if (global.cooldowns[msg.from.id] && now < global.cooldowns[msg.from.id] + 5000) return;

        // ২. কন্টিনিউয়াস রিপ্লাই চেক
        if (msg.reply_to_message && global.activeReplies[msg.reply_to_message.message_id]) {
            global.cooldowns[msg.from.id] = now;
            return await handleAIChat(bot, msg, text);
        }

        // ৩. সব ট্রিগার চেক (bot, বট, baby)
        for (const word of triggerWords) {
            if (lowerText.startsWith(word + " ")) {
                const usermsg = text.substring(word.length + 1).trim();
                if (usermsg) {
                    global.cooldowns[msg.from.id] = now;
                    return await handleAIChat(bot, msg, usermsg);
                }
            }
        }
    }
};

// --- হেল্পার ফাংশনসমূহ ---

async function sendGreetingAndSetHandler(bot, msg) {
    const name = msg.from.first_name;
    // Admin লাইনটি রিমুভ করা হয়েছে
    const statusMsg = `<b>Hey ${name}</b>\n\n${getRandomGreeting()}`;

    const sentMessage = await bot.sendMessage(msg.chat.id, statusMsg, { 
        reply_to_message_id: msg.message_id,
        parse_mode: "HTML"
    });

    saveReply(sentMessage.message_id);
}

async function handleAIChat(bot, msg, usermsg) {
    try {
        await bot.sendChatAction(msg.chat.id, 'typing');
        const base = await axios.get("https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json");
        const apiUrl = base.data.sim;
        const response = await axios.get(`${apiUrl}/sim?type=ask&ask=${encodeURIComponent(usermsg)}&senderID=${msg.from.id}`);
        
        const replyText = response.data.data?.msg || "🤖 সরি জান, উত্তর দিতে পারছিনা।";
        const sentMessage = await bot.sendMessage(msg.chat.id, replyText, { 
            reply_to_message_id: msg.message_id 
        });

        saveReply(sentMessage.message_id);
    } catch (err) {
        console.log("API Error");
    }
}

function saveReply(messageId) {
    global.activeReplies[messageId] = true;
}

function getRandomGreeting() {
    // এখানে আপনার আগের সব মেসেজ লিস্ট আবার দিয়ে দেওয়া হলো
    const greetings = [
        "বেশি bot bot করলে চুম্মা দিয়া তোমার কিডনি ব্লক করে দেবো😒",
        "শুনবো না😼তুমি আমাকে প্রেম করাই দাও নাই🥺পচা তুমি🥺",
        "আমি আবাল দের সাথে কথা বলি না,ok😒",
        "দিনশেষে পরের Bow সুন্দর-☹",
        "আপনার সুন্দরী বান্ধুবীকে ফিতরা হিসেবে আমার বস মোহাম্মদ বাদল চৌধুরী কে দান করেন-🥱",
        "জান তুমি শুধু আমার আমি তোমারে ৩৬৫ দিন ভালোবাসি-💝🌺😽",
        "আমি এখন বস বাদল এর সাথে ব্যাস্ত, ডাকবেন না 😏",
        "তোমারে প্রচুর ভাল্লাগে–সময় মতো প্রপোজ করমু 😼",
        "দূরে যা, তোর কোনো কাজ নাই, শুধু bot bot করিস 🤣"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
}



