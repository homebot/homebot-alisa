import { Reply, Markup } from 'yandex-dialogs-sdk';
import { sample } from 'lodash';
import httpRequest from '../../../../../helpers/http'
import config from '../../../../../config/dev';

export const matcher = ['Показать мои устройства',
    'Показать мои девайсы',
    'Что у меня есть?',
    'Подключенные устройства'];

export async function handler (ctx) {	

  const items = [];
  const params = {
    host: config.server.host,
    port: config.server.port,
    method: 'GET',
    path: '/api/v1/devices'
  }

  try {
    const devices = await httpRequest(params);
    for (let device of devices) {
      items.push({
        image_id: device.image ? device.image.alisa_id: '213044/afddc3f63fbe47216ea0',
        title: device.name
      });
    };  

    if (items.length <= 5) {

      return Reply.itemsListCard('Ваши устройства', {
        header: 'Ваши устройства',
        footer: {
          text: `Количество устройств: ${items.length}`
        },
        items: items
      });      

    } else {
      
      let deviceListing = 'Полный список устройств: \n'
      items.forEach((item, index) => {
        deviceListing += `${index + 1}. ${item.title} \n`
      });

      return Reply.text(deviceListing)
    }
    
  } catch(err) {
    return Reply.text('Произошла ошибка. Пожалуйста, повторите запрос.')
  }
}