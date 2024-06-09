import { HuggingFaceBuffer } from '../../lib/tools/huggingface.js';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let text;
    if (args.length >= 1) {
        text = args.slice(0).join(" ");
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } else {
        return m.reply("اكتب نص!");
    }
    await m.reply(wait);
    try {
        const MODEL = 'stabilityai/stable-diffusion-xl-base-1.0';
        const openAIResponse = await HuggingFaceBuffer(MODEL, encodeURIComponent(text));

        if (openAIResponse) {
            const tag = `@${m.sender.split('@')[0]}`;

            await conn.sendMessage(m.chat, {
                image: openAIResponse,
                caption: `ها هو تأثير *${MODEL}* الخاص به\nطلب بواسطة: ${tag}`,
                mentions: [m.sender]
            }, {
                quoted: m
            });
        } else {
            console.log("لا يوجد استجابة من OpenAI أو حدث خطأ.");
        }
    } catch (error) {
        console.error("حدث خطأ:", error);
        await m.reply(eror);
    }
};

handler.help = ["diffusionxl"];
handler.tags = ["ai"];
handler.command = /^مساعد2$/i;
export default handler;
