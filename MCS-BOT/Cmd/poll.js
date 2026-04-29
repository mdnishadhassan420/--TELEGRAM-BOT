/**
 * 📊 CSR-BOT ALL-IN-ONE POLL SYSTEM (FIXED)
 * 👤 AUTHOR: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر
 */

const fs = require('fs-extra');
const path = require('path');

const POLL_DB = path.join(__dirname, 'BADOL', 'poll_results.json');

module.exports = {
    config: {
        name: "poll",
        aliases: ["vote", "ভোট"],
        role: 1,
        cooldown: 5,
        credit: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        description: "পোল তৈরি করুন এবং লিস্ট দেখুন",
        usage: "/poll প্রশ্ন | অপশন ১ | অপশন ২ অথবা /poll list",
        prefix: true
    },

    run: async function (bot, msg, args) {
        const chatId = msg.chat.id;
        const senderName = msg.from.first_name;
        const input = args.join(" ");

        if (!fs.existsSync(path.dirname(POLL_DB))) fs.mkdirSync(path.dirname(POLL_DB), { recursive: true });

        // --- ১. লিস্ট এবং রেজাল্ট দেখার লজিক ---
        if (input.toLowerCase() === "list" || input.toLowerCase() === "result") {
            if (!fs.existsSync(POLL_DB)) return bot.sendMessage(chatId, "❌ কোনো পোলের ডাটা পাওয়া যায়নি।");
            
            const db = fs.readJsonSync(POLL_DB);
            const pollIds = Object.keys(db);
            if (pollIds.length === 0) return bot.sendMessage(chatId, "❌ কোনো রেকর্ড নেই।");

            const latestPollId = pollIds[pollIds.length - 1];
            const pollData = db[latestPollId];
            
            // রেজাল্ট অবজেক্ট থেকে ভোটের সংখ্যা বের করা
            const voteEntries = Object.values(pollData.results || {});
            const totalVotes = voteEntries.length;

            let resMsg = `📊 **「 POLL LIST & RESULT 」**\n━━━━━━━━━━━━━━━━━━━━\n`;
            resMsg += `❓ **প্রশ্ন:** ${pollData.question}\n`;
            resMsg += `👥 **মোট ভোট:** ${totalVotes}\n━━━━━━━━━━━━━━━━━━━━\n`;

            pollData.options.forEach(opt => {
                const count = voteEntries.filter(v => v.option === opt).length;
                const percent = totalVotes > 0 ? ((count / totalVotes) * 100).toFixed(0) : 0;
                
                const barLen = Math.round(percent / 10);
                const bar = "🔵".repeat(barLen) + "⚪".repeat(10 - barLen);
                
                resMsg += `🔹 **${opt}**\n${bar} ${percent}%\n`;
            });
            
            resMsg += `━━━━━━━━━━━━━━━━━━━━\n👤 **Creator:** ${pollData.creator}\n🛡️ **Credit:** \`${this.config.credit}\``;
            return bot.sendMessage(chatId, resMsg, { parse_mode: 'Markdown' });
        }

        // --- ২. পোল তৈরি করার লজিক ---
        if (!input || !input.includes("|")) {
            return bot.sendMessage(chatId, `⚠️ **ব্যবহারবিধি:**\n\n1️⃣ **তৈরি:** \`/poll প্রশ্ন | অপশন ১ | অপশন ২\`\n2️⃣ **রেজাল্ট:** \`/poll list\``, { parse_mode: 'Markdown' });
        }

        const parts = input.split("|").map(p => p.trim());
        const question = parts[0];
        const options = parts.slice(1);

        if (options.length < 2) return bot.sendMessage(chatId, "❌ অন্তত ২ টি অপশন দিন।");
        if (options.length > 10) return bot.sendMessage(chatId, "❌ সর্বোচ্চ ১০টি অপশন দেওয়া সম্ভব।");

        try {
            const pollMsg = await bot.sendPoll(chatId, question, options, {
                is_anonymous: false, // ইউজার আইডি ট্র্যাক করার জন্য এটি false থাকা জরুরি
                reply_to_message_id: msg.message_id
            });

            const pollId = pollMsg.poll.id;

            let db = fs.existsSync(POLL_DB) ? fs.readJsonSync(POLL_DB) : {};
            db[pollId] = {
                question: question,
                options: options,
                creator: senderName,
                results: {}
            };
            fs.writeJsonSync(POLL_DB, db, { spaces: 2 });

            // লিসেনার সেটআপ (মেইন ফাইল ছাড়া)
            if (!bot._pollListenerAdded) {
                bot.on('poll_answer', (answer) => {
                    try {
                        const currentDb = fs.readJsonSync(POLL_DB);
                        if (currentDb[answer.poll_id]) {
                            const userId = answer.user.id;
                            const optIdx = answer.option_ids[0];
                            
                            // যদি ইউজার ভোট রিমুভ করে (টেলিগ্রামে সম্ভব)
                            if (optIdx === undefined) {
                                delete currentDb[answer.poll_id].results[userId];
                            } else {
                                currentDb[answer.poll_id].results[userId] = {
                                    name: answer.user.first_name,
                                    option: currentDb[answer.poll_id].options[optIdx]
                                };
                            }
                            fs.writeJsonSync(POLL_DB, currentDb, { spaces: 2 });
                        }
                    } catch (err) {
                        console.error("Poll Update Error:", err);
                    }
                });
                bot._pollListenerAdded = true;
            }

            bot.sendMessage(chatId, "✅ পোল তৈরি হয়েছে!\n💡 রেজাল্ট দেখতে লিখুন: `/poll list`", { parse_mode: 'Markdown' });

        } catch (e) {
            bot.sendMessage(chatId, "❌ এরর: পোল তৈরি করা সম্ভব হয়নি।");
        }
    }
};


