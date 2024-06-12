import fetch from 'node-fetch'
import axios from 'axios'

export async function before(m, { conn }) {
  try {
    // التحقق من الرسالة إذا كانت من البوت نفسه
    if (m.isBaileys && m.fromMe) {
      return true
    }

    // التحقق من إذا كانت الرسالة في مجموعة
    if (!m.isGroup) {
      return false
    }

    const users = global.db.data.users
    const chats = global.db.data.chats

    const user = global.db.data.users[m.sender]
    const chat = global.db.data.chats[m.chat]
    let name = conn.getName(m.sender)

    // إذا كانت الرسالة من الأنواع غير المرغوب فيها
    if (
      m.mtype === 'protocolMessage' ||
      m.mtype === 'pollUpdateMessage' ||
      m.mtype === 'reactionMessage' ||
      m.mtype === 'stickerMessage'
    ) {
      return
    }

    // التحقق من حالة المستخدم والمحادثة
    if (
      !m.msg ||
      !m.message ||
      m.key.remoteJid !== m.chat ||
      users[m.sender].banned ||
      chats[m.chat].isBanned
    ) {
      return
    }

    // التحقق من إذا كانت الرسالة رد على رسالة البوت
    if (!m.quoted || !m.quoted.isBaileys) return

    // تفعيل البوت باستخدام الأمر "!activate"
    if (m.text.toLowerCase() === '!activate') {
      chat.chatbot = true
      m.reply('البوت تم تفعيله في هذه المجموعة!')
      return
    }

    // تعطيل البوت باستخدام الأمر "!deactivate"
    if (m.text.toLowerCase() === '!deactivate') {
      chat.chatbot = false
      m.reply('البوت تم تعطيله في هذه المجموعة!')
      return
    }

    // التأكد من أن البوت مفعّل في هذه المحادثة
    if (!chat.chatbot) {
      return true
    }

    // إرسال النص إلى API لتحليل المحتوى
    const msg = encodeURIComponent(m.text)
    console.log(msg)

    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDJC5a882ruaC4XL6ejY1yhgRkN-JNQKg8',
      {
        contents: [
          {
            parts: [
              {
                text: msg,
              },
            ],
          },
        ],
      }
    )

    const data = response.data
    if (data.candidates && data.candidates.length > 0) {
      const candidate = data.candidates[0]
      const content = candidate.content

      let reply = content.parts[0].text
      if (reply) {
        reply = reply.replace(/Google/gi, 'Guru')
        reply = reply.replace(/a large language model/gi, botname)

        m.reply(reply)
      }
    } else {
      m.reply('No suitable response from the API.')
    }
  } catch (error) {
    console.log(error)
  }
}
