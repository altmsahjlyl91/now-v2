import fetch from 'node-fetch';
import translate from '@vitalets/google-translate-api'; // Import the Google Translate API
const handler = (m) => m;

handler.before = async (m) => {
  const chat = global.db.data.chats[m.chat];

  // Handle commands
  if (m.text.startsWith('.ok simsimi')) {
    chat.simi = true;
    await m.reply('تم تفعيل دردشة Simsimi!');
    return !0; // Stop further processing
  } else if (m.text.startsWith('.of simsimi')) {
    chat.simi = false;
    await m.reply('تم إيقاف دردشة Simsimi.');
    return !0; // Stop further processing
  }

  // Simsimi logic
  if (chat.simi) {
    if (/^.*false|disnable|(turn)?off|0/i.test(m.text)) return;
    let textodem = m.text;
    try {
      const ressimi = await fetch(`https://api.simsimi.net/v2/?text=${encodeURIComponent(textodem)}&lc=ar`);
      const data = await ressimi.json();
      // Translate Simsimi's response to Arabic
      const translatedResponse = await translate(data.success, { from: 'en', to: 'ar' }); 
      await m.reply(translatedResponse.text); // Send the translated response
    } catch {
      // ... (rest of the code remains the same)
    }
    return !0;
  }

  return true;
};
export default handler;
