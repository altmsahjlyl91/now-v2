let handlerTxt = async (m, { conn, text, usedPrefix, command }) => {
    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : '';
    if (!teks) throw `📝 ماذا أكتب؟ مثال: *${usedPrefix + command}* Hello my friend `;
    
    // إزالة التفاعل بسبب الخطأ
    // m.react(rwait)

    let img = global.API('fgmods', '/api/maker/txt', { text: teks }, 'apikey');
    await conn.sendFile(m.chat, img, 'img.png', `✅ إنه أفضل مما تكتبه أنت ✍🏻`, m);
    
    // إزالة التفاعل بسبب الخطأ
    // m.react(done)
};

handlerTxt.help = ['txt'];
handlerTxt.tags = ['fun'];
handlerTxt.command = ['اكتب'];

export default handlerTxt;
