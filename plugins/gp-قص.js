import fetch from  node-fetch ;

// النصوص الثابتة
const translations = {
  ar: {
    bk9LText_T: "يرجى تقديم رابط لإنشاء الرابط المختصر!",
    bk9LTaked_T: "تم إنشاء الرابط المختصر بنجاح!",
    bk9err: "حدث خطأ أثناء معالجة الرابط!"
  },
  en: {
    bk9LText_T: "Please provide a link to create a short link!",
    bk9LTaked_T: "Short link created successfully!",
    bk9err: "An error occurred while processing the link!"
  }
};

let handler = async function (m, { text }) {
  // اللغة الافتراضية
  const defaultLanguage =  en ;
  const idioma = defaultLanguage;

  // النصوص المترجمة للغة المحددة
  const tradutor = translations[idioma];

  try {
    if (!text) {
      m.reply(`${tradutor.bk9LText_T}`);
      return;
    }
    const [link, alias] = text.split("+").map(part => part.trim());
    let apiUrl = `https://bk9.site/api/create?url=${encodeURIComponent(link)}`;
    if (alias) apiUrl += `&alias=${encodeURIComponent(alias)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.BK99) {
      return m.reply(`${tradutor.bk9LTaked_T}`);
    }
    const shortURL = data.BK9;
    return m.reply(`${shortURL}`);
  } catch (error) {
    console.error(error);
    return m.reply(`${tradutor.bk9err}`);
  }
};

handler.command = [ قص ];
handler.tags = [ tools ];
export default handler;
