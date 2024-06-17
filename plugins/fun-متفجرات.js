// الدالة الأولى: إرسال نص كصورة باستخدام واجهة برمجة التطبيقات
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

// الدالة الثانية: لعبة المتفجرات
let handlerBomb = async (m, { conn }) => {
    // التأكد من وجود متغير conn.bomb
    conn.bomb = conn.bomb || {};
    let id = m.chat,
        timeout = 180000; // 3 دقائق

    // التحقق من وجود لعبة جارية في الدردشة
    if (id in conn.bomb) {
        return conn.reply(m.chat, '*^ الجلسة هذه لم تنتهي بعد!*', conn.bomb[id][0]);
    }

    // إعداد اللعبة
    const bom = ['💥', '✅', '✅', '✅', '✅', '✅', '✅', '✅', '✅'].sort(() => Math.random() - 0.5);
    const number = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
    const array = bom.map((v, i) => ({
        emot: v,
        number: number[i],
        position: i + 1,
        state: false
    }));

    // إنشاء الرسالة النصية للعبة
    let teks = `乂  *B O M B*\n\n أرسل الأرقام *1* - *9* لفتح مربع الأرقام *9* أدناه :\n\n`;
    for (let i = 0; i < array.length; i += 3) {
        teks += array.slice(i, i + 3).map(v => v.state ? v.emot : v.number).join('') + '\n';
    }
    teks += `\nTimeout : [ *${((timeout / 1000) / 60)} دقائق* ]\n إذا حصلت على صندوق يحتوي على قنبلة، سيتم خصم النقاط.`;

    // إرسال الرسالة وحفظ حالة اللعبة
    let msg = await conn.reply(m.chat, teks, m);
    let { key } = msg;
    let v;

    conn.bomb[id] = [
        msg,
        array,
        setTimeout(() => {
            v = array.find(v => v.emot === '💥');
            if (conn.bomb[id]) {
                conn.reply(m.chat, `*انتهى الوقت!*، القنبلة موجودة في صندوق الأرقام ${v.number}.`, conn.bomb[id][0].key);
            }
            delete conn.bomb[id];
        }, timeout),
        key
    ];
};

handlerBomb.help = ["متفجرات"];
handlerBomb.tags = ["لعبة"];
handlerBomb.command = /^(متفجرات)$/i;

export { handlerTxt, handlerBomb };
