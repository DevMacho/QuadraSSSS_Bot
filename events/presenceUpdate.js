const { Events } = require("discord.js")
const axios = require("axios")
const { client } = require("../app.js")

module.exports = {
    name: Events.PresenceUpdate,
    async execute(oldPresence, newPresence) {
        if (newPresence.guild.id != '1056427340181282960') return;  //우리길드가 아니면 빠꾸
        if (oldPresence?.status === newPresence.status) return;  //상태 변화 X
        //status: "offline" "online" ("idle" "dnd")
        if (!newPresence.user.bot) return; //상태 바뀐 유저가 봇이 아니면 X
        console.log("Bot Down") // 저장하지 말아보세요 여기 이거 콘솔로 출력하는 것도 안나와요
        axios.get(`${process.env.API_URL}/bots`)
            .then(res => {
                const botDatas = JSON.parse(res.data)
                const botIds = botDatas.map(botData => botData.botId)
                if (botIds.includes(newPresence.member.id)) {  //등록된 봇 상태가 변했다면
                    const myBot = botDatas.filter(botData => botData.botId == newPresence.member.id)[0]
                    const developers = myBot.developers
                    const channels = myBot.channels
                    console.log(oldPresence, newPresence)
                    //if (oldPresence.status == "online" && newPresence.status == "offline") {  //꺼졌다면~
                    console.log('봇이 다운됐습니다.')
                    const embed = {
                        color: 0xe82c2c,
                        title: '⛔ 봇이 다운됐습니다.',
                        description: 'Safe Security Statistics Solution, 당신의 봇을 위한 최적의 솔루션',
                        fields: [
                            {
                                name: '🤖 봇 ID',
                                value: myBot.botId,
                                inline: true,
                            },
                            {
                                name: '🕓 다운 시각',
                                value: new Date(),
                                inline: true,
                            },
                        ],
                        footer: {
                            text: 'QuadraSSSS'
                        },
                    };
                    client.users.cache.get('873134562836893707').send({ embeds: embed })
                        /*developers.forEach(developer => {
                            client.users.fetch(developer)
                            .then(user => {
                                const embed = {
                                    color: 0xe82c2c,
                                    title: '⛔ 봇이 다운됐습니다.',
                                    description: 'Safe Security Statistics Solution, 당신의 봇을 위한 최적의 솔루션',
                                    fields: [
                                        {
                                            name: '🤖 봇 ID',
                                            value: myBot.botId,
                                            inline: true,
                                        },
                                        {
                                            name: '🕓 다운 시각',
                                            value: new Date(),
                                            inline: true,
                                        },
                                    ],
                                    footer: {
                                        text: 'QuadraSSSS'
                                    },
                                };
                                user.dmChannel.send({ embeds: embed })
                            })
                        })*/
                        /*channels.forEach(channel => {
                            client.channels.fetch(channel)
                            .then(clientChannel => {
                                if (clientChannel.permissionsFor(newPresence.guild.me).has("SEND_MESSAGES")) {
                                    const embed = {
                                        color: 0xe82c2c,
                                        title: `⚠ <@${myBot.botId}>이/가 다운됐습니다.`,
                                        description: 'Safe Security Statistics Solution, 당신의 봇을 위한 최적의 솔루션',
                                        fields: [
                                            {
                                                name: '🤖 봇 ID',
                                                value: myBot.botId,
                                            },
                                            {
                                                name: '최대한 빠르게 조치할 수 있도록 최선을 다 하겠습니다.',
                                                value: `다운 시각: ${new Date()}`,
                                            },
                                        ],
                                        footer: {
                                            text: 'QuadraSSSS'
                                        },
                                    };
                                    clientChannel.send({ content: "<@everyone> 봇 다운 안내", embeds: [embed] })
                                } else {
                                    return
                                }
                            })
                        })*/
                    //} else if (oldPresence.status == "offline" && newPresence.status == "online") {  //켜졌다면~
                    //    return
                    //}
                }
            }).catch(err => console.log(err))
    }
}