/**
 * 🤖 CSR-BOT COMMAND: SMART MASTER SETTINGS (FINAL FULL FIXED)
 * 👤 AUTHOR: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر
 * 📅 YEAR: 2026
 * 🛡️ FEATURES: Auto File Create, Flexible Arguments
 */

const fs = require('fs-extra');
const path = require('path');

// আপনার ডিরেক্টরি অনুযায়ী পাথ (BADOL ফোল্ডারের ভেতর)
const FOLDER_PATH = path.join(__dirname, 'BADOL');
const SETTINGS_FILE = path.join(FOLDER_PATH, 'group_settings.json');

module.exports = {
    config: {
        name: "config",
        aliases: ["set", "setting"],
        version: "4.5.0",
        permission: 2, 
        credits: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        description: "বটের কমান্ড ও ইন্টারনাল সিস্টেম অন/অফ করার মাস্টার প্যানেল",
        prefix: true,
        category: "Admin",
        usages: "/set list অথবা /set off ai",
        cooldowns: 5
    },

    run: async function (bot, msg, args) {
        const chatId = msg.chat.id;

        // ইন্টারনাল সিস্টেম লিস্ট
        const internalSystems = {
            "antilink": "🔗 Anti-Link System",
            "nametracker": "👤 Name Tracker System",
            "bancheck": "🚫 Auto Ban Check"
        };

        // --- ফাইল ও ফোল্ডার অটো তৈরি করা ---
        if (!fs.existsSync(FOLDER_PATH)) {
            fs.mkdirSync(FOLDER_PATH, { recursive: true });
        }
        if (!fs.existsSync(SETTINGS_FILE)) {
            fs.writeJsonSync(SETTINGS_FILE, {}, { spaces: 2 });
        }

        let settings = fs.readJsonSync(SETTINGS_FILE);
        if (!settings[chatId]) settings[chatId] = {};

        // --- আর্গুমেন্ট হ্যান্ডলিং ---
        // যদি ইউজার /set off ai লেখে (args[0]=off, args[1]=ai)
        // অথবা /set ai off লেখে (args[0]=ai, args[1]=off)
        let cmdName, status;

        if (args[0] === "on" || args[0] === "off") {
            status = args[0];
            cmdName = args[1]?.toLowerCase();
        } else {
            cmdName = args[0]?.toLowerCase();
            status = args[1]?.toLowerCase();
        }

        // --- ১. লিস্ট দেখানো ---
        if (cmdName === "list" || !cmdName) {
            let cmdList = "";
            let offCount = 0;
            const allCmds = Object.keys(global.COMMANDS).sort();
            
            allCmds.forEach(cmd => {
                if (cmd === "settings") return;
                const isOff = settings[chatId][cmd] === false;
                if (isOff) offCount++;
                cmdList += `• \`${cmd}\` ${isOff ? '❌' : '✅'}\n`;
            });

            let responseMsg = "⚙️ **CSR-BOT MASTER SETTINGS**\n";
            responseMsg += "━━━━━━━━━━━━━━━━━━━━━━\n";
            responseMsg += `📊 **STATISTICS:**\n`;
            responseMsg += `├ Total Commands: **${allCmds.length - 1}**\n`;
            responseMsg += `└ Currently Off: **${offCount}**\n`;
            responseMsg += "━━━━━━━━━━━━━━━━━━━━━━\n\n";
            responseMsg += "🛠️ **COMMAND LIST:**\n" + cmdList;
            responseMsg += "\n━━━━━━━━━━━━━━━━━━━━━━\n";
            responseMsg += "💡 **ব্যবহার:** `/set off ai` অথবা `/set on ai`";
            
            return bot.sendMessage(chatId, responseMsg, { parse_mode: 'Markdown' });
        }

        // --- ২. চেক করা কমান্ড কি না ---
        const isValidCommand = global.COMMANDS[cmdName];
        const isValidSystem = internalSystems[cmdName];

        if (!isValidCommand && !isValidSystem) {
            return bot.sendMessage(chatId, `❌ '${cmdName}' নামে কোনো কমান্ড পাওয়া যায়নি। সঠিক নাম দেখতে \`/set list\` লিখুন।`);
        }

        // অন-অফ স্ট্যাটাস সেট করা
        if (status === "on") {
            settings[chatId][cmdName] = true;
        } else if (status === "off") {
            settings[chatId][cmdName] = false;
        } else {
            return bot.sendMessage(chatId, "⚠️ সঠিক নিয়ম: `/set off ai` অথবা `/set on ai`।");
        }

        // ফাইল সেভ করা
        try {
            fs.writeJsonSync(SETTINGS_FILE, settings, { spaces: 2 });
            return bot.sendMessage(chatId, `✅ সফল! **${cmdName.toUpperCase()}** এখন ${status === "on" ? "সক্রিয় (ON) ✅" : "নিষ্ক্রিয় (OFF) ❌"}।`);
        } catch (err) {
            return bot.sendMessage(chatId, "❌ ডাটা সেভ করতে সমস্যা হয়েছে!");
        }
    }
};


