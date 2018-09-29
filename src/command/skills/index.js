import { Reply, Markup } from 'yandex-dialogs-sdk';
import { sample } from 'lodash';

export const matcher = ['Что ты умеешь ?',
    'Как тобой управлять ?',
    'Покажи свои команды',
    'Покажи свои навыки',
    'Помощь ?'];

export function handler (ctx) {	

  return Reply.text(`${sample(['Сейчас я умею', 'Я могу'])} \n` +
   `показывать ваши устровства, \n` + 
   `включать или выключать свет, причем или весь или в конкретной комнате`, {
    buttons: [Markup.button('Показать мои устройства'),
              Markup.button('Включить свет.'),
              Markup.button('Выключить свет.')]
	})
}