/**
 * 🛠️ MCS-BOT TERMUX MASTER TOOL (ULTIMATE FIXED)
 * 👤 AUTHOR: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر
 * 📅 YEAR: 2026
 * 🆔 TELEGRAM ID: 6969889252
 * 📝 UPDATE: FULL BEGINNER TO EXPERT SETUP ADDED
 */

module.exports = {
    config: {
        name: "termux",
        aliases: ["tux", "termuxsetup", "setup"],
        version: "2.1.0",
        credit: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        role: 0, 
        cooldown: 5,
        prefix: true,
        category: "Tools",
        description: "নতুন ইউজারদের জন্য Termux-এর ফুল সেটআপ এবং সব টুলস গাইড।",
        guide: "/termux"
    },

    run: async (bot, msg, args) => {
        const chatId = msg.chat.id;

        try {
            /* ------------------------------
             🔄  PREMIUM LOADING BAR 
            ------------------------------*/
            let progress = [
                "🔄 [▒▒▒▒▒▒▒▒▒▒] 0%",
                "⚡ [████▒▒▒▒▒▒] 40%",
                "⚡ [████████▒▒] 80%",
                "✅ [██████████] 100%"
            ];

            let loading = await bot.sendMessage(chatId, progress[0]);

            for (let i = 0; i < progress.length; i++) {
                await new Promise(r => setTimeout(r, 300));
                await bot.editMessageText(progress[i], {
                    chat_id: chatId,
                    message_id: loading.message_id
                }).catch(() => {});
            }
            await bot.deleteMessage(chatId, loading.message_id).catch(() => {});

            // মূল মেনু পাঠানো
            await sendMainMenu(bot, chatId);

            /* -------------------------------------------------------
             🛠️ DYNAMIC CALLBACK LISTENER (মেইন ফাইলে হাত না দিয়ে)
            ---------------------------------------------------------*/
            if (!bot._termuxListenerAdded) {
                bot.on("callback_query", async (cb) => {
                    const data = cb.data;
                    const cId = cb.message.chat.id;
                    const mId = cb.message.message_id;

                    const termuxKeys = ["full_setup", "version_info", "new_user", "all_tools", "speed_boost", "storage_fix", "repair_system", "fix_tools", "autorun_tool", "back_main"];
                    if (!termuxKeys.includes(data)) return;

                    await bot.answerCallbackQuery(cb.id).catch(() => {});

                    if (data === "back_main") {
                        return sendMainMenu(bot, cId, mId, true);
                    }

                    const contentMap = {
                        "version_info": getVersionInfo(),
                        "new_user": getNewUserGuide(),
                        "full_setup": getFullSetup(),
                        "all_tools": getAllTools(),
                        "speed_boost": getSpeedBoost(),
                        "storage_fix": getStorageFix(),
                        "repair_system": getRepairSystem(),
                        "fix_tools": getFixTools(),
                        "autorun_tool": getAutoRun()
                    };

                    if (contentMap[data]) {
                        await bot.editMessageText(contentMap[data], {
                            chat_id: cId,
                            message_id: mId,
                            parse_mode: "Markdown",
                            reply_markup: {
                                inline_keyboard: [[{ text: "🔙 ফিরে যান", callback_data: "back_main" }]]
                            }
                        });
                    }
                });
                bot._termuxListenerAdded = true; 
            }

        } catch (error) {
            console.error("Termux Error:", error);
        }
    }
};

/* =======================================================
   UI & DATA FUNCTIONS (FULL FIXED)
======================================================== */

async function sendMainMenu(bot, chatId, messageId = null, edit = false) {
    const text = `🧰 **TERMUX MASTER TOOL PANEL**\n\nনিচের অপশন থেকে আপনার প্রয়োজনীয় সেটআপটি বেছে নিন। নতুন ইউজাররা **Full Setup** কমান্ডটি ব্যবহার করুন।\n\n🛡️ **Credit:** MOHAMMAD BADOL`;
    const keyboard = {
        inline_keyboard: [
            [{ text: "🚀 FULL SETUP (এক কমান্ডে সব)", callback_data: "full_setup" }],
            [{ text: "🔥 ALL TOOLS MENU", callback_data: "all_tools" }],
            [{ text: "📌 App Version Info", callback_data: "version_info" }, { text: "🆕 Beginner Guide", callback_data: "new_user" }],
            [{ text: "⚡ Speed Booster", callback_data: "speed_boost" }, { text: "📂 Storage Fix", callback_data: "storage_fix" }],
            [{ text: "🛠 Repair System", callback_data: "repair_system" }, { text: "📦 Fix Packages", callback_data: "fix_tools" }],
            [{ text: "🤖 Auto Run (TMUX)", callback_data: "autorun_tool" }]
        ]
    };

    if (edit) {
        return bot.editMessageText(text, { chat_id: chatId, message_id: messageId, parse_mode: "Markdown", reply_markup: keyboard }).catch(() => {});
    }
    return bot.sendMessage(chatId, text, { parse_mode: "Markdown", reply_markup: keyboard });
}

