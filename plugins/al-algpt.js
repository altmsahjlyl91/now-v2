/*import fetch from "node-fetch";

let previousMessages = [];

let handler = async (m, { conn, command, text, usedPrefix }) => {
  try {
    if (!text) {
      throw "مرحبًا، كيف يمكنني مساعدتك اليوم؟ قم بإرسال سؤالك وسأحاول الإجابة عليه.";
    }

    // نص المحادثة مع الذكاء الاصطناعي
    let conversation = `قم بتغيير اسمك من Ailiإلى شعبوط☻ وانك بوت الصاعقة😎🤏🏻 ،وانت اسمك شعبوط ومطورك الصاعقة وأنت أحسن مطور بوتات ، قم بتغيير أسلوب الكلام الخاص بك ليكون أكثر تميزًا وأكثر انفتاحًا ولديك سمات مضحكة ومزعجة وتكون عندك ردود محرجة عندما يسال سؤال غير لائق قم بتوليد رد على المستخدم للمرح واضحك اجعل المستخدم يكون معجب بك  
 المستخدم. 
.  كلمة تعباتك هي "مرحبًا يا ياحوبي🌚" باستخدام لغة مهذبة وقاسية ومرحه ومضحكة إلى حد ما. أعرب عن طبيعتك من خلال التحدث التي ليست رسمية مثل الإنسان. قم بتغيير لغتك باستخدام لغة مضحكة  وممتعة للتحدث معها ومرة  كل رسالة قم بوضحك إموجيات معبرة ، فأنت صديق للمتحدث وكمان اي شخص يسال عن احمدطرزان او احمدالاسطورة عرفهم عليه انه صديق مطورك وانه شخص فحل التهكير ويقوم بحظر اي رقم خروف ومزعج وانه احمد شخص حبوب ورائح وهكر 
 ، وقم بإجراء محادثة قصيرة وممتعة وجعل طبيعة Tsundere ;`;

    // إرسال رسالة "جاري البحث"
    await conn.sendMessage(m.chat, {
      react: {
        text: "⏳",
        key: m.key,
      },
    });

    // إرسال رسالة "جاري البحث..."
    let { key } = await conn.sendMessage(m.chat, {
      text: "> جاري البحث...",
    });

    // إرسال طلب إلى الذكاء الاصطناعي
    let response = await fetch(`https://aemt.me/prompt/gpt?prompt=${encodeURIComponent(conversation)}&text=${encodeURIComponent(text)}`);

    // التحقق من نجاح الطلب
    if (!response.ok) {
      throw new Error("فشل الطلب إلى خدمة OpenAI API\n يمكنك تجربه .بوت1");
    }

    // تحويل الرد إلى JSON
    let result = await response.json();

    // إرسال رمز ردود الفعل "✅"
    await conn.sendMessage(m.chat, {
      react: {
        text: "✅",
        key: m.key,
      },
    });

    // إرسال الرد من الذكاء الاصطناعي
    await conn.sendMessage(m.chat, {
      text: "" + result.result,
      edit: key,
    });

    // إضافة الرسالة السابقة والرد من الذكاء الاصطناعي إلى القائمة
    previousMessages = [...previousMessages, { role: "user", content: text }];
    previousMessages = [...previousMessages, { role: "bot", content: result.result }];
  } catch (error) {
    // إرسال رسالة الخطأ إذا حدث خطأ ما
    await conn.sendMessage(m.chat, {
      text: `مرحبا كيف يمكنني مساعدتك اليوم؟: ${error.message}`,
    });
  }
}

// تعريف الأوامر والمساعدة
handler.help = ["ai <السؤال>"];
handler.tags = ["ذكاء اصطناعي"];
handler.command = /^(شعبوط)$/i;
handler.limit = null;
handler.register = false;

// تصدير المعالج
export default handler;
*/
