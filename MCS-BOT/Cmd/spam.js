/**
 * 💣 EMOJI SPAM COMMAND (CSR-BOT FINAL)
 * 👤 AUTHOR: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر
 * 📅 YEAR: 2026
 */

module.exports = {
  config: {
    name: "spam",
    aliases: ["spm"],
    credit: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر", 
    version: "1.0.0",
    cooldown: 5,               
    role: 2,                  // আপনার মেইন ফাইল অনুযায়ী ২ মানে শুধু আপনার জন্য
    prefix: true,
    description: "Long emoji spam for testing purposes.",
    category: "fun",
    guide: "{pn}"
  },

  // মেইন ফাইলের লজিক অনুযায়ী (bot, msg, args) সিরিয়াল ঠিক রাখা হয়েছে
  run: async function (bot, msg, args) {
    const chatId = msg.chat.id;

    try {
        // আপনার আগের লজিক অনুযায়ী ৩০ লাইনের ইমোজি স্প্যাম
        const emojis = Array(30).fill("💣").join("\n");

        // মেসেজ পাঠানো
        await bot.sendMessage(chatId, emojis);
        
    } catch (err) {
        console.error(`[SPAM ERROR]: ${err.message}`);
        bot.sendMessage(chatId, `❌ Error: ${err.message}`);
    }
  }
};