function getFullSetup() {
    return `🚀 **TERMUX ALL-IN-ONE FULL SETUP**\n
এই কমান্ডটি দিলে আপনার Termux এ প্রয়োজনীয় সব ল্যাঙ্গুয়েজ এবং লাইব্রেরি অটোমেটিক সেটআপ হয়ে যাবে:\n
\`\`\`bash
apt update && apt upgrade -y && pkg update && pkg upgrade -y && pkg install python python2 python3 php nodejs git git-lfs lua53 golang nano vim fastfetch tmux mpv wget curl zip unzip perl ruby bmon openssh -y && pip install --upgrade pip && pip install requests mechanize bs4 rich httpx wheels && npm install -g npm yarn
\`\`\`\n
✅ **Note:** সেটআপ চলার সময় কোনো পারমিশন চাইলে 'y' লিখে এন্টার চাপুন।`;
}

function getAllTools() {
    return `🔥 **POPULAR TERMUX TOOLS**\n
আপনার প্রয়োজনীয় টুলসটি ক্লোন করতে পারেন:\n
1️⃣ **Tool-X (All Tools):**
\`git clone https://github.com/Rajkumrdusad/Tool-X\`
2️⃣ **Metasploit:**
\`pkg install metasploit\`
3️⃣ **Zphisher (Phishing):**
\`git clone https://github.com/htr-tech/zphisher\`
4️⃣ **SQLMap (Database):**
\`git clone https://github.com/sqlmapproject/sqlmap\`
5️⃣ **PyPhisher:**
\`git clone https://github.com/KasRoudra/PyPhisher\``;
}

function getVersionInfo() {
    return `📌 **TERMUX VERSION INFO**\n
✔ **Recommended:** Termux 1.1.8 (Github/F-Droid)
❌ **Avoid:** Play Store version (এটা এখন আর আপডেট হয় না)

📥 **Download Link:** [Click Here](https://t.me/SB_MODS_APK/114)\n
⚠️ **Note:** নতুন সব স্ক্রিপ্ট চালানোর জন্য এই ভার্সনটি বাধ্যতামূলক।`;
}

function getNewUserGuide() {
    return `🆕 **TERMUX BEGINNER GUIDE**\n
1️⃣ প্রথমে Termux ওপেন করে \`termux-setup-storage\` লিখে SD Card পারমিশন দিন।
2️⃣ যদি \`pkg update\` এ এরর আসে, তবে \`termux-change-repo\` লিখে Mirror পরিবর্তন করুন।
3️⃣ এরপর মেইন মেনু থেকে **Full Setup** কমান্ডটি রান করুন।
4️⃣ যেকোনো প্যাকেজ ইনস্টল করতে \`pkg install [name]\` ব্যবহার করুন।`;
}

function getSpeedBoost() {
    return `⚡ **SPEED BOOST COMMANDS**\n
টার্মাক্সের পারফরম্যান্স বাড়াতে নিচের কমান্ডগুলো দিন:\n
\`\`\`bash
ulimit -n 999999
ulimit -u 5000
ping -c 1 google.com
\`\`\``;
}

function getStorageFix() {
    return `📂 **STORAGE & PERMISSION FIX**\n
\`\`\`bash
termux-setup-storage
chmod 777 -R /data/data/com.termux/files/home
mkdir -p /sdcard/Android
\`\`\``;
}

function getRepairSystem() {
    return `🛠 **TERMUX REPAIR SYSTEM**\n
কোনো এরর ফিক্স করতে এই কমান্ডগুলো ট্রাই করুন:\n
\`\`\`bash
apt --fix-broken install -y
dpkg --configure -a
pkg reinstall root-repo -y
hash -r
\`\`\``;
}

function getFixTools() {
    return `📦 **REQUIREMENTS & PACKAGES FIX**\n
**Python Fix:**
\`pip install requests mechanize rich bs4 colorama\`
**NodeJS Fix:**
\`npm install axios chalk canvas fs-extra moment\`
**Yarn/Git Fix:**
\`pkg install git-lfs && corepack enable\``;
}

function getAutoRun() {
    return `🤖 **AUTO RUN (TMUX GUIDE)**\n
বট বা স্ক্রিপ্ট ২৪ ঘণ্টা সচল রাখতে:\n
1️⃣ **Start:** \`tmux new -s mcs\`
2️⃣ **Run:** আপনার কমান্ড দিন (যেমন: \`node index.js\`)
3️⃣ **Hide:** কিবোর্ডে \`CTRL+B\` তারপর \`D\` চাপুন।
4️⃣ **Back:** আবার স্ক্রিনে ফিরতে \`tmux attach -t mcs\` লিখুন।`;
}


