/**
 * 🤖 CSR-BOT COMMAND: APK LIST
 * 👤 CREDIT: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر
 * 📅 YEAR: 2026
 * 🆔 TELEGRAM ID: 6969889252
 */

module.exports = {
    config: {
        name: "apk",
        aliases: ["apps", "app"],
        version: "1.0.0",
        credit: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر", // ক্রেডিট সিস্টেম
        role: 0,                   // সবার জন্য উন্মুক্ত
        cooldown: 10,              // স্প্যাম রোধে ১০ সেকেন্ড কুলডাউন
        prefix: true,
        category: "utility",
        description: "প্রিমিয়াম APK লিস্ট এবং ডাউনলোড লিঙ্ক দেখায়।",
        guide: "/apk"
    },

    run: async (bot, msg, args) => {
        const chatId = msg.chat.id;

        try {
            /* ------------------------------
             🔄  PREMIUM LOADING BAR 
            ------------------------------*/
            let progress = [
                "🔄 [▒▒▒▒▒▒▒▒▒▒] 0%",
                "⚡ [██▒▒▒▒▒▒▒▒] 20%",
                "⚡ [████▒▒▒▒▒▒] 40%",
                "⚡ [██████▒▒▒▒] 60%",
                "⚡ [████████▒▒] 80%",
                "✅ [██████████] 100%"
            ];

            let loading = await bot.sendMessage(chatId, progress[0]);

            // লোডিং এনিমেশন প্রসেস
            progress.forEach((bar, i) => {
                setTimeout(() => {
                    bot.editMessageText(bar, {
                        chat_id: chatId,
                        message_id: loading.message_id
                    }).catch(() => {});
                }, 350 * i);
            });

            // লোডিং মেসেজ ডিলিট করা
            setTimeout(() => {
                bot.deleteMessage(chatId, loading.message_id).catch(() => {});
            }, 350 * progress.length + 200);

            /* ------------------------------
             📱 PREMIUM APK BUTTON LIST
            ------------------------------*/
            const apkButtons = {
                inline_keyboard: [
                    [
                        { text: "🛠️ Apk Editor Pro", url: "Nai" },
                        { text: "🤖 BADOL_TG_BOT", url: "Nai" }
                    ],
                    [
                        { text: "📘 MCS Fb Lite", url: "Nai" },
                        { text: "💳 HD Card Maker", url: "Nai" }
                    ],
                    [
                        { text: "⌨️ Redmik Keyboard", url: "Nai" },
                        { text: "🎵 Audio Player Pro", url: "Nai" }
                    ],
                    [
                        { text: "🎬 Inshot Premium", url: "Nai" },
                        { text: "📨 Telegram Puls Mod", url: "Nai" }
                    ],
                    [
                        { text: "📹 Xrecorder Pro", url: "Nai" },
                        { text: "🌐 TouchVPN Mod", url: "Nai" }
                    ],
                    [
                        { text: "🖼️ PixelLab MB", url: "Nai" },
                        { text: "🖼️ PixelLab MB 2", url: "Nai" }
                    ],
                    [
                        { text: "🛠️ Apk Editor MB", url: "Nai" },
                        { text: "📘 Old FB Lite",  url: "Nai" }
                    ],
                    // --- নতুন বাটন নিচে যোগ করা হয়েছে ---
                    [
                        { text: "🆔 Fb Name Change Capital", url: "Nai" },
                        { text: "🆕 Coming Soon 🔙", url: "Nai" }
                    ]
                ]
            };

            /* ------------------------------
             📦 SEND FINAL PREMIUM MENU
            ------------------------------*/
            setTimeout(() => {
                bot.sendMessage(
                    chatId,
                    `✨ **SB MODS PREMIUM APK LIST**\n\n📂 নিচের লিস্ট থেকে আপনার পছন্দের APK সিলেক্ট করুন:\n\n🛡️ **Credit:** ${module.exports.config.credit}`,
                    {
                        parse_mode: "Markdown",
                        reply_markup: apkButtons,
                        reply_to_message_id: msg.message_id
                    }
                );
            }, 2500);

        } catch (error) {
            console.error("APK CMD ERROR:", error.message);
            bot.sendMessage(chatId, "⚠️ APK লিস্ট লোড করতে সমস্যা হয়েছে।");
        }
    }
};



