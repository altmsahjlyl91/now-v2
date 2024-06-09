import { FormData, Blob } from 'formdata-node';
import { fileTypeFromBuffer } from 'file-type';
import fetch from 'node-fetch';

async function handler(m, { text }) {
    const input_data = [
        "pixar",
        "pixar_plus",
        "3d_cartoon",
        "angel",
        "angel_plus",
        "demon",
        "ukiyoe_cartoon",
        "bopu_cartoon",
        "amcartoon",
        "western",
        "avatar",
        "famous",
        "jpcartoon",
        "jpcartoon_head",
        "hkcartoon",
        "classic_cartoon",
        "tccartoon",
        "anime",
        "handdrawn",
        "sketch",
        "artstyle",
        "head",
        "full",
        "3d_game"
    ];

    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!mime) throw 'لم يتم العثور على وسائط';
    let media = await q.download();
    let [urutan] = text.split(" ");
    await m.reply("يرجى الانتظار...");
    try {
        let data = input_data.map(item => ({
            title: item.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            id: item
        }));
        if (!urutan) return m.reply("أدخل الاستعلام!\n*مثال:*\n.ailabs [رقم]\n\n*اختر الرقم المتاح*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
        if (isNaN(urutan)) return m.reply("أدخل الاستعلام!\n*مثال:*\n.ailabs [رقم]\n\n*اختر الرقم المتاح*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
        if (urutan > data.length) return m.reply("أدخل الاستعلام!\n*مثال:*\n.ailabs [رقم]\n\n*اختر الرقم المتاح*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"));
        let out = data[urutan - 1].id;
        const openAIResponse = await cartoonifyImage(media, out);
        if (openAIResponse) {
            const result = openAIResponse;
            const tag = `@${m.sender.split('@')[0]}`;
            await conn.sendMessage(m.chat, {
                image: {
                    url: result.data.image_url
                },
                caption: `هذا تأثير *${out}* الخاص بك\nطلب بواسطة: ${tag}`,
                mentions: [m.sender]
            }, {
                quoted: m
            });
        } else {
            console.log("لا يوجد رد من OpenAI أو حدث خطأ.");
        }
    } catch (e) {
        console.error(e);
        await m.reply("حدث خطأ أثناء المعالجة");
    }
}

handler.help = ["ailabs [رقم]"];
handler.tags = ["drawing"];
handler.command = /^(ailabs|بوت2)$/i;
handler.limit = true;

export default handler;

async function cartoonifyImage(buffer, type) {
    const data = new FormData();
    const fileType = await fileTypeFromBuffer(buffer) || {};
    const mime = fileType ? fileType.mime : 'image/jpg';
    const ext = fileType ? `.${fileType.ext}` : '.jpg';
    data.append('image', new Blob([await buffer.toArrayBuffer()], {
        type: mime
    }), `img${ext}`);
    data.append('type', type);
    const url = 'https://cartoon-yourself.p.rapidapi.com/facebody/api/portrait-animation/portrait-animation';
    const options = {
        method: 'POST',
        headers: {
            'X-RapidAPI-Key': '230d665706msh8c981a10569b6aep1c5006jsn77776aeae50e',
            'X-RapidAPI-Host': 'cartoon-yourself.p.rapidapi.com',
        },
        body: data,
    };
    const response = await fetch(url, options);
    const json = await response.json();
    return json;
}
