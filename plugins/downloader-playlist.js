import yts from 'yt-search';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    if (!text) conn.reply(m.chat, `*يرجى إدخال اسم الفيديو أو القناة التي ترغب في البحث عنها.*\n\n*اكتب اسم الفيديو أو القناة الخاصة بك بدون أي علامات أو رموز.*`, fkontak, m);
    try {
        let result = await yts(text);
        let ytres = result.videos;
        let teskd = `نتائج البحث عن *${text}*`;
        
        let listSections = [];
        for (let index in ytres) {
            let v = ytres[index];
            listSections.push({
                title: `النتائج`,
                rows: [
                    {
                        header: "الصوت",
                        title: "",
                        description: `${v.title} | ${v.timestamp}\n`, 
                        id: `${usedPrefix}ytmp3 ${v.url}`
                    },
                    {
                        header: "الفيديو",
                        title: "" ,
                        description: `${v.title} | ${v.timestamp}\n`, 
                        id: `${usedPrefix}ytmp4 ${v.url}`
                    }, 
                    {
                        header: "الصوت في الدونمة",
                        title: "" ,
                        description: `${v.title} | ${v.timestamp}\n`, 
                        id: `${usedPrefix}play3 ${v.url}`
                    }, 
                    {
                        header: "الفيديو في الدونمة",
                        title: "" ,
                        description: `${v.title} | ${v.timestamp}\n`, 
                        id: `${usedPrefix}play4 ${v.url}`
                    }
                ]
            });
        }
        await conn.sendList(m.chat, `*${teskd}*\n`, `\n${teskd}`, `بواسطة`, listSections, fkontak);
    } catch (e) {
        await conn.sendButton(m.chat, `\n${wm}`, `حدث خطأ، #report ${usedPrefix}${command}`, null, [[`تبليغ`, `#reporte ${usedPrefix}${command}`]], null, null, m);
        console.log(e);
    }
}

handler.help = ['playlist'];
handler.tags = ['تنزيل'];
handler.command = /^playlist|يوتيوب|yts(earch)?$/i;
export default handler;
