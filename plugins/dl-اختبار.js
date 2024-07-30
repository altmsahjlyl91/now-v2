// اختبار واعتمادات لـ: GABRIEL OFC : (github.com/glytglobal)

import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text, args }) => {
  if (!text) throw `[❗️] أدخل الاسم للبحث عن النتائج على تيكتوك\n\n_*عرض تجريبي:* ${usedPrefix +  command} *<نص>*_\n\n_*مثال:* ${usedPrefix + command} *BrunoSobrino*_`;

  try {
    let response = await fetch(`https://deliriusapi-official.vercel.app/search/tiktoksearch?query=${encodeURIComponent(text)}`);
    let data = await response.json();

    if (data.status === 200) {
      let video = data.meta.slice(0, 4);

      let imageUrl = ['https://telegra.ph/file/f8af3e3402feec845d681.jpg'];
       
      let messages = video.map((video, index) => [
        `${video.title}`,
        `هذه هي النتائج لـ: ${text}`,
        imageUrl[index],
        [
          ['.·:*¨إرسال قائمة¨*:·.', usedPrefix + 'menu']
        ],
        [
          ['.·:*¨مشاهدة على تيكتوك¨*:·.', video.url],
          ['.·:*¨TheMystic-Bot-MD¨*:·.', 'https://whatsapp.com/channel/0029Vaein6eInlqIsCXpDs3y']
        ]
      ]);

      await conn.sendCarousel(m.chat, `> النتائج الموجودة لـ: *${text}*`, '三 تيكتوك سيرتش 三\n三 جابريل أوفك 三', 'النتائج', m);
    } else {
      throw '*[❗️] لم يتم العثور على نتائج لبحثك*';
    }
  } catch (e) {
    await m.reply(`خطأ أثناء تنفيذ هذا الأمر:\n\n${e.message || e}`);
  }
};

handler.command = ['اختبار'];
handler.register = true;

export default handler;
