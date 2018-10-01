const alice = require('yandex-dialogs-sdk');
const _ = require('lodash');

module.exports = function (ctx) {
	return alice.Reply.text(`${_.sample([
		'Я вас не поняла.',
    'Ваш запрос не распознан.'])} ` +
		`Повторите запрос или спросите: Что ты умеешь ? \n `, {
			buttons: [alice.Markup.button('Что ты умеешь ?')]
		});
}