/**
 * 📶 SIM & WALLET INFO COMMAND (FULL FIXED)
 * 👤 AUTHOR: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر
 * 📅 YEAR: 2026
 */

// গ্লোবাল ডেটা যাতে বার বার মেমোরি নষ্ট না হয়
global.sbData = global.sbData || {
    sim: {
        gp: { name: "Grameenphone", color: "💚", check: { number: "*2#", balance: "*566#", minute: "*121*1*2#", internet: "*121*1*4#", offer: "*121*1*6#", customer: "121" }, expanded: false },
        robi: { name: "Robi", color: "🟠", check: { number: "*140*2*4#", balance: "*222#", minute: "*222*3#", internet: "*8444*88#", offer: "*999#", customer: "123" }, expanded: false },
        airtel: { name: "Airtel", color: "🔵", check: { number: "*121*7*3#", balance: "*778#", minute: "*778*2#", internet: "*778*3#", offer: "*444#", customer: "786" }, expanded: false },
        bl: { name: "Banglalink", color: "🟡", check: { number: "*511#", balance: "*124#", minute: "*124*2#", internet: "*5000#", offer: "*121#", customer: "121" }, expanded: false },
        teletalk: { name: "Teletalk", color: "🔴", check: { number: "*551#", balance: "*152#", minute: "*152#", internet: "*152#", offer: "*111#", customer: "121" }, expanded: false }
    },
    wallet: {
        bkash: { name: "bKash", color: "💚", info: { balance: "*247#", cash_in: "*247*2#", cash_out: "*247*3#", statement: "*247*4#", customer: "16247" }, expanded: false },
        nagad: { name: "Nagad", color: "🟠", info: { balance: "*167#", cash_in: "*167*2#", cash_out: "*167*3#", statement: "*167*4#", customer: "16167" }, expanded: false },
        rocket: { name: "Rocket", color: "🔵", info: { balance: "*322#", cash_in: "*322*2#", cash_out: "*322*3#", statement: "*322*4#", customer: "16221" }, expanded: false }
    }
};

module.exports = {
  config: {
    name: "sb",
    version: "2.5.0",
    credit: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
    cooldown: 5,
    role: 0, 
    prefix: true,
    description: "বাংলাদেশি সিম এবং মোবাইল ওয়ালেট কোড তথ্য",
    category: "utility",
    guide: "{pn}"
  },

  run: async function (bot, msg, args) {
    const chatId = msg.chat.id;

    // কলব্যাক লিসেনার হ্যান্ডলার
    if (!global.sbCallbackSet) {
        bot.on("callback_query", async (cb) => {
            const data = cb.data;
            const msgId = cb.message.message_id;
            const cId = cb.message.chat.id;

            try {
                if (data === "show_sim") {
                    await bot.editMessageText(getSimText(), { chat_id: cId, message_id: msgId, parse_mode: "Markdown", ...getSimKeyboard() });
                } 
                else if (data === "show_wallet") {
                    await bot.editMessageText(getWalletText(), { chat_id: cId, message_id: msgId, parse_mode: "Markdown", ...getWalletKeyboard() });
                } 
                else if (data === "back_main") {
                    await bot.editMessageText("📘 **নিচের অপশন থেকে একটি নির্বাচন করুন:**", { chat_id: cId, message_id: msgId, parse_mode: "Markdown", ...mainMenu() });
                } 
                else if (data.startsWith("sim_")) {
                    const key = data.replace("sim_", "");
                    global.sbData.sim[key].expanded = !global.sbData.sim[key].expanded;
                    await bot.editMessageText(getSimText(), { chat_id: cId, message_id: msgId, parse_mode: "Markdown", ...getSimKeyboard() });
                } 
                else if (data.startsWith("wallet_")) {
                    const key = data.replace("wallet_", "");
                    global.sbData.wallet[key].expanded = !global.sbData.wallet[key].expanded;
                    await bot.editMessageText(getWalletText(), { chat_id: cId, message_id: msgId, parse_mode: "Markdown", ...getWalletKeyboard() });
                }
                bot.answerCallbackQuery(cb.id).catch(() => {});
            } catch (e) { console.log(e); }
        });
        global.sbCallbackSet = true;
    }

    return bot.sendMessage(chatId, "📘 **নিচের অপশন থেকে একটি নির্বাচন করুন:**", { parse_mode: "Markdown", ...mainMenu() });
  }
};

// --- হেল্পার ফাংশন ---

function mainMenu() {
    return {
        reply_markup: {
            inline_keyboard: [
                [{ text: "📶 SIM Information", callback_data: "show_sim" }],
                [{ text: "💰 Wallet Information", callback_data: "show_wallet" }]
            ]
        }
    };
}

function getSimText() {
    let text = "🇧🇩 **বাংলাদেশের SIM তথ্য**\n\n";
    for (let key in global.sbData.sim) {
        const sim = global.sbData.sim[key];
        text += `${sim.color} **${sim.name}**\n`;
        if (sim.expanded) {
            text += `📱 নম্বর: \`${sim.check.number}\` | 💰 ব্যালেন্স: \`${sim.check.balance}\`\n🕐 মিনিট: \`${sim.check.minute}\` | 🌐 নেট: \`${sim.check.internet}\`\n🎁 অফার: \`${sim.check.offer}\` | ☎️ কেয়ার: \`${sim.check.customer}\`\n\n`;
        }
    }
    return text + "_বিস্তারিত দেখতে বাটনে ক্লিক করুন।_";
}

function getSimKeyboard() {
    const rows = Object.keys(global.sbData.sim).map(key => [{
        text: global.sbData.sim[key].expanded ? `🔽 ${global.sbData.sim[key].name}` : `▶️ ${global.sbData.sim[key].name}`,
        callback_data: `sim_${key}`
    }]);
    rows.push([{ text: "🏠 Main Menu", callback_data: "back_main" }]);
    return { reply_markup: { inline_keyboard: rows } };
}

function getWalletText() {
    let text = "💰 **মোবাইল ওয়ালেট তথ্য**\n\n";
    for (let key in global.sbData.wallet) {
        const w = global.sbData.wallet[key];
        text += `${w.color} **${w.name}**\n`;
        if (w.expanded) {
            text += `💰 ব্যালেন্স: \`${w.info.balance}\` | 🏧 ইন: \`${w.info.cash_in}\`\n🏧 আউট: \`${w.info.cash_out}\` | 📝 স্টেটমেন্ট: \`${w.info.statement}\`\n☎️ কেয়ার: \`${w.info.customer}\`\n\n`;
        }
    }
    return text + "_বিস্তারিত দেখতে বাটনে ক্লিক করুন।_";
}

function getWalletKeyboard() {
    const rows = Object.keys(global.sbData.wallet).map(key => [{
        text: global.sbData.wallet[key].expanded ? `🔽 ${global.sbData.wallet[key].name}` : `▶️ ${global.sbData.wallet[key].name}`,
        callback_data: `wallet_${key}`
    }]);
    rows.push([{ text: "🏠 Main Menu", callback_data: "back_main" }]);
    return { reply_markup: { inline_keyboard: rows } };
}


