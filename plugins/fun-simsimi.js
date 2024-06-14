import fetch from  node-fetch 

const botName =  YourBotName ; // اسم البوت الخاص بك
const lang =  ar ; // اللغة الافتراضية
const lolll = { text: "حدث خطأ، الرجاء المحاولة مرة أخرى لاحقًا." }; // رسالة خطأ

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `اكتب نصا للتحدث معي\nمثال: ${usedPrefix + command} مرحبا*`
  
  try { 
    let res = await fetch( https://api.simsimi.vn/v1/simtalk , {
      method:  POST ,
      headers: {  Content-Type :  application/x-www-form-urlencoded  },
      body: `text=${encodeURIComponent(text)}&lc=${lang}&key=`
    })
    
    let json = await res.json()
    m.reply(json.message.replace(/simsimi/gi, botName))
  } catch {
    m.reply(lolll.text)
  }
}

handler.help = [ bot ]
handler.tags = [ fun ]
handler.command = [ bot ,  simi ]

export default handler
