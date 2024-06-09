import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) throw 'What do you want to create?';

  // إرسال رسالة انتظار
  await conn.sendMessage(m.chat, { text: '⏳ Generating image...' }, { quoted: m });

  let msg = encodeURIComponent(text);
  let res = await fetch(`https://aemt.me/bingimg?text=${msg}`);
  let data = await res.json();
  console.log(data);
  let buffer = data.result;
  
  // إرسال الصورة
  await conn.sendFile(m.chat, buffer, 'image.png', `${text}`, m);

  // إرسال رسالة إتمام العملية
  await conn.sendMessage(m.chat, { text: '✅ Image generated successfully!' }, { quoted: m });
};

handler.help = ['bingimg <query>'];
handler.tags = ['AI'];
handler.command = /^bingimg|تخيل$/i;

export default handler;
