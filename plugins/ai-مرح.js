import fetch from 'node-fetch';

// مباشرة نستخدم المفتاح اللي زودتنا فيه، بس لا تنسى تحفظه بأمان بعدين
const YOUR_API_KEY = 'vGLVun.sIkBdzyy13O3zv~Say0mDJFyYsXeaCykA';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let lang = global.db.data.users[m.sender].language;
  if (!text) throw `✳️ ما في نص مدخل. جرب تدخل نص يا ياحوبي!`;

  try {
    let res = await fetch('https://api.simsimi.vn/v1/simtalk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `text=${encodeURIComponent(text)}&lc=${lang}&key=${YOUR_API_KEY}`
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    let json = await res.json();
    await m.reply(json.message.replace(/simsimi/gi, `${botName}`));
  } catch (error) {
    await m.reply(`❎ حاول مرة ثانية لاحقًا، شكله السيرفر واقع.`);
  }
};

handler.help = ['bot'];
handler.tags = ['fun'];
handler.command = ['bot', 'simi'];

export default handler;
