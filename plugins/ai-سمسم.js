import translate from '@vitalets/google-translate-api'
import fetch from 'node-fetch'

var handler = async (m, { text, command, args, usedPrefix }) => {

if (!text) return conn.reply(m.chat, `🎌 *أدخل النص للتحدث*\n\nمثال, .${command} مرحبا ميجو`, m )
m.react('👾')

try {

let api = await fetch('https://api.simsimi.net/v2/?text=' + text + '&lc=ar')
let resSimi = await api.json()
     
conn.reply(m.chat, resSimi.success, m )

} catch {
try {
if (text.includes('مرحبا')) text = text.replace('مرحبا', 'مرحبا')
if (text.includes('مرحبا')) text = text.replace('مرحبا', 'مرحبا')
if (text.includes('مرحبا')) text = text.replace('مرحبا', 'مرحبا')    
let reis = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ar&dt=t&q=' + text)
let resu = await reis.json()  
let nama = m.pushName || '1'
let api = await fetch('http://api.brainshop.ai/get?bid=153868&key=rcKonOgrUFmn5usX&uid=' + nama + '&msg=' + resu[0][0][0])
let res = await api.json()
let reis2 = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ar&dt=t&q=' + res.cnt)
let resu2 = await reis2.json()    
conn.reply(m.chat, resu2[0][0][0], m )
} catch {  
let reisss = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=id&dt=t&q=' + text)
let resuuu = await reisss.json()      
let res222 = await fetch(`https://violetics.pw/api/utility/simsimi?apikey=beta&text=${resuuu[0][0][0]}`)  
let json222 = await res222.json()
let resulttt = json222.result
let lolll = await translate(`${resulttt}`, { to: 'ar', autoCorrect: true })    
conn.reply(m.chat, lolll.text, m )
}}

}
handler.help = ['simi']
handler.tags = ['juegos']
handler.command = /^(سمسم)$/i;


export default handler
