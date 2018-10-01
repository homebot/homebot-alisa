const alice = require('yandex-dialogs-sdk');
const _ = require('lodash');

exports.matcher = function (ctx) {
	return ctx.data.session.new === true;
}

exports.handler = function (ctx) {

	return alice.Reply.text(`${_.sample([
		'Привет! Тебя приветствует Home Bot.',
		'Home Bot вас слушает.',
		'Чем я могу быть для вас полезной ?',	
	  'Навык Home Bot запущен. Чем помочь ?'])}`, {
		buttons: [alice.Markup.button('Что ты умеешь ?'),
			alice.Markup.button('Показать мои устройства')
		],
	})
}