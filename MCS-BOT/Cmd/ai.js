const axios = require("axios");

module.exports = {
    config: {
        name: "ai",
        aliases: ["gpt", "expert", "coder"],
        version: "2.3.0",
        permission: 0, 
        credits: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        description: "Professional AI (Strict Logic & Coding)",
        prefix: true,
        category: "AI & Tools",
        usages: "/ai [your question]",
        cooldowns: 5 
    },

    run: async function (bot, msg, args) {
        const { chat, from, message_id } = msg;
        const prompt = args.join(" ");
        const senderId = from.id;
        
        const ADMIN_ID = 6954597258; // Your ID
        const isAdmin = senderId === ADMIN_ID;

        if (!prompt) {
            return bot.sendMessage(chat.id, "💻 **System Ready.**\nআমি একজন প্রফেশনাল এআই। টেকনিক্যাল প্রশ্ন করুন।", { 
                reply_to_message_id: message_id,
                parse_mode: 'Markdown'
            });
        }

        if (prompt.toLowerCase() === "reset") {
            try {
                await axios.get(`https://nayan-ai-online.vercel.app/nayan/pai?number=${senderId}&type=reset`);
                return bot.sendMessage(chat.id, "♻️ **System Memory Formatted!**", { reply_to_message_id: message_id });
            } catch (e) {
                return bot.sendMessage(chat.id, "❌ Reset failed.", { reply_to_message_id: message_id });
            }
        }

        try {
            bot.sendChatAction(chat.id, 'typing');

            // কঠোর ইনস্ট্রাকশন যা ইউজারের মেসেজের শুরুতে যুক্ত হবে
            const strictSystemRole = "SYSTEM: You are a Professional Senior Software Engineer. You MUST NOT use romantic words like 'Janu', 'Baby', 'Love', or emojis like '😘', '💕'. You are formal and logical. Respond in professional Bengali or English.";
            
            const response = await axios.get("https://nayan-ai-online.vercel.app/nayan/pai", {
                params: { 
                    number: senderId, 
                    // Instruction এবং Question আলাদা করার জন্য লাইন ব্রেক ব্যবহার করা হয়েছে
                    question: `${strictSystemRole}\n\nUSER QUESTION: ${prompt}` 
                }
            });

            let answer = response.data.answer;

            // যদি AI এখনো "জানু" বা "Janu" শব্দ ব্যবহার করে, তবে তা অটো-ফিল্টার করার কোড:
            const forbiddenWords = ["জানু", "janu", "baby", "বাবু", "ভালোবাসি", "miss you"];
            const containsForbidden = forbiddenWords.some(word => answer.toLowerCase().includes(word));

            if (containsForbidden) {
                answer = "আমি দুঃখিত, আমি শুধুমাত্র প্রফেশনাল এবং টেকনিক্যাল প্রশ্নের উত্তর দিতে পারি। দয়া করে আপনার কোডিং বা লজিক্যাল প্রশ্নটি করুন।";
            }

            const header = isAdmin ? "⚡ **[Master Developer Access]**\n\n" : "🤖 **[Professional AI]**\n\n";
            const footer = `\n\n---
🛡️ **Credits:** ${this.config.credits}`;

            bot.sendMessage(chat.id, header + answer + footer, { 
                reply_to_message_id: message_id,
                parse_mode: 'Markdown' 
            });

        } catch (error) {
            bot.sendMessage(chat.id, "⚠️ এআই সার্ভার বর্তমানে রেসপন্স করছে না।", { reply_to_message_id: message_id });
        }
    }
};


