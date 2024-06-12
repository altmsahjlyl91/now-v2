import fetch from 'node-fetch';
import uploader from '../lib/uploadImage.js';
var handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `*يرجى وضع نص او صورة للرد عليه.*\n\n*❏ لمزيد من الأمثلة والأوامر يرجى استخدام*\n*${usedPrefix + command} أو ${usedPrefix + command} أو ${usedPrefix + command}*`;
    try {
        conn.sendPresenceUpdate('composing', m.chat);
        var apiResponse = await fetch(`https://aemt.me/gemini?text=${encodeURIComponent(text)}`);
        var res = await apiResponse.json();
        await m.reply(res.result);
    } catch (error) {
        await conn.reply(m.chat, '*حدث خطأ أثناء المعالجة.*\n\n*يرجى التبليغ عن هذا الخطأ باستخدام*\n*#report ' + usedPrefix + command + '*\n\n' + wm, fkontak, m);
        console.log(`❗❗ حدث خطأ أثناء تنفيذ ${usedPrefix + command} ❗❗`);
        console.error(error);
    }
};

handler.command = ['جيمي', 'bard'];
handler.help = ['تحليل', 'bard'];
handler.tags = ['أدوات'];
handler.premium = false;

export default handler;
