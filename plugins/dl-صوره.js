import { googleImage } from '@bochilteam/scraper';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `*[❗خطاء❗] مثال علي الامر ${usedPrefix + command} احمدطرزان*`;
    if (m.text.match(/\b(gore|cp|porno|xxx|sex|سكس|طيز|خرق|نيك|قحبه|قحبة|porn|xxnx|xnxx|خرقك)\b/i)) 
        return m.reply('[❗خطاء❗] لا يمكنني إرسال هذا المحتوى، المجموعة محظورة\nإذا كنت مشرفًا وتريد تنشيطها، اخبر المطور');
    
    const res = await googleImage(text);
    let image = await res.getRandom();
    let link = image;
    conn.sendFile(m.chat, link, 'error.jpg', `🔎 *النتيجة ل:* ${text}\n🔗 *من:* ${link}\n🌎 *محرك البحث:* جوجل`, m);
}

handler.help = ['gimage <query>', 'imagen <query>'];
handler.tags = ['internet', 'tools'];
handler.command = /^(صورة|image|صوره|imagen)$/i;

export default handler;
