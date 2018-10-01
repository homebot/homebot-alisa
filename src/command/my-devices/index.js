const alice = require('yandex-dialogs-sdk');
const httpRequest = require('../../../../../helpers/http');
const config = require('../../../../../config/dev');

const matcher = ['Показать мои устройства',
  'Показать мои девайсы',
  'Что у меня есть?',
  'Подключенные устройства'
];

exports.matcher = matcher
exports.handler = async function (ctx) {

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
        image_id: device.image ? device.image.alisa_id : '213044/afddc3f63fbe47216ea0',
        title: device.name
      });
    };

    if (items.length <= 5) {

      return alice.Reply.itemsListCard('Ваши устройства', {
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

      return alice.Reply.text(deviceListing)
    }

  } catch (err) {
    return alice.Reply.text('Произошла ошибка. Пожалуйста, повторите запрос.')
  }
}