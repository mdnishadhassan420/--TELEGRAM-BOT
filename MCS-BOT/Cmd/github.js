/**
 * 🛠️ CSR-BOT COMMAND: GITHUB
 * 👤 AUTHOR: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر
 * 🛡️ SYSTEM: ROLE, COOLDOWN, CREDIT INTEGRATED
 */

const https = require("https");

module.exports = {
    config: {
        name: "github",
        aliases: ["gh", "git"],
        version: "4.0",
        role: 0, // সবার জন্য উন্মুক্ত (User Level)
        credit: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        cooldown: 5, // ৫ সেকেন্ড কুলডাউন
        category: "Information",
        description: "গিটহাব প্রোফাইলের বিস্তারিত তথ্য দেখায়।",
        usage: "/github <username>",
        prefix: true
    },

    run: async (bot, msg, args) => {
        const chatId = msg.chat.id;

        // ইউজারনেম ইনপুট চেক
        if (!args[0]) {
            return bot.sendMessage(
                chatId,
                "❌ *GitHub username দিন!*\nউদাহরণ: `/github torvalds`",
                { parse_mode: "Markdown", reply_to_message_id: msg.message_id }
            );
        }

        const username = args[0];
        const url = `https://api.github.com/users/${username}`;

        // API কল করার জন্য রিকোয়েস্ট
        https.get(
            url,
            { headers: { "User-Agent": "MCS-BOT-BY-BADOL" } },
            (res) => {
                let data = "";
                res.on("data", chunk => data += chunk);

                res.on("end", async () => {
                    if (res.statusCode !== 200) {
                        return bot.sendMessage(
                            chatId,
                            "❌ *GitHub user পাওয়া যায়নি!*",
                            { parse_mode: "Markdown" }
                        );
                    }

                    try {
                        const u = JSON.parse(data);

                        // আপনার কাস্টম বক্স ডিজাইন
                        const box = `
╭─────────────────╮
│ 🤖 MCS-BOT      │
├─────────────────┤
│ 🐙 *Username:* ${u.login}
│ 🆔 *ID:* ${u.id}
│ 🔖 *Type:* ${u.type}
│ 📝 *Bio:* ${u.bio || "N/A"}
│ 🏢 *Company:* ${u.company || "N/A"}
│ 📍 *Location:* ${u.location || "N/A"}
│ 🌐 *Blog:* ${u.blog || "N/A"}
│ 📧 *Email:* ${u.email || "Hidden"}
├─────────────────┤
│ 📦 *Repos:* ${u.public_repos}
│ ⭐ *Gists:* ${u.public_gists}
│ 👥 *Followers:* ${u.followers}
│ ➡️ *Following:* ${u.following}
│ 🟢 *Hireable:* ${u.hireable ? "Yes" : "No"}
├─────────────────┤
│ 📅 *Created:* ${new Date(u.created_at).toDateString()}
│ 🕒 *Updated:* ${new Date(u.updated_at).toDateString()}
╰─────────────────╯
                        `;

                        // ছবি এবং বাটন সহ রেসপন্স
                        await bot.sendPhoto(chatId, u.avatar_url, {
                            caption: box,
                            parse_mode: "Markdown",
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "🔗 GitHub Profile", url: u.html_url }
                                    ],
                                    [
                                        { text: "👑 Owner Contact", url: "https://t.me/B4D9L_007" }
                                    ]
                                ]
                            }
                        });

                    } catch (err) {
                        console.error("GitHub parse error:", err);
                        bot.sendMessage(chatId, "⚠️ ডাটা প্রসেস করতে সমস্যা হয়েছে!");
                    }
                });
            }
        ).on("error", (e) => {
            console.error("GitHub API error:", e);
            bot.sendMessage(chatId, "⚠️ GitHub API সংযোগে সমস্যা হয়েছে!");
        });
    }
};


