const TelegramBot = require("node-telegram-bot-api")

const token = "7281110874:AAFbOIX2xF_Y12hIxapf-kqjh_hRjSN4ggw"
const options = {
    polling: true
}

const cuybot = new TelegramBot(token, options)

// cuybot.on("message", (callback)=>{
//     const id = callback.from.id
//     // cuybot.sendMessage(id, callback.text)
//     cuybot.sendMessage(id, "halo juga")
// })
const prefix = "."

const sayHi = new RegExp(`^${prefix}halo$`)
const gempa = new RegExp(`^${prefix}gempa$`)

cuybot.onText(sayHi, (callback)=>{
    cuybot.sendMessage(callback.from.id, "halo juga!")
})

cuybot.onText(gempa, async(callback)=>{
    const BMKG_ENDPOINT = "https://data.bmkg.go.id/DataMKG/TEWS/"

    const apiCall = await fetch(BMKG_ENDPOINT + `autogempa.json` )
    const {Infogempa: {
        gempa: {
            Jam, Magnitude, Tanggal, Wilayah, Potensi, Kedalaman, Shakemap
            }
        }
    } = await apiCall.json()
    const BMKImage = BMKG_ENDPOINT + Shakemap

        const resultText = `
    Waktu: ${Tanggal} | ${Jam}
    Besaran: ${Magnitude} SR
    Wilayah: ${Wilayah}
    Potensi: ${Potensi}
    Kedalaman: ${Kedalaman}
    `
    cuybot.sendPhoto(callback.from.id, BMKImage, {
        caption: resultText
    })

})