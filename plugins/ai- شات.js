import fetch from 'node-fetch';

let gitagptHandler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text && !(m.quoted && m.quoted.text)) {
    throw 'يرجى تقديم نص أو اقتباس رسالة للحصول على استجابة. تذكر أن GitaGPT لا يزال في مرحلة الاختبار، لذا قد يولد استجابات غير دقيقة في بعض الأحيان.';
  }

  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

  try {
    conn.sendPresenceUpdate('composing', m.chat);
    const prompt = encodeURIComponent(text);
    const endpoint = `https://ultimetron.guruapi.tech/gita?prompt=${prompt}`;

    const response = await fetch(endpoint);
    const data = await response.json();
    const result = data.completion;

    await m.reply(result);
  } catch (error) {
    console.error('Error:', error);
    throw 'حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى لاحقًا.';
  }
}

gitagptHandler.help = ['gitagpt'];
gitagptHandler.tags = ['AI'];
gitagptHandler.command = ['شات'];
gitagptHandler.diamond = false;

export default gitagptHandler;
