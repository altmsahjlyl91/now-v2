// الشكر للكود إلى @Gatito-kw //

/* GitHub: https://github.com/Gatito-kw */

/* Bot: https://github.com/Gatito-kw/nekobot-md */

import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function قبل(m, { conn, participants }) {
  if (!m.messageStubType || !m.isGroup) return !0;
  const اسم_المجموعة = (await conn.groupMetadata(m.chat)).subject;
  const اداريي_المجموعة = participants.filter((p) => p.admin);
  const صورة_الملف_الشخصي = await conn.profilePictureUrl(m.chat, 'image').catch((_) => null) || './src/avatar_contact.png';
  const الصورة = await (await fetch(صورة_الملف_الشخصي)).buffer();
  const الدردشة = global.db.data.chats[m.chat];
  const اشارة_الاعضاء = [m.sender, m.messageStubParameters[0], ...اداريي_المجموعة.map((v) => v.id)];
  const محتوى_الاشارة = [m.sender, m.messageStubParameters[0]];
  const رسالة_الاتصال = {
    'key': {
      'participants': '0@s.whatsapp.net',
      'remoteJid': 'status@broadcast',
      'fromMe': false,
      'id': 'Halo'
    },
    'message': {
      'contactMessage': {
        'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    'participant': '0@s.whatsapp.net'
  };

  if (الدردشة.detect2 && m.messageStubType == 29) {
    let نص1 = `*تم ترقية عضو إلى مشرف حديثاً.*\n\n`;
    نص1 += `*◦  المجموعة:* ${اسم_المجموعة}\n`;
    نص1 += `*◦  المشرف الجديد:* @${m.messageStubParameters[0].split`@`[0]}\n`;
    نص1 += `*◦  نفذ بواسطة:* @${m.sender.split`@`[0]}`;
    await conn.sendMessage(m.chat, { image: الصورة, caption: نص1, mentions: اشارة_الاعضاء }, { quoted: رسالة_الاتصال });
  }

  if (الدردشة.detect2 && m.messageStubType == 30) {
    let نص2 = `*تم تنزيل مشرف إلى عضو حديثاً.*\n\n`;
    نص2 += `*◦  المجموعة:* ${اسم_المجموعة}\n`;
    نص2 += `*◦  تم إزالة:* @${m.messageStubParameters[0].split`@`[0]}\n`;
    نص2 += `*◦  نفذ بواسطة:* @${m.sender.split`@`[0]}`;
    await conn.sendMessage(m.chat, { image: الصورة, caption: نص2, mentions: اشارة_الاعضاء }, { quoted: رسالة_الاتصال });
  }

  if (الدردشة.detect2 && m.messageStubType == 27) {
    let نص3 = `*تم إضافة عضو جديد إلى المجموعة حديثاً.*\n\n`;
    نص3 += `*◦  المجموعة:* ${اسم_المجموعة}\n`;
    if (!m.sender.endsWith('@g.us')) {
      نص3 += `*◦  تم إضافة:* @${m.messageStubParameters[0].split`@`[0]}\n`;
      نص3 += `*◦  نفذ بواسطة:* @${m.sender.split`@`[0]}`;
    } else {
      نص3 += `*◦  تم إضافة:* @${m.messageStubParameters[0].split`@`[0]}\n`;
    }
    await conn.sendMessage(m.chat, { image: الصورة, caption: نص3, mentions: محتوى_الاشارة }, { quoted: رسالة_الاتصال });
  }

  if (الدردشة.detect2 && m.messageStubType == 28) {
    let نص4 = `*تم إزالة عضو من المجموعة حديثاً.*\n\n`;
    نص4 += `*◦  المجموعة:* ${اسم_المجموعة}\n`;
    if (!m.sender.endsWith('@g.us')) {
      نص4 += `*◦  تم إزالة:* @${m.messageStubParameters[0].split`@`[0]}\n`;
      نص4 += `*◦  نفذ بواسطة:* @${m.sender.split`@`[0]}`;
    } else {
      نص4 += `*◦  تم إزالة:* @${m.messageStubParameters[0].split`@`[0]}\n`;
    }
    await conn.sendMessage(m.chat, { image: { url: صورة_الملف_الشخصي }, caption: نص4, mentions: محتوى_الاشارة }, { quoted: رسالة_الاتصال });
  }

  if (الدردشة.detect2 && m.messageStubType == 32) {
    let الحالة;
    if (m.messageStubParameters[0] === m.sender) {
      الحالة = 'غادر';
    } else {
      الحالة = 'تمت إزالته';
    }
    let نص5 = `*تم ${الحالة} عضو من المجموعة حديثاً.*\n\n`;
    نص5 += `*◦  المجموعة:* ${اسم_المجموعة}\n`;
    if (الحالة === 'تمت إزالته') {
      نص5 += `*◦  تم إزالة:* @${m.messageStubParameters[0].split`@`[0]}\n`;
      نص5 += `*◦  نفذ بواسطة:* @${m.sender.split`@`[0]}`;
    } else {
      نص5 += `*◦  غادر:* @${m.messageStubParameters[0].split`@`[0]}\n`;
    }
    await conn.sendMessage(m.chat, { image: { url: صورة_الملف_الشخصي }, caption: نص5, mentions: محتوى_الاشارة }, { quoted: رسالة_الاتصال });
  }

  if (الدردشة.detect2 && m.messageStubType == 26) {
    let الإجراء;
    if (m.messageStubParameters[0].split`@`[0] === 'on') {
      الإجراء = 'مغلق';
    } else {
      الإجراء = 'مفتوح';
    }
    let نص6 = `*تم تعديل إعدادات المجموعة حديثاً.*\n\n`;
    نص6 += `*◦  المجموعة:* ${اسم_المجموعة}\n`;
    نص6 += `*◦  المجموعة الآن:* ${'```' + الإجراء + '```'}\n`;
    نص6 += `*◦  نفذ بواسطة:* @${m.sender.split`@`[0]}`;
    await conn.sendMessage(m.chat, { image: { url: صورة_الملف_الشخصي }, caption: نص6, mentions: محتوى_الاشارة }, { quoted: رسالة_الاتصال });
  }

  if (الدردشة.detect2 && m.messageStubType == 21) {
    let نص7 = `*تم تغيير اسم المجموعة حديثاً.*\n\n`;
    نص7 += `*◦  الاسم الجديد:* ${'```' + اسم_المجموعة + '```'}\n`;
    نص7 += `*◦  نفذ بواسطة:* @${m.sender.split`@`[0]}`;
    await conn.sendMessage(m.chat, { image: { url: صورة_الملف_الشخصي }, caption: نص7, mentions: محتوى_الاشارة }, { quoted: رسالة_الاتصال });
  }
} /* نهاية الدالة */
