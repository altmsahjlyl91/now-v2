let handler = async (m, { conn, text, usedPrefix, command }) => {

    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
    if (!teks) throw `📝 ماذا أكتب؟ مثال: *${usedPrefix + command}* Hello my friend `
    m.react(rwait)
    let img = global.API('fgmods', '/api/maker/txt', { text: teks }, 'apikey')
    conn.sendFile(m.chat, img, 'img.png', `✅ إنه أفضل مما تكتبه أنت ✍🏻`, m)
    m.react(done)

}
handler.help = ['txt']
handler.tags = ['fun']
handler.command = ['اكتب']

export default handler
