module.exports.config = {
    name: "hi",
    credits: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
    aliases: ["hello", "ohey", "oi"],
    prefix: false, 
    permission: 0, 
    description: "Replies with a random greeting text.",
    tags: ["fun", "greeting"]
};

const GREETINGS = [
    "হ্যালো! 👋 কেমন আছেন? আশা করি সব ভালো চলছে।",
    "হাই! 😊 আপনার দিনটি শুভ হোক।",
    "ওহে! 💖 চ্যাট করার জন্য ধন্যবাদ।",
    "নমস্কার! আমি আপনার জন্য কী করতে পারি?",
    "কি অবস্থা? 🚀 নতুন কিছু জানতে চান?",
    "সালাম! 🙏 আপনাকে দেখে ভালো লাগলো।",
    "আরে! 😃 আবার কথা হচ্ছে!"
];

module.exports.run = async (bot, msg, args) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;

    const randomIndex = Math.floor(Math.random() * GREETINGS.length);
    const randomText = GREETINGS[randomIndex];

    await bot.sendMessage(chatId, randomText, { 
        reply_to_message_id: messageId 
    });
};
