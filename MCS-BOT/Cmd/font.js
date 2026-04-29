// ==================== FONT SYSTEM DATA ====================
const FONT_MAPS = {
    '1': { 
        name: "Bold Sans-serif",
        example: "𝗔𝗕𝗖 𝟭𝟮𝟯",
        map: {
            A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜", J: "𝗝",
            K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥", S: "𝗦", T: "𝗧",
            U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭",
            a: "𝗮", b: "𝗯", c: "𝗰", d: "𝗱", e: "𝗲", f: "𝗳", g: "𝗴", h: "𝗵", i: "𝗶", j: "𝗷",
            k: "𝗸", l: "𝗹", m: "𝗺", n: "𝗻", o: "𝗼", p: "𝗽", q: "𝗾", r: "𝗿", s: "𝘀", t: "𝘁",
            u: "𝘂", v: "𝘃", w: "𝘄", x: "𝘅", y: "𝘆", z: "𝘇",
            '0': "𝟬", '1': "𝟭", '2': "𝟮", '3': "𝟯", '4': "𝟰",
            '5': "𝟱", '6': "𝟲", '7': "𝟳", '8': "𝟴", '9': "𝟵"
        }
    },
    '2': { 
        name: "Double-Struck",
        example: "𝔸𝔹ℂ 𝟙𝟚𝟛",
        map: {
            A: "𝔸", B: "𝔹", C: "ℂ", D: "𝔻", E: "𝔼", F: "𝔽", G: "𝔾", H: "ℍ", I: "𝕀", J: "𝕁",
            K: "𝕂", L: "𝕃", M: "𝕄", N: "ℕ", O: "𝕆", P: "ℙ", Q: "ℚ", R: "ℝ", S: "𝕊", T: "𝕋",
            U: "𝕌", V: "𝕍", W: "𝕎", X: "𝕏", Y: "𝕐", Z: "ℤ",
            a: "𝕒", b: "𝕓", c: "𝕔", d: "𝕕", e: "𝕖", f: "𝕗", g: "𝕘", h: "𝕙", i: "𝕚", j: "𝕛",
            k: "𝕜", l: "𝕝", m: "𝕞", n: "𝕟", o: "𝕠", p: "𝕡", q: "𝕢", r: "𝕣", s: "𝕤", t: "𝕥",
            u: "𝕦", v: "𝕧", w: "𝕨", x: "𝕩", y: "𝕪", z: "𝕫",
            '0': "𝟘", '1': "𝟙", '2': "𝟚", '3': "𝟛", '4': "𝟜",
            '5': "𝟝", '6': "𝟞", '7': "𝟟", '8': "𝟠", '9': "𝟡"
        }
    },
    '3': { 
        name: "Squared/Circled",
        example: "🅰🅱🅲 ➊➋➌",
        map: {
            A: "🅰", B: "🅱", C: "🅲", D: "🅳", E: "🅴", F: "🅵", G: "🅶", H: "🅷", I: "🅸", J: "🅹",
            K: "🅺", L: "🅻", M: "🅼", N: "🅽", O: "🅾", P: "🅿", Q: "🆀", R: "🆁", S: "🆂", T: "🆃",
            U: "🆄", V: "🆅", W: "🆆", X: "🆇", Y: "🆈", Z: "🆉",
            '0': "⓿", '1': "➊", '2': "➋", '3': "➌", '4': "➍",
            '5': "➎", '6': "➏", '7': "➐", '8': "➑", '9': "➒"
        }
    },
    '4': { 
        name: "Boxed Style",
        example: "🄰🄱🄲 ①②③",
        map: {
            A: "🄰", B: "🄱", C: "🄲", D: "🄳", E: "🄴", F: "🄵", G: "🄶", H: "🄷", I: "🄸", J: "🄹",
            K: "🄺", L: "🄻", M: "🄼", N: "🄽", O: "🄾", P: "🄿", Q: "🅀", R: "🅁", S: "🅂", T: "🅃",
            U: "🅄", V: "🅅", W: "🅆", X: "🅇", Y: "🅈", Z: "🅉",
            '0': "⓿", '1': "①", '2': "②", '3': "③", '4': "④",
            '5': "⑤", '6': "⑥", '7': "⑦", '8': "⑧", '9': "⑨"
        }
    },
    '5': { 
        name: "Cherokee Style",
        example: "ᎯᏰᏟ 𝟘𝟙𝟚",
        map: {
            A: "Ꭿ", B: "Ᏸ", C: "Ꮯ", D: "Ꭰ", E: "Ꭼ", F: "ᖴ", G: "Ꮐ", H: "Ꮋ", I: "Ꮖ", J: "Ꭻ",
            K: "Ꮶ", L: "Ꮮ", M: "Ꮇ", N: "Ꮑ", O: "Ꮎ", P: "Ꭾ", Q: "Ꭴ", R: "Ꮢ", S: "Ꮥ", T: "Ꭲ",
            U: "Ꮼ", V: "Ꮙ", W: "Ꮃ", X: "᙭", Y: "Ꭹ", Z: "Ꮓ",
            '0': "𝟘", '1': "𝟙", '2': "𝟚", '3': "𝟛", '4': "𝟜",
            '5': "𝟝", '6': "𝟞", '7': "𝟟", '8': "𝟠", '9': "𝟡"
        }
    },
    '6': { 
        name: "Bold Serif",
        example: "𝐀𝐁𝐂 𝟏𝟐𝟑",
        map: {
            A: "𝐀", B: "𝐁", C: "𝐂", D: "𝐃", E: "𝐄", F: "𝐅", G: "𝐆", H: "𝐇", I: "𝐈", J: "𝐉",
            K: "𝐊", L: "𝐋", M: "𝐌", N: "𝐍", O: "𝐎", P: "𝐏", Q: "𝐐", R: "𝐑", S: "𝐒", T: "𝐓",
            U: "𝐔", V: "𝐕", W: "𝐖", X: "𝐗", Y: "𝐘", Z: "𝐙",
            a: "𝐚", b: "𝐛", c: "𝐜", d: "𝐝", e: "𝐞", f: "𝐟", g: "𝐠", h: "𝐡", i: "𝐢", j: "𝐣",
            k: "𝐤", l: "𝐥", m: "𝐦", n: "𝐧", o: "𝐨", p: "𝐩", q: "𝐪", r: "𝐫", s: "𝐬", t: "𝐭",
            u: "𝐮", v: "𝐯", w: "𝐰", x: "𝐱", y: "𝐲", z: "𝐳",
            '0': "𝟎", '1': "𝟏", '2': "𝟐", '3': "𝟑", '4': "𝟒",
            '5': "𝟓", '6': "𝟔", '7': "𝟕", '8': "𝟖", '9': "𝟗"
        }
    }
};

