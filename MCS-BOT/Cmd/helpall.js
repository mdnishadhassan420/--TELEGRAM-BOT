/**
 * 🛠️ CLICKABLE COMMAND LIST HELP (FINAL FIXED)
 * 👤 AUTHOR: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر
 * 🆔 TELEGRAM ID: 6954597258
 */

module.exports = {
    config: {
        name: "helpall",
        version: "1.3.5",
        credit: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        role: 0,
        cooldown: 5,
        prefix: true,
        description: "বটের সকল কমান্ডের তালিকা ক্যাটাগরি অনুযায়ী দেখুন।",
        usage: "helpall [command]",
        category: "System",
        aliases: ["menuall", "cmdsall"]
    },

    run: async (bot, msg, args) => {
        const chatId = msg.chat.id;
        const senderId = msg.from.id;
        const prefix = (global.CONFIG && global.CONFIG.BOT_SETTINGS) ? global.CONFIG.BOT_SETTINGS.PREFIX : '/';
        const AUTHOR_ID = 6969889252;

        // সরাসরি global.COMMANDS থেকে ডাটা নেওয়া হচ্ছে যাতে ০ কমান্ড এরর না আসে
        const allCommands = Object.values(global.COMMANDS || {});

        if (!args[0]) {
            const categories = {};
            let visibleCount = 0;
            
            allCommands.forEach(cmd => {
                const conf = cmd.config || {};
                const cmdRole = conf.role ?? 0;
                
                // Role 2 ফিল্টার (Owner ছাড়া অন্য কেউ দেখবে না)
                if (cmdRole >= 2 && senderId !== AUTHOR_ID) return;
                
                visibleCount++;
                const cat = conf.category || "General";
                if (!categories[cat]) categories[cat] = [];
                categories[cat].push(`├‣ ${prefix}${conf.name}`);
            });

            let helpMsg = "🤖 **CSR-BOT COMMAND LIST**\n";
            helpMsg += "━━━━━━━━━━━━━━━━━━━━\n";
            helpMsg += `📊 **Total Commands:** \`${visibleCount}\`\n`;
            helpMsg += "━━━━━━━━━━━━━━━━━━━━\n";

            // ক্যাটাগরি অনুযায়ী সাজানো
            for (const cat in categories) {
                helpMsg += `\n📂 **${cat.toUpperCase()}**\n`;
                helpMsg += categories[cat].join("\n");
                helpMsg += "\n";
            }

            helpMsg += "\n━━━━━━━━━━━━━━━━━━━━\n";
            helpMsg += `👤 **Developer:** [𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر](tg://user?id=${AUTHOR_ID})\n`;
            helpMsg += `💡 বিস্তারিত: \`${prefix}help [কমান্ড]\``;

            return bot.sendMessage(chatId, helpMsg, { 
                parse_mode: "Markdown",
                reply_markup: {
                    inline_keyboard: [[{ text: "Contact Developer", url: `tg://user?id=${AUTHOR_ID}` }]]
                }
            });
        }

        // --- নির্দিষ্ট কমান্ডের ডিটেইল লজিক ---
        const cmdInput = args[0].toLowerCase().replace(prefix, "");
        const actualName = global.ALIASES[cmdInput] || cmdInput;
        const command = global.COMMANDS[actualName];

        if (!command) return bot.sendMessage(chatId, `❌ **'${cmdInput}'** কমান্ডটি খুঁজে পাওয়া যায়নি।`);

        const conf = command.config;
        let detail = `ℹ️ **DETAILS: ${conf.name.toUpperCase()}**\n`;
        detail += "━━━━━━━━━━━━━━━━━━━━\n";
        detail += `📄 **Info:** ${conf.description || 'No description'}\n`;
        detail += `⚙️ **Usage:** \`${prefix}${conf.usage || conf.name}\`\n`;
        detail += `⏱️ **Cooldown:** ${conf.cooldown || 3}s\n`;
        
        // রোল টেক্সট ফিক্সড
        let roleText = "Everyone 👥";
        if (conf.role === 1) roleText = "Group Admin Only 👮";
        if (conf.role >= 2) roleText = "Bot Owner Only 👑";
        
        detail += `🛡️ **Role:** ${roleText}\n`;
        detail += "━━━━━━━━━━━━━━━━━━━━\n";
        detail += `✿ **Credit:** ${conf.credit || '𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر'}`;

        return bot.sendMessage(chatId, detail, { parse_mode: "Markdown" });
    }
};


