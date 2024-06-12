import fetch from 'node-fetch';
import uploader from '../lib/uploadImage.js';

const handlerBK9Img = async (m, {conn, text, command}) => {
  const idioma = 'ar';
  const translations = {
    ar: {
      BK9: {
        BK9: {
          bk9imgtext: "يرجى تقديم صورة صالحة!",
          bk9err: "حدث خطأ أثناء معالجة الصورة!"
        }
      }
    }
  };
  const tradutor = translations[idioma].BK9.BK9;

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

handlerBK9Img.command = ['حلل_صورة'];
handlerBK9Img.tags = ['ai'];
export default handlerBK9Img;