function styleText(text, styleId) {
    const styleData = FONT_MAPS[styleId];
    if (!styleData) return text;
    return [...text].map(ch => styleData.map[ch] || ch).join("");
}

function createFontlistMessage() {
    let msg = "╭━─━─━❮ 𝐂𝐒𝐑-𝐁𝐎𝐓 ❯━─━─━╮\n";
    msg += "├‣ 𝐃𝐞𝐯: 𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر\n";
    msg += "╰━──━─━─━━──━─━─━─━❍\n";
    msg += "╭━─━─━❮✿ 𝐅𝐨𝐧𝐭 𝐋𝐢𝐬𝐭 ✿❯━─━─━╮\n";
    for (const id in FONT_MAPS) {
        msg += `├‣ ${id}️⃣ ${FONT_MAPS[id].name}\n`;
        msg += `│   ✦ Ex: ${FONT_MAPS[id].example}\n`;
    }
    msg += "╰━──━─━─━━──━━─━━─━━─━❍";
    return msg;
}

module.exports = {
    config: {
        name: "font",
        version: "1.0.0",
        author: "𝐃𝐀𝐍𝐆𝐄𝐑 | خـطـــــر",
        countDown: 5,
        role: 0,
        description: "Create fancy styled text",
        category: "Utility",
        guide: "{pn} <ID> <text> or {pn} list",
        prefix: true
    },

    run: async (bot, msg, args) => {
        const { chat, message_id } = msg;

        // চেক যদি ইউজার লিস্ট দেখতে চায়
        if (!args[0] || args[0].toLowerCase() === "list") {
            const listMsg = createFontlistMessage();
            return bot.sendMessage(chat.id, listMsg, {
                reply_to_message_id: message_id
            });
        }

        const styleId = args[0];
        const textToStyle = args.slice(1).join(" ");

        // চেক যদি ইনপুট সঠিক না থাকে
        if (!textToStyle) {
            return bot.sendMessage(chat.id, "❌ ব্যবহার: `/font 1 Hello` অথবা `/font list` দেখুন।", {
                reply_to_message_id: message_id,
                parse_mode: "Markdown"
            });
        }

        // চেক যদি আইডি ভুল হয়
        if (!FONT_MAPS[styleId]) {
            return bot.sendMessage(chat.id, "❌ ভুল আইডি! ১ থেকে ৬ এর মধ্যে আইডি দিন।", {
                reply_to_message_id: message_id
            });
        }

        const styledResult = styleText(textToStyle, styleId);

        return bot.sendMessage(chat.id, styledResult, {
            reply_to_message_id: message_id
        });
    }
};

