import { Reply, Markup } from 'yandex-dialogs-sdk';
import { sample } from 'lodash';
import httpRequest from '../../../../../helpers/http'
import config from '../../../../../config/dev';
import mqtt from '../../../../../db/mqtt'

export function turnOnMatcher(ctx) { 
  return ctx.message.search(/^Вкл[а-я]* свет.?$/i) !== -1 
};

export function turnOffMatcher(ctx) { 
  return ctx.message.search(/^Выкл[а-я]* свет.?$/i) !== -1 
}

export function turnOnWhereMatcher(ctx) {
  return ctx.message.search(/^Вкл[а-я]* свет (на|в) [а-я]+.?$/) !== -1
}

export function turnOffWhereMatcher(ctx) {
  return ctx.message.search(/^Выкл[а-я]* свет (на|в) [а-я]+.?$/) !== -1
}

export async function turnOnHandler(ctx) {
  return turn(ctx, {
    turn: 'on',
    useWhere: false
  });
};  

export async function turnOffHandler(ctx) {
  return turn(ctx, {
    turn: 'off',
    useWhere: false
  });
};

export async function turnOnWhereHandler(ctx) {
  return turn(ctx, {
    turn: 'on',
    useWhere: true
  });
};

export async function turnOffWhereHandler(ctx) {
  return turn(ctx, {
    turn: 'off',
    useWhere: true
  });
};

async function turn(ctx, options) {
  let devices = [];
  const params = {
    host: config.server.host,
    port: config.server.port,
    method: 'GET',
    path: '/api/v1/devices'
  };  

  try {
    let req = await httpRequest(params);

    if (options.useWhere) {
      where = ctx.message
                .split(' ')
                .slice(-1)[0]
                .replace('.', '')};

    for (let device of req) {
      let re = new RegExp(device.where, "i");
      if ((device.type === 'light') && 
            ((!options.useWhere) || (where.search(re) !== -1))) {
  
        mqtt.publish('/alisa', JSON.stringify({
          deviceId: device._id,
          turn: options.turn || "off"
        }));
        devices.push(device);
      }
    };
  
    if (devices.length > 0) {
      return Reply.text(`${sample([
        'Рада стараться', 
        'Все сделала.', 'Готово.'])}`);
    } else {
      if (options.useWhere) {
        return Reply.text(`${sample(['Ваших', 'Подключенных'])} 
          устройств в ${where} не ${sample(['найдено', 'обнаружено'])}.`, {
            buttons: [Markup.button('Показать мои устройства')]
          })
      } else {
        return Reply.text(`${sample(['Ваших', 'Подключенных'])} 
          устройств не ${sample(['найдено', 'обнаружено'])}.`, {
            buttons: [Markup.button('Показать мои устройства')]
          })
      }
    }
  } catch(err) {
    return Reply.text('Произошла ошибка. Пожалуйста, повторите запрос.')
  }
}