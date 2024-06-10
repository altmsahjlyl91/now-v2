import fetch from 'node-fetch';

// دالة لجلب قائمة السور
const fetchSurahList = async () => {
  try {
    const response = await fetch(`https://api.quran.sutanlab.id/surah`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// دالة لجلب بيانات السورة باستخدام الاسم أو الرقم
const fetchQuranData = async (surahIdentifier) => {
  try {
    const surahList = await fetchSurahList();
    if (!surahList) return null;

    let surahNumber;
    if (isNaN(surahIdentifier)) {
      const surah = surahList.find(s => s.name.transliteration.en.toLowerCase() === surahIdentifier.toLowerCase());
      if (!surah) return null;
      surahNumber = surah.number;
    } else {
      surahNumber = parseInt(surahIdentifier);
      if (surahNumber < 1 || surahNumber > 114) return null;
    }

    const response = await fetch(`https://quran-wudy.vercel.app/surah/${surahNumber}`);
    const data = await response.json();
    return data.data.verses;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// الدالة الأساسية لمعالجة الرسالة
const handler = async (m, { conn }) => {
  conn.qurannData = conn.qurannData ? conn.qurannData : {};

  const surahIdentifier = m.text.split(' ')[1];
  if (!surahIdentifier) {
    m.reply("❌ اسم أو رقم السورة غير صحيح. يرجى تقديم اسم أو رقم سورة صالح.\n مثال : \n .سوره البقرة أو .سوره 2");
    return;
  }

  const ayahs = await fetchQuranData(surahIdentifier);
  if (!ayahs) {
    m.reply("❌ لم يتم العثور على السورة. يرجى تقديم اسم أو رقم سورة صالح.\n مثال : \n .سوره البقرة أو .سوره 2");
    return;
  }

  const formattedList = Object.values(ayahs).map(v => (
    `*${v.number.inSurah}.* ${v.text.arab}`
  )).join('\n');

  const instructions = "قم بالرد على هذه الرسالة برقم الآية المطلوب لاستقبال الصوت. \n يمكنك زيارة أنستغرام صاحب البوت لمعرفة المزيد عن هذه الميزة \n instagram.com/gl_al.12";

  let { key } = await m.reply(`📖 List of Ayahs in Surah ${surahIdentifier}:\n${formattedList}\n\n${instructions}`);
  conn.qurannData[m.chat] = { list: Object.values(ayahs), key };
};

// دالة لمعالجة الرد على الرسالة
handler.before = async (m, { conn }) => {
  conn.qurannData = conn.qurannData ? conn.qurannData : {};

  if (m.isBaileys || !(m.chat in conn.qurannData)) return;
  const input = m.text.trim();
  if (!/^\d+$/.test(input)) return;

  const { list, key } = conn.qurannData[m.chat];
  if (!m.quoted || m.quoted.id !== key.id || !m.text) return;
  const index = parseInt(input);

  if (isNaN(index) || index < 1 || index > list.length) {
    m.reply("❌ رقم الآية غير صحيح. يرجى تقديم رقم آية صالح من القائمة.\nمثال :\n .ayati 1");
  } else {
    const selectedObj = list[index - 1];

    await conn.sendMessage(m.chat, {
      audio: {
        url: selectedObj.audio.primary,
      },
      mimetype: "audio/mpeg",
      filename: "quran_audio.mp3",
      ptt: true,
    }, { quoted: m });

    clearTimeout(conn.qurannData[m.chat].timeout);
  }
};

// تعريف الأوامر والمساعدة
handler.help = ["ayati"];
handler.tags = ["islam"];
handler.command = /^(ayati|سورة|سوره)$/i;

export default handler;
