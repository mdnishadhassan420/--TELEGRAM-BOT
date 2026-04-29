/**
 * 🤖 CSR-BOT COMMAND: RAMADAN V4 (FINAL FIXED)
 * 👤 AUTHOR: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر
 * 📅 YEAR: 2026
 * 🛠 FEATURES: 12-Hour Format, Auto-Notification, Phase Info (Rahmat/Magfirat/Najat), Dual Eid Countdown.
 */

const moment = require('moment');
const fs = require('fs-extra');
const path = require('path');

// ২০২৬ সালের রমজান ডাটাবেজ (সম্ভাব্য ঢাকা ভিত্তিক সময়)
const ramadanData = {
    "2026-02-19": { roza: 1, sehri: "05:15", iftar: "17:56" },
    "2026-02-20": { roza: 2, sehri: "05:14", iftar: "17:57" },
    "2026-02-21": { roza: 3, sehri: "05:13", iftar: "17:58" },
    "2026-02-22": { roza: 4, sehri: "05:12", iftar: "17:58" },
    "2026-02-23": { roza: 5, sehri: "05:11", iftar: "17:59" },
    "2026-02-24": { roza: 6, sehri: "05:10", iftar: "17:59" },
    "2026-02-25": { roza: 7, sehri: "05:09", iftar: "18:00" },
    "2026-02-26": { roza: 8, sehri: "05:08", iftar: "18:01" },
    "2026-02-27": { roza: 9, sehri: "05:07", iftar: "18:01" },
    "2026-02-28": { roza: 10, sehri: "05:06", iftar: "18:02" },
    "2026-03-01": { roza: 11, sehri: "05:05", iftar: "18:03" },
    "2026-03-02": { roza: 12, sehri: "05:04", iftar: "18:03" },
    "2026-03-03": { roza: 13, sehri: "05:03", iftar: "18:04" },
    "2026-03-04": { roza: 14, sehri: "05:02", iftar: "18:04" },
    "2026-03-05": { roza: 15, sehri: "05:01", iftar: "18:05" },
    "2026-03-06": { roza: 16, sehri: "05:00", iftar: "18:05" },
    "2026-03-07": { roza: 17, sehri: "04:59", iftar: "18:06" },
    "2026-03-08": { roza: 18, sehri: "04:58", iftar: "18:06" },
    "2026-03-09": { roza: 19, sehri: "04:57", iftar: "18:07" },
    "2026-03-10": { roza: 20, sehri: "04:56", iftar: "18:07" },
    "2026-03-11": { roza: 21, sehri: "04:55", iftar: "18:08" },
    "2026-03-12": { roza: 22, sehri: "04:54", iftar: "18:08" },
    "2026-03-13": { roza: 23, sehri: "04:53", iftar: "18:09" },
    "2026-03-14": { roza: 24, sehri: "04:51", iftar: "18:09" },
    "2026-03-15": { roza: 25, sehri: "04:50", iftar: "18:10" },
    "2026-03-16": { roza: 26, sehri: "04:49", iftar: "18:10" },
    "2026-03-17": { roza: 27, sehri: "04:48", iftar: "18:10" },
    "2026-03-18": { roza: 28, sehri: "04:47", iftar: "18:11" },
    "2026-03-19": { roza: 29, sehri: "04:46", iftar: "18:11" },
    "2026-03-20": { roza: 30, sehri: "04:45", iftar: "18:12" }
};

function makeBotBox(text) {
    return `╭━─━─━❮ ✿𝐁𝐀𝐃𝐎𝐋-𝐁𝐎𝐓✿ ❯━─━─━╮\n\n${text}\n\n╰━──━─━−━━──━━─━━─━━─━❍`;
}

