import fetch from 'node-fetch';

const handlerBK9 = async (m, {conn, text, command}) => {
  const idioma = 'ar';
  const translations = {
    ar: {
      BK9: {
        BK9: {
          bk9text: "يرجى تقديم نص للاستجابة!",
          bk9err: "حدث خطأ أثناء معالجة النص!"
        }
      }
    }
  };
  const tradutor = translations[idioma].BK9.BK9;

  if (command === 'بوت') {
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
  }
};

handlerBK9.command = ['بوت'];
handlerBK9.tags = ['ai'];
export default handlerBK9;
