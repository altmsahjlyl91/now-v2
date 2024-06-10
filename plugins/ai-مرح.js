import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let lang = global.db.data.users[m.sender].language;
  if (!text) throw `✳️ لا يوجد نص! أرسل لي شيئًا للتحدث عنه.`;

  try {
    let res = await fetch('https://api.simsimi.vn/v1/simtalk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `text=${encodeURIComponent(text)}&lc=${lang}&key=`
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    let json = await res.json();
    let botName = 'الصاعقة'; // ضع هنا اسم البوت الخاص بك
    let replyMessage = json.message
      .replace(/simsimi/gi, botName);

    m.reply(replyMessage);
  } catch (err) {
    m.reply(`❎ حاول مرة أخرى لاحقًا. يبدو أن خدمة SimSimi غير متاحة حاليًا. خطأ: ${err.message}`);
  }
};

handler.help = ['bot'];
handler.tags = ['fun'];
handler.command = ['bot', 'simi'];

export default handler;
