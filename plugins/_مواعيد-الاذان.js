export async function before(m) {
    this.autosholat = this.autosholat || {};
    const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender;
    const name = await this.getName(who);
    const id = m.chat;

    if (id in this.autosholat) {
        console.log(`Reminder already set for chat ID: ${id}`);
        return false;
    }

    const jadwalSholat = {
        الفجر: "04:15",
        الضحى: "05:50",
        الظهر: "12:00",
        العصر: "15:25",
        المغرب: "18:30",
        العشاء: "19:45"
    };

    const date = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Aden" }));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    console.log(`Current time: ${timeNow}`);

    for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
        console.log(`Checking time for ${sholat} at ${waktu}`);
        if (timeNow === waktu) {
            console.log(`Matched time for ${sholat}`);
            const caption = `السلام عليكم *${name}*,\nحان موعد أدان صلاة *${sholat}* اذهب وتوضأ بسرعة وقم لصلاتك ولا تنسانا من الدعاء.\n\n*${waktu}*\n> *هذا توقيت الصلاة في صنعاء وما جاورها*`;
            this.autosholat[id] = [
                this.reply(m.chat, caption, null),
                setTimeout(() => {
                    delete this.autosholat[id];
                }, 57000)
            ];
        }
    }
}
