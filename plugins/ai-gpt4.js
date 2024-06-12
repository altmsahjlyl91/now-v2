import displayLoadingScreen from '../lib/loading.js';
import fetch from 'node-fetch';
import { delay } from '@whiskeysockets/baileys';

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  try {
    if (!text) throw 'uhm.. what do you want to say?';
    m.react('🤖');

    const prompt = encodeURIComponent(text);
    let apiurl = `https://ultimetron.guruapi.tech/gpt4?prompt=${prompt}`;

    const result = await fetch(apiurl);
    if (!result.ok) throw new Error('Network response was not ok');
    
    const response = await result.json();
    if (!response.result || !response.result.reply) throw new Error('Invalid response format');

    const textt = response.result.reply;
    await typewriterEffect(conn, m, m.chat, textt);
  } catch (error) {
    console.error('Error:', error.message || error);
    m.reply('Oops! Something went wrong. We are trying hard to fix it asap.');
  }
};

handler.help = ['gemini <text>'];
handler.tags = ['tools'];
handler.command = /^(gpt4)$/i;

export default handler;

async function typewriterEffect(conn, quoted, from, text) {
  let { key } = await conn.sendMessage(from, { text: 'Thinking...' }, { quoted: quoted });

  for (let i = 0; i < text.length; i++) {
    const noobText = text.slice(0, i + 1);
    await conn.relayMessage(
      from,
      {
        protocolMessage: {
          key: key,
          type: 14,
          editedMessage: {
            conversation: noobText,
          },
        },
      },
      {}
    );

    await delay(100); // Adjust the delay time (in milliseconds) as needed
  }
}
