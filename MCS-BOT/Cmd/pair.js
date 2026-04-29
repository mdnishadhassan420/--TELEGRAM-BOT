/**
 * 🤖 CSR-BOT COMMAND: LOVE PAIR (FINAL FIXED)
 * 👤 AUTHOR: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر
 * 🆔 TELEGRAM ID: 6969889252
 */

const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

// কনফিগারেশন অবজেক্ট আলাদা করে রাখা হয়েছে যাতে এরর না আসে
const config = {
    name: "pair",
    aliases: ["love", "match"],
    role: 0,
    cooldown: 15,
    prefix: true,
    credit: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
    description: "ভাগ্য নির্ধারণ করুন।"
};

module.exports = {
    config: config,

    run: async (bot, msg, args) => {
        const chatId = msg.chat.id;
        const senderId = msg.from.id;
        const messageId = msg.message_id;

        // আপনার প্যানেলের স্ট্রাকচার অনুযায়ী পাথ
        const USERS_FILE = path.join(process.cwd(), 'users.json');
        const badolFolder = path.join(process.cwd(), 'BADOL');
        
        const pathAvt1 = path.join(badolFolder, `avt_${senderId}_1.png`);
        const pathAvt2 = path.join(badolFolder, `avt_${senderId}_2.png`);

        let waitMsg;

        try {
            let partnerId, partnerName;

            // ১. পার্টনার সিলেকশন
            if (msg.reply_to_message && msg.reply_to_message.from) {
                partnerId = msg.reply_to_message.from.id;
                partnerName = msg.reply_to_message.from.first_name;
            } else {
                if (!fs.existsSync(USERS_FILE)) {
                    return bot.sendMessage(chatId, "❌ `users.json` ফাইলটি পাওয়া যায়নি।");
                }

                const allUsers = fs.readJsonSync(USERS_FILE);
                const otherUsers = allUsers.filter(id => id != senderId);

                if (otherUsers.length === 0) {
                    return bot.sendMessage(chatId, "❌ ডাটাবেসে অন্য কোনো ইউজার নেই।");
                }

                partnerId = otherUsers[Math.floor(Math.random() * otherUsers.length)];
                try {
                    const chatMember = await bot.getChatMember(chatId, partnerId);
                    partnerName = chatMember.user.first_name || "User";
                } catch (e) { partnerName = "Global User"; }
            }

            if (partnerId === senderId) return bot.sendMessage(chatId, "😂 নিজের সাথে নিজে প্রেম সম্ভব না!");

            waitMsg = await bot.sendMessage(chatId, "✨ আপনাদের ভাগ্য গণনা করা হচ্ছে...", { reply_to_message_id: messageId });

            // ২. ইমেজ ডাউনলোড ফাংশন
            const downloadImg = async (id, savePath) => {
                try {
                    const photos = await bot.getUserProfilePhotos(id, { limit: 1 });
                    let url = "https://i.imgur.com/6ve9hyL.png"; 

                    if (photos.total_count > 0) {
                        const fileId = photos.photos[0][0].file_id;
                        const file = await bot.getFile(fileId);
                        url = `https://api.telegram.org/file/bot${global.CONFIG.BOT_TOKEN}/${file.file_path}`;
                    }
                    const res = await axios.get(url, { responseType: "arraybuffer", timeout: 10000 });
                    fs.writeFileSync(savePath, Buffer.from(res.data));
                } catch (e) {
                    const def = await axios.get("https://i.imgur.com/6ve9hyL.png", { responseType: "arraybuffer" });
                    fs.writeFileSync(savePath, Buffer.from(def.data));
                }
            };

            await Promise.all([downloadImg(senderId, pathAvt1), downloadImg(partnerId, pathAvt2)]);

            // ৩. ক্যানভাস ডিজাইন
            const bgUrl = "https://i.ibb.co/RBRLmRt/Pics-Art-05-14-10-47-00.jpg";
            const bgRes = await axios.get(bgUrl, { responseType: "arraybuffer" });
            const bgImg = await loadImage(Buffer.from(bgRes.data));
            
            const canvas = createCanvas(bgImg.width, bgImg.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

            const avt1 = await loadImage(pathAvt1);
            const avt2 = await loadImage(pathAvt2);

            const drawCircle = (img, x, y, size) => {
                ctx.save();
                ctx.beginPath();
                ctx.arc(x + size/2, y + size/2, size/2, 0, Math.PI * 2);
                ctx.clip();
                ctx.drawImage(img, x, y, size, size);
                ctx.restore();
            };

            drawCircle(avt1, 111, 175, 330);
            drawCircle(avt2, 1018, 173, 330);

            const percentage = Math.floor(Math.random() * 51) + 50;

            // ৪. আউটপুট (এখানে config.credit সরাসরি ব্যবহার করা হয়েছে)
            const caption = `💞 **「 𝐆𝐋𝐎𝐁𝐀𝐋 𝐋𝐎𝐕𝐄 𝐏𝐀𝐈𝐑 」** 💞\n━━━━━━━━━━━━━━━━━━━━\n🤵 **Sender:** [${msg.from.first_name}](tg://user?id=${senderId})\n👰 **Partner:** [${partnerName}](tg://user?id=${partnerId})\n\n💘 **Love Connection:** \`${percentage}%\` 💖\n━━━━━━━━━━━━━━━━━━━━\n👤 **Credit:** \`${config.credit}\``;

            await bot.sendPhoto(chatId, canvas.toBuffer(), {
                caption: caption,
                reply_to_message_id: messageId,
                parse_mode: 'Markdown'
            });

            if (waitMsg) bot.deleteMessage(chatId, waitMsg.message_id).catch(() => {});

        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, "❌ ডাটা প্রসেসিং এ সমস্যা হয়েছে। আপনার কনসোল চেক করুন।");
        } finally {
            // ক্লিনআপ
            if (fs.existsSync(pathAvt1)) fs.unlinkSync(pathAvt1);
            if (fs.existsSync(pathAvt2)) fs.unlinkSync(pathAvt2);
        }
    }
};


