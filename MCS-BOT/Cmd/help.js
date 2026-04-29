/**
 * 🤖 CSR-BOT HELP COMMAND (SELF-FIXED VERSION)
 * 🛠️ ফিক্সড: অন্য কোনো ফাইলে পরিবর্তন ছাড়াই কমান্ড লিস্ট দেখাবে।
 */

module.exports.config = {
  name: "help",
  version: "1.2.5",
  credits: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
  role: 0, 
  prefix: true, 
  description: "বটের সকল কমান্ডের তালিকা এবং বিস্তারিত ব্যবহারবিধি দেখুন।",
  category: "utility",
  usages: "help [pageNumber | commandName]",
  cooldown: 5,
};

module.exports.run = async (bot, msg, args) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;

    // ১. গ্লোবাল ডাটা এবং কনফিগারেশন
    const currentPrefix = (global.CONFIG && global.CONFIG.BOT_SETTINGS) ? global.CONFIG.BOT_SETTINGS.PREFIX : '/';
    const HELP_IMG = "https://drive.google.com/uc?export=download&id=1lf3TVYxwMsDZqByetetgtPf3mlBFcWMB";
    const developer = (global.CONFIG && global.CONFIG.OWNER) ? global.CONFIG.OWNER.NAME : "MOHAMMAD-BADOL";
    const botName = (global.CONFIG && global.CONFIG.BOT_SETTINGS) ? global.CONFIG.BOT_SETTINGS.NAME : "🧚‍⋆⃝ BADOL-BOT ⋆⃝🧚";

    // ২. কমান্ড লিস্ট তৈরি (সরাসরি global.COMMANDS থেকে)
    // এটি করলে loader.js ফাইলে কোনো পরিবর্তন করতে হবে না।
    const allCommands = Object.values(global.COMMANDS || {}); 
    const totalCommands = allCommands.length;

    // ৩. নির্দিষ্ট কমান্ডের বিস্তারিত চেক (help [commandName])
    if (args.length > 0 && isNaN(args[0])) {
        const input = args[0].toLowerCase();
        const cmd = global.COMMANDS[input] || global.COMMANDS[global.ALIASES[input]];

        if (cmd && cmd.config) {
            const { name, description, aliases, usages, role, credit, cooldown } = cmd.config;
            const aliasText = (aliases && Array.isArray(aliases)) ? aliases.join(", ") : "None";
            
            let permText = "Everyone 👥";
            if (role === 1) permText = "Group Admins 👮";
            if (role >= 2) permText = "Bot Owner 👑";

            const detailCaption = `╭──────❍ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝-𝐈𝐧𝐟𝐨 ❍──────╮
├‣ 📘 Command: ${currentPrefix}${name}
├‣ 📄 Description: ${description || "No description."}
├‣ ⚙️ Usage: \`${currentPrefix}${usages || name}\`
├‣ 🔁 Aliases: ${aliasText}
├‣ 🔑 Permission: ${permText}
├‣ ⏱️ Cooldown: ${cooldown || 3}s
├‣ ✿ Credits: ${credit || "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر"}
╰───────────────────────────⟡`;

            return bot.sendPhoto(chatId, HELP_IMG, { 
                caption: detailCaption, 
                parse_mode: "Markdown",
                reply_to_message_id: messageId 
            });
        } else {
            return bot.sendMessage(chatId, `❌ কমান্ড "${args[0]}" খুঁজে পাওয়া যায়নি!`, { reply_to_message_id: messageId });
        }
    }

    // ৪. কমান্ড লিস্ট এবং পেজিনেশন লজিক
    const commandsPerPage = 15;
    let page = parseInt(args[0]) || 1;
    const totalPages = Math.ceil(totalCommands / commandsPerPage) || 1;

    if (page > totalPages) page = totalPages;
    if (page <= 0) page = 1;

    const start = (page - 1) * commandsPerPage;
    const end = start + commandsPerPage;
    
    // কমান্ডের নামগুলো বর্ণানুক্রমিকভাবে সাজানো (A-Z)
    const sortedCommands = allCommands.sort((a, b) => a.config.name.localeCompare(b.config.name));
    const cmdListSlice = sortedCommands.slice(start, end);

    const listText = cmdListSlice
        .map((cmd, i) => `├‣ ${start + i + 1} ✿ ${currentPrefix}${cmd.config.name}`)
        .join("\n");

    const mainCaption = `╭──────❍ 𝐇𝐞𝐥𝐩-𝐌𝐞𝐧𝐮 ❍──────╮
┏━━━━━━━━━━━━━━━━━━━━━❥
${listText || "No commands loaded."}
┗━━━━━━━━━━━━━━━━━━━━━❥

𖦹🌿・┈ ★ ${botName} ★ ┈・🌿𖦹
┊│╭──────────────────────◈
┊││▸ ✿ Prefix: ${currentPrefix}
┊││▸ ✿ Page: ${page}/${totalPages}
┊││▸ ✿ Total Commands: ${totalCommands}
┊││▸ ✿ Developer: ${developer}
┊││▸ ✿ Status: ONLINE ⚡
┊│╰──────────────────────◈
╰───────────────────────────⟡

✨ Use: \`${currentPrefix}help [page|command]\` ✨`;

    return bot.sendPhoto(chatId, HELP_IMG, { 
        caption: mainCaption, 
        parse_mode: "Markdown",
        reply_to_message_id: messageId 
    });
};

