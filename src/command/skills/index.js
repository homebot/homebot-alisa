const alice = require('yandex-dialogs-sdk');
const _ = require('lodash');

const matcher = ['Что ты умеешь ?',
    'Как тобой управлять ?',
    'Покажи свои команды',
    'Покажи свои навыки',
    'Помощь ?'
];

exports.matcher = matcher;
exports.handler = function (ctx) {

    return alice.Reply.text(`${_.sample(['Сейчас я умею', 'Я могу'])} \n` +
        `показывать ваши устровства, \n` +
        `включать или выключать свет, причем или весь или в конкретной комнате`, {
            buttons: [alice.Markup.button('Показать мои устройства'),
                alice.Markup.button('Включить свет.'),
                alice.Markup.button('Выключить свет.')
            ]
        })
}