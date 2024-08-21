import fetch from "node-fetch";

let previousMessages = [];

const handler = async (m, { text, usedPrefix, command, conn }) => {
  try {
    if (!text) {
      throw "أدخل السؤال!\n\n*مثال:* من هو اول من اخترع السيارة ؟";
    }

    let name = conn.getName(m.sender);

    await conn.sendMessage(m.chat, {
      react: {
        text: "☁",
        key: m.key,
      },
    });

    let { key } = await conn.sendMessage(m.chat, {
      text: "...انتظر أولاً اتبع @noureddine_ouafy",
    });

    let response = await fetch(`https://api.neastooid.xyz/api/ai/gpt4?q=${encodeURIComponent(text)}`);

    if (!response.ok) {
      throw new Error("فشل الطلب إلى واجهة OpenAI");
    }

    let result = await response.json();

    if (result.code !== 200 || !result.status) {
      throw new Error("استجابة غير متوقعة من واجهة البرمجة");
    }

    await conn.sendMessage(m.chat, {
      react: {
        text: "🌧",
        key: m.key,
      },
    });

    await conn.sendMessage(m.chat, {
      text: "" + result.gpt,
      edit: key,
    });

    previousMessages = [...previousMessages, { role: "user", content: text }];
  } catch (error) {
    await conn.sendMessage(m.chat, {
      text: `خطأ: ${error.message}`,
    });
  }
}

handler.help = ['ai'];
handler.tags = ['ai'];
handler.command = /^(ai|بوت1)$/i;
export default handler;
