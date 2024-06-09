 import fetch from 'node-fetch';
import translate from '@vitalets/google-translate-api';

let quranSurahHandler = async (m, { conn }) => {
  try {
    // استخراج رقم السورة أو اسمها من نص الأمر.
    let surahInput = m.text.split(' ')[1];

    if (!surahInput) {
      throw new Error(`يرجى تحديد رقم السورة أو اسمها`);
    }

    let surahListRes = await fetch('https://quran-endpoint.vercel.app/quran');
    let surahList = await surahListRes.json();

    let surahData = surahList.data.find(surah => 
        surah.number === Number(surahInput) || 
        surah.asma.ar.short.toLowerCase() === surahInput.toLowerCase() || 
        surah.asma.en.short.toLowerCase() === surahInput.toLowerCase()
    );

    if (!surahData) {
      throw new Error(`لم يتم العثور على السورة بالرقم أو الاسم "${surahInput}"`);
    }

    let res = await fetch(`https://quran-endpoint.vercel.app/quran/${surahData.number}`);
    
    if (!res.ok) {
      let error = await res.json(); 
      throw new Error(`فشلت الطلب مع الرمز الاستجابة ${res.status} والرسالة ${error.message}`);
    }

    let json = await res.json();

    // ترجمة التفسير من البهاسا الإندونيسية إلى الأردية
    let translatedTafsirUrdu = await translate(json.data.tafsir, { to: 'ur', autoCorrect: true });

    // ترجمة التفسير من البهاسا الإندونيسية إلى الإنجليزية
    let translatedTafsirEnglish = await translate(json.data.tafsir, { to: 'en', autoCorrect: true });

    let quranSurah = `
🕌 *القرآن: الكتاب المقدس*\n
📖 *سورة ${json.data.number}: ${json.data.asma.ar.long} (${json.data.asma.en.long})*\n
النوع: ${json.data.type.en}\n
عدد الآيات: ${json.data.ayahCount}\n
📚 *التفسير (بالأردية):*\n
${translatedTafsirUrdu.text}\n
📚 *التفسير (بالإنجليزية):*\n
${translatedTafsirEnglish.text}`;

    m.reply(quranSurah);

    if (json.data.recitation.full) {
      conn.sendFile(m.chat, json.data.recitation.full, 'recitation.mp3', null, m, true, { type: 'audioMessage', ptt: true });
    }
  } catch (error) {
    console.error(error);
    m.reply(`خطأ: ${error.message}`);
  }
};

quranSurahHandler.help = ['quran [رقم_السورة|اسم_السورة]'];
quranSurahHandler.tags = ['quran', 'surah'];
quranSurahHandler.command = ['السورة'];

export default quranSurahHandler;
