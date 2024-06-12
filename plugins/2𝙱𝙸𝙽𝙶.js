import fetch from 'node-fetch';
import uploader from '../lib/uploadImage.js';

const handler = async (m, {conn, text, command}) => {
  const idioma = 'ar';
  const translations = {
    ar: {
      BK9: {
        BK9: {
          bk9dalletext: "يرجى تقديم نص لتوليد الصورة!",
          bk9dallewait: "جاري توليد الصورة، يرجى الانتظار...",
          bk9dalleerr: "حدث خطأ أثناء توليد الصورة!",
          bk9text: "يرجى تقديم نص للاستجابة!",
          bk9err: "حدث خطأ أثناء معالجة النص!",
          bk9imgtext: "يرجى تقديم صورة صالحة!"
        }
      }
    }
  };
  const tradutor = translations[idioma].BK9.BK9;

  if (command === 'تخيل2') {
    if (!text) throw `${tradutor.bk9dalletext}`;

    await conn.sendMessage(m.chat, {text: tradutor.bk9dallewait}, {quoted: m});

    try {
      const BK9 = `https://api.bk9.site/ai/photoleap?q=${encodeURIComponent(encodeURIComponent(text))}`;
      const response = await fetch(BK9);
      const result = await response.json();

      if (result.status) {
        await conn.sendMessage(m.chat, {image: {url: result.BK9}}, {quoted: m});
      } else {
        throw `${tradutor.bk9dalleerr}`;
      }
    } catch (error) {
      throw `${tradutor.bk9dalleerr}`;
    }
  } else if (command === 'bk9') {
    if (!text) throw `${tradutor.bk9text}`;

    try {
      conn.sendPresenceUpdate('composing', m.chat);
      const BK9api = `https://api.bk9.site/ai/gpt4?q=${encodeURIComponent(encodeURIComponent(text))}`;
      const BK99 = await fetch(BK9api);
      const BK8 = await BK99.json();
      if (BK8.status && BK8.BK9) {
        const respuestaAPI = BK8.BK9;
        conn.reply(m.chat, respuestaAPI, m);
      } else {
        throw `${tradutor.bk9err}`;
      }
    } catch (error) {
      throw `${tradutor.bk9err}`;
    }
  } else if (command === 'حلل_صورة') {
    let BK7 = m.quoted ? m.quoted : m;
    let BK8 = (BK7.msg || BK7).mimetype || BK7.mediaType || '';

    if (/image/g.test(BK8) && !/webp/g.test(BK8)) {
      try {
        await conn.sendMessage(m.chat, {text: 'جاري تحميل الصورة...'}, {quoted: m});
        let BK0 = await BK7.download();
        let BK9img = await uploader(BK0);
        await conn.sendMessage(m.chat, {text: 'تم تحميل الصورة بنجاح، جاري المعالجة...'}, {quoted: m});
        let BK9api = await (await fetch(`https://api.bk9.site/ai/geminiimg?url=${BK9img}&q=${encodeURIComponent(encodeURIComponent(text))}`)).json();
        if (BK9api.status && BK9api.BK9) {
          await conn.sendMessage(m.chat, { text: BK9api.BK9 }, {quoted: m});
        } else {
          throw `${tradutor.bk9err}`;
        }
      } catch (error) {
        await conn.sendMessage(m.chat, {text: tradutor.bk9err}, {quoted: m});
      }
    } else {
      throw `${tradutor.bk9imgtext}`;
    }
  }
};

handler.command = ['تخيل2', 'bk9', 'حلل_صورة'];
handler.tags = ['ai'];
export default handler;
