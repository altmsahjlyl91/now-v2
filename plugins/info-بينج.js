import { generateWAMessageFromContent } from "@whiskeysockets/baileys";
import os from "os";
import util from "util";
import sizeFormatter from "human-readable";
import { MessageType } from "@whiskeysockets/baileys";
import fs from "fs";
import { performance } from "perf_hooks";

const handler = async (m, { conn, usedPrefix }) => {
  const datas = global;
  const idioma = datas.db.data.users[m.sender].language;
  const _translate = JSON.parse(fs.readFileSync(`./language/ar.json`));
  const tradutor = _translate.plugins.info_estado;

  const _uptime = process.uptime() * 1000;
  const uptime = clockString(_uptime);
  const totalusrReg = Object.values(global.db.data.users).filter(user => user.registered).length;
  const totalusr = Object.keys(global.db.data.users).length;
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats);
  const groups = chats.filter(([id]) => id.endsWith("@g.us"));
  const used = process.memoryUsage();
  const { restrict, antiCall, antiprivado, modejadibot } = global.db.data.settings[conn.user.jid] || {};
  const { autoread, gconly, pconly, self } = global.opts || {};
  const old = performance.now();
  const neww = performance.now();
  const rtime = (neww - old).toFixed(7);
  const wm = 'الصاعقه';
  const info = `
${tradutor.texto1[0]}

${tradutor.texto1[1]} برونو سوبرينو
${tradutor.texto1[2]} +967733875056
${tradutor.texto1[3]} paypal.me/TheShadowBrokers133

${tradutor.texto1[4]} ${rtime}
${tradutor.texto1[5]} ${uptime}
${tradutor.texto1[6]} ${usedPrefix}
${tradutor.texto1[7]} ${self ? "خاص" : "عام"}
${tradutor.texto1[8]} ${totalusrReg}
${tradutor.texto1[9]} ${totalusr}
${tradutor.texto1[10]} ${(conn.user.jid === global.conn.user.jid ? '' : `سب-بوت من:\n ▢ +${global.conn.user.jid.split`@`[0]}`) || '_شعبوط_'}

${tradutor.texto1[11]} ${chats.length - groups.length}
${tradutor.texto1[12]} ${groups.length}
${tradutor.texto1[13]} ${chats.length}

${tradutor.texto1[14]} ${autoread ? "مفعل" : "معطل"}
${tradutor.texto1[15]} ${restrict ? "مفعل" : "معطل"}
${tradutor.texto1[16]} ${pconly ? "مفعل" : "معطل"}
${tradutor.texto1[17]} ${gconly ? "مفعل" : "معطل"}
${tradutor.texto1[18]} ${antiprivado ? "مفعل" : "معطل"}
${tradutor.texto1[19]} ${antiCall ? "مفعل" : "معطل"}
${tradutor.texto1[20]} ${modejadibot ? "مفعل" : "معطل"}
`.trim();
  
  const doc = [
    "pdf",
    "zip",
    "vnd.openxmlformats-officedocument.presentationml.presentation",
    "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const document = doc[Math.floor(Math.random() * doc.length)];
  const Message = {
    document: { url: `https://instagram.com/gl_al.12` },
    mimetype: `application/${document}`,
    fileName: `مستند`,
    fileLength: 99999999999999,
    pageCount: 200,
    contextInfo: {
      forwardingScore: 200,
      isForwarded: true,
      externalAdReply: {
        mediaUrl: "https://instagram.com/gl_al.12",
        mediaType: 2,
        previewType: "pdf",
        title: "شعبوط",
        body: tradutor.texto2,
        thumbnail: imagen1,
        sourceUrl: "https://instagram.com/gl_al.12",
      },
    },
    caption: info,
    footer: wm,
    headerType: 6,
  };
  await conn.sendMessage(m.chat, Message, { quoted: m });
};

handler.command = /^(ping|info|بينج|estado|infobot)$/i;
export default handler;

function clockString(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(":");
}
