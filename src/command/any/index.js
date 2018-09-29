import { Reply, Markup } from 'yandex-dialogs-sdk';
import { sample } from 'lodash';

export default function (ctx) {
	return Reply.text(`${sample([
		'Я вас не поняла.',
    'Ваш запрос не распознан.'])} ` + 
    `Повторите запрос или спросите: Что ты умеешь ? \n `, {
		buttons: [Markup.button('Что ты умеешь ?')] 
	})
}