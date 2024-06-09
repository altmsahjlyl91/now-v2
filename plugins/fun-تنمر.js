import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        // تحديد المستخدم المستهدف
        let who;
        if (m.isGroup) {
            who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
        } else {
            who = m.chat;
        }
        if (!who) throw `⌯ ضيـف مــنــشــن لــلــشــخــص\n\n📌 مـــثــال : ${usedPrefix + command} @مـنـشـن`;

        // الحصول على بيانات المستخدم المستهدف
        let user = global.db.data.users[who];
        if (!user) throw `لا يمكن العثور على المستخدم @${who.split`@`[0]}`;

        // استدعاء API للحصول على الصورة
        let res = await fetch('https://api.waifu.pics/sfw/bully');
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
        
        let json = await res.json();
        if (!json.url) throw new Error("Invalid response from API");

        // المرسل والمستلم
        let uer = m.sender;
        await conn.sendFile(m.chat, json.url, 'bully.gif', `يــبــدو ان @${uer.split('@')[0]} يــتــنــمــر عــلــي @${who.split`@`[0]} 😭👆🏻`, m, null, { mentions: [who, uer] });
    } catch (e) {
        console.error(e);
        m.reply(`حدث خطأ: ${e.message}`);
    }
};

// مساعدة الأوامر والعلامات
handler.help = ['ترفيه'];
handler.tags = ['gif'];
handler.command = /^(تنمر)$/i;

export default handler;
