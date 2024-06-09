import fetch from 'node-fetch'

let pickupLineHandler = async (m, { conn, text }) => {
  try {
    let res = await fetch(`https://api.popcat.xyz/pickuplines`)

    if (!res.ok) {
      throw new Error(`فشل طلب API مع الحالة ${res.status}`)
    }

    let json = await res.json()

    console.log('الرد النصي:', json)

    let pickupLine = `*إليك سطر اصطياد:* \n\n"${json.pickupline}"\n\nالمساهم: ${json.contributor}`

    m.reply(pickupLine)
  } catch (error) {
    console.error(error)
    // يمكن التعامل مع الخطأ بشكل مناسب هنا
  }
}

pickupLineHandler.help = ['سطراصطياد']
pickupLineHandler.tags = ['تسلية']
pickupLineHandler.command = /^(pickupline|اصطياد)$/i

export default pickupLineHandler
