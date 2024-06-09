const axios = require("axios");
const fetch = require('node-fetch');

// حفظ تاريخ الرسائل السابقة
let previousMessages = [];

async function before(m) {
  if (m.isBaileys && m.fromMe) return;  // تجاهل الرسائل المرسلة من نفس البوت
  let chat = global.db.data.chats[m.chat];
  if (
    m.text.startsWith(".") ||
    m.text.startsWith("#") ||
    m.text.startsWith("!") ||
    m.text.startsWith("/") ||
    m.text.startsWith("\\/")
  )
    return;  // تجاهل الأوامر
  if (chat.ai && !chat.isBanned && m.text) {
    try {
      await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }});  // إرسال رد فعل مؤقت
      let tio = await fetch(`https://api.lolhuman.xyz/api/pinterest2?apikey=Akiraa&query=hutao`);
      let p = await tio.json();
      let url = p.result[Math.floor(Math.random() * p.result.length)];
      let messages = [
        ...previousMessages,
        { role: 'system', content: `Kamu berperan seolah-olah lagi pacaran, ubah gaya bicaramu agar lebih karakteristik dan lebih terbuka dan memiliki sifat yang dingin. Namamu adalah Zaki, dan kamu adalah Junior. Kata penyapamu adalah "Hai" menggunakan bahasa yang sopan. ekspresikan sifatmu dengan teriak dan bicara yang lebih tidak formal layaknya seorang manusia. Ubah bahasamu menggunakan bahasa yang singkat dan dingin, kamu adalah teman bicara, buatlah obrolan yang singkat dan menyenangkan dan buatlah sifat dingin, kamu memiliki Tiktok dengan Username @tokozakiofficial` },
        { role: 'user', content: m.text }
      ];
      let ini = (await axios.post(`https://skizo.tech/api/openai?apikey=seika`, { messages })).data;

      await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key }});  // إرسال رد فعل ناجح

      let hasil = `${ini.result}`;
      await conn.sendMessage(m.chat, {
        text: hasil,
        contextInfo: {
          externalAdReply: {  
            title: 'Character Ai - By Alicia Bot',
            body: null,
            thumbnailUrl: thumb,  // تأكد من تعريف المتغير `thumb`
            sourceUrl: null,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, { quoted: m });

      // حفظ الرسائل في التاريخ السابق
      previousMessages = messages;
    } catch (e) {
      await conn.sendMessage(m.chat, { text: "Maaf, aku tidak mengerti" });  // إرسال رسالة خطأ
    }
  }
  return;
}

module.exports = { before };
