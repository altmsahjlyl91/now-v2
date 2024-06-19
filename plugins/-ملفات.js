import { tmpdir } from 'os';
import { join } from 'path';
import fs from 'fs';

let handler = async (m, { args, text, usedPrefix, command }) => {
    let info = `${usedPrefix + command} <اسم قديم> | <اسم جديد>
📌 مثال:
➞ ${usedPrefix + command} inv | rpg-inv
🗒️ ملاحظة:
لا تستخدم امتداد .js في نهاية الاسم وتأكد من أن الكلمة لا تحتوي على مسافات "rpg-inv"`;
    
    if (!args[0]) throw info;
    if (!args[1] == "|") throw `📌 مثال:
➞ ${usedPrefix + command} inv | rpg-inv`;
    if (!args[2]) throw `مثال:
➞ ${usedPrefix + command} inv | rpg-inv`;

    let from = args[0];
    let to = args[2];
    let ar = Object.keys(plugins);
    let ar1 = ar.map(v => v.replace('.js', ''));
    if (!ar1.includes(args[0])) return m.reply(`🗃️ غير موجود!
==================================
${ar1.map(v => ' ' + v).join`\n`}`);

    await fs.renameSync(`./plugins/${from}.js`, `./plugins/${to}.js`);
    conn.reply(m.chat, `تم تغيير "plugins/${from}.js" إلى "plugins/${to}.js" بنجاح`, m);
}

handler.help = ['renameplugin'].map(_ => _ + " <اسم قديم> | <اسم جديد>");
handler.command = /^(r(ملفات(file)?|f)|rn)$/i;
handler.owner = true;

export default handler;
