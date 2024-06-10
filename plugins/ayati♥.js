import fetch from 'node-fetch';

const getSurahNumberByName = async (surahName) => {
  try {
    const response = await fetch(`https://api.alquran.cloud/v1/surah`);
    const data = await response.json();
    const surah = data.data.find(s => s.englishName.toLowerCase() === surahName.toLowerCase());
    return surah ? surah.number : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const fetchQuranData = async (surahNumber) => {
  try {
    const response = await fetch(`https://quran-wudy.vercel.app/surah/${surahNumber}`);
    const data = await response.json();
    return data.data.verses;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const handler = async (m, { conn }) => {
  conn.qurannData = conn.qurannData ? conn.qurannData : {};

  const surahName = m.text.split(' ')[1];
  if (!surahName) {
    m.reply("❌ يرجى تقديم اسم سورة صالح.\n مثال : \n .سورة الفاتحة");
    return;
  }

  const surahNumber = await getSurahNumberByName(surahName);
  if (!surahNumber) {
    m.reply("❌ اسم السورة غير صحيح أو لم يتم العثور على السورة.\n يرجى تقديم اسم سورة صالح.\n مثال : \n .سورة الفاتحة");
    return;
  }

  const ayahs = await fetchQuranData(surahNumber);
  if (!ayahs) {
    m.reply("Failed to fetch Quran data.");
    return;
  }

  const formattedList = Object.values(ayahs).map(v => (
    `*${v.number.inSurah}.* ${v.text.arab}`
  )).join('\n');

  const instructions = "قم بالرد على هذه الرسالة برقم الآية المطلوب لاستقبال الصوت. \n يمكنك زيارة أنستغرام صاحب البوت لمعرفة المزيد عن هذه الميزة \n instagram.com/gl_al.12";

  let { key } = await m.reply(`📖 List of Ayahs in Surah ${surahName}:\n${formattedList}\n\n${instructions}`);
  conn.qurannData[m.chat] = { list: Object.values(ayahs), key };
};

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

handler.help = ["ayati"];
handler.tags = ["islam"];
handler.command = /^(ayati|سورة|سوره)$/i;

export default handler;
