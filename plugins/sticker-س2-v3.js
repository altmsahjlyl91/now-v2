import axios from "axios"
import {
    sticker
} from "../lib/sticker.js"
import wibusoft from "wibusoft"

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let name = await conn.getName(who)
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "أدخل النص أو الرد على النص الذي تريد اقتباسه!\n .س1 القدس.عاصمة فلسطين\n.س2 القدس,عاصمةفلسطين\n.س3 القدس,عاصمةفلسطين"

    await m.reply(wait)
    let pp = await conn.profilePictureUrl(m.sender, "image").catch(_ => logo)
    let temas
    if (command == "س1") {
        temas = "terang"
    }
    if (command == "س2") {
        temas = "gelap"
    }
    if (command == "س3") {
        temas = "random"
    }
    let result = await Quotly(name, pp, text, temas)
    try {
        let out = await wibusoft.tools.makeSticker(result, {
            author: packname,
            pack: name,
            keepScale: true
        })
        await m.reply(out)
    } catch (e) {
        let stick = await sticker(buffer, false, name, packname)
        await conn.sendFile(m.chat, stick, "Quotly.webp", "", m)
    }
}

handler.help = ["س3", "س2", "س1"]
handler.tags = ["sticker"]
handler.command = ["س3", "س2", "س1"]

export default handler

async function Quotly(a, b, c, d) {
    let obj
    if (d == "terang") {
        obj = {
            "type": "quote",
            "format": "png",
            "backgroundColor": "#FFFFFF",
            "width": 512,
            "height": 768,
            "scale": 2,
            "messages": [{
                "entities": [],
                "avatar": true,
                "from": {
                    "id": 1,
                    "name": a,
                    "photo": {
                        "url": b
                    }
                },
                "text": c,
                "replyMessage": {}
            }]
        }
    }

    if (d == "random") {
        obj = {
            "type": "quote",
            "format": "png",
            "backgroundColor": getRandomHexColor().toString(),
            "width": 512,
            "height": 768,
            "scale": 2,
            "messages": [{
                "entities": [],
                "avatar": true,
                "from": {
                    "id": 1,
                    "name": a,
                    "photo": {
                        "url": b
                    }
                },
                "text": c,
                "replyMessage": {}
            }]
        }
    }

    if (d == "gelap") {
        obj = {
            "type": "quote",
            "format": "png",
            "backgroundColor": "#1b1429",
            "width": 512,
            "height": 768,
            "scale": 2,
            "messages": [{
                "entities": [],
                "avatar": true,
                "from": {
                    "id": 1,
                    "name": a,
                    "photo": {
                        "url": b
                    }
                },
                "text": c,
                "replyMessage": {}
            }]
        }
    }
    let json
try {
     json = await axios.post("https://bot.lyo.su/quote/generate", obj, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    } catch (e) {
     json = await axios.post("https://quote-api.up.railway.app/generate", obj, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    }
    let results = json.data.result.image
    const buffer = Buffer.from(results, "base64")
    return buffer
}

function getRandomHexColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}
