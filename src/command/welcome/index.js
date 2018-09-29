import { Reply, Markup } from 'yandex-dialogs-sdk';
import { sample } from 'lodash';

export function matcher (ctx) {
	return ctx.data.session.new === true;
}

export function handler (ctx) {	

	return Reply.text(`${sample([
		'Привет! Тебя приветствует Home Bot.',
		'Home Bot вас слушает.',
		'Чем я могу быть для вас полезной ?',	
	  'Навык Home Bot запущен. Чем помочь ?'])}`, {
		buttons: [Markup.button('Что ты умеешь ?'), 
							Markup.button('Показать мои устройства')],
	})
}
