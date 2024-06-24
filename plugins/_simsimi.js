import fetch from 'node-fetch';

const handler = (m) => m;

handler.before = async (m) => {
  const chat = global.db.data.chats[m.chat];
  if (chat.simi) {
    if (/^.*false|disable|(turn)?off|0/i.test(m.text)) return;

    let textodem = m.text;

    try {
      const ressimi = await fetch(`https://api.simsimi.net/v2/?text=${encodeURIComponent(textodem)}&lc=ar`);
      const data = await ressimi.json();
      
      if (data.success === 'No sé lo qué estás diciendo. Por favor enséñame.') {
        throw new Error('Simsimi did not understand the input');
      }

      await m.reply(data.success);
    } catch (error) {
      try {
        // ترجمة النص إلى الإنجليزية
        const translateRes = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(textodem)}`);
        const translateData = await translateRes.json();
        const translatedText = translateData[0][0][0];

        // إرسال النص المترجم إلى Brainshop API
        const name = m.pushName || 'شعبوط بوت';
        const brainRes = await fetch(`http://api.brainshop.ai/get?bid=153868&key=rcKonOgrUFmn5usX&uid=${name}&msg=${encodeURIComponent(translatedText)}`);
        const brainData = await brainRes.json();

        // ترجمة الرد إلى العربية
        const translateBackRes = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ar&dt=t&q=${encodeURIComponent(brainData.cnt)}`);
        const translateBackData = await translateBackRes.json();
        const finalText = translateBackData[0][0][0];

        await m.reply(finalText);
      } catch (finalError) {
        await m.reply('حدث خطأ أثناء معالجة طلبك، حاول مرة أخرى لاحقًا.');
      }
    }
    
    return true; // استخدام 'true' بدلاً من '!0' للوضوح
  }
  
  return true;
};

export default handler;
