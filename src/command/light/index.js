const alice = require('yandex-dialogs-sdk');
const _ = require('lodash');

const httpRequest = require('../../../../../helpers/http');
const config = require('../../../../../config/dev');
const mqtt = require('../../../../../db/mqtt');

exports.turnOnMatcher = function (ctx) {
  return ctx.message.search(/^Вкл[а-я]* свет.?$/i) !== -1
};

exports.turnOffMatcher = function (ctx) {
  return ctx.message.search(/^Выкл[а-я]* свет.?$/i) !== -1
}

exports.turnOnWhereMatcher = function (ctx) {
  return ctx.message.search(/^Вкл[а-я]* свет (на|в) [а-я]+.?$/) !== -1
}

exports.turnOffWhereMatcher = function (ctx) {
  return ctx.message.search(/^Выкл[а-я]* свет (на|в) [а-я]+.?$/) !== -1
}

exports.turnOnHandler = async function (ctx) {
  return turn(ctx, {
    turn: 'on',
    useWhere: false
  });
};

exports.turnOffHandler = async function (ctx) {
  return turn(ctx, {
    turn: 'off',
    useWhere: false
  });
};

exports.turnOnWhereHandler = async function (ctx) {
  return turn(ctx, {
    turn: 'on',
    useWhere: true
  });
};

exports.turnOffWhereHandler = async function (ctx) {
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
        .replace('.', '')
    };

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
      return alice.Reply.text(`${_.sample([
        'Рада стараться', 
        'Все сделала.', 'Готово.'])}`);
    } else {
      if (options.useWhere) {
        return alice.Reply.text(`${_.sample(['Ваших', 'Подключенных'])} 
          устройств в ${where} не ${_.sample(['найдено', 'обнаружено'])}.`, {
          buttons: [alice.Markup.button('Показать мои устройства')]
        })
      } else {
        return alice.Reply.text(`${_.sample(['Ваших', 'Подключенных'])} 
          устройств не ${_.sample(['найдено', 'обнаружено'])}.`, {
          buttons: [alice.Markup.button('Показать мои устройства')]
        })
      }
    }
  } catch (err) {
    return alice.Reply.text('Произошла ошибка. Пожалуйста, повторите запрос.')
  }
}