module.exports = {
    config: {
        name: "ramadan",
        aliases: ["roza", "iftar", "eid"],
        version: "4.5.0",
        author: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        credit: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        role: 0,
        cooldown: 5,
        prefix: true,
        description: "রমজান ২০২৬ এর লাইভ আপডেট, দশক ও ঈদের কাউন্টডাউন",
        category: "Information"
    },

    run: async function (bot, msg, args) {
        const dateKey = moment().format("YYYY-MM-DD");
        const data = ramadanData[dateKey];
        const eidUlFitr = moment("2026-03-21");
        const eidUlAzha = moment("2026-05-27"); 
        const today = moment();

        let phaseText = "";
        let text = "";

        if (data) {
            // দশক নির্ধারণ
            if (data.roza <= 10) phaseText = "✨ **দশক: রহমত (১-১০)**";
            else if (data.roza <= 20) phaseText = "✨ **দশক: মাগফিরাত (১১-২০)**";
            else phaseText = "✨ **দশক: নাজাত (২১-৩০)**";

            // টাইম ফরম্যাট ফিক্স (12 Hour Format)
            const sehriTime = moment(data.sehri, "HH:mm").format("hh:mm A");
            const iftarTime = moment(data.iftar, "HH:mm").format("hh:mm A");

            text = `🌙 **[ RAMADAN INFO - ২০২৬ ]**\n` +
                   `━━━━━━━━━━━━━━━━━━━━\n` +
                   `📅 তারিখ: ${moment().format('DD MMMM, YYYY')}\n` +
                   `✨ আজ **${data.roza}-তম** রোজা\n` +
                   `${phaseText}\n\n` +
                   `⏳ সেহরির শেষ সময়: **${sehriTime}**\n` +
                   `🍴 ইফতারের সময়: **${iftarTime}**\n` +
                   `━━━━━━━━━━━━━━━━━━━━\n` +
                   `🎉 ঈদুল ফিতর: **${eidUlFitr.diff(today, 'days')} দিন বাকি**\n` +
                   `🕋 ঈদুল আজহা: **${eidUlAzha.diff(today, 'days')} দিন বাকি**`;
        } else {
            text = "🌙 ২০২৬ সালের রমজান ও ঈদের অপেক্ষায়...\n\n" +
                   `🎉 ঈদুল ফিতর: **${eidUlFitr.diff(today, 'days')} দিন বাকি**\n` +
                   `🕋 ঈদুল আজহা: **${eidUlAzha.diff(today, 'days')} দিন বাকি**`;
        }
        return bot.sendMessage(msg.chat.id, makeBotBox(text), { parse_mode: 'Markdown' });
    },

    onLoad: async function (bot) {
        console.log("✅ Ramadan & Eid Notification System Active!");

        setInterval(async () => {
            const now = moment().format("HH:mm");
            const dateKey = moment().format("YYYY-MM-DD");
            const data = ramadanData[dateKey];

            if (!data) return;

            // ইফতারের নোটিফিকেশন + দোয়া
            if (now === data.iftar) {
                let dua = data.roza <= 10 ? "ইয়া আরহামার রাহিমীন (রহমতের দশক)" : 
                          data.roza <= 20 ? "আস্তাগফিরুল্লাহ রাব্বি মিন কুল্লি যাম্বিন (মাগফিরাতের দশক)" : 
                          "আল্লাহুম্মা আজিরনি মিনান নার (নাজাতের দশক)";
                
                const msg = `🔔 **ইফতারের সময় হয়েছে!**\n\n✨ আজ ${data.roza}-তম রোজা।\n🤲 বিশেষ আমল: ${dua}\n\nসবাই ইফতার করে নিন। 😊`;
                await notifyAllGroups(bot, msg);
            }

            // সেহরির ১০ মিনিট আগে রিমাইন্ডার
            const sehriReminder = moment(data.sehri, "HH:mm").subtract(10, 'minutes').format("HH:mm");
            if (now === sehriReminder) {
                const msg = `📢 **সেহরির সময় শেষ হতে ১০ মিনিট বাকি!**\n\n⏳ আজ ${data.roza}-তম রোজা।\nঅনুগ্রহ করে দ্রুত সেহরি শেষ করুন।`;
                await notifyAllGroups(bot, msg);
            }

        }, 60000); 
    }
};

async function notifyAllGroups(bot, message) {
    const SETTINGS_FILE = path.join(__dirname, 'BADOL', 'group_settings.json');
    if (fs.existsSync(SETTINGS_FILE)) {
        try {
            const settings = fs.readJsonSync(SETTINGS_FILE);
            const groupIds = Object.keys(settings);
            for (let id of groupIds) {
                bot.sendMessage(id, makeBotBox(message), { parse_mode: 'Markdown' }).catch(e => {});
            }
        } catch (e) {
            console.log("Error reading group settings.");
        }
    }
}


