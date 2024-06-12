import fetch from 'node-fetch';

const handlerTakhayal = async (m, {conn, text, command}) => {
  const idioma = 'ar';
  const translations = {
    ar: {
      BK9: {
        BK9: {
          bk9dalletext: "يرجى تقديم نص لتوليد الصورة!",
          bk9dallewait: "جاري توليد الصورة، يرجى الانتظار...",
          bk9dalleerr: "حدث خطأ أثناء توليد الصورة!"
        }
      }
    }
  };
  const tradutor = translations[idioma].BK9.BK9;

  if (command === 'تخيل') {
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
  }
};

handlerTakhayal.command = ['تخيل'];
handlerTakhayal.tags = ['ai'];
export default handlerTakhayal;